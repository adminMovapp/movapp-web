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
      // Orden cronológico descendente (más nuevo primero) -- mismo criterio
      // que "recientes" en blogCategoryPages.ts.
      articles: [
         { slug: 'prestamax-es-confiable', title: 'Montadeudas – ¿Prestamax Es Confiable?' },
         { slug: 'fast-efectivo-es-confiable', title: 'Montadeudas – ¿Fast Efectivo Es Confiable?' },
         {
            slug: 'historia-movapp',
            title: 'Erik Mann Y Movapp Contra Los Montadeudas – Conoce La Historia De Cómo Surgió Movapp',
         },
         {
            slug: 'apps-prestamos-confiables',
            title: 'Aplicaciones De Préstamos Confiables – Los Mejores Préstamos Confiables En Línea',
         },
         {
            slug: 'lista-montadeudas',
            title: 'Lista De Montadeudas 2025 – Evita Caer Con Las Aplicaciones Más Peligrosas Del Año',
         },
         {
            slug: 'montadeudas-van-a-tu-casa',
            title: '¿Los Montadeudas Van A Tu Casa? – ¿Qué Puedes Hacer En Caso De Caer Con Montadeudas?',
         },
      ],
   },
   {
      id: 'populares',
      title: 'Noticias populares',
      // Orden curado (no cronológico) -- a pedido, el mismo orden entregado.
      articles: [
         { slug: 'que-hacer-con-apps-montadeudas', title: 'Apps Montadeudas ¿Qué Hacer?' },
         { slug: 'como-denunciar-montadeudas', title: '¿Cómo Denunciar A Los Montadeudas?' },
         { slug: 'que-pasa-si-no-pagas-montadeudas', title: '¿Cómo No Pagar A Montadeudas?' },
         {
            slug: 'estrategias-montadeudas',
            title: 'Estrategias Más Comunes De Los Montadeudas Y Cómo Enfrentarlas',
         },
         {
            slug: 'que-hacer-si-descargaste-app-montadeudas',
            title: '¿Qué Hacer En Caso De Descargar Aplicaciones Montadeudas?',
         },
         { slug: 'condusef-montadeudas', title: 'CONDUSEF Vs Los Montadeudas' },
         {
            slug: 'montadeudas-redes-sociales',
            title: '¿Pueden Las Apps Montadeudas Publicar En Mis Redes Sociales?',
         },
         { slug: 'que-pasa-si-no-pago-credmex', title: '¿Qué Pasa Si No Le Pago A Credmex?' },
         { slug: 'movapp-es-confiable', title: '¿Qué Tan Confiable Es Movapp?' },
         { slug: 'hack-movapp-es-confiable', title: '¿El Hack De Movapp Funciona?' },
      ],
   },
   {
      id: 'antiguas',
      title: 'Noticias antiguas',
      // Orden cronológico descendente, igual que "recientes".
      articles: [
         { slug: 'que-es-movapp', title: '¿Qué Es Movapp?' },
         { slug: 'ok-dinero-condusef', title: 'Ok Dinero Ante CONDUSEF' },
         { slug: 'kaby-es-montadeudas', title: 'Montadeudas – ¿Kaby Llama A Tus Contactos?' },
         { slug: 'como-identificar-apps-montadeudas', title: '¡Ojo Con Las Aplicaciones Montadeudas!' },
         { slug: 'cobranza-starpresta', title: 'Montadeudas – La Cobranza De Starpresta' },
         { slug: 'hicredito-es-confiable', title: '¿HiCrédito Te Está Cobrando?' },
         { slug: 'defensa-del-deudor-vs-movapp', title: 'Defensa Del Deudor Vs Movapp' },
         {
            slug: 'hack-app-no-disponible',
            title: '¿Se Puede Realizar El Hack Si Ya No Se Encuentra En La Play O App Store?',
         },
         { slug: 'mexdin-llama-contactos', title: '¿MexDin Llama A Tus Contactos?' },
         { slug: 'que-paso-fortaprest', title: '¿Qué Pasó Con La Aplicación Fortaprest?' },
         { slug: 'mexicash-es-montadeudas', title: '¿Mexicash Molesta A Tus Contactos?' },
      ],
   },
];
