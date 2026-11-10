// ART-022 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_022: SeoArticleInput = {
   slug: 'que-es-movapp',
   title: '¿Qué es Movapp? Qué hace, qué no hace y cómo ayuda a víctimas de apps montadeudas',
   metaTitle: '¿Qué es Movapp? Qué hace y qué no hace | Movapp',
   metaDescription:
      'Movapp es una organización que acompaña a víctimas de apps montadeudas con asesoría, apoyo psicológico y El Hack. Conoce qué hace y qué no hace.',
   ogTitle: '¿Qué es Movapp?',
   author: 'Ricardo',
   publishDate: 'Noviembre 13, 2025',
   publishedAt: '2025-11-13T15:40:14+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Asesora de Movapp atendiendo por chat a una víctima de apps montadeudas',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Movapp es una organización que ayuda a víctimas de apps de préstamo que usan datos personales para cobrar con acoso y amenazas, conocidas en México como «montadeudas» y en ciberseguridad como «SpyLoan». Acompaña a cada víctima con asesoría personalizada, apoyo psicológico y El Hack, su servicio para frenar el acoso y proteger su información. **Movapp no presta dinero ni elimina deudas.**',
            },
         ],
      },
      {
         heading: '¿Por qué surge Movapp?',
         blocks: [
            {
               type: 'paragraph',
               text: '**Movapp nació en 2021**, cuando empezó a alertar públicamente sobre las apps montadeudas. Su origen está ligado a la pandemia, una etapa de crisis económica y desempleo en la que estas aplicaciones se multiplicaron.',
            },
            {
               type: 'paragraph',
               text: 'Su fundador es Erik Mann, quien también fue víctima de las apps montadeudas. Recurrió a este tipo de préstamos para enfrentar una emergencia financiera, porque eran fáciles y rápidos de obtener.',
            },
            {
               type: 'paragraph',
               text: 'Lo que siguió fue una experiencia de extorsión marcada por amenazas y hostigamiento: insultos, montajes y el miedo a que alguien llegara a su domicilio a hacerle daño. Erik la ha descrito como vivir un secuestro en su propia casa.',
            },
            {
               type: 'paragraph',
               text: 'Buscando salir de esa situación desarrolló lo que hoy es El Hack y comenzó a compartir información con otras personas que vivían lo mismo. De ahí surgió el movimiento que se convirtió en Movapp; aquí puedes leer [la historia completa de Erik Mann y Movapp](/blog/historia-movapp/).',
            },
         ],
      },
      {
         heading: '¿Qué son las apps montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Se conoce como «montadeudas» a las aplicaciones de préstamo que ofrecen montos bajos a plazos muy cortos y con costos muy altos, con frecuencia sin registro ni supervisión de las autoridades financieras. Al instalarse solicitan acceso a los contactos, las fotos y otros datos del teléfono, que después usan para presionar el pago.',
            },
            {
               type: 'paragraph',
               text: 'Estas son algunas de las prácticas que reportan las víctimas y que ayudan a [identificar una app montadeudas](/blog/como-identificar-apps-montadeudas/):',
            },
            {
               type: 'unorderedList',
               items: [
                  'El monto que entregan puede ser menor al solicitado y descuentan los intereses de inmediato.',
                  'La cobranza puede empezar al tercer día, o antes de la fecha de vencimiento.',
                  'Piden acceso a redes sociales con el argumento de ofrecer un monto mayor, y después usan esa información para difamar.',
                  'Ante un atraso, cobran con amenazas, insultos y hostigamiento.',
                  'Amenazan con contactar a las personas de la agenda o con exponer a la víctima en redes sociales.',
                  'Crean grupos de WhatsApp con contactos obtenidos del teléfono y les dicen a las referencias que quedaron como «avales».',
                  'Llaman y escriben de forma constante, desde muy temprano hasta la noche.',
                  'Amenazan con acudir al domicilio y hacer daño a la víctima o a su familia.',
                  'En algunos casos, depositan préstamos que la persona no solicitó.',
               ],
            },
         ],
      },
      {
         heading: '¿Qué hace Movapp? Sus servicios',
         blocks: [
            { type: 'subheading', text: 'Revisión del caso (gratuita)' },
            {
               type: 'paragraph',
               text: '**La revisión del caso es gratuita y sin compromiso.** Un asesor analiza la situación y las apps involucradas, informa si El Hack aplica y, antes de cualquier pago, explica qué incluye el servicio y cuánto cuesta.',
            },
            { type: 'subheading', text: 'El Hack (servicio con costo)' },
            {
               type: 'paragraph',
               text: 'El Hack es el servicio de Movapp para frenar el acoso de las apps montadeudas: las llamadas y mensajes de cobranza hacia la víctima y sus contactos. **Se solicita con un asesor, que confirma el alcance y el precio antes de empezar**, y lo aplica el equipo técnico de Movapp.',
            },
            { type: 'paragraph', text: '[El proceso de El Hack](/el-hack/) tiene tres etapas:' },
            {
               type: 'orderedList',
               items: [
                  'El asesor revisa el caso y las apps involucradas, incluidas las relacionadas.',
                  'El equipo técnico aplica El Hack.',
                  'El asesor da seguimiento y orienta a la víctima para conservar evidencia y, si así lo decide, denunciar.',
               ],
            },
            {
               type: 'paragraph',
               text: '**El costo de El Hack va desde los $500 MXN** y depende del número de apps involucradas en cada caso. El precio vigente por Hack está publicado en [la tienda de Movapp](/tienda/) y el asesor confirma el total antes de cualquier pago.',
            },
            { type: 'subheading', text: 'Apoyo psicológico (gratuito)' },
            {
               type: 'paragraph',
               text: 'Movapp ofrece apoyo psicológico gratuito, a cargo de psicólogos de su equipo, a las víctimas afectadas por el miedo y la presión de las amenazas. El acceso se solicita a través del asesor. **No sustituye la atención de emergencia.**',
            },
            { type: 'subheading', text: 'Información y prevención' },
            { type: 'paragraph', text: 'Además de atender casos, Movapp:' },
            {
               type: 'unorderedList',
               items: [
                  'Hace transmisiones en vivo en redes sociales y en YouTube.',
                  'Investiga cómo operan las aplicaciones, sus alcances y sus límites.',
                  'Imparte cursos y pláticas a instituciones públicas y privadas.',
                  'Participa, a través de Erik Mann, en [entrevistas con medios de comunicación](/prensa/) nacionales e internacionales.',
                  'Capacita de forma constante a sus colaboradores.',
               ],
            },
         ],
      },
      {
         heading: 'La app Movapp no es lo mismo que El Hack',
         blocks: [
            { type: 'paragraph', text: 'Son dos cosas distintas:' },
            {
               type: 'unorderedList',
               items: [
                  '**La app Movapp** es la aplicación oficial de la organización, disponible en Google Play y App Store. Tiene videos y contenido de Movapp, y una función para verificar que estás hablando con un asesor oficial.',
                  '**El Hack** es un servicio con costo que se solicita y se aplica con el acompañamiento de un asesor. No se «descarga» por tu cuenta.',
               ],
            },
         ],
      },
      {
         heading: '¿Qué no es Movapp?',
         blocks: [
            {
               type: 'unorderedList',
               items: [
                  '**No otorga préstamos.** Quien ofrezca un préstamo a nombre de Movapp es un imitador.',
                  '**No elimina deudas ni modifica el historial crediticio.** Las decisiones sobre la deuda corresponden a cada persona.',
                  '**No es un despacho de abogados** ni una reparadora de crédito.',
                  '**No cobra deudas** a nombre de nadie.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Como Movapp no otorga préstamos ni capta dinero del público, no es una entidad financiera y por eso no aparece en registros como el SIPRES de la CONDUSEF.',
            },
         ],
      },
      {
         heading: '¿Movapp es confiable?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Es una pregunta razonable, y te recomendamos hacerla sobre cualquier servicio. En otro artículo respondemos a fondo [qué tan confiable es Movapp](/blog/movapp-es-confiable/). Para evaluarlo por ti mismo:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Contacta solo por los **canales oficiales** y usa la app Movapp para verificar que hablas con un asesor oficial.',
                  'Pide que te expliquen **qué incluye el servicio y cuánto cuesta antes de pagar**. Así funciona la revisión del caso.',
                  'Desconfía de cualquiera que, a nombre de Movapp, te ofrezca un préstamo o te prometa borrar tu deuda.',
                  'Revisa los [testimonios de víctimas acompañadas por Movapp](/testimonios/) y las entrevistas públicas.',
               ],
            },
            { type: 'paragraph', text: '**Movapp ha acompañado a miles de víctimas de apps montadeudas.**' },
         ],
      },
      {
         heading: 'En pocas palabras',
         blocks: [
            {
               type: 'paragraph',
               text: 'Movapp es una organización que acompaña a víctimas de apps montadeudas. Con la revisión gratuita del caso, el apoyo psicológico y El Hack, busca ayudarte a frenar el acoso y a recuperar tu tranquilidad. Su lema, «El Hack hacia un nuevo inicio», resume esa idea: es posible volver a empezar después de esta experiencia.',
            },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Movapp es gratis?',
         a: 'La revisión del caso y el apoyo psicológico son gratuitos. El Hack es un servicio con costo: va desde los $500 MXN, depende del número de apps involucradas y el asesor confirma el total antes de cualquier pago.',
      },
      {
         q: '¿Movapp presta dinero?',
         a: 'No. Movapp no otorga préstamos. Quien ofrezca un préstamo de Movapp es un imitador.',
      },
      {
         q: '¿Movapp borra mi deuda?',
         a: 'No. Movapp no elimina deudas ni modifica el historial crediticio.',
      },
      {
         q: '¿Cuánto tarda El Hack?',
         a: 'El tiempo varía según la app y el número de apps involucradas. Las víctimas atendidas reportan que el acoso suele disminuir entre 7 y 14 días después de aplicar El Hack; en las primeras 48 horas todavía pueden llegar llamadas. **No es un plazo garantizado**: el asesor da un estimado para cada caso.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'Testimonio de Erik Mann sobre su experiencia.',
   ],
   related: ['historia-movapp', 'movapp-es-confiable', 'hack-movapp-es-confiable', 'hack-app-no-disponible'],
};
