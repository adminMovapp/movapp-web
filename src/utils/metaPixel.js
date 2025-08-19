// Variables globales para manejo del pixel
let pixelInitialized = false;
let pixelId = null;

// Utilidad para generar event_id único para deduplicación
export function generateEventId() {
   return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Utilidad para hashear datos sensibles (email, teléfono)
export async function hashData(data) {
   const encoder = new TextEncoder();
   const dataBuffer = encoder.encode(data.toLowerCase().trim());
   const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
   const hashArray = Array.from(new Uint8Array(hashBuffer));
   return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Inicializar Facebook Pixel
export function initMetaPixel(id) {
   if (typeof window === 'undefined' || pixelInitialized) return;

   pixelId = id;

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

   // PageView automático con deduplicación
   trackPageView();
}

// Enviar evento al servidor via Netlify Functions
async function sendServerEvent(eventName, customData = {}, userData = {}, eventId) {
   try {
      const response = await fetch('/.netlify/functions/meta-conversion', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            event_name: eventName,
            custom_data: customData,
            user_data: userData,
            event_id: eventId,
         }),
      });

      if (!response.ok) {
         throw new Error(`Server event failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server event sent successfully:', result);
      return result;
   } catch (error) {
      console.error('Error sending server event:', error);
      return null;
   }
}

// Función principal para rastrear eventos
export async function trackEvent(eventName, customData = {}, userData = {}) {
   if (typeof window === 'undefined') return;

   const eventId = generateEventId();

   // Evento del cliente
   if (window.fbq) {
      window.fbq('track', eventName, customData, { eventID: eventId });
   }

   // También enviar al servidor para deduplicación
   await sendServerEvent(eventName, customData, userData, eventId);

   return eventId;
}

// Función específica para PageView
export async function trackPageView(customData = {}) {
   if (typeof window === 'undefined') return;

   const eventId = generateEventId();

   const pageData = {
      page_title: document.title,
      page_url: window.location.href,
      ...customData,
   };

   // Evento PageView del cliente
   if (window.fbq) {
      window.fbq('track', 'PageView', pageData, { eventID: eventId });
   }

   // También enviar al servidor
   await sendServerEvent('PageView', pageData, {}, eventId);

   return eventId;
}
