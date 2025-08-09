import { createUserData, trackServerPurchase } from '@utils/metaConversionsApi.js';

export async function POST({ request }) {
   console.log('🔄 API track-purchase llamada', request);

   try {
      // Verificar que el request tenga contenido
      const contentType = request.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
         return new Response(
            JSON.stringify({
               error: 'Content-Type debe ser application/json',
               received: contentType,
            }),
            {
               status: 400,
               headers: { 'Content-Type': 'application/json' },
            },
         );
      }

      const data = await request.json();
      console.log('📥 Datos recibidos:', data);

      // Validar que tenemos los datos mínimos
      if (!data.email || !data.value) {
         return new Response(
            JSON.stringify({
               error: 'Email y value son requeridos',
               received: Object.keys(data),
            }),
            {
               status: 400,
               headers: { 'Content-Type': 'application/json' },
            },
         );
      }

      // Verificar variables de entorno
      const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID;
      const accessToken = import.meta.env.META_ACCESS_TOKEN;

      console.log('🔑 Variables de entorno:', {
         pixelId: pixelId ? '✅ Configurado' : '❌ Faltante',
         accessToken: accessToken ? '✅ Configurado' : '❌ Faltante',
      });

      if (!pixelId || !accessToken) {
         return new Response(
            JSON.stringify({
               error: 'Variables de entorno no configuradas',
               missing: {
                  PUBLIC_META_PIXEL_ID: !pixelId,
                  META_ACCESS_TOKEN: !accessToken,
               },
               help: 'Agrega estas variables a tu archivo .env',
            }),
            {
               status: 500,
               headers: { 'Content-Type': 'application/json' },
            },
         );
      }

      // Crear datos de usuario
      const userData = await createUserData(data.email, data.phone, data.firstName, data.lastName, data.zipCode);

      console.log('👤 User data creado (hashed)');

      // Enviar a Meta API
      const result = await trackServerPurchase(
         pixelId,
         accessToken,
         userData,
         data.value,
         data.currency || 'MXN',
         data.contentIds || ['default'],
         data.eventSourceUrl || '',
      );

      console.log('✅ Enviado a Meta API exitosamente');

      return new Response(
         JSON.stringify({
            success: true,
            result: result,
            message: 'Evento enviado a Meta API correctamente',
         }),
         {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
         },
      );
   } catch (error) {
      console.error('❌ Error en track-purchase:', error);

      return new Response(
         JSON.stringify({
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
         }),
         {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
         },
      );
   }
}

// GET para verificar que el endpoint existe
export async function GET() {
   return new Response(
      JSON.stringify({
         message: 'track-purchase endpoint funcionando',
         methods: ['POST'],
         status: 'OK',
         timestamp: new Date().toISOString(),
      }),
      {
         status: 200,
         headers: { 'Content-Type': 'application/json' },
      },
   );
}
