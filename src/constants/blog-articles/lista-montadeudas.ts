// ART-004 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
// La versión nueva ya no trae los grids de íconos por país: son párrafos.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_004: SeoArticleInput = {
   slug: 'lista-montadeudas',
   title: 'Lista de montadeudas: las apps de préstamos con más reportes en Movapp',
   metaTitle: 'Lista de montadeudas: apps con más reportes | Movapp',
   metaDescription:
      'Lista de apps de préstamos con más reportes de cobranza con acoso en Movapp: México, Perú, Ecuador, Chile y Colombia. Revisa también su registro.',
   ogTitle: 'Lista de montadeudas: apps con más reportes',
   author: 'Ricardo',
   publishDate: 'Diciembre 8, 2025',
   publishedAt: '2025-12-08T18:36:31+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Lista de aplicaciones de préstamos reportadas por cobranza con acoso',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Esta es la lista de las aplicaciones de préstamos sobre las que Movapp recibió más reportes de cobranza con acoso durante 2025, en México, Perú, Ecuador, Chile y Colombia. **Aparecer en la lista significa que recibimos reportes de víctimas, no que una autoridad la haya declarado ilegal.** Algunas, de hecho, pertenecen a empresas registradas. Úsala para prevenirte y verifica siempre cada app.',
            },
         ],
      },
      {
         heading: '¿Qué son los montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Por si no lo sabes, te lo contamos en breve. Los montadeudas son aplicaciones de préstamo que, al instalarlas y darles permisos, acceden a la información de tu teléfono y la usan para intimidarte y hacer que pagues de más. Las víctimas reportan también **depósitos que nunca solicitaron**.',
            },
            {
               type: 'paragraph',
               text: 'Desde la pandemia, la cantidad de estas aplicaciones creció muchísimo. Según los registros internos de Movapp, hemos identificado **más de 1,300 aplicaciones distintas** sobre las que recibimos reportes.',
            },
            {
               type: 'paragraph',
               text: 'Lo que describen las víctimas se repite: contactan a familiares, amigos y compañeros de trabajo para acusarlas de cosas que nunca hicieron. La finalidad es la misma: que paguen. Se les dice montadeudas porque la deuda crece hasta volverse impagable. Para entender el fenómeno completo, lee [qué son las apps montadeudas y qué hacer si ya caíste](/blog/que-hacer-con-apps-montadeudas/).',
            },
            {
               type: 'paragraph',
               text: 'Esta presión ha llevado a muchas personas a momentos de desesperación extrema.',
            },
            {
               type: 'callout',
               text: 'Si estás pasando por una crisis emocional o has pensado en hacerte daño, busca ayuda ahora: llama al **911** o a la **Línea de la Vida, 800 911 2000** (gratuita, las 24 horas, en México). El apoyo psicológico de Movapp no sustituye la atención de emergencia.',
            },
         ],
      },
      {
         heading: 'Lista de montadeudas de México',
         blocks: [
            {
               type: 'paragraph',
               text: 'Según los registros internos de Movapp, **la mayor cantidad de casos de México en 2025 vino de Credmex, RapiCredit, MexDin, Fortaprest y Mexicash**. Otras apps con muchos reportes ese año fueron Starpresta, HolaFina, Ok Dinero, Acreditaya, Venga Crédit, Prestamax y Montolibre.',
            },
            {
               type: 'paragraph',
               text: 'Consultamos el registro de la CONDUSEF (SIPRES) para varias de ellas el 9 de noviembre de 2026:',
            },
            {
               type: 'table',
               head: ['App', 'Qué encontramos en el SIPRES', 'Más información'],
               rows: [
                  [
                     'Credmex',
                     'Empresa registrada y en operación',
                     '[Qué pasa si no le pagas a Credmex](/blog/que-pasa-si-no-pago-credmex/)',
                  ],
                  [
                     'MexDin',
                     'Empresa registrada y en operación',
                     '[¿MexDin llama a tus contactos?](/blog/mexdin-llama-contactos/)',
                  ],
                  [
                     'Fortaprest',
                     'Empresa registrada y en operación',
                     '[Qué pasó con Fortaprest](/blog/que-paso-fortaprest/)',
                  ],
                  ['HolaFina', 'Empresa registrada y en operación', '—'],
                  [
                     'Mexicash',
                     'No la localizamos por su nombre',
                     '[¿Mexicash molesta a tus contactos?](/blog/mexicash-es-montadeudas/)',
                  ],
                  [
                     'Starpresta',
                     'No la localizamos por su nombre',
                     '[La cobranza de Starpresta](/blog/cobranza-starpresta/)',
                  ],
                  [
                     'Ok Dinero',
                     'No la localizamos por su nombre',
                     '[Ok Dinero ante la CONDUSEF](/blog/ok-dinero-condusef/)',
                  ],
                  [
                     'Prestamax',
                     'No la localizamos por su nombre',
                     '[¿Prestamax es confiable?](/blog/prestamax-es-confiable/)',
                  ],
               ],
            },
            {
               type: 'paragraph',
               text: '**Qué significa esto.** Que una app tenga una empresa registrada quiere decir que existe legalmente y que puedes reclamar ante la CONDUSEF; no garantiza cómo cobra. Que no la localicemos por su nombre no prueba que sea ilegal: puede operar con una razón social distinta. En ambos casos, **lo que nos reportan las víctimas es la forma de cobrar**.',
            },
         ],
      },
      {
         heading: 'Lista de montadeudas de Perú',
         blocks: [
            {
               type: 'paragraph',
               text: 'Las apps de Perú con más reportes en Movapp durante 2025: Mastersol, Lana Digital y We Finanzas. También recibimos reportes de MaxPréstamo, Easy Cash, Crédito Dinero, Vaquero Loan, LimeCredit y Paay Prima.',
            },
            {
               type: 'paragraph',
               text: 'Ten cuidado en general al descargar una app de préstamos: muchas son nuevas y cambian de nombre.',
            },
         ],
      },
      {
         heading: 'Lista de montadeudas de Ecuador',
         blocks: [
            {
               type: 'paragraph',
               text: 'Lo más importante es que cuides tu información. Apps de Ecuador con reportes en Movapp: Fácil Préstamo, Crédito 365, Rayo Financiero, Beloz, MaxiCrédito, Crédito Simple y Bogofin.',
            },
         ],
      },
      {
         heading: 'Lista de montadeudas de Chile',
         blocks: [
            {
               type: 'paragraph',
               text: 'Apps de Chile con reportes en Movapp: Fast Efectivo y Mega Billón. Sobre la primera escribimos [¿Fast Efectivo es confiable?](/blog/fast-efectivo-es-confiable/).',
            },
         ],
      },
      {
         heading: 'Lista de montadeudas de Colombia',
         blocks: [
            {
               type: 'paragraph',
               text: 'Apps de Colombia con reportes en Movapp: Crédito Justo, Cajainka, PrestaSueños y Finleap.',
            },
         ],
      },
      {
         heading: 'Cómo usar esta lista',
         blocks: [
            {
               type: 'unorderedList',
               items: [
                  '**No es una lista oficial.** La autoridad financiera de cada país es la que puede sancionar a una empresa. En México, puedes verificar a cualquier app con los pasos de [cómo consultar el SIPRES de la CONDUSEF](/blog/condusef-montadeudas/).',
                  '**No está completa.** Aparecen apps nuevas todo el tiempo. Que una app no esté aquí no significa que sea segura.',
                  '**Compara antes de pedir.** Si necesitas un préstamo, revisa primero [cómo identificar aplicaciones de préstamos confiables](/blog/apps-prestamos-confiables/).',
               ],
            },
         ],
      },
      {
         heading: 'Recomendaciones si ya caíste',
         blocks: [
            { type: 'paragraph', text: 'Esperamos que esta lista te ayude a prevenirte. Si ya estás en el problema:' },
            {
               type: 'orderedList',
               items: [
                  '**Guarda evidencia** y avisa a tus contactos.',
                  '**No pidas otro préstamo** para pagar el anterior.',
                  '**Denuncia, si así lo decides.** Aquí está la guía de [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
                  '**Busca orientación.** En Movapp la revisión de tu caso es gratuita y sin compromiso.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Movapp acompaña a víctimas de apps montadeudas desde 2021 y **ha acompañado a miles de víctimas**. Si aplica a tu caso, El Hack es el servicio para frenar el acoso: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio.' },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Cuáles son las apps montadeudas?',
         a: 'No existe una lista oficial única. Esta es la lista de las apps sobre las que Movapp recibió más reportes de cobranza con acoso durante 2025.',
      },
      {
         q: '¿Todas las apps de esta lista son ilegales?',
         a: 'No necesariamente. Algunas pertenecen a empresas registradas ante la CONDUSEF. Están en la lista por los reportes de cobranza con acoso que recibimos.',
      },
      {
         q: '¿Cómo sé si una app que no está en la lista es segura?',
         a: 'Busca su razón social en el registro de la autoridad financiera de tu país y revisa qué permisos te pide antes de instalarla.',
      },
      {
         q: '¿Qué hago si ya instalé una app de la lista?',
         a: 'Guarda evidencia, retira los permisos de la app, avisa a tus contactos y busca orientación.',
      },
   ],
   sourcesList: [
      'Registros internos de Movapp, 2025.',
      'CONDUSEF — SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'Línea de la Vida (Gobierno de México), 800 911 2000.',
   ],
   related: ['fast-efectivo-es-confiable', 'ok-dinero-condusef', 'que-paso-fortaprest', 'prestamax-es-confiable'],
};
