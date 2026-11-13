// src/constants/starprestaFaqs.ts
//
// FAQs de /aplicaciones-prestamo/starpresta (ver skill Importaciones). Cuarta
// y última página del lado "app reportada/ilegal" de la serie -- 5
// preguntas, fuente única para el markup (StarprestaFaqs.astro, vía
// FAQAccordion) Y el FAQPage de schema.js.
//
// CORREGIDO (2026-08-28): el wireframe original traía las respuestas 2 y 3
// cruzadas -- "Ya me metieron a mi familia en un grupo de WhatsApp, ¿qué
// hago?" tenía la respuesta sobre regulación CONDUSEF/CNBV (que no
// correspondía), y "¿Por qué me cobran mucho más de lo que recibí?" tenía la
// respuesta "toma capturas, sal del grupo..." (que sí correspondía a la
// pregunta del grupo de WhatsApp). El propio documento maestro de SEO ya
// señalaba este error en su fila 16 ("El bloque FAQ tiene respuestas
// desalineadas entre preguntas; corregir antes de implementar FAQPage").
// Confirmado con Santiago: intercambiar las 2 respuestas (no reescribir
// ninguna desde cero).

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface StarprestaFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const STARPRESTA_FAQS: StarprestaFaq[] = [
   {
      q: '¿StarPresta está registrada en la CONDUSEF?',
      a: 'No la localizamos por su nombre en el SIPRES (consulta del 10 de noviembre de 2026); podría operar con otra razón social. Aunque estuviera registrada, eso no la autoriza a acosarte ni a exhibir tus datos.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: 'Ya me metieron a mi familia en un grupo de WhatsApp, ¿qué hago?',
      a: 'Toma capturas de todo antes de salirte, sal del grupo y repórtalo en WhatsApp. Explícale tú a tu gente lo que pasa: cuando entienden que es acoso, el grupo pierde fuerza. Luego escríbenos y revisamos tu caso gratis.',
      icon: FAQ_ICONS.chat,
      color: FAQ_COLORS.contact,
   },
   {
      q: '¿Por qué me cobran mucho más de lo que recibí?',
      a: 'Las víctimas reportan que a la tasa anunciada se suman comisiones y cargos por atraso. Revisa en tu contrato el monto total a pagar y guarda los comprobantes de lo que ya pagaste.',
      icon: FAQ_ICONS.building,
      color: FAQ_COLORS.company,
   },
   {
      q: '¿De verdad me van a afectar en el buró de crédito?',
      a: 'Compruébalo antes de asumirlo: consulta tu Reporte de Crédito Especial, gratuito una vez al año, y revisa si esa deuda aparece.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
   {
      q: '¿Puedo denunciarlos?',
      a: 'Sí. Guarda capturas, números de teléfono, montos y fechas. Con esa evidencia puedes presentar tu denuncia, y te orientamos para hacerlo.',
      icon: FAQ_ICONS.checklist,
      color: FAQ_COLORS.followUp,
   },
];
