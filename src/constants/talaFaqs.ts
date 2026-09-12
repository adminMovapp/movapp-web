// src/constants/talaFaqs.ts
//
// FAQs de /aplicaciones-prestamo/tala (ver skill Importaciones). Fuente
// única para el markup (TalaFaqs.astro, vía FAQAccordion) Y el FAQPage de
// schema.js -- mismo criterio que @constants/crediseguroFaqs.ts.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface TalaFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const TALA_FAQS: TalaFaq[] = [
   {
      q: '¿Tala está registrada ante CONDUSEF?',
      a: 'Sí. Tala Mobile, S.A.P.I. de C.V., SOFOM, E.N.R. está registrada ante CONDUSEF con clave 695521 y estatus "En operación".',
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
