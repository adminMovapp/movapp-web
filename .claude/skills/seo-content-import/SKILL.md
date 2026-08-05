---
name: seo-content-import
description: Implementa en el sitio Astro el copy de una sección o rango de páginas del documento maestro de SEO/contenido de Movapp (el PDF de ~54 páginas del rediseño), priorizando fidelidad de SEO (H1, meta title/description, keywords, jerarquía de encabezados). Úsala cuando el usuario diga cosas como "de la página X a la Y está el contenido de [sección]" o "implementa el copy de [sección] del documento".
---

# Importar copy del documento maestro de SEO a la web

Esta skill reproduce el proceso ya usado para implementar el Home (páginas 25-32 del
documento) en cualquier otra sección o rango de páginas que el usuario indique.

## Contexto que debes tener siempre presente

El documento es un master de SEO/contenido para el rediseño de la web de Movapp. **El
SEO es la prioridad número uno de todo el proyecto**: H1, keywords, meta title/description
y la jerarquía de encabezados no son detalles de estilo, son el propósito del documento.
Esto tiene prioridad sobre cualquier tentación de "mejorar" o parafrasear el copy.

El documento **no está guardado en el repo** — vive únicamente en el contexto de la
conversación (el usuario lo adjunta como PDF). Si no ha sido adjuntado en esta
conversación, o no tienes claro qué rango de páginas/sección corresponde, pregunta antes
de inventar contenido.

La misma fuente de verdad puede venir como **wireframes/mockups (capturas de pantalla)**
en vez de PDF — por ejemplo, screenshots de un mockup móvil con anotaciones de nivel de
encabezado (H1/H2/H3/P) junto a cada bloque de texto. Tratarlos exactamente igual que el
documento maestro: mismo nivel de fidelidad, mismas reglas de extracción de abajo. La
única diferencia es que las etiquetas "-H1"/"-H2"/"-P" que acompañan el texto en el
mockup son **anotaciones de estructura, no contenido** — indican qué etiqueta HTML usar,
pero no se incluyen en el texto final.

### Fidelidad de texto verbatim (regla explícita del usuario)

Cuando el usuario entrega el copy exacto a implementar (documento o mockup), el texto que
termina en la web debe ser **una copia exacta**, sin excepciones:

- **Respeta el case exacto del texto fuente.** Si el original está en mayúsculas, así
  queda; si mezcla mayúsculas/minúsculas, así queda. No normalices el case de la fuente —
  pero si el sitio ya logra ese mismo resultado visual vía CSS (p. ej. una clase
  `uppercase` de Tailwind que transforma cualquier texto a mayúsculas al renderizar), está
  bien escribir el texto fuente en el `.astro` en el case que ya usa el resto del código
  (normalmente sentence case) y dejar que esa clase existente produzca el mayúsculas
  visual — lo que importa es el resultado final en pantalla, no forzar mayúsculas literales
  en el código si ya se logran por CSS.
- **No agregues texto que no esté en la fuente** — sin frases de relleno, sin "mejorar" o
  parafrasear una oración aunque suene más natural. Si el bloque fuente no trae un eyebrow/
  kicker o un párrafo introductorio que sí existe hoy en el código, ese texto sobrante se
  retira (ver regla de abajo sobre no dejar contenido no solicitado).
- **No quites texto que sí esté en la fuente** — todo el copy que el usuario entregó debe
  terminar visible en la web, completo.
- Si al aplicar esta regla vas a **remover contenido existente en el sitio que no aparece
  en la fuente nueva** (un eyebrow, un párrafo, un testimonio, un logo), o vas a **resolver
  una inconsistencia real de la fuente** (un nombre de testimonio que no corresponde a la
  cita, un título de paso duplicado que parece error de mockup), decláralo explícitamente
  al usuario en el reporte final — no lo dejes como un cambio silencioso, aunque sigas
  adelante con él bajo esta regla de fidelidad.

## Procedimiento

1. **Identifica el alcance.** Si el usuario da un rango de páginas ("de la 33 a la 40") o
   un nombre de sección ("la sección de Nosotros" / "El Hack"), usa ese rango exacto. Si
   no lo especifica, pregunta.

2. **Lee el rango completo antes de escribir nada.** No implementes por partes sin haber
   leído toda la sección — el documento suele definir para cada página: H1, eyebrow/kicker,
   copy de cuerpo, CTAs, FAQs, testimonios, stats, y el meta title/description/keywords
   objetivo. Extrae todo eso primero.

3. **Extrae, por cada página/sección del rango:**
   - El **H1** exacto (debe ser único por página — nunca duplicarlo ni repetirlo en un H2).
   - Jerarquía de encabezados en orden (H1 → H2 → H3, sin saltos).
   - Copy de cuerpo **verbatim** — este texto fue redactado para SEO, no lo parafrasees ni
     lo "mejores" a menos que el propio documento lo marque como placeholder/ejemplo.
   - CTAs (texto exacto del botón, ej. "Hablar con un asesor gratis por WhatsApp").
   - Meta title, meta description y keywords si el documento los define para esa página.
   - Enlaces internos mencionados, aunque la ruta destino todavía no exista en el sitio
     (crear el enlace de todos modos — decisión ya tomada anteriormente con el usuario:
     "Incluir todo el copy, enlazando a rutas nuevas aunque no existan aún").

4. **Mapea al código siguiendo la arquitectura existente** (ver `CLAUDE.md`):
   - `src/pages/<slug>.astro` es el punto de entrada de la ruta; usa el prop `title`,
     `description`, `type` y `schema` del `Layout` (ver `generateSEOTags` /
     `generateOrganizationSchema`/`generateServiceSchema` en `src/utils/config.jsx`).
   - El cuerpo de la página delega en componentes bajo `src/sections/<page-name>/*.astro`
     (un archivo por bloque/sección visual), igual que `src/sections/home/`.
   - Reutiliza componentes ya existentes cuando el patrón visual/funcional coincide (ej.
     `ButtonContact.astro` para CTAs de WhatsApp) en vez de crear uno nuevo.

5. **Verifica las reglas de SEO antes de dar por terminado:**
   - Exactamente un `<h1>` por página (grep en el HTML renderizado si hay dudas).
   - No se salta ningún nivel de encabezado.
   - `title`/`description`/`keywords` están seteados vía props del `Layout`, no hardcodeados
     en el `<head>`.
   - El copy coincide con el documento, no es una paráfrasis.

6. **Construye y valida:** `npm run build` y `npm run check` (o `astro check`) desde
   `movapp-web/` — no deben aparecer errores nuevos (hay ~6 errores de TS preexistentes en
   `HomeHero.astro` sobre `window.heroOrbitFrame`, no relacionados, ignóralos). Si es
   posible, levanta `npm run dev` y toma una screenshot con Playwright para revisar
   visualmente la sección nueva.

7. **Reporta al usuario, explícitamente:**
   - Qué archivos se crearon/modificaron.
   - Qué quedó como placeholder o pendiente de contenido real (ej. títulos de artículos
     entre corchetes, cifras/estadísticas que necesiten verificación de Marketing).
   - Qué rutas enlazadas todavía no existen como página real (van a dar 404 hasta que se
     construyan).

## No hacer

- No inventes copy que no esté en el documento para "rellenar" una sección — si falta
  contenido para un bloque, dilo y pregunta o deja un placeholder explícito entre corchetes.
- No cambies el copy ya validado de otras secciones sin que el usuario lo pida.
- No toques la mecánica de carga condicional de CSS (ver la skill
  `Diseño`) al añadir contenido nuevo — son dos preocupaciones
  independientes.
