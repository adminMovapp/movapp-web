// ART-018 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_018: SeoArticleInput = {
   slug: 'que-hacer-si-descargaste-app-montadeudas',
   title: '¿Descargaste una app montadeudas? Qué hacer paso a paso para proteger tus datos',
   metaTitle: '¿Descargaste una app montadeudas? Qué hacer | Movapp',
   metaDescription:
      'Si descargaste una app montadeudas, sigue estos pasos: guarda evidencia, retira permisos, avisa a tus contactos y aprende cómo pedir que eliminen tus datos.',
   ogTitle: '¿Descargaste una app montadeudas? Qué hacer paso a paso',
   author: 'Dra. Dalia',
   publishDate: 'Octubre 16, 2025',
   publishedAt: '2025-10-16T16:44:01+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Manos sosteniendo un celular en la pantalla de permisos de una aplicación',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Si ya descargaste una app de préstamos señalada como montadeudas, actúa en este orden: **no aceptes ni pidas el préstamo, guarda evidencia, retira los permisos de la app, avisa a tus contactos y protege tus cuentas**. Desinstalarla ayuda, pero no borra los datos que ya copió. Si empiezan a cobrarte con amenazas, busca orientación cuanto antes.',
            },
         ],
      },
      {
         heading: 'Por qué terminamos en una app de préstamos',
         blocks: [
            {
               type: 'paragraph',
               text: 'Cuando hay una emergencia económica, lo primero que pensamos es en pedir prestado. Las opciones de siempre son estas:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Pedir un adelanto o un préstamo en el trabajo.',
                  'Pedirle dinero a un familiar.',
                  'Solicitar un crédito bancario.',
                  'Y, ahora, pedirlo en una aplicación de préstamo inmediato.',
               ],
            },
            {
               type: 'paragraph',
               text: 'En una emergencia, decidimos por la facilidad. Pedir en el trabajo implica trámites y que tu jefe o tus compañeros se enteren. Pedirle a un familiar o a un amigo te expone a críticas y a un posible «no», aunque la confianza ayude. El banco pide requisitos que no siempre tenemos: comprobar ingresos, buen historial, tiempo.',
            },
            {
               type: 'paragraph',
               text: 'Cuando se trata de la salud o de la pérdida del empleo, **necesitamos algo fácil y rápido**. Ahí es donde las aplicaciones de préstamos nos bombardean con publicidad y nos muestran un mundo casi perfecto: dinero seguro, en minutos, solo con tu INE.',
            },
            {
               type: 'paragraph',
               text: '¿Qué hay detrás de esa facilidad? Muchas de las personas que recurrimos a estos préstamos lo descubrimos en menos de una semana: acoso, intereses que no eran los prometidos y fechas de pago que cambian. Te explicamos el fenómeno completo en [qué son las apps montadeudas](/blog/que-hacer-con-apps-montadeudas/).',
            },
         ],
      },
      {
         heading: 'Qué datos obtiene una app montadeudas',
         blocks: [
            {
               type: 'paragraph',
               text: 'Nadie presta dinero sin una garantía. En estas apps, **la garantía son tus datos personales**: los que entregas tú y los que la app toma con los permisos que aceptas al instalarla. Incluso si solo hiciste una simulación.',
            },
            { type: 'paragraph', text: 'Estos son los datos que suelen obtener:' },
            {
               type: 'unorderedList',
               items: [
                  'Número de teléfono celular y de casa.',
                  'INE o DNI, con tu domicilio.',
                  'Selfies tomadas desde distintos ángulos.',
                  'Dirección y datos de contacto de tu trabajo.',
                  'Teléfonos de al menos dos referencias.',
                  'Redes sociales, que algunas piden para «aumentar el monto».',
                  'Registro de tus llamadas más frecuentes.',
                  'Contenido de tus mensajes SMS.',
                  'Tu lista de contactos.',
               ],
            },
         ],
      },
      {
         heading: 'Qué hacer si ya descargaste la app: paso a paso',
         blocks: [
            { type: 'subheading', text: '1. No aceptes ni pidas el préstamo' },
            {
               type: 'paragraph',
               text: 'Si solo la instalaste para ver las condiciones, no avances. Si te ofrecen un monto «preaprobado», no lo aceptes.',
            },
            { type: 'subheading', text: '2. Guarda evidencia antes de borrar nada' },
            {
               type: 'paragraph',
               text: 'Toma capturas de la app, de su ficha en la tienda, de los permisos que pidió, de los mensajes y de cualquier depósito. **Hazlo antes de desinstalarla.**',
            },
            { type: 'subheading', text: '3. Retira los permisos de la app' },
            {
               type: 'unorderedList',
               items: [
                  '**En Android:** Ajustes › Aplicaciones › elige la app › Permisos. Desactiva contactos, archivos y fotos, SMS, teléfono, ubicación, cámara y micrófono.',
                  '**En iPhone:** Configuración › Privacidad y seguridad. Entra a cada categoría (Contactos, Fotos, Localización) y quita el acceso a la app.',
               ],
            },
            { type: 'subheading', text: '4. Desinstala la app' },
            {
               type: 'paragraph',
               text: 'Hazlo después de guardar la evidencia. Ten claro que **desinstalar evita que siga accediendo a tu teléfono, pero no borra los datos que ya copió**. Si la app ya ni siquiera aparece en la tienda, lee [qué pasa cuando una app de préstamos desaparece de Play Store o App Store](/blog/hack-app-no-disponible/).',
            },
            { type: 'subheading', text: '5. Avisa a tus contactos' },
            {
               type: 'paragraph',
               text: 'Diles que pueden recibir llamadas o mensajes falsos sobre ti, que no respondan y que no paguen nada. **Cuando tus contactos ya saben lo que pasa, la amenaza pierde fuerza.**',
            },
            { type: 'subheading', text: '6. Protege tus cuentas' },
            {
               type: 'paragraph',
               text: 'Cambia tus contraseñas, activa la verificación en dos pasos y pon tus redes sociales en privado. Aquí explicamos [si las apps montadeudas pueden publicar en tus redes sociales](/blog/montadeudas-redes-sociales/).',
            },
            { type: 'subheading', text: '7. Si te depositaron sin pedirlo' },
            {
               type: 'paragraph',
               text: 'No gastes ese dinero. Guarda el comprobante del depósito y busca orientación antes de mover o devolver nada. Antes de hacer cualquier pago, revisa [qué considerar antes de pagar a una app montadeudas](/blog/que-pasa-si-no-pagas-montadeudas/).',
            },
            { type: 'subheading', text: '8. Denuncia, si así lo decides' },
            {
               type: 'paragraph',
               text: 'Puedes acudir a la Policía Cibernética del estado donde vives; busca su teléfono o correo en el sitio oficial. Si resides en otro país de Latinoamérica, consulta los canales oficiales de tus autoridades. En esta guía están todos los canales para [denunciar a los montadeudas](/blog/como-denunciar-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Cómo eliminar mis datos de una app de préstamos?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Es una de las dudas más buscadas, y la respuesta honesta es que **no hay un botón para borrar lo que ya se llevaron**. Lo que sí puedes hacer:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Cortar el acceso:** retirar permisos y desinstalar (pasos 3 y 4).',
                  '**Pedir la eliminación:** si la app pertenece a una empresa identificable, la ley mexicana de protección de datos personales te da derecho a solicitarle la cancelación de tus datos (los llamados derechos ARCO). Busca el aviso de privacidad de la app: ahí debe decir a quién dirigir la solicitud.',
                  '**Reducir el daño:** avisar a tus contactos y proteger tus cuentas (pasos 5 y 6).',
               ],
            },
            {
               type: 'paragraph',
               text: 'Con apps que no tienen una empresa real detrás, la solicitud formal difícilmente tendrá respuesta. Por eso los pasos de protección importan tanto.',
            },
         ],
      },
      {
         heading: 'Cómo puede ayudarte Movapp',
         blocks: [
            {
               type: 'paragraph',
               text: 'Si ya empezaron a cobrarte con amenazas o a molestar a tus contactos, busca ayuda lo antes posible: la «bola de nieve» de estos préstamos puede volverse una pesadilla constante.',
            },
            {
               type: 'paragraph',
               text: 'En Movapp, **la revisión de tu caso es gratuita y sin compromiso**. Un asesor analiza tu situación y las apps involucradas, y te dice si El Hack aplica. El Hack es el servicio de Movapp para frenar el acoso; tiene costo, va desde los $500 MXN según el número de apps, y [se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago. Además, el asesor te da recomendaciones para seguir paso a paso.',
            },
            { type: 'paragraph', text: 'Movapp no elimina deudas ni modifica el historial crediticio.' },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Qué pasa si solo descargué la app y no pedí el préstamo?',
         a: 'Si le diste permisos, la app pudo acceder a tus contactos y a otros datos. Retira los permisos, desinstálala y avisa a tus contactos.',
      },
      {
         q: '¿Si desinstalo la app se borran mis datos?',
         a: 'No. Desinstalar evita que siga accediendo a tu teléfono, pero no elimina los datos que ya copió.',
      },
      {
         q: '¿Debo cambiar de número de teléfono?',
         a: 'Puede darte un respiro, pero no evita que usen la información que ya obtuvieron de tus contactos.',
      },
      {
         q: '¿Dónde denuncio a una app de préstamos?',
         a: 'En la Policía Cibernética de tu estado y en la fiscalía. También puedes reportar la app en la tienda donde la descargaste.',
      },
   ],
   sourcesList: [
      'Policía Cibernética, SSC CDMX: [https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica](https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica) (consultado el 9 de noviembre de 2026).',
      'Reportes de víctimas atendidas por Movapp.',
   ],
   related: [
      'como-denunciar-montadeudas',
      'condusef-montadeudas',
      'que-pasa-si-no-pagas-montadeudas',
      'que-hacer-con-apps-montadeudas',
   ],
};
