import { useEffect, useRef } from 'react';

export const generateEventId = () => {
   return 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10);
};

export const trackEvent = (eventName, parameters = {}, eventId = null) => {
   if (typeof window === 'undefined' || !window.fbq) return;
   window.fbq('track', eventName, parameters, eventId ? { eventID: eventId } : {});
};

export const trackPurchase = (value, currency = 'MXN', contentIds = [], eventId = null) => {
   trackEvent(
      'Purchase',
      {
         value,
         currency,
         content_ids: contentIds,
         content_type: 'product',
      },
      eventId,
   );
};

export const trackInitiateCheckout = (value, currency = 'MXN', contentIds = [], eventId = null) => {
   trackEvent(
      'InitiateCheckout',
      {
         value,
         currency,
         content_ids: contentIds,
         content_type: 'product',
      },
      eventId,
   );
};

export const useMetaPixel = (pixelId) => {
   const hasWarned = useRef(false);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const checkPixel = () => {
            if (window.fbq) {
               console.log('✅ Meta Pixel cargado');
            } else if (!hasWarned.current) {
               console.warn('⚠️ Meta Pixel no detectado.');
               hasWarned.current = true;
            }
         };

         checkPixel();
         setTimeout(checkPixel, 1000);
      }
   }, [pixelId]);

   return {
      trackEvent,
      trackPurchase,
      trackInitiateCheckout,
   };
};
