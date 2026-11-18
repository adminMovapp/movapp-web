// src/constants/cardStyles.ts
//
// Card estándar del sitio (2026-11-16, a pedido): el mismo tratamiento que
// ya usaban las cards del Home (Asesoría gratuita, síntomas, "Da el primer
// paso hoy"...): borde morado tenue, degradado morado de arriba hacia abajo y
// shadow-card. Reemplaza a la antigua clase ".glass-card" de global.css
// (fondo casi opaco), que ya no se usa -- toda card nueva debe usar estas
// constantes en vez de reescribir la lista de clases o inventar otro fondo.
//
// Solo color/borde/sombra: el radio (rounded-2xl / rounded-3xl), el padding y
// la animación "float-anim" los decide cada componente según su tamaño.
//
// Tailwind escanea src/**/*.ts (tailwind.config "content"), así que las
// clases de este archivo se generan aunque solo aparezcan aquí.

/** Fondo, borde y sombra de la card estándar. */
export const CARD_STYLE =
   'border border-purple_mv/25 bg-gradient-to-b from-purple_mv/[0.06] to-transparent shadow-card dark:border-white/10 dark:from-purple_mv/[0.1] dark:to-black/30';

/** Hover estándar para cards clicables (enlaces, tarjetas interactivas). */
export const CARD_HOVER = 'transition-colors duration-300 hover:border-purple_mv/50 hover:shadow-card-hover';
