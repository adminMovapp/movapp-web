import { createUserData, trackServerPurchase } from '@utils/metaConversionsApi.js';

export async function POST({ request }) {
   try {
      const data = await request.json();

      if (!data.email || !data.value) {
         return new Response(JSON.stringify({ error: 'Email y value son requeridos' }), { status: 400 });
      }

      const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID;
      const accessToken = import.meta.env.META_ACCESS_TOKEN;

      if (!pixelId || !accessToken) {
         return new Response(JSON.stringify({ error: 'Faltan variables de entorno' }), { status: 500 });
      }

      const userData = await createUserData(data.email, data.phone, data.firstName, data.lastName, data.zipCode);
      const result = await trackServerPurchase(
         pixelId,
         accessToken,
         userData,
         data.value,
         data.currency || 'MXN',
         data.contentIds || ['default'],
         data.eventSourceUrl || '',
         data.eventId || null,
      );

      return new Response(JSON.stringify({ success: true, result }), {
         status: 200,
         headers: { 'Content-Type': 'application/json' },
      });
   } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
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
