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
            slug: 'apps-prestamos-confiables',
            title: 'Aplicaciones de préstamos confiables – Los mejores préstamos confiables en línea',
         },
         { slug: 'prestamax-es-confiable', title: '¿Prestamax es confiable? Lo que reportan las víctimas y qué hacer si ya la descargaste' },
         {
            slug: 'lista-montadeudas',
            title: 'Lista de montadeudas: las apps de préstamos con más reportes en Movapp',
         },
      ],
      oldArticles: [
         { slug: 'fast-efectivo-es-confiable', title: '¿Fast Efectivo es confiable? Lo que reportan las víctimas y qué hacer si ya la descargaste' },
         { slug: 'ok-dinero-condusef', title: 'Ok Dinero ante la CONDUSEF: ¿es confiable? Qué reportan las víctimas y qué hacer' },
         // Sin imagen todavía -- ver blogImages.ts (usa ImagePlaceholder de fallback).
         { slug: 'que-paso-fortaprest', title: '¿Qué pasó con Fortaprest? Por qué desapareció, por qué volvió y qué pasa si no pagas' },
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
         { slug: 'como-identificar-apps-montadeudas', title: '¡Ojo con las aplicaciones montadeudas! Cómo identificarlas antes de descargar' },
         {
            slug: 'estrategias-montadeudas',
            title: 'Estrategias más comunes de los montadeudas y cómo enfrentarlas',
         },
         {
            slug: 'montadeudas-van-a-tu-casa',
            title: '¿Los montadeudas van a tu casa? Qué hay detrás de la amenaza y qué hacer',
         },
         { slug: 'kaby-es-montadeudas', title: '¿Kaby llama a tus contactos? Qué reportan las víctimas y cómo verificar su registro' },
         { slug: 'mexdin-llama-contactos', title: '¿MexDin llama a tus contactos? Qué reportan las víctimas, si es legal y qué pasa si no pagas' },
      ],
      oldArticles: [
         {
            slug: 'montadeudas-redes-sociales',
            title: '¿Pueden las apps montadeudas publicar en mis redes sociales?',
         },
         { slug: 'cobranza-starpresta', title: 'La cobranza de Starpresta: ¿es confiable? Qué reportan las víctimas y qué hacer' },
         { slug: 'hicredito-es-confiable', title: '¿HiCrédito te está cobrando? Qué reportan las víctimas, si es confiable y qué hacer' },
         // Sin imagen todavía -- ver blogImages.ts (usa ImagePlaceholder de fallback).
         { slug: 'que-pasa-si-no-pago-credmex', title: '¿Qué pasa si no le pago a Credmex? Historial crediticio, cobranza y qué hacer' },
         { slug: 'mexicash-es-montadeudas', title: '¿Mexicash molesta a tus contactos? Qué reportan las víctimas, si es confiable y qué hacer' },
      ],
   },
   {
      // "noticias": mismo id que @constants/blog.ts (BLOG_CATEGORIES). Igual
      // que "riesgo" arriba: todavía sin entrada en PAGE_SCHEMA ni enlazada
      // desde ningún lado del sitio -- en espera, solo visitable directo.
      categorySlug: 'noticias',
      h1: 'Noticias de Movapp',
      intro: 'Mantente al día con los últimos operativos, alertas financieras y actualizaciones del equipo de Movapp en la lucha contra el fraude digital.',
      recentArticles: [
         // 2026-11-23: comunicado del EC3 Cyber Innovation Forum, el más nuevo.
         {
            slug: 'ec3-cyber-innovation-forum-2026-europol',
            title: 'EC3 Cyber Innovation Forum 2026: MOVAPP en la sede de Europol en La Haya',
         },
         {
            slug: 'octopus-conference-2026-ciberdelincuencia-ia-extorsion',
            title: 'Octopus Conference 2026: inteligencia artificial, evidencia digital y extorsión en la agenda global contra la ciberdelincuencia',
         },
         { slug: 'que-es-movapp', title: '¿Qué es Movapp? Qué hace, qué no hace y cómo ayuda a víctimas de apps montadeudas' },
         {
            slug: 'historia-movapp',
            title: 'Erik Mann y Movapp contra los montadeudas: la historia de cómo surgió Movapp',
         },
         { slug: 'movapp-es-confiable', title: '¿Qué tan confiable es Movapp? Lo que debes saber antes de contactarnos' },
      ],
      oldArticles: [
         { slug: 'hack-movapp-es-confiable', title: '¿El Hack de Movapp funciona? Qué es, cómo se aplica y qué puedes esperar' },
         // Sin imagen todavía -- ver blogImages.ts (usa ImagePlaceholder de fallback).
         {
            slug: 'hack-app-no-disponible',
            title: '¿Se puede aplicar El Hack si la app ya no está en Play Store o App Store?',
         },
         { slug: 'defensa-del-deudor-vs-movapp', title: 'Defensa del Deudor vs Movapp: qué pasó entre ellos y en qué se diferencian' },
      ],
   },
];
