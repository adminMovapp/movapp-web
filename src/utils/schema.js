/*
   ============================================================================
   SCHEMA.ORG / JSON-LD — archivo único de la funcionalidad
   ============================================================================

   Implementa los schemas por página P01–P19 (nov. 2026), que reemplazan a la
   guía "Movapp · Schema Markup v2.0". Todo lo que se mantiene de schema vive
   aquí:

     1. SCHEMA_DATA  — datos de las entidades (Organization, WebSite, la app
                       móvil y El Hack). Es lo que se edita cuando llega un
                       dato nuevo (dirección, tiendas, precio...).
     2. Generadores  — una función por tipo de nodo.
     3. PAGE_SCHEMA  — qué schema le toca a cada ruta del sitio. Agregar una
                       página = agregar una entrada acá, nada más.
     4. getPageSchema(pathname, request) — lo que llama Layout.astro.

   Forma de salida (P01–P19): TODAS las rutas fijas emiten un único objeto
   { "@context", "@graph": [...] } cuyos nodos llevan @id estable
   (<url>#webpage, #breadcrumb, #preguntas-frecuentes, #servicio) y se
   enlazan por referencia: cada WebPage es `isPartOf` → /#website y tiene
   `publisher` → /#organization. Organization, WebSite y la app móvil solo
   se declaran completos en Home; el resto de las páginas los referencia.

   Layout.astro resuelve el schema solo, a partir de la ruta: las páginas .astro
   NO declaran nada (salvo los casos especiales de la prop `schema` del layout:
   artículos del blog y los VideoObject de /prensa, ver appendToGraph()).

   Reglas no negociables que este archivo respeta:
     · JSON-LD únicamente, en el HTML inicial de la respuesta SSR. Nunca desde
       una isla de React ni un useEffect: tiene que verse con `curl`.
     · URLs SIEMPRE absolutas -- de ahí abs(). Los documentos fuente usan
       https://movapp.org/; aquí el dominio sale de getSiteConfig(), así en
       stage las URLs apuntan a stage.
     · Solo se declara schema que existe visualmente en la página. Por eso el
       texto de FAQPage se importa de las mismas constantes que renderizan el
       markup (@constants/*Faqs.ts, @constants/elhack.ts...) en vez de
       escribirse acá una segunda vez: si cambia el copy, cambia el schema
       solo, y no pueden divergir.

   QA:
     curl -s <URL> | grep -A 30 "application/ld+json"
     search.google.com/test/rich-results  ·  validator.schema.org
*/

import { getSiteConfig, withTrailingSlash } from '@utils/config.jsx';
import { HOME_FAQS } from '@constants/homeFaqs.ts';
import { EL_HACK_FAQS } from '@constants/elhack.ts';
import { FAQS_PAGE_ACOSO } from '@constants/faqsPageAcoso.ts';
import { FAQS_PAGE_EL_HACK } from '@constants/faqsPageElHack.ts';
import { FAQS_PAGE_MOVAPP } from '@constants/faqsPageMovapp.ts';
import { CREDISEGURO_FAQS } from '@constants/crediseguroFaqs.ts';
import { TALA_FAQS } from '@constants/talaFaqs.ts';
import { KUESKI_FAQS } from '@constants/kueskiFaqs.ts';
import { KLAR_FAQS } from '@constants/klarFaqs.ts';
import { PRESTAFACIL_FAQS } from '@constants/prestafacilFaqs.ts';
import { FORTAPRESTA_FAQS } from '@constants/fortaprestaFaqs.ts';
import { MEXICASH_FAQS } from '@constants/mexicashFaqs.ts';
import { STARPRESTA_FAQS } from '@constants/starprestaFaqs.ts';

// ============================================================
// 1. DATOS DE LAS ENTIDADES
// ============================================================

// Tiendas sin parámetros de campaña (las de URLS en config.jsx llevan UTM
// para los botones; en sameAs/downloadUrl va la URL canónica de la ficha).
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.movapp.mobile';
const APP_STORE_URL = 'https://apps.apple.com/mx/app/movapp-by-erik-mann/id6755009066';

