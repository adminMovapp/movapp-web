let pixelInitialized = false;

function generateEventId() {
   return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function initMetaPixel(pixelId) {
   if (typeof window === 'undefined' || pixelInitialized) return;

   // // console.log('🚀 Initializing Meta Pixel:', pixelId);
   // // console.log('🌐 Environment:', window.location.hostname);

   // Cargar Facebook Pixel
   !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
   })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

   window.fbq('init', pixelId);
   pixelInitialized = true;

   // // console.log('✅ Meta Pixel initialized');
   trackPageView();
}

async function sendServerEvent(eventName, customData = {}, userData = {}, eventId) {
   // NO SIMULAR EN DESARROLLO - SIEMPRE INTENTAR ENVIAR AL SERVIDOR
   // // console.log('📡 Attempting server event:', eventName, 'ID:', eventId);

   try {
      const response = await fetch('/.netlify/functions/meta-conversion', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'User-Agent': navigator.userAgent,
         },
         body: JSON.stringify({
            event_name: eventName,
            custom_data: customData,
            user_data: userData,
            event_id: eventId,
         }),
      });

      // // console.log('📊 Server response status:', response.status);

      if (!response.ok) {
         const errorText = await response.text();
         // console.error('❌ Server event failed:', response.status, errorText);

         // Mostrar error específico para debugging
         if (response.status === 404) {
            // console.error('🚨 Function not found - check deployment');
         } else if (response.status === 500) {
            // console.error('🚨 Server error - check environment variables');
         }

         return null;
      }

      const result = await response.json();
      // // console.log('✅ Server event SUCCESS:', result);

      // Confirmar que llegó al servidor
      if (result.success) {
         // // console.log('🎉 Event sent to Meta Conversions API successfully');
         // // console.log('🔄 Event ID for deduplication:', result.event_id);
      }

      return result;
   } catch (error) {
      // console.error('❌ Server event error:', error.message);
      // console.error('🔍 Check network connection and function deployment');
      return null;
   }
}

async function trackEvent(eventName, customData = {}, userData = {}) {
   if (typeof window === 'undefined') return;
   // Sin pixel inicializado (stage/local sin PUBLIC_META_PIXEL_ID) no hay
   // nada que medir: se evita también el POST a meta-conversion, que sin
   // META_ACCESS_TOKEN respondería 500 en cada evento.
   if (!pixelInitialized) return null;

   const eventId = generateEventId();

   // console.log(`🎯 === TRACKING ${eventName} ===`);
   // console.log('🆔 Event ID:', eventId);
   // console.log('📦 Custom data:', customData);
   // console.log('👤 User data:', userData);

   //1. CLIENTE (Facebook Pixel)
   if (window.fbq) {
      window.fbq('track', eventName, customData, { eventID: eventId });
      // console.log('✅ CLIENT event sent to Facebook Pixel');
   } else {
      console.warn('⚠️ Facebook Pixel not loaded - CLIENT event skipped');
   }

   // 2. SERVIDOR (Conversions API)
   // console.log('📡 Sending SERVER event...');
   const serverResult = await sendServerEvent(eventName, customData, userData, eventId);

   if (serverResult && serverResult.success) {
      // console.log('✅ SERVER event sent to Conversions API');
      // console.log('🔄 Both events use same ID for deduplication:', eventId);
   } else {
      console.warn('⚠️ SERVER event failed - only client event sent');
   }

   // console.log(`🏁 === END TRACKING ${eventName} ===`);
   return eventId;
}

async function trackPageView(customData = {}) {
   if (typeof window === 'undefined') return;
   if (!pixelInitialized) return null; // ver trackEvent

   const eventId = generateEventId();

   const pageData = {
      page_title: document.title,
      page_url: window.location.href,
      ...customData,
   };

   // // console.log('📄 === TRACKING PAGEVIEW ===');
   // // console.log('🆔 Event ID:', eventId);
   // // console.log('📄 Page data:', pageData);

   // Cliente
   if (window.fbq) {
      window.fbq('track', 'PageView', pageData, { eventID: eventId });
      // // console.log('✅ CLIENT PageView sent');
   }

   // Servidor
   const serverResult = await sendServerEvent('PageView', pageData, {}, eventId);
   if (serverResult && serverResult.success) {
      // // console.log('✅ SERVER PageView sent');
      // // console.log('🔄 Deduplication ID:', eventId);
   }

   // // console.log('🏁 === END PAGEVIEW ===');
   return eventId;
}

window.metaPixelUtils = {
   initMetaPixel,
   trackEvent,
   trackPageView,
   generateEventId,
};
