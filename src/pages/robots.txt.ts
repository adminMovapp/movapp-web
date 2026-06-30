import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';

const ROBOTS_STAGING = `User-agent: *
Disallow: /
`;

const ROBOTS_PRODUCTION = `User-agent: *
Allow: /
`;

export const GET: APIRoute = ({ request }) => {
  const cfg = getSiteConfig(request);
  const content = cfg.isProduction ? ROBOTS_PRODUCTION : ROBOTS_STAGING;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
