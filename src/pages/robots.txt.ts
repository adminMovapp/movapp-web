import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';

export const GET: APIRoute = ({ request }) => {
  const cfg = getSiteConfig(request);
  const base = cfg.siteUrl.replace(/\/$/, '');

  // La directiva Sitemap solo tiene sentido en producción: en staging/dev el
  // Disallow: / de abajo ya bloquea el rastreo completo del sitio, así que
  // apuntar a un sitemap que nadie puede seguir no aporta nada.
  const content = cfg.isProduction
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