export const SCHEMA_DATA = {
   // Alimenta el Knowledge Panel de Google: solo datos verificables (P01).
   // La `description` es la del sitio (siteConfigData.site.description).
   organization: {
      name: 'Movapp',
      legalName: 'MOVAPPBYERIKMANN, S.A. de C.V.',
      foundingDate: '2021',
      founder: 'Erik Mann',
      // Dimensiones reales de public/img/Logo.png (cfg.logoUrl). Deben
      // moverse juntas si el archivo cambia.
      logoWidth: 3140,
      logoHeight: 550,
      address: {
         '@type': 'PostalAddress',
         streetAddress: 'Homero 229, Col. Polanco',
         addressLocality: 'Miguel Hidalgo',
         addressRegion: 'Ciudad de México',
         postalCode: '11590',
         addressCountry: 'MX',
      },
      // El WhatsApp "principal" (el mismo de ButtonContact.astro).
      contactPoint: {
         '@type': 'ContactPoint',
         contactType: 'customer support',
         telephone: '+52-55-7876-7442',
         availableLanguage: 'es',
         url: 'https://wa.me/5215578767442',
      },
      sameAs: [
         'https://www.youtube.com/@movappoficial',
         'https://www.facebook.com/movappbymann',
         'https://www.instagram.com/movappbymann',
         'https://www.tiktok.com/@movappbymann',
         PLAY_STORE_URL,
         APP_STORE_URL,
      ],
   },

   areaServed: { '@type': 'Country', name: 'México' },

   /*
      La app y El Hack son ENTIDADES SEPARADAS: la app se descarga de las
      tiendas (MobileApplication) y NO es El Hack -- su description lo dice
      explícitamente; El Hack es un Service que se solicita con un asesor.
   */
   movappApp: {
      name: 'Movapp by Erik Mann',
      operatingSystem: 'Android, iOS',
      applicationCategory: 'LifestyleApplication',
      description:
         'App oficial de Movapp, con videos y contenido de Movapp y una función para verificar que hablas con un asesor oficial. No es El Hack.',
      downloadUrl: [PLAY_STORE_URL, APP_STORE_URL],
      offer: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' },
   },

   elHack: {
      name: 'El Hack',
      path: '/el-hack',
      serviceType: 'Servicio para frenar el acoso de apps de préstamo montadeudas',
      description:
         'El Hack es el servicio de Movapp para frenar el acoso de las apps montadeudas: las llamadas y mensajes de cobranza hacia la víctima y sus contactos. Se solicita con un asesor, que confirma el alcance y el precio antes de empezar, y lo aplica el equipo técnico de Movapp.',
      /*
         Precio por Hack publicado en /tienda (P02/P04): Offer con price fijo
         + UnitPriceSpecification "por 1 Hack". El total depende de cuántas
         apps haya, cosa que dice la description del Offer.

         ⚠ Este 500 y el copy de las FAQ de costo ("¿Cuánto cuesta El Hack?"
         en @constants/elhack.ts, "¿Movapp cobra?" en homeFaqs.ts y "¿La ayuda
         tiene costo?" en faqsPageMovapp.ts) tienen que moverse juntos.
      */
      price: '500.00',
      priceCurrency: 'MXN',
      offerPath: '/tienda',
      offerDescription:
         'Precio por Hack publicado en la tienda de movapp.org. El total depende del número de apps involucradas y el asesor lo confirma antes de cualquier pago. La revisión del caso es gratuita y sin compromiso.',
   },
};

// ============================================================
// 2. GENERADORES
// ============================================================

const CONTEXT = 'https://schema.org';

// URL absoluta a partir de una ruta del sitio ("/el-hack" -> "https://.../el-hack/")
function abs(path, cfg) {
   if (!path) return cfg.canonicalUrl;
   if (/^https?:\/\//.test(path)) return path;
   return new URL(withTrailingSlash(path), cfg.canonicalUrl).href;
}

// Quita las claves null/undefined para no emitir campos vacíos.
function prune(obj) {
   return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined));
}

// @id de un nodo: "<url de la ruta>#<fragmento>" ("https://movapp.org/#organization").
function nodeId(path, fragment, cfg) {
   return `${abs(path, cfg)}#${fragment}`;
}
const ref = (path, fragment, cfg) => ({ '@id': nodeId(path, fragment, cfg) });

