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
const PUBLIC_FILES = new Set(['/ico-movapp.ico', '/favicon.ico', '/favicon-32x32.png', '/favicon-16x16.png', '/apple-touch-icon.png']);

function isPublicAsset(pathname: string): boolean {
   return PUBLIC_FILES.has(pathname) || PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// Una Response de fetch/Response.redirect puede traer headers inmutables;
// en ese caso se copia a una Response nueva antes de agregar las cabeceras.
function withNoCache(response: Response): Response {
   try {
      applyNoCacheHeaders(response.headers);
      return response;
   } catch {
      const copy = new Response(response.body, response);
      applyNoCacheHeaders(copy.headers);
      return copy;
   }
}

function normalizePath(pathname: string): string {
   return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export const onRequest = defineMiddleware(async (context, next) => {
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
});
