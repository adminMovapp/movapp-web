import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';
import { getPageEntry } from '@/utils/schema.js';
import { SITE_PAGES } from '@/constants/sitemapRoutes.ts';

// Reutiliza exactamente las mismas rutas del sitemap (SITE_PAGES) y las
// mismas descripciones ya aprobadas del schema (PAGE_SCHEMA, vía
// getPageEntry) -- así este archivo no puede desalinearse de lo que el sitio
// ya declara en otro lado, ni inventa copy nueva.
export const GET: APIRoute = ({ request }) => {
   const cfg = getSiteConfig(request);
   const base = cfg.siteUrl.replace(/\/$/, '');

   const lines = SITE_PAGES.map(({ path }) => {
      const entry = getPageEntry(path);
      const description = entry?.description ?? cfg.site.description;
      return `- [${base}${path}](${base}${path}): ${description}`;
   }).join('\n');

   const content = `# ${cfg.site.name}

> ${cfg.site.description}

${lines}
`;

   return new Response(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
   });
};