/*
   Agrupa varios nodos en un único objeto { @context, @graph }: cada nodo
   pierde su propio @context (lo hereda del contenedor).
*/
export function generateGraph(nodes = []) {
   return {
      '@context': CONTEXT,
      '@graph': nodes.map(({ '@context': _ctx, ...node }) => node),
   };
}

/*
   Suma nodos calculados en runtime al @graph de una ruta (patrón /prensa:
   getPageSchema() + un VideoObject por vídeo visible).
*/
export function appendToGraph(graph, extraNodes = []) {
   return generateGraph([...graph['@graph'], ...extraNodes]);
}

// --- Organization (completa solo en Home; el resto la referencia) ---
export function generateOrganizationSchema(request = null) {
   const cfg = getSiteConfig(request);
   const org = SCHEMA_DATA.organization;
   return {
      '@context': CONTEXT,
      '@type': 'Organization',
      '@id': nodeId('/', 'organization', cfg),
      name: org.name,
      legalName: org.legalName,
      url: abs('/', cfg),
      logo: { '@type': 'ImageObject', url: cfg.logoUrl, width: org.logoWidth, height: org.logoHeight },
      description: cfg.site.description,
      foundingDate: org.foundingDate,
      founder: { '@type': 'Person', name: org.founder },
      address: org.address,
      contactPoint: org.contactPoint,
      areaServed: SCHEMA_DATA.areaServed,
      sameAs: org.sameAs,
   };
}

// --- WebSite (solo Home). Sin SearchAction: el buscador es un overlay que
// no cambia la URL, declararlo sería schema engañoso. ---
export function generateWebSiteSchema(request = null) {
   const cfg = getSiteConfig(request);
   return {
      '@context': CONTEXT,
      '@type': 'WebSite',
      '@id': nodeId('/', 'website', cfg),
      url: abs('/', cfg),
      name: SCHEMA_DATA.organization.name,
      inLanguage: cfg.site.language,
      publisher: ref('/', 'organization', cfg),
      description: cfg.site.description,
   };
}

// --- MobileApplication: la app oficial (Android/iOS). No es El Hack. ---
export function generateMovappAppSchema(request = null) {
   const cfg = getSiteConfig(request);
   const app = SCHEMA_DATA.movappApp;
   return {
      '@context': CONTEXT,
      '@type': 'MobileApplication',
      '@id': nodeId('/', 'app', cfg),
      name: app.name,
      operatingSystem: app.operatingSystem,
      applicationCategory: app.applicationCategory,
      description: app.description,
      downloadUrl: app.downloadUrl,
      offers: app.offer,
      publisher: ref('/', 'organization', cfg),
   };
}

/*
   Service: El Hack. `detailed` (su propia LP, P02) emite la entidad completa;
   sin él (/tienda, P04) solo nombre, proveedor y oferta -- mismo @id, así
   Google los une en una sola entidad.
*/
export function generateElHackSchema({ detailed = false } = {}, request = null) {
   const cfg = getSiteConfig(request);
   const hack = SCHEMA_DATA.elHack;
   const offers = {
      '@type': 'Offer',
      url: abs(hack.offerPath, cfg),
      priceCurrency: hack.priceCurrency,
      price: hack.price,
      priceSpecification: {
         '@type': 'UnitPriceSpecification',
         price: hack.price,
         priceCurrency: hack.priceCurrency,
         referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'Hack' },
      },
      description: hack.offerDescription,
   };
   const base = { '@context': CONTEXT, '@type': 'Service', '@id': nodeId(hack.path, 'servicio', cfg), name: hack.name };
   if (!detailed) return { ...base, provider: ref('/', 'organization', cfg), offers };
   return {
      ...base,
      serviceType: hack.serviceType,
      description: hack.description,
      provider: ref('/', 'organization', cfg),
      areaServed: SCHEMA_DATA.areaServed,
      url: abs(hack.path, cfg),
      offers,
   };
}

