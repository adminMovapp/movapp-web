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
   build: {
      inlineStylesheets: 'auto',
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
