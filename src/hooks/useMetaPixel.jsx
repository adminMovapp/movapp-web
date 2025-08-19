export function useMetaPixel(pixelId) {
   const trackPurchase = async (value, currency, contentIds) => {
      if (typeof window !== 'undefined' && window.metaPixel) {
         return await window.metaPixel.track(
            'Purchase',
            {
               value: parseFloat(value),
               currency: currency,
               content_ids: contentIds,
               content_type: 'product',
               num_items: contentIds.length,
            },
            {},
         );
      } else {
         console.warn('Meta Pixel not available');
         return null;
      }
   };

   const trackInitiateCheckout = async (value, currency, contentIds) => {
      if (typeof window !== 'undefined' && window.metaPixel) {
         return await window.metaPixel.track(
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
      } else {
         console.warn('Meta Pixel not available');
         return null;
      }
   };

   return {
      trackPurchase,
      trackInitiateCheckout,
   };
}
