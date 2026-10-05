const urlApi = import.meta.env.PUBLIC_API_LINK;

import { encryptData, decryptData } from '../utils/crypto.js'; // Ajusta la ruta según tu estructura

// ============================================
// Config: países y precios (endpoints de la app móvil)
// ============================================
export const getCountries = async () => {
   try {
      const res = await fetch(`${urlApi}/config/countries`);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data?.countries) ? data.countries : [];
   } catch (err) {
      console.warn('No se pudieron obtener países:', err.message);
      return [];
   }
};

export const getPrices = async (idcountry) => {
   try {
      const res = await fetch(`${urlApi}/config/prices?idcountry=${idcountry}`);
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data?.prices) ? data.prices : [];
   } catch (err) {
      console.warn('No se pudieron obtener precios:', err.message);
      return [];
   }
};

// País de la lista de /config/countries para un código ISO (geo de
// Netlify), con fallback a MX y luego al primero. Compartido por useConfig
// (tienda) y getLocalizedPrices (/el-hack) para que los dos resuelvan el
// mismo país -- y por lo tanto el mismo precio y moneda.
export const selectCountry = (list, code = 'MX') => {
   const wanted = String(code || 'MX').toUpperCase();
   return (
      list.find((p) => String(p.codigo_pais).toUpperCase() === wanted) ||
      list.find((p) => String(p.codigo_pais).toUpperCase() === 'MX') ||
      list[0] ||
      null
   );
};

// countries -> país -> precios en moneda local, sin estado de React.
export const getLocalizedPrices = async (code) => {
   const pais = selectCountry(await getCountries(), code);
   const prices = pais?.id != null ? await getPrices(pais.id) : [];
   return { pais, prices };
};

export const createStripeIntent = async (payload) => {
   try {
      const res = await fetch(`${urlApi}/payments/web/stripe/create-intent`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(payload),
      });

      if (!res.ok) {
         const errorData = await res.text();
         console.error('Error response:', errorData);
         throw new Error(`Error HTTP: ${res.status} - ${errorData}`);
      }

      const data = await res.json();
      return data; // { success, clientSecret, intentId, orderId, orderNumber }
   } catch (err) {
      console.error('Error al crear PaymentIntent de Stripe:', err.message);
      throw err;
   }
};

export const createPreference = async (payload) => {
   const encryptedPayload = encryptData(payload);

   try {
      const res = await fetch(`${urlApi}/payments/create-preference`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ data: encryptedPayload }),
      });

      if (!res.ok) {
         const errorData = await res.text(); // Usar text() en lugar de json()
         console.error('Error response:', errorData);
         throw new Error(`Error HTTP: ${res.status} - ${errorData}`);
      }

      const data = await res.json();
      return data;
   } catch (err) {
      console.error('Error al crear preferencia:', err.message);
      throw err;
   }
};
