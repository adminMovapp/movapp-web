import { siteConfigData } from './site-config.jsx';

function resolveEnv(hostname) {
   if (!hostname || hostname === 'localhost' || hostname.startsWith('localhost:') || hostname.startsWith('127.') || hostname.startsWith('192.168.')) {
      return 'development';
   }
   if (siteConfigData.stagingHostnames.some(h => hostname.includes(h))) {
      return 'staging';
   }
   // Variable de entorno como fallback (útil en build time o SSR sin request)
   const envVar = import.meta.env.PUBLIC_SITE_ENV;
   if (envVar === 'staging' || envVar === 'development') return envVar;
   return 'production';
}

function buildConfig(env) {
   const isDev = env === 'development';
   const isStaging = env === 'staging';
   const isProduction = env === 'production';

   return {
      ...siteConfigData,
      environment: env,
      isDev,
      isStaging,
      isProduction,
      debugMode: !isProduction,

      get siteUrl() {
         if (isStaging) return this.urls.staging;
         if (isDev) return this.urls.development;
         return this.urls.production;
      },
      get canonicalUrl() { return this.siteUrl; },
      get noIndex() { return isStaging || isDev; },
      get robotsContent() {
         return isStaging || isDev ? this.seo.robots.staging : this.seo.robots.production;
      },
      get logoUrl() { return `${this.siteUrl}${this.assets.logo}`; },
      get defaultImage() { return `${this.siteUrl}${this.assets.defaultOgImage}`; },
   };
}

// Resuelve config a partir del hostname del request (runtime SSR)
export function getSiteConfig(request) {
   const hostname = request ? new URL(request.url).hostname : null;
   return buildConfig(resolveEnv(hostname));
}

// Objeto estático para compatibilidad con código que no tiene acceso al request
// Usa la variable de entorno PUBLIC_SITE_ENV definida en build time
export const siteConfig = buildConfig(resolveEnv(null));
