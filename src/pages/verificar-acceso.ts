import type { APIRoute } from 'astro';
import {
   SITE_LOCK_COOKIE_NAME,
   SITE_LOCK_GATE_PATH,
   SITE_LOCK_TTL_SECONDS,
   applyNoCacheHeaders,
   createSiteLockToken,
   getSiteLockPassword,
   timingSafeEqualString,
} from '@/utils/siteLock';

export const prerender = false;

// Construye la Response a mano (no redirect() + cookies.set()) para que la
// Set-Cookie y las cabeceras anti-caché queden sí o sí en el 302 que recibe
// el navegador, sin depender de cómo Astro adjunta las cookies del contexto.
function redirectResponse(location: string, setCookie?: string): Response {
   const response = new Response(null, { status: 302, headers: { Location: location } });
   applyNoCacheHeaders(response.headers);
   if (setCookie) response.headers.append('Set-Cookie', setCookie);
   return response;
}

// A propósito NO vive bajo /api/* -- netlify.toml redirige ese prefijo
// directo a netlify/functions/*, así que un endpoint de Astro ahí nunca
// recibiría el request (ver middleware.ts para el resto del candado).
export const POST: APIRoute = async ({ request, url }) => {
   let password = '';
   let rawRedirectTo = '/';   try {
      const formData = await request.formData();
      password = String(formData.get('password') ?? '');
      rawRedirectTo = String(formData.get('redirect_to') ?? '/');
   } catch {
      // Body ausente o mal formado: se trata como contraseña incorrecta.
   }

   // Solo rutas relativas propias del sitio -- nunca un origen externo
   // (protección contra open redirect vía este campo, incluido "/\evil.com",
   // que algunos navegadores interpretan como "//evil.com").
   const redirectTo = /^\/(?![/\\])/.test(rawRedirectTo) ? rawRedirectTo : '/';

   const expectedPassword = getSiteLockPassword();

   if (!expectedPassword || !password || !timingSafeEqualString(password, expectedPassword)) {
      return redirectResponse(`${SITE_LOCK_GATE_PATH}?error=1&redirect_to=${encodeURIComponent(redirectTo)}`);
   }

   // Max-Age acotado (8 h, SITE_LOCK_TTL_SECONDS) y la misma expiración
   // firmada dentro del token -- el servidor la hace cumplir aunque el
   // navegador conserve la cookie más tiempo. Secure solo fuera de http://
   // (localhost en dev), donde el navegador la descartaría.
   const token = await createSiteLockToken(expectedPassword);
   const secure = url.protocol === 'https:' ? '; Secure' : '';
   const cookie = `${SITE_LOCK_COOKIE_NAME}=${token}; Path=/; Max-Age=${SITE_LOCK_TTL_SECONDS}; HttpOnly; SameSite=Lax${secure}`;

   return redirectResponse(redirectTo, cookie);
};

// GET directo (p. ej. alguien recarga /verificar-acceso tras el POST): de
// vuelta a la landing, nunca un 404/500.
export const GET: APIRoute = () => redirectResponse(SITE_LOCK_GATE_PATH);
