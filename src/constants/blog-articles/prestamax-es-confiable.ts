// ART-001 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_001: SeoArticleInput = {
   slug: 'prestamax-es-confiable',
   title: '¿Prestamax es confiable? Lo que reportan las víctimas y qué hacer si ya la descargaste',
   metaTitle: '¿Prestamax es confiable? Reportes y qué hacer | Movapp',
   metaDescription:
      '¿Dudas si la app Prestamax es confiable? Conoce qué reportan sus víctimas, cómo verificarla en CONDUSEF y qué hacer si ya la descargaste.',
   ogTitle: '¿Prestamax es confiable? Lo que reportan las víctimas',
   author: 'Ricardo',
   publishDate: 'Enero 7, 2026',
   publishedAt: '2026-01-07T16:08:16+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona revisando en su celular una app de préstamos antes de descargarla',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: '**En Movapp no recomendamos descargar la app de préstamos Prestamax**. Las personas que nos han escrito por esta aplicación describen el patrón típico de una app montadeudas: acceso a contactos y fotos del teléfono, cobranza con amenazas y mensajes a familiares y compañeros de trabajo. Antes de pedir cualquier préstamo, verifica a la empresa en el registro oficial de la CONDUSEF. Si ya la descargaste, más abajo te explicamos qué hacer paso a paso.',
            },
            {
               type: 'paragraph',
               text: 'Según los registros internos de Movapp, en diciembre de 2025 nos escribieron 224 personas para preguntar si Prestamax es confiable.',
            },
            {
               type: 'callout',
               text: '**Aclaración importante:** este artículo habla de la **aplicación de préstamos** que aparece en tiendas de apps y publicidad como «Prestamax» o «Presta Max». En México existen otros negocios con nombres parecidos (financieras y casas de empeño con sucursales). No des por hecho que se trata de la misma empresa: revisa siempre la razón social que aparece en la app y en el contrato.',
            },
         ],
      },
      {
         heading: '¿Prestamax es una app montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Se conoce como «montadeudas» a las aplicaciones de préstamo que ofrecen montos bajos a plazos muy cortos y con costos muy altos, con frecuencia sin registro ni supervisión de las autoridades financieras. Al instalarse piden acceso a los contactos, las fotos y otros datos del teléfono, que después usan para presionar el pago con acoso y amenazas. En ciberseguridad se les conoce como «SpyLoan».',
            },
            {
               type: 'paragraph',
               text: 'En Movapp consideramos a Prestamax una app montadeudas porque los reportes que recibimos de sus víctimas coinciden con ese patrón:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Cobranza con amenazas e insultos, a veces antes de la fecha de pago.',
                  'Mensajes y llamadas a los contactos de la víctima para señalarla como «deudora».',
                  'Uso de fotos de la galería del teléfono para intimidar.',
                  'Montos a pagar que crecen sin una explicación clara.',
               ],
            },
            {
               type: 'paragraph',
               text: '**Esto es lo que nos reportan las víctimas; no todas las personas viven exactamente lo mismo.**',
            },
         ],
      },
      {
         heading: 'Cómo verificar si Prestamax (o cualquier app) está registrada',
         blocks: [
            {
               type: 'paragraph',
               text: 'Que una app esté en Google Play o en App Store **no significa que esté regulada**. Para comprobarlo:',
            },
            {
               type: 'orderedList',
               items: [
                  'Busca en la app, en su sitio web o en el contrato la **razón social** de la empresa (el nombre legal, no el nombre comercial).',
                  'Entra al **SIPRES** (Sistema de Registro de Prestadores de Servicios Financieros) de la CONDUSEF y busca esa razón social.',
                  'Si aparece, revisa que el estatus sea vigente y que los datos de contacto coincidan con los de la app. Hay apps que usan el nombre de una empresa registrada sin tener relación con ella.',
                  'Si no aparece, o los datos no coinciden, no entregues tu información.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Ten en cuenta que un registro en SIPRES no equivale a estar supervisado como un banco, ni garantiza buenas prácticas de cobranza: ese es el límite de [lo que la CONDUSEF puede hacer frente a los montadeudas](/blog/condusef-montadeudas/). **Es un primer filtro, no un sello de confianza.**',
            },
         ],
      },
      {
         heading: '¿Qué pasa si no pago a Prestamax?',
         blocks: [
            { type: 'paragraph', text: 'Las víctimas que atendemos describen una cobranza que escala rápido:' },
            {
               type: 'unorderedList',
               items: [
                  '**Llamadas y mensajes constantes**, con insultos y amenazas.',
                  '**Contacto con familiares, amistades y compañeros de trabajo**, a quienes les dicen que eres una persona deudora o les inventan acusaciones.',
                  '**Amenazas de ir a tu casa.** Un recurso frecuente de [los montadeudas que amenazan con ir a tu casa](/blog/montadeudas-van-a-tu-casa/) es enviarte una foto de tu fachada. Por lo que nos reportan las víctimas, esa imagen sale de Google Maps y busca asustarte. **No debes tener miedo: son amenazas falsas y no están afuera de tu casa.**',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si recibes una amenaza de este tipo, no actúes por impulso: guarda la evidencia como prueba.',
            },
            {
               type: 'paragraph',
               text: 'Sobre la deuda: **Movapp no elimina deudas ni modifica el historial crediticio**, y la decisión de pagar o no corresponde a cada persona. Lo que sí es claro es que **deber dinero no le da derecho a nadie a amenazarte, difamarte ni exponer tus datos**.',
            },
         ],
      },
      {
         heading: 'Qué hacer si ya descargaste Prestamax',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**Guarda evidencia.** Capturas de pantalla de mensajes, números desde los que te llaman, comprobantes de depósitos y pagos, y el nombre exacto de la app.',
                  '**Avisa tú primero a tus contactos.** Diles que pueden recibir mensajes falsos sobre ti y que no respondan ni paguen nada.',
                  '**Revisa los permisos de la app** en tu teléfono (contactos, fotos, ubicación, SMS) y retira los que puedas. En nuestra guía sobre [qué hacer si descargaste una app montadeudas](/blog/que-hacer-si-descargaste-app-montadeudas/) detallamos qué datos suelen tomar.',
                  '**Protege tus cuentas:** cambia contraseñas, activa la verificación en dos pasos y pon tus redes sociales en privado.',
                  '**No pidas otro préstamo para cubrir este.** Así empieza la «bola de nieve» de deudas con varias apps.',
                  '**Denuncia si así lo decides.** Puedes acudir a la Policía Cibernética de tu estado, a la fiscalía y reportar la app en la tienda donde la descargaste. En esta guía explicamos [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/) paso a paso.',
               ],
            },
         ],
      },
      {
         heading: 'Si necesitas un préstamo, busca alternativas verificadas',
         blocks: [
            {
               type: 'paragraph',
               text: 'Si estás considerando Prestamax porque necesitas dinero con urgencia, revisa primero [cómo identificar apps de préstamos confiables](/blog/apps-prestamos-confiables/) y nuestro listado de [apps de préstamos reguladas y reportadas](/aplicaciones-prestamo/); compara el costo total del crédito y lee el contrato completo antes de aceptar.',
            },
         ],
      },
      {
         heading: 'Cómo puede ayudarte Movapp',
         blocks: [
            {
               type: 'paragraph',
               text: 'Movapp es una organización que acompaña a víctimas de apps montadeudas con asesoría personalizada, apoyo psicológico y El Hack.',
            },
            {
               type: 'unorderedList',
               items: [
                  '**La revisión de tu caso es gratuita y sin compromiso.** Un asesor analiza tu situación y las apps involucradas, y te dice si El Hack aplica.',
                  '**El Hack es el servicio de Movapp para frenar el acoso**: las llamadas y mensajes de cobranza hacia ti y tus contactos. Es un servicio con costo, desde los $500 MXN según el número de apps. [El Hack se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago, y lo aplica el equipo técnico de Movapp.',
                  '**El apoyo psicológico es gratuito** y se solicita a través del asesor. No sustituye la atención de emergencia.',
               ],
            },
            {
               type: 'paragraph',
               text: '**Movapp no presta dinero, no cobra deudas y no es un despacho de abogados.**',
            },
         ],
      },
   ],
   faqHeading: 'Preguntas frecuentes sobre Prestamax',
   faqs: [
      {
         q: '¿Prestamax está en la CONDUSEF?',
         a: 'En nuestra consulta del 9 de noviembre de 2026 no encontramos en el SIPRES ninguna empresa con la denominación «Prestamax» ni «Presta Max». Eso no basta para concluir que no esté registrada: muchas apps operan con una razón social distinta a su nombre comercial. Busca la razón social en el contrato o en la app y consúltala en el SIPRES.',
      },
      {
         q: '¿Prestamax es legal?',
         a: 'Que una app esté disponible en una tienda de aplicaciones no la hace legal ni regulada. Lo que sí está prohibido, sin importar si existe una deuda, es cobrar con amenazas, difamación o usando tus datos personales y los de tus contactos.',
      },
      {
         q: '¿Prestamax puede ir a mi casa?',
         a: 'No. Es una amenaza para asustarte: te envían una foto de tu fachada sacada de Google Maps. En Movapp nunca hemos recibido un caso en el que la visita se haya cumplido.',
      },
      {
         q: '¿Movapp borra mi deuda con Prestamax?',
         a: 'No. Movapp no elimina deudas ni modifica el historial crediticio. El Hack sirve para frenar el acoso y proteger tu información; las decisiones sobre la deuda corresponden a cada persona.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES, Sistema de Registro de Prestadores de Servicios Financieros: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'Reportes de víctimas atendidas por Movapp.',
   ],
   related: ['fast-efectivo-es-confiable', 'ok-dinero-condusef', 'que-paso-fortaprest', 'apps-prestamos-confiables'],
};
