// src/hooks/useCountryConfig.js
import { useEffect, useState } from 'react';
import countries from '@utils/configCountries.json';
import { getCountry } from '@/api/api';

const useCountryConfig = () => {
   const defaultCountry = 'MX'; // País predeterminado
   const [country, setCountry] = useState(defaultCountry);
   const [config, setConfig] = useState(countries[defaultCountry] || {});
   useEffect(() => {
      const getCountryConfig = async () => {
         try {
            const { country: fetchedCountry, config: fetchedConfig } = await getCountry(defaultCountry);

            if (fetchedCountry && fetchedConfig) {
               setCountry(fetchedCountry);
               setConfig(fetchedConfig);
            } else {
               console.warn(
                  `No se encontró configuración para el país ${defaultCountry}. Usando configuración predeterminada.`,
               );
               setConfig(countries[defaultCountry] || {});
            }
         } catch (error) {
            console.warn('No se pudo detectar el país o hubo un error con la API.');
            setCountry(defaultCountry);
            setConfig(countries[defaultCountry] || {});
         }
      };

      getCountryConfig();
   }, []); // Empty dependency array means this effect runs once on mount

   return { country, config };
};

export default useCountryConfig;
