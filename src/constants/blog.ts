// src/constants/blog.ts
//
// Artículos del blog, agrupados por categoría. `slug` sale del nombre de
// archivo de imagen del wireframe (ej. "erik-mann-contra-los-
// montadeudas.webp", ya en formato slug) y arma el enlace a /blog/<slug> --
// esa página de artículo individual todavía no existe, pero el enlace se
// crea de todos modos (ver skill Importaciones).

export const BLOG_FEATURED = {
   slug: 'erik-mann-contra-los-montadeudas',
   title: 'Erik Mann y Movapp contra los montadeudas – Conoce la historia de cómo surgió Movapp',
};

export const BLOG_CATEGORIES = [
   {
      id: 'evaluaciones',
      title: 'Evaluaciones de apps y lista negra',
      articles: [
         {
            slug: 'aplicaciones-de-prestamos-confiables',
            title: 'Aplicaciones De Préstamos Confiables – Los Mejores Préstamos Confiables En Línea',
         },
      ],
   },
   {
      id: 'riesgo',
      title: 'Modus operandi y consultas de riesgo',
      articles: [
         {
            slug: 'ojo-aplicaciones-montadeudas',
            title: '¡Ojo Con Las Aplicaciones Montadeudas!',
         },
      ],
   },
   {
      id: 'guias',
      title: 'Guías de acción, denuncia y soluciones legales',
      articles: [
         {
            slug: 'app-montadeudas-que-hacer',
            title: 'Apps Montadeudas ¿Qué Hacer?',
         },
      ],
   },
   {
      id: 'noticias',
      title: 'Noticias de Movapp',
      articles: [
         {
            slug: 'que-es-movapp',
            title: '¿Qué Es Movapp?',
         },
      ],
   },
];
