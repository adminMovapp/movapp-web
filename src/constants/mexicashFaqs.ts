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
      q: 'Mexicash me depositó sin pedirlo, ¿tengo que pagar?',
      a: 'No aceptes nada por teléfono ni hagas pagos bajo presión. Documenta cómo llegó ese dinero (fecha, monto y cuenta) y pide orientación antes de decidir qué hacer con él: la decisión es tuya.',
      icon: FAQ_ICONS.prohibit,
      color: FAQ_COLORS.limits,
   },
   {
      q: '¿Mexicash está registrada en la CONDUSEF?',
      a: 'No la encontramos. En el SIPRES (consulta del 10 de noviembre de 2026) no aparece Mexicash ni Iinchoi, S.A.P.I. de C.V., la empresa de su ficha en Google Play. Aunque estuviera registrada, eso no la autorizaría a acosarte.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Por qué me cobran mucho más de lo que recibí?',
      a: 'Las víctimas reportan que a la tasa anunciada se suman comisiones y cargos por atraso, y que el plazo real es más corto. Revisa el monto total en tu contrato.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Pueden llamarme a mi jefe o a mi familia?',
      a: 'Lo hacen, pero no deberían. Exponer tus datos, difamarte o contactar a terceros para presionarte se puede denunciar, aunque debas dinero.',
      icon: FAQ_ICONS.users,
      color: FAQ_COLORS.family,
   },
];
