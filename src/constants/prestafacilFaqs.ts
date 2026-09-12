// src/constants/prestafacilFaqs.ts
//
// FAQs de /aplicaciones-prestamo/prestafacil (ver skill Importaciones).
// Primera página del lado "app reportada/ilegal" de la serie (a diferencia
// de crediseguroFaqs.ts/talaFaqs.ts/etc., que son apps reguladas) -- fuente
// única para el markup (PrestafacilFaqs.astro, vía FAQAccordion) Y el
// FAQPage de schema.js.
//
// El copy de estas 3 respuestas vino del wireframe tal cual (ver mensaje de
// Santiago: "no tiene la información completa, esa la actualizo después") --
// se ven como texto de guía/plantilla ("no se afirma automáticamente", "se
// indica la fecha y el registro consultado") en vez de una respuesta
// específica de PrestaFácil. Se dejan verbatim (regla de fidelidad de la
// skill Importaciones), pendientes de que Santiago las reemplace con el
// contenido real de la app.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export interface PrestafacilFaq {
   q: string;
   a: string;
   icon?: string;
   color?: string;
}

export const PRESTAFACIL_FAQS: PrestafacilFaq[] = [
   {
      q: '¿PrestaFácil es legal?',
      a: 'La respuesta depende de la evidencia disponible; no se afirma automáticamente.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿Está registrada ante CONDUSEF?',
      a: 'Se indica la fecha y el registro consultado.',
      icon: FAQ_ICONS.building,
      color: FAQ_COLORS.company,
   },
   {
      q: '¿Qué permisos solicita?',
      a: 'Se muestran únicamente los permisos identificados.',
      icon: FAQ_ICONS.alertTriangle,
      color: FAQ_COLORS.threat,
   },
];
