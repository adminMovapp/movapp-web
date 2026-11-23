// src/constants/blog.ts
//
// Artículos del blog, agrupados por categoría. `slug` sigue la URL canónica
// del documento maestro de SEO (no el nombre de archivo de imagen del
// wireframe -- eso era la convención original, reemplazada al alinear las
// rutas ya construidas con el brief) y arma el enlace a /blog/<slug> -- esa
// página de artículo individual todavía no existe, pero el enlace se crea de
// todos modos (ver skill Importaciones).
import { BLOG_ARTICLES } from '@constants/blogArticles.ts';
import { parseSpanishDate } from '@utils/schema.js';

// Abreviatura de mes en español para la fecha corta de cada tarjeta de
// "Noticias recientes" (p.ej. "10 dic 2025") -- "sept" para septiembre porque
// es la abreviatura de uso real en español, no la de 3 letras genérica.
const SHORT_MONTHS: Record<string, string> = {
   enero: 'ene',
   febrero: 'feb',
   marzo: 'mar',
   abril: 'abr',
   mayo: 'may',
   junio: 'jun',
   julio: 'jul',
   agosto: 'ago',
   septiembre: 'sept',
   octubre: 'oct',
   noviembre: 'nov',
   diciembre: 'dic',
};

// "Diciembre 10, 2025" (formato real de BLOG_ARTICLES.publishDate) -> "10 dic
// 2025". No reusa parseSpanishDate para esto (esa devuelve ISO, no texto
// corto); sí lo usa para la clave de orden más abajo.
function shortSpanishDate(text: string): string | null {
   const match = /^(\p{L}+)\s+(\d{1,2}),\s*(\d{4})$/u.exec(text.trim());
   if (!match) return null;
   const [, monthName, day, year] = match;
   const short = SHORT_MONTHS[monthName.toLowerCase()];
   return short ? `${day} ${short} ${year}` : null;
}

// publishDate real (fuente única: BLOG_ARTICLES, ver blogArticles.ts) para un
// slug de esta lista -- evita mantener una fecha aparte y desincronizada acá.
function resolveArticleDate(slug: string): { date: string | null; iso: string | null } {
   const raw = BLOG_ARTICLES.find((article) => article.slug === slug)?.publishDate;
   if (!raw) return { date: null, iso: null };
   return { date: shortSpanishDate(raw), iso: parseSpanishDate(raw) };
}

export const BLOG_FEATURED = {
   // 2026-11-23, a pedido: el comunicado del EC3 Cyber Innovation Forum pasa
   // a ser el destacado (antes: Buen Fin, que sigue en "Noticias recientes").
   slug: 'ec3-cyber-innovation-forum-2026-europol',
   title: 'EC3 Cyber Innovation Forum 2026: MOVAPP en la sede de Europol en La Haya',
};

