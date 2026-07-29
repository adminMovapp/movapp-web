import { useEffect } from 'react';
import AOS from 'aos';

// El CSS de AOS se carga desde Layout.astro (junto con Tailwind) a través del
// mismo <script> condicionado a JavaScript — ver src/layouts/Layout.astro.
// No se importa aquí para que Astro no lo enlace automáticamente en el
// <head> de cada página sin JS.

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
