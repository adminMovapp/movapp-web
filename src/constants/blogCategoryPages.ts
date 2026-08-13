// src/constants/blogCategoryPages.ts
//
// Contenido de las páginas de detalle de cada categoría del blog
// (/blog/<categorySlug>, ver src/pages/blog/[categoria].astro). Es una
// plantilla que se repite igual para varias categorías -- este archivo es
// el único lugar que cambia entre una y otra (título, texto, artículos);
// agregar una categoría nueva es agregar una entrada acá, nada que tocar en
// el .astro (ver skill Importaciones).
//
// "categorySlug" reutiliza el mismo id ya usado en @constants/blog.ts
// (BLOG_CATEGORIES) para las 4 categorías del blog -- mismo criterio de una
// sola fuente de verdad para el agrupamiento.
//
// Los enlaces "Ver noticia" de cada artículo apuntan a /blog/<slug> -- esas
// páginas de artículo individual todavía no existen, pero el enlace se crea
// de todos modos (mismo criterio ya usado en blog.ts).

export interface BlogCategoryArticle {
   slug: string;
   title: string;
}

export interface BlogCategoryPage {
   categorySlug: string;
   h1: string;
   intro: string;
   recentArticles: BlogCategoryArticle[];
   oldArticles: BlogCategoryArticle[];
}

export const BLOG_CATEGORY_PAGES: BlogCategoryPage[] = [
   {
      categorySlug: 'evaluaciones',
      h1: 'Evaluaciones de apps y lista negra',
      intro: 'Revisa nuestro listado actualizado de apps fraudulentas e ilegales. Analizamos cada plataforma para que sepas cuáles evitar y cuáles sí son seguras.',
      recentArticles: [
         {
            slug: 'aplicaciones-de-prestamos-confiables',
            title: 'Aplicaciones De Préstamos Confiables – Los Mejores Préstamos Confiables En Línea',
         },
         { slug: 'prestamax-es-confiable', title: 'Montadeudas – ¿Prestamax Es Confiable?' },
         {
            slug: 'lista-de-montadeudas',
            title: 'Lista De Montadeudas 2025 – Evita Caer Con Las Aplicaciones Más Peligrosas Del Año',
         },
      ],
      oldArticles: [
         { slug: 'fast-efectivo-es-confiable', title: 'Montadeudas – ¿Fast Efectivo Es Confiable?' },
         { slug: 'ok-dinero-condusef', title: 'Ok Dinero Ante CONDUSEF' },
         // Sin imagen todavía -- ver blogImages.ts (usa ImagePlaceholder de fallback).
         { slug: 'que-paso-con-fortaprest', title: '¿Qué Pasó Con La Aplicación Fortaprest?' },
      ],
   },
   {
      // "riesgo": mismo id que @constants/blog.ts (BLOG_CATEGORIES). Todavía
      // NO tiene entrada en PAGE_SCHEMA (@utils/schema.js) ni está enlazada
      // desde ningún lado del sitio (menú, /blog, el buscador) -- a pedido
      // explícito, se deja "en espera": la ruta existe y se puede visitar
      // directo, pero no se activa/publica hasta nuevo aviso.
      categorySlug: 'riesgo',
      h1: 'Modus operandi y consultas de riesgo',
      intro: 'Descubre cómo operan los montadeudas y prestamistas ilegales. Conoce sus tácticas de engaño, cobro abusivo y aprende a medir tu nivel de riesgo.',
      recentArticles: [
         { slug: 'ojo-aplicaciones-montadeudas', title: '¡Ojo Con Las Aplicaciones Montadeudas!' },
         {
            slug: 'estrategias-comunes-de-los-montadeudas',
            title: 'Estrategias Más Comunes De Los Montadeudas Y Cómo Enfrentarlas',
         },
         {
            slug: 'montadeudas-van-a-tu-casa',
            title: '¿Los Montadeudas Van A Tu Casa? – ¿Qué Puedes Hacer En Caso De Caer Con Montadeudas?',
         },
         { slug: 'montadeudas-kaby-llama-contactos', title: 'Montadeudas – ¿Kaby Llama A Tus Contactos?' },
         { slug: 'mexdin-llama-a-tus-contactos', title: '¿MexDin Llama A Tus Contactos?' },
      ],
      oldArticles: [
         {
            slug: 'montadeudas-publicar-en-redes-sociales',
            title: '¿Pueden Las Apps Montadeudas Publicar En Mis Redes Sociales?',
         },
         { slug: 'la-cobranza-de-starpresta', title: 'Montadeudas – La Cobranza De Starpresta' },
         { slug: 'hicredito-te-esta-cobrando', title: '¿HiCrédito Te Está Cobrando?' },
         // Sin imagen todavía -- ver blogImages.ts (usa ImagePlaceholder de fallback).
         { slug: 'que-pasa-si-no-le-pago-a-credmex', title: '¿Qué Pasa Si No Le Pago A Credmex?' },
         { slug: 'mexicash-molesta-a-tus-contactos', title: '¿Mexicash Molesta A Tus Contactos?' },
      ],
   },
];
