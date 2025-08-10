export async function GET() {
   return new Response('GET funcionando!', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
   });
}

export async function POST({ request }) {
   // console.log('🔄 POST /api/test ejecutado');

   try {
      const data = await request.json();
      // console.log('📥 Data recibida:', data);

      return new Response(
         JSON.stringify({
            success: true,
            message: 'POST funcionando correctamente',
            timestamp: new Date().toISOString(),
            receivedData: data,
         }),
         {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
         },
      );
   } catch (error) {
      return new Response(
         JSON.stringify({
            error: error.message,
         }),
         {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
         },
      );
   }
}
