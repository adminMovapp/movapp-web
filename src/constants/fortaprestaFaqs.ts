// src/constants/fortaprestaFaqs.ts
//
// FAQs de /aplicaciones-prestamo/fortapresta (ver skill Importaciones).
// Segunda página del lado "app reportada/ilegal" de la serie -- 4 preguntas
// esta vez (PrestaFácil traía 3), fuente única para el markup
// (FortaprestaFaqs.astro, vía FAQAccordion) Y el FAQPage de schema.js.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface FortaprestaFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const FORTAPRESTA_FAQS: FortaprestaFaq[] = [
   {
      q: '¿Fortaprest está registrada ante CONDUSEF?',
      a: 'En nuestra última revisión no la encontramos en el registro. Una app que no está registrada no está supervisada, y eso también quiere decir que sus formas de cobrar no son legales.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Qué pasa si no pago?',
      a: 'Lo más probable es que empiecen las llamadas constantes, los mensajes a tus contactos y la exposición de tus datos. Es desagradable, pero tiene salida y no eres la primera persona que lo vive.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
   {
      q: '¿De verdad pueden ir a mi casa?',
      a: 'No nos ha tocado un solo caso en el que hayan cumplido esa amenaza. La dicen porque funciona, no porque vaya a pasar.',
      icon: FAQ_ICONS.home,
      color: FAQ_COLORS.homeVisit,
   },
   {
      q: '¿Puedo denunciarlos?',
      a: 'Sí. Amenazar, difamar y exponer tus datos personales está prohibido, aunque tú debas dinero. Guarda las pruebas y te acompañamos en el proceso.',
      icon: FAQ_ICONS.checklist,
      color: FAQ_COLORS.followUp,
   },
];
