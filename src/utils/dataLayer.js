// src/utils/dataLayer.js
//
// Único punto de emisión de eventos GA4 desde el código (islas de React,
// scripts de página). Va por window.gtag, que define GoogleAnalytics.astro en
// el <head>: gtag.js SOLO procesa comandos gtag() (entradas tipo Arguments en
// dataLayer); un objeto plano {event, ...} solo lo entiende un contenedor de
// Google Tag Manager con triggers, y el sitio no usa GTM -- los pushes de ese
// estilo se quedaban en el aire sin llegar nunca a GA4.
//
// Si window.gtag no existe (?minimal=1, o build sin PUBLIC_GA4_ID: local y
// cualquier contexto sin la variable) no se emite nada, a propósito.
//
// Los CTAs de navegación (WhatsApp, enlaces internos/externos, tarjetas de
// apps) NO pasan por acá: llevan atributos data-* que lee un listener
// delegado en Layout.astro (whatsapp_click / cta_click / app_select).
export function pushToDataLayer(event, params = {}) {
   if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
   window.gtag('event', event, params);
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
