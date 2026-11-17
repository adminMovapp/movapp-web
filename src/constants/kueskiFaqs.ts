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
      a: 'Sí. Kueski, S.A.P.I. de C.V., SOFOM, E.N.R. aparece en el SIPRES con la clave 694080 y estatus «En operación» (consulta del 10 de noviembre de 2026). Si tienes un problema con ella, puedes presentar una queja ante la **CONDUSEF**.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Cómo verifico las tasas antes de contratar?',
      a: 'Revisa el CAT y el monto total a pagar en su sitio oficial o en el contrato antes de aceptar. Estar registrada no evita que un crédito sea caro.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
];
