// src/constants/faqsPageElHack.ts
//
// Preguntas de la sección "El Hack" en /faqs. Mismo criterio que
// @constants/faqsPageAcoso.ts -- este set es específico de la página de
// FAQs (no el mismo que @constants/elhack.ts, que alimenta el FAQ de la
// landing /el-hack con otro juego de preguntas).

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const FAQS_PAGE_EL_HACK = [
   {
      q: '¿Qué es El Hack?',
      a: 'Es el servicio de Movapp para frenar el acoso de las apps montadeudas: llamadas y mensajes a ti y a tus contactos. Se solicita con un asesor, que confirma el alcance y el precio.',
      icon: FAQ_ICONS.shield,
      color: FAQ_COLORS.protection,
   },
   {
      q: '¿El Hack elimina mi deuda?',
      a: 'No. Movapp no elimina deudas ni modifica tu historial crediticio. El Hack frena el acoso y protege tu información; qué hacer con la deuda lo decides tú. Desconfía de quien prometa «borrar» deudas.',
      icon: FAQ_ICONS.bill,
      color: FAQ_COLORS.debt,
   },
];
