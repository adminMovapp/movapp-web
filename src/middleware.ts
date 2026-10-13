import type { APIContext, MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import {
   SITE_LOCK_COOKIE_NAME,
   SITE_LOCK_GATE_PATH,
   SITE_LOCK_VERIFY_PATH,
   applyNoCacheHeaders,
   getSiteLockPassword,
   isSiteLockEnabled,
   verifySiteLockToken,
} from '@/utils/siteLock';
import { applyHeaders, buildSecurityHeaders, parseOrigin } from '@/utils/securityHeaders';

// Este middleware hace dos cosas, en este orden:
//  1. Candado de acceso a todo el sitio (handleSiteLock, más abajo).
//  2. Cabeceras de seguridad (CSP, HSTS, X-Frame-Options...) en TODA
//     respuesta que salga de acá, pase o no por el candado: páginas SSR,
//     endpoints .ts (robots.txt, sitemap...), 404/500 y los 302/503 del
//     propio candado. Los archivos estáticos del CDN (blog prerenderizado,
//     /_astro, /img...) no pasan por el middleware: a esos se las pone el
//     bloque [[headers]] de netlify.toml, que tiene que decir lo mismo que
//     src/utils/securityHeaders.ts (`npm run check:headers`).
//
// Cableado en build-time: PUBLIC_API_LINK es PUBLIC_ (se inlinea como string
// literal, una URL no cae en el pitfall "true"->boolean del candado) y
// import.meta.env.DEV también. No pasa por process.env a propósito.
//
// Hueco conocido: el 301 de trailingSlash: 'always' (/tienda -> /tienda/) lo
// produce Astro antes de llegar al middleware, así que en modo función SSR
// sale sin estas cabeceras. Con el candado activo (modo Edge) sí pasa por
// acá. Un 301 sin cuerpo no es vector de clickjacking/XSS y ZAP no evalúa
// 3xx en el umbral por defecto.
const API_ORIGIN = parseOrigin(import.meta.env.PUBLIC_API_LINK);
if (!API_ORIGIN) {
   console.warn('[securityHeaders] PUBLIC_API_LINK ausente o inválida: connect-src de la CSP no incluye la API.');
}
const SECURITY_HEADERS = buildSecurityHeaders({ apiOrigin: API_ORIGIN, dev: import.meta.env.DEV });

// Candado de acceso a todo el sitio: se activa/desactiva con SITE_LOCK_ENABLED
// (env var de servidor, no PUBLIC_ -- nunca debe llegar al bundle de cliente).
// Sin cookie de acceso válida, redirige a la landing "Próximamente"
// (src/pages/en-desarrollo.astro) en vez de usar HTTP Basic Auth: el popup
// nativo del navegador no tiene ninguna identidad visual del sitio.
//
// Mientras el candado está activo en el build, este middleware se despliega
// como Netlify Edge Function (ver "edgeMiddleware" en astro.config.mjs), así
// que también intercepta las páginas prerenderizadas del blog -- esas se
// sirven como HTML estático desde el CDN y, con el middleware dentro de la
// función SSR, nunca pasaban por acá.

// Recursos que la propia landing del candado necesita para verse (o que no
// exponen contenido del sitio), y las Netlify Functions de /api/*, que siguen
// fuera del candado a propósito (webhooks/formularios, ver CLAUDE.md).
const PUBLIC_PATH_PREFIXES = ['/_astro/', '/.netlify/', '/api/', '/img/', '/js/'];
const PUBLIC_FILES = new Set([
   '/ico-movapp.ico',
   '/favicon.ico',
   '/favicon-32x32.png',
   '/favicon-16x16.png',
   '/apple-touch-icon.png',
]);

function isPublicAsset(pathname: string): boolean {
   return PUBLIC_FILES.has(pathname) || PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// Una Response de fetch/Response.redirect (y la que devuelve context.next()
// en la Edge Function) puede traer headers inmutables; en ese caso se copia
// a una Response nueva antes de agregar las cabeceras.
function withHeaders(response: Response, apply: (headers: Headers) => void): Response {
   try {
      apply(response.headers);
      return response;
   } catch {
      const copy = new Response(response.body, response);
      apply(copy.headers);
      return copy;
   }
}

const withNoCache = (response: Response) => withHeaders(response, applyNoCacheHeaders);
const withSecurityHeaders = (response: Response) =>
   withHeaders(response, (headers) => applyHeaders(headers, SECURITY_HEADERS));

function normalizePath(pathname: string): string {
   return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

async function handleSiteLock(context: APIContext, next: MiddlewareNext): Promise<Response> {
   if (!isSiteLockEnabled()) return next();

   // Astro también ejecuta el middleware al prerenderizar en el build: sin
   // este corte, cada dist/blog/*/index.html se generaba como un stub de
   // redirección a la landing en vez del artículo real. El candado de esas
   // páginas lo pone la Edge Function en cada request, cuyo contexto siempre
   // trae isPrerendered: false (ver writeMiddleware de @astrojs/netlify).
   // Efecto secundario solo en `astro dev`: ahí esas rutas también cuentan
   // como prerenderizadas, así que el blog queda sin candado en local.
   if (context.isPrerendered) return next();

   const { pathname } = context.url;
   if (isPublicAsset(pathname)) return next();

   const path = normalizePath(pathname);
   if (path === normalizePath(SITE_LOCK_GATE_PATH) || path === normalizePath(SITE_LOCK_VERIFY_PATH)) {
      return withNoCache(await next());
   }

   // Falla cerrado: sin contraseña configurada nadie entra (verifySiteLockToken
   // devuelve false con password vacía), en vez de dejar el sitio abierto.
   const token = context.cookies.get(SITE_LOCK_COOKIE_NAME)?.value;
   if (await verifySiteLockToken(token, getSiteLockPassword())) {
      return withNoCache(await next());
   }

   const redirectTo = encodeURIComponent(pathname + context.url.search);
   const response = new Response(null, {
      status: 302,
      headers: { Location: `${SITE_LOCK_GATE_PATH}?redirect_to=${redirectTo}` },
   });
   applyNoCacheHeaders(response.headers);
   // Cookie inválida/expirada: se borra para no reenviarla en cada request.
   // Set-Cookie a mano, no context.cookies.delete(): en la Edge Function el
   // adaptador devuelve esta Response tal cual y no le adjunta las cookies
   // del contexto de Astro.
   if (token !== undefined) {
      response.headers.append('Set-Cookie', `${SITE_LOCK_COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
   }
   return response;
}

export const onRequest = defineMiddleware(async (context, next) => {
   // Las cabeceras se aplican también a las respuestas de prerender del
   // build (se descartan al escribir el HTML, inofensivo) -- así en
   // `astro dev`, donde el blog cuenta como prerenderizado, la CSP se puede
   // probar igual en esas rutas.
   return withSecurityHeaders(await handleSiteLock(context, next));
});
