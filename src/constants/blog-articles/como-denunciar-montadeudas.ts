// ART-019 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_019: SeoArticleInput = {
   slug: 'como-denunciar-montadeudas',
   title: '¿Cómo denunciar a los montadeudas? Dónde y cómo denunciar una app de préstamos en México',
   metaTitle: 'Cómo denunciar a los montadeudas en México | Movapp',
   metaDescription:
      'Dónde y cómo denunciar una app de préstamos montadeudas en México: fiscalía, Policía Cibernética, CONDUSEF, PROFECO y tiendas de apps, paso a paso.',
   ogTitle: 'Cómo denunciar a una app montadeudas en México',
   author: 'Dra. Dalia',
   publishDate: 'Octubre 6, 2025',
   publishedAt: '2025-10-06T17:08:57+00:00',
   modifiedAt: '2026-11-10',
   heroAlt: 'Persona guardando capturas de pantalla de mensajes de cobranza para presentar una denuncia',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'En México puedes denunciar a una app montadeudas ante la fiscalía de tu estado y la Policía Cibernética cuando hay amenazas, extorsión o uso indebido de tus datos; ante la CONDUSEF si la empresa es una institución financiera registrada; ante la PROFECO si se trata de un proveedor comercial, y en Google Play o App Store para que la tienda revise la app. **Antes de cualquier denuncia, guarda la evidencia. Si estás en peligro inmediato, llama al 911.**',
            },
         ],
      },
      {
         heading: 'Por qué terminamos buscando cómo denunciar',
         blocks: [
            {
               type: 'paragraph',
               text: 'Cuando, por alguna necesidad, descargamos una aplicación de préstamos inmediatos, podemos llegar a creer que, así de fácil como nos prestan, también podremos pagar. Es una ilusión que venden las mismas aplicaciones y que nosotros queremos creer.',
            },
            {
               type: 'paragraph',
               text: 'Con el paso de los días aparece otra realidad: cobranza inmediata, intereses altos y métodos agresivos, incluso cuando el monto es pequeño o no hay atraso. Llegan la intimidación, el uso de nuestros datos y deudas que crecen hasta volverse impagables. Esa situación quita el sueño y la tranquilidad, y nos lleva a buscar cómo denunciar.',
            },
         ],
      },
      {
         heading: 'Antes de denunciar: reúne tu evidencia',
         blocks: [
            {
               type: 'paragraph',
               text: 'Una denuncia con pruebas avanza mejor. Junta y respalda fuera de tu teléfono:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Capturas de pantalla** de mensajes, amenazas y montajes, donde se vea el número o la cuenta de origen, la fecha y la hora.',
                  '**Registro de llamadas** y los números desde los que te marcan.',
                  '**Nombre exacto de la app**, su enlace en la tienda y capturas de su ficha.',
                  '**Comprobantes** de depósitos recibidos y de pagos realizados.',
                  '**Mensajes que recibieron tus contactos**: pídeles capturas.',
                  '**Contrato o términos** que aceptaste, si los tienes.',
               ],
            },
            {
               type: 'paragraph',
               text: '**No borres las conversaciones ni desinstales la app antes de respaldar todo.**',
            },
         ],
      },
      {
         heading: '¿Dónde denunciar a una app montadeudas? Los canales, uno por uno',
         blocks: [
            {
               type: 'paragraph',
               text: 'Los datos de contacto cambian según el estado donde vivas. Búscalos siempre en el sitio oficial de cada institución.',
            },
            { type: 'subheading', text: '1. Fiscalía de tu estado' },
            {
               type: 'paragraph',
               text: 'Las amenazas, la extorsión y la difusión de tus datos pueden constituir delitos, y la instancia para denunciarlos es la fiscalía de la entidad donde te encuentras.',
            },
            {
               type: 'paragraph',
               text: 'Ten presente una dificultad real: en estos casos suele ser complicado identificar a los responsables. El nombre y el domicilio que aparecen en la app pueden ser falsos y, al operar por internet, pueden estar en otro estado o fuera del país. Eso puede hacer lenta la investigación, pero **tu denuncia deja un antecedente formal**.',
            },
            { type: 'subheading', text: '2. Policía Cibernética' },
            {
               type: 'paragraph',
               text: 'Atiende reportes de delitos e incidentes en el entorno digital y orienta sobre cómo proceder. Cada estado tiene su propia unidad; a nivel federal está la Guardia Nacional, que recibe reportes en el **088**.',
            },
            {
               type: 'paragraph',
               text: 'Algo que conviene saber antes de decidir: según los casos que atiende Movapp, **pagar no siempre pone fin al problema**, porque los cobradores pueden conservar los datos de tus contactos y seguir molestándolos. Cambiar de número tampoco evita necesariamente que usen la información que ya obtuvieron.',
            },
            { type: 'subheading', text: '3. CONDUSEF' },
            {
               type: 'paragraph',
               text: 'La CONDUSEF orienta y recibe reclamaciones contra **instituciones financieras** dentro de su ámbito. El detalle importante: muchas apps de préstamos inmediatos no son instituciones financieras registradas ni supervisadas, y en esos casos [la CONDUSEF tiene poco margen para intervenir frente a los montadeudas](/blog/condusef-montadeudas/).',
            },
            {
               type: 'paragraph',
               text: 'Por eso, primero busca la razón social de la app en el SIPRES. **Tener un registro o un permiso no significa estar bajo la misma supervisión que un banco.**',
            },
            { type: 'subheading', text: '4. Google Play o App Store' },
            {
               type: 'paragraph',
               text: 'Reportar y calificar la app en la tienda donde la descargaste sirve para dos cosas: alerta a otras personas y puede llevar a que la plataforma revise la aplicación y, si corresponde, la retire. Eso sí: [cuando una app sale de la tienda, la cobranza no se detiene](/blog/hack-app-no-disponible/).',
            },
            { type: 'subheading', text: '5. PROFECO' },
            {
               type: 'paragraph',
               text: 'Según el tipo de empresa y de servicio, algunos casos caen en el ámbito de la PROFECO; por ejemplo, cuando el proveedor no es una entidad financiera. Verifica qué autoridad es competente antes de presentar tu queja.',
            },
            { type: 'subheading', text: '6. Si hay peligro inmediato: 911 y 089' },
            {
               type: 'paragraph',
               text: 'Si recibes una amenaza contra tu integridad o la de tu familia y sientes que el riesgo es real, llama al **911**. Para denuncia anónima existe el **089**.',
            },
         ],
      },
      {
         heading: '¿Y Movapp? Acompañamiento, no autoridad',
         blocks: [
            {
               type: 'paragraph',
               text: '**Movapp no es una autoridad ni sustituye a ninguna de las instituciones anteriores.** Es una organización que, desde 2021, acompaña a víctimas de apps montadeudas. Lo que puede hacer por ti:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Revisar tu caso sin costo y sin compromiso.** Un asesor analiza tu situación y las apps involucradas.',
                  '**Orientarte para conservar evidencia y, si así lo decides, denunciar.** Forma parte del seguimiento que da el asesor.',
                  '**Aplicar El Hack**, [el servicio de Movapp para frenar el acoso](/el-hack/): las llamadas y mensajes de cobranza hacia ti y tus contactos. Tiene costo, desde los $500 MXN según el número de apps; se solicita con un asesor, que confirma el alcance y el precio antes de cualquier pago, y lo aplica el equipo técnico de Movapp.',
                  '**Brindarte apoyo psicológico gratuito**, que se solicita a través del asesor y no sustituye la atención de emergencia.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Cuando una víctima nos cuenta su caso, esa información también nos ayuda a alertar a otras personas sobre cómo operan estas apps.',
            },
         ],
      },
      {
         heading: '¿Para qué sirve denunciar?',
         blocks: [
            {
               type: 'paragraph',
               text: 'Una denuncia no siempre resuelve tu caso de inmediato, y es justo decirlo. Aun así, sirve:',
            },
            {
               type: 'unorderedList',
               items: [
                  'Deja un **antecedente formal** de lo que estás viviendo.',
                  'Suma a los reportes que permiten a las autoridades y a las tiendas **actuar contra una app**.',
                  'Aporta evidencia para **mejorar leyes y regulación** sobre préstamos digitales y cobranza.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Puedes usar más de un canal a la vez: denunciar ante la autoridad, reportar en la tienda y buscar acompañamiento no se excluyen.',
            },
         ],
      },
   ],
   faqs: [
      {
         q: '¿Puedo denunciar si sí pedí el préstamo y debo dinero?',
         a: 'Sí. Deber dinero no le da derecho a nadie a amenazarte, difamarte ni usar tus datos o los de tus contactos. **La denuncia es por la forma de cobrar, no por la deuda.**',
      },
      {
         q: '¿Denunciar hace que me dejen de cobrar?',
         a: 'No necesariamente. La denuncia inicia un proceso ante la autoridad; **no garantiza un resultado ni un plazo**.',
      },
      {
         q: '¿Dónde denuncio si vivo fuera de México?',
         a: 'Consulta los canales oficiales de las autoridades de tu país. Los datos de este artículo aplican a México.',
      },
      {
         q: '¿Movapp presenta la denuncia por mí?',
         a: 'No. Movapp no es un despacho de abogados ni una autoridad. El asesor te orienta para conservar evidencia y para que tú decidas si denuncias.',
      },
   ],
   sourcesList: [
      'CONDUSEF — sitio oficial: [https://www.condusef.gob.mx/](https://www.condusef.gob.mx/) · SIPRES: [https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp](https://webapps.condusef.gob.mx/SIPRES/jsp/pub/index.jsp) (consultados el 9 de noviembre de 2026).',
      'PROFECO: [https://www.gob.mx/profeco](https://www.gob.mx/profeco) (consultado el 9 de noviembre de 2026).',
      'Guardia Nacional: [https://www.gob.mx/guardianacional](https://www.gob.mx/guardianacional) (consultado el 9 de noviembre de 2026).',
      'Policía Cibernética, SSC CDMX: [https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica](https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica) (consultado el 9 de noviembre de 2026).',
      '911: [https://www.gob.mx/911](https://www.gob.mx/911) (consultado el 9 de noviembre de 2026).',
      'Google Play — reportar una app: [https://support.google.com/googleplay/answer/2853570?hl=es](https://support.google.com/googleplay/answer/2853570?hl=es) (consultado el 9 de noviembre de 2026).',
      'Casos atendidos por Movapp.',
   ],
   // 2026-11-11: wireframe del blog -- 3 tarjetas. El wireframe pone este mismo
   // artículo como primera tarjeta (autoenlace, copiado del ART-018); se
   // conservan las otras dos y el tercer lugar lo ocupa que-hacer-con-apps-montadeudas.
   related: ['condusef-montadeudas', 'que-pasa-si-no-pagas-montadeudas', 'que-hacer-con-apps-montadeudas'],
};
