/*
   ============================================================================
   SCHEMA.ORG / JSON-LD — archivo único de la funcionalidad
   ============================================================================

   Implementa la guía "Movapp · Schema Markup v2.0" (Julio 2026). Todo lo que
   se mantiene de schema vive aquí:

     1. SCHEMA_DATA  — datos de las entidades (Organization y los dos
                       productos). Es lo que se edita cuando llega un dato
                       nuevo (URL de Google Play, página de contacto, etc.).
     2. Generadores  — una función por tipo de schema.
     3. PAGE_SCHEMA  — qué schema le toca a cada ruta del sitio. Agregar una
                       página = agregar una entrada acá, nada más.
     4. getPageSchema(pathname, request) — lo que llama Layout.astro.

   Layout.astro resuelve el schema solo, a partir de la ruta: las páginas .astro
   NO declaran nada (salvo que necesiten un caso especial, ver la prop `schema`
   del layout, pensada para las páginas dinámicas de pSEO que vendrán).

   Reglas no negociables de la guía que este archivo respeta:
     · JSON-LD únicamente, en el HTML inicial de la respuesta SSR. Nunca desde
       una isla de React ni un useEffect: tiene que verse con `curl`.
     · URLs SIEMPRE absolutas -- de ahí abs().
     · Solo se declara schema que existe visualmente en la página. Por eso el
       texto de FAQPage/HowTo se importa de las mismas constantes que
       renderizan el markup (@constants/elhack.ts, @constants/faqsPageAcoso.ts,
       @constants/faqsPageElHack.ts, @constants/faqsPageMovapp.ts) en vez de
       escribirse acá una segunda vez: si cambia el copy, cambia el schema
       solo, y no pueden divergir.

   QA (§4 de la guía):
     curl -s <URL> | grep -A 30 "application/ld+json"
     search.google.com/test/rich-results  ·  validator.schema.org
*/

import { getSiteConfig, URLS } from '@utils/config.jsx';
import { EL_HACK_FAQS, EL_HACK_STEPS, EL_HACK_HOW_IT_WORKS_TITLE } from '@constants/elhack.ts';
import { FAQS_PAGE_ACOSO } from '@constants/faqsPageAcoso.ts';
import { FAQS_PAGE_EL_HACK } from '@constants/faqsPageElHack.ts';
import { FAQS_PAGE_MOVAPP } from '@constants/faqsPageMovapp.ts';

// ============================================================
// 1. DATOS DE LAS ENTIDADES
// ============================================================

export const SCHEMA_DATA = {
   // Alimenta el Knowledge Panel de Google, así que solo van datos
   // verificables (guía §2.1).
   organization: {
      foundingDate: '2022',
      founder: 'Erik Mann',
      // Solo perfiles oficiales verificados. Se toman de @utils/config.jsx
      // (URLS) para no mantener dos listas de redes en el repo.
      sameAs: [URLS.youtube, URLS.facebook, URLS.instagram, URLS.tiktok],
      // Canal de contacto oficial: WhatsApp.
      contactPhone: URLS.whatsapp.oficial,
      // TODO: si se define una página de contacto propia (/contacto), poner
      // aquí su ruta. Mientras sea null, el ContactPoint no emite `url`.
      contactPath: null,
      // Dimensiones reales de public/img/Logo.png (cfg.assets.logo) -- Google
      // prefiere `logo` como ImageObject con width/height explícitos en vez
      // de un string plano. Deben moverse juntos si el archivo cambia.
      logoWidth: 3140,
      logoHeight: 550,
   },

   /*
      Los dos productos son ENTIDADES SEPARADAS de cara a Google, y la guía
      marca la distinción como crítica: la app Movapp se descarga de las
      stores; El Hack se usa por WhatsApp y NO está en ninguna store (por eso
      no lleva operatingSystem ni downloadUrl).
   */
   movappApp: {
      name: 'Movapp',
      operatingSystem: 'Android, iOS',
      // No es una app financiera (no maneja dinero/transacciones): identifica
      // y reporta apps de préstamo predatorias, así que Google la clasifica
      // mejor como SecurityApplication.
      applicationCategory: 'SecurityApplication',
      description: 'App para identificar y reportar apps de préstamo predatorias en México.',
      // TODO: pegar la URL real de la ficha en Google Play. Mientras sea null,
      // downloadUrl no se emite (mejor omitir el campo que inventar una URL).
      downloadUrl: null,
      // TODO: si la app llega a tener su propia LP, apuntar aquí a esa ruta.
      // Por ahora su URL canónica es el home, que es donde se presenta.
      path: '/',
      // La app sí es de descarga gratuita.
      offer: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' },
   },

   elHack: {
      name: 'El Hack',
      applicationCategory: 'FinanceApplication',
      description: 'Bot de WhatsApp gratuito que te guía para salir de apps montadeuda.',
      // Versión más detallada para su propia LP (misma entidad, más texto).
      descriptionLP:
         'Bot de WhatsApp gratuito que te guía paso a paso para salir de apps montadeuda. No requiere descarga.',
      path: '/el-hack',
      /*
         OJO -- divergencia deliberada respecto a la guía: el documento pide un
         Offer con price 0 para El Hack, pero el copy visible de /el-hack dice
         que el costo del hack es de $500 MXN (la asesoría sí es 100%
         gratuita). Declarar price 0 sería justo el "schema engañoso" que la
         propia guía prohíbe (regla 3).

         Antes se usaba AggregateOffer con lowPrice -- hallazgo de auditoría:
         Google exige "offerCount" en todo AggregateOffer y no se estaba
         declarando, dejándolo incompleto/inválido. Con el precio ya
         confirmado (no es un rango real, es un monto fijo), un Offer simple
         con price:500 es lo que corresponde y evita ese requisito.

         ⚠ Este 500 y el copy de la FAQ en @constants/elhack.ts tienen que
         moverse juntos.
      */
      offer: { '@type': 'Offer', price: '500', priceCurrency: 'MXN' },
   },
};

