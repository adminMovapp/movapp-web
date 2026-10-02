// Contenido de /prensa (Sala de Prensa). Sin brief maestro de SEO para esta
// página (no está en el documento de 42 páginas) y sin datos reales de
// apariciones en medios/press kit todavía -- a diferencia del resto del
// sitio, este archivo es ESTRUCTURA + copy propio, marcado como placeholder
// donde corresponde, para que el equipo de contenido/comunicación reemplace
// con datos reales sin tener que tocar los componentes.

export const PRESS_FILTERS = ['Todos', 'Televisión', 'Prensa escrita', 'Radio', 'Medios digitales'] as const;

export type PressFilter = (typeof PRESS_FILTERS)[number];

export interface PressMentionPlaceholder {
   id: string;
   category: Exclude<PressFilter, 'Todos'>;
   // Placeholder deliberado: sin nombre de medio real ni enlace externo hasta
   // que el equipo de prensa confirme una aparición real (ver AskUserQuestion
   // de la conversación que originó esta página -- se decidió NO inventar
   // logos/nombres de medios reales).
   placeholderLabel: string;
}

export const PRESS_MENTIONS_PLACEHOLDER: PressMentionPlaceholder[] = [
   { id: 'mention-tv', category: 'Televisión', placeholderLabel: 'Espacio reservado para televisión' },
   { id: 'mention-prensa-1', category: 'Prensa escrita', placeholderLabel: 'Espacio reservado para prensa escrita' },
   { id: 'mention-radio', category: 'Radio', placeholderLabel: 'Espacio reservado para radio' },
   { id: 'mention-digital-1', category: 'Medios digitales', placeholderLabel: 'Espacio reservado para medio digital' },
   { id: 'mention-prensa-2', category: 'Prensa escrita', placeholderLabel: 'Espacio reservado para prensa escrita' },
   { id: 'mention-digital-2', category: 'Medios digitales', placeholderLabel: 'Espacio reservado para medio digital' },
];

export interface PressKitItem {
   id: string;
   title: string;
   detail: string;
   // Sin `href` todavía: los archivos reales (logos vectoriales, fotos de
   // portavoces, dossier en PDF) no existen en /public -- un href apuntando
   // a un archivo inexistente sería un enlace roto en producción. El botón
   // queda en estado "Próximamente" (ver PrensaPressKit.astro) hasta que se
   // suban los archivos reales.
}

export const PRESS_KIT_ITEMS: PressKitItem[] = [
   {
      id: 'kit-identidad',
      title: 'Identidad y logotipos',
      detail: 'Logotipos vectoriales de Movapp (SVG / PNG en alta resolución).',
   },
   {
      id: 'kit-fotografia',
      title: 'Fotografías de portavoces',
      detail: 'Fotografías oficiales del liderazgo de Movapp para publicación en medios.',
   },
   {
      id: 'kit-dossier',
      title: 'Dossier de prensa',
      detail: 'Resumen ejecutivo de Movapp y El Hack: misión, cifras y contacto, en PDF.',
   },
];

// TODO: confirmar con el equipo de comunicación si esta dirección de correo
// de prensa ya existe/está monitoreada antes de publicar la página -- se usa
// el mismo dominio del sitio como placeholder razonable, no un dato
// verificado.
export const PRESS_CONTACT_EMAIL = 'prensa@movapp.org';
