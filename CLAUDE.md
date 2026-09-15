# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The Astro project lives at the repo root (`package.json`, `astro.config.mjs`, `src/` are top-level). Run all commands from the repo root.

## Commands

All run from the repo root:

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

New pages/sections are typically implemented from a master SEO/content document (attached to the conversation, not stored in the repo); SEO copy (H1, heading hierarchy, meta title/description, verbatim body copy) is the top priority of the project, ahead of any urge to paraphrase. The `.claude/skills/Importaciones/SKILL.md` skill encodes the exact extraction/mapping/verification process to follow, plus two conventions that apply regardless of a source document: unique `id`s on WhatsApp buttons and contextual `alt` text on content images.

### Performance (Lighthouse / PSI)

Ongoing work driven by user-supplied Lighthouse/PageSpeed Insights screenshots. The `.claude/skills/Rendimiento/SKILL.md` skill documents everything already fixed (`inlineStylesheets: 'always'`, image sizing, `defer`/preconnect, the double-rAF forced-reflow pattern) and — most importantly — a real CLS bug specific to this codebase's no-js/js progressive-enhancement mechanism: an `<Image>` with a `height` prop sized for retina but a much smaller final Tailwind class causes a visible layout jump before Tailwind loads, fixed by pinning the true final size in the component's scoped `<style>` (always inlined, unlike Tailwind). Read it before touching image sizing, third-party scripts, or any Lighthouse-flagged issue — it also covers how to tell whether a new report is against a stale deploy instead of a failed fix.

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
- `generateSEOTags()` — used by `Layout.astro` for meta tags/OG/Twitter cards.
- `src/pages/env-check.txt.ts` is a diagnostic route that dumps the resolved environment/config as plain text — useful for verifying which environment a given deploy resolved to.

### Schema.org / JSON-LD

`src/utils/schema.js` is the **single file** for the whole structured-data feature, implementing the "Movapp · Schema Markup v2.0" typology guide (which schema type each kind of landing page gets). It holds, in order: `SCHEMA_DATA` (Organization + the two product entities), one generator per schema type, `PAGE_SCHEMA` (route → what that page emits), and `getPageSchema(pathname, request)`.

`Layout.astro` resolves the JSON-LD from `Astro.url.pathname` on its own and serializes it into the `<head>` — **pages declare nothing**. Adding or changing a page's schema means editing only the `PAGE_SCHEMA` entry. Routes absent from that map (`/404`, `/success`, `/tienda`…) fall back to Organization alone. The layout's `schema` prop is an escape hatch reserved for the upcoming dynamic pSEO pages, whose schema comes from per-entry frontmatter rather than a fixed route. A `PAGE_SCHEMA` entry's `description` doubles as the page's default meta description, so that copy is never written twice.

Two hard rules from the guide: the JSON-LD must exist in the initial SSR HTML (verify with `curl -s <url> | grep -A 30 'application/ld+json'`, never generate it from a React island), and it may only declare what is **visibly on the page**. That second rule is why FAQ/HowTo copy lives in `src/constants/elhack.ts` and `src/constants/faqs.ts` — those constants render the markup *and* feed the schema, so the two cannot drift. Note one deliberate divergence from the guide, documented in `SCHEMA_DATA.elHack`: El Hack uses `AggregateOffer`/`lowPrice: 500` rather than the guide's `price: 0`, because the visible copy states the hack costs from $500 MXN (only the advice is free).

### Analytics/tracking

