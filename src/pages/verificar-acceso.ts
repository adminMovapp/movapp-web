import type { APIRoute } from 'astro';
import { SITE_LOCK_COOKIE_NAME, SITE_LOCK_GATE_PATH, hashSiteLockPassword } from '@/utils/siteLock';

export const prerender = false;

// A propósito NO vive bajo /api/* -- netlify.toml redirige ese prefijo
// directo a netlify/functions/*, así que un endpoint de Astro ahí nunca
// recibiría el request (ver middleware.ts para el resto del candado).
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
   const formData = await request.formData();
   const password = String(formData.get('password') ?? '');
   // Solo rutas relativas propias del sitio -- nunca un origen externo
   // (protección contra open redirect vía este campo).
   const rawRedirectTo = String(formData.get('redirect_to') ?? '/');
   const redirectTo = rawRedirectTo.startsWith('/') && !rawRedirectTo.startsWith('//') ? rawRedirectTo : '/';

   const expectedPassword = import.meta.env.SITE_LOCK_PASSWORD;

   if (!expectedPassword || password !== expectedPassword) {
      return redirect(`${SITE_LOCK_GATE_PATH}?error=1&redirect_to=${encodeURIComponent(redirectTo)}`);
   }

   // Sin maxAge/expires a propósito: cookie de sesión -- a pedido, debe
   // volver a pedir la contraseña al cerrar el navegador y abrirlo de
   // nuevo, no quedar desbloqueado por semanas.
   cookies.set(SITE_LOCK_COOKIE_NAME, hashSiteLockPassword(expectedPassword), {
      path: '/',
      httpOnly: true,
      secure: !import.meta.env.DEV,
      sameSite: 'lax',
   });

   return redirect(redirectTo);
};
