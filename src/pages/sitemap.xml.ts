import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';

const pages = [
  { path: '/',               changefreq: 'weekly',  priority: '1.0' },
  { path: '/tienda',         changefreq: 'weekly',  priority: '0.9' },
  { path: '/el-hack',        changefreq: 'monthly', priority: '0.8' },
  { path: '/nosotros',       changefreq: 'monthly', priority: '0.8' },
  { path: '/red',            changefreq: 'monthly', priority: '0.8' },
  { path: '/contactanos',    changefreq: 'monthly', priority: '0.8' },
  { path: '/testimonials',   changefreq: 'monthly', priority: '0.7' },
  { path: '/collaborations', changefreq: 'monthly', priority: '0.7' },
  { path: '/faqs',           changefreq: 'monthly', priority: '0.7' },
  { path: '/mind',           changefreq: 'monthly', priority: '0.6' },
  { path: '/privacypolicy',  changefreq: 'yearly',  priority: '0.3' },
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
