/**
 * Envía un evento al dataLayer
 */
export function trackEvent(eventName, eventData = {}) {
   console.log('📊 Event:', eventName, eventData);

   if (window.dataLayer) {
      window.dataLayer.push({
         event: eventName,
         ...eventData,
      });
   }

   if (window.gtag) {
      window.gtag('event', eventName, eventData);
   }
}
