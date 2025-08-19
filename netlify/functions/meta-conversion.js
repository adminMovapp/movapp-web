// const accessToken = process.env.META_ACCESS_TOKEN;

const crypto = require('crypto');

async function hashData(data) {
   const hashed = crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
   console.log(`Hashed data: ${data.substring(0, 3)}*** -> ${hashed.substring(0, 10)}...`);
   return hashed;
}

function extractFbc(cookieHeader) {
   if (!cookieHeader) return undefined;
   const match = cookieHeader.match(/_fbc=([^;]+)/);
   const result = match ? match[1] : undefined;
   console.log(`Extracted fbc: ${result || 'not found'}`);
   return result;
}

function extractFbp(cookieHeader) {
   if (!cookieHeader) return undefined;
   const match = cookieHeader.match(/_fbp=([^;]+)/);
   const result = match ? match[1] : undefined;
   console.log(`Extracted fbp: ${result || 'not found'}`);
   return result;
}

export default async (event) => {
   // console.log('=== META CONVERSION API STARTED ===');
   // console.log('Method:', event.httpMethod);
   // console.log('Headers:', JSON.stringify(event.headers, null, 2));

   const accessToken = process.env.META_ACCESS_TOKEN;
   // console.log('Access Token:', accessToken);

   if (event.httpMethod === 'OPTIONS') {
      console.log('Handling CORS preflight');
      return {
         statusCode: 200,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
         },
         body: '',
      };
   }

   if (event.httpMethod !== 'POST') {
      console.log('Invalid method:', event.httpMethod);
      return {
         statusCode: 405,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'Method not allowed' }),
      };
   }

   try {
      console.log('Request body:', event.body);
      const { event_name, custom_data, user_data, event_id } = JSON.parse(event.body);

      console.log('Parsed data:', {
         event_name,
         event_id,
         has_custom_data: !!custom_data,
         has_user_data: !!user_data,
      });

      if (!event_name) {
         console.log('Missing event_name');
         return {
            statusCode: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'event_name is required' }),
         };
      }

      // Construir evento
      const pixelEvent = {
         event_name,
         event_time: Math.floor(Date.now() / 1000),
         action_source: 'website',
         event_source_url: event.headers.referer || event.headers.origin,
         event_id: event_id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
         user_data: {
            client_ip_address:
               event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || event.headers['client-ip'],
            client_user_agent: event.headers['user-agent'],
            fbc: extractFbc(event.headers.cookie),
            fbp: extractFbp(event.headers.cookie),
            ...(user_data || {}),
         },
         custom_data: custom_data || {},
      };

      console.log('Built pixel event:', JSON.stringify(pixelEvent, null, 2));

      // Hashear datos sensibles
      if (pixelEvent.user_data.em && Array.isArray(pixelEvent.user_data.em)) {
         console.log('Hashing emails...');
         pixelEvent.user_data.em = await Promise.all(pixelEvent.user_data.em.map((email) => hashData(email)));
      }
      if (pixelEvent.user_data.ph && Array.isArray(pixelEvent.user_data.ph)) {
         console.log('Hashing phones...');
         pixelEvent.user_data.ph = await Promise.all(
            pixelEvent.user_data.ph.map((phone) => hashData(phone.replace(/\D/g, ''))),
         );
      }
      if (pixelEvent.user_data.fn && Array.isArray(pixelEvent.user_data.fn)) {
         console.log('Hashing first names...');
         pixelEvent.user_data.fn = await Promise.all(pixelEvent.user_data.fn.map((name) => hashData(name)));
      }
      if (pixelEvent.user_data.ln && Array.isArray(pixelEvent.user_data.ln)) {
         console.log('Hashing last names...');
         pixelEvent.user_data.ln = await Promise.all(pixelEvent.user_data.ln.map((name) => hashData(name)));
      }

      // Limpiar datos vacíos
      Object.keys(pixelEvent.user_data).forEach((key) => {
         if (pixelEvent.user_data[key] === undefined || pixelEvent.user_data[key] === null) {
            delete pixelEvent.user_data[key];
         }
      });

      console.log('Final pixel event:', JSON.stringify(pixelEvent, null, 2));

      // Preparar payload para Meta
      const metaPayload = {
         data: [pixelEvent],
         access_token: accessToken, //process.env.META_ACCESS_TOKEN,
      };

      // Agregar test event code si existe
      if (process.env.META_TEST_EVENT_CODE) {
         metaPayload.test_event_code = process.env.META_TEST_EVENT_CODE;
         console.log('Using test event code:', process.env.META_TEST_EVENT_CODE);
      }

      console.log('Sending to Meta API...');
      const metaUrl = `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`;
      console.log('Meta URL:', metaUrl);

      // Enviar a Meta
      const response = await fetch(metaUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(metaPayload),
      });

      const result = await response.json();
      console.log('Meta API response status:', response.status);
      console.log('Meta API response:', JSON.stringify(result, null, 2));

      if (!response.ok) {
         console.error('Meta API Error:', result);
         throw new Error(`Meta API Error: ${JSON.stringify(result)}`);
      }

      console.log('=== SUCCESS ===');
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
            meta_response: result,
            timestamp: new Date().toISOString(),
         }),
      };
   } catch (error) {
      console.error('=== ERROR ===');
      console.error('Error details:', error);
      console.error('Stack trace:', error.stack);

      return {
         statusCode: 500,
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            error: 'Internal server error',
            message: error.message,
            timestamp: new Date().toISOString(),
         }),
      };
   }
};