// ============================================================
// 2. GENERADORES POR TIPO DE SCHEMA
// ============================================================

const CONTEXT = 'https://schema.org';

// URL absoluta a partir de una ruta del sitio ("/el-hack" -> "https://.../el-hack")
function abs(path, cfg) {
   if (!path) return cfg.canonicalUrl;
   if (/^https?:\/\//.test(path)) return path;
   return new URL(path, cfg.canonicalUrl).href;
}

// Quita las claves null/undefined para no emitir campos vacíos (p. ej.
// downloadUrl mientras no se confirme la URL de Google Play).
function prune(obj) {
   return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined));
}

// --- WebSite (solo Home) ---
export function generateWebSiteSchema(request = null) {
   const cfg = getSiteConfig(request);
   return {
      '@context': CONTEXT,
      '@type': 'WebSite',
      name: cfg.site.name,
      url: cfg.canonicalUrl,
      description: cfg.site.description,
      inLanguage: cfg.site.language,
      // potentialAction/SearchAction: el sitio no tiene buscador interno, así
      // que se omite a propósito -- declararlo sin buscador es schema engañoso.
   };
}

// --- Organization (Home) ---
export function generateOrganizationSchema(request = null) {
   const cfg = getSiteConfig(request);
   const org = SCHEMA_DATA.organization;
   return prune({
      '@context': CONTEXT,
      '@type': 'Organization',
      name: cfg.site.name,
      description: cfg.site.description,
      url: cfg.canonicalUrl,
      logo: {
         '@type': 'ImageObject',
         url: cfg.logoUrl,
         width: org.logoWidth,
         height: org.logoHeight,
      },
      foundingDate: org.foundingDate,
      founder: { '@type': 'Person', name: org.founder },
      sameAs: org.sameAs,
      contactPoint: prune({
         '@type': 'ContactPoint',
         contactType: cfg.business.contactType,
         availableLanguage: cfg.business.availableLanguage,
         telephone: org.contactPhone,
         url: org.contactPath ? abs(org.contactPath, cfg) : null,
      }),
      areaServed: { '@type': 'Country', name: cfg.business.country },
   });
}

// --- SoftwareApplication #1: la app Movapp (Android/iOS) ---
export function generateMovappAppSchema(request = null) {
   const cfg = getSiteConfig(request);
   const app = SCHEMA_DATA.movappApp;
   return prune({
      '@context': CONTEXT,
      '@type': 'SoftwareApplication',
      name: app.name,
      operatingSystem: app.operatingSystem,
      applicationCategory: app.applicationCategory,
      url: abs(app.path, cfg),
      downloadUrl: app.downloadUrl,
      description: app.description,
      offers: app.offer,
   });
}

