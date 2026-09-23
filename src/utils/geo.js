// País del visitante resuelto por Netlify en el edge (header x-nf-geo), no por
// navigator.language ni por una llamada a un tercero desde el navegador. Ver
// node_modules/@astrojs/netlify/dist/ssr-function.js -- locals.netlify.context
// está disponible en cualquier ruta SSR sin config extra. En `astro dev` sin
// `netlify dev` cae al mock que trae el adaptador (country.code: "mock").
export function getServerCountry(Astro, fallback = 'MX') {
   const code = Astro?.locals?.netlify?.context?.geo?.country?.code;
   if (typeof code === 'string' && /^[a-zA-Z]{2}$/.test(code)) {
      return code.toUpperCase();
   }
   return fallback;
}
