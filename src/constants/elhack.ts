// src/constants/elhack.ts
//
// Contenido de /el-hack que se usa en DOS lugares a la vez: el markup de las
// secciones y el JSON-LD de la página (FAQPage y HowTo). Vive aquí, y no en
// el frontmatter de cada sección, justamente para que no puedan divergir:
// la guía de schema exige que el texto declarado sea exactamente el que el
// usuario lee en pantalla, y que los pasos del HowTo coincidan uno a uno con
// los visibles. Si cambia el copy, cambia el schema solo.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const EL_HACK_FAQS = [
   {
      q: '¿El Hack elimina mi deuda?',
      a: 'No. Movapp no elimina deudas ni modifica tu historial crediticio. El Hack frena el acoso y protege tu información; qué hacer con la deuda lo decides tú.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
   {
      q: '¿Cuánto cuesta El Hack?',
      a: 'Revisar tu caso es gratis. El Hack cuesta desde $500 MXN según cuántas apps haya; tu asesor confirma el total antes de pagar.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Qué pasa después de escribirles por WhatsApp?',
      a: 'Un asesor revisa gratis tu caso y las apps, te dice si El Hack aplica y te explica su alcance y precio antes de pagar.',
      icon: FAQ_ICONS.chat,
      color: FAQ_COLORS.contact,
   },
   {
      q: '¿Cuánto tarda El Hack?',
      a: 'Varía según la app y cuántas apps haya. Las víctimas atendidas reportan que el acoso suele disminuir entre 7 y 14 días después de aplicar El Hack; en las primeras 48 horas aún pueden llegar llamadas. Tu asesor te da un estimado.',
      icon: FAQ_ICONS.clock,
      color: FAQ_COLORS.time,
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
