// src/constants/faqsPageAcoso.ts
//
// Preguntas de la sección "Acoso" en /faqs. Igual que @constants/elhack.ts,
// este copy se usa en DOS lugares: el acordeón que renderiza la sección
// (@components/ui/FAQAccordion.astro, vía FaqsAcoso.astro) y el FAQPage del
// JSON-LD (src/utils/schema.js) -- vive acá para que no puedan divergir.
//
// La pregunta "¿Pueden contactar a tus familiares, amigos o contactos?" que
// traía el mockup original se quitó a pedido (duplicaba "¿Pueden contactar a
// mi familia o amigos?" más abajo).

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const FAQS_PAGE_ACOSO = [
   {
      q: '¿Es legal que me acosen por una deuda?',
      a: 'Deber dinero no te quita tus derechos. Prácticas como amenazar, insultar o contactar a tus familiares y amigos para presionarte suelen estar prohibidas.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Pueden contactar a mi familia o amigos?',
      a: 'Usar tu lista de contactos para avergonzarte o presionarte es una práctica de acoso. El Hack ayuda a bloquear esos intentos y a proteger a tus contactos.',
      icon: FAQ_ICONS.users,
      color: FAQ_COLORS.family,
   },
   {
      q: '¿Qué hago si me amenazan?',
      a: 'Guarda evidencia (capturas de llamadas y mensajes), no cedas al miedo y busca orientación. Puedes escribirnos por WhatsApp y te guiamos según tu caso.',
      icon: FAQ_ICONS.alertTriangle,
      color: FAQ_COLORS.threat,
   },
   {
      q: '¿Las apps pueden ir a mi domicilio?',
      a: 'No todas las apps irán a tu casa para asustarte y obligarte a pagar. En todos los casos, esa amenaza forma parte de su presión psicológica. Aún así, no hay que confiarse ni actuar impulsivamente. Lo correcto es revisar qué app es, qué datos tiene, si existe contrato real y qué tipo de amenaza está recibiendo.',
      icon: FAQ_ICONS.home,
      color: FAQ_COLORS.homeVisit,
   },
];