/*
   WebPage y subtipos (CollectionPage, ContactPage...). `about` y
   `mainEntity` son opcionales (fichas de apps / tienda y El Hack).
*/
export function generateWebPageSchema(
   { name, path, description, type = 'WebPage', about, mainEntity },
   request = null,
) {
   const cfg = getSiteConfig(request);
   return prune({
      '@context': CONTEXT,
      '@type': type,
      '@id': nodeId(path, 'webpage', cfg),
      url: abs(path, cfg),
      name,
      description,
      inLanguage: cfg.site.language,
      isPartOf: ref('/', 'website', cfg),
      publisher: ref('/', 'organization', cfg),
      about,
      mainEntity,
   });
}

/*
   BreadcrumbList: items = [{ name, path }]; "Inicio" se agrega solo. Con
   `id` (la ruta de la página) el nodo lleva @id <url>#breadcrumb.
*/
export function generateBreadcrumbSchema(items = [], request = null, { id } = {}) {
   const cfg = getSiteConfig(request);
   const trail = [{ name: 'Inicio', path: '/' }, ...items];
   return prune({
      '@context': CONTEXT,
      '@type': 'BreadcrumbList',
      '@id': id ? nodeId(id, 'breadcrumb', cfg) : undefined,
      itemListElement: trail.map((item, i) => ({
         '@type': 'ListItem',
         position: i + 1,
         name: item.name,
         item: abs(item.path, cfg),
      })),
   });
}

/*
   FAQPage: `faqs` acepta [{ q, a }] o [{ question, answer }].
   El texto de acceptedAnswer debe ser EXACTAMENTE el que el usuario lee en
   pantalla; por eso se le pasa la misma constante que renderiza el markup.
   `extra` agrega propiedades al nodo (p. ej. @id).
*/
export function generateFAQSchema(faqs = [], extra = {}) {
   const { '@id': id, ...rest } = extra;
   return prune({
      '@context': CONTEXT,
      '@type': 'FAQPage',
      '@id': id,
      mainEntity: faqs.map((item) => ({
         '@type': 'Question',
         name: item.q ?? item.question,
         acceptedAnswer: {
            '@type': 'Answer',
            // Las respuestas pueden marcar negritas con **texto** (FAQAccordion.astro);
            // el JSON-LD lleva el texto plano.
            text: String(item.a ?? item.answer ?? '').replace(/\*\*(.+?)\*\*/g, '$1'),
         },
      })),
      ...rest,
   });
}

// "Diciembre 10, 2025" (formato de BLOG_ARTICLES.publishDate, ver
// blogArticles.ts) -> "2025-12-10" (ISO 8601, lo que pide datePublished).
const SPANISH_MONTHS = {
   enero: '01',
   febrero: '02',
   marzo: '03',
   abril: '04',
   mayo: '05',
   junio: '06',
   julio: '07',
   agosto: '08',
   septiembre: '09',
   octubre: '10',
   noviembre: '11',
   diciembre: '12',
};
export function parseSpanishDate(text) {
   const match = /^(\p{L}+)\s+(\d{1,2}),\s*(\d{4})$/u.exec(text?.trim() ?? '');
   if (!match) return null;
   const month = SPANISH_MONTHS[match[1].toLowerCase()];
   if (!month) return null;
   return `${match[3]}-${month}-${match[2].padStart(2, '0')}`;
}

