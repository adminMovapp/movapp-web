// src/constants/elhack.ts
//
// Contenido de /el-hack que se usa en DOS lugares a la vez: el markup de las
// secciones y el JSON-LD de la página (FAQPage y HowTo). Vive aquí, y no en
// el frontmatter de cada sección, justamente para que no puedan divergir:
// la guía de schema exige que el texto declarado sea exactamente el que el
// usuario lee en pantalla, y que los pasos del HowTo coincidan uno a uno con
// los visibles. Si cambia el copy, cambia el schema solo.

export const EL_HACK_FAQS = [
   {
      q: '¿El Hack elimina mi deuda?',
      a: 'El Hack detiene el acoso y protege tu información, pero no borra por sí sola una deuda. Un asesor te ayuda a entender tu situación y tus opciones. Desconfía de quien prometa "borrar" deudas de forma automática.',
   },
   {
      q: '¿Cuánto cuesta?',
      a: 'La asesoría es 100% gratuita, el costo del hack va desde los $500 MXN, aunque dependerá de la cantidad de préstamos que tengas activos.',
   },
   {
      q: '¿Qué pasa después de escribirles por WhatsApp?',
      a: 'Un asesor real te responde, escucha tu caso y te guía paso a paso para activar El Hack y frenar el acoso.',
   },
   {
      q: '¿Cuánto tarda El Hack?',
      a: 'El tiempo depende del caso y de cuántas apps están involucradas. Hay personas que notan reducción de presión antes y otras que siguen recibiendo mensajes algunos días. Lo importante es dar seguimiento para verificar si el acoso baja, si cambia la amenaza o si aparece una app nueva.',
   },
];

// Título visible de la sección de pasos — es también el `name` del HowTo.
export const EL_HACK_HOW_IT_WORKS_TITLE = '¿Cómo funciona El Hack?';

export const EL_HACK_STEPS = [
   {
      title: 'Habla con un asesor real',
      text: 'Nos escribes por WhatsApp y te escuchamos. Te explicamos, paso a paso, cómo usar El Hack en tu caso.',
   },
   {
      title: 'Instala y activa El Hack',
      text: 'Al activarlo, bloqueamos de inmediato las llamadas y los mensajes de acoso, y proteges tus contactos y tu galería.',
   },
   {
      title: 'Recupera tu tranquilidad',
      text: 'Vuelves a tener paz. Y si lo necesitas, cuentas con apoyo emocional durante el proceso.',
   },
];
