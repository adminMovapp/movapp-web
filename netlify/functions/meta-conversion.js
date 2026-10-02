const crypto = require('crypto');

// Versión de la API Graph. La v18.0 quedó fuera de la ventana de soporte de
// Meta (se publicó en octubre de 2023 y la deprecación son 2 años), así que
// sus llamadas podían empezar a fallar sin aviso.
const GRAPH_API_VERSION = 'v21.0';

/*
   Meta hashea el valor YA NORMALIZADO, no el que escribió el usuario. Si acá
   se hashea "  Juan@Ejemplo.COM " tal cual, el hash no coincide con el que
   Meta calculó del lado de su base y el campo se pierde exactamente igual
   que si no se hubiera mandado -- con el agravante de que parece que sí se
   envió. Por eso la normalización vive separada del hasheo: hashData ya solo
   hashea, y cada campo declara cómo se normaliza.
*/
const stripDiacritics = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const normalizeText = (value) => stripDiacritics(value).toLowerCase().trim();
// Teléfono: solo dígitos, con código de país y sin signos ni espacios.
const normalizePhone = (value) => String(value).replace(/\D/g, '');
// Ciudad y estado: minúsculas, sin espacios ni puntuación ("Ciudad de
// México" -> "ciudaddemexico").
const normalizePlace = (value) => normalizeText(value).replace(/[^a-z]/g, '');
// Código postal: minúsculas, sin espacios ni guiones. No se trunca a 5: eso
// es una regla de Estados Unidos y rompería códigos de otros países.
const normalizeZip = (value) => normalizeText(value).replace(/[^a-z0-9]/g, '');
/*
   País: ISO 3166-1 alfa-2 en minúsculas ("mx", no "MX" ni "México"). Si lo
   que llega no son exactamente dos letras, se descarta en vez de recortarlo:
   inventar un código a partir de un texto libre produciría un hash que no
   coincide con nadie y ensucia user_data aparentando un dato válido.
*/
const normalizeCountry = (value) => {
   const normalized = normalizeText(value).replace(/[^a-z]/g, '');
   return normalized.length === 2 ? normalized : '';
};

async function hashData(value) {
   if (!value) return undefined;
   return crypto.createHash('sha256').update(value).digest('hex');
}

/*
   Hashea un campo de user_data. Solo acepta arrays (es el formato que pide
   Meta y el que manda el cliente); un valor suelto se ignora en silencio,
   igual que antes. Devuelve undefined si no queda ningún valor útil, para
   que la limpieza de más abajo borre la clave en vez de mandar un array
   vacío.
*/
async function hashField(values, normalize = normalizeText) {
   if (!Array.isArray(values)) return undefined;
   const hashed = await Promise.all(
      values
         .filter(Boolean)
         .map((value) => normalize(value))
         .filter(Boolean)
         .map((value) => hashData(value)),
   );
   return hashed.length ? hashed : undefined;
}

function extractFbc(cookieHeader) {
   if (!cookieHeader) return undefined;
   const match = cookieHeader.match(/_fbc=([^;]+)/);
   return match ? match[1] : undefined;
}

function extractFbp(cookieHeader) {
   if (!cookieHeader) return undefined;
   const match = cookieHeader.match(/_fbp=([^;]+)/);
   return match ? match[1] : undefined;
}