// Reemplaza las 4 categorías-stub anteriores (Evaluaciones/Modus operandi/
// Guías/Noticias, 1 artículo cada una -- contenido de relleno mientras el
// blog no tenía más que un puñado de artículos reales). Con los 27 artículos
// ya construidos (@constants/blogArticles.ts), el wireframe (2026-09-02)
// reorganiza la portada del blog en 3 secciones -- Recientes/Populares/
// Antiguas -- que entre las tres cubren TODOS los artículos, sin dejar
// ninguno fuera y sin repetir ninguno entre secciones (verificado 6+10+11 =
// 27 = total de artículos reales).
//
// Título y fecha de cada entrada verificados contra blogArticles.ts uno por
// uno -- coinciden exactos, ninguna discrepancia que resolver.
export const BLOG_HOME_SECTIONS = [
   {
      id: 'recientes',
      title: 'Noticias recientes',
      // Orden cronológico descendente (más nuevo primero), calculado de
      // verdad a partir de BLOG_ARTICLES.publishDate (resolveArticleDate)
      // en vez de confiar en que este array esté a mano en el orden
      // correcto -- goLive QA (URL-BLOG-003): el orden manual anterior
      // coincidía por casualidad, pero un artículo nuevo agregado sin
      // fijarse en la fecha lo habría desordenado en silencio. `date` es la
      // fecha corta que se muestra en la tarjeta (BlogCategorySection.astro).
      articles: [
         // 2026-11-23: comunicado del EC3 Cyber Innovation Forum (las 3
         // secciones suman ahora 30). La fecha (Noviembre 18, 2026) lo ordena
         // primero sola.
         {
            slug: 'ec3-cyber-innovation-forum-2026-europol',
            title: 'EC3 Cyber Innovation Forum 2026: MOVAPP en la sede de Europol en La Haya',
         },
         // 2026-11-17: Buen Fin (las 3 secciones suman ahora 29). La fecha
         // (Noviembre 12, 2026) lo ordena primero sola.
         { slug: 'buen-fin-apps-montadeudas', title: 'Buen Fin: cómo evitar caer en apps montadeudas al pedir un préstamo' },
         // 2026-11-05: séptimo artículo de la sección (las 3 secciones ya
         // no suman 27 sino 28). La fecha la ordena primero sola.
         {
            slug: 'octopus-conference-2026-ciberdelincuencia-ia-extorsion',
            title: 'Octopus Conference 2026: inteligencia artificial, evidencia digital y extorsión en la agenda global contra la ciberdelincuencia',
         },
         { slug: 'prestamax-es-confiable', title: '¿Prestamax es confiable? Lo que reportan las víctimas y qué hacer si ya la descargaste' },
         { slug: 'fast-efectivo-es-confiable', title: '¿Fast Efectivo es confiable? Lo que reportan las víctimas y qué hacer si ya la descargaste' },
         {
            slug: 'historia-movapp',
            title: 'Erik Mann y Movapp contra los montadeudas: la historia de cómo surgió Movapp',
         },
         {
            slug: 'apps-prestamos-confiables',
            title: 'Aplicaciones de préstamos confiables – Los mejores préstamos confiables en línea',
         },
         {
            slug: 'lista-montadeudas',
            title: 'Lista de montadeudas: las apps de préstamos con más reportes en Movapp',
         },
         {
            slug: 'montadeudas-van-a-tu-casa',
            title: '¿Los montadeudas van a tu casa? Qué hay detrás de la amenaza y qué hacer',
         },
      ]
         .map((article) => ({ ...article, ...resolveArticleDate(article.slug) }))
         .sort((a, b) => (b.iso ?? '').localeCompare(a.iso ?? ''))
         // "iso" era solo la clave de orden -- no hace falta pasarla a la
         // tarjeta (BlogCategorySection.astro solo necesita "date", ya
         // formateada para mostrar).
         .map(({ iso, ...article }) => article),
   },
   {
      id: 'populares',
      title: 'Noticias populares',
      // Orden curado (no cronológico) -- a pedido, el mismo orden entregado.
      articles: [
         { slug: 'que-hacer-con-apps-montadeudas', title: 'Apps montadeudas: qué son y qué hacer si ya caíste' },
         { slug: 'como-denunciar-montadeudas', title: '¿Cómo denunciar a los montadeudas? Dónde y cómo denunciar una app de préstamos en México' },
         { slug: 'que-pasa-si-no-pagas-montadeudas', title: '¿Debes pagar a los montadeudas? Qué pasa si no pagas y qué revisar antes' },
         {
            slug: 'estrategias-montadeudas',
            title: 'Estrategias más comunes de los montadeudas y cómo enfrentarlas',
         },
         {
            slug: 'que-hacer-si-descargaste-app-montadeudas',
            title: '¿Descargaste una app montadeudas? Qué hacer paso a paso para proteger tus datos',
         },
         { slug: 'condusef-montadeudas', title: 'CONDUSEF vs los montadeudas: qué puede hacer, qué no y cómo verificar una app en el SIPRES' },
         {
            slug: 'montadeudas-redes-sociales',
            title: '¿Pueden las apps montadeudas publicar en mis redes sociales?',
         },
         { slug: 'que-pasa-si-no-pago-credmex', title: '¿Qué pasa si no le pago a Credmex? Historial crediticio, cobranza y qué hacer' },
         { slug: 'movapp-es-confiable', title: '¿Qué tan confiable es Movapp? Lo que debes saber antes de contactarnos' },
         { slug: 'hack-movapp-es-confiable', title: '¿El Hack de Movapp funciona? Qué es, cómo se aplica y qué puedes esperar' },
      ],
   },
   {
      id: 'antiguas',
      title: 'Noticias antiguas',
      // Orden cronológico descendente, igual que "recientes".
      articles: [
         { slug: 'que-es-movapp', title: '¿Qué es Movapp? Qué hace, qué no hace y cómo ayuda a víctimas de apps montadeudas' },
         { slug: 'ok-dinero-condusef', title: 'Ok Dinero ante la CONDUSEF: ¿es confiable? Qué reportan las víctimas y qué hacer' },
         { slug: 'kaby-es-montadeudas', title: '¿Kaby llama a tus contactos? Qué reportan las víctimas y cómo verificar su registro' },
         { slug: 'como-identificar-apps-montadeudas', title: '¡Ojo con las aplicaciones montadeudas! Cómo identificarlas antes de descargar' },
         { slug: 'cobranza-starpresta', title: 'La cobranza de Starpresta: ¿es confiable? Qué reportan las víctimas y qué hacer' },
         { slug: 'hicredito-es-confiable', title: '¿HiCrédito te está cobrando? Qué reportan las víctimas, si es confiable y qué hacer' },
         { slug: 'defensa-del-deudor-vs-movapp', title: 'Defensa del Deudor vs Movapp: qué pasó entre ellos y en qué se diferencian' },
         {
            slug: 'hack-app-no-disponible',
            title: '¿Se puede aplicar El Hack si la app ya no está en Play Store o App Store?',
         },
         { slug: 'mexdin-llama-contactos', title: '¿MexDin llama a tus contactos? Qué reportan las víctimas, si es legal y qué pasa si no pagas' },
         { slug: 'que-paso-fortaprest', title: '¿Qué pasó con Fortaprest? Por qué desapareció, por qué volvió y qué pasa si no pagas' },
         { slug: 'mexicash-es-montadeudas', title: '¿Mexicash molesta a tus contactos? Qué reportan las víctimas, si es confiable y qué hacer' },
      ],
   },
];
