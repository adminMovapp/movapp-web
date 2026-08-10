---
name: Rendimiento
description: Encapsula todo lo aprendido optimizando rendimiento (Lighthouse/PageSpeed Insights) en el sitio de Movapp - el bug de CLS por tamaño de imagen (y su fix), el evento "app:styles-ready" para saber cuándo Tailwind terminó de cargar sin sondear por rAF, el patrón de doble rAF para reprocesamiento forzado, cómo se decide qué hacer con recursos de terceros (GTM, Meta Pixel, CDNs), cómo distinguir un reporte de PSI cacheado/desactualizado o una corrida de laboratorio con ruido de infraestructura de una regresión real, y cómo verificar cualquier cambio. Úsala cuando el usuario traiga un reporte de Lighthouse/PSI, pida optimizar rendimiento, o toques imágenes/scripts/CSS de forma que pueda afectar CLS, TBT o solicitudes de bloqueo de renderizado.
---

# Rendimiento (Lighthouse / PageSpeed Insights)

## Flujo de trabajo establecido

1. El usuario pega capturas de un reporte de Lighthouse/PSI.
2. Se arma un plan por escrito (agrupado por hallazgo) y se **espera confirmación antes de
   implementar** — no implementar directo salvo que ya haya luz verde explícita para ese
   punto puntual.
