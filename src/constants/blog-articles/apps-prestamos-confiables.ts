// ART-002 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_002: SeoArticleInput = {
   slug: 'apps-prestamos-confiables',
   title: 'Aplicaciones de préstamos confiables: cómo identificarlas y cuáles verificamos en la CONDUSEF',
   metaTitle: 'Apps de préstamos confiables: cómo identificarlas | Movapp',
   metaDescription:
      '¿Qué apps de préstamos son confiables? Conoce 5 criterios para comprobarlo y tres apps cuyo registro verificamos en la CONDUSEF.',
   ogTitle: 'Aplicaciones de préstamos confiables',
   author: 'Ricardo',
   publishDate: 'Diciembre 10, 2025',
   publishedAt: '2025-12-10T18:02:48+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona comparando aplicaciones de préstamos en su celular antes de solicitar un crédito',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Una app de préstamos confiable es la que pertenece a una **empresa registrada y en operación ante la CONDUSEF**, te muestra el costo total antes de contratar y no te pide acceso a tus contactos ni a tus fotos. En este artículo te damos los criterios para comprobarlo tú mismo y tres apps cuyo registro verificamos. **Movapp no ofrece préstamos ni recibe pagos de ninguna de ellas.**',
            },
            {
               type: 'paragraph',
               text: 'En Movapp no ofrecemos préstamos: ayudamos a personas que han sido víctimas de aplicaciones montadeudas. Una pregunta que nos hacen con mucha frecuencia es **qué préstamos en línea son confiables y seguros**.',
            },
            {
               type: 'paragraph',
               text: 'Con tantas aplicaciones que usan tu información para intimidarte, es una pregunta muy importante. Sabemos que tienes un gasto urgente que cubrir, y lo que menos queremos es que caigas con una app montadeudas y pases un mal momento.',
            },
         ],
      },
      {
         heading: 'Cómo saber si una app de préstamos es confiable',
         blocks: [
            { type: 'paragraph', text: 'Antes de instalar cualquier app, revisa estos cinco puntos:' },
            {
               type: 'orderedList',
               items: [
                  '**Tiene una empresa registrada y en operación.** Busca su razón social en el SIPRES de la CONDUSEF. El estatus debe decir «En operación». Aquí está el paso a paso para [verificar una app en el SIPRES](/blog/condusef-montadeudas/).',
                  '**Los datos coinciden.** El domicilio, el teléfono y el correo del registro deben ser los mismos que los de la app. Hay apps que usan el nombre de una empresa registrada sin tener relación con ella.',
                  '**Te muestra el costo total antes de aceptar.** Tasa de interés, CAT, comisiones y, sobre todo, cuánto vas a pagar en total y en qué fechas.',
                  '**No pide permisos de más.** Una app de préstamos no necesita tu lista de contactos, tu galería de fotos ni tus mensajes.',
                  '**Tiene canales de atención reales.** Teléfono, correo y una unidad de atención a usuarios que respondan.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si falla en cualquiera de estos puntos, no entregues tus datos. Las señales de alerta están en [cómo identificar una app montadeudas](/blog/como-identificar-apps-montadeudas/).',
            },
         ],
      },
      {
         heading: 'Apps de préstamos cuyo registro verificamos',
         blocks: [
            {
               type: 'paragraph',
               text: 'Consultamos el SIPRES de la CONDUSEF el 9 de noviembre de 2026. Estas tres apps aparecen con una empresa registrada y en operación:',
            },
            {
               type: 'table',
               head: ['App', 'Empresa registrada', 'Clave de registro', 'Supervisora', 'Ficha en Movapp'],
               rows: [
                  [
                     'Kueski',
                     'Kueski, S.A.P.I. de C.V., SOFOM, E.N.R.',
                     '694080',
                     'CONDUSEF',
                     '[Ficha de Kueski](/aplicaciones-prestamo/kueski/)',
                  ],
                  [
                     'Tala',
                     'Tala Mobile, S.A.P.I. de C.V., SOFOM, E.N.R.',
                     '695521',
                     'CONDUSEF',
                     '[Ficha de Tala](/aplicaciones-prestamo/tala/)',
                  ],
                  [
                     'Klar',
                     'Klar Technologies, S.A. de C.V., S.F.P.',
                     '27009',
                     'CNBV',
                     '[Ficha de Klar](/aplicaciones-prestamo/klar/)',
                  ],
               ],
            },
            {
               type: 'paragraph',
               text: '**Importante:** que una app esté en esta tabla significa que su registro existe y está vigente en la fecha de consulta. **No es una recomendación de contratar, ni una garantía sobre sus costos o su forma de cobrar.** Compara siempre el costo total y lee el contrato completo.',
            },
            {
               type: 'paragraph',
               text: 'En nuestro listado de [apps de préstamos reguladas y reportadas](/aplicaciones-prestamo/) explicamos cómo revisamos el estatus de cada una.',
            },
         ],
      },
      {
         heading: 'Lo que una app registrada sí te permite',
         blocks: [
            {
               type: 'paragraph',
               text: 'Aunque el registro no garantiza un buen trato, sí te da herramientas que no tienes con una app sin empresa detrás:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Puedes presentar una queja** ante la CONDUSEF.',
                  '**Sabes quién es la empresa** y dónde está.',
                  '**Tu comportamiento de pago queda en tu historial**, para bien si pagas a tiempo.',
               ],
            },
         ],
      },
      {
         heading: 'Si ya caíste con una app que no era confiable',
         blocks: [
            {
               type: 'paragraph',
               text: 'No estás solo. Guarda la evidencia, avisa a tus contactos y sigue los pasos de [qué hacer si caíste con una app montadeudas](/blog/que-hacer-con-apps-montadeudas/). Para ver cuáles son las apps sobre las que más reportes recibimos, consulta la [lista de montadeudas](/blog/lista-montadeudas/).',
            },
            {
               type: 'paragraph',
               text: 'Movapp es una organización que acompaña a víctimas de apps montadeudas. La revisión de tu caso es gratuita y sin compromiso; El Hack, el servicio para frenar el acoso, tiene costo (desde los $500 MXN) y [se solicita con un asesor](/el-hack/). **Quien ofrezca un préstamo a nombre de Movapp es un imitador.**',
            },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Qué apps de préstamos son confiables según la CONDUSEF?',
         a: 'La CONDUSEF no recomienda apps: mantiene un registro, el SIPRES, donde puedes comprobar si la empresa detrás de una app está registrada y en operación.',
      },
      {
         q: '¿Cómo sé si una app de préstamos es legal?',
         a: 'Busca la razón social de la app en el SIPRES. Si aparece con estatus «En operación» y sus datos coinciden con los de la app, tiene registro vigente.',
      },
      {
         q: '¿Las apps registradas pueden llamar a mis contactos?',
         a: 'No deberían: cobrar molestando a terceros no es un procedimiento correcto de cobranza. Si ocurre, puedes presentar una queja ante la CONDUSEF.',
      },
      {
         q: '¿Movapp presta dinero?',
         a: 'No. Movapp no otorga préstamos. Quien ofrezca un préstamo de Movapp es un imitador.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES, registros de Kueski (clave 694080), Tala Mobile (695521) y Klar Technologies (27009): [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
   ],
   related: ['fast-efectivo-es-confiable', 'ok-dinero-condusef', 'que-paso-fortaprest', 'prestamax-es-confiable'],
};