// --- SoftwareApplication #2: El Hack (bot de WhatsApp) ---
// ⚠ Sin operatingSystem ni downloadUrl: no está en Google Play ni App Store.
export function generateElHackSchema({ detailed = false } = {}, request = null) {
   const cfg = getSiteConfig(request);
   const app = SCHEMA_DATA.elHack;
   return prune({
      '@context': CONTEXT,
      '@type': 'SoftwareApplication',
      name: app.name,
      applicationCategory: app.applicationCategory,
      url: abs(app.path, cfg),
      description: detailed ? app.descriptionLP : app.description,
      offers: app.offer,
   });
}

// --- BreadcrumbList: items = [{ name, path }]; "Inicio" se agrega solo ---
export function generateBreadcrumbSchema(items = [], request = null) {
   const cfg = getSiteConfig(request);
   const trail = [{ name: 'Inicio', path: '/' }, ...items];
   return {
      '@context': CONTEXT,
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((item, i) => ({
         '@type': 'ListItem',
         position: i + 1,
         name: item.name,
         item: abs(item.path, cfg),
      })),
   };
}

/*
   FAQPage: `faqs` acepta [{ q, a }] o [{ question, answer }].
   El texto de acceptedAnswer debe ser EXACTAMENTE el que el usuario lee en
   pantalla; por eso se le pasa la misma constante que renderiza el markup.
*/
export function generateFAQSchema(faqs = []) {
   return {
      '@context': CONTEXT,
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
         '@type': 'Question',
         name: item.q ?? item.question,
         acceptedAnswer: {
            '@type': 'Answer',
            text: item.a ?? item.answer,
         },
      })),
   };
}

/*
   WebPage y sus subtipos. `type` acepta cualquier subtipo: "AboutPage" para
   /nosotros, "CollectionPage" para listados, "WebPage" para el resto.
*/
export function generateWebPageSchema({ name, path, description, type = 'WebPage' }, request = null) {
   const cfg = getSiteConfig(request);
   return prune({
      '@context': CONTEXT,
      '@type': type,
      name: name,
      url: abs(path, cfg),
      description: description,
      inLanguage: cfg.site.language,
      publisher: { '@type': 'Organization', name: cfg.site.name, url: cfg.canonicalUrl },
   });
}

/*
   HowTo: solo aplica si la página tiene una sección de pasos VISIBLE, y los
   pasos deben coincidir uno a uno con los de la página (por eso comparten
   fuente de datos). `totalTime` en ISO 8601 (PT10M = 10 minutos).
*/
export function generateHowToSchema({ name, description, totalTime, tool, steps = [] }) {
   return prune({
      '@context': CONTEXT,
      '@type': 'HowTo',
      name: name,
      description: description,
      totalTime: totalTime,
      tool: tool ? { '@type': 'HowToTool', name: tool } : null,
      step: steps.map((s, i) => ({
         '@type': 'HowToStep',
         position: i + 1,
         name: s.title ?? s.name,
         text: s.text,
      })),
   });
}

// ============================================================
// 3. QUÉ SCHEMA LE TOCA A CADA RUTA
// ============================================================

