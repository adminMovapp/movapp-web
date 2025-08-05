// Configuración del sitio en JavaScript (en lugar de JSON)
export const siteConfigData = {
  site: {
    name: "Movapp",
    title: "El Hack hacia un nuevo inicio",
    description: "Movapp es una organización que ayuda a personas víctimas de las aplicaciones de préstamo no reguladas mediante apoyo psicológico, asesoría personalizada y la aplicación de El Hack.",
    keywords: "movapp, préstamos fraudulentos, montadeudas, hack financiero, asesoría financiera, aplicaciones de préstamo, cobranza abusiva, deudas, México",
    author: "Movapp",
    locale: "es_MX",
    language: "es"
  },
  urls: {
    production: "https://movapp.org",
    staging: "https://stage.movapp.org",
    development: "http://localhost:7001"
  },
  social: {
    twitter: "@movapp_oficial",
    facebook: "https://facebook.com/movapp",
    instagram: "https://instagram.com/movapp_oficial"
  },
  assets: {
    logo: "/images/logo.png",
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