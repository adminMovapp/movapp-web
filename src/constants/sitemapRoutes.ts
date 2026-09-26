import { BLOG_HOME_SECTIONS } from './blog.ts';

// Fuente única de las rutas indexables del sitio -- la consumen tanto
// sitemap.xml.ts como llms.txt.ts, para que ninguna de las dos pueda quedar
// desalineada de la otra.
//
// Solo landings visibles/alcanzables desde el sitio (menú, footer, buscador o
// enlaces internos reales) -- quedan fuera a propósito las páginas
// utilitarias (404/410/301/302/notfound/success/failure/pending) y las
// huérfanas que ya no están enlazadas desde ningún lado (/nosotros, /red,
// /mind, /collaborations, /recursos) ni publicadas (/blog/riesgo,
// /blog/noticias -- "en espera", ver blogCategoryPages.ts).
//
// Todas las rutas van con barra final: es la convención del sitio (ver
// withTrailingSlash en @utils/config.jsx) y evita el salto extra de
// redirección que agrega el servidor cuando el destino no la trae.
export const BLOG_ARTICLE_PATHS = BLOG_HOME_SECTIONS.flatMap((section) =>
   section.articles.map((article) => ({ path: `/blog/${article.slug}/`, changefreq: 'yearly', priority: '0.5' })),
);

export const SITE_PAGES = [
   { path: '/', changefreq: 'weekly', priority: '1.0' },
   { path: '/tienda/', changefreq: 'weekly', priority: '0.9' },
   { path: '/el-hack/', changefreq: 'monthly', priority: '0.8' },
   { path: '/contacto/', changefreq: 'monthly', priority: '0.8' },
   { path: '/aplicaciones-prestamo/', changefreq: 'monthly', priority: '0.8' },
   { path: '/aplicaciones-prestamo/crediseguro/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/tala/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/kueski/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/klar/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/prestafacil/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/fortapresta/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/mexicash/', changefreq: 'monthly', priority: '0.6' },
   { path: '/aplicaciones-prestamo/starpresta/', changefreq: 'monthly', priority: '0.6' },
   { path: '/testimonios/', changefreq: 'monthly', priority: '0.7' },
   { path: '/preguntas-frecuentes/', changefreq: 'monthly', priority: '0.7' },
   { path: '/aviso-de-privacidad/', changefreq: 'yearly', priority: '0.3' },
   { path: '/blog/', changefreq: 'weekly', priority: '0.7' },
   { path: '/blog/evaluaciones/', changefreq: 'weekly', priority: '0.5' },
   ...BLOG_ARTICLE_PATHS,
];
