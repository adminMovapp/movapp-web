import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';
import { BLOG_HOME_SECTIONS } from '@/constants/blog.ts';

// Solo landings visibles/alcanzables desde el sitio (menú, footer, buscador o
// enlaces internos reales) -- quedan fuera a propósito las páginas
// utilitarias (404/410/301/302/notfound/success/failure/pending) y las
// huérfanas que siguen existiendo pero ya no están enlazadas desde ningún
// lado (/nosotros, /red -- quitados del menú el 2026-09-02) ni publicadas
// (/blog/riesgo, /blog/noticias -- "en espera", ver blogCategoryPages.ts).
//
// Los 27 artículos del blog se derivan de BLOG_HOME_SECTIONS (misma fuente
// que /blog) en vez de repetir los 27 slugs a mano acá.
const blogArticlePaths = BLOG_HOME_SECTIONS.flatMap((section) =>
  section.articles.map((article) => ({ path: `/blog/${article.slug}`, changefreq: 'yearly', priority: '0.5' })),
);

const pages = [
  { path: '/',               changefreq: 'weekly',  priority: '1.0' },
  { path: '/tienda',         changefreq: 'weekly',  priority: '0.9' },
  { path: '/el-hack',        changefreq: 'monthly', priority: '0.8' },
  { path: '/contacto',              changefreq: 'monthly', priority: '0.8' },
  { path: '/aplicaciones-prestamo', changefreq: 'monthly', priority: '0.8' },
  { path: '/aplicaciones-prestamo/crediseguro', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/tala', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/kueski', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/klar', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/prestafacil', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/fortapresta', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/mexicash', changefreq: 'monthly', priority: '0.6' },
  { path: '/aplicaciones-prestamo/starpresta', changefreq: 'monthly', priority: '0.6' },
  { path: '/testimonios',           changefreq: 'monthly', priority: '0.7' },
  { path: '/preguntas-frecuente',   changefreq: 'monthly', priority: '0.7' },
  { path: '/aviso-de-privacidad',  changefreq: 'yearly',  priority: '0.3' },
  { path: '/blog',                  changefreq: 'weekly',  priority: '0.7' },
  { path: '/blog/evaluaciones',     changefreq: 'weekly',  priority: '0.5' },
  ...blogArticlePaths,
];

export const GET: APIRoute = ({ request }) => {
  const base = getSiteConfig(request).siteUrl.replace(/\/$/, '');

  const urls = pages
    .map(
      ({ path, changefreq, priority }) => `
  <url>
    <loc>${base}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
