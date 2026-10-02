/// <reference types="astro/client" />

interface Window {
   // Entradas tipo Arguments (comandos gtag) -- ver GoogleAnalytics.astro.
   dataLayer: unknown[];
   // Solo existe cuando GA4 está montado (PUBLIC_GA4_ID definido y sin ?minimal=1).
   gtag?: (...args: unknown[]) => void;
}