3. Antes de proponer nada nuevo, comparar contra lo que ya se hizo (ver "Ya aplicado" abajo)
   — muchos reportes sucesivos muestran los mismos hallazgos porque son contra un **deploy
   anterior al fix**, no porque el fix haya fallado (ver "Cómo detectar un reporte
   desactualizado" más abajo).
4. Implementar, verificar (ver sección de verificación), reportar con números concretos
   (antes/después), no solo "ya debería estar mejor".

## Ya aplicado (no revertir por error / no proponer de nuevo)

- **`astro.config.mjs`**: `build.inlineStylesheets: 'always'` (no `'auto'`) — evita que
  Astro extraiga los `<style>` con scope de componente a archivos `_astro/*.css` externos
  (Lighthouse los marcaba como "solicitudes de bloqueo de renderización"). `global.css`
  sigue aparte porque se importa con `?url` y se enlaza a mano vía JS (mecanismo no-js/js,
  ver skill `Diseño`) — `inlineStylesheets` no lo afecta, son pipelines distintos.
- **Imágenes**: migradas de `public/img/*` a `src/assets/*` + `<Image>` de `astro:assets`,
  con `width`/`height` ajustados al tamaño real de visualización (nunca servir el archivo a
  tamaño completo para un hueco chico) y `densities={[1,2]}` (o `widths`+`sizes`) para
  variantes retina sin sobredimensionar la base.
- **`MetaPixelScript.astro`**: el `<script src="/js/metaPixel.js">` lleva `defer`.
- **Preconnect**: `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>` en
  `Layout.astro` (origen de `flag-icons.min.css`, usado por la isla de tienda).
- **Reprocesamiento forzado** (doble rAF, ver detalle abajo): `Layout.astro`
  (`repositionChatWidget`), `Preloader.astro` (`triggerPulse`), `HomeFeatured.astro` y
  `HomeTrust.astro` (flechas de los carruseles, `getActiveIndex`, **y** el posicionamiento
  inicial del carrusel — ver evento `app:styles-ready` más abajo).
- **CLS por tamaño de imagen** (ver detalle abajo, es el hallazgo más importante de esta
  skill): fix aplicado en `Header.astro` (`.site-logo`), `Footer.astro` (`.footer-logo`),
  `MobileBottomNav.astro` (`.bottomnav-logo`), `MenuMobilePanel.astro` (`.menu-logo`),
  `MenuDesktopVisual.astro` (`.shield-logo`), `HomeHero.astro`/`HomeCTA.astro`/
  `ElHackFeatures.astro` (`.store-badge`, `.cta-logo-img`).
- **Imágenes servidas más grandes de lo necesario**: `Mockup-celular-movapp-1.webp`
  (`HomeCTA.astro` y `ElHackFeatures.astro`) migrada de `public/img/*` + `<img>` crudo a
  `src/assets/` + `<Image>`, con `width` ajustado en dos pasadas (800 real → 600 → 450) hasta
  acercarse al tamaño real de visualización que el propio reporte de Lighthouse indica
  ("Este archivo es más grande de lo necesario (WxH) para sus dimensiones de visualización
  (W'xH')") — no hace falta acertar a la primera, se puede iterar contra ese mismo número.
  Como la imagen vive dentro de un contenedor con aspect-ratio fijo (`aspect-[4/3]`/
  `aspect-square`, no depende del `width`/`height` de la imagen para su tamaño en pantalla),
  esta migración no necesitó el fix de CLS de abajo (a diferencia de logos/íconos).
- **Señal de estilos listos** (`app:styles-ready`, ver detalle abajo): reemplaza el sondeo
  por rAF en el posicionamiento inicial del carrusel (`HomeFeatured.astro`,
  `HomeTrust.astro`).

## El bug de CLS por tamaño de imagen (el hallazgo más importante)

**Mecanismo:** este sitio carga el CSS de Tailwind de forma asíncrona vía JS (ver skill
`Diseño` — mientras `html` tiene la clase `no-js`, Tailwind ni siquiera se pide). El
componente `<Image>` de `astro:assets` renderiza atributos HTML `width`/`height` que
reflejan el prop `height={N}` que le pasaste (típicamente grande, pensado para servir una
imagen nítida en pantallas retina) — **no** el tamaño final que va a tener en pantalla según
la clase Tailwind (`h-7`, `h-10`, etc.). Mientras Tailwind no ha cargado, el navegador no
tiene ninguna regla de tamaño más que esos atributos, así que pinta la imagen a su tamaño
real y grande; en el instante en que Tailwind carga y aplica `h-7`/`h-10`, la imagen se
encoge de golpe. Ese salto es justo lo que Lighthouse mide como CLS ("Elemento de imagen sin
tamaño" / "Causantes del cambio de diseño") — y cuanto más grande el `height` pedido para
retina, más grande el salto.

**Fix:** agregar el tamaño real final (el que da la clase Tailwind, no el `height` prop) en
el `<style>` con scope de componente de ese archivo — **no** en una clase Tailwind. Un
`<style>` de Astro con scope de componente se inlinea siempre en el HTML (confirmado con
`inlineStylesheets: 'always'`), así que ese CSS está activo desde el primer pintado, con o
sin JS, sin depender de que Tailwind haya cargado. Patrón:

```astro
<Image src={ImgLogo} alt="Movapp" height={100} class="mi-logo h-10 w-auto" />

<style>
  /* height/width acá (no solo "h-10" de Tailwind): este <style> se aplica
     siempre, con o sin JS. Debe coincidir con la clase Tailwind si cambia. */
  .mi-logo {
    height: 2.5rem; /* = h-10 */
    width: auto;
  }
</style>
```

Si el elemento tiene un breakpoint distinto en desktop (ej. `h-9 md:h-10`), replicarlo con un
`@media (min-width: 768px)` dentro del mismo `<style>` (ver `.site-logo` en `Header.astro`
para el ejemplo con breakpoint).

**Regla para cualquier `<Image>` nuevo de un logo/ícono pequeño:** siempre que uses un
`height` prop más grande que el tamaño final en pantalla (para retina), agrega también la
regla CSS que fija ese tamaño final — nunca confíes solo en la clase Tailwind para evitar el
salto.

## Señal de estilos listos: evento `app:styles-ready`

**Problema que resuelve:** cualquier script que necesite saber "¿ya terminó de cargar/aplicar
Tailwind?" (no solo para pintar algo distinto, sino para leer una propiedad geométrica que
depende de esa carga — `getComputedStyle`, `offsetWidth`, `clientWidth`...) tenía que
sondear con `requestAnimationFrame` en cada frame hasta que la condición se cumpliera (ver el
patrón original de la sección "Que X se vea primero" más abajo). Ese sondeo, en conexiones
lentas, puede correr decenas de veces antes de que Tailwind llegue — y cada
`getComputedStyle` de esas es una lectura de layout que Lighthouse cuenta como
"reprocesamiento forzado" si compite con estilos pendientes de aplicar.

**Mecanismo:** `Layout.astro` dispara un evento nativo `app:styles-ready` en `document` desde
la misma función `flip()` que ya usa el mecanismo no-js/js (ver skill `Diseño`) — justo
cuando el `<link>` de `global.css` termina de cargar (`onload`) **o falla**
(`onerror`, para no dejar a nadie esperando un evento que nunca llega):

```js
var flip = function () {
   document.documentElement.classList.remove('no-js');
   document.documentElement.classList.add('js');
   document.dispatchEvent(new Event('app:styles-ready'));
};
```

**Patrón de uso** (ver `HomeFeatured.astro`/`HomeTrust.astro`): comprobar la condición una
vez de forma síncrona (por si el script corre después de que el evento ya se disparó — típico
con CSS cacheado/conexión rápida) y, si todavía no se cumple, suscribirse **una sola vez**
(`{ once: true }`) en vez de reintentar por rAF:

```js
function checkAndPosition() {
   var display = getComputedStyle(track).display;
   if (display === 'flex') {
      /* leer/escribir geometría acá */
      return;
   }
   document.addEventListener('app:styles-ready', checkAndPosition, { once: true });
}
checkAndPosition();
```

**Ojo con el reprocesamiento forzado del propio callback:** el evento se dispara de forma
**síncrona** dentro de `flip()`, en el mismo tick en que el navegador acaba de invalidar el
estilo de casi toda la página (la hoja de Tailwind recién se aplicó). Si el listener lee
`getComputedStyle`/`offsetWidth` inmediatamente, sigue siendo un reprocesamiento forzado —
solo que ahora ocurre una vez en vez de en cada frame. Hace falta además el patrón de doble
rAF (ver sección de abajo) alrededor de la lectura real:

```js
document.addEventListener(
   'app:styles-ready',
   function () {
      requestAnimationFrame(function () {
         requestAnimationFrame(checkAndPosition);
      });
   },
   { once: true },
);
```

Este evento es un mecanismo genérico del layout — cualquier script nuevo que necesite
enterarse de cuándo Tailwind terminó de cargar (o falló) puede escucharlo, en vez de inventar
su propio sondeo por rAF.

## Reprocesamiento forzado — patrón de doble `requestAnimationFrame`

Cuando JS necesita leer una propiedad geométrica (`offsetLeft`, `offsetWidth`,
`clientWidth`...) justo después de un cambio de estilo/clase, hacerlo en el mismo tick obliga
al navegador a recalcular layout de forma síncrona (lo que Lighthouse marca como
"reprocesamiento forzado"). El patrón usado en este proyecto: envolver la lectura en un
doble `requestAnimationFrame` para diferirla dos frames, dejando que cualquier cambio de
estilo pendiente se pinte antes de leer:

```js
requestAnimationFrame(() => {
   requestAnimationFrame(() => {
      // leer offsetLeft/offsetWidth/clientWidth acá, no antes
   });
});
```

**Excepción documentada — no aplicar el patrón mecánicamente sin evaluar el timing:** en
`HomeTrust.astro`, el `void slotsContainer.offsetHeight` del crossfade de escritorio se dejó
**sin** este patrón a propósito. Es un reflow de una sola vez disparado por click de usuario
(no un loop/resize), y diferirlo desincronizaría el `setTimeout(FADE_MS)` que le sigue, que
asume que la transición de opacidad arranca en el mismo tick — el costo de mover ese cambio
sería un fade ligeramente desincronizado (~32ms de un fade de 400ms) por una ganancia de
rendimiento nula. Antes de aplicar el patrón a un reflow nuevo, confirmar que no hay un
`setTimeout`/temporizador aledaño que dependa de que el cambio de estilo ocurra en el mismo
tick.

## Recursos de terceros (GTM, Meta Pixel, CDNs)

- **JS sin usar** de terceros (GTM, Meta Pixel — decenas de KiB marcados como "sin usar" en
  el reporte): no se puede recortar su código interno. La única palanca real es retrasar su
  carga hasta la primera interacción del usuario (scroll/click) en vez de al cargar la
  página — a cambio de **perder eventos de quien se va sin interactuar**. Es un cambio de
  comportamiento de tracking, no solo de rendimiento — **siempre pedir confirmación
  explícita antes de aplicarlo**, nunca asumirlo solo porque mejora el puntaje. A la fecha de
  esta skill, sigue sin aplicarse (pendiente de decisión del usuario).
- **TTL de caché corto de terceros** (ej. `fbevents.js` de Facebook, 20min): no accionable
  directamente — es la política de caché del propio tercero.
- **Preconnect**: agregar `<link rel="preconnect">` en `Layout.astro` para orígenes de
  terceros que participan en la carga temprana es de bajo riesgo y **no** requiere
  aprobación previa (a diferencia del punto de retrasar carga). Antes de agregar uno,
  revisar en el propio reporte de Lighthouse la sección "Candidatos para la conexión
  previa" — si dice que ningún origen adicional es buen candidato, no agregar más (máximo
  recomendado por Lighthouse: 4 preconnects en total).
- **Self-hosting un recurso de terceros** (ej. `flag-icons.min.css` vía jsDelivr) fue
  **considerado y descartado**: requiere agregar una dependencia npm nueva + copiar todo el
  set de assets (banderas SVG) con riesgo real de romper la funcionalidad que depende de
  ellos, para un ahorro marginal si el TTL ya es razonable (7 días en este caso). Preferir
  preconnect en estos casos — evaluar costo/beneficio real, no aplicar la sugerencia de
  Lighthouse al pie de la letra.

## "Que X se vea primero" en un carrusel móvil (patrón de posicionamiento inicial)

Cuando el negocio pide que un elemento quede en medio del orden visual (izquierda-centro-
derecha) pero sea **lo primero que se ve** al cargar la página (ej. la tarjeta de "El Hack"
en `HomeFeatured.astro`, el testimonio de "Diego" en `HomeTrust.astro`):

1. El array de datos define directamente el **orden visual real** (izquierda a derecha) —
   no uses `order` de CSS si el mismo orden ya sirve para todos los breakpoints (un primer
   intento en `HomeFeatured.astro` usó `md:order-*` para mantener el DOM "mobile-first" con
   El Hack primero mientras escritorio lo mostraba en medio; se simplificó reordenando
   directamente el array una vez que el pedido pasó a ser el mismo orden en ambos
   breakpoints).
2. Marcá el elemento a centrar con un atributo `data-initial-card="true"`.
3. Un `<script is:inline>` (no un `<script>` normal de Astro — Astro empaqueta esos como
   módulo diferido, que corre después de parsear todo el documento, ya tarde para evitar el
   salto visual) colocado justo después del contenedor del carrusel hace:
   ```js
   track.scrollLeft = initial.offsetLeft - (track.clientWidth - initial.offsetWidth) / 2;
   ```
4. **Crítico:** ese cálculo depende de que el CSS de Tailwind que da el layout del carrusel
   (`flex`, `w-[78vw]`, etc.) ya haya cargado — carga de forma asíncrona (mecanismo no-js/js)
   y si el script corre antes, `offsetLeft`/`clientWidth` devuelven valores sin sentido
   (confirmado con Playwright: sin esperar, el scroll terminaba centrado en la tarjeta
   equivocada). La primera versión de este fix reintentaba por `requestAnimationFrame` en
   cada frame hasta que `getComputedStyle(track).display === 'flex'` — funcionaba, pero
   Lighthouse marcaba ese sondeo como reprocesamiento forzado (podía correr decenas de veces
   en conexiones lentas). Reemplazado por el evento `app:styles-ready` (ver sección propia
   más arriba): se comprueba una vez, y si no está listo, se suscribe una sola vez al evento
   en vez de sondear — con el patrón de doble rAF alrededor de la lectura real para evitar el
   reprocesamiento forzado del propio callback del evento. Bail-out para desktop si el track
   cambia a `grid` en ese breakpoint (ver `HomeFeatured.astro`); si el track de desktop vive
   en un contenedor `hidden`/`md:hidden` distinto (ver `HomeTrust.astro`), no hace falta
   bail-out explícito — el cálculo sobre un elemento no renderizado da `scrollLeft = 0`,
   inofensivo.

Implementado en: `HomeFeatured.astro` (`EL_HACK_INDEX`), `HomeTrust.astro` (`DIEGO_INDEX`).

## Verificación (repetir tras cualquier cambio de rendimiento)

1. `npx astro check` desde `movapp-web/` — no debe haber errores nuevos (hay 1 preexistente
   sin relación, en `Preloader.astro`: `navEntry.type` sobre `PerformanceEntry`).
2. `npm run build` — revisar `dist/_astro/*.css`: no deberían aparecer chunks nuevos por
   página (deberían estar inlineados en el HTML salvo `global.css`, que es el único que se
   mantiene externo a propósito).
3. Levantar `npm run dev` (puerto 7001) y usar Playwright para **medir, no asumir** — scripts
   `.mjs` temporales en la raíz de `movapp-web/` (mismo patrón que
   `__aurora_shot3.mjs`/`__zoom_check2.mjs` mencionados en el CLAUDE.md de la raíz), **borrarlos
   al terminar**. Lo que conviene medir según el caso: `getBoundingClientRect()` (tamaños,
   posiciones, distancias a un borde), `getComputedStyle()` (colores, `display`,
   `transitionDuration`), `scrollLeft`/`offsetLeft` (posición inicial de un carrusel).
4. En Windows, para matar el servidor de dev usar PowerShell, no el `kill`/`pkill` del propio
   Bash tool:
   ```powershell
   Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'npm-cli\.js|astro\.js' } | Stop-Process -Force
   ```
   El `kill`/`pkill` de Git Bash en este entorno actúa sobre PIDs emulados que **no**
   corresponden a los procesos reales de Windows para `node.exe` — parece funcionar (no da
   error) pero no mata nada, y los procesos de dev server se acumulan silenciosamente.

## Cómo detectar un reporte de Lighthouse desactualizado

Si un reporte nuevo muestra un hallazgo que ya se arregló, antes de investigar de más:
compará el hash `data-astro-cid-*` del elemento en el HTML/markup que trae el reporte contra
el que genera tu build local actual para ese mismo componente (Astro genera un hash
determinado por el contenido del componente — cualquier edición, incluso un comentario,
cambia el hash). Si los hashes no coinciden, el reporte es contra un deploy anterior al fix,
no un fix que falló — no hay nada que arreglar, solo falta que el reporte se vuelva a correr
contra el deploy correcto.

**Ojo:** un hash que SÍ coincide con el deploy actual no prueba que el reporte sea fresco —
PageSpeed Insights cachea resultados por URL exacta, y puede devolver un reporte viejo cuyo
HTML (y por lo tanto sus hashes) resulta que no cambió desde entonces. Señal más fuerte de
reporte cacheado: un número (CLS, TBT, lo que sea) que coincide **exacto, hasta el mismo
decimal**, con un reporte anterior de otra corrida — confirmado un caso real esta sesión
(0.568 de CLS, mismo desglose 0.473+0.094 y mismo elemento, repetido dos veces con deploys
distintos en el medio). Es prácticamente imposible que una corrida real y nueva reproduzca el
mismo float exacto.

**Cómo forzar una corrida fresca:** agregar un parámetro de query distinto en cada prueba
(`https://movapp-stage-jr.netlify.app/?v=2`, `?v=3`, ...) — PSI trata cada URL exacta como un
recurso distinto para cachear, así que un query string nuevo evita el caché sin cambiar el
contenido real de la página (confirmado: el HTML de `?v=2` es idéntico al de la URL sin query,
salvo las posiciones aleatorias de las estrellas decorativas del menú, que se generan del lado
del servidor en cada request).

## Los números de laboratorio de Lighthouse varían entre corridas — no perseguir un outlier

Métricas ligadas a CPU (trabajo del hilo principal / TBT, reprocesamiento forzado) pueden
variar varias veces entre corridas de PSI **contra el mismo HTML exacto**, porque Lighthouse
corre en infraestructura compartida cuya carga varía — es una limitación documentada del
propio Lighthouse, no un problema del sitio. Confirmado esta sesión: dos corridas con `?v=2`
del mismo deploy (HTML verificado idéntico byte a byte salvo las estrellas aleatorias)
dieron 2.4s y 14.7s de trabajo de hilo principal, y 72ms vs. un solo reprocesamiento forzado
de 313ms en la misma línea de código ya cubierta por el patrón de doble rAF.

**Cómo no perseguir fantasmas:** antes de investigar un número que se disparó de golpe sin
que haya cambiado código, contrastarlo contra una medición propia y controlada con Playwright
(mismo throttling: CPU 4x, red "4G lenta" — ver sección de Verificación abajo) corrida 2 veces.
Si la medición propia es estable y muy por debajo del número alarmante del reporte, y no hay
ningún código nuevo que lo explique, es ruido de infraestructura — pedir al usuario correr
PSI un par de veces más (idealmente con el truco del `?v=N` de arriba) y comparar la mediana,
en vez de rediseñar código a partir de una sola corrida atípica.

## No hacer

- No aplicar el patrón de doble rAF a un reflow nuevo sin evaluar si hay un temporizador
  (`setTimeout`) aledaño que dependa de que el cambio ocurra en el mismo tick.
- No retrasar la carga de GTM/Meta Pixel (ni ningún tracking) sin aprobación explícita del
  usuario, aunque mejore el puntaje de Lighthouse.
- No self-hostear un recurso de terceros solo porque Lighthouse lo sugiere — evaluar
  costo/beneficio real primero (TTL actual, tamaño del recurso, riesgo de romper lo que
  depende de él).
- No asumir que un reporte de Lighthouse nuevo refleja el código actual — puede ser contra un
  deploy anterior (ver sección de arriba).
- No agregar un `height`/`width` grande a un `<Image>` de logo/ícono sin también fijar su
  tamaño real en el `<style>` con scope de componente (ver el bug de CLS arriba).
- No dar por "fresco" un reporte solo porque el hash `data-astro-cid-*` coincide con el
  deploy actual — un HTML sin cambios entre corridas puede tener el mismo hash y aun así ser
  un resultado cacheado de PSI. Un número idéntico al decimal contra un reporte anterior es
  la señal más confiable de caché (ver sección de arriba).
- No rediseñar código a partir de una sola corrida de Lighthouse con un número de CPU (TBT,
  reprocesamiento forzado) muy por encima de lo esperado, sin antes contrastarlo con una
  medición propia y controlada (Playwright) — puede ser ruido de la infraestructura
  compartida de PSI, no una regresión real (ver sección de arriba).
- No inventar un sondeo por `requestAnimationFrame` nuevo para esperar a que Tailwind cargue
  — usar el evento `app:styles-ready` que ya expone `Layout.astro` (ver sección propia).
