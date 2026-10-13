// Cabeceras de seguridad de TODO el sitio (auditoría ZAP, oct. 2026: CSP,
// anti-clickjacking, HSTS, nosniff). Fuente única de verdad.
//
// Se aplican en dos lugares, y los dos tienen que coincidir:
//  - src/middleware.ts: a toda respuesta de la función SSR / Edge Function
//    (páginas, endpoints .ts, 404, 302 del candado...).
//  - netlify.toml [[headers]]: a los archivos estáticos del CDN (blog
//    prerenderizado, /_astro, /img, /js, favicons). Netlify NO aplica esas
//    reglas a respuestas de funciones -- el bloque existía y ZAP reportaba
//    X-Frame-Options ausente en todas las páginas SSR.
//  `npm run check:headers` compara los dos (scripts/check-security-headers.mjs).
//
// Módulo PURO a propósito: sin import.meta.env ni imports. Lo importa el
// middleware (Node en SSR, Deno en la Edge Function) y también el script de
// chequeo con Node a secas (type stripping nativo). El cableado de env vars
// (PUBLIC_API_LINK, DEV) vive en src/middleware.ts.
//
// CSP "pragmática": 'unsafe-inline' en script-src y style-src. El layout
// tiene ~10 <script is:inline> (dos con define:vars por request), los
// snippets inline de GA4 y Meta Pixel, el script inline de hidratación de
// islas de Astro y ~60 atributos style= -- una CSP con nonces/hashes exige
// refactorizar todo eso (experimental.csp de Astro). Cierra el hallazgo
// "CSP header not set" (ZAP 10038); ZAP seguirá marcando 10055
// (unsafe-inline) como Medio, conocido y aceptado.
//
// Origen de cada host permitido (inventario del código):
//  - www.googletagmanager.com: gtag/js (GoogleAnalytics.astro). Collect de
//    GA4: *.google-analytics.com, *.analytics.google.com, stats.g.doubleclick.net.
//  - connect.facebook.net: fbevents.js, lo inyecta public/js/metaPixel.js.
//    www.facebook.com: /tr (img del <noscript> en MetaPixelScript.astro y
//    beacons de fbq).
//  - js.stripe.com, *.js.stripe.com, hooks.stripe.com, api.stripe.com,
//    *.stripe.com: lista oficial de Stripe.js (StripeCheckout.jsx: loadStripe
//    + PaymentElement + confirmPayment con return_url same-origin).
//  - cdn.jsdelivr.net: flag-icons.min.css (Layout.astro); sus SVG se cargan
//    como background-image, por eso también va en img-src.
//  - player.vimeo.com / i.vimeocdn.com: iframe y posters de /prensa
//    (PrensaBroadcast.astro).
//  - apiOrigin: PUBLIC_API_LINK, fetch desde el navegador (src/api/api.jsx,
//    success.astro). Cambia por entorno, por eso es parámetro.
//  - ws:/wss: solo en `astro dev` (HMR de Vite).
//
// NO incluidos porque hoy no se usan (agregar si se reactivan):
//  - YouTube (frame-src https://www.youtube.com): NosotrosVideo.astro no se
//    importa en ninguna página.
//  - Widget de chat LeadConnector (comentado en Layout.astro):
//    https://widgets.leadconnectorhq.com en script/style/img/font/connect y
//    https://services.leadconnectorhq.com en connect-src; confirmar en el
//    navegador si además pide fonts.googleapis.com / fonts.gstatic.com.
//  - Mercado Pago (createPreference sin uso), ipapi.co (sin uso en src/).
//
// Candidatos a aparecer como violación en producción y agregar SOLO si
// disparan: *.g.doubleclick.net, www.google.com, www.google.com.mx (Google
// Signals, connect+img); m.stripe.network (frame-src), m.stripe.com y
// r.stripe.com (connect-src) -- iframe antifraude que inyecta Stripe.js.

export interface SecurityHeaderOptions {
   /** Origen (scheme + host) de PUBLIC_API_LINK. Si falta, connect-src no lo incluye. */
   apiOrigin?: string;
   /** `astro dev`: permite el websocket de HMR y omite upgrade-insecure-requests. */
   dev?: boolean;
}

export type CspDirectives = Record<string, string[]>;

const SELF = "'self'";

// Devuelve el origen de una URL http(s) válida; undefined ante cualquier
// otra cosa (vacío, undefined, texto suelto). Nunca cae a un comodín: si
// PUBLIC_API_LINK está rota la tienda ya está rota, y una violación de CSP
// en consola es la señal visible que conviene tener.
export function parseOrigin(value: unknown): string | undefined {
   if (typeof value !== 'string' || value.trim() === '') return undefined;
   try {
      const url = new URL(value.trim());
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : undefined;
   } catch {
      return undefined;
   }
}

export function cspDirectives({ apiOrigin, dev = false }: SecurityHeaderOptions = {}): CspDirectives {
   const directives: CspDirectives = {
      'default-src': [SELF],
      'script-src': [
         SELF,
         "'unsafe-inline'",
         'https://www.googletagmanager.com',
         'https://connect.facebook.net',
         'https://js.stripe.com',
         'https://*.js.stripe.com',
      ],
      'style-src': [SELF, "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
      'img-src': [
         SELF,
         'data:',
         'blob:',
         'https://cdn.jsdelivr.net',
         'https://i.vimeocdn.com',
         'https://www.facebook.com',
         'https://*.google-analytics.com',
         'https://*.analytics.google.com',
         'https://www.googletagmanager.com',
         'https://*.stripe.com',
      ],
      'connect-src': [
         SELF,
         ...(apiOrigin ? [apiOrigin] : []),
         'https://*.google-analytics.com',
         'https://*.analytics.google.com',
         'https://www.googletagmanager.com',
         'https://stats.g.doubleclick.net',
         'https://www.facebook.com',
         'https://connect.facebook.net',
         'https://api.stripe.com',
         'https://*.js.stripe.com',
         ...(dev ? ['ws:', 'wss:'] : []),
      ],
      'frame-src': [
         'https://js.stripe.com',
         'https://*.js.stripe.com',
         'https://hooks.stripe.com',
         'https://player.vimeo.com',
      ],
      'font-src': [SELF, 'data:'],
      'object-src': ["'none'"],
      'base-uri': [SELF],
      'form-action': [SELF],
      // Junto con X-Frame-Options (navegadores viejos); ZAP acepta cualquiera.
      'frame-ancestors': [SELF],
   };
   // En dev se omite: con server.host en una IP de LAN (astro.config.mjs) el
   // navegador subiría cada http://192.168.x.x/... a https y no cargaría nada.
   if (!dev) directives['upgrade-insecure-requests'] = [];
   return directives;
}

export function buildCsp(directives: CspDirectives): string {
   return Object.entries(directives)
      .map(([name, values]) => (values.length ? `${name} ${values.join(' ')}` : name))
      .join('; ');
}

export function buildSecurityHeaders(options: SecurityHeaderOptions = {}): Record<string, string> {
   return {
      'Content-Security-Policy': buildCsp(cspDirectives(options)),
      // Sin includeSubDomains ni preload: afectaría a todos los subdominios de
      // movapp.org (decisión de infraestructura aparte). En stage Cloudflare
      // ya manda uno igual; se envía desde el origen para no depender de eso
      // (los dominios *.netlify.app y los deploy previews no pasan por CF).
      'Strict-Transport-Security': 'max-age=31536000',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
   };
}

export function applyHeaders(headers: Headers, values: Record<string, string>): void {
   for (const [name, value] of Object.entries(values)) headers.set(name, value);
}
