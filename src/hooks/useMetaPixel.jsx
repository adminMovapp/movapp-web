import { buildPurchasePayload } from '@utils/metaPixelPayloads.js';

export function useMetaPixel() {
   // OJO: "Purchase" ya no se dispara desde el checkout (ShopIsland) sino
   // desde /success una vez confirmado el pago (ver success.astro). Este
   // método queda disponible para otros flujos; el payload vive en
   // buildPurchasePayload para que ambos lugares manden la misma forma.
   const trackPurchase = async (value, currency, contentIds, additionalData = {}) => {
      if (typeof window !== 'undefined' && window.metaPixel) {
         const { customData, userData } = buildPurchasePayload(value, currency, contentIds, additionalData);
         // userData se hashea en el servidor (meta-conversion.js)
         return await window.metaPixel.track('Purchase', customData, userData);
      } else {
         console.warn('Meta Pixel not available');
         return null;
      }
   };

   const trackInitiateCheckout = async (value, currency, contentIds, additionalData = {}) => {
      if (typeof window !== 'undefined' && window.metaPixel) {
         return await window.metaPixel.track(
            'InitiateCheckout',
            {
               // Parámetros básicos
               value: parseFloat(value),
               currency: currency,
               content_ids: contentIds,
               content_type: 'product',
               num_items: contentIds.length,

               // Información del producto
               content_name: additionalData.productName || contentIds[0] || 'El Hack',
               content_category: 'digital_solution',

               // Información del contexto
               event_source_url: window.location.href,
               page_title: document.title,

               // Datos del checkout
               checkout_method: 'form',
               country: additionalData.country || 'MX',

               // Custom parameters
               product_quantity: additionalData.quantity || 1,
               unit_price: additionalData.unitPrice || parseFloat(value),
               funnel_step: 'checkout_initiated',
            },
            {
               // Datos del usuario (si están disponibles en este punto)
               country: additionalData.country ? [additionalData.country] : undefined,
            },
         );
      } else {
         console.warn('Meta Pixel not available');
         return null;
      }
   };

   // Evento adicional para el funnel completo
   const trackAddToCart = async (value, currency, contentIds, additionalData = {}) => {
      if (typeof window !== 'undefined' && window.metaPixel) {
         return await window.metaPixel.track(
            'AddToCart',
            {
               value: parseFloat(value),
               currency: currency,
               content_ids: contentIds,
               content_type: 'product',
               content_name: additionalData.productName || contentIds[0] || 'El Hack',
               content_category: 'digital_solution',
               num_items: contentIds.length,
               event_source_url: window.location.href,
               country: additionalData.country || 'MX',
               product_quantity: additionalData.quantity || 1,
            },
            {},
         );
      }
      return null;
   };

   // Evento para cuando el usuario ve el producto
   const trackViewContent = async (value, currency, contentIds, additionalData = {}) => {
      if (typeof window !== 'undefined' && window.metaPixel) {
         return await window.metaPixel.track(
            'ViewContent',
            {
               value: parseFloat(value),
               currency: currency,
               content_ids: contentIds,
               content_type: 'product',
               content_name: additionalData.productName || contentIds[0] || 'El Hack',
               content_category: 'digital_solution',
               event_source_url: window.location.href,
               country: additionalData.country || 'MX',
            },
            {},
         );
      }
      return null;
   };

   return {
      trackPurchase,
      trackInitiateCheckout,
      trackAddToCart,
      trackViewContent,
   };
}
