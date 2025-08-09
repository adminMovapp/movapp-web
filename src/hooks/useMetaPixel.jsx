import { useEffect, useRef } from 'react';

let isPixelInitialized = false;

// Inicializar Meta Pixel
export const initMetaPixel = (pixelId) => {
   if (typeof window === 'undefined' || isPixelInitialized || !pixelId) return;

   console.log('🚀 Inicializando Meta Pixel:', pixelId);

   // Script de Meta Pixel
   !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
   })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

   window.fbq('init', pixelId);
   window.fbq('track', 'PageView');

   console.log('✅ Meta Pixel inicializado: useMetaPixel', pixelId);
   isPixelInitialized = true;
};

// Trackear evento
export const trackEvent = (eventName, parameters = {}) => {
   if (typeof window === 'undefined' || !window.fbq) {
      console.warn('Meta Pixel no disponible para:', eventName);
      return;
   }
   console.log('📊 Tracking:', eventName, parameters);
   window.fbq('track', eventName, parameters);
};

// Trackear compra
export const trackPurchase = (value, currency = 'MXN', contentIds = []) => {
   trackEvent('Purchase', {
      value: value,
      currency: currency,
      content_ids: contentIds,
      content_type: 'product',
   });
};

// Trackear inicio de checkout
export const trackInitiateCheckout = (value, currency = 'MXN', contentIds = []) => {
   trackEvent('InitiateCheckout', {
      value: value,
      currency: currency,
      content_ids: contentIds,
      content_type: 'product',
   });
};

// Hook principal
export const useMetaPixel = (pixelId) => {
   const isInitialized = useRef(false);

   useEffect(() => {
      if (!isInitialized.current && pixelId) {
         initMetaPixel(pixelId);
         isInitialized.current = true;
      }
   }, [pixelId]);

   return {
      trackPurchase,
      trackInitiateCheckout,
      trackEvent,
   };
};
