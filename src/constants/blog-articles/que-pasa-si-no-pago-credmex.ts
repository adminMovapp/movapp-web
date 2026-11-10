// ART-015 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_015: SeoArticleInput = {
   slug: 'que-pasa-si-no-pago-credmex',
   title: '¿Qué pasa si no le pago a Credmex? Historial crediticio, cobranza y qué hacer',
   metaTitle: '¿Qué pasa si no pago a Credmex? Buró y cobranza | Movapp',
   metaDescription:
      'Si no pagas a Credmex, el atraso puede quedar en tu historial y la deuda crecer. Conoce su registro en CONDUSEF, qué reportan las víctimas y qué hacer.',
   ogTitle: '¿Qué pasa si no le pago a Credmex?',
   author: 'Ricardo',
   publishDate: 'Septiembre 30, 2025',
   publishedAt: '2025-09-30T15:44:54+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona preocupada revisando en su celular un cobro de la app de préstamos Credmex',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Si no le pagas a Credmex, **el atraso puede quedar en tu historial crediticio y la deuda puede crecer con cargos por mora**. Además, las víctimas que atendemos en Movapp reportan cobranza agresiva y mensajes a sus contactos. Credmex tiene una empresa registrada ante la CONDUSEF, así que la deuda existe; lo que no es aceptable es que te cobren con amenazas.',
            },
            {
               type: 'paragraph',
               text: 'Según los registros internos de Movapp, en septiembre de 2025 recibimos **cerca de 1,200 casos** de cobranza agresiva y malas prácticas relacionados con la app de préstamos Credmex.',
            },
         ],
      },
      {
         heading: '¿Quién está detrás de Credmex? ¿Es legal?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Credmex es operada por **Impulsa tu Rendimiento, S.A.P.I. de C.V., SOFOM, E.N.R.**, que sí aparece en el SIPRES, el registro de la CONDUSEF. Según Google Play, la app tiene más de 10 millones de descargas.',
            },
            {
               type: 'table',
               head: ['Dato en SIPRES (9 de noviembre de 2026)', 'Valor'],
               rows: [
                  ['Denominación social', 'Impulsa tu Rendimiento, S.A.P.I. de C.V., SOFOM, E.N.R.'],
                  ['Nombre corto', 'Credmex'],
                  ['Clave de registro', '695470'],
                  ['Estatus', 'En operación (desde el 13 de septiembre de 2021)'],
                  ['Supervisora', 'CONDUSEF'],
                  ['Contrato con sociedad de información crediticia', 'Círculo de Crédito'],
               ],
            },
            {
               type: 'paragraph',
               text: '**Es una app legal, con registro vigente.** Pero «E.N.R.» significa entidad no regulada: está registrada y bajo supervisión de la CONDUSEF, sin la vigilancia completa que la CNBV aplica a un banco. El registro no avala la forma en que cobra. Te explicamos la diferencia en [qué puede hacer la CONDUSEF frente a los montadeudas](/blog/condusef-montadeudas/).',
            },
            {
               type: 'paragraph',
               text: 'La propia app publica en Google Play una tasa anual (APR) **de 31.03 % a 372.41 %**.',
            },
         ],
      },
      {
         heading: '¿Credmex afecta mi historial crediticio?',
         blocks: [
            { type: 'paragraph', text: 'Sí puede. Si no le pagas a Credmex, existen estas posibilidades:' },
            {
               type: 'unorderedList',
               items: [
                  '**Afectación de tu historial crediticio.** Credmex tiene contrato con Círculo de Crédito, por lo que puede reportar la falta de pago. Un mal registro dificulta obtener préstamos, tarjetas de crédito e incluso algunos servicios, sobre todo si se acumulan otras deudas.',
                  '**Aumento de la deuda.** Puede aplicar cargos por mora y recargos sobre lo que debes. La deuda puede crecer rápido y volverse difícil de pagar. También existe la posibilidad de **negociar pagos diferidos**.',
               ],
            },
         ],
      },
      {
         heading: '¿Qué otras consecuencias reportan las víctimas?',
         blocks: [
            { type: 'paragraph', text: 'Esto es lo que describen las personas que nos han escrito por Credmex:' },
            {
               type: 'unorderedList',
               items: [
                  '**Uso de información personal para cobrar.** Los cobradores usan datos del teléfono: contactos, ubicación, galería.',
                  '**Cobros que crecen.** Incluso cuando se cumple con los pagos, la falta de claridad en el contrato puede dar lugar a cargos que hacen la deuda difícil de liquidar.',
                  '**Exposición ante tus contactos.** Mensajes a personas de tu agenda para difamarte o presionarte.',
                  '**Depósitos no solicitados.** Víctimas reportan que, después de terminar de pagar, recibieron un nuevo depósito sin haberlo pedido.',
                  '**Amenazas de embargo.** Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio; un cobrador no puede embargarte por mensaje.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si te amenazan con ir a tu domicilio, lee [¿los montadeudas van a tu casa?](/blog/montadeudas-van-a-tu-casa/).',
            },
         ],
      },
      {
         heading: '¿Qué hacer si no puedes pagar a Credmex?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Si no puedes pagar, es probable que empiecen a molestar a tus contactos. Estos pasos te ayudan:',
            },
            {
               type: 'orderedList',
               items: [
                  '**Verifica tu deuda.** Compara lo que recibiste con lo que te cobran y pide el desglose. No pagues por miedo montos que no reconoces; revisa [qué considerar antes de pagar a una app de préstamos](/blog/que-pasa-si-no-pagas-montadeudas/).',
                  '**Pregunta por una negociación.** Al ser una empresa registrada, puedes pedir un plan de pagos.',
                  '**Informa a tus contactos.** Adviérteles para que no caigan en el juego de los cobradores.',
                  '**Guarda evidencia y reclama.** Puedes presentar una queja ante la CONDUSEF por la forma de cobranza; aquí está la guía de [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
                  '**Busca orientación en Movapp.** La revisión de tu caso es gratuita y sin compromiso: un asesor analiza tu situación y te explica tus opciones.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si aplica a tu caso, El Hack es el servicio de Movapp para frenar el acoso: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            {
               type: 'paragraph',
               text: '**Movapp no elimina deudas ni modifica el historial crediticio.** Las decisiones sobre la deuda corresponden a cada persona.',
            },
         ],
      },
      {
         heading: 'Credmex, Movapp y La Defensa del Deudor',
         blocks: [
            {
               type: 'paragraph',
               text: 'Credmex fue el motivo de una discrepancia pública entre Movapp y La Defensa del Deudor, justamente por la diferencia entre tener registro y cobrar correctamente. Contamos esa historia en [Defensa del Deudor vs Movapp](/blog/defensa-del-deudor-vs-movapp/).',
            },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Credmex es montadeudas?',
         a: 'Credmex tiene una empresa registrada ante la CONDUSEF. En Movapp recibimos reportes de cobranza con acoso relacionados con esta app, que es la conducta típica de las apps montadeudas.',
      },
      {
         q: '¿Credmex es legal?',
         a: 'Sí. La opera Impulsa tu Rendimiento, S.A.P.I. de C.V., SOFOM, E.N.R., con clave de registro 695470 y estatus «En operación».',
      },
      {
         q: '¿Credmex me puede embargar?',
         a: 'Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio. Un cobrador no puede embargarte por teléfono ni por mensaje.',
      },
      {
         q: '¿Credmex llama a tus contactos?',
         a: 'Es una de las conductas que reportan las víctimas que atendemos: mensajes y llamadas a personas de su agenda.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES, registro de Impulsa tu Rendimiento, S.A.P.I. de C.V., SOFOM, E.N.R. (clave 695470): [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'Google Play — ficha de «Credmex: Préstamos de dinero»: [https://play.google.com/store/apps/details?id=com.fintopia.mxcredmex](https://play.google.com/store/apps/details?id=com.fintopia.mxcredmex) (consultada el 9 de noviembre de 2026).',
      'Registros internos de Movapp, septiembre de 2025.',
   ],
   related: [
      'como-identificar-apps-montadeudas',
      'cobranza-starpresta',
      'mexicash-es-montadeudas',
      'estrategias-montadeudas',
   ],
};
