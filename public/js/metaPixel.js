let pixelInitialized = false;

function generateEventId() {
   return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function initMetaPixel(pixelId) {
   if (typeof window === 'undefined' || pixelInitialized) return;

   console.log('🚀 Initializing Meta Pixel:', pixelId);

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

   console.log('✅ Meta Pixel initialized');
   trackPageView();
}

async function sendServerEvent(eventName, customData = {}, userData = {}, eventId) {
   const isDev = window.location.hostname === 'localhost' || window.location.hostname.includes('192.168.');

   if (isDev) {
      console.log('🧪 DEV MODE - Server event simulated');
      return { dev_mode: true };
   }

   try {
      console.log('📡 Sending server event:', eventName);

      const response = await fetch('/.netlify/functions/meta-conversion', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            event_name: eventName,
            custom_data: customData,
            user_data: userData,
            event_id: eventId,
         }),
      });

      if (!response.ok) {
         const errorText = await response.text();
         console.error('❌ Server event failed:', response.status, errorText);
         return null;
      }

      const result = await response.json();
      console.log('✅ Server event success:', result);
      return result;
   } catch (error) {
      console.error('❌ Server event error:', error.message);
      return null;
   }
}

async function trackEvent(eventName, customData = {}, userData = {}) {
   if (typeof window === 'undefined') return;

   const eventId = generateEventId();

   console.log(`🎯 Tracking ${eventName} with ID: ${eventId}`);

   // Cliente
   if (window.fbq) {
      window.fbq('track', eventName, customData, { eventID: eventId });
      console.log('✅ Client event sent');
   } else {
      console.warn('⚠️ Facebook Pixel not loaded');
   }

   // Servidor
   await sendServerEvent(eventName, customData, userData, eventId);
   return eventId;
}

async function trackPageView(customData = {}) {
   if (typeof window === 'undefined') return;

   const eventId = generateEventId();

   const pageData = {
      page_title: document.title,
      page_url: window.location.href,
      ...customData,
   };

   if (window.fbq) {
      window.fbq('track', 'PageView', pageData, { eventID: eventId });
   }

   await sendServerEvent('PageView', pageData, {}, eventId);
   return eventId;
}

// Hacer disponible globalmente
window.metaPixelUtils = {
   initMetaPixel,
   trackEvent,
   trackPageView,
   generateEventId,
};

console.log('📦 Meta Pixel utils loaded');
