// src/constants/blogArticles.ts
//
// Contenido de la página de detalle de UN artículo individual del blog
// (/blog/<slug>, ver src/pages/blog/[articulo].astro) -- un nivel más
// adentro que blogCategoryPages.ts (esa plantilla es el listado de
// artículos de una categoría; ésta es el artículo en sí, con su cuerpo
// completo). Mismo criterio de la plantilla: una entrada acá = una página
// nueva, nada que tocar en el .astro.
//
// El primer artículo (slug "aplicaciones-de-prestamos-confiables") ya
// aparece como tarjeta en @constants/blog.ts y en
// @constants/blogCategoryPages.ts ("evaluaciones") -- son datos distintos a
// propósito: esas dos listas solo necesitan slug+título para la tarjeta,
// acá vive el contenido completo (cuerpo, autor, relacionados). Duplicar el
// título entre archivos ya es el criterio existente del proyecto (ver
// blogCategoryPages.ts vs blog.ts).
export interface BlogArticle {
   slug: string;
   // H1 -- mismo texto que ya existe en blog.ts/blogCategoryPages.ts para
   // este artículo. Se muestra en mayúsculas vía CSS ("uppercase"), así que
   // la capitalización de este string no importa visualmente para el H1.
   title: string;
   // Mismo título, pero tal cual debe verse en el breadcrumb (que NO fuerza
   // mayúsculas) -- acá sí importa la capitalización real.
   breadcrumbLabel: string;
   author: string;
   publishDate: string;
   readingMinutes: number;
   paragraphs: string[];
   authorBio: {
      name: string;
      text: string;
   };
   relatedArticles: { slug: string; title: string }[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
   {
      slug: 'aplicaciones-de-prestamos-confiables',
      title: 'Aplicaciones De Préstamos Confiables – Los Mejores Préstamos Confiables En Línea',
      breadcrumbLabel: 'Aplicaciones de préstamos confiables – Los mejores préstamos confiables en línea',
      author: 'Equipo Movapp',
      publishDate: 'Diciembre 10, 2025',
      readingMinutes: 8,
      paragraphs: [
         'En Movapp no ofrecemos préstamos, ayudamos a personas que han sido víctimas de aplicaciones de préstamos montadeudas. Una consulta que nos hacen con mucha frecuencia es qué préstamos en línea son confiables y seguros.',
         'En esta época en la que hay tantas aplicaciones que te roban tu información y las usan para intimidarte se ha vuelto una pregunta muy importante.',
         'Sabemos que tienes la necesidad de cubrir un gasto que es muy urgente e importante para ti. Y lo que menos deseamos en Movapp es que llegues a caer con los montadeudas y pases un mal momento por su culpa.',
         'Por lo tanto, hemos decidido realizar un listado con unas cuantas aplicaciones que no realizan acoso a tus contactos. Es decir, te damos una lista curada con aplicaciones de préstamos en los que puedes confiar.',
      ],
      authorBio: {
         name: 'Equipo Movapp',
         text: 'Investigamos y verificamos reportes de usuarios sobre apps financieras en México.',
      },
      // Mismos 3 artículos que ya son "oldArticles" de la categoría
      // "evaluaciones" en blogCategoryPages.ts -- ya tienen imagen resuelta
      // en blogImages.ts (o el placeholder, para que-paso-con-fortaprest).
      relatedArticles: [
         { slug: 'fast-efectivo-es-confiable', title: 'Montadeudas – ¿Fast Efectivo Es Confiable?' },
         { slug: 'ok-dinero-condusef', title: 'Ok Dinero Ante CONDUSEF' },
         { slug: 'que-paso-con-fortaprest', title: '¿Qué Pasó Con La Aplicación Fortaprest?' },
      ],
   },
];
