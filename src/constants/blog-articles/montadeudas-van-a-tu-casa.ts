// ART-009 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
// La versión nueva ya no trae la segunda imagen de cuerpo (placeholder).
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_009: SeoArticleInput = {
   slug: 'montadeudas-van-a-tu-casa',
   title: '¿Los montadeudas van a tu casa? Qué hay detrás de la amenaza y qué hacer',
   metaTitle: '¿Los montadeudas van a tu casa? Qué hacer | Movapp',
   metaDescription:
      '¿Te amenazan con ir a tu domicilio? Conoce de dónde sale la foto de tu casa, si pueden embargarte y qué hacer paso a paso para protegerte.',
   ogTitle: '¿Los montadeudas van a tu casa?',
   author: 'Ricardo',
   publishDate: 'Diciembre 8, 2025',
   publishedAt: '2025-12-08T19:46:42+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona mirando en su celular una foto de la fachada de su casa enviada por un cobrador',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'No. **Los montadeudas no van a tu casa.** Es una amenaza para asustarte y que pagues: en Movapp nunca hemos recibido un caso en el que la visita se haya cumplido. Quédate a leer y te contamos qué hay detrás y qué hacer.',
            },
         ],
      },
      {
         heading: '¿Cómo operan los montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Cuando instalas una app montadeudas y le das permisos, accede a la información de tu teléfono: los contactos de tu agenda y las imágenes de tu galería.',
            },
            {
               type: 'paragraph',
               text: 'Las víctimas reportan que **usan los contactos para llamarlos y hacer acusaciones falsas**: llegan a decir que la persona es delincuente, y cosas peores. Con las fotos hacen montajes para difamar.',
            },
            {
               type: 'paragraph',
               text: 'Todo eso busca una sola cosa: que pagues. Y no se limitan a eso. **Si conocen tu domicilio**, porque lo entregaste en un documento, también lo usan para intimidarte.',
            },
         ],
      },
      {
         heading: 'La foto de tu casa: de dónde sale',
         blocks: [
            {
               type: 'paragraph',
               text: 'Cuando conocen tu dirección, usan Google Maps o Google Earth, que permiten ver un mapa virtual de casi todo el planeta. **Capturan una imagen de tu fachada y te la envían diciendo que están afuera.**',
            },
            {
               type: 'paragraph',
               text: 'Así funciona el engaño. **La realidad es que no están afuera de tu casa**: es una captura que cualquiera puede obtener con tu dirección.',
            },
            {
               type: 'paragraph',
               text: 'Una pista útil: compara la foto con cómo se ve hoy tu calle. Las imágenes de los mapas suelen tener meses o años de antigüedad, y a veces muestran un coche, un árbol o una fachada que ya cambió.',
            },
         ],
      },
      {
         heading: '¿Pueden embargarte o quitarte tus cosas?',
         blocks: [
            {
               type: 'paragraph',
               text: '**Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio.** Un cobrador no puede presentarse a llevarse tus pertenencias porque lo diga un mensaje de WhatsApp, y nadie puede entrar a tu casa sin una orden.',
            },
            {
               type: 'paragraph',
               text: 'Si la app pertenece a una empresa registrada, lo que sí puede ocurrir es que reporte tu atraso a una sociedad de información crediticia. Eso es muy distinto de un embargo. Lo explicamos en [qué pasa si no pagas a una app montadeudas](/blog/que-pasa-si-no-pagas-montadeudas/).',
            },
         ],
      },
      {
         heading: 'Qué hacer si te amenazan con ir a tu casa',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**No respondas a la provocación.** No discutas ni amenaces de vuelta.',
                  '**Guarda la evidencia:** captura del mensaje, la foto que te enviaron y el número.',
                  '**Avisa en casa.** Que tu familia sepa lo que pasa y que no abra ni dé información a desconocidos.',
                  '**No pagues por miedo.** Pagar bajo amenaza no garantiza que la presión termine.',
                  '**Ante cualquier emergencia**, llama al 911.',
                  '**Denuncia, si así lo decides.** Las amenazas pueden constituir un delito; aquí está la guía de [cómo denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
               ],
            },
            {
               type: 'paragraph',
               text: 'Estas amenazas suelen venir acompañadas de otra: publicar cosas sobre ti. Sobre eso, lee [si las apps montadeudas pueden publicar en tus redes sociales](/blog/montadeudas-redes-sociales/).',
            },
         ],
      },
      {
         heading: '¿Te están intimidando los montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'En Movapp recibimos a diario casos de personas que llegan con mucho miedo porque creen que los cobradores irán a su casa.',
            },
            {
               type: 'paragraph',
               text: 'Solo son amenazas. Aun así, **pueden afectarte mucho**: en tu vida, en tu trabajo y en tus relaciones. No tienes que cargarlo solo. Movapp ofrece apoyo psicológico gratuito, que se solicita a través del asesor y no sustituye la atención de emergencia.',
            },
            {
               type: 'paragraph',
               text: 'En Movapp la revisión de tu caso es gratuita y sin compromiso. Si aplica, El Hack es el servicio para frenar el acoso: las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago.',
            },
            {
               type: 'paragraph',
               text: '**Movapp ha acompañado a miles de víctimas de apps montadeudas.** No elimina deudas ni modifica el historial crediticio.',
            },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Los montadeudas van a tu domicilio?',
         a: 'No. En Movapp nunca hemos recibido un caso en el que la visita se haya cumplido: la amenaza busca asustarte para que pagues.',
      },
      {
         q: '¿Cómo saben dónde vivo?',
         a: 'Por los datos que entregaste al registrarte, como tu INE o un comprobante de domicilio, o por la ubicación a la que la app tuvo acceso.',
      },
      {
         q: '¿Me pueden embargar por una deuda con una app?',
         a: 'Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio. Un cobrador no puede embargarte por mensaje ni por llamada.',
      },
      {
         q: '¿Qué hago si me mandan una foto de mi casa?',
         a: 'Guárdala como evidencia, no respondas y avisa a tu familia. Esas imágenes suelen obtenerse de mapas en línea.',
      },
   ],
   sourcesList: [
      'Casos atendidos por Movapp.',
      '911, número de emergencias: [https://www.gob.mx/911](https://www.gob.mx/911) (consultado el 9 de noviembre de 2026).',
   ],
   related: [
      'como-identificar-apps-montadeudas',
      'mexdin-llama-contactos',
      'hicredito-es-confiable',
      'kaby-es-montadeudas',
   ],
};
