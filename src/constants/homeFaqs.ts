// src/constants/homeFaqs.ts
//
// Preguntas frecuentes del home, separadas del componente (@sections/home/HomeFAQ.astro)
// para poder importarlas en @components/ui/FAQAccordion.astro sin acoplar el copy a la
// sección -- mismo criterio que @constants/faqsPageAcoso.ts / @constants/elhack.ts.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const HOME_FAQS = [
   {
      q: '¿Movapp cobra?',
      a: 'La asesoría es gratuita. El costo de El Hack va desde los $500 MXN, aunque dependerá de la cantidad de préstamos que tengas activos.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Qué pasa con mi deuda?',
      a: 'El Hack detiene el acoso y protege tu información, pero no borra por sí solo una deuda. Un asesor te ayuda a entender tu situación y tus opciones. Desconfía de quien prometa "borrar" deudas de forma automática.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
   {
      q: '¿Qué es El Hack?',
      a: 'Es una herramienta tecnológica diseñada por Movapp para proteger tu información personal cuando estás siendo víctima de doxing por parte de aplicaciones no reguladas, también llamadas montadeudas.',
      icon: FAQ_ICONS.shield,
      color: FAQ_COLORS.protection,
   },
];
