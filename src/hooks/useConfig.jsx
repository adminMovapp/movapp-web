import { useEffect, useState } from 'react';
import { getCountries, getPrices } from '@api/api';

// Mapea código de país -> bandera flag-icons
const flagClass = (code) => `fi fi-${String(code || 'mx').toLowerCase()}`;

/**
 * Hook de configuración (paridad con la app móvil):
 *  1. Obtiene países desde /config/countries
 *  2. Mapea el país detectado en el servidor (geo de Netlify, ver src/utils/geo.js) a la lista
 *  3. Obtiene precios en moneda local desde /config/prices?idcountry=<id>
 *
 * Devuelve: { loading, countries, country (código), pais (objeto), prices, bandera }
 */
const useConfig = (initialCountryCode = 'MX') => {
   const [loading, setLoading] = useState(true);
   const [countries, setCountries] = useState([]);
   const [country, setCountry] = useState('MX');
   const [pais, setPais] = useState(null);
   const [prices, setPrices] = useState([]);

   useEffect(() => {
      let cancelled = false;

      const init = async () => {
         try {
            // 1. Países
            const list = await getCountries();
            if (cancelled) return;
            setCountries(list);

            // 2. País detectado en el servidor (prop, ya resuelto vía geo de Netlify)
            const code = String(initialCountryCode || 'MX').toUpperCase();

            // 3. Mapear código -> país de la lista (fallback MX / primer país)
            let selected =
               list.find((p) => String(p.codigo_pais).toUpperCase() === code) ||
               list.find((p) => String(p.codigo_pais).toUpperCase() === 'MX') ||
               list[0] ||
               null;

            if (cancelled) return;
            if (selected) {
               setPais(selected);
               setCountry(String(selected.codigo_pais).toUpperCase());
            }

            // 4. Precios en moneda local del país
            if (selected?.id != null) {
               const pr = await getPrices(selected.id);
               if (!cancelled) setPrices(pr);
            }
         } catch (err) {
            console.warn('useConfig error:', err?.message || err);
         } finally {
            if (!cancelled) setLoading(false);
         }
      };

      init();
      return () => {
         cancelled = true;
      };
   }, []);

   return { loading, countries, country, pais, prices, bandera: flagClass(country) };
};

export default useConfig;
