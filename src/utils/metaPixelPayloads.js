// Payloads de eventos de Meta Pixel compartidos entre el hook React
// (src/hooks/useMetaPixel.jsx) y páginas Astro (src/pages/success.astro).
// Un solo lugar construye la forma del evento para que cliente (fbq) y
// servidor (Conversions API, que hashea user_data) reciban lo mismo sin
// duplicar el objeto en dos archivos.

/**
 * Construye customData/userData del evento estándar "Purchase".
 * userData va SIN hashear: la función Netlify meta-conversion.js lo hashea
 * (SHA-256) antes de mandarlo a Meta. No pasar aquí nada ya hasheado.
 */
export function buildPurchasePayload(value, currency, contentIds, additionalData = {}) {
   const ids = Array.isArray(contentIds) ? contentIds : [];
   const numericValue = parseFloat(value);

   const userEmail = additionalData.email || '';
   const userPhone = additionalData.phone || '';
   const userName = additionalData.name || '';
   const userPostalCode = additionalData.postalCode || '';

   const customData = {
      // Parámetros básicos
      value: numericValue,
      currency: currency,
      content_ids: ids,
      content_type: 'product',
      num_items: ids.length,

      // Información del producto
      content_name: additionalData.productName || ids[0] || 'El Hack',
      content_category: 'digital_solution',

      // Información de la transacción
      order_id: additionalData.orderId || `order-${Date.now()}`,

      // Información del contexto
      event_source_url: typeof window !== 'undefined' ? window.location.href : undefined,
      page_title: typeof document !== 'undefined' ? document.title : undefined,

      // Datos adicionales para optimización
      predicted_ltv: additionalData.predictedLtv || numericValue * 1.5, // Valor de vida estimado
      purchase_method: additionalData.paymentMethod || 'stripe',
      country: additionalData.country || 'MX',

      // Custom parameters para segmentación
      customer_type: additionalData.customerType || 'new_customer',
      product_quantity: additionalData.quantity || 1,
      unit_price: additionalData.unitPrice || numericValue,
   };

   const userData = {
      em: userEmail ? [userEmail] : undefined,
      ph: userPhone ? [userPhone.replace(/\D/g, '')] : undefined, // Solo números
      fn: userName ? [userName.split(' ')[0]] : undefined, // Primer nombre
      ln: userName ? [userName.split(' ').slice(1).join(' ')] : undefined, // Apellidos
      zp: userPostalCode ? [userPostalCode] : undefined,
      ct: additionalData.city ? [additionalData.city] : undefined,
      st: additionalData.state ? [additionalData.state] : undefined,
      country: additionalData.country ? [additionalData.country] : undefined,
   };

   return { customData, userData };
}
