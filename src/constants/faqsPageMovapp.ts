// src/constants/faqsPageMovapp.ts
//
// Preguntas de la sección "Movapp" en /faqs. Mismo criterio que
// @constants/faqsPageAcoso.ts.
//

import { FAQ_ICONS, FAQ_COLORS } from './faqIcons';

export const FAQS_PAGE_MOVAPP = [
   {
      q: '¿Qué es Movapp?',
      a: 'Movapp es una organización que ayuda a víctimas de apps de préstamo montadeudas, que usan datos personales para cobrar con acoso y amenazas. Nació en 2021 y las acompaña con asesoría personalizada, apoyo psicológico y El Hack.',
      icon: FAQ_ICONS.building,
      color: FAQ_COLORS.company,
   },
   {
      q: '¿La ayuda tiene costo?',
      a: 'Revisar tu caso y el apoyo psicológico son gratis. El Hack cuesta desde $500 MXN; tu asesor confirma el total antes de pagar.',
      icon: FAQ_ICONS.tag,
      color: FAQ_COLORS.cost,
   },
   {
      q: '¿Qué no hace Movapp?',
      a: 'Movapp no otorga préstamos, no es un despacho de abogados ni una reparadora de crédito, no elimina deudas y no cobra deudas a nombre de nadie. Quien te ofrezca un préstamo de Movapp es un imitador.',
      icon: FAQ_ICONS.prohibit,
      color: FAQ_COLORS.limits,
   },
   {
      q: '¿Cuánto tarda El Hack?',
      a: 'Varía según la app y cuántas apps haya. Las víctimas atendidas reportan que el acoso suele disminuir entre 7 y 14 días después de aplicar El Hack; en las primeras 48 horas aún pueden llegar llamadas. Tu asesor te da un estimado.',
      icon: FAQ_ICONS.clock,
      color: FAQ_COLORS.time,
   },
   {
      q: '¿Qué pasa después de pagar El Hack?',
      a: 'El equipo técnico aplica El Hack en las apps que identificó tu asesor, incluidas las relacionadas. Luego tu asesor te da seguimiento, te orienta para conservar evidencia y denunciar si lo decides, y te da acceso a apoyo psicológico gratuito si lo necesitas.',
      icon: FAQ_ICONS.checklist,
      color: FAQ_COLORS.followUp,
   },
];
