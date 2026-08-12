// ============================================================
// 1. DATA: Configuración del sitio (antes site-config.jsx)
// ============================================================
export const siteConfigData = {
  site: {
    name: "Movapp",
    title: "El Hack hacia un nuevo inicio",
    description: "Movapp es una organización que ayuda a personas víctimas de las aplicaciones de préstamo no reguladas mediante apoyo psicológico, asesoría personalizada y la aplicación de El Hack.",
    author: "Movapp",
    locale: "es_MX",
    language: "es"
  },
  urls: {
    production: "https://movapp.org",
    staging: "https://stage.movapp.org",
    development: "http://localhost:7001"
  },
  stagingHostnames: [
    "stage-movapp.netlify.app",
    "stage.movapp.org",
  ],
  social: {
    // Solo Twitter: es el único campo de este objeto que se usa de verdad
    // (twitter:site/twitter:creator en Layout.astro). "facebook"/"instagram"
    // vivían acá con URLs viejas/incorrectas, sin ningún uso real -- ver
    // URLS.facebook/URLS.instagram más abajo para los links reales y
    // vigentes (los mismos que usan Footer/Nosotros/Contáctanos).
    twitter: "@movapp_oficial"
  },
  assets: {
    // Apuntaba a /images/logo.png, que no existe en public/ (404). El schema
    // de Organization exige un logo real y absoluto (mín. 112×112), así que
    // se corrige al archivo que sí está publicado: public/img/Logo.png.
    logo: "/img/Logo.png",
    defaultOgImage: "/images/movapp-og-image.jpg",
    favicon: "/ico-movapp.ico"
  },
  business: {
    country: "Mexico",
    serviceType: "Asesoría Financiera",
    contactType: "customer service",
    availableLanguage: "Spanish"
  },
  seo: {
    robots: {
      staging: "noindex, nofollow",
      production: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    },
    themeColor: "#1a365d"
  }
};


// ============================================================
// 1b. DATA: Redes sociales, tiendas y videos (antes @constants/socials.ts,
// fusionado acá a pedido -- una sola fuente de configuración del sitio en
// vez de dos archivos separados). Todo lo que antes se importaba desde ese
// archivo ahora se importa desde acá.
// ============================================================

export const URLS = {
  youtube: "https://www.youtube.com/@movappoficial",
  facebook: "https://www.facebook.com/movappbymann",
  instagram: "https://www.instagram.com/movappbymann",
  tiktok: "https://www.tiktok.com/@movappbymann",
  playStore: "https://play.google.com/store/apps/details?id=com.movapp.mobile&hl=es_MX&referrer=utm_source%3Dwebsite%26utm_medium%3Dorganic%26utm_campaign%3Dsite_download",
  appStore: "https://apps.apple.com/mx/app/movapp-by-erik-mann/id6755009066?ct=website_download",
  whatsapp: {
    // Número que debe aparecer en los botones de WhatsApp del sitio (ver
    // ButtonContact.astro): SIEMPRE "principal", no "oficial" -- son números
    // distintos, a pedido explícito.
    oficial: "+5215574360621",
    principal: "+5215578767442",
    colombia: "+573045829040",
    ecuador: "+593983639715",
    peru: "+51958102730"
  }
};

export const SOCIALS = [
  {
    name: "YouTube",
    url: URLS.youtube,
    icon: "Icono-Youtube.png",
    count: 28400,
    description: "Accede a contenido exclusivo, tutoriales sobre El Hack, entrevistas con expertos y mucho más. ¡Suscríbete y activa las notificaciones para no perderte nada!"
  },
  {
    name: "Facebook",
    url: URLS.facebook,
    icon: "Icono-Facebook.png",
    count: 21000,
    description: "Únete a nuestra comunidad en Facebook para mantenerte al tanto de las últimas noticias y actualizaciones."
  },
  {
    name: "Instagram",
    url: URLS.instagram,
    icon: "Icono-Instagram.png",
    count: 8400,
    description: "¡Síguenos para ver tips rápidos, noticias y contenido visual sobre cómo proteger tu información!"
  },
  {
    name: "TikTok",
    url: URLS.tiktok,
    icon: "Icono-Tik-Tok.png",
    count: 55100,
    description: "Síguenos en TikTok para ver contenido dinámico y divertido sobre cómo proteger tus datos y más."
  }
];

export const VIDEOS = {
  inicio: `${import.meta.env.PUBLIC_SHOW_HEADER_URL}`,
  movapp: "https://www.youtube.com/embed/SM5hBiuv-og?autoplay=1&mute=1&loop=1&playlist=SM5hBiuv-og",
  testimonios: "https://www.youtube.com/embed/iiuid3nlolU?autoplay=1&mute=1&loop=1&playlist=iiuid3nlolU",
  colaboraciones: "https://www.youtube.com/embed/owi6YB41tnM?autoplay=1&mute=1&loop=1&playlist=owi6YB41tnM"
};

// ============================================================
// 2. LOGIC: Resolución de Entornos y Configuración Dinámica
// ============================================================
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


// ============================================================
// 3. SEO: Generación de Meta Tags (antes seo.jsx)
//
// El Schema.org / JSON-LD NO vive aquí: toda esa funcionalidad (datos de la
// entidad, generadores por tipo y qué schema le toca a cada ruta) está
// centralizada en un único archivo, src/utils/schema.js, que consume este
// mismo siteConfig. Ver ese archivo para agregar o cambiar el schema de una
// página.
// ============================================================

// Generar meta tags SEO
export function generateSEOTags(props = {}, request = null) {
  const cfg = getSiteConfig(request);
  const {
    title = `${cfg.site.name} - ${cfg.site.title}`,
    description = cfg.site.description,
    image = cfg.defaultImage,
    type = 'website',
    url = cfg.siteUrl,
    author = cfg.site.author,
    publishedTime,
    modifiedTime,
    noIndex = false
  } = props;

  return {
    title,
    description,
    image,
    type,
    url,
    author,
    publishedTime,
    modifiedTime,
    canonical: new URL(url, cfg.canonicalUrl).href,
    robots: noIndex || cfg.noIndex ? 'noindex, nofollow' : cfg.robotsContent
  };
}

// Generar Schema.org para servicios
// NOTA: solo lo usa src/pages/index.old.astro (página legacy). El schema
// vigente del sitio se arma en src/utils/schema.js.
export function generateServiceSchema(serviceData, request = null) {
  const cfg = getSiteConfig(request);
  const {
    name,
    description,
    provider = cfg.site.name,
    areaServed = cfg.business.country,
    serviceType = cfg.business.serviceType
  } = serviceData;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider
    },
    "areaServed": areaServed,
    "serviceType": serviceType
  };
}
