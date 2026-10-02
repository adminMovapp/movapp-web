// Compartido entre src/middleware.ts (verifica la cookie en cada request) y
// src/pages/verificar-acceso.ts (la emite tras validar la contraseña).
//
// Solo Web Crypto (crypto.subtle), nada de node:crypto: mientras el candado
// está activo el middleware corre como Netlify Edge Function (Deno, ver
// "edgeMiddleware" en astro.config.mjs) y en dev/SSR corre en Node -- Web
// Crypto es la única API idéntica en los dos runtimes.
export const SITE_LOCK_GATE_PATH = '/en-desarrollo';
export const SITE_LOCK_VERIFY_PATH = '/verificar-acceso';
export const SITE_LOCK_COOKIE_NAME = 'site_access';

// TTL de la cookie Y del token firmado adentro: aunque alguien extraiga la
// cookie del navegador y le quite el Max-Age, el servidor la rechaza igual
// pasado este plazo porque la expiración va firmada en el propio token.
export const SITE_LOCK_TTL_SECONDS = 8 * 60 * 60;

// Cabeceras anti-caché para toda respuesta mientras el candado está activo
// (la página desbloqueada, la landing del candado y los 302 hacia ella).
// El adaptador no cachea páginas SSR por defecto (cacheOnDemandPages: false),
// pero se fuerzan igual: una respuesta desbloqueada guardada en cualquier
// caché intermedia (CDN, proxy, bfcache) quedaría servida a quien no tiene
// cookie.
export const SITE_LOCK_NO_CACHE_HEADERS: Record<string, string> = {
   'Cache-Control': 'private, no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
   Pragma: 'no-cache',
   Expires: '0',
   'Surrogate-Control': 'no-store',
   'CDN-Cache-Control': 'no-store',
   'Netlify-CDN-Cache-Control': 'no-store',
   Vary: 'Cookie',
};

// Lectura en RUNTIME (process.env), no import.meta.env: Astro inlinea las
// env vars privadas en el build, y si el valor es "true"/"false"/"0"/"1" lo
// inlinea como literal booleano/numérico, no como string -- el viejo
// `import.meta.env.SITE_LOCK_ENABLED === 'true'` compilaba a
// `true === 'true'` (siempre false) y el middleware del build de Netlify
// quedaba reducido a `return next()`. process.env existe en la función SSR
// (Node) y en la Edge Function (el adaptador importa el polyfill de
// node:process); import.meta.env queda solo como respaldo para `astro dev`,
// donde las variables del .env no llegan a process.env. String() normaliza
// el caso booleano por si ese respaldo llega a usarse en un build.
export function readServerEnv(runtimeValue: string | undefined, buildValue: unknown): string {
   const value = runtimeValue ?? buildValue;
   return value === undefined || value === null ? '' : String(value).trim();
}

export function isSiteLockEnabled(): boolean {
   const runtime = typeof process !== 'undefined' ? process.env.SITE_LOCK_ENABLED : undefined;
   return readServerEnv(runtime, import.meta.env.SITE_LOCK_ENABLED).toLowerCase() === 'true';
}

export function getSiteLockPassword(): string {
   const runtime = typeof process !== 'undefined' ? process.env.SITE_LOCK_PASSWORD : undefined;
   // readServerEnv recorta espacios del valor configurado (un espacio
   // accidental al pegarla en el panel de Netlify es el error más común);
   // lo que escribe el usuario en el formulario se compara tal cual.
   return readServerEnv(runtime, import.meta.env.SITE_LOCK_PASSWORD);
}

const encoder = new TextEncoder();

async function hmacHex(secret: string, message: string): Promise<string> {
   const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
   const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
   return Array.from(new Uint8Array(signature), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Comparación en tiempo constante (no corta en el primer carácter distinto),
// para no filtrar por tiempo de respuesta cuántos caracteres coinciden.
export function timingSafeEqualString(a: string, b: string): boolean {
   const aBytes = encoder.encode(a);
   const bBytes = encoder.encode(b);
   let diff = aBytes.length ^ bBytes.length;
   const length = Math.max(aBytes.length, bBytes.length);
   for (let i = 0; i < length; i++) {
      diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
   }
   return diff === 0;
}

// Token = "<expiraEnSegundosUnix>.<HMAC-SHA256(contraseña, prefijo + expira)>".
// La contraseña es la clave del HMAC y nunca viaja en la cookie. Si
// SITE_LOCK_PASSWORD cambia, todas las cookies emitidas antes dejan de
// validar solas.
export async function createSiteLockToken(password: string, nowMs = Date.now()): Promise<string> {
   const expiresAt = Math.floor(nowMs / 1000) + SITE_LOCK_TTL_SECONDS;
   const signature = await hmacHex(password, `site-lock:v1:${expiresAt}`);
   return `${expiresAt}.${signature}`;
}

// Falla cerrado ante cualquier cosa que no sea un token bien formado,
// vigente y firmado con la contraseña actual: cookie ausente, "", "undefined",
// "null", formato viejo (sha256 sin expiración), expirada o manipulada.
export async function verifySiteLockToken(token: string | undefined, password: string, nowMs = Date.now()): Promise<boolean> {
   if (!password || typeof token !== 'string') return false;

   const match = /^(\d{10})\.([0-9a-f]{64})$/.exec(token);
   if (!match) return false;

   const expiresAt = Number(match[1]);
   const nowSeconds = Math.floor(nowMs / 1000);
   // También rechaza una expiración más lejana que el TTL: nadie debería
   // poder fabricar un token "eterno" aunque adivinara el formato.
   if (expiresAt <= nowSeconds || expiresAt > nowSeconds + SITE_LOCK_TTL_SECONDS) return false;

   const expected = await hmacHex(password, `site-lock:v1:${expiresAt}`);
   return timingSafeEqualString(match[2], expected);
}

export function applyNoCacheHeaders(headers: Headers): void {
   for (const [name, value] of Object.entries(SITE_LOCK_NO_CACHE_HEADERS)) {
      headers.set(name, value);
   }
}
