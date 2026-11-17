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
      a: 'Sí, con otro nombre: Unlimit Leasing, S.A.P.I. de C.V., SOFOM, E.N.R. aparece en el SIPRES con la clave 695531 y estatus «En operación» (consulta del 10 de noviembre de 2026). Estar registrada no la autoriza a cobrar con amenazas.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Qué pasa si no le pago a FortaPrest?',
      a: 'Las víctimas nos reportan llamadas constantes, mensajes a sus contactos y exposición de sus datos. Es angustiante, pero no eres la primera persona que lo vive y puedes pedir orientación.',
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
      a: 'Sí. Las amenazas, la difamación y la exposición de tus datos se pueden denunciar aunque debas dinero. Guarda las pruebas: te orientamos para hacerlo.',
      icon: FAQ_ICONS.checklist,
      color: FAQ_COLORS.followUp,
   },
];
