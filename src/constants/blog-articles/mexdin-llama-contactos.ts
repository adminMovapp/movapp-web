// ART-011 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_011: SeoArticleInput = {
   slug: 'mexdin-llama-contactos',
   title: '¿MexDin llama a tus contactos? Qué reportan las víctimas, si es legal y qué pasa si no pagas',
   metaTitle: '¿MexDin es confiable? Cobranza, registro y qué hacer | Movapp',
   metaDescription:
      '¿MexDin llama a tus contactos? Conoce qué reportan sus víctimas, su registro en CONDUSEF, sus tasas y qué pasa si no pagas.',
   ogTitle: '¿MexDin llama a tus contactos?',
   author: 'Ricardo',
   publishDate: 'Octubre 3, 2025',
   publishedAt: '2025-10-03T15:39:16+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Celular con mensajes de cobranza de una app de préstamos enviados a varios contactos',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Sí, es lo que nos reportan. Las víctimas que atendemos en Movapp describen **llamadas y mensajes a sus contactos, y grupos de WhatsApp para cobrar**. MexDin es una app legal en el sentido de que la opera una empresa registrada ante la CONDUSEF; pero **estar registrada no significa que su cobranza sea correcta**. Si te atrasas, además, puede reportarte a las sociedades de información crediticia.',
            },
         ],
      },
      {
         heading: '¿Qué es MexDin y quién está detrás?',
         blocks: [
            {
               type: 'paragraph',
               text: 'MexDin, como muchas otras apps de préstamos inmediatos, ofrece préstamos en línea en menos de 24 horas y con requisitos mínimos. Según su ficha en Google Play, tiene más de 5 millones de descargas.',
            },
            {
               type: 'paragraph',
               text: 'La opera **Elaworld, S.A. de C.V., SOFOM, E.N.R.**, que sí aparece en el SIPRES, el registro de la CONDUSEF. Esto es lo que muestra el registro (consultado el 9 de noviembre de 2026):',
            },
            {
               type: 'table',
               head: ['Dato en SIPRES', 'Valor'],
               rows: [
                  ['Denominación social', 'Elaworld, S.A. de C.V., SOFOM, E.N.R.'],
                  ['Nombre corto', 'MEXDIN'],
                  ['Clave de registro', '695547'],
                  ['Estatus', 'En operación (desde el 25 de enero de 2022)'],
                  ['Supervisora', 'CONDUSEF'],
                  ['Contratos con sociedades de información crediticia', 'Círculo de Crédito y Trans Unión de México'],
               ],
            },
         ],
      },
      {
         heading: '¿MexDin es legal? ¿Es confiable?',
         blocks: [
            {
               type: 'paragraph',
               text: '**Es legal: tiene una empresa registrada y en operación.** Que sea confiable es otra pregunta, y ahí es donde entran los reportes.',
            },
            {
               type: 'paragraph',
               text: 'Algo que conviene entender es qué significa «E.N.R.»: **entidad no regulada**. Una SOFOM E.N.R. está registrada y supervisada por la CONDUSEF, pero no tiene la supervisión completa que la CNBV ejerce sobre un banco. MexDin presume su registro para generar confianza, y es cierto que lo tiene; lo que el registro no garantiza es cómo cobra. Lo explicamos a fondo en [qué puede y qué no puede hacer la CONDUSEF frente a los montadeudas](/blog/condusef-montadeudas/).',
            },
            {
               type: 'paragraph',
               text: 'Sobre sus costos, la propia app publica en Google Play una **tasa de interés anual de 31 % a 372 % (sin IVA)** y un **CAT promedio aproximado de 500 % (sin IVA)**. Revisa siempre el monto total a pagar antes de aceptar.',
            },
         ],
      },
      {
         heading: '¿MexDin llama a tus contactos? Lo que reportan las víctimas',
         blocks: [
            {
               type: 'paragraph',
               text: 'Según los registros internos de Movapp, en septiembre de 2025 recibimos **975 reportes relacionados con MexDin**. En ellos, las víctimas nos cuentan que:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Molestaron a sus contactos por WhatsApp, por SMS o con llamadas.',
                  'En la mayoría de los casos **crearon grupos de WhatsApp** con sus contactos para cobrar.',
                  'A esos contactos les dijeron que la víctima los había dejado como «avales».',
               ],
            },
            {
               type: 'paragraph',
               text: 'Por eso conviene ser cauteloso con cualquier app de préstamos que pida acceso a los contactos de tu teléfono. **Lee los términos y los permisos antes de instalar.**',
            },
         ],
      },
      {
         heading: '¿Qué pasa si no le pago a MexDin?',
         blocks: [
            {
               type: 'unorderedList',
               items: [
                  '**Cobranza insistente.** Las víctimas reportan llamadas y mensajes constantes, amenazas y uso de su información personal para presionar.',
                  '**Tu historial crediticio.** MexDin tiene contratos con Círculo de Crédito y con Trans Unión de México, así que **un atraso puede quedar registrado en tu historial**.',
                  '**¿Puede embargarte?** Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio. Un cobrador no puede embargarte por mensaje ni por llamada.',
                  '**Amenazas de visitas.** Si te dicen que irán a tu casa, lee [¿los montadeudas van a tu casa?](/blog/montadeudas-van-a-tu-casa/).',
               ],
            },
            {
               type: 'paragraph',
               text: 'Como hay una empresa registrada detrás, la deuda existe y **la decisión sobre cómo enfrentarla es tuya**. Antes de decidir, revisa [qué considerar antes de pagar a una app de préstamos](/blog/que-pasa-si-no-pagas-montadeudas/). Lo que no es aceptable, debas o no, es que te cobren con amenazas o molestando a tus contactos.',
            },
         ],
      },
      {
         heading: '¿Con qué otras aplicaciones debo tener cuidado?',
         blocks: [
            {
               type: 'paragraph',
               text: 'La lista cambia día con día. En Movapp hemos recibido reportes de llamadas agresivas a contactos relacionados, entre otras, con estas aplicaciones: Fortaprest, Mexicash, Credmex, Molo Préstamos, Hiprestamos, Cashmax, Cashvia, Ample Cash, Finmex, Moneycat, Crédito 365, Starpresta y Tala Dinero.',
            },
            {
               type: 'paragraph',
               text: 'Tenemos artículos sobre algunas de ellas: [qué pasó con Fortaprest](/blog/que-paso-fortaprest/), [qué pasa si no le pagas a Credmex](/blog/que-pasa-si-no-pago-credmex/) y [si Mexicash molesta a tus contactos](/blog/mexicash-es-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Qué hacer si MexDin u otra app llama a tus contactos?',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**Avisa a tus contactos.** Adviérteles de la situación para que no hagan caso a los mensajes que reciban.',
                  '**Guarda evidencia:** capturas de mensajes, grupos de WhatsApp y números.',
                  '**Presenta una queja.** Al ser una entidad registrada, puedes reclamar ante la CONDUSEF; y si hay amenazas, denunciar. Aquí está la guía de [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
                  '**Busca orientación.** En Movapp la revisión de tu caso es gratuita y sin compromiso.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si El Hack aplica a tu caso, es el servicio de Movapp para frenar el acoso: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago. También hay apoyo psicológico gratuito, que no sustituye la atención de emergencia.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio. No estás solo.' },
         ],
      },
   ],
   faqs: [
      {
         q: '¿MexDin es montadeudas?',
         a: 'MexDin tiene una empresa registrada ante la CONDUSEF. En Movapp recibimos reportes de cobranza con acoso relacionados con esta app, que es la conducta típica de las apps montadeudas.',
      },
      {
         q: '¿MexDin está registrada en la CONDUSEF?',
         a: 'Sí. La opera Elaworld, S.A. de C.V., SOFOM, E.N.R., con clave de registro 695547 y estatus «En operación».',
      },
      {
         q: '¿MexDin reporta a Buró de Crédito?',
         a: 'Su registro muestra contratos con Círculo de Crédito y con Trans Unión de México, por lo que un atraso puede aparecer en tu historial.',
      },
      {
         q: '¿Movapp borra mi deuda con MexDin?',
         a: 'No. Movapp no elimina deudas. El Hack sirve para frenar el acoso y proteger tu información.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES, registro de Elaworld, S.A. de C.V., SOFOM, E.N.R. (clave 695547): [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'Google Play — ficha de «MexDin: Préstamos de crédito»: [https://play.google.com/store/apps/details?id=com.elaworld.mexloan](https://play.google.com/store/apps/details?id=com.elaworld.mexloan) (consultada el 9 de noviembre de 2026).',
      'Registros internos de Movapp, septiembre de 2025.',
   ],
   related: [
      'como-identificar-apps-montadeudas',
      'cobranza-starpresta',
      'hicredito-es-confiable',
      'montadeudas-redes-sociales',
   ],
};
