// "EC3 Cyber Innovation Forum 2026: MOVAPP en la sede de Europol en La Haya"
// (2026-11-23). Fuente: Comunicado_EC3_Cyber_Innovation_Forum_2026_MOVAPP
// (PDF + .docx con comentarios de implementación [MV1]-[MV27] y "Notas para
// publicar"). Copy verbatim: H1, H2, negritas, listas, tablas y los enlaces
// tal cual los marcan los comentarios; las URLs salen del .docx (en el PDF
// solo se ve el texto de las fuentes 6, 8 y 9).
//
// Decisiones:
// - Slug: la ficha no trae URL ("[URL DE LA NOTA]" en el schema). Se arma
//   del title, bajo /blog/ como el resto; netlify.toml redirige además la
//   variante en la raíz, por si se comparte con el formato de WordPress.
// - Enlaces internos: la ficha da URLs viejas de WordPress
//   (movapp.org/apps-montadeudas-que-hacer/, etc.), hoy 301 en netlify.toml;
//   se enlaza directo a su destino final (mismo criterio que Octopus/Buen
//   Fin). Texto ancla intacto.
// - Schema: NewsArticle con el foro como Event en "about" ([MV3]); ver
//   schemaType/schemaAbout y generateBlogPostingSchema.
// - Fotos: ALT de la ficha, sin pies de foto (la ficha no trae). La ficha no
//   dice dónde va cada foto: se reparten por sección según lo que muestran.
import type { SeoArticleInput } from '@constants/blogArticles.ts';
import ImgEc3Exterior from '@assets/movapp-ec3-2026-exterior.webp';
import ImgEc3Panoramica from '@assets/movapp-ec3-2026-panoramica.webp';
import ImgEc3Grupo from '@assets/movapp-ec3-2026-grupo.webp';
import ImgEc3MuroEuropol from '@assets/movapp-ec3-2026-muro-europol.webp';
import ImgEc3Noche from '@assets/movapp-ec3-2026-noche.webp';

