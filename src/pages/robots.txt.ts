import type { APIRoute } from 'astro';
import { getSiteConfig } from '@/utils/config.jsx';

const ROBOTS_STAGING = `User-agent: *
Disallow: /
`;

const ROBOTS_PRODUCTION = `# BEGIN Cloudflare Managed content

User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CloudflareBrowserRenderingCrawler
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

# END Cloudflare Managed Content
`;

export const GET: APIRoute = ({ request }) => {
  const cfg = getSiteConfig(request);
  const content = cfg.isProduction ? ROBOTS_PRODUCTION : ROBOTS_STAGING;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
