// src/constants/kueskiFaqs.ts
//
// FAQs de /aplicaciones-prestamo/kueski (ver skill Importaciones). Fuente
// única para el markup (KueskiFaqs.astro, vía FAQAccordion) Y el FAQPage de
// schema.js -- mismo criterio que @constants/crediseguroFaqs.ts /
// talaFaqs.ts.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface KueskiFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const KUESKI_FAQS: KueskiFaq[] = [
   {
      q: '¿Kueski está registrada ante CONDUSEF?',
      a: 'Sí. Kueski, S.A.P.I. de C.V., SOFOM, E.N.R. está registrada ante CONDUSEF con clave 694080 y estatus "En operación".',
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
