// src/constants/crediseguroFaqs.ts
//
// FAQs de /aplicaciones-prestamo/crediseguro (ver skill Importaciones). Fuente
// única para el markup (CrediseguroFaqs.astro, vía FAQAccordion) Y el
// FAQPage de schema.js -- mismo criterio que @constants/elhack.ts,
// faqsPageAcoso.ts, etc.: si cambia el copy, cambia en un solo lugar.
// icon/color vienen de @constants/faqIcons.ts (mismo set compartido que
// homeFaqs.ts y demás) -- generateFAQSchema solo lee q/a, así que estos dos
// campos extra no afectan el FAQPage.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface CrediseguroFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const CREDISEGURO_FAQS: CrediseguroFaq[] = [
   {
      q: '¿CrediSeguro está registrada ante CONDUSEF?',
      a: 'Sí, localizada con folio 00234 al 04 ago 2026.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Cómo verifico las tasas antes de contratar?',
      a: 'Consulta el sitio oficial o el documento de condiciones publicado.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
];
