import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';

export const GET: APIRoute = ({ request }) => {
  const cfg = getSiteConfig(request);

  const content = `PUBLIC_SITE_ENV: ${import.meta.env.PUBLIC_SITE_ENV ?? '(no definido)'}
environment: ${cfg.environment}
isProduction: ${cfg.isProduction}
isStaging: ${cfg.isStaging}
isDev: ${cfg.isDev}
siteUrl: ${cfg.siteUrl}
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
