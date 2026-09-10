/// <reference types="astro/client" />

interface Window {
   dataLayer: Record<string, unknown>[];
}

interface ImportMetaEnv {
   readonly PUBLIC_GTM_AUTH_STAGING?: string;
   readonly PUBLIC_GTM_PREVIEW_STAGING?: string;
}
