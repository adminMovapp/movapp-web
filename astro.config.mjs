import { defineConfig } from "astro/config";
import react from "@astrojs/react";
// import tailwindcss from "@tailwindcss/vite";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
   integrations: [tailwind(), react()],

   vite: {
      // plugins: [tailwindcss()],
      resolve: {
         alias: {
            "@": "/src/",
            "@components": "/src/components/",
            "@layouts": "/src/layouts/",
            "@pages": "/src/pages/",
            "@styles": "/src/styles/",
         },
      },
   },
   output: "static",
   build: {
      inlineStylesheets: "auto",
   },
   server: {
      host: true,
      port: 7001,
   },
});
