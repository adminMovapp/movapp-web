// ART-006 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_006: SeoArticleInput = {
   slug: 'que-paso-fortaprest',
   title: '¿Qué pasó con Fortaprest? Por qué desapareció, por qué volvió y qué pasa si no pagas',
   metaTitle: '¿Qué pasó con Fortaprest? Qué pasa si no pagas | Movapp',
   metaDescription:
      'Fortaprest salió de las tiendas y volvió. Conoce qué reportan sus víctimas, cómo verificar su registro y qué pasa si no pagas.',
   ogTitle: '¿Qué pasó con Fortaprest? Lo que reportan sus víctimas',
   author: 'Ricardo',
   publishDate: 'Septiembre 25, 2025',
   publishedAt: '2025-09-25T16:29:30+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Celular con una app de préstamos y notificaciones de cobranza',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Fortaprest es una app de préstamos en línea que estuvo unos días fuera de las tiendas de aplicaciones y después volvió a aparecer. **Que una app salga de la tienda no cancela los préstamos ni frena la cobranza**: las víctimas que atendemos en Movapp nos reportaron que los cobros y las amenazas siguieron igual. Aquí te explicamos qué sabemos, qué está por confirmar y qué puedes hacer.',
            },
         ],
      },
      {
         heading: '¿Por qué desapareció Fortaprest de Play Store y App Store?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Muchas personas nos preguntan qué pasó con la aplicación Fortaprest: por qué dejó de estar disponible algunos días y por qué después volvió a aparecer en Google Play y en App Store, e incluso instalada otra vez en algunos teléfonos.',
            },
            {
               type: 'paragraph',
               text: 'No conocemos el motivo exacto, porque ni las tiendas ni la app lo han explicado públicamente. Lo que sí vemos con frecuencia en apps de este tipo es este ciclo: se acumulan reportes y malas calificaciones, la app sale de la tienda y más tarde regresa, a veces con cambios en su nombre o en su imagen.',
            },
            {
               type: 'paragraph',
               text: 'Lo importante para ti: **si la app desaparece de la tienda, la deuda y la cobranza no desaparecen con ella.** Incluso es posible [aplicar El Hack cuando la app ya no está en Play Store o App Store](/blog/hack-app-no-disponible/).',
            },
         ],
      },
      {
         heading: 'Qué reportan las víctimas de Fortaprest',
         blocks: [
            {
               type: 'paragraph',
               text: 'Según los registros internos de Movapp, en septiembre de 2025 recibimos 484 reportes de amenazas, acoso y cobranza abusiva relacionados con Fortaprest. Los datos de la app están en nuestra [ficha de Fortaprest](/aplicaciones-prestamo/fortapresta/).',
            },
            {
               type: 'paragraph',
               text: 'Las víctimas describen una cobranza basada en la intimidación y en la divulgación de información personal:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Llamadas y mensajes constantes, con amenazas.',
                  'Mensajes a familiares, amistades y compañeros de trabajo.',
                  'Uso de los contactos del teléfono como si fueran «avales», aunque nunca firmaron nada.',
               ],
            },
            {
               type: 'paragraph',
               text: '**Cobrar con amenazas, difamación o exponiendo datos personales no es un procedimiento legal de cobranza**, exista o no una deuda.',
            },
         ],
      },
      {
         heading: '¿Fortaprest es legal? ¿Está registrada en la CONDUSEF?',
         blocks: [
            {
               type: 'paragraph',
               text: '**Sí está registrada, aunque no con el nombre «Fortaprest».** En el SIPRES de la CONDUSEF no existe ninguna empresa con esa denominación; la que aparece es **Unlimit Leasing, S.A.P.I. de C.V., SOFOM, E.N.R.** (nombre corto «UNLIMIT»), y sus datos coinciden con los de la app: el mismo domicilio, el mismo teléfono y un correo con el dominio fortaprest.com.',
            },
            { type: 'paragraph', text: 'Esto es lo que muestra el registro (consultado el 9 de noviembre de 2026):' },
            {
               type: 'table',
               head: ['Dato en SIPRES', 'Valor'],
               rows: [
                  ['Denominación social', 'Unlimit Leasing, S.A.P.I. de C.V., SOFOM, E.N.R.'],
                  ['Clave de registro', '695531'],
                  ['Estatus', 'En operación (desde el 14 de diciembre de 2021)'],
                  ['Sector', 'Sociedades Financieras de Objeto Múltiple E.N.R.'],
                  ['Supervisora', 'CONDUSEF'],
                  ['Contrato con sociedad de información crediticia', 'Círculo de Crédito'],
               ],
            },
            {
               type: 'paragraph',
               text: '¿Qué significa «E.N.R.»? Son las siglas de **entidad no regulada**. Una SOFOM E.N.R. está registrada y bajo la supervisión de la CONDUSEF, pero no tiene la supervisión completa que la CNBV ejerce sobre un banco. Por eso, y para entender [qué puede hacer la CONDUSEF frente a los montadeudas](/blog/condusef-montadeudas/), conviene separar tres ideas:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Estar registrada no es lo mismo que cobrar bien.** El registro indica que la empresa existe legalmente y puede otorgar crédito. No avala sus prácticas de cobranza.',
                  '**Sí puedes presentar una queja.** Al ser una entidad registrada, la CONDUSEF puede recibir reclamaciones en su contra. Es una ventaja frente a las apps que no tienen ninguna empresa detrás.',
                  '**Estar en una tienda de apps tampoco es un aval.** Google Play y App Store no certifican que una app de préstamos cumpla la regulación financiera mexicana.',
               ],
            },
         ],
      },
      {
         heading: 'Condiciones que ofrece Fortaprest',
         blocks: [
            {
               type: 'paragraph',
               text: 'Según la ficha de la app en App Store (consultada el 9 de noviembre de 2026):',
            },
            {
               type: 'unorderedList',
               items: [
                  'Préstamos de hasta $40,000 pesos mexicanos.',
                  'Plazos de 60 a 365 días.',
                  'Requisitos: ser mexicano, tener INE vigente y una cuenta bancaria en México.',
                  'Tasa anual anunciada: 28.32 % sin IVA para un usuario típico, con un máximo de 31.02 % sin IVA.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Cuando publicamos este artículo, en septiembre de 2025, la app anunciaba hasta $20,000 pesos y plazos de 91 a 365 días, sin aval ni comprobante de ingresos.',
            },
            {
               type: 'paragraph',
               text: 'El problema, según los reportes, aparece al cobrar. Aunque la app anuncia tasas de alrededor de 30 % anual, se han publicado tasas mucho más altas: una reseña de un comparador financiero registra un rango de 31.03 % a 372.41 % anual, y en Movapp tenemos reportes de víctimas en ese mismo sentido. Antes de aceptar, **revisa en el contrato el monto total a pagar, no solo la tasa anunciada**.',
            },
         ],
      },
      {
         heading: '¿Qué pasa si no pago a Fortaprest?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Es la duda más buscada sobre esta app. Esto es lo que reportan las víctimas y lo que conviene saber:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Cobranza a tus contactos.** Cuando el cobro se vuelve impagable, empiezan a molestar a la víctima y a las personas de su agenda.',
                  '**Historial crediticio.** Sí puede afectarlo. El registro de la empresa en SIPRES muestra un contrato vigente con Círculo de Crédito, una de las sociedades de información crediticia de México, así que un atraso puede quedar registrado en tu historial. Si quieres saber qué aparece sobre ti, puedes pedir tu Reporte de Crédito Especial, que es gratuito una vez cada 12 meses.',
                  '**Amenazas de embargo.** **Por una deuda con una app o una financiera, un embargo solo puede ordenarlo un juez dentro de un juicio.** Un cobrador no puede embargarte por mensaje ni por llamada.',
               ],
            },
            {
               type: 'paragraph',
               text: '**Movapp no elimina deudas ni modifica el historial crediticio**, y las decisiones sobre la deuda corresponden a cada persona. Si tienes dudas, revisa [qué considerar antes de pagar a una app montadeudas](/blog/que-pasa-si-no-pagas-montadeudas/). Lo que no es aceptable, debas o no, es que te cobren con amenazas o usando los datos de tu teléfono.',
            },
         ],
      },
      {
         heading: 'Qué hacer si Fortaprest te está cobrando con acoso',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  '**Guarda evidencia:** capturas de mensajes, números, comprobantes de depósitos y pagos.',
                  '**Avisa a tus contactos** antes de que les escriban, para que no respondan ni paguen.',
                  '**Revisa los permisos de la app** (contactos, galería, ubicación, SMS) y retira los que puedas.',
                  '**Protege tus cuentas:** cambia contraseñas y activa la verificación en dos pasos.',
                  '**Denuncia si así lo decides:** Policía Cibernética de tu estado, fiscalía, y reporte de la app en la tienda. Consulta [dónde denunciar a una app de préstamos](/blog/como-denunciar-montadeudas/).',
                  '**Si hay un riesgo inmediato** para ti o tu familia, llama al 911.',
               ],
            },
         ],
      },
      {
         heading: 'Cómo puede ayudarte Movapp',
         blocks: [
            {
               type: 'paragraph',
               text: 'Movapp es una organización que acompaña a víctimas de apps montadeudas. Parte de nuestro equipo vivió este mismo acoso, y por eso sabemos lo que se siente.',
            },
            {
               type: 'unorderedList',
               items: [
                  '**La revisión de tu caso es gratuita y sin compromiso.** Un asesor analiza tu situación y las apps involucradas, incluidas las relacionadas, y te dice si El Hack aplica.',
                  '**El Hack es el servicio de Movapp para frenar el acoso**: las llamadas y mensajes de cobranza hacia ti y tus contactos. Es un servicio con costo, desde los $500 MXN según el número de apps. [El Hack se solicita con un asesor](/el-hack/), que confirma el alcance y el precio antes de cualquier pago, y lo aplica el equipo técnico de Movapp.',
                  '**El apoyo psicológico es gratuito** y se solicita a través del asesor. No sustituye la atención de emergencia.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Movapp ha acompañado a miles de víctimas de apps montadeudas. No presta dinero, no cobra deudas y no es un despacho de abogados.',
            },
         ],
      },
   ],
   faqHeading: 'Preguntas frecuentes sobre Fortaprest',
   faqs: [
      {
         q: '¿Fortaprest sigue funcionando?',
         a: 'La app volvió a aparecer en las tiendas después de estar unos días fuera, y las víctimas reportan que la cobranza no se detuvo durante ese periodo.',
      },
      {
         q: '¿Fortaprest es confiable?',
         a: 'En Movapp no la recomendamos: es una de las apps con más reportes de cobranza con acoso que hemos recibido. Si aún no la descargas, compara antes con instituciones registradas y supervisadas.',
      },
      {
         q: '¿Fortaprest llama a tus contactos?',
         a: 'Sí, es una de las conductas que más reportan sus víctimas: llamadas y mensajes a las personas de su agenda para presionar el pago.',
      },
      {
         q: '¿Movapp puede quitar mi deuda con Fortaprest?',
         a: 'No. Movapp no elimina deudas ni modifica el historial crediticio. El Hack sirve para frenar el acoso y proteger tu información.',
      },
   ],
   sourcesList: [
      'CONDUSEF — SIPRES, registro de Unlimit Leasing, S.A.P.I. de C.V., SOFOM, E.N.R. (clave 695531): [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultado el 9 de noviembre de 2026).',
      'App Store — ficha de «Fortaprest»: [https://apps.apple.com/mx/app/fortaprest/id6746393080](https://apps.apple.com/mx/app/fortaprest/id6746393080) (consultada el 9 de noviembre de 2026).',
      'Kardmatch — «¿Fortaprest es legal y confiable?» (actualizado el 30 de abril de 2026): [https://blog.kardmatch.com.mx/fortaprest-es-confiable](https://blog.kardmatch.com.mx/fortaprest-es-confiable) (fuente comercial, no oficial).',
      'Reporte de Crédito Especial.',
      'Registros internos de Movapp, septiembre de 2025.',
   ],
   // 2026-11-11: wireframe del blog -- 3 tarjetas (préstamos confiables en lugar de Ok Dinero y Prestamax).
   related: ['fast-efectivo-es-confiable', 'lista-montadeudas', 'apps-prestamos-confiables'],
};
