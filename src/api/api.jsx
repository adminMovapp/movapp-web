import countries from '../utils/configCountries.json';
const urlApi = import.meta.env.PUBLIC_API_LINK;

import { encryptData, decryptData } from '../utils/crypto.js'; // Ajusta la ruta según tu estructura

export const getCountry = async (defaultCode = 'MX') => {
   try {
      const res = await fetch(import.meta.env.PUBLIC_IPAPI_LINK);
      const data = await res.json();
      const codigo = data.country_code?.toUpperCase() || defaultCode;

      //  const codigo = defaultCode;

      return {
         country: codigo || 'MX',
         config: countries[codigo] || countries['MX'],
      };
   } catch (error) {
      console.warn('No se pudo detectar país, usando por defecto:', defaultCode);
      return {
         country: 'MX',
         config: countries['MX'],
      };
   }
};

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
