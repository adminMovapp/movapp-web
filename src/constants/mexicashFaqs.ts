// src/constants/mexicashFaqs.ts
//
// FAQs de /aplicaciones-prestamo/mexicash (ver skill Importaciones). Tercera
// página del lado "app reportada/ilegal" de la serie -- 4 preguntas, fuente
// única para el markup (MexicashFaqs.astro, vía FAQAccordion) Y el FAQPage
// de schema.js.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface MexicashFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const MEXICASH_FAQS: MexicashFaq[] = [
   {
      q: 'Me depositaron sin pedirlo, ¿tengo que pagar?',
      a: 'No aceptes nada por teléfono ni hagas pagos parciales bajo presión. Un depósito no solicitado no equivale a un contrato. Documenta cómo llegó ese dinero y busca orientación antes de mover un peso.',
      icon: FAQ_ICONS.prohibit,
      color: FAQ_COLORS.limits,
   },
   {
      q: '¿Mexicash está regulada?',
      a: 'No la encontramos regulada por CONDUSEF ni por la CNBV. Estar registrada como despacho de cobranza ante PROFECO no la convierte en una financiera supervisada, y tampoco la autoriza a acosarte.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Por qué me cobran mucho más de lo que recibí?',
      a: 'Porque la tasa anunciada no incluye las comisiones ni los cargos por atraso, y porque el plazo real suele ser más corto que el publicitado. La cuenta se dispara en semanas.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Pueden llamarme a mi jefe o a mi familia?',
      a: 'Lo hacen, pero no pueden. Exponer tus datos, difamarte y contactar a terceros para presionarte está prohibido, aunque tú debas dinero. Eso es denunciable.',
      icon: FAQ_ICONS.users,
      color: FAQ_COLORS.family,
   },
];
