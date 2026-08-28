// src/constants/blog.ts
//
// Artículos del blog, agrupados por categoría. `slug` sigue la URL canónica
// del documento maestro de SEO (no el nombre de archivo de imagen del
// wireframe -- eso era la convención original, reemplazada al alinear las
// rutas ya construidas con el brief) y arma el enlace a /blog/<slug> -- esa
// página de artículo individual todavía no existe, pero el enlace se crea de
// todos modos (ver skill Importaciones).

export const BLOG_FEATURED = {
   slug: 'historia-movapp',
   title: 'Erik Mann y Movapp contra los montadeudas – Conoce la historia de cómo surgió Movapp',
};

export const BLOG_CATEGORIES = [
   {
      id: 'evaluaciones',
      title: 'Evaluaciones de apps y lista negra',
      articles: [
         {
            slug: 'apps-prestamos-confiables',
            title: 'Aplicaciones De Préstamos Confiables – Los Mejores Préstamos Confiables En Línea',
         },
      ],
   },
   {
      id: 'riesgo',
      title: 'Modus operandi y consultas de riesgo',
      articles: [
         {
            slug: 'como-identificar-apps-montadeudas',
            title: '¡Ojo Con Las Aplicaciones Montadeudas!',
         },
      ],
   },
   {
      id: 'guias',
      title: 'Guías de acción, denuncia y soluciones legales',
      articles: [
         {
            slug: 'que-hacer-con-apps-montadeudas',
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
