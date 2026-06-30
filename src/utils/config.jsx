import { siteConfigData } from './site-config.jsx';

const env = import.meta.env.PUBLIC_SITE_ENV ?? 'production';

// Configuración centralizada
export const siteConfig = {
   // Datos de la configuración
   ...siteConfigData,

   environment: env,
   isDev: env === 'development',
   isStaging: env === 'staging',
   isProduction: env === 'production',
   debugMode: env !== 'production',

   // URLs dinámicas
   get siteUrl() {
      if (this.isStaging) return this.urls.staging;
      if (this.isDev) return this.urls.development;
      return this.urls.production;
   },

   // URL canónica: en staging apunta a sí mismo, no a producción
   get canonicalUrl() {
      return this.siteUrl;
   },

   // Control de indexación
   get noIndex() {
      return this.isStaging || this.isDev;
   },

   get robotsContent() {
      return this.isStaging || this.isDev
         ? this.seo.robots.staging
         : this.seo.robots.production;
   },

   // URLs de assets
   get logoUrl() {
      return `${this.siteUrl}${this.assets.logo}`;
   },

   get defaultImage() {
      return `${this.siteUrl}${this.assets.defaultOgImage}`;
   },
};
