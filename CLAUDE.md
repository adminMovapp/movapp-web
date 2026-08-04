# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The actual Astro project lives in `movapp-web/`, not the repo root. Run all commands from that directory.

## Commands

All run from `movapp-web/`:

```
npm run dev          # astro dev, port 7001 (see astro.config.mjs)
npm run build        # astro build (output: 'server', Netlify adapter)
npm run preview      # astro preview
npm run check        # astro check (type-checking, incl. .astro files)
npm run sync         # astro sync (regenerate .astro/types.d.ts)
npm run format       # prettier --write . (uses prettier-plugin-astro)
```

There is no test suite configured in this repo.

## Architecture

**Movapp** is the marketing/e-commerce site for "El Hack," a digital product sold to users. Astro 5 in SSR mode (`output: 'server'`), deployed to Netlify via `@astrojs/netlify`, with React islands for interactive parts (cart, checkout) and static `.astro` components/pages for everything else.

### Path aliases

Both `astro.config.mjs` (Vite `resolve.alias`) and `tsconfig.json` define the same set of aliases — update both together if adding a new one: `@`, `@components`, `@layouts`, `@pages`, `@styles`, `@assets`, `@hooks`, `@context`, `@utils`, `@api`, `@constants` (tsconfig also has `@sections`, used for `src/sections/*`).

### Page/section split

`src/pages/*.astro` are route entry points; most delegate their body content to `src/sections/<page-name>/*.astro` (e.g. `sections/home/`, `sections/nosotros/`, `sections/tienda/`). `src/components/layout` holds chrome shared across every page (Header, Footer, MenuMobile, preloader, analytics/pixel scripts); `src/components/ui` holds smaller reusable pieces plus the two React islands.

### Progressive enhancement: full design with JS, lightweight HTML without it

Non-negotiable product requirement, implemented in `src/layouts/Layout.astro`: if the browser/bot can run JavaScript, the page looks exactly as designed (Tailwind, AOS animations, colors). If it can't, it serves lean semantic HTML with **100% of the real text/content still present** — only the visual design is gated behind JS, never actual content. `astro.config.mjs` has `tailwind({ applyBaseStyles: false })` to prevent the integration from auto-injecting its own Tailwind `<link>` and bypassing the gating; design stylesheets are imported with the `?url` suffix and manually attached from an inline script in `Layout.astro`, while `src/styles/no-js.css` (scoped under `html.no-js`) is the always-inlined fallback. Full mechanism, verification steps, and pitfalls (already-hit regressions) are documented in the `.claude/skills/Diseño/SKILL.md` skill — read it before touching this or adding new design-only CSS/libraries.

### Mobile-first design standard

Every new section/component is designed and verified on mobile (~375-428px viewport) first, desktop second — unprefixed Tailwind classes describe the mobile layout; `sm:`/`md:`/`lg:` only add desktop refinements, never the reverse. Also covered by the `Diseño` skill.

### SEO content import

New pages/sections are typically implemented from a master SEO/content document (attached to the conversation, not stored in the repo); SEO copy (H1, heading hierarchy, meta title/description/keywords, verbatim body copy) is the top priority of the project, ahead of any urge to paraphrase. The `.claude/skills/seo-content-import/SKILL.md` skill encodes the exact extraction/mapping/verification process to follow.

### Data flow: mobile-app backend as source of truth

There is no local database or CMS. `src/api/api.jsx` calls an external API (`PUBLIC_API_LINK`) that is shared with Movapp's mobile app:
- `getCountries()` / `getPrices(idcountry)` — country list and localized product pricing (`/config/countries`, `/config/prices`).
- `getCountry()` — geolocates the visitor via `PUBLIC_IPAPI_LINK` to auto-select their country/currency.
- `createStripeIntent(payload)` — creates a Stripe PaymentIntent server-side (`/payments/web/stripe/create-intent`).
- `createPreference(payload)` — legacy/alternate payment flow; payload is AES-encrypted client-side via `src/utils/crypto.js` before sending (shared secret, mirrors an encryption scheme used elsewhere in the Movapp ecosystem — not a security boundary, just payload obfuscation to match the existing API contract).

`src/hooks/useConfig.jsx` composes these three calls into one hook (countries → geolocated country → localized prices) used by the shop UI.

### Shop / cart / checkout flow (React islands)

- `src/context/CartContext.jsx` — cart state persisted to `localStorage` (key `cart`), broadcasts `cart:updated` window events so the non-React header badge (in `Header.astro`, vanilla JS) can stay in sync across island boundaries.
- `src/components/ui/ShopIsland.jsx` — mounted as a client island on `tienda.astro`; renders the product grid and a slide-in cart/checkout drawer with steps `cart → form → pay`. Wraps itself in `CartProvider`.
- `src/components/ui/StripeCheckout.jsx` — creates the Stripe PaymentIntent exactly once per checkout session (guarded by a ref) and caches `clientSecret` in the parent so navigating back and forth between the form and pay steps doesn't create duplicate orders/intents. Only invalidated when the cart total changes.
- Cart badge and drawer-open communicate with the React island only through `window` CustomEvents (`cart:open`, `cart:updated`) and `localStorage`, since the header is a static Astro component, not React.

### Config and SEO

`src/utils/config.jsx` is the single source for site config and SEO/meta generation:
- `siteConfigData` — static site metadata (name, urls per environment, social, SEO defaults).
- `getSiteConfig(request)` — resolves environment (`development`/`staging`/`production`) from the request hostname first, falling back to `PUBLIC_SITE_ENV` at build time; derives `siteUrl`, `noIndex`, `robotsContent`, etc. from that.
- `generateSEOTags()`, `generateOrganizationSchema()`, `generateServiceSchema()` — used by `Layout.astro` for meta tags/OG/Twitter cards and JSON-LD.
- `src/pages/env-check.txt.ts` is a diagnostic route that dumps the resolved environment/config as plain text — useful for verifying which environment a given deploy resolved to.

### Analytics/tracking

Purchases and checkout steps are tracked through both a client-side Meta Pixel (`MetaPixelScript.astro`, `public/js/metaPixel.js`) and a server-side Meta Conversions API call (`netlify/functions/meta-conversion.js`), fired together via `window.metaPixel.track(...)` (see `src/hooks/useMetaPixel.jsx`). The Netlify function hashes all PII (email, phone, name, zip, city, state, country) with SHA-256 before sending to Meta's Graph API — never pass raw PII through unhashed when touching this function. GA/GTM are wired in separately via `GoogleAnalytics.astro`/`GoogleTagManager.astro`.

### Environment variables

Required at runtime/build time (see `movapp-web/.env`, gitignored): `PUBLIC_API_LINK`, `PUBLIC_IPAPI_LINK`, `PUBLIC_STRIPE_PUBLISHABLE_KEY`, `PUBLIC_KEY_MP`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_GA`, `PUBLIC_GTM_ID`, `PUBLIC_SITE_ENV`, `PUBLIC_SHOW_HEADER_LAYER`, `PUBLIC_SHOW_HEADER_URL`, `PUBLIC_SHOW_PRELOADER`. Netlify function-only (server secrets, not `PUBLIC_`-prefixed so never exposed to the client): `META_ACCESS_TOKEN`, `META_PIXEL_ID`, `META_TEST_EVENT_CODE`.

### Netlify

`netlify.toml` maps `/api/*` requests to `netlify/functions/*` and sets `PUBLIC_SITE_ENV` per deploy context (`production`, `stage`, `branch-deploy`, `deploy-preview` all map to `staging` except the main production context).
