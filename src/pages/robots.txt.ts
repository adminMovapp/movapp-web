import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';

export const GET: APIRoute = ({ request }) => {
  const cfg = getSiteConfig(request);
  const base = cfg.siteUrl.replace(/\/$/, '');

  // movapp-master.netlify.app (QA) es un build de producción: resuelve
  // isProduction y emite canonicals a movapp.org, pero no debe rastrearse.
  // Solo el dominio definitivo (con o sin www) abre el rastreo.
  const productionHost = new URL(base).hostname;
  const host = new URL(request.url).hostname.replace(/^www\./, '');
  const allowCrawl = cfg.isProduction && host === productionHost;

  // La directiva Sitemap solo tiene sentido en producción: en staging/dev el
  // Disallow: / de abajo ya bloquea el rastreo completo del sitio, así que
  // apuntar a un sitemap que nadie puede seguir no aporta nada.
  const content = allowCrawl
    ? `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`
    : `User-agent: *
Disallow: /
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
