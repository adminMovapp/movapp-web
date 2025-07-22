// src/hooks/useCountryConfig.js
import { useEffect, useState } from "react";
import countries from "@utils/configCountries.json";
import { getCountry } from "@/api/api";

const useCountryConfig = () => {
   const value = "CO";
   const [country, setCountry] = useState(value);
   const [config, setConfig] = useState(countries[value]);

   useEffect(() => {
      const getCountryConfig = async () => {
         try {
            const { country, config } = await getCountry("MX");
            setCountry(country);
            setConfig(config);
         } catch (error) {
            console.warn("No se pudo detectar país !!");
            setCountry(value);
            setConfig(countries[value]);
         }
      };
      getCountryConfig();
   }, []);

   return { country, config };
};

export default useCountryConfig;