/*
   Una entrada por página. Cada una define:
     · name        — título visible (H1) de la página
     · description — se usa en el schema Y como meta description por defecto
                     (Layout.astro cae aquí si la página no pasa la prop
                     `description`), así el texto no se escribe dos veces
     · breadcrumb  — etiqueta en el rastro de migas; null = sin BreadcrumbList
                     (Home, que es la raíz)
     · build()     — devuelve el array de schemas de esa página

   Agregar una página nueva = agregar una entrada acá. Nada que tocar en el
   .astro ni en el layout.
*/
export const PAGE_SCHEMA = {
   // --- Home: la página más crítica. Establece a Movapp como entidad ante
   // Google y los LLMs (clave para GEO); el Organization alimenta el
   // Knowledge Panel. Sin BreadcrumbList: es la raíz. Sin FAQPage: no tiene
   // sección de preguntas visible. (Guía §2.1)
   //
   // Sin generateElHackSchema acá (hallazgo de auditoría corregido): El Hack
   // es una LP propia con su propio SoftwareApplication en /el-hack -- Home
   // solo lo menciona de pasada (card de HomeFeatured.astro, sin detalle),
   // así que declarar su schema completo acá era redundante/duplicado con
   // el de su propia página. Ver PAGE_SCHEMA['/el-hack'] para ese schema.
   '/': {
      name: 'Movapp',
      description: null, // usa la del sitio (siteConfigData.site.description)
      breadcrumb: null,
      build: (request) => [generateWebSiteSchema(request), generateOrganizationSchema(request), generateMovappAppSchema(request)],
   },

   // --- LP de conversión. El SoftwareApplication es más detallado que el de
   // Home, y se suman HowTo y FAQPage porque ambas secciones existen
   // visualmente (ElHackHowItWorks y ElHackFAQ). (Guía §2.2)
   '/el-hack': {
      name: 'Recupera tu tranquilidad hoy, adiós al acoso de las apps de préstamos',
      description: null, // la página pasa su propio copy SEO
      breadcrumb: 'El Hack',
      build: (request) => [
         generateElHackSchema({ detailed: true }, request),
         breadcrumbFor('/el-hack', request),
         generateHowToSchema({
            name: EL_HACK_HOW_IT_WORKS_TITLE,
            description: 'Tres pasos para volver a tener el control y frenar el acoso de las apps de préstamo.',
            tool: 'El Hack (WhatsApp)',
            steps: EL_HACK_STEPS,
            // Sin totalTime a propósito: la página no declara una duración del
            // proceso (la FAQ dice que "depende del caso"), así que poner un
            // PT10M sería declarar algo que no está en pantalla.
         }),
         generateFAQSchema(EL_HACK_FAQS),
      ],
   },

   // --- La LP más directa para FAQPage. (Guía §2.3)
   // Combina las 3 secciones de la página (Acoso, El Hack, Movapp) en un solo
   // FAQPage: el schema no necesita conservar la agrupación visual, solo que
   // cada Question/acceptedAnswer coincida con lo que se lee en pantalla.
   '/faqs': {
      name: 'Preguntas frecuentes',
      description: 'Respondemos las dudas más comunes sobre acoso de apps de préstamo, El Hack y Movapp.',
      breadcrumb: 'Preguntas frecuentes',
      build: (request) => [
         generateFAQSchema([...FAQS_PAGE_ACOSO, ...FAQS_PAGE_EL_HACK, ...FAQS_PAGE_MOVAPP]),
         breadcrumbFor('/faqs', request),
      ],
   },

   // --- AboutPage: subtipo de WebPage para "quiénes somos". Refuerza E-E-A-T
   // asociando la entidad Movapp con su misión. (Guía §2.4)
   '/nosotros': {
      type: 'AboutPage',
      name: 'Bienvenido a Movapp',
      description:
         'Movapp es una organización que ayuda a personas víctimas de las aplicaciones de préstamo no reguladas mediante apoyo psicológico, asesoría personalizada y la aplicación de El Hack.',
      breadcrumb: 'Nosotros',
   },

   /*
      --- Páginas de soporte (guía §2.5): con su contenido actual no
      justifican schemas complejos. La prioridad es el BreadcrumbList (impacto
      inmediato en SERP) y el WebPage para declarar la URL canónica.

      Sin `build`, se arma solo: WebPage (o el `type` indicado) + Breadcrumb.
   */
   '/testimonials': {
      // La guía sugiere CollectionPage para testimonios. Todavía NO se declara
      // Review ni AggregateRating: no hay calificaciones estructuradas en la
      // página, solo video, y declararlas sería schema engañoso.
      type: 'CollectionPage',
      name: 'La voz de nuestros usuarios',
      description:
         'Más de 2,000 usuarios han confirmado que El Hack es la solución para recuperar el control de su vida digital. Conoce sus historias.',
      breadcrumb: 'Testimonios',
   },

   '/contactanos': {
      // ContactPage: la guía la reserva justamente para páginas con
      // formulario de contacto real, como esta.
      type: 'ContactPage',
      name: 'Contáctanos',
      description: 'Escríbenos tus dudas sobre Movapp y El Hack, o síguenos en redes sociales.',
      breadcrumb: 'Contáctanos',
   },

   // --- CollectionPage: listado de artículos agrupados por categoría, mismo
   // criterio que /testimonials. Sin BlogPosting/ItemList todavía: no hay
   // fecha/autor por artículo en el copy visible, y declararlos sería
   // inventar datos que no están en pantalla.
   '/blog': {
      type: 'CollectionPage',
      name: 'Blog de préstamos, deudas y montadeudas',
      description:
         'Guías, evaluaciones de apps y noticias de Movapp sobre préstamos, deudas y aplicaciones montadeudas.',
      breadcrumb: 'Blog',
   },

   // --- Páginas de detalle por categoría del blog (plantilla única, ver
   // src/pages/blog/[categoria].astro + @constants/blogCategoryPages.ts).
   // Ruta dinámica: cada categoría de ese archivo necesita su propia entrada
   // acá (mismo `name`/`breadcrumb` que su `h1`, misma `description` que su
   // `intro`) -- agregar una categoría nueva a ese archivo sin agregar su
   // entrada acá la deja sin BreadcrumbList/WebPage propios (cae al fallback
   // de solo Organization, ver getPageSchema).
   '/blog/evaluaciones': {
      type: 'CollectionPage',
      name: 'Evaluaciones de apps y lista negra',
      description:
         'Revisa nuestro listado actualizado de apps fraudulentas e ilegales. Analizamos cada plataforma para que sepas cuáles evitar y cuáles sí son seguras.',
      breadcrumb: 'Evaluaciones de apps y lista negra',
   },

   '/collaborations': {
      name: 'Colaboraciones',
      description: 'Colaboraciones de Movapp con medios y creadores que difunden cómo frenar a las apps montadeuda.',
      breadcrumb: 'Colaboraciones',
   },

   // --- CollectionPage: listado de apps agrupadas por estatus (reportadas vs.
   // reguladas), mismo criterio que /blog. Sin Review/AggregateRating: la
   // página no muestra calificaciones, solo estatus de reporte/regulación.
   '/directorio-de-apps': {
      type: 'CollectionPage',
      name: 'Apps de préstamos legales e ilegales en México',
      description:
         'Encuentra un listado actualizado con el estatus legal de las apps de crédito en México. Te mostramos las señales de alerta para detectar fraudes o "montadeudas" y una guía directa con qué hacer para proteger tu información o realizar denuncias de forma segura.',
      breadcrumb: 'Aplicaciones',
   },

   // ⚠ /mind y /red pueden evolucionar a Article o CollectionPage si se
   // convierten en hubs de contenido. Por ahora WebPage + Breadcrumb es
   // suficiente y correcto (guía §2.5).
   '/mind': {
      name: 'Bienvenido a mente digital',
      description:
         'Espacio dedicado a recuperar la paz emocional tras el acoso de las aplicaciones no reguladas, con la guía de la Dra. Dalia.',
      breadcrumb: 'Mente digital',
   },

   '/red': {
      name: '¡Síguenos y mantente conectado!',
      description:
         'Síguenos en nuestras redes sociales para consejos de seguridad, actualizaciones de El Hack y contenido exclusivo.',
      breadcrumb: 'Redes',
   },

   '/privacypolicy': {
      name: 'Política de Privacidad',
      description:
         'Política de privacidad de Movapp: qué información recopilamos, cómo la usamos y cuáles son tus derechos.',
      breadcrumb: 'Política de privacidad',
   },
};