export async function handler(event, context) {
   console.log('=== META CONVERSION API CALLED ===');
   console.log('Method:', event?.httpMethod);
   console.log('Origin:', event?.headers?.origin);
   console.log('User-Agent:', event?.headers?.['user-agent']);

   // CORS preflight
   if (event.httpMethod === 'OPTIONS') {
      console.log('✅ CORS preflight handled');
      return {
         statusCode: 200,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, User-Agent',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
         },
         body: '',
      };
   }

   if (event.httpMethod !== 'POST') {
      console.log('❌ Invalid method:', event.httpMethod);
      return {
         statusCode: 405,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Method not allowed' }),
      };
   }

   // Verificar variables críticas
   if (!process.env.META_PIXEL_ID) {
      return {
         statusCode: 500,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'META_PIXEL_ID not configured' }),
      };
   }

   if (!process.env.META_ACCESS_TOKEN) {
      return {
         statusCode: 500,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'META_ACCESS_TOKEN not configured' }),
      };
   }

   try {
      // OJO: no registrar event.body. Lleva correo, teléfono, nombre y código
      // postal SIN hashear (el hasheo ocurre más abajo), así que escribirlo en
      // los registros de Netlify deja datos personales en texto plano en un
      // sitio que nadie está vigilando.
      const { event_name, custom_data, user_data, event_id } = JSON.parse(event.body || '{}');

      if (!event_name) {
         console.log('❌ Missing event_name');
         return {
            statusCode: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'event_name required' }),
         };
      }

      console.log('🎯 Processing event:', event_name, 'ID:', event_id);

      const forwardedFor = event.headers?.['x-forwarded-for'];
      const clientIp =
         (forwardedFor ? forwardedFor.split(',')[0].trim() : '') ||
         event.headers?.['x-real-ip'] ||
         event.headers?.['client-ip'] ||
         undefined;

      // Construir evento para Meta
      const pixelEvent = {
         event_name,
         event_time: Math.floor(Date.now() / 1000),
         action_source: 'website',
         event_source_url: event.headers?.referer || event.headers?.origin || 'https://movapp.org',
         event_id: event_id || `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
         user_data: {
            // x-forwarded-for puede venir como "cliente, proxy1, proxy2": la
            // IP del visitante es la PRIMERA. Mandando la cadena entera Meta
            // descarta el campo. Sin cabecera se omite: antes se enviaba
            // '127.0.0.1' y 'Unknown', que Meta acepta como datos válidos y
            // solo sirven para ensuciar la coincidencia con valores falsos.
            client_ip_address: clientIp,
            client_user_agent: event.headers?.['user-agent'] || undefined,
            fbc: extractFbc(event.headers?.cookie),
            fbp: extractFbp(event.headers?.cookie),
         },
         custom_data: custom_data || {},
      };

      /*
         Hasheo de los datos personales. ESTE es el único lugar donde se
         hashea: el navegador manda los valores en claro a propósito (ver
         src/utils/metaPixelPayloads.js). Si alguna vez se agrega hasheo del
         lado del cliente, acá se hashearía el hash y el resultado no
         coincidiría con nadie -- la coincidencia caería a cero sin que nada
         falle visiblemente.

         fbp, fbc, client_ip_address y client_user_agent NO se hashean: Meta
         los exige en texto plano.
      */
      if (user_data) {
         pixelEvent.user_data.em = await hashField(user_data.em);
         pixelEvent.user_data.ph = await hashField(user_data.ph, normalizePhone);
         pixelEvent.user_data.fn = await hashField(user_data.fn);
         pixelEvent.user_data.ln = await hashField(user_data.ln);
         pixelEvent.user_data.zp = await hashField(user_data.zp, normalizeZip);
         pixelEvent.user_data.country = await hashField(user_data.country, normalizeCountry);
         pixelEvent.user_data.ct = await hashField(user_data.ct, normalizePlace);
         pixelEvent.user_data.st = await hashField(user_data.st, normalizePlace);
      }

      // Limpiar datos vacíos o undefined
      Object.keys(pixelEvent.user_data).forEach((key) => {
         if (
            pixelEvent.user_data[key] === undefined ||
            pixelEvent.user_data[key] === null ||
            (Array.isArray(pixelEvent.user_data[key]) && pixelEvent.user_data[key].length === 0)
         ) {
            delete pixelEvent.user_data[key];
         }
      });

      console.log('📤 Sending to Meta API...');
      console.log('🎯 Event:', pixelEvent.event_name);
      console.log('🆔 Event ID:', pixelEvent.event_id);

      // Enviar a Meta API
      const metaPayload = {
         data: [pixelEvent],
         access_token: process.env.META_ACCESS_TOKEN,
      };

      /*
         test_event_code manda el evento a la pestaña "Eventos de prueba" del
         Administrador de eventos y lo EXCLUYE de optimización y atribución.
         Por eso va con candado de entorno: si la variable quedara puesta en
         producción, todas las conversiones reales desaparecerían de los
         informes en silencio.

         El candado va por PUBLIC_SITE_ENV y no por NODE_ENV: Netlify fuerza
         NODE_ENV=production en TODOS los builds, incluido stage, así que el
         candado anterior (NODE_ENV !== 'production') tampoco dejaba probar en
         stage -- de ahí que se quitara. PUBLIC_SITE_ENV sí distingue los
         contextos (ver netlify.toml): vale 'staging' en stage, ramas y
         previsualizaciones, y 'production' solo en producción.
      */
      if (process.env.META_TEST_EVENT_CODE && process.env.PUBLIC_SITE_ENV !== 'production') {
         metaPayload.test_event_code = process.env.META_TEST_EVENT_CODE;
         console.log('🧪 Test event code activo (entorno:', process.env.PUBLIC_SITE_ENV || 'sin definir', ')');
      }

      const metaUrl = `https://graph.facebook.com/${GRAPH_API_VERSION}/${process.env.META_PIXEL_ID}/events`;
      const response = await fetch(metaUrl, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(metaPayload),
      });

      const result = await response.json();
      console.log('📊 Meta API response:', response.status, result);

      if (!response.ok) {
         return {
            statusCode: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
               error: 'Meta API Error',
               details: result,
            }),
         };
      }

      console.log('✅ SUCCESS - Event sent to Meta Conversions API');
      return {
         statusCode: 200,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            success: true,
            event_id: pixelEvent.event_id,
            event_name: pixelEvent.event_name,
            events_received: result.events_received || 1,
            message: 'Event sent to server successfully',
         }),
      };
   } catch (error) {
      return {
         statusCode: 500,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            error: 'Internal server error',
            message: error.message,
         }),
      };
   }
}