export const EC3_FORUM_ARTICLE: SeoArticleInput = {
   slug: 'ec3-cyber-innovation-forum-2026-europol',
   kicker: 'Comunicado · Ciberseguridad',
   title: 'EC3 Cyber Innovation Forum 2026: MOVAPP en la sede de Europol en La Haya',
   // Bajada [MV4]: extracto destacado bajo el H1, no encabezado.
   subtitle:
      'Más de 170 participantes de policías, universidades, instituciones y empresas se reunieron en la sede de Europol para conocer nuevas herramientas contra el ransomware, los deepfakes, el fraude telefónico y la explotación infantil en línea.',
   metaTitle: 'MOVAPP en el EC3 Cyber Innovation Forum 2026 de Europol',
   metaDescription:
      'MOVAPP asistió al foro de ciberdelincuencia de Europol en La Haya. Qué se presentó, quién ganó y por qué importa a las víctimas de montadeudas en México.',
   author: 'Erik Mann',
   // Fecha de la ficha (datePublished/dateModified del schema: 2026-11-18).
   publishDate: 'Noviembre 18, 2026',
   modifiedAt: '2026-11-18',
   heroAlt: 'Erik Mann, de MOVAPP, frente a la sede de Europol en La Haya durante el EC3 Cyber Innovation Forum 2026',
   schemaType: 'NewsArticle',
   schemaAbout: {
      '@type': 'Event',
      name: 'EC3 Cyber Innovation Forum 2026',
      startDate: '2026-10-28',
      endDate: '2026-10-29',
      location: {
         '@type': 'Place',
         name: 'Sede de Europol',
         address: 'La Haya, Países Bajos',
      },
      organizer: {
         '@type': 'Organization',
         name: 'Europol',
         url: 'https://www.europol.europa.eu/',
      },
   },
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Los días 28 y 29 de octubre de 2026, MOVAPP asistió a la tercera edición del [EC3 Cyber Innovation Forum](https://www.europol.europa.eu/publications-events/events/ec3-cyber-innovation-forum-2026), el encuentro que organiza el Centro Europeo de Ciberdelincuencia (EC3) de Europol en su sede de La Haya, Países Bajos.',
            },
            {
               type: 'paragraph',
               text: 'MOVAPP asistió al foro como parte de su trabajo de acompañamiento a víctimas de extorsión digital. Su objetivo fue conocer de primera mano las herramientas, los métodos de investigación y las formas de cooperación que usan las autoridades europeas contra la ciberdelincuencia, y llevar ese conocimiento al trabajo con las víctimas en México.',
            },
            {
               type: 'image',
               src: ImgEc3Exterior,
               alt: 'Edificio de la sede de Europol en La Haya',
            },
         ],
      },
      {
         heading: 'El foro en datos',
         blocks: [
            {
               type: 'table',
               head: ['Dato', 'Detalle'],
               rows: [
                  ['Edición', 'Tercera'],
                  ['Organiza', 'Centro Europeo de Ciberdelincuencia (EC3) de Europol'],
                  ['Fechas', '28 y 29 de octubre de 2026'],
                  ['Sede', 'Sede de Europol, La Haya, Países Bajos'],
                  ['Participación', 'Solo por invitación'],
                  ['Asistentes', 'Más de 170 participantes'],
                  ['Temas', 'Ransomware, deepfakes, análisis de blockchain y criptomonedas, y protección de la infancia'],
                  ['Premio', 'Mejor propuesta, elegida por un jurado de Europol y el público'],
               ],
            },
         ],
      },
      {
         heading: 'Un foro para llevar la innovación a las investigaciones',
         blocks: [
            {
               type: 'paragraph',
               text: 'El EC3 nació en 2013 dentro de Europol para fortalecer la respuesta policial de la Unión Europea contra la ciberdelincuencia. Desde 2024 organiza el Cyber Innovation Forum, un espacio donde policías, investigadores y empresas presentan soluciones que puedan aplicarse en investigaciones reales.',
            },
            {
               type: 'paragraph',
               text: 'Los proyectos se eligen mediante una [convocatoria abierta](https://www.europol.europa.eu/work-with-us/other-opportunities/call-for-proposals-ec3-cyber-innovation-forum-2026) publicada en la primavera de 2026. En la edición anterior, la convocatoria recibió más de 70 solicitudes.',
            },
            {
               type: 'paragraph',
               text: 'Según el [proceso de evaluación de Europol](https://www.europol.europa.eu/cms/sites/default/files/documents/CIF2026_Evaluation_of_Proposals_Process.pdf), las propuestas se califican por su relación con los temas de la convocatoria, su innovación, su utilidad para las policías europeas, su madurez y su carácter no promocional. Europol aclara que presentar en el foro no significa que respalde a las organizaciones participantes ni a sus productos.',
            },
            {
               type: 'image',
               src: ImgEc3Panoramica,
               alt: 'Vista exterior de la sede de Europol, donde opera el Centro Europeo de Ciberdelincuencia',
            },
         ],
      },
      {
         heading: 'Los temas de 2026',
         blocks: [
            {
               type: 'paragraph',
               text: 'Durante dos días se presentaron proyectos en sesiones de expertos y demostraciones de tecnología en vivo. Estas fueron algunas de las líneas principales:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**Ransomware:** nuevas formas de detectar y frenar el secuestro de datos.',
                  '**Deepfakes:** el uso de inteligencia artificial para engañar, suplantar identidades y automatizar delitos.',
                  '**Análisis de blockchain y criptomonedas:** el rastreo del dinero que mueven las redes criminales.',
                  '**Protección de la infancia:** herramientas para identificar a quienes explotan a menores en internet.',
                  '**Internet de las cosas:** cómo obtener evidencia de dispositivos conectados cada vez más comunes.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Un ejemplo: el 29 de octubre, la investigadora Yuanyuan Zhou, del University College London (UCL), [presentó un trabajo](https://www.ucl.ac.uk/engineering/news/2026/nov/phd-student-speaks-europol-forum-shaping-future-cybercrime-security) sobre cómo preparar a las policías para obtener evidencia del internet de las cosas, como los dispositivos del hogar inteligente y los equipos médicos conectados. Su propuesta subrayó tres puntos: preservar bien la evidencia, usar métodos de análisis explicables y cooperar entre países.',
            },
            {
               type: 'image',
               src: ImgEc3Grupo,
               alt: 'Erik Mann con cuatro participantes del foro en la sede de Europol',
            },
         ],
      },
      {
         heading: 'Los proyectos premiados',
         blocks: [
            {
               type: 'paragraph',
               text: 'Al cierre del foro, Europol anunció a los ganadores de los EC3 Cyber Innovation Forum Awards 2026:',
            },
            {
               type: 'table',
               head: ['Lugar', 'Proyecto', 'Autores'],
               rows: [
                  [
                     '1.º',
                     'Guardian, una solución de inteligencia artificial que funciona dentro del teléfono y bloquea llamadas y SMS fraudulentos antes de que lleguen a la posible víctima.',
                     'Guardian Labs EU y Policía de Seguridad Pública de Portugal (PSP)',
                  ],
                  [
                     '2.º',
                     'Inteligencia para perfilar a agresores sexuales de menores en la red Tor y en la web abierta, dentro del proyecto europeo SafeHorizon.',
                     'Juha Nurmi (Universidad de Tampere, Finlandia)',
                  ],
               ],
            },
            {
               type: 'paragraph',
               text: 'El primer lugar es especialmente relevante para MOVAPP porque ataca el fraude donde empiezan muchos casos de extorsión: la llamada o el mensaje que llega al teléfono. Guardian Labs lo desarrolló en colaboración con la Policía de Seguridad Pública de Portugal, que aportó reportes de fraude para entrenar el sistema. Por ahora está pensado para el contexto portugués.',
            },
            {
               type: 'image',
               src: ImgEc3MuroEuropol,
               alt: 'Erik Mann frente al muro de Europol en el interior de su sede en La Haya',
            },
         ],
      },
      {
         heading: 'Por qué importa para las víctimas de montadeudas en México',
         blocks: [
            {
               type: 'paragraph',
               text: 'En México, las apps de préstamos conocidas como montadeudas usan algunas de las tácticas que se discutieron en La Haya. La Policía Cibernética de la CDMX ha advertido que estas apps [piden permisos invasivos en el teléfono](https://www.unotv.com/estados/ciudad-de-mexico/cuidado-con-las-apps-montadeudas-asi-operan-los-fraudes-de-prestamos-rapidos/) y usan esa información para extorsionar, y que el acoso puede incluir difamación, imágenes manipuladas y amenazas.',
            },
            {
               type: 'paragraph',
               text: 'La magnitud del problema se ve en las cifras de distintas instituciones:',
            },
            {
               type: 'table',
               head: ['Cifra', 'Qué mide', 'Fuente y periodo'],
               rows: [
                  [
                     '**5 de cada 10**',
                     'Personas expuestas a apps montadeudas (encuesta)',
                     'Estudio Confianzómetro de la Condusef y la fintech Tala, [agosto de 2026](https://www.jornada.com.mx/2026/08/19/economia/017n3eco)',
                  ],
                  [
                     '**51,325**',
                     'Reportes relacionados con préstamos de estas apps',
                     'Consejo Ciudadano para la Seguridad y Justicia de la CDMX, de 2020 a agosto de 2026',
                  ],
                  [
                     '**5,861**',
                     'Reportes por montadeudas; fue el ciberdelito más reportado del periodo',
                     'Policía Cibernética de la SSC CDMX, [del 1 de enero al 19 de febrero de 2026](https://www.unotv.com/estados/ciudad-de-mexico/montadeudas-encabezan-ciberdelitos-en-cdmx-en-arranque-de-2026-mas-de-5-mil-denuncias/)',
                  ],
               ],
            },
            {
               type: 'paragraph',
               text: 'Las cifras de reportes solo cuentan a quienes acudieron a una institución, así que el número de personas afectadas probablemente es mayor. Según el Consejo Ciudadano, entre los abusos reportados están los cobros por deudas que nunca se contrataron, la difamación y los mensajes dirigidos a los contactos de la persona.',
            },
            {
               type: 'paragraph',
               text: 'En la experiencia de MOVAPP, muchas de estas apps cambian de nombre en cuanto acumulan denuncias y operan con infraestructura en varios países. Por eso, la cooperación internacional y la evidencia digital transfronteriza importan tanto en Europa como en nuestra región.',
            },
         ],
      },
      {
         heading: 'Lo que MOVAPP se lleva del foro',
         blocks: [
            {
               type: 'unorderedList',
               items: [
                  '**La prevención puede empezar en el teléfono:** el proyecto ganador demuestra que es posible frenar llamadas y mensajes fraudulentos antes de que lleguen a la víctima.',
                  '**La evidencia digital hay que cuidarla desde el inicio:** sin pruebas bien conservadas, ninguna investigación avanza, y menos cuando cruza fronteras.',
                  '**Policías, universidades y empresas pueden trabajar juntas:** el primer lugar surgió de la colaboración entre una empresa y una policía, y el segundo, de un proyecto de investigación europeo.',
                  '**La IA es amenaza y herramienta a la vez:** los delincuentes la usan para engañar con deepfakes, y las policías para detectar y prevenir delitos.',
               ],
            },
            {
               type: 'image',
               src: ImgEc3Noche,
               alt: 'Erik Mann frente a la sede de Europol iluminada al anochecer',
            },
            {
               type: 'callout',
               title: '¿Una app de préstamos te está amenazando o está escribiendo a tus contactos?',
               text: 'Guarda capturas de los mensajes y las llamadas, y revisa [qué hacer frente a una app montadeudas](/blog/que-hacer-con-apps-montadeudas/) y [cómo denunciar una app de préstamos fraudulenta](/blog/como-denunciar-montadeudas/). También puedes reportar el caso al 088 o a la Línea de Seguridad del Consejo Ciudadano, 55 5533 5533. Si estás en peligro inmediato, llama al 911.',
            },
            {
               type: 'paragraph',
               text: 'Nota relacionada: [Octopus Conference 2026: inteligencia artificial, evidencia digital y extorsión en la agenda global](/blog/octopus-conference-2026-ciberdelincuencia-ia-extorsion/)',
            },
         ],
      },
      {
         heading: 'Fuentes',
         blocks: [
            {
               type: 'orderedList',
               items: [
                  'Europol. [EC3 Cyber Innovation Forum 2026](https://www.europol.europa.eu/publications-events/events/ec3-cyber-innovation-forum-2026).',
                  'Europol. [Call for Proposals: EC3 Cyber Innovation Forum 2026](https://www.europol.europa.eu/work-with-us/other-opportunities/call-for-proposals-ec3-cyber-innovation-forum-2026).',
                  'Europol. [CIF2026 Evaluation of Proposals Process](https://www.europol.europa.eu/cms/sites/default/files/documents/CIF2026_Evaluation_of_Proposals_Process.pdf).',
                  'Europol en LinkedIn. Anuncio de los ganadores de los 2026 EC3 Cyber Innovation Forum Awards.',
                  'UCL Engineering. [PhD student speaks at Europol forum shaping the future of cybercrime security](https://www.ucl.ac.uk/engineering/news/2026/nov/phd-student-speaks-europol-forum-shaping-future-cybercrime-security) (noviembre de 2026).',
                  'Cybernews. [European AI tool intercepts scam calls before the phone starts ringing](https://cybernews.com/ai-news/ai-antiscam-tool/).',
                  'Universidad de Tampere. Proyecto SafeHorizon.',
                  "Security Delta (HSD). [Call for Proposals for Europol's EC3 Cyber Innovation Forum 2026 in The Hague](https://securitydelta.nl/news/overview/call-for-proposals-for-europols-ec3-cyber-innovation-forum-2026-in-the-hague) (27 de mayo de 2026).",
                  'The Hague Newsroom. [EC3 Cyber Innovation Forum 2026](https://thehague.com/newsroom/en/events/ec3-cyber-innovation-forum-2026).',
                  'La Jornada. [La mitad de los mexicanos, expuestos a montadeudas](https://www.jornada.com.mx/2026/08/19/economia/017n3eco) (19 de agosto de 2026), con datos del estudio Confianzómetro de la Condusef y Tala.',
                  'La Jornada. Alertan a padres de familia sobre “montadeudas” en apps ante regreso a clases en CDMX (19 de agosto de 2026), con datos del Consejo Ciudadano para la Seguridad y Justicia de la CDMX.',
                  'UnoTV. [Montadeudas encabezan ciberdelitos en CDMX en arranque de 2026](https://www.unotv.com/estados/ciudad-de-mexico/montadeudas-encabezan-ciberdelitos-en-cdmx-en-arranque-de-2026-mas-de-5-mil-denuncias/), con datos de la SSC de la CDMX.',
                  'UnoTV. [Cuidado con las apps “montadeudas”: así operan los fraudes de préstamos rápidos](https://www.unotv.com/estados/ciudad-de-mexico/cuidado-con-las-apps-montadeudas-asi-operan-los-fraudes-de-prestamos-rapidos/), con la alerta de la Policía Cibernética de la SSC CDMX (marzo de 2026).',
               ],
            },
         ],
      },
   ],
   // La ficha no define relacionados: la nota relacionada que pide (Octopus),
   // los dos artículos que enlaza el recuadro y la historia de Movapp.
   related: [
      'octopus-conference-2026-ciberdelincuencia-ia-extorsion',
      'que-hacer-con-apps-montadeudas',
      'como-denunciar-montadeudas',
      'historia-movapp',
   ],
};
