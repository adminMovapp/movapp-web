import { useEffect, useRef } from 'react';

export const trackEvent = (eventName, parameters = {}) => {
   if (typeof window === 'undefined' || !window.fbq) {
      console.warn('⚠️ Meta Pixel no disponible para:', eventName);
      return;
   }
   console.log('📊 Tracking evento:', eventName, parameters);
   window.fbq('track', eventName, parameters);
};

export const trackPurchase = (value, currency = 'MXN', contentIds = []) => {
   trackEvent('Purchase', {
      value: value,
      currency: currency,
      content_ids: contentIds,
      content_type: 'product',
   });
};

export const trackInitiateCheckout = (value, currency = 'MXN', contentIds = []) => {
   trackEvent('InitiateCheckout', {
      value: value,
      currency: currency,
      content_ids: contentIds,
      content_type: 'product',
   });
};

export const useMetaPixel = (pixelId) => {
   const hasWarned = useRef(false);

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const checkPixel = () => {
            if (window.fbq) {
               console.log('✅ Meta Pixel detectado y listo para tracking');
            } else if (!hasWarned.current) {
               console.warn('⚠️ Meta Pixel no detectado. Asegúrate de que MetaPixelScript esté cargado.');
               hasWarned.current = true;
            }
         };

         checkPixel();
         setTimeout(checkPixel, 1000);
      }
   }, [pixelId]);

   return {
      trackPurchase,
      trackInitiateCheckout,
      trackEvent,
   };
};
