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
      q: 'Si tiene permiso de CONDUSEF, ¿entonces es legal lo que hace?',
      a: 'No. Aparecer en un registro no autoriza a nadie a acosarte, difamarte ni exponer tus datos. Esas prácticas están prohibidas aunque tú debas dinero, y son denunciables precisamente ante CONDUSEF y PROFECO.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: 'Ya me metieron a mi familia en un grupo de WhatsApp, ¿qué hago?',
      a: 'Toma capturas de todo antes de salirte, sal del grupo y explícale tú a tu gente lo que está pasando. En cuanto tus contactos entienden que es una práctica de acoso y no una deuda real que les incumbe, el grupo deja de funcionar como arma.',
      icon: FAQ_ICONS.chat,
      color: FAQ_COLORS.contact,
   },
   {
      q: '¿Por qué me cobran mucho más de lo que recibí?',
      a: 'No la encontramos regulada por CONDUSEF ni la CNBV. Estar registrado como despacho de cobranza ante PROFECO no la convierte en una financiera supervisada, y tampoco la autoriza a acosarte.',
      icon: FAQ_ICONS.building,
      color: FAQ_COLORS.company,
   },
   {
      q: '¿De verdad me van a afectar el buró de crédito?',
      a: 'Revisa tú mismo antes de asumirlo. Consulta tu reporte de crédito especial, que es gratuita una vez al año, y comprueba con lo que te están diciendo.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
   {
      q: '¿Puedo denunciarlos?',
      a: 'Sí. Guarda capturas, números de teléfono, montos y fechas. Con esa evidencia puedes presentar tu denuncia, y podemos acompañarte en el proceso.',
      icon: FAQ_ICONS.checklist,
      color: FAQ_COLORS.followUp,
   },
];
