// Artículo de Octopus Conference 2026 (2026-11-05). Movido tal cual desde
// blogArticles.ts el 2026-11-10 al pasar cada artículo a su propio archivo.
import type { BlogArticle } from '@constants/blogArticles.ts';
import ImgOctopusInterior1 from '@assets/movapp-octopus-2026-interior-1.webp';
import ImgOctopusInterior2 from '@assets/movapp-octopus-2026-interior-2.webp';

export const OCTOPUS_ARTICLE: BlogArticle = {
   // 2026-11-05: artículo + ficha SEO/GEO entregados en PDF
   // (Movapp_Octopus_2026_Articulo_Final_SEO_GEO). Copy verbatim. Slug =
   // el de la URL sugerida por la ficha, pero bajo /blog/ como el resto
   // de artículos del sitio. Enlaces internos a la URL final (la de "la
   // historia de Erik Mann" que da la ficha es la vieja de WordPress, hoy
   // un 301 a /blog/historia-movapp/). Fuentes [1]-[8] con las URLs exactas
   // que trae el propio PDF (las [1]-[5] apuntan todas a la página de la
   // conferencia, así viene en la fuente).
   slug: 'octopus-conference-2026-ciberdelincuencia-ia-extorsion',
   title: 'Octopus Conference 2026: inteligencia artificial, evidencia digital y extorsión en la agenda global contra la ciberdelincuencia',
   subtitle:
      'Estrasburgo reunió a especialistas de distintos países para revisar los retos del delito digital a 25 años del Convenio de Budapest',
   metaTitle: 'Octopus Conference 2026: IA, evidencia y extorsión | Movapp',
   metaDescription:
      'Conoce los temas de Octopus Conference 2026: inteligencia artificial, evidencia digital, extorsión y cooperación internacional contra la ciberdelincuencia.',
   schemaHeadline:
      'Octopus Conference 2026: inteligencia artificial, evidencia digital y extorsión en la agenda global contra la ciberdelincuencia',
   breadcrumbLabel: 'Octopus Conference 2026: IA, evidencia y extorsión',
   heroAlt:
      'Erik Mann, fundador de Movapp, en el hemiciclo del Palais de l’Europe durante Octopus Conference 2026 en Estrasburgo',
   heroCaption: 'Hemiciclo del Palais de l’Europe, sede de Octopus Conference 2026 en Estrasburgo, Francia.',
   author: 'Erik Mann',
   // La ficha no trae fecha de publicación: se usa el día en que se subió
   // al sitio. Ajustar acá si se publica otro día (alimenta datePublished
   // del schema y el orden de "Noticias recientes").
   publishDate: 'Noviembre 5, 2026',
   // ~1,020 palabras de cuerpo a ~200 palabras/min.
   readingMinutes: 5,
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'Del 14 al 16 de octubre, el Palais de l’Europe, en Estrasburgo, acogió [Octopus Conference 2026](https://www.coe.int/en/web/cybercrime/octopus-conference-2026), el encuentro que organiza el Consejo de Europa para analizar la ciberdelincuencia desde una perspectiva internacional. Autoridades, especialistas, empresas tecnológicas y organizaciones de la sociedad civil revisaron durante tres días cómo investigar, perseguir y prevenir delitos que operan sin respetar fronteras.[^1]',
            },
            {
               type: 'paragraph',
               text: 'Entre los temas centrales destacaron la obtención de evidencia digital entre países, el uso de inteligencia artificial con fines delictivos, los centros de estafa vinculados a la delincuencia organizada y la atención a víctimas de abuso de imágenes.',
            },
         ],
      },
      {
         heading: 'Un foro internacional a 25 años del Convenio de Budapest',
         blocks: [
            {
               type: 'paragraph',
               text: 'La edición de este año coincidió con el 25 aniversario del Convenio de Budapest, el primer tratado internacional sobre delitos informáticos. Ese aniversario marcó el tono de la sesión plenaria inaugural, dedicada a la cooperación internacional y a la evolución del convenio frente a un entorno tecnológico muy distinto al de su origen.[^7]',
            },
            {
               type: 'paragraph',
               text: 'El programa combinó tres ejes: cooperación entre Estados, capacidades de investigación y protección de los derechos humanos en el entorno digital.[^1] A ellos se sumaron talleres regionales, incluido uno dedicado a las Américas, y sesiones sobre desinformación y uso ilícito de activos virtuales.[^4]',
            },
            {
               type: 'image',
               src: ImgOctopusInterior1,
               alt: 'Asistente de Octopus Conference 2026 sigue una sesión con audífonos de interpretación desde su lugar en el hemiciclo del Palais de l’Europe',
               caption: 'Sesión de trabajo con interpretación simultánea en el hemiciclo del Palais de l’Europe.',
            },
         ],
      },
      {
         heading: 'Evidencia digital más allá de las fronteras',
         blocks: [
            {
               type: 'paragraph',
               text: 'Una de las sesiones de mayor peso técnico abordó cómo pueden coordinarse autoridades y proveedores de servicios digitales para obtener pruebas de delitos que cruzan fronteras sin perder de vista los derechos de las personas. La discusión giró en torno al Segundo Protocolo Adicional al Convenio de Budapest, que establece mecanismos para agilizar esa cooperación.[^2]',
            },
            {
               type: 'paragraph',
               text: 'El planteamiento de fondo es que la evidencia de un delito digital rara vez se encuentra en un solo país: los servidores, las plataformas y las personas implicadas pueden estar dispersos en varias jurisdicciones, lo que obliga a construir procedimientos comunes.',
            },
         ],
      },
      {
         heading: 'Inteligencia artificial: del fraude automatizado a las imágenes falsas',
         blocks: [
            {
               type: 'paragraph',
               text: 'El uso de la inteligencia artificial por parte de redes criminales ocupó un lugar destacado en la agenda. La sesión “Cybercrime-as-a-service: impact of AI” analizó cómo estas herramientas permiten automatizar engaños, fabricar contenido falso y ampliar el alcance de los servicios delictivos.[^3]',
            },
            {
               type: 'paragraph',
               text: 'Un taller específico se dedicó a las imágenes manipuladas: la difusión de imágenes íntimas sin consentimiento, los contenidos sexuales falsos generados con IA y los mecanismos para denunciar y retirar ese material.[^5] Uno de los puntos que se desprende de esta agenda es que una imagen no necesita ser real para causar daño: basta con que resulte creíble para convertirse en instrumento de intimidación, aunque la escena nunca haya ocurrido.',
            },
            {
               type: 'paragraph',
               text: 'En paralelo, el Comité del Convenio sobre la Ciberdelincuencia (T-CY) del Consejo de Europa publicó un estudio que mapea la relación entre inteligencia artificial, ciberdelincuencia y evidencia electrónica, como referencia técnica para autoridades y especialistas.[^8]',
            },
         ],
      },
      {
         heading: 'Centros de estafa y delincuencia organizada',
         blocks: [
            {
               type: 'paragraph',
               text: 'Otra línea de trabajo examinó el vínculo entre las operaciones de fraude a gran escala, la explotación de personas y las amenazas a la seguridad.[^4] El enfoque puso atención en las estructuras que sostienen estos delitos —quién los financia, cómo se organizan y qué infraestructura digital utilizan— y no solo en sus consecuencias inmediatas.',
            },
            {
               type: 'paragraph',
               text: 'Esta perspectiva, centrada en investigar las redes y mejorar la cooperación entre autoridades y empresas digitales, atraviesa buena parte del programa y se presenta como complemento necesario a la atención de los casos individuales.',
            },
         ],
      },
      {
         heading: 'La extorsión por apps montadeudas en el contexto internacional',
         blocks: [
            {
               type: 'paragraph',
               text: 'Aunque el programa no se centró específicamente en las aplicaciones de préstamo extorsivas, varios de sus temas se conectan con este fenómeno, extendido en México y otros países de Latinoamérica. La Secretaría de Seguridad y Protección Ciudadana ha advertido que estas aplicaciones pueden solicitar permisos excesivos para acceder a la información del teléfono y después usar esos datos para amenazar o acosar al usuario, e incluso a sus familiares y contactos.[^6]',
            },
            {
               type: 'paragraph',
               text: 'El patrón suele repetirse: una persona con una urgencia económica encuentra una app que promete un préstamo inmediato con pocos requisitos; después aparecen cobros que no corresponden a lo pactado o depósitos no solicitados, seguidos de llamadas insistentes, amenazas y mensajes dirigidos a su círculo cercano. El préstamo se convierte así en un mecanismo de intimidación.',
            },
            {
               type: 'paragraph',
               text: 'Los ejes de la conferencia —evidencia transfronteriza, uso delictivo de la IA, redes organizadas de fraude y exhibición de imágenes— ofrecen un marco útil para entender esta modalidad de extorsión, que combina varios de esos elementos. Movapp, organización que acompaña a víctimas de apps montadeudas, asistió al encuentro para aportar esa perspectiva latinoamericana. Más información sobre su origen está disponible en [la historia de Erik Mann y Movapp](/blog/historia-movapp/).',
            },
         ],
      },
      {
         heading: 'Cooperación con plataformas digitales',
         blocks: [
            {
               type: 'paragraph',
               text: 'El papel de las empresas tecnológicas fue una constante en las sesiones: tanto en la entrega de evidencia como en la retirada de contenido dañino y en la prevención de la promoción de servicios fraudulentos. En ese marco, Movapp estableció un primer contacto con una representante de TikTok con la intención de abrir una conversación posterior sobre la posible promoción de apps montadeudas en la plataforma. No existe, por ahora, una colaboración o acuerdo formal.',
            },
            {
               type: 'image',
               src: ImgOctopusInterior2,
               alt: 'Dos participantes de Octopus Conference 2026 sonríen en el hemiciclo del Palais de l’Europe, en Estrasburgo',
               caption: 'Participantes de distintos países durante un receso de Octopus Conference 2026.',
            },
         ],
      },
      {
         heading: 'Conclusiones del encuentro',
         blocks: [
            {
               type: 'paragraph',
               text: 'De la agenda de Octopus Conference 2026 se desprenden varias ideas clave para quienes trabajan contra el delito digital:',
            },
            {
               type: 'unorderedList',
               items: [
                  '**La cooperación internacional es indispensable.** La evidencia de los delitos digitales está repartida entre países y plataformas; sin mecanismos comunes, como los del Segundo Protocolo, las investigaciones se estancan.',
                  '**La inteligencia artificial amplía el alcance del delito.** Automatiza engaños y permite fabricar imágenes falsas creíbles, lo que exige no asumir que el contenido difundido contra una víctima es auténtico.',
                  '**Atacar el origen, no solo las consecuencias.** Investigar las redes y la infraestructura que sostienen el fraude es tan importante como atender cada caso.',
                  '**La experiencia de las víctimas aporta información.** Quienes han vivido la extorsión conocen sus mecanismos e impactos; incorporarla fortalece la búsqueda de soluciones.',
               ],
            },
            {
               type: 'paragraph',
               text: 'Para México y Latinoamérica, estos planteamientos apuntan a oportunidades concretas: fortalecer la coordinación entre autoridades, plataformas y organizaciones civiles, y actualizar la orientación a víctimas ante el uso de la IA como herramienta de intimidación.',
            },
            {
               type: 'paragraph',
               text: 'Quien esté enfrentando amenazas, acoso o difusión de información personal por una app de préstamos puede consultar información y recursos de orientación en [movapp.org](/), así como [conocer cómo funciona El Hack](/el-hack/) y las opciones de acompañamiento disponibles.',
            },
         ],
      },
      {
         heading: 'Fuentes',
         blocks: [
            {
               type: 'sources',
               items: [
                  '[Consejo de Europa. Octopus Conference 2026 (fechas, sede y contexto).](https://www.coe.int/en/web/cybercrime/octopus-conference-2026)',
                  '[Consejo de Europa. Agenda oficial: sesión sobre evidencia electrónica y proveedores de servicios.](https://www.coe.int/en/web/cybercrime/octopus-conference-2026)',
                  '[Consejo de Europa. Agenda oficial: “Cybercrime-as-a-service: impact of AI”.](https://www.coe.int/en/web/cybercrime/octopus-conference-2026)',
                  '[Consejo de Europa. Programa, talleres y sesiones de Octopus Conference 2026.](https://www.coe.int/en/web/cybercrime/octopus-conference-2026)',
                  '[Consejo de Europa. Agenda oficial: taller sobre imágenes manipuladas y abuso de imágenes.](https://www.coe.int/en/web/cybercrime/octopus-conference-2026)',
                  '[SSPC. Recomendaciones para evitar fraudes por montadeudas.](https://www.gob.mx/sspc/prensa/sspc-emite-recomendaciones-para-evitar-fraudes-por-montadeudas-durante-la-cuesta-de-enero)',
                  '[Consejo de Europa. Global cybercrime experts meet at Council of Europe conference marking 25 years of the Budapest Convention (comunicado sobre la apertura de la conferencia).](https://www.coe.int/web/portal/-/global-cybercrime-experts-meet-at-council-of-europe-conference-marking-25-years-of-the-budapest-convention)',
                  '[Comité del Convenio sobre la Ciberdelincuencia (T-CY), Consejo de Europa. Cybercrime, electronic evidence and artificial intelligence: Mapping study.](https://rm.coe.int/cybercrime-electronic-evidence-and-artificial-intelligence-mapping-stu/48802e4bbe)',
               ],
            },
         ],
      },
   ],
   // La fuente no trae bio: se arma solo con frases del propio artículo
   // ("fundador de Movapp", "organización que acompaña a víctimas de apps
   // montadeudas") para no inventar copy.
   authorBio: {
      name: 'Erik Mann',
      text: 'Fundador de Movapp, organización que acompaña a víctimas de apps montadeudas.',
   },
   // La fuente no define relacionados: el artículo enlaza a la historia de
   // Erik y a El Hack, así que se eligen los más cercanos a esos temas.
   relatedArticles: [
      {
         slug: 'historia-movapp',
         title: 'Erik Mann Y Movapp Contra Los Montadeudas – Conoce La Historia De Cómo Surgió Movapp',
      },
      { slug: 'hack-movapp-es-confiable', title: '¿El Hack De Movapp Funciona?' },
      { slug: 'como-denunciar-montadeudas', title: '¿Cómo Denunciar A Los Montadeudas?' },
      { slug: 'que-hacer-con-apps-montadeudas', title: 'Apps Montadeudas ¿Qué Hacer?' },
   ],
};
