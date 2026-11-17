// src/constants/faqsPageAcoso.ts
//
// Preguntas de la sección "Acoso" en /faqs. Igual que @constants/elhack.ts,
// este copy se usa en DOS lugares: el acordeón que renderiza la sección
// (@components/ui/FAQAccordion.astro, vía FaqsAcoso.astro) y el FAQPage del
// JSON-LD (src/utils/schema.js) -- vive acá para que no puedan divergir.
//
// La pregunta "¿Pueden contactar a tus familiares, amigos o contactos?" que
// traía el mockup original se quitó a pedido (duplicaba "¿Pueden contactar a
// mi familia o amigos?" más abajo).

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const FAQS_PAGE_ACOSO = [
   {
      q: '¿Es legal que me acosen por una deuda?',
      a: 'Deber dinero no te quita tus derechos. Amenazar, insultar o contactar a tus familiares y amigos para presionarte son prácticas que suelen estar prohibidas y se pueden denunciar.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Pueden contactar a mi familia o amigos?',
      a: 'Usar tu lista de contactos para avergonzarte o presionarte es una práctica de acoso. El Hack ayuda a frenar esas llamadas y mensajes a tus contactos.',
      icon: FAQ_ICONS.users,
      color: FAQ_COLORS.family,
   },
   {
      q: '¿Qué hago si me amenazan?',
      a: 'Guarda capturas de llamadas y mensajes y busca orientación: escríbenos por WhatsApp y revisamos tu caso gratis. Si estás en peligro inmediato, llama al 911.',
      icon: FAQ_ICONS.alertTriangle,
      color: FAQ_COLORS.threat,
   },
   {
      q: '¿Las apps pueden ir a mi domicilio?',
      a: 'Es una amenaza para asustarte y que pagues: en Movapp no hemos recibido un caso en el que la visita se haya cumplido. Aun así, no actúes por impulso y guarda la evidencia. Si te sientes en peligro, llama al 911. Lee más sobre si los montadeudas van a tu casa.',
      icon: FAQ_ICONS.home,
      color: FAQ_COLORS.homeVisit,
   },
   {
      q: '¿Pueden contactar a tus familiares, amigos o contactos?',
      // Dos párrafos ("\n\n"): FAQAccordion los pinta como <p> separados.
      a: 'Sí. Es una de las formas más comunes que utilizan las apps montadeudas para presionarte, amenazarte o exhibirte.\n\nSi ya contactaron a tus familiares, lo primero es mantener la calma, guardar evidencia y contactar a un asesor de Movapp.',
      icon: FAQ_ICONS.users,
      color: FAQ_COLORS.family,
   },
];
