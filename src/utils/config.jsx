import { siteConfigData } from './site-config.jsx';

// Detectar entorno
const getEnvironment = () => {
  if (import.meta.env.PUBLIC_ENV === 'staging') return 'staging';
  if (import.meta.env.PUBLIC_ENV === 'production') return 'production';
  if (import.meta.env.DEV) return 'development';
  return 'production';
};

const environment = getEnvironment();

// Configuración centralizada
export const siteConfig = {
  // Datos de la configuración
  ...siteConfigData,
  
  // Variables de entorno
  environment,
  isDev: import.meta.env.DEV,
  isStaging: environment === 'staging',
  isProduction: environment === 'production',
  debugMode: import.meta.env.PUBLIC_DEBUG_MODE === 'true' || import.meta.env.DEV,
  
  // URLs dinámicas
  get siteUrl() {
    return this.urls[this.environment] || this.urls.production;
  },
  
  // URL canónica (siempre producción para SEO)
  get canonicalUrl() {
    return this.urls.production;
  },
  
  // IDs de tracking
  get gtmId() {
    return this.isStaging 
      ? import.meta.env.PUBLIC_GTM_ID_STAGING 
      : import.meta.env.PUBLIC_GTM_ID;
  },
  
  get ga4Id() {
    return this.isStaging 
      ? import.meta.env.PUBLIC_GA4_ID_STAGING 
      : import.meta.env.PUBLIC_GA4_ID;
  },
  
  // Control de indexación
  get noIndex() {
    return this.isStaging || this.isDev;
  },
  
  get robotsContent() {
    return this.seo.robots[this.isStaging ? 'staging' : 'production'];
  },
  
  // URLs de assets
  get logoUrl() {
    return `${this.siteUrl}${this.assets.logo}`;
  },
  
  get defaultImage() {
    return `${this.siteUrl}${this.assets.defaultOgImage}`;
  }
};