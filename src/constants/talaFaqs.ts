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
      q: '¿Tala está registrada ante la CONDUSEF?',
      a: 'Sí. Tala Mobile, S.A.P.I. de C.V., SOFOM, E.N.R. aparece en el SIPRES con la clave 695521 y estatus «En operación» (consulta del 10 de noviembre de 2026). Si tienes un problema con ella, puedes presentar una queja ante la CONDUSEF.',
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