// Breadcrumb de una ruta, leyendo su etiqueta de PAGE_SCHEMA.
function breadcrumbFor(pathname, request) {
   const page = PAGE_SCHEMA[pathname];
   return generateBreadcrumbSchema([{ name: page.breadcrumb, path: pathname }], request);
}

// ============================================================
// 4. API PÚBLICA — lo que consume Layout.astro
// ============================================================

// Normaliza la ruta: "/faqs/" y "/faqs" son la misma página; "" es "/".
function normalize(pathname) {
   if (!pathname) return '/';
   const clean = pathname.replace(/\/+$/, '');
   return clean === '' ? '/' : clean;
}

// Entrada de PAGE_SCHEMA para una ruta (o null si la ruta no está declarada).
export function getPageEntry(pathname) {
   return PAGE_SCHEMA[normalize(pathname)] ?? null;
}

/*
   Array de schemas de una ruta. Es lo que Layout.astro serializa en el <head>.

   Las rutas que NO están en PAGE_SCHEMA (utilitarias: /404, /success,
   /pending, /failure, /tienda...) reciben solo el Organization: declaran la
   entidad Movapp sin inventar schema que no corresponde a su contenido.
*/
export function getPageSchema(pathname, request = null) {
   const page = getPageEntry(pathname);
   if (!page) return [generateOrganizationSchema(request)];

   // Páginas con composición propia (Home, /el-hack, /faqs).
   if (page.build) return page.build(request);

   // Caso por defecto: WebPage (o su subtipo) + BreadcrumbList.
   const route = normalize(pathname);
   return [
      generateWebPageSchema({ type: page.type, name: page.name, path: route, description: page.description }, request),
      ...(page.breadcrumb ? [breadcrumbFor(route, request)] : []),
   ];
}
