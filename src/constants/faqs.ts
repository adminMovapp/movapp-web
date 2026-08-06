// src/constants/faqs.ts
//
// Preguntas de la página /faqs. Igual que @constants/elhack.ts, este copy se
// usa en DOS lugares: el acordeón que renderiza la página y el FAQPage del
// JSON-LD (src/utils/schema.js). Vive acá, y no en el frontmatter de la
// página, para que no puedan divergir: la guía de schema exige que el texto
// de acceptedAnswer sea exactamente el que el usuario lee en pantalla.
//
// `lines` es el párrafo partido en los saltos de línea que ya tenía el markup
// (los <br /> son decorativos): en pantalla se ve igual, y para el schema se
// unen en un solo texto.

export const FAQS_PAGE_TITLE = 'Proceso para adquirir EL HACK';

export const FAQS_PAGE_ITEMS = [
   {
      q: '¿Cómo puedo adquirir EL HACK?',
      lines: [
         'Nuestras asistentes de chat te brindarán una primera atención.',
         'Están capacitadas para atenderte con empatía y de manera profesional.',
      ],
   },
   {
      q: '¿Qué indicaciones debo seguir después del HACK?',
      lines: [
         'Tenemos el más amplio catálogo de aplicaciones montadeudas sobre las que aplicamos el hack ya que tenemos presencia en muchos países de latinoamérica.',
      ],
   },
   {
      q: '¿EL HACK lo aplica el asesor?',
      lines: [
         'Al igual que tú, todos nuestros asesores sufrieron de acoso por parte de los montadeudas.',
         'Llegaste al lugar más adecuado. Tu asesor te escuchará atentamente y será empático con tu situación.',
      ],
   },
   {
      q: '¿Cuánto tiempo tarda el proceso de instalación del hack?',
      lines: [
         'Forma parte de las +16,000 personas que han confiado en nosotros y que han podido dejar este mal trago detrás.',
      ],
   },
];
