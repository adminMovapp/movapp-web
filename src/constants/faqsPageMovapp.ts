// src/constants/faqsPageMovapp.ts
//
// Preguntas de la sección "Movapp" en /faqs. Mismo criterio que
// @constants/faqsPageAcoso.ts.
//

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const FAQS_PAGE_MOVAPP = [
   {
      q: '¿Quién es Movapp?',
      a: 'Es una herramienta digital que bloquea el acoso de las apps de préstamo, protege tus contactos y tu galería, y te conecta con un asesor real.',
      icon: FAQ_ICONS.building,
      color: FAQ_COLORS.company,
   },
   {
      q: '¿La ayuda tiene costo?',
      a: 'Contactar a un asesor por WhatsApp es gratis. Te acompañamos sin juzgarte. El Hack tiene un costo de recuperación.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Qué no hace Movapp?',
      a: 'No es una financiera, no presta dinero, no borra tus deudas legales, no sustituye a la autoridad y no garantiza que todas las apps dejen de molestar de inmediato. Tampoco promueve evadir responsabilidades financieras legítimas.',
      icon: FAQ_ICONS.prohibit,
      color: FAQ_COLORS.limits,
   },
   {
      q: '¿Cuánto tarda El Hack?',
      a: 'El tiempo depende de tu caso y de cuántas apps estén involucradas. Hay personas que notan reducción de presión antes y otras que siguen recibiendo mensajes algunos días. Lo importante es dar seguimiento para verificar si el acoso baja, si cambia la amenaza o si aparece una app nueva.',
      icon: FAQ_ICONS.clock,
      color: FAQ_COLORS.time,
   },
   {
      q: '¿Qué pasa después de pagar El Hack?',
      a: 'Después de pagar, no quedas abandonado. Se revisa tu caso, se identifican las apps, se ejecuta El Hack y se te da seguimiento. También se revisa si te siguen llamando, si ya contactaron a tus familiares, si hay grupos, si existe riesgo emocional o si necesitas otra orientación.',
      icon: FAQ_ICONS.checklist,
      color: FAQ_COLORS.followUp,
   },
];
