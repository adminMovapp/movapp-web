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
      a: 'No lo podemos afirmar: no la localizamos en el registro de la CONDUSEF y no tenemos confirmada la empresa que la opera. Antes de usarla, busca su razón social en la app o el contrato.',
      icon: FAQ_ICONS.scale,
      color: FAQ_COLORS.legal,
   },
   {
      q: '¿PrestaFácil está registrada ante la CONDUSEF?',
      a: 'No la localizamos en el SIPRES de la CONDUSEF (consulta del 10 de noviembre de 2026). Podría operar con otra razón social; si la conoces, puedes consultarla tú en el SIPRES.',
      icon: FAQ_ICONS.building,
      color: FAQ_COLORS.company,
   },
   {
      q: '¿Qué permisos solicita?',
      a: 'Según los reportes que recibimos, pide acceso a tus contactos. Antes de instalar cualquier app de préstamo, revisa qué permisos pide y no aceptes los que no necesita.',
      icon: FAQ_ICONS.alertTriangle,
      color: FAQ_COLORS.threat,
   },
];
