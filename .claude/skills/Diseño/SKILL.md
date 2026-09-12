---
name: Diseño
description: Mantiene/extiende el patrón de mejora progresiva del sitio Astro de Movapp - con JavaScript se ve el diseño completo (Tailwind, animaciones AOS, colores); sin JavaScript se sirve HTML semántico ultraligero con el texto 100% intacto, para aligerar la página y ayudar al SEO/bots de Google. También cubre el criterio de diseño "mobile-first" del sitio: toda sección/componente nuevo se diseña y verifica primero en móvil, después en escritorio. Úsala al agregar CSS, componentes, librerías visuales o secciones nuevas, o cuando el usuario pida revisar/ajustar el comportamiento sin JS o la experiencia en móvil.
---

# Mejora progresiva: diseño completo con JS, HTML ligero sin JS

Objetivo de negocio (no renegociable): si el navegador o el bot **puede** ejecutar
JavaScript, la página se ve exactamente igual que hoy (Tailwind, colores, animaciones,
todo). Si **no puede**, se sirve HTML semántico sin el peso de Tailwind — pero **el 100%
del texto/contenido real debe seguir presente** en el HTML crudo. Nunca ocultar contenido
real detrás de JS; solo el *diseño* está condicionado.

## Cómo funciona hoy (mecanismo ya implementado, en `src/layouts/Layout.astro`)

1. `<html class="no-js dark">` es el estado por defecto (SSR, sin asumir JS).
2. Un `<script is:inline>` **síncrono**, lo primero en el `<head>`, hace dos cosas:
   - Cambia la clase de `no-js` → `js` en el `<html>`.
   - Crea manualmente los `<link rel="stylesheet">` (Tailwind, AOS, flag-icons CDN) e
     inyecta cada uno con `document.head.appendChild`.
3. Las hojas de estilo "pesadas" (Tailwind vía `@styles/global.css`, `aos/dist/aos.css`,
   flag-icons) se importan con el sufijo **`?url`** (`import stylesheetHref from
   '@styles/global.css?url'`) — eso hace que Vite/Astro devuelva solo la URL del asset ya
   compilado, sin auto-inyectar ningún `<link>`/`<style>`. El único punto donde se cargan
   de verdad es el script del paso 2.
4. `src/styles/no-js.css` es la hoja ligera de fallback — se importa **normal** (sin
   `?url`), así que siempre se carga (con o sin JS), y Astro la inlinea directo como
   `<style>` en el HTML (sin request extra). **Todas** sus reglas van prefijadas con el
   ancestro `html.no-js`, así que en cuanto hay JS y esa clase desaparece, dejan de tener
   efecto — cero riesgo de interferir con el diseño completo.
5. `astro.config.mjs` tiene `tailwind({ applyBaseStyles: false })` — si esto se revierte a
   `true`, la integración vuelve a auto-inyectar su propio `<link>` con Tailwind en cada
   página, saltándose todo el mecanismo de gating (bug real que ya ocurrió; se detectó
   inspeccionando `.netlify/build/manifest_*.mjs` y viendo un chunk CSS duplicado).
6. Un `<noscript><style>` en el `<head>` fuerza `opacity:1 !important` en los elementos
   `[data-aos]` (que si no, empiezan invisibles hasta que `AOS.init()` los revela) y oculta
   el preloader — necesario porque sin JS esas librerías nunca corren.

## Reglas al agregar algo nuevo

- **Toda hoja de estilos "de diseño"** (Tailwind, librerías de animación/UI, CSS de un
  componente que solo tiene sentido si su JS corre) se importa con `?url`, se agrega al
  objeto `define:vars` del script inline en `Layout.astro`, y se añade al array que genera
  los `<link>`. Nunca la importes "normal" — Astro la auto-adjuntaría a la página estática.
- **CSS de una librería usada por una isla de React** (ej. AOS dentro de `InitAOS.jsx`):
  el import **no puede vivir dentro del componente**, ni siquiera como `import()` dinámico
  en un `useEffect` — Astro igual la detecta por análisis estático del module graph y la
  adjunta a la página. Sácala del componente por completo y cárgala solo desde
  `Layout.astro` con el mismo patrón `?url`.
- **Contenido/estructura nueva sin CSS de diseño** (formato del modo sin JS): agrega reglas
  a `src/styles/no-js.css`, siempre bajo el selector ancestro `html.no-js`. Sigue el estilo
  ya usado ahí (tipografía con jerarquía, ancho de lectura, `.wa__stt` para CTAs de
  WhatsApp, reset de listas, `img`/`svg` con tamaño contenido, separación entre
  `section`/`header`/`footer`, `details`/`summary` para acordeones). No busques replicar el
  diseño final, solo dar orden/legibilidad básica.
