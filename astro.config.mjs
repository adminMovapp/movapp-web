import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
   integrations: [react()],
   alias: {
      "@": "./src",
      "@components": "/src/components",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
   },
   vite: {
      plugins: [tailwindcss()],
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
