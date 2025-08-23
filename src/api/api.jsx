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
         throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      return data;
   } catch (err) {
      // console.error('Error al crear preferencia:', err.message);
      throw err;
   }
};
