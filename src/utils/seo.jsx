import { getSiteConfig } from './config.jsx';

// Generar meta tags SEO
export function generateSEOTags(props = {}, request = null) {
  const cfg = getSiteConfig(request);
  const {
    title = `${cfg.site.name} - ${cfg.site.title}`,
    description = cfg.site.description,
    keywords = cfg.site.keywords,
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
    keywords,
    image,
    type,
    url,
    author,
    publishedTime,
    modifiedTime,
    canonical: new URL(url, cfg.canonicalUrl).href,
    // robots: noIndex || cfg.noIndex ? 'noindex, nofollow' : cfg.robotsContent
  };
}

// Generar Schema.org para la organización
export function generateOrganizationSchema(request = null) {
  const cfg = getSiteConfig(request);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": cfg.site.name,
    "description": cfg.site.description,
    "url": cfg.canonicalUrl,
    "logo": `${cfg.canonicalUrl}${cfg.assets.logo}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": cfg.business.contactType,
      "availableLanguage": cfg.business.availableLanguage
    },
    "sameAs": [
      cfg.social.facebook,
      cfg.social.twitter.replace('@', 'https://twitter.com/'),
      cfg.social.instagram
    ],
    "areaServed": {
      "@type": "Country",
      "name": cfg.business.country
    },
    "serviceType": cfg.business.serviceType
  };
}

// Generar Schema.org para servicios
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