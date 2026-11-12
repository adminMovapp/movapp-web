// ART-010 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_010: SeoArticleInput = {
   slug: 'kaby-es-montadeudas',
   title: '¿Kaby llama a tus contactos? Qué reportan las víctimas y cómo verificar su registro',
   metaTitle: '¿Kaby es confiable? Reportes y cómo verificarla | Movapp',
   metaDescription:
      '¿Kaby llama a tus contactos? Conoce qué reportan sus víctimas, cómo verificar su registro en la CONDUSEF y qué hacer si ya la instalaste.',
   ogTitle: '¿Kaby llama a tus contactos?',
   author: 'Dra. Dalia',
   publishDate: 'Noviembre 4, 2025',
   publishedAt: '2025-11-04T16:36:10+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Celular con llamadas entrantes de cobranza de una app de préstamos',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Sí, es lo que reportan las víctimas que atendemos: Kaby usa los datos de sus contactos para molestarlos y presionar el pago. **Antes de confiar en esta o en cualquier app de préstamos, verifica su registro en la CONDUSEF**: es gratis y toma un par de minutos. Aquí te decimos cómo.',
            },
         ],
      },
      {
         heading: '¿Kaby está registrada en la CONDUSEF? Verifícalo tú mismo',
         blocks: [
            {
               type: 'paragraph',
               text: 'Que una app esté en Google Play o en App Store no significa que tenga un registro vigente. Para comprobarlo:',
            },
            {
               type: 'orderedList',
               items: [
                  '**Busca la razón social.** Es el nombre legal de la empresa, y aparece en la ficha de la app en la tienda, en su sitio web o en el contrato.',
                  '**Entra al SIPRES** de la CONDUSEF y escribe esa razón social o el nombre comercial.',
                  '**Revisa el estatus.** Debe decir «En operación». Si dice «Cancelada», la empresa ya no tiene registro vigente.',
                  '**Compara los datos** de contacto del registro con los de la app.',
                  '**Mira si el registro tiene notas públicas.**',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si el resultado no te da confianza, no entregues tus datos. El paso a paso completo está en [cómo verificar una app en el SIPRES de la CONDUSEF](/blog/condusef-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Cómo saber si una aplicación es montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Desde hace varios años circulan en las tiendas apps de préstamo inmediato que, en lugar de ayudar, terminan en acoso. Las víctimas reportan incluso **depósitos que no solicitaron** y que después se les exige pagar con intimidación.',
            },
            {
               type: 'paragraph',
               text: 'Según los registros internos de Movapp, hemos identificado más de 1,300 aplicaciones de préstamos sobre las que recibimos reportes.',
            },
            {
               type: 'paragraph',
               text: 'Si ya descargaste una app de préstamo, fíjate si presenta alguna de estas señales:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Te prestó menos de lo que prometió.',
                  'Descontó los intereses de inmediato.',
                  'Empezó a cobrar al tercer día, o antes de la fecha de vencimiento.',
                  'Te pidió tus redes sociales con el pretexto de prestarte un monto más alto.',
                  'Si te atrasas, cobra con amenazas, groserías y hostigamiento, y te sugiere otros préstamos.',
                  'Te amenaza con tu lista de contactos y con «quemarte» en redes sociales.',
                  'Buscas información y solo encuentras malos comentarios.',
                  'Intentas hablar con ellos sobre la forma de cobrar y nadie responde.',
                  'La cobranza aumenta hasta convertirte en víctima.',
               ],
            },
            {
               type: 'paragraph',
               text: '**Si vives al menos dos de estas señales con una app de préstamo, es un problema serio.** Para detectarlas antes de instalar, lee [cómo identificar una app montadeudas](/blog/como-identificar-apps-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Kaby es montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'En Movapp recibimos casos de personas con problemas con Kaby. Lo que nos reportan es esto: **la app usa los datos de sus contactos para molestarlos y meter presión para que paguen.**',
            },
            {
               type: 'paragraph',
               text: 'Para eso no hace falta ningún programa oculto: basta con los permisos que la app pide al instalarse. Con ellos accede a tu agenda, tus fotos y tu ubicación. Usar esa información para intimidar o difamar no es un procedimiento legal de cobranza.',
            },
         ],
      },
      {
         heading: '¿Qué información usan los montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Estas apps buscan asegurar el pago con tu información. Las víctimas reportan que les descuentan buena parte del préstamo desde el inicio y que después la presión no tiene límite.',
            },
            { type: 'paragraph', text: 'Los datos que más valor tienen para un cobrador abusivo son:' },
            {
               type: 'unorderedList',
               items: [
                  'Tu lista de contactos.',
                  'La ubicación de tu casa y de tu trabajo.',
                  'Tus redes sociales.',
                  'Tu selfie.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Con eso les basta para hacer montajes con tu foto, crear grupos de WhatsApp para cobrarte y difamarte, o enviarte una imagen de tu fachada tomada de Google Maps para decirte que están afuera. Sobre esa amenaza, lee [¿los montadeudas van a tu casa?](/blog/montadeudas-van-a-tu-casa/).',
            },
         ],
      },
      {
         heading: '¿Qué hacer si Kaby llama a tus contactos?',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**Guarda evidencia** de mensajes, llamadas y grupos.',
                  '**Avisa a tus contactos** antes de que les escriban.',
                  '**Retira los permisos de la app** siguiendo los pasos de [qué hacer si descargaste una app montadeudas](/blog/que-hacer-si-descargaste-app-montadeudas/).',
                  '**Verifica antes de pagar.** Revisa [qué considerar antes de pagar a una app montadeudas](/blog/que-pasa-si-no-pagas-montadeudas/).',
                  '**Denuncia, si así lo decides.** Aquí está la guía de [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
               ],
            },
         ],
      },
      {
         heading: 'Cómo puede ayudarte Movapp',
         blocks: [
            {
               type: 'paragraph',
               text: 'En conclusión: según los reportes, Kaby sí llama a los contactos que obtuvo de tu teléfono.',
            },
            {
               type: 'paragraph',
               text: 'En Movapp la revisión de tu caso es gratuita y sin compromiso. Si aplica, **El Hack es el servicio de Movapp para frenar el acoso**: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio.' },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Kaby es confiable?',
         a: 'No la recomendamos: recibimos reportes de cobranza a contactos. Antes de usar cualquier app de préstamos, verifica su registro en la CONDUSEF.',
      },
      {
         q: '¿Kaby es legal?',
         a: 'Para saberlo, busca la razón social de la app en el SIPRES de la CONDUSEF y revisa que su estatus sea «En operación».',
      },
      {
         q: '¿Kaby está en la CONDUSEF?',
         a: 'Consulta su razón social en el SIPRES de la CONDUSEF y revisa el estatus que aparece hoy: puede cambiar con el tiempo.',
      },
      {
         q: '¿Qué pasa si no pago a Kaby?',
         a: 'Las víctimas reportan cobranza insistente y mensajes a sus contactos. Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'Google Play — ficha de «Kaby - Préstamos de crédito»: [https://play.google.com/store/apps/details?id=com.kaby](https://play.google.com/store/apps/details?id=com.kaby) (consultada el 9 de noviembre de 2026).',
      'Registros internos y reportes de víctimas atendidas por Movapp.',
   ],
   // 2026-11-11: wireframe del blog -- 3 tarjetas (sin hicredito-es-confiable).
   related: ['como-identificar-apps-montadeudas', 'mexdin-llama-contactos', 'montadeudas-redes-sociales'],
};