Purchases and checkout steps are tracked through both a client-side Meta Pixel (`MetaPixelScript.astro`, `public/js/metaPixel.js`) and a server-side Meta Conversions API call (`netlify/functions/meta-conversion.js`), fired together via `window.metaPixel.track(...)` (see `src/hooks/useMetaPixel.jsx`). The Netlify function hashes all PII (email, phone, name, zip, city, state, country) with SHA-256 before sending to Meta's Graph API — never pass raw PII through unhashed when touching this function. GA4 is wired in via `GoogleAnalytics.astro` (canonical gtag snippet; it also assigns `window.gtag` explicitly because Astro wraps `define:vars` inline scripts in an IIFE). There is **no Google Tag Manager container**: the site used to load `gtm.js?id=GT-…` next to `gtag/js`, which duplicated the same Google tag and let the two instances clobber each other, so it was removed. Every GA4 event from code goes through `pushToDataLayer(event, params)` in `src/utils/dataLayer.js`, which calls `window.gtag('event', …)` — never push plain `{event: …}` objects to `dataLayer`, gtag.js ignores them without GTM. Navigation CTAs are tracked by a single delegated click listener in `Layout.astro`, following the consultant's "Plan de eventos GA4" (Sept 2026): any link to WhatsApp emits `whatsapp_click` (`button_id`, `button_text`, `placement`, `destination_url` without query string, `page_location`); other elements with `data-cta` or `data-destination-type` emit `cta_click` (`cta_name`, `placement`, `destination_type`, `destination_url`, `page_location`); `data-ga-event` overrides the name (app carousel cards emit `app_select` with `app_id`/`app_name`/`app_type`/`list_name`), and `AppHero.astro` emits `app_detail_view` on each app page load. `placement` is a closed catalog (`header|hero|footer|sticky|contenido`) from `data-placement`, else `hero` when `data-section-name="hero"`, else `contenido`. Adding a tracked CTA means adding those attributes, not a script. Never put PII in event params.

Order matters inside that listener: `data-ga-event` is checked **before** the WhatsApp branch. The blog's share block (`BlogArticleShare.astro`) links to `api.whatsapp.com`, so without that precedence a share would be counted as `whatsapp_click` and inflate the main conversion. Its four network links emit `share` through the listener; the native-share button emits its own `share` from the component script, because its `method` (`nativo` vs `copiar_enlace`) is only known at runtime and it must not fire when the user cancels. `app_name` always comes from `APP_NAME_BY_SLUG` in `src/constants/tracking.ts` (display name) with the slug as `app_id`, so the same app never splits into two rows across `app_detail_view`, `app_select`, `whatsapp_click` and `cta_click`. `view_search_results` is emitted by hand from `src/utils/searchWidget.ts` (debounced, deduped): the site search is an overlay that never changes the URL, so GA4's enhanced measurement can never detect it. Both the helper and the listener are no-ops when GA4 is not mounted (`?minimal=1` or no `PUBLIC_GA4_ID`).

### Environment variables

Required at runtime/build time (see `.env`, gitignored): `PUBLIC_API_LINK`, `PUBLIC_IPAPI_LINK`, `PUBLIC_STRIPE_PUBLISHABLE_KEY`, `PUBLIC_KEY_MP`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_GA4_ID`, `PUBLIC_SITE_ENV`, `PUBLIC_SHOW_HEADER_LAYER`, `PUBLIC_SHOW_HEADER_URL`, `PUBLIC_SHOW_PRELOADER`. Netlify function-only (server secrets, not `PUBLIC_`-prefixed so never exposed to the client): `META_ACCESS_TOKEN`, `META_PIXEL_ID`, `META_TEST_EVENT_CODE`.

Meta Pixel vars (`PUBLIC_META_PIXEL_ID`, `META_PIXEL_ID`, `META_ACCESS_TOKEN`) are set **only in the Netlify production context** and left empty everywhere else — stage, branch deploys and local builds intentionally ship without the pixel so test traffic never reaches Meta. `Layout.astro` mounts `MetaPixelScript` only when `PUBLIC_META_PIXEL_ID` is truthy, and `metaPixel.js` no-ops `trackEvent`/`trackPageView` until the pixel is initialized. `PUBLIC_META_PIXEL_ID` is inlined at build time, so changing it in Netlify requires a redeploy; the two server vars are read at runtime by the function. The access token is generated in Events Manager → pixel → Settings → Conversions API → "Generate access token".

`PUBLIC_GA4_ID` is also inlined at build time and must be **scoped per Netlify deploy context**: the staging property ID (`G-75VDY1T621`, "Movapp - Staging / QA") in `stage`/`branch-deploy`/`deploy-preview`, the production property ID only in `production`. `stage.movapp.org` and `movapp.org` share the `movapp.org` cookie domain, so a single ID in both would mix their data. `Layout.astro` mounts `GoogleAnalytics` only when the var is truthy.

### Netlify

`netlify.toml` maps `/api/*` requests to `netlify/functions/*` and sets `PUBLIC_SITE_ENV` per deploy context (`production`, `stage`, `branch-deploy`, `deploy-preview` all map to `staging` except the main production context).
