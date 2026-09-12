// src/utils/dataLayer.js
//
// Único punto de push a window.dataLayer para eventos GA4 que requieren
// datos estructurados (items[], value, transaction_id) que un trigger de
// GTM basado en DOM no puede ensamblar -- ver doc maestro de tracking,
// hoja 05. Los CTAs de navegación (whatsapp, app_select) NO pasan por acá:
// usan atributos data-* leídos directo por GTM (ver ButtonContact.astro).
export function pushToDataLayer(event, params = {}) {
   if (typeof window === 'undefined') return;
   window.dataLayer = window.dataLayer || [];
   window.dataLayer.push({ event, ...params });
}

// Mapea el shape real del carrito (español: producto_id/nombre/precio) al
// shape de items[] que espera GA4 ecommerce. `quantityOverride` sirve para
// reportar la cantidad de UNA acción (p.ej. 1 unidad agregada) en vez de la
// cantidad total que quede en el carrito.
export function mapCartItemToGA4(item, quantityOverride) {
   return {
      item_id: item.producto_id,
      item_name: item.nombre,
      item_category: 'Software',
      price: Number.parseFloat(item.precio) || 0,
      quantity: quantityOverride ?? item.quantity ?? 1,
   };
}
