// ART-020 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_020: SeoArticleInput = {
   slug: 'condusef-montadeudas',
   title: 'CONDUSEF vs los montadeudas: qué puede hacer, qué no y cómo verificar una app en el SIPRES',
   metaTitle: 'CONDUSEF y montadeudas: cómo verificar una app | Movapp',
   metaDescription:
      '¿Qué puede hacer la CONDUSEF frente a los montadeudas? Aprende a verificar una app de préstamos en el SIPRES y qué significa SOFOM E.N.R.',
   ogTitle: 'CONDUSEF vs los montadeudas',
   author: 'Dra. Dalia',
   publishDate: 'Noviembre 6, 2025',
   publishedAt: '2025-11-06T21:50:14+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona consultando el registro de la CONDUSEF en su computadora antes de pedir un préstamo en una app',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'La CONDUSEF protege y orienta a los usuarios de servicios financieros, pero **solo puede actuar frente a instituciones que forman parte del sistema financiero registrado**. Si la app que te cobra pertenece a una empresa registrada, puedes reclamar ante la CONDUSEF. Si no hay ninguna empresa registrada detrás, su margen es muy limitado. Por eso el primer paso es **buscar a la empresa en el SIPRES**.',
            },
         ],
      },
      {
         heading: '¿Todas las apps de préstamos están reguladas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'No. Mucha gente lo cree, pero no es así. Lo ideal sería que todas operaran bajo regulación y supervisión; en la práctica hay tres situaciones distintas, y conviene no confundirlas:',
            },
            {
               type: 'table',
               head: ['Situación', 'Qué significa', 'Ejemplo verificado en SIPRES (9 de noviembre de 2026)'],
               rows: [
                  [
                     'Empresa registrada y en operación',
                     'Existe legalmente y puedes reclamar ante la CONDUSEF. No garantiza una cobranza correcta',
                     'MexDin (Elaworld) y Credmex (Impulsa tu Rendimiento)',
                  ],
                  [
                     'Registro cancelado',
                     'La empresa tuvo registro y ya no lo tiene vigente',
                     'El estatus aparece como «Cancelada»',
                  ],
                  ['Sin registro localizable', 'No pudimos encontrar a ninguna empresa con ese nombre', 'Mexicash'],
               ],
            },
            {
               type: 'paragraph',
               text: 'Más detalle en nuestros artículos sobre [MexDin](/blog/mexdin-llama-contactos/), [Credmex](/blog/que-pasa-si-no-pago-credmex/) y [Kaby](/blog/kaby-es-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Qué funciones tiene la CONDUSEF?',
         blocks: [
            {
               type: 'unorderedList',
               items: [
                  'Proteger y defender los derechos e intereses de los usuarios de servicios financieros.',
                  'Brindar asesoría y orientación ante conflictos e irregularidades.',
                  'Supervisar el cumplimiento de las disposiciones aplicables a las instituciones financieras dentro de su ámbito.',
                  'Promover la educación financiera para que los usuarios tomen mejores decisiones.',
               ],
            },
         ],
      },
      {
         heading: '¿Y la CNBV? Funciones de la Comisión Nacional Bancaria y de Valores',
         blocks: [
            { type: 'paragraph', text: 'La CNBV tiene, entre sus principales objetivos:' },
            {
               type: 'unorderedList',
               items: [
                  'Supervisar y regular a las instituciones financieras, como bancos, casas de bolsa y sociedades de inversión.',
                  'Contribuir a prevenir delitos financieros, como el lavado de dinero y el financiamiento al terrorismo.',
                  'Promover la estabilidad del sistema financiero mexicano.',
                  'Emitir normas para que las instituciones financieras operen de manera segura y transparente.',
               ],
            },
            {
               type: 'paragraph',
               text: 'También participa en los procesos de autorización de instituciones financieras y realiza labores de inspección y vigilancia.',
            },
         ],
      },
      {
         heading: 'SOFOM E.N.R.: la figura detrás de muchas apps de préstamo',
         blocks: [
            {
               type: 'paragraph',
               text: 'Muchas apps de préstamo pertenecen a una **SOFOM E.N.R.** (Sociedad Financiera de Objeto Múltiple, Entidad No Regulada). Qué implica:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Está registrada** en el SIPRES y la CONDUSEF figura como su supervisora.',
                  '**No tiene la supervisión completa de la CNBV**, como sí la tiene un banco.',
                  '**Puede reportar a las sociedades de información crediticia**, si tiene contrato con ellas.',
               ],
            },
            {
               type: 'paragraph',
               text: 'En pocas palabras: **tener registro no es lo mismo que estar supervisado como un banco, y ninguna de las dos cosas garantiza una cobranza correcta.**',
            },
         ],
      },
      {
         heading: 'Cómo verificar una app de préstamos en el SIPRES, paso a paso',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**Encuentra la razón social.** Es el nombre legal de la empresa, no el nombre de la app. Búscala en la ficha de la app en la tienda, en su sitio web o en el contrato.',
                  '**Entra al SIPRES** de la CONDUSEF y escribe esa razón social, o el nombre comercial.',
                  '**Revisa el estatus.** Debe decir «En operación». Si dice «Cancelada», la empresa ya no tiene registro vigente.',
                  '**Compara los datos.** El domicilio, el teléfono y el correo del registro deben coincidir con los de la app. Hay apps que usan el nombre de una empresa registrada sin tener relación con ella.',
                  '**Mira si hay notas públicas** o avisos en el registro.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si la app no pasa esta revisión, no entregues tus datos. Y si quieres comparar opciones, revisa [cómo identificar apps de préstamos confiables](/blog/apps-prestamos-confiables/) y nuestro listado de [apps de préstamos reguladas y reportadas](/aplicaciones-prestamo/).',
            },
         ],
      },
      {
         heading: '¿Por qué se les llama aplicaciones montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Se les llama así por su modelo de operación: generan o «montan» deudas que crecen hasta volverse impagables. En México son una problemática social importante.',
            },
            {
               type: 'paragraph',
               text: 'Estas aplicaciones se aprovechan de la necesidad económica de las personas y recurren a prácticas de cobranza excesivas o abusivas, fuera de los procedimientos establecidos. **Eso repercute en la vida financiera, familiar, personal, social y laboral de las víctimas.**',
            },
         ],
      },
      {
         heading: '¿Por qué es tan difícil combatirlas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'La CONDUSEF, la CNBV, la PROFECO y la Policía Cibernética tienen facultades distintas para orientar, supervisar o atender ciertos casos. Aun así, combatir a las apps montadeudas es complejo:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Funcionan por internet y, en algunos casos, fuera del sistema financiero registrado.',
                  'Pueden ser difíciles de identificar, investigar y sancionar.',
                  'Algunas se presentan como servicios legítimos o usan registros y otros elementos para aparentar confianza.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Por eso no basta con confiar en lo que dice la app o su publicidad: hay que verificar. Y si ya tienes un problema, en esta guía están [todos los canales para denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Cómo salir de los montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'No todo son malas noticias. Hay organizaciones que se formaron para atender esta problemática.',
            },
            {
               type: 'paragraph',
               text: 'Movapp acompaña a víctimas de apps montadeudas desde 2021: comparte información preventiva y aclara dudas sobre este tipo de aplicaciones. Las autoridades, por su parte, siguen trabajando en medidas y regulaciones para combatir estas prácticas.',
            },
            {
               type: 'paragraph',
               text: 'En Movapp la revisión de tu caso es gratuita y sin compromiso. Si aplica, El Hack es el servicio para frenar el acoso: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio.' },
         ],
      },
   ],
   faqs: [
      {
         q: '¿La CONDUSEF puede ayudarme con una app montadeudas?',
         a: 'Si la app pertenece a una empresa registrada, puedes presentar una reclamación. Si no hay empresa registrada, la CONDUSEF tiene muy poco margen y conviene acudir también a la Policía Cibernética o a la fiscalía.',
      },
      {
         q: '¿Qué es el SIPRES?',
         a: 'Es el Sistema de Registro de Prestadores de Servicios Financieros de la CONDUSEF. Ahí puedes consultar si una empresa financiera está registrada y cuál es su estatus.',
      },
      {
         q: '¿Si una app está en el SIPRES es confiable?',
         a: 'No necesariamente. El registro indica que la empresa existe legalmente; no avala sus costos ni su forma de cobrar.',
      },
      {
         q: '¿Cuál es la diferencia entre la CONDUSEF y la CNBV?',
         a: 'La CONDUSEF orienta y defiende a los usuarios; la CNBV supervisa y regula a las instituciones financieras, como los bancos.',
      },
   ],
   sourcesList: [
      'CONDUSEF — sitio oficial: [https://www.condusef.gob.mx/](https://www.condusef.gob.mx/) · SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultados el 9 de noviembre de 2026).',
      'CNBV: [https://www.gob.mx/cnbv](https://www.gob.mx/cnbv) (consultado el 9 de noviembre de 2026).',
      'Consultas a SIPRES sobre MexDin, Credmex y Mexicash (9 de noviembre de 2026; evidencia interna del proyecto).',
   ],
   // 2026-11-11: wireframe del blog -- 3 tarjetas (sin que-hacer-si-descargaste-app-montadeudas).
   related: ['como-denunciar-montadeudas', 'que-pasa-si-no-pagas-montadeudas', 'que-hacer-con-apps-montadeudas'],
};
