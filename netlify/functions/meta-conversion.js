const crypto = require('crypto');

async function hashData(data) {
   return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
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
      // console.error('❌ META_PIXEL_ID missing');
      return {
         statusCode: 500,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'META_PIXEL_ID not configured' }),
      };
   }

   if (!process.env.META_ACCESS_TOKEN) {
      // console.error('❌ META_ACCESS_TOKEN missing');
      return {
         statusCode: 500,
         headers: { 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({ error: 'META_ACCESS_TOKEN not configured' }),
      };
   }

   try {
      console.log('📥 Request body:', event.body);

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

      // Construir evento para Meta
      const pixelEvent = {
         event_name,
         event_time: Math.floor(Date.now() / 1000),
         action_source: 'website',
         event_source_url: event.headers?.referer || event.headers?.origin || 'https://stage.movapp.org',
         event_id: event_id || `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
         user_data: {
            client_ip_address:
               event.headers?.['x-forwarded-for'] ||
               event.headers?.['x-real-ip'] ||
               event.headers?.['client-ip'] ||
               '127.0.0.1',
            client_user_agent: event.headers?.['user-agent'] || 'Unknown',
            fbc: extractFbc(event.headers?.cookie),
            fbp: extractFbp(event.headers?.cookie),
            ...(user_data || {}),
         },
         custom_data: custom_data || {},
      };

      // Hashear datos sensibles
      if (pixelEvent.user_data.em && Array.isArray(pixelEvent.user_data.em)) {
         console.log('🔐 Hashing emails...');
         pixelEvent.user_data.em = await Promise.all(pixelEvent.user_data.em.map((email) => hashData(email)));
      }
      if (pixelEvent.user_data.ph && Array.isArray(pixelEvent.user_data.ph)) {
         console.log('🔐 Hashing phones...');
         pixelEvent.user_data.ph = await Promise.all(
            pixelEvent.user_data.ph.map((phone) => hashData(phone.replace(/\D/g, ''))),
         );
      }

      // Limpiar datos vacíos
      Object.keys(pixelEvent.user_data).forEach((key) => {
         if (pixelEvent.user_data[key] === undefined || pixelEvent.user_data[key] === null) {
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

      if (process.env.META_TEST_EVENT_CODE) {
         metaPayload.test_event_code = process.env.META_TEST_EVENT_CODE;
         console.log('🧪 Using test event code:', process.env.META_TEST_EVENT_CODE);
      }

      const metaUrl = `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`;
      const response = await fetch(metaUrl, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(metaPayload),
      });

      const result = await response.json();
      console.log('📊 Meta API response:', response.status, result);

      if (!response.ok) {
         // console.error('❌ Meta API Error:', result);
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
      // console.error('❌ Function error:', error);
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