/*
   BlogPosting: un artículo de /blog/<slug> (ver src/pages/blog/[articulo].astro
   y @constants/blogArticles.ts). Ruta dinámica, así que NO vive en
   PAGE_SCHEMA como el resto -- cada página arma su propio array con esta
   función y lo pasa por la prop `schema` del Layout.
*/
export function generateBlogPostingSchema(
   { headline, description, path, publishDate, publishedAt, modifiedAt, authorName, image, type = 'BlogPosting', about },
   request = null,
) {
   const cfg = getSiteConfig(request);
   const org = SCHEMA_DATA.organization;
   // publishedAt/modifiedAt (2026-11-10, fichas ART-001..027): fecha-hora
   // original exacta y fecha real de la nueva versión. Sin ellas, la fecha
   // visible convertida a ISO para ambas, como antes.
   const iso = publishedAt ?? parseSpanishDate(publishDate);
   return prune({
      '@context': CONTEXT,
      // NewsArticle para comunicados (2026-11-23, ficha del EC3 Cyber
      // Innovation Forum), BlogPosting para el resto.
      '@type': type,
      '@id': `${abs(path, cfg)}#articulo`,
      headline,
      description,
      url: abs(path, cfg),
      inLanguage: cfg.site.language,
      // URL absoluta de la imagen destacada (la resuelve [articulo].astro con
      // getImage); prune() la quita si el artículo no tiene imagen.
      image,
      datePublished: iso,
      dateModified: modifiedAt ?? iso,
      author: { '@type': 'Person', name: authorName },
      // logo (2026-11-23, pedido por la ficha del EC3): el mismo del
      // Organization del Home; aplica a todos los artículos.
      publisher: {
         '@type': 'Organization',
         name: cfg.site.name,
         url: cfg.canonicalUrl,
         logo: { '@type': 'ImageObject', url: cfg.logoUrl, width: org.logoWidth, height: org.logoHeight },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': abs(path, cfg) },
      // Lo que el artículo cubre (p. ej. el Event de un comunicado). prune()
      // lo quita si no hay.
      about,
   });
}

/*
   VideoObject: un vídeo embebido de Vimeo (ver @api/pressVideos.ts). Google
   exige name, description, thumbnailUrl y uploadDate; embedUrl le indica
   dónde está el reproductor. Si el vídeo no tiene descripción en Vimeo se
   usa el título (es lo único visible en la página).
*/
export function generateVideoObjectSchema(video) {
   const seconds = video.durationSeconds ?? 0;
   return prune({
      '@context': CONTEXT,
      '@type': 'VideoObject',
      name: video.title,
      description: video.description || video.title,
      thumbnailUrl: `${video.thumbnailBase}-d_1280`,
      uploadDate: video.uploadDate || undefined,
      duration: seconds ? `PT${Math.floor(seconds / 60)}M${seconds % 60}S` : undefined,
      embedUrl: `https://player.vimeo.com/video/${video.vimeoId}`,
   });
}

/*
   HowTo: hoy ninguna ruta lo emite (P02 lo quitó de /el-hack). Si vuelve,
   solo con una sección de pasos VISIBLE y sin totalTime salvo que la página
   lo muestre.
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
   Una entrada por página (clave SIN barra final). Campos:
     · name        — `name` del WebPage. También es el <title> por defecto de
                     la página (Layout.astro cae aquí si no recibe `title`).
     · description — `description` del WebPage y meta description por
                     defecto (misma regla), y su línea en /llms.txt.
     · breadcrumb  — etiqueta del último nivel de la miga (visible, vía
                     Breadcrumbs.astro, y BreadcrumbList); null = sin miga.
     · parents     — niveles intermedios de la miga, [{ name, path }].
     · type        — subtipo de WebPage (default 'WebPage').
     · about       — nodo `about` del WebPage (fichas de apps).
     · faqs        — constante de FAQ visible → nodo FAQPage.
     · service     — 'detailed' | 'offer': agrega el Service de El Hack y lo
                     declara como mainEntity del WebPage.
     · build()     — composición a mano (solo Home).

   Orden de nodos en el @graph (igual que P02–P19): WebPage, BreadcrumbList,
   Service, FAQPage.
*/
const APPS = { name: 'Aplicaciones', path: '/aplicaciones-prestamo' };

export const PAGE_SCHEMA = {
   // --- P01 Home: la única página que declara completas la Organization, el
   // WebSite y la app; todas las demás las referencian por @id. Sin
   // BreadcrumbList (es la raíz) ni Service de El Hack (vive en /el-hack).
   '/': {
      name: 'Movapp | Ayuda para frenar el acoso de montadeudas',
      description:
         '¿Una app montadeudas te acosa a ti o a tus contactos? Movapp te ayuda a frenarlo con asesoría, apoyo psicológico y El Hack. Revisamos tu caso gratis.',
      breadcrumb: null,
      build: (request) => {
         const cfg = getSiteConfig(request);
         const page = PAGE_SCHEMA['/'];
         return generateGraph([
            generateOrganizationSchema(request),
            generateWebSiteSchema(request),
            generateMovappAppSchema(request),
            generateWebPageSchema(
               { name: page.name, path: '/', description: page.description, about: ref('/', 'organization', cfg) },
               request,
            ),
            generateFAQSchema(HOME_FAQS, { '@id': nodeId('/', 'preguntas-frecuentes', cfg) }),
         ]);
      },
   },

   // --- P02 El Hack. P02 ya no trae HowTo.
   '/el-hack': {
      name: 'El Hack de Movapp: frena el acoso de las montadeudas',
      description:
         'El Hack es el servicio de Movapp para frenar el acoso de las apps montadeudas. Se solicita con un asesor, que confirma el alcance y el precio antes de pagar.',
      breadcrumb: 'El Hack',
      service: 'detailed',
      faqs: EL_HACK_FAQS,
   },

   // --- P03: las 3 secciones visibles (Acoso, El Hack, Movapp) en un solo
   // FAQPage; el schema no necesita conservar la agrupación visual.
   '/preguntas-frecuentes': {
      name: 'Movapp: preguntas frecuentes sobre El Hack y el acoso',
      description:
         'Qué es Movapp, cuánto cuesta El Hack, cuánto tarda y qué hacer si una app montadeudas te acosa. Respuestas claras para víctimas de montadeudas.',
      breadcrumb: 'Preguntas frecuentes',
      faqs: [...FAQS_PAGE_ACOSO, ...FAQS_PAGE_EL_HACK, ...FAQS_PAGE_MOVAPP],
   },

   // --- P04 Tienda: el Service de El Hack (versión corta, mismo @id que en
   // /el-hack) como mainEntity, con la oferta de $500 por Hack.
   '/tienda': {
      name: 'Tienda Movapp: precio y pago de El Hack',
      description:
         'El Hack cuesta $500 MXN por Hack. El total depende de cuántas apps haya y tu asesor lo confirma antes de pagar. Pago seguro en la tienda oficial de Movapp.',
      breadcrumb: 'Tienda',
      service: 'offer',
   },

   // --- P05 Directorio de apps.
   '/aplicaciones-prestamo': {
      type: 'CollectionPage',
      name: 'Apps de préstamos: ¿registradas o con reportes? | Movapp',
      description:
         'Consulta qué apps de préstamos encontramos en el registro de la CONDUSEF y cuáles tienen reportes de acoso. Señales de alerta y qué hacer si ya te cobran.',
      breadcrumb: 'Aplicaciones',
   },

   // --- P06–P13 Fichas de apps. `about`: Organization con su clave SIPRES
   // cuando la encontramos registrada (Tala, Kueski, Klar); si no, la app
   // como SoftwareApplication. FortaPrest SÍ aparece (como Unlimit Leasing,
   // dice su FAQ), pero P07 la declara como SoftwareApplication.
   '/aplicaciones-prestamo/crediseguro': {
      name: '¿CrediSeguro es confiable? Registro y qué revisar | Movapp',
      description:
         'Revisamos si CrediSeguro aparece en el registro de la CONDUSEF (SIPRES). Qué encontramos, con fecha de consulta, y qué revisar antes de usar la app.',
      breadcrumb: 'CrediSeguro',
      parents: [APPS],
      about: { '@type': 'SoftwareApplication', name: 'CrediSeguro' },
      faqs: CREDISEGURO_FAQS,
   },

   '/aplicaciones-prestamo/fortapresta': {
      // Ruta "fortapresta" (no "fortaprest"): slug canónico del documento
      // maestro de SEO, ver directorioApps.ts.
      name: '¿FortaPrest es confiable? Reportes y qué hacer | Movapp',
      description:
         'FortaPrest aparece registrada en la CONDUSEF, pero sus víctimas reportan amenazas y exhibición de datos. Qué hacer si te cobran y dónde denunciar.',
      breadcrumb: 'FortaPrest',
      parents: [APPS],
      about: { '@type': 'SoftwareApplication', name: 'FortaPrest' },
      faqs: FORTAPRESTA_FAQS,
   },

   '/aplicaciones-prestamo/klar': {
      name: '¿Klar es confiable? Registro en la CONDUSEF | Movapp',
      description:
         '¿Klar es confiable? Revisamos su registro en la CONDUSEF (SIPRES): empresa, clave y estatus con fecha de consulta, y qué revisar antes de contratar.',
      breadcrumb: 'Klar',
      parents: [APPS],
      about: { '@type': 'Organization', name: 'Klar Technologies, S.A. de C.V., S.F.P.', identifier: 'SIPRES 27009' },
      faqs: KLAR_FAQS,
   },

   '/aplicaciones-prestamo/kueski': {
      name: '¿Kueski es confiable? Registro en la CONDUSEF | Movapp',
      description:
         '¿Kueski es confiable? Revisamos su registro en la CONDUSEF (SIPRES): empresa, clave y estatus con fecha de consulta, y qué revisar antes de contratar.',
      breadcrumb: 'Kueski',
      parents: [APPS],
      about: { '@type': 'Organization', name: 'Kueski, S.A.P.I. de C.V., SOFOM, E.N.R.', identifier: 'SIPRES 694080' },
      faqs: KUESKI_FAQS,
   },

   '/aplicaciones-prestamo/mexicash': {
      name: '¿Mexicash es confiable? Depósitos no pedidos | Movapp',
      description:
         '¿Mexicash te depositó sin pedirlo o llama a tus contactos? No la encontramos en la CONDUSEF. Qué reportan sus víctimas, qué hacer y dónde denunciar.',
      breadcrumb: 'Mexicash',
      parents: [APPS],
      about: { '@type': 'SoftwareApplication', name: 'Mexicash' },
      faqs: MEXICASH_FAQS,
   },

   '/aplicaciones-prestamo/prestafacil': {
      name: '¿PrestaFácil es confiable? Reportes y qué hacer | Movapp',
      description:
         '¿PrestaFácil es confiable? No la localizamos en el registro de la CONDUSEF. Señales de riesgo que reportan sus víctimas y qué hacer si ya la descargaste.',
      breadcrumb: 'PrestaFácil',
      parents: [APPS],
      about: { '@type': 'SoftwareApplication', name: 'PrestaFácil' },
      faqs: PRESTAFACIL_FAQS,
   },

   '/aplicaciones-prestamo/starpresta': {
      name: '¿StarPresta es confiable? Grupos de WhatsApp | Movapp',
      description:
         '¿StarPresta creó un grupo de WhatsApp con tus contactos? Qué reportan sus víctimas, si aparece en la CONDUSEF y qué hacer para frenar el acoso.',
      breadcrumb: 'StarPresta',
      parents: [APPS],
      about: { '@type': 'SoftwareApplication', name: 'StarPresta' },
      faqs: STARPRESTA_FAQS,
   },

   '/aplicaciones-prestamo/tala': {
      name: '¿Tala es confiable? Registro en la CONDUSEF | Movapp',
      description:
         '¿Tala es confiable? Revisamos su registro en la CONDUSEF (SIPRES): empresa, clave y estatus con fecha de consulta, y qué revisar antes de contratar.',
      breadcrumb: 'Tala',
      parents: [APPS],
      about: {
         '@type': 'Organization',
         name: 'Tala Mobile, S.A.P.I. de C.V., SOFOM, E.N.R.',
         identifier: 'SIPRES 695521',
      },
      faqs: TALA_FAQS,
   },

   // --- P14 Testimonios. WebPage (ya no CollectionPage). Sin Review ni
   // AggregateRating: no hay calificaciones estructuradas visibles.
   '/testimonios': {
      name: 'Opiniones de Movapp: testimonios de víctimas | Movapp',
      description:
         'Testimonios de víctimas de apps montadeudas que Movapp ha acompañado, en sus propias palabras. Lee sus experiencias y comparte la tuya.',
      breadcrumb: 'Testimonios',
   },

   // --- P15 Contacto: ContactPage, la página tiene formulario real.
   '/contacto': {
      type: 'ContactPage',
      name: 'Contacto: ayuda contra apps montadeudas | Movapp',
      description:
         '¿Una app de préstamos te acosa? Escríbenos por el formulario o por WhatsApp al +52 55 7876 7442: revisamos tu caso gratis y sin compromiso.',
      breadcrumb: 'Contáctanos',
   },

   // --- P16 Sala de prensa. Los VideoObject NO van acá: la lista viene de
   // una API en cada request (@api/pressVideos.ts), así que prensa.astro los
   // suma con appendToGraph() y pasa el resultado por la prop `schema`.
   '/prensa': {
      type: 'CollectionPage',
      name: 'Sala de prensa: Erik Mann y Movapp en medios',
      description:
         'Entrevistas y apariciones en medios de Erik Mann, fundador de Movapp, sobre apps montadeudas, fraudes digitales y acoso por cobranza.',
      breadcrumb: 'Sala de prensa',
   },

   // --- P17 Blog.
   '/blog': {
      type: 'CollectionPage',
      name: 'Blog de Movapp: alertas y guías sobre montadeudas',
      description:
         'Alertas, guías y noticias sobre apps de préstamos montadeudas en México: qué reportan sus víctimas, cómo verificar una app y qué hacer si te acosan.',
      breadcrumb: 'Blog',
   },

   // --- Categoría del blog (sin documento P-nn; mismo formato). Plantilla
   // única src/pages/blog/[categoria].astro + @constants/blogCategoryPages.ts:
   // cada categoría publicada necesita su entrada acá o su miga sale vacía.
   '/blog/evaluaciones': {
      type: 'CollectionPage',
      name: 'Evaluaciones de apps y lista negra',
      description:
         'Revisa nuestro listado actualizado de apps fraudulentas e ilegales. Analizamos cada plataforma para que sepas cuáles evitar y cuáles sí son seguras.',
      breadcrumb: 'Evaluaciones de apps y lista negra',
   },

   // --- P18 / P19 Legales.
   '/aviso-de-privacidad': {
      name: 'Aviso de privacidad integral | Movapp',
      description:
         'Aviso de privacidad integral de Movapp: qué datos personales tratamos, para qué los usamos, a quién los transferimos y cómo ejercer tus derechos ARCO.',
      breadcrumb: 'Aviso de privacidad',
   },

   '/terminos-y-condiciones': {
      name: 'Términos y condiciones de uso | Movapp',
      description:
         'Términos y condiciones de uso del sitio, la app y los servicios de Movapp, incluido El Hack: contratación, pagos, cancelación, devoluciones y tus derechos.',
      breadcrumb: 'Términos y condiciones',
   },
};

// @graph estándar de una ruta: WebPage + BreadcrumbList (+ Service) (+ FAQPage).
function buildPageGraph(route, page, request) {
   const cfg = getSiteConfig(request);
   const nodes = [
      generateWebPageSchema(
         {
            type: page.type,
            name: page.name,
            path: route,
            description: page.description,
            about: page.about,
            mainEntity: page.service ? ref(SCHEMA_DATA.elHack.path, 'servicio', cfg) : undefined,
         },
         request,
      ),
   ];
   if (page.breadcrumb) {
      nodes.push(
         generateBreadcrumbSchema([...(page.parents ?? []), { name: page.breadcrumb, path: route }], request, {
            id: route,
         }),
      );
   }
   if (page.service) nodes.push(generateElHackSchema({ detailed: page.service === 'detailed' }, request));
   if (page.faqs?.length)
      nodes.push(generateFAQSchema(page.faqs, { '@id': nodeId(route, 'preguntas-frecuentes', cfg) }));
   return generateGraph(nodes);
}

// ============================================================
// 4. API PÚBLICA — lo que consume Layout.astro
// ============================================================

// Normaliza la ruta: "/preguntas-frecuentes/" y "/preguntas-frecuentes" son la misma página; "" es "/".
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
   Schema de una ruta: siempre un objeto { @context, @graph }. Es lo que
   Layout.astro serializa en el <head>.

   Las rutas que NO están en PAGE_SCHEMA (utilitarias: /404, /success,
   /pending, /failure...) reciben solo el Organization: declaran la entidad
   Movapp sin inventar schema que no corresponde a su contenido.
*/
export function getPageSchema(pathname, request = null) {
   const route = normalize(pathname);
   const page = PAGE_SCHEMA[route];
   if (!page) return generateGraph([generateOrganizationSchema(request)]);
   if (page.build) return page.build(request);
   return buildPageGraph(route, page, request);
}
