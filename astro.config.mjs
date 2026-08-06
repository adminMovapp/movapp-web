import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import tailwindcss from "@tailwindcss/vite";
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
   // applyBaseStyles: false — evita que la integración inyecte su propio
   // <link> con las directivas @tailwind en cada página. El único punto de
   // entrada de Tailwind es src/styles/global.css, importado en Layout.astro
   // como ?url para poder cargarlo solo cuando hay JavaScript.
   integrations: [tailwind({ applyBaseStyles: false }), react()],

   vite: {
      // plugins: [tailwindcss()],
      resolve: {
         alias: {
            '@': '/src/',
            '@components': '/src/components/',
            '@layouts': '/src/layouts/',
            '@pages': '/src/pages/',
            '@styles': '/src/styles/',
            '@assets': '/src/assets/',
            '@hooks': '/src/hooks/',
            '@context': '/src/context/',
            '@utils': '/src/utils/',
            '@api': '/src/api/',
            '@constants': '/src/constants/',
         },
      },
      // assetsInclude: ['**/*.json']
   },
   output: 'server',
   adapter: netlify(),
   // 'always' (no 'auto'): evita que Astro extraiga los <style> con scope de
   // componente a archivos _astro/*.css enlazados aparte -- Lighthouse los
   // marcaba como "solicitudes de bloqueo de renderización" (ida y vuelta de
   // red extra antes de poder pintar). Inlinearlos en el <head> de la
   // respuesta SSR quita esa espera sin tocar el mecanismo no-js/js (ese
   // sigue siendo aparte: global.css se importa como ?url y se enlaza a mano
   // por JS en Layout.astro, nunca pasa por este pipeline de Vite).
   build: {
      inlineStylesheets: 'always',
   },
   server: {
      // host: '192.168.3.143', //'192.168.3.143', // host: true,
      port: 7001,
      headers: {
         'X-Frame-Options': 'SAMEORIGIN',
         'X-Content-Type-Options': 'nosniff',
         'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
   },
});
