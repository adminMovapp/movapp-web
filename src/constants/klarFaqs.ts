// src/constants/klarFaqs.ts
//
// FAQs de /aplicaciones-prestamo/klar (ver skill Importaciones). Fuente
// única para el markup (KlarFaqs.astro, vía FAQAccordion) Y el FAQPage de
// schema.js -- mismo criterio que @constants/crediseguroFaqs.ts / talaFaqs.ts
// / kueskiFaqs.ts.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface KlarFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const KLAR_FAQS: KlarFaq[] = [
   {
      q: '¿Klar está registrada ante CONDUSEF?',
      a: 'Sí. Klar Technologies, S.A. de C.V., S.F.P. está registrada ante CONDUSEF con clave 27009 y estatus "En operación"; opera como SOFIPO autorizada por la CNBV.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Cómo verifico las tasas antes de contratar?',
      a: 'Consulta el sitio oficial o el documento de condiciones publicado antes de aceptar el producto.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
];
