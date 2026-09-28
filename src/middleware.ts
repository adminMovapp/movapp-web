import { defineMiddleware } from 'astro:middleware';
import {
   SITE_LOCK_COOKIE_NAME,
   SITE_LOCK_GATE_PATH,
   SITE_LOCK_VERIFY_PATH,
   hashSiteLockPassword,
   isSiteLockEnabled,
} from '@/utils/siteLock';

// Candado de acceso a todo el sitio: se activa/desactiva con SITE_LOCK_ENABLED
// (env var de servidor, no PUBLIC_ -- nunca debe llegar al bundle de cliente).
// Sin cookie de acceso válida, redirige a la landing "Próximamente"
// (src/pages/en-desarrollo.astro) en vez de usar HTTP Basic Auth: el popup
// nativo del navegador no tiene ninguna identidad visual del sitio. No cubre
// netlify/functions/* (rutas /api/*) -- son lambdas aparte, fuera del
// pipeline de Astro -- ni assets estáticos, que Netlify sirve desde el CDN
// sin pasar por esta función.
export const onRequest = defineMiddleware((context, next) => {
   if (!isSiteLockEnabled()) return next();

   const { pathname } = context.url;
   if (pathname === SITE_LOCK_GATE_PATH || pathname === SITE_LOCK_VERIFY_PATH) {
      return next();
   }

   const expectedPassword = import.meta.env.SITE_LOCK_PASSWORD;
   const token = context.cookies.get(SITE_LOCK_COOKIE_NAME)?.value;

   if (expectedPassword && token === hashSiteLockPassword(expectedPassword)) {
      return next();
   }

   const redirectTo = encodeURIComponent(pathname + context.url.search);
   return context.redirect(`${SITE_LOCK_GATE_PATH}?redirect_to=${redirectTo}`);
});
