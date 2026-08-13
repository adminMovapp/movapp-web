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
];
