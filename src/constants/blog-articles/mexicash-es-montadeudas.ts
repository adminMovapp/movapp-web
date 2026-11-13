// ART-016 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_016: SeoArticleInput = {
   slug: 'mexicash-es-montadeudas',
   title: '¿Mexicash molesta a tus contactos? Qué reportan las víctimas, si es confiable y qué hacer',
   metaTitle: '¿Mexicash es confiable? Reportes y qué hacer | Movapp',
   metaDescription:
      '¿Mexicash molesta a tus contactos? Conoce qué reportan sus víctimas, por qué no la encontramos en CONDUSEF y qué hacer si ya la instalaste.',
   ogTitle: '¿Mexicash molesta a tus contactos?',
   author: 'Ricardo',
   publishDate: 'Septiembre 25, 2025',
   publishedAt: '2025-09-25T18:08:12+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona recibiendo en su celular mensajes de cobranza dirigidos a sus contactos',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Es lo que reportan sus víctimas. Las personas que nos escriben por Mexicash describen **mensajes y llamadas a sus contactos para exigir el pago**, a veces incluso sin haber solicitado un préstamo. En nuestra consulta del 9 de noviembre de 2026 **no encontramos a Mexicash en el registro de la CONDUSEF**. Si ya la instalaste, más abajo te decimos qué hacer.',
            },
            {
               type: 'paragraph',
               text: 'Mexicash es una aplicación que presta dinero con facilidad. Después, según los reportes, llegan cobros mayores a los esperados y, antes de que te des cuenta, **la presión para pagar**. En Movapp conocemos cómo funcionan estas apps y podemos orientarte.',
            },
         ],
      },
      {
         heading: '¿Qué ofrece Mexicash?',
         blocks: [
            { type: 'paragraph', text: 'Según la información que la propia app publica:' },
            {
               type: 'unorderedList',
               items: [
                  'Préstamos de hasta $50,000 pesos.',
                  'Plazo de pago de hasta 360 días.',
                  'Tasa de interés anual máxima de 32 %.',
                  'Una comisión que va de $48 a $180 pesos.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Su ficha en Google Play indica más de 10 millones de descargas y un plazo de 91 a 360 días.',
            },
            {
               type: 'paragraph',
               text: 'En el papel, la tasa parece baja. **Las quejas apuntan a otra cosa**: montos a pagar mucho más altos que el dinero recibido.',
            },
            {
               type: 'paragraph',
               text: 'Al instalar Mexicash aceptas darle permisos para acceder a información de tu celular. Las víctimas reportan que esa información se usa de forma indebida: **incluso sin haber solicitado un préstamo**, la app puede empezar a escribir o llamar a tus contactos para exigir el pago de una supuesta deuda.',
            },
         ],
      },
      {
         heading: '¿Mexicash está en la CONDUSEF? ¿Es legal?',
         blocks: [
            {
               type: 'paragraph',
               text: '**No la encontramos.** En la consulta que hicimos al SIPRES el 9 de noviembre de 2026, no aparece ninguna empresa con la denominación ni el nombre corto «Mexicash». Tampoco aparece «Iinchoi, S.A.P.I. de C.V.», la razón social que figura en la ficha de la app en Google Play.',
            },
            {
               type: 'paragraph',
               text: 'Eso no prueba por sí solo que sea ilegal: la app podría operar con otra razón social que no localizamos. Pero sí significa que **no pudimos confirmar que tenga el respaldo de una entidad registrada**, y que ante un problema sería más difícil reclamar ante la CONDUSEF.',
            },
            {
               type: 'paragraph',
               text: 'Por eso, distintas fuentes y autoridades recomiendan no instalar apps de préstamos que no puedas verificar y, si necesitas dinero, acudir a instituciones registradas. Aquí explicamos [cómo verificar una app en el registro de la CONDUSEF](/blog/condusef-montadeudas/).',
            },
         ],
      },
      {
         heading: 'Modelo de operación: lo que dicen las quejas',
         blocks: [
            {
               type: 'unorderedList',
               items: [
                  '**Préstamo automático.** Un patrón común en las quejas: con solo descargar la app y llenar los datos para «simular» o «ver» el monto, la app aprueba el préstamo y deposita el dinero, y después exige pagarlo.',
                  '**Montos desproporcionados.** Lo que se paga es mucho más de lo recibido, a veces casi el doble, por comisiones e intereses. Una víctima reportó haber recibido $1,500 pesos y tener que pagar $2,580. En Movapp vemos casos así con frecuencia.',
                  '**Plazos muy cortos.** El tiempo para pagar es reducido, lo que genera presión y abre la puerta a la cobranza abusiva.',
                  '**Difusión de información personal.** Opiniones de usuarios y notas de medios coinciden en señalar técnicas de intimidación con datos personales.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si te pasó lo del depósito que no pediste, hay más detalle en nuestra [ficha de Mexicash](/aplicaciones-prestamo/mexicash/ "Ficha de Mexicash: información y reportes de víctimas").',
            },
         ],
      },
      {
         heading: '¿Qué pasa si no pago a Mexicash?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Lo que reportan las víctimas es una cobranza que escala: llamadas, mensajes y contacto con tus familiares y compañeros de trabajo. Sobre lo demás:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Historial crediticio.** Solo las empresas con contrato con una sociedad de información crediticia pueden reportarte. Como no localizamos el registro de Mexicash, no pudimos confirmar si reporta.',
                  '**Embargo.** Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio.',
               ],
            },
            {
               type: 'paragraph',
               text: 'La decisión sobre la deuda es tuya. Antes de pagar, y sobre todo si te depositaron sin pedirlo, revisa [qué considerar antes de pagar a una app montadeudas](/blog/que-pasa-si-no-pagas-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Qué hacer si ya caíste con Mexicash u otra app de préstamos?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Recuerda que no estás solo: muchas personas han pasado por lo mismo. **Lo más importante es mantener la calma y no ceder ante las amenazas.**',
            },
            {
               type: 'orderedList',
               items: [
                  '**Guarda evidencia** de mensajes, llamadas y depósitos.',
                  '**Avisa a tus contactos** de que pueden recibir mensajes falsos sobre ti.',
                  '**Retira los permisos de la app.** El paso a paso está en [qué hacer si descargaste una app montadeudas](/blog/que-hacer-si-descargaste-app-montadeudas/).',
                  '**Denuncia, si así lo decides.** Consulta [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
                  '**Si la presión es muy grande, busca orientación.** En Movapp la revisión de tu caso es gratuita y sin compromiso.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si aplica a tu caso, El Hack es el servicio de Movapp para frenar el acoso: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio.' },
            {
               type: 'paragraph',
               text: 'Si tu problema es con otra app, también escribimos sobre [MexDin](/blog/mexdin-llama-contactos/), [Credmex](/blog/que-pasa-si-no-pago-credmex/) y [Fortaprest](/blog/que-paso-fortaprest/).',
            },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Mexicash es montadeudas?',
         a: 'En Movapp recibimos reportes de cobranza con acoso y de depósitos no solicitados relacionados con Mexicash, que son conductas típicas de las apps montadeudas.',
      },
      {
         q: '¿Mexicash es confiable?',
         a: 'No pudimos encontrarla en el registro de la CONDUSEF y acumula quejas por su forma de cobrar. No la recomendamos.',
      },
      {
         q: '¿Mexicash está registrada en la CONDUSEF?',
         a: 'En nuestra consulta del 9 de noviembre de 2026 no apareció en el SIPRES, ni por su nombre ni por la razón social de su ficha en Google Play.',
      },
      {
         q: '¿Qué hago si Mexicash me depositó sin pedirlo?',
         a: 'No gastes ese dinero, guarda el comprobante del depósito y busca orientación antes de mover o devolver nada.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026; sin coincidencias para «Mexicash» ni «Iinchoi»).',
      'Google Play — ficha de «MexiCash-Préstamos de crédito»: [https://play.google.com/store/apps/details?id=com.mexicash.app](https://play.google.com/store/apps/details?id=com.mexicash.app) (consultada el 9 de noviembre de 2026).',
      'Reportes de víctimas atendidas por Movapp.',
   ],
   // 2026-11-11: wireframe del blog -- 3 tarjetas (sin cobranza-starpresta).
   related: ['como-identificar-apps-montadeudas', 'estrategias-montadeudas', 'montadeudas-van-a-tu-casa'],
};
