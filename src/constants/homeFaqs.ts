// src/constants/homeFaqs.ts
//
// Preguntas frecuentes del home, separadas del componente (@sections/home/HomeFAQ.astro)
// para poder importarlas en @components/ui/FAQAccordion.astro sin acoplar el copy a la
// sección -- mismo criterio que @constants/faqsPageAcoso.ts / @constants/elhack.ts.

export const HOME_FAQS = [
   {
      q: '¿Cuánto cuesta la ayuda de Movapp?',
      a: 'Hablar con un asesor por WhatsApp es gratis. El asesor te explica el alcance y las condiciones de El Hack.',
   },
   {
      q: '¿El Hack elimina mi deuda?',
      a: 'El Hack detiene el acoso y protege tu información, pero no borra por sí solo una deuda. Un asesor te ayuda a entender tu situación y tus opciones. Desconfía de quien prometa "borrar" deudas de forma automática.',
   },
   {
      q: '¿Cómo obtengo El Hack?',
      a: 'Solo hablando con un asesor por WhatsApp. El Hack no se descarga en tiendas; en Google Play y App Store está la app de Movapp, que es distinta.',
   },
   {
      q: 'Ya me afectó una app, ¿todavía pueden ayudarme?',
      a: 'Sí. Escríbenos por WhatsApp y te guiamos según tu caso, paso a paso.',
   },
];
