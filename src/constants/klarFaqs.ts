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
      a: 'Sí. Klar Technologies, S.A. de C.V., S.F.P. aparece en el SIPRES con la clave 27009 y estatus «En operación» (consulta del 10 de noviembre de 2026). Si tienes un problema con ella, puedes presentar una queja ante la **CONDUSEF**.',
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