- **Nunca uses reglas genéricas de "ocultar" en `no-js.css`** como
  `[aria-hidden="true"] { display:none }` o `[class~="hidden"] { display:none }`. Ya se
  evaluaron y se descartaron: rompen elementos reales (iconos sociales del Footer con
  `aria-hidden`, el nav de escritorio del Header con clases `hidden lg:flex`). Si un
  componente nuevo usa utilidades responsive de Tailwind (`hidden`, `dark:hidden`,
  `dark:block`) que sin CSS no tienen efecto, es preferible aceptar el defecto cosmético
  (ej. el logo claro/oscuro duplicado, ya documentado y aceptado) que arriesgar un
  selector genérico.
- Antes de aceptar un defecto cosmético como "ya quedará así", confirma que no es en
  realidad contenido/navegación real quedando oculta — solo aplica a duplicados puramente
  visuales.

## Mobile-first (siempre, para todo diseño nuevo)

Este sitio se diseña **primero para móvil, después para escritorio** — no al revés. En
la práctica:

- Las clases Tailwind **sin prefijo** (`w-full`, `text-sm`, `flex-col`, `px-4`...) son la
  base y describen el layout en móvil. Los prefijos `sm:`/`md:`/`lg:` solo *añaden* los
  ajustes para pantallas más grandes (columnas extra, tamaños de fuente mayores, spacing
  más generoso, elementos que aparecen solo en desktop como flechas de un carrusel). Nunca
  al revés (no diseñes para desktop y luego "apagues" cosas en móvil con `md:hidden` salvo
  que sea genuinamente un elemento exclusivo de una plataforma, como un hint de swipe).
- Antes de dar por terminado un componente nuevo, revisa cómo se ve en un viewport móvil
  real (ancho ~375-428px) **antes** de revisar/pulir la versión de escritorio. Un layout
  que se ve bien en 1280px pero se rompe, se corta o se ve apretado en 390px está mal
  hecho, incluso si nadie lo pidió explícitamente — es el estándar por defecto de este
  proyecto.
- Cuidado especial con: texto que se corta o se ve amontonado, botones/áreas táctiles
  demasiado pequeñas (~44px mínimo de alto es un buen piso), imágenes/carruseles que
  generan scroll horizontal no intencional en el `<body>` (usa `overflow-x-hidden` en
  contenedores si hace falta, como ya se hizo en `Layout.astro` para las técnicas
  full-bleed), y contenido decorativo (constelaciones, blobs, glows) que en pantallas
  angostas y muy altas se estira/distorsiona — confinarlo a una caja con proporción fija
  (`aspect-square` o similar) en vez de dejar que ocupe el rectángulo completo de la
  sección suele ser la solución (ver `StarField.astro`).
- Al verificar con Playwright (ver sección siguiente), toma la captura en un viewport
  móvil primero; si algo requiere ajuste, corrígelo ahí antes de pasar a comprobar
  desktop.

## Verificación (repetir tras cualquier cambio a este mecanismo)

1. `npm run build` desde `movapp-web/`, luego inspeccionar
   `.netlify/build/manifest_*.mjs`: cada ruta debe tener su CSS pesado como entrada
   `"type":"external"` (no auto-adjuntada) y `no-js.css` como `"type":"inline"`.
2. Levantar `npm run dev` (puerto 7001) y correr un script de Playwright con
   `browser.newContext({ javaScriptEnabled: true })` y otro con `false`, comparando:
   - Con JS: cero regresión visual (recuerda hacer scroll por la página antes de la
     captura — los elementos `[data-aos]` solo se revelan al hacer scroll).
   - Sin JS: cero requests de red a `.css`/fonts/CDNs de diseño, y el texto 100% presente
     y legible.
3. `curl` al servidor de dev (sin navegador, sin JS en absoluto) para confirmar que el HTML
   crudo trae las reglas `html.no-js` inline y todo el copy real.
4. `npx astro check` no debe mostrar errores nuevos (hay ~6 preexistentes en
   `HomeHero.astro`, no relacionados a este mecanismo).

## No hacer

- No condiciones contenido real (texto, enlaces, datos) a JS — solo diseño/CSS.
- No reintroduzcas `applyBaseStyles: true` en la integración de Tailwind.
- No importes CSS "de diseño" sin `?url` en ningún componente nuevo.
