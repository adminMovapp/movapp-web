// src/utils/productView.js
//
// "Vio el producto" (view_item en GA4 + ViewContent en Meta, navegador y
// Conversions API) a partir de UN objeto de producto de /config/prices --
// el mismo shape (producto_id/nombre/precio/moneda) que pinta la tienda.
// Lo usan ShopIsland.jsx y ElHackHero.astro, para que las dos vistas de El
// Hack lleguen con el mismo ID, categoría, precio y moneda que AddToCart y
// Purchase: si el ID no coincide, Meta no relaciona "vio" con "compró".
import { pushToDataLayer, mapCartItemToGA4 } from '@utils/dataLayer.js';
import { buildViewContentPayload } from '@utils/metaPixelPayloads.js';

export function trackProductView(product, country) {
   const item = mapCartItemToGA4(product, 1);
   // Sin precio conocido (API caída en /el-hack) se manda el evento igual,
   // con el ID correcto, pero sin value/currency -- nunca un value: 0.
   const hasPrice = item.price > 0 && Boolean(product.moneda);
   if (!hasPrice) delete item.price;

   pushToDataLayer('view_item', {
      ...(hasPrice ? { currency: product.moneda, value: item.price } : {}),
      items: [item],
   });

   window.metaPixel?.track(
      'ViewContent',
      buildViewContentPayload(item.price, product.moneda, [String(product.producto_id)], {
         productName: product.nombre,
         country,
      }),
      {},
   );
}
