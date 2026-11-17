// "Buen Fin: cómo evitar caer en apps montadeudas al pedir un préstamo"
// (2026-11-17). Fuente: MOVAPP_Buen_Fin_Articulo_26.pdf (texto editorial
// íntegro + comentarios de implementación + ficha SEO/OG/schema). Copy
// verbatim: H1/H2/H3, <strong>, listas UL/OL y los 17 enlaces tal cual los
// marcan los comentarios del PDF.
//
// Decisiones:
// - Slug: el de la ficha (buen-fin-apps-montadeudas), pero bajo /blog/ como
//   el resto de artículos del sitio.
// - Enlaces internos: la ficha da las URLs viejas de WordPress
//   (movapp.org/mexdin-llama-a-tus-contactos/, etc.), que hoy son 301 en
//   netlify.toml; se enlaza directo a su destino final para evitar el
//   redirect (mismo criterio que el artículo de Octopus). Texto ancla intacto.
// - Preguntas frecuentes como sección normal (H2 + H3 por pregunta), NO en
//   el campo `faqs`: la ficha pide explícitamente no emitir FAQPage.
// - Fuentes: H2 + párrafo en negritas + <ol> numerada (comentario [70]).
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const BUEN_FIN_ARTICLE: SeoArticleInput = {
   slug: 'buen-fin-apps-montadeudas',
   title: 'Buen Fin: cómo evitar caer en apps montadeudas al pedir un préstamo',
   metaTitle: 'Buen Fin y apps montadeudas: evita fraudes | MOVAPP',
   metaDescription:
      'Antes de pedir un préstamo para el Buen Fin, identifica señales de apps montadeudas, protege tus datos y conoce dónde denunciar amenazas en México.',
   ogTitle: 'Buen Fin y apps montadeudas: cómo evitar préstamos fraudulentos',
   author: 'Erik Mann',
   // Fecha de la ficha (datePublished/dateModified del schema: 2026-11-12).
   publishDate: 'Noviembre 12, 2026',
   modifiedAt: '2026-11-12',
   // ALT de la ficha, validado contra la portada definitiva
   // (@assets/blog-buen-fin-apps-montadeudas.webp, ver blogImages.ts).
   heroAlt: 'MOVAPP: Buen Fin y prevención de fraudes con apps montadeudas',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: '¿Te faltan mil pesos para completar una compra o llegar a la siguiente quincena? Buscar un préstamo desde el celular puede parecer una solución rápida, sobre todo cuando encuentras una aplicación que promete depositarte dinero en minutos.',
            },
            {
               type: 'paragraph',
               text: 'Pero antes de aceptar, hay dos preguntas que deberías hacerte: ¿quién está detrás de esa aplicación y qué hará con tus datos personales?',
            },
            {
               type: 'paragraph',
               text: 'En México se han documentado casos de plataformas que ofrecen préstamos inmediatos y después recurren a amenazas, cobros indebidos y mensajes intimidatorios dirigidos a familiares o conocidos. Son las llamadas **apps montadeudas**, utilizadas para cometer fraudes y extorsiones.',
            },
            {
               type: 'paragraph',
               text: 'Y no siempre se trata de grandes cantidades. De acuerdo con el Consejo Ciudadano para la Seguridad y Justicia de la Ciudad de México, el 30% de los préstamos registrados en los reportes que analizó fue de hasta mil pesos.',
            },
            {
               type: 'paragraph',
               text: 'El riesgo merece atención ante el **Buen Fin 2026, que se realizará del 13 al 17 de noviembre**. Las promociones pueden llevarte a considerar un financiamiento que no tenías planeado, especialmente si tu presupuesto ya está comprometido.',
            },
            {
               type: 'paragraph',
               text: 'Aunque no existe evidencia estadística suficiente para afirmar que los casos de montadeudas aumentan específicamente después del Buen Fin, los reportes oficiales muestran que estas prácticas siguen afectando a personas en México.',
            },
         ],
      },
      {
         heading: 'Cuando el dinero no alcanza, pedir un préstamo puede parecer la solución',
         blocks: [
            {
               type: 'paragraph',
               text: 'Un celular, una televisión o un electrodoméstico tienen descuento. Quieres aprovecharlo, pero te falta una parte del dinero. Entonces encuentras una aplicación que ofrece un préstamo sin demasiados requisitos, sin consultar tu historial crediticio y con una respuesta casi inmediata.',
            },
            {
               type: 'paragraph',
               text: 'El problema comienza si detrás de la aplicación hay personas que buscan obtener tus datos personales para utilizarlos posteriormente en cobros indebidos, amenazas o extorsiones.',
            },
            {
               type: 'paragraph',
               text: 'En enero de 2026, la Secretaría de Seguridad y Protección Ciudadana (SSPC) [advirtió sobre este tipo de fraudes](https://gabinetedeseguridad.gob.mx/contenido/7630/sspc-emite-recomendaciones-para-evitar-fraudes-por-montadeudas-durante-la-cuesta-de-enero), especialmente durante periodos de presión económica, cuando los gastos acumulados y los pagos pendientes llevan a buscar otras formas de financiamiento.',
            },
            {
               type: 'paragraph',
               text: 'Según la dependencia, estas aplicaciones suelen anunciarse mediante redes sociales, buscadores y servicios de mensajería. Prometen dinero fácil, pero algunas solicitan permisos excesivos para acceder a información del teléfono y después utilizan esos datos para intimidar a quienes solicitaron el préstamo.',
            },
            { type: 'subheading', text: '¿Aumentan los reportes por montadeudas después del Buen Fin?' },
            {
               type: 'paragraph',
               text: 'Hasta el 12 de noviembre de 2026, las fuentes consultadas no permiten confirmar un incremento específico de casos relacionado con las compras del Buen Fin.',
            },
            {
               type: 'paragraph',
               text: 'Durante la cuesta de enero, en cambio, el Consejo Ciudadano sí ha registrado incrementos.',
            },
            {
               type: 'paragraph',
               text: 'En enero de 2025, el organismo informó que los reportes relacionados con montadeudas [aumentaban hasta 33% durante ese periodo](https://www.consejociudadanomx.org/contenido/aumentan-hasta-33-casos-de-montadeudas-en-cuesta-de-enero), de acuerdo con los registros analizados.',
            },
            {
               type: 'paragraph',
               text: 'En esa misma revisión, una de cada cuatro personas atendidas había utilizado más de una aplicación para solicitar dinero.',
            },
            {
               type: 'paragraph',
               text: 'El dato no permite saber cuántas personas pidieron un segundo préstamo para pagar el primero. Tampoco demuestra que ocurra lo mismo después del Buen Fin.',
            },
            {
               type: 'paragraph',
               text: 'Las autoridades han documentado que los operadores de préstamos fraudulentos aprovechan situaciones de necesidad económica para atraer a personas con ofertas de dinero inmediato.',
            },
            {
               type: 'paragraph',
               text: 'Por eso, si piensas financiar una compra durante el Buen Fin, calcula cuánto terminarás pagando y si podrás cubrir las mensualidades sin afectar tus gastos esenciales.',
            },
         ],
      },
      {
         heading: 'Montadeudas en México: ¿qué dicen los datos de 2026?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Entre el 1 de enero y el 19 de febrero de 2026, la Policía Cibernética de la Ciudad de México recibió **5,861 reportes relacionados con aplicaciones montadeudas**.',
            },
            {
               type: 'paragraph',
               text: 'La cifra fue difundida por La Jornada el 25 de febrero, a partir de información de la Secretaría de Seguridad Ciudadana. Durante ese periodo, los montadeudas fueron la modalidad con más reportes entre los ciberdelitos identificados por la unidad.',
            },
            {
               type: 'paragraph',
               text: 'Meses después, el Consejo Ciudadano publicó otra cifra: **51,325 reportes acumulados desde 2020 hasta agosto de 2026**.',
            },
            {
               type: 'paragraph',
               text: 'En los casos atendidos por este organismo se identificaron distintas prácticas:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**62%:** amenazas o insultos durante la cobranza.',
                  '**15%:** amenazas de divulgar información privada.',
                  '**8%:** cobros por deudas inexistentes.',
                  '**8%:** difamación relacionada con la deuda.',
                  '**6%:** exigencias de pago dirigidas a contactos.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Estos porcentajes corresponden a los reportes analizados por el Consejo Ciudadano durante varios años. No representan exclusivamente nuevos casos de 2026 ni deben interpretarse como una estimación nacional de todas las personas afectadas.',
            },
            { type: 'subheading', text: 'Un préstamo de mil pesos también puede terminar en amenazas' },
            {
               type: 'paragraph',
               text: 'El 30% fue de hasta mil pesos; otro 15% se ubicó entre mil y 2,500 pesos, y el 18% correspondió a cantidades de entre 2,500 y 5,000 pesos.',
            },
            {
               type: 'paragraph',
               text: 'Una persona que solicita dinero para resolver un gasto inmediato puede terminar recibiendo llamadas a todas horas, mensajes intimidatorios o amenazas de compartir información privada con sus conocidos.',
            },
            {
               type: 'paragraph',
               text: 'Los datos completos aparecen en el [comunicado publicado por el Consejo Ciudadano el 21 de agosto de 2026](https://www.consejociudadanomx.org/contenido/advierte-consejo-ciudadano-por-riesgo-de-montadeudas-en-temporada-de-regreso-a-clases).',
            },
         ],
      },
      {
         heading: '¿Cómo utilizan tus datos personales para amenazarte?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Al solicitar dinero desde una aplicación, generalmente debes proporcionar ciertos datos personales. Eso ocurre también con servicios financieros legítimos.',
            },
            {
               type: 'paragraph',
               text: 'La señal de alerta aparece cuando una app pide acceso a información que no necesita para evaluar o administrar un préstamo, como tus fotografías, contactos, archivos o ubicación.',
            },
            {
               type: 'paragraph',
               text: 'Es posible que aceptes esos permisos sin revisarlos porque quieres terminar el trámite cuanto antes.',
            },
            {
               type: 'paragraph',
               text: 'En las aplicaciones utilizadas para cometer fraudes, esa información puede convertirse en una herramienta de presión.',
            },
            {
               type: 'paragraph',
               text: 'La SSPC ha advertido que algunos operadores realizan depósitos no solicitados, modifican las condiciones del crédito, imponen intereses desproporcionados o comienzan a exigir pagos mediante amenazas.',
            },
            {
               type: 'paragraph',
               text: 'También se han documentado situaciones en las que familiares, amistades o compañeros de trabajo reciben mensajes relacionados con préstamos que ellos nunca solicitaron.',
            },
            {
               type: 'paragraph',
               text: 'Algunas personas son presionadas para intervenir en el pago. Otras reciben información destinada a desacreditar a quien contrató el préstamo.',
            },
            {
               type: 'paragraph',
               text: 'En MOVAPP hemos documentado reportes sobre estas prácticas, como los relacionados con [MexDin y las llamadas a contactos](/blog/mexdin-llama-contactos/).',
            },
            {
               type: 'paragraph',
               text: '**Tener una deuda no autoriza a nadie a amenazarte, difundir tus fotografías privadas ni utilizar información de tus contactos para extorsionarte.** Una obligación financiera legítima debe distinguirse de los cobros indebidos y las conductas que puedan constituir un delito.',
            },
         ],
      },
      {
         heading: 'Apps montadeudas: también pueden aparecer en tiendas oficiales',
         blocks: [
            {
               type: 'paragraph',
               text: 'Que una aplicación esté disponible en Google Play no garantiza que sea confiable.',
            },
            {
               type: 'paragraph',
               text: 'El 25 de agosto de 2026, el Consejo Ciudadano informó que había identificado **399 aplicaciones con diez o más reportes entre 2021 y agosto de 2026**.',
            },
            {
               type: 'paragraph',
               text: 'Entre las modalidades de distribución señaladas por el organismo, encontró:',
            },
            {
               type: 'unorderedList',
               items: [
                  '93 aplicaciones activas en Google Play.',
                  '14 distribuidas mediante archivos APK.',
                  'Cuatro que aparecían en ambas modalidades.',
               ],
            },
            {
               type: 'paragraph',
               text: 'También reportó que se habían dado de baja 383 enlaces relacionados con estas aplicaciones.',
            },
            {
               type: 'paragraph',
               text: 'La publicidad es otra vía utilizada para llegar a posibles usuarios. Según la revisión del Consejo Ciudadano, el 19% de las aplicaciones identificadas tenía anuncios en redes sociales, principalmente Facebook e Instagram, o mediante correo electrónico.',
            },
            {
               type: 'paragraph',
               text: 'Así, una oferta de préstamo puede aparecer mientras revisas tus redes sociales, buscas opciones de financiamiento o consultas información desde el celular.',
            },
            {
               type: 'paragraph',
               text: 'Tampoco basta con reconocer el nombre o el logotipo de una financiera. Existen casos de suplantación en los que se utiliza la identidad de instituciones legítimas.',
            },
            {
               type: 'paragraph',
               text: 'Puedes consultar el [listado de aplicaciones montadeudas reportadas en 2026](https://www.consejociudadanomx.org/contenido/lista-de-apps-de-montadeudas-2026) publicado por el Consejo Ciudadano.',
            },
            {
               type: 'paragraph',
               text: 'Ten presente que las aplicaciones pueden cambiar de nombre, dejar de estar disponibles o distribuirse por otros canales. Que una app no aparezca en ese listado no significa que sea segura.',
            },
         ],
      },
      {
         heading: '¿Cómo saber si una aplicación de préstamos es confiable?',
         blocks: [
            {
               type: 'paragraph',
               text: 'No todas las aplicaciones de préstamos son fraudulentas. Existen empresas e instituciones que ofrecen créditos digitales legítimos.',
            },
            {
               type: 'paragraph',
               text: 'Antes de solicitar dinero, comprueba quién ofrece el financiamiento, cuánto pagarás y qué información tendrás que proporcionar.',
            },
            { type: 'paragraph', text: 'Desconfía si encuentras alguna de estas situaciones:' },
            { type: 'paragraph', text: '**Te prometen dinero sin explicar las condiciones.**' },
            {
               type: 'paragraph',
               text: 'Evita las ofertas que no informan claramente los intereses, comisiones, fechas de pago o costo total del crédito. Consulta también el Costo Anual Total (CAT), cuando corresponda, para comparar opciones de financiamiento.',
            },
            { type: 'paragraph', text: '**La aplicación solicita acceso a tus contactos o fotografías.**' },
            {
               type: 'paragraph',
               text: 'Pregúntate por qué necesita esa información. Los permisos innecesarios pueden poner en riesgo tus datos personales y los de otras personas.',
            },
            { type: 'paragraph', text: '**Te piden un depósito para liberar el préstamo.**' },
            {
               type: 'paragraph',
               text: 'Si una supuesta financiera exige un pago anticipado por apertura, seguro, autorización u otro concepto antes de entregarte el dinero, verifica cuidadosamente la oferta. Esta práctica ha sido identificada como una señal de posible fraude.',
            },
            { type: 'paragraph', text: '**No puedes identificar a la empresa.**' },
            {
               type: 'paragraph',
               text: 'Comprueba su razón social, canales de atención y condiciones contractuales. Si la información es incompleta, contradictoria o no puedes confirmarla, evita proporcionar tus documentos o datos financieros.',
            },
            { type: 'paragraph', text: '**Te presionan para aceptar inmediatamente.**' },
            {
               type: 'paragraph',
               text: 'Ninguna promoción debería impedirte leer un contrato. Antes de asumir una deuda, necesitas conocer el monto total que tendrás que pagar y las consecuencias de un posible retraso.',
            },
            { type: 'subheading', text: '¿Cómo revisar una financiera en CONDUSEF?' },
            {
               type: 'paragraph',
               text: 'Puedes consultar el [SIPRES de CONDUSEF](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) para verificar información de la institución financiera.',
            },
            {
               type: 'paragraph',
               text: '**Encontrar una empresa en SIPRES no demuestra que cualquier aplicación, anuncio o página que utilice su nombre realmente le pertenezca.**',
            },
            {
               type: 'paragraph',
               text: 'Los estafadores pueden copiar logotipos, nombres comerciales e información de contacto para hacerse pasar por una financiera.',
            },
            {
               type: 'paragraph',
               text: 'Si encuentras una oferta atractiva, busca los canales oficiales de la institución por tu cuenta y confirma directamente que la aplicación forma parte de sus servicios.',
            },
            {
               type: 'paragraph',
               text: 'El registro es una herramienta de verificación, pero no sustituye la revisión del contrato, la identidad del proveedor y las condiciones del crédito. Además, no todos los proveedores de financiamiento están sujetos al mismo régimen de registro o supervisión.',
            },
            {
               type: 'paragraph',
               text: 'Puedes revisar otras recomendaciones en nuestro artículo [¡Ojo con las aplicaciones montadeudas!](/blog/como-identificar-apps-montadeudas/).',
            },
         ],
      },
      {
         heading: '¿Qué hacer si ya recibes amenazas de una app montadeudas?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Si una aplicación comenzó a llamarte de manera insistente, amenaza con publicar tus fotografías o está enviando mensajes a tus familiares, necesitas conservar la información de lo ocurrido.',
            },
            {
               type: 'paragraph',
               text: 'Ante la presión, algunas personas consideran pagar nuevamente para detener las llamadas. Otras buscan otro préstamo porque creen que así terminará el problema.',
            },
            {
               type: 'paragraph',
               text: 'Pero realizar pagos adicionales exigidos mediante amenazas **no garantiza que el acoso se detenga**.',
            },
            {
               type: 'paragraph',
               text: 'La SSPC recomienda no realizar nuevos pagos ante intentos de extorsión y denunciar lo sucedido. Esto no significa que debas desconocer una deuda legítima: las obligaciones contractuales válidas y las exigencias indebidas deben evaluarse por separado.',
            },
            { type: 'subheading', text: 'Guarda mensajes, comprobantes y amenazas' },
            {
               type: 'paragraph',
               text: 'Conserva las conversaciones de WhatsApp, mensajes de texto, números telefónicos, comprobantes de depósito y capturas de pantalla.',
            },
            {
               type: 'paragraph',
               text: 'Si tus familiares recibieron amenazas, pídeles que guarden las comunicaciones.',
            },
            {
               type: 'paragraph',
               text: 'Procura mantener los archivos originales cuando sea posible. Pueden ser útiles para documentar los hechos y presentarlos ante las autoridades.',
            },
            { type: 'subheading', text: 'Revisa los permisos de la aplicación' },
            {
               type: 'paragraph',
               text: 'Comprueba si la app tiene acceso a tus contactos, fotografías, archivos o ubicación.',
            },
            {
               type: 'paragraph',
               text: 'Cuando sea seguro hacerlo, retira los permisos innecesarios. Antes de borrar la aplicación o sus datos, considera si necesitas conservar información que sirva como evidencia.',
            },
            {
               type: 'paragraph',
               text: 'Desinstalarla puede impedir determinados accesos futuros, pero **no elimina automáticamente la información que sus operadores ya hayan obtenido**.',
            },
            {
               type: 'paragraph',
               text: 'Si proporcionaste contraseñas o información bancaria, comprueba también la seguridad de tus cuentas.',
            },
            { type: 'subheading', text: 'Advierte a tus contactos si están recibiendo mensajes' },
            {
               type: 'paragraph',
               text: 'Si tus familiares o amistades están siendo contactados, explícales brevemente lo que sucede.',
            },
            {
               type: 'paragraph',
               text: 'No tienes que compartir detalles personales sobre tu situación económica.',
            },
            {
               type: 'paragraph',
               text: 'Puedes pedirles que no proporcionen información adicional, no realicen depósitos solicitados por desconocidos y guarden cualquier mensaje intimidatorio.',
            },
         ],
      },
      {
         heading: '¿Dónde denunciar una app montadeudas en México?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Existen diferentes canales para denunciar posibles delitos, solicitar orientación y recibir apoyo. La institución adecuada dependerá de lo ocurrido y de la entidad donde te encuentres.',
            },
            { type: 'paragraph', text: '**Consejo Ciudadano para la Seguridad y Justicia de la Ciudad de México**' },
            {
               type: 'paragraph',
               text: 'Ofrece orientación jurídica y apoyo psicológico gratuitos a través de su Línea de Seguridad y Chat de Confianza.',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Teléfono:** 55 5533 5533.',
                  '**Disponibilidad:** las 24 horas, los siete días de la semana.',
                  '**Cobertura:** recibe solicitudes de personas de todo México.',
               ],
            },
            { type: 'paragraph', text: '**Policía Cibernética**' },
            {
               type: 'paragraph',
               text: 'Puedes buscar la unidad correspondiente a tu entidad para recibir orientación sobre posibles delitos digitales.',
            },
            { type: 'paragraph', text: 'En Ciudad de México, los canales oficiales son:' },
            {
               type: 'unorderedList',
               items: ['**Teléfono:** 55 5242 5100, extensión 5086.', '**Correo:** policia.cibernetica@ssc.cdmx.gob.mx.'],
            },
            { type: 'paragraph', text: '**Fiscalía de tu entidad federativa**' },
            {
               type: 'paragraph',
               text: 'Puedes acudir para presentar una denuncia por posibles delitos como amenazas, fraude o extorsión, según las circunstancias de tu caso.',
            },
            {
               type: 'paragraph',
               text: 'Es recomendable conservar las evidencias y solicitar información sobre los requisitos para presentar la denuncia.',
            },
            { type: 'paragraph', text: '**CONDUSEF**' },
            {
               type: 'paragraph',
               text: 'Puede ayudarte a consultar información sobre instituciones financieras y brindar orientación en asuntos relacionados con los servicios que se encuentran dentro de su competencia.',
            },
            {
               type: 'paragraph',
               text: 'No todas las aplicaciones fraudulentas están sujetas a su supervisión.',
            },
            {
               type: 'paragraph',
               text: 'Recuerda que recibir orientación de una unidad de Policía Cibernética no sustituye necesariamente la presentación de una denuncia penal.',
            },
            {
               type: 'paragraph',
               text: 'En MOVAPP contamos con una [guía sobre cómo denunciar una aplicación de préstamos fraudulenta](/blog/como-denunciar-montadeudas/), que puedes consultar como información complementaria a los canales oficiales.',
            },
         ],
      },
      {
         heading: 'Antes de pedir un préstamo para el Buen Fin, revisa esto',
         blocks: [
            {
               type: 'paragraph',
               text: 'Un descuento puede dejar de ser conveniente si necesitas un préstamo que después no podrás pagar.',
            },
            { type: 'paragraph', text: 'Hazte estas preguntas:' },
            {
               type: 'unorderedList',
               items: [
                  '¿Necesito realizar esta compra ahora o puedo esperar?',
                  '¿Cuánto terminaré pagando entre intereses y comisiones?',
                  '¿Puedo cubrir el préstamo sin afectar la renta, alimentación u otros gastos esenciales?',
                  '¿He comprobado que la institución y la aplicación son auténticas?',
                  '¿Por qué me solicitan acceso a contactos, fotografías u otra información personal?',
               ],
            },
            {
               type: 'paragraph',
               text: 'Si las condiciones no están claras o no puedes verificar quién ofrece el financiamiento, evita entregar tus datos o aceptar el préstamo.',
            },
            {
               type: 'paragraph',
               text: 'Las autoridades han documentado amenazas, cobros indebidos y uso de información personal en aplicaciones montadeudas. Eso no significa que todo préstamo digital represente un fraude, pero sí que es necesario verificar las ofertas antes de contratar.',
            },
            { type: 'subheading', text: 'Si ya estás enfrentando amenazas, puedes buscar orientación' },
            {
               type: 'paragraph',
               text: 'Si una aplicación está acosándote o ha comenzado a contactar a tus familiares, conserva las pruebas, revisa los permisos de tu teléfono y busca orientación a través de los canales correspondientes.',
            },
            {
               type: 'paragraph',
               text: 'En MOVAPP documentamos cómo operan las apps montadeudas y compartimos recursos para ayudarte a reconocer estas prácticas. En [El Hack de MOVAPP](/el-hack/) encontrarás información sobre el servicio, su proceso de atención y las formas de contactar al equipo para conocer las alternativas disponibles.',
            },
            {
               type: 'paragraph',
               text: 'Las amenazas y la difusión de información privada no son formas legítimas de cobrar una deuda. Si estás pasando por esta situación, documentar lo ocurrido y acudir a los canales adecuados es un punto de partida para atenderla.',
            },
         ],
      },
      {
         // Sin FAQPage a propósito (ficha, sección 6): bloque "faqAccordion"
         // (solo el diseño de las FAQs del sitio), no el campo `faqs`, que sí
         // alimenta el schema. El título es el H2 y cada pregunta un H3.
         blocks: [
            {
               type: 'faqAccordion',
               title: 'Preguntas frecuentes sobre Buen Fin y apps montadeudas',
               items: [
                  {
                     q: '¿Aumentan los reportes por montadeudas después del Buen Fin?',
                     a: 'Hasta el 12 de noviembre de 2026 no existe evidencia estadística suficiente en las fuentes consultadas para confirmar un aumento específico provocado por el Buen Fin. Sí se han documentado incrementos durante la cuesta de enero y advertencias oficiales sobre los riesgos de préstamos fraudulentos en periodos de presión económica.',
                  },
                  {
                     q: '¿Puedo caer en una app montadeudas por pedir mil pesos?',
                     a: 'Sí. El Consejo Ciudadano informó que el 30% de los préstamos registrados en sus reportes fue de hasta mil pesos. Solicitar una cantidad pequeña no elimina el riesgo de amenazas o cobros indebidos.',
                  },
                  {
                     q: '¿Es seguro pedir dinero en una aplicación durante el Buen Fin?',
                     a: 'Depende de la institución, la autenticidad de la aplicación y las condiciones del crédito. Antes de contratar, verifica quién ofrece el dinero, revisa el contrato y evita aplicaciones que pidan acceso innecesario a tus datos personales.',
                  },
                  {
                     q: '¿Qué pasa si una app de préstamos tiene mis contactos?',
                     a: 'Algunas aplicaciones fraudulentas utilizan esa información para enviar amenazas o presionar a familiares y conocidos. Conserva las evidencias, revisa los permisos de la aplicación y advierte a tus contactos si están recibiendo mensajes.',
                  },
                  {
                     q: '¿Pueden seguir amenazándome aunque ya haya pagado?',
                     a: 'Sí. Realizar un pago no garantiza que terminen las amenazas o las exigencias indebidas. Guarda los comprobantes, conserva las comunicaciones y solicita orientación sobre cómo denunciar lo ocurrido.',
                  },
                  {
                     q: '¿Dónde puedo denunciar una app montadeudas?',
                     a: 'Puedes acudir a la Fiscalía de tu entidad, contactar a la Policía Cibernética correspondiente o solicitar orientación al Consejo Ciudadano en el 55 5533 5533. La vía adecuada dependerá de los hechos.',
                  },
                  {
                     q: '¿Todas las aplicaciones de préstamos son montadeudas?',
                     a: 'No. Existen plataformas legítimas de crédito digital. Antes de solicitar dinero, verifica la identidad de la empresa, las condiciones del financiamiento y los permisos que solicita la aplicación.',
                  },
               ],
            },
         ],
      },
      {
         heading: 'Fuentes consultadas',
         blocks: [
            { type: 'paragraph', text: '**Fecha de corte de la investigación: 12 de noviembre de 2026.**' },
            {
               type: 'orderedList',
               items: [
                  '[Consejo Ciudadano. Riesgo de montadeudas en temporada de regreso a clases, agosto de 2026.](https://www.consejociudadanomx.org/contenido/advierte-consejo-ciudadano-por-riesgo-de-montadeudas-en-temporada-de-regreso-a-clases)',
                  '[Consejo Ciudadano. Lista de aplicaciones montadeudas 2026.](https://www.consejociudadanomx.org/contenido/lista-de-apps-de-montadeudas-2026)',
                  '[Consejo Ciudadano. Aumentan hasta 33% casos de montadeudas en cuesta de enero, enero de 2025.](https://www.consejociudadanomx.org/contenido/aumentan-hasta-33-casos-de-montadeudas-en-cuesta-de-enero)',
                  '[Secretaría de Seguridad y Protección Ciudadana. Recomendaciones para evitar fraudes por montadeudas durante la cuesta de enero, enero de 2026.](https://gabinetedeseguridad.gob.mx/contenido/7630/sspc-emite-recomendaciones-para-evitar-fraudes-por-montadeudas-durante-la-cuesta-de-enero)',
                  '[CONDUSEF. Créditos desde el celular, julio de 2026.](https://revista.condusef.gob.mx/destacados-del-mes/2026/07/creditos-desde-el-celular/)',
                  '[La Jornada. Suman 14 mil 145 reportes de ciberdelitos en dos meses, febrero de 2026.](https://www.jornada.com.mx/2026/02/25/capital/030n2cap)',
                  '[Secretaría de Seguridad Ciudadana de CDMX. Policía Cibernética.](https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica)',
                  '[El Buen Fin. Preguntas frecuentes y fechas oficiales de la edición 2026.](https://www.elbuenfin.org/preguntas-frecuentes)',
               ],
            },
         ],
      },
   ],
   // La ficha no define relacionados: los temas que el propio artículo enlaza
   // (identificar apps, denunciar, MexDin) + préstamos confiables.
   related: [
      'como-identificar-apps-montadeudas',
      'como-denunciar-montadeudas',
      'mexdin-llama-contactos',
      'apps-prestamos-confiables',
   ],
};
