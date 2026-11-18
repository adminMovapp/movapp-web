// src/constants/homeFaqs.ts
//
// Preguntas frecuentes del home, separadas del componente (@sections/home/HomeFAQ.astro)
// para poder importarlas en @components/ui/FAQAccordion.astro sin acoplar el copy a la
// sección -- mismo criterio que @constants/faqsPageAcoso.ts / @constants/elhack.ts.

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const HOME_FAQS = [
   {
      q: '¿Movapp cobra?',
      a: 'Revisar tu caso es gratis. El Hack cuesta desde $500 MXN según cuántas apps haya; tu asesor confirma el total antes de pagar.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Qué pasa con mi deuda?',
      a: 'Movapp no elimina deudas ni modifica tu historial crediticio. El Hack frena el acoso y protege tu información; qué hacer con la deuda lo decides tú. Desconfía de quien prometa «borrar» deudas.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
   {
      q: '¿Qué es El Hack?',
      a: 'Es el servicio de Movapp para frenar el acoso de las apps montadeudas: llamadas y mensajes a ti y a tus contactos. Se solicita con un asesor, que confirma el alcance y el precio.',
      icon: FAQ_ICONS.shield,
      color: FAQ_COLORS.protection,
   },
];
