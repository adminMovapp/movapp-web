import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const InitAOS = () => {
   useEffect(() => {
      AOS.init({
         duration: 800,
         once: true,
         disable: () => window.innerWidth < 768, // ⛔ Desactiva AOS en móviles
      });
   }, []);

   return null;
};

export default InitAOS;
