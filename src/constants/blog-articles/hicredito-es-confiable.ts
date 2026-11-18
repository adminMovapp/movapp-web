// ART-014 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_014: SeoArticleInput = {
   slug: 'hicredito-es-confiable',
   title: '¿HiCrédito te está cobrando? Qué reportan las víctimas, si es confiable y qué hacer',
   metaTitle: '¿HiCrédito te está cobrando? Qué hacer | Movapp',
   metaDescription:
      '¿HiCrédito es confiable? No la encontramos en la CONDUSEF. Conoce qué reportan sus víctimas, cómo evaluar una app de préstamos y qué hacer si te cobra.',
   ogTitle: '¿HiCrédito te está cobrando?',
   author: 'Dra. Dalia',
   publishDate: 'Octubre 24, 2025',
   publishedAt: '2025-10-24T16:08:37+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Celular con una notificación de cobro de una aplicación de préstamos',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Si HiCrédito te está cobrando con presión, **guarda evidencia, avisa a tus contactos y verifica la deuda antes de pagar**. En nuestra consulta del 9 de noviembre de 2026 no encontramos a HiCrédito en el registro de la CONDUSEF, y tampoco cumple con los puntos básicos que recomendamos revisar en una app de préstamos. No la recomendamos.',
            },
            {
               type: 'paragraph',
               text: 'Muchas personas que necesitaron un préstamo inmediato descargaron HiCrédito, entre un sinfín de aplicaciones. A los pocos días se encontraron con una app que, por lo que reportan, **se comporta como una app montadeudas**.',
            },
            {
               type: 'paragraph',
               text: 'Un detalle que quizá reconozcas: HiCrédito cambió su imagen. Antes usaba colores naranja y blanco; ahora añade el amarillo, con una moneda con el signo de pesos.',
            },
         ],
      },
      {
         heading: '¿Qué es una app montadeudas?',
         blocks: [
            { type: 'paragraph', text: 'Un poco de contexto: ¿por qué se llama montadeudas a una aplicación?' },
            {
               type: 'paragraph',
               text: 'Se conoce como «montadeudas» a las aplicaciones de préstamo que ofrecen montos bajos a plazos muy cortos y con costos muy altos, con frecuencia sin registro ni supervisión de las autoridades financieras. Estas son las características que nos reportan las víctimas de HiCrédito y de otras apps:',
            },
            {
               type: 'unorderedList',
               items: [
                  'No se localiza un registro vigente de la empresa.',
                  'No respeta los plazos de pago.',
                  'Cobra intereses altísimos.',
                  '**Accede a información sensible del teléfono.**',
               ],
            },
            {
               type: 'paragraph',
               text: 'La última es la más urgente de atender: con tu información empieza un proceso de intimidación que puede volverse una pesadilla y afectarte en lo psicológico y en lo social.',
            },
            {
               type: 'paragraph',
               text: 'Estas apps se anuncian como soluciones maravillosas para un problema financiero. Aparecen en páginas web o directamente en tiendas como Play Store, **lo que da una falsa sensación de fiabilidad**.',
            },
         ],
      },
      {
         heading: '¿HiCrédito es confiable?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Por eso tanta gente se pregunta si HiCrédito es confiable. Sus promesas están bien armadas, pero, según los reportes, lo que ofrece no se cumple. La pregunta útil es otra: **¿cómo saber si una app es confiable?**',
            },
            {
               type: 'paragraph',
               text: 'Antes de usar cualquier aplicación de préstamo inmediato, revisa estos puntos:',
            },
            {
               type: 'orderedList',
               items: [
                  '**Registro.** Que la empresa aparezca en el SIPRES (Sistema de Registro de Prestadores de Servicios Financieros) de la CONDUSEF, con estatus «En operación». Aquí están los pasos para [verificar una app en el SIPRES](/blog/condusef-montadeudas/).',
                  '**Reputación.** Tómate el tiempo de leer las reseñas de otras personas que la usaron.',
                  '**Condiciones claras.** Tasas de interés, plazos de pago y comisiones, a la vista antes de aceptar.',
                  '**Contacto real.** Medios de contacto claros, con una línea directa de comunicación.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Con esos cuatro puntos puedes decidir si conviene usar una aplicación. **En el caso de HiCrédito, no encontramos que cumpla ninguno**, por lo que tus datos personales pueden quedar expuestos.',
            },
            {
               type: 'paragraph',
               text: 'Más señales de alerta en [cómo identificar una app montadeudas](/blog/como-identificar-apps-montadeudas/). Y si lo que buscas es un préstamo, revisa [cómo identificar aplicaciones de préstamos confiables](/blog/apps-prestamos-confiables/).',
            },
         ],
      },
      {
         heading: '¿Qué hacer si HiCrédito te está cobrando?',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**Guarda evidencia:** capturas de mensajes, números y comprobantes.',
                  '**Avisa a tus contactos** de que pueden recibir mensajes falsos sobre ti.',
                  '**Retira los permisos de la app** siguiendo [qué hacer si descargaste una app montadeudas](/blog/que-hacer-si-descargaste-app-montadeudas/).',
                  '**Verifica antes de pagar.** La decisión sobre la deuda es tuya; revisa [qué considerar antes de pagar a una app montadeudas](/blog/que-pasa-si-no-pagas-montadeudas/).',
                  '**Busca orientación.** En Movapp la revisión de tu caso es gratuita y sin compromiso.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si aplica a tu caso, **El Hack es el servicio de Movapp para frenar el acoso**: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio.' },
         ],
      },
   ],
   faqs: [
      {
         q: '¿HiCrédito es confiable?',
         a: 'No la recomendamos: no la localizamos en el registro de la CONDUSEF y recibimos reportes de cobranza con presión.',
      },
      {
         q: '¿HiCrédito es montadeudas?',
         a: 'Las víctimas que nos escriben describen el comportamiento típico de una app montadeudas: plazos que no se respetan, intereses muy altos y uso de sus datos para cobrar.',
      },
      {
         q: '¿HiCrédito existe todavía?',
         a: 'Las apps de este tipo cambian de imagen y a veces salen de las tiendas. Que no aparezca en la tienda no significa que la cobranza se detenga.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026; sin coincidencias para «HiCrédito»).',
      'Reportes de víctimas atendidas por Movapp.',
   ],
   // 2026-11-11: wireframe del blog -- 3 tarjetas (sin cobranza-starpresta).
   related: ['como-identificar-apps-montadeudas', 'que-pasa-si-no-pago-credmex', 'mexicash-es-montadeudas'],
};
