// ==============================================
// ✅ PASO 4: NUEVO HOOK COMPATIBLE
// ==============================================

// src/hooks/useMetaPixel.js - NUEVA VERSIÓN COMPATIBLE
import { trackEvent } from '@utils/metaPixel.js';

export function useMetaPixel(pixelId) {
   const trackPurchase = async (value, currency, contentIds) => {
      const userData = {}; // Se puede agregar email, phone, etc. desde el formulario

      return await trackEvent(
         'Purchase',
         {
            value: parseFloat(value),
            currency: currency,
            content_ids: contentIds,
            content_type: 'product',
            num_items: contentIds.length,
         },
         userData,
      );
   };

   const trackInitiateCheckout = async (value, currency, contentIds) => {
      return await trackEvent(
         'InitiateCheckout',
         {
            value: parseFloat(value),
            currency: currency,
            content_ids: contentIds,
            content_type: 'product',
            num_items: contentIds.length,
         },
         {},
      );
   };

   const trackLead = async (customData = {}, userData = {}) => {
      return await trackEvent('Lead', customData, userData);
   };

   const trackCustomEvent = async (eventName, customData = {}, userData = {}) => {
      return await trackEvent(eventName, customData, userData);
   };

   return {
      trackPurchase,
      trackInitiateCheckout,
      trackLead,
      trackEvent: trackCustomEvent,
   };
}
