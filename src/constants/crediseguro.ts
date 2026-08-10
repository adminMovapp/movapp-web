// src/constants/crediseguro.ts
//
// Preguntas frecuentes de /crediseguro. Igual que @constants/elhack.ts, este
// copy se usa en DOS lugares: el acordeón que renderiza CrediseguroFAQ.astro
// y el FAQPage del JSON-LD (src/utils/schema.js) -- vive acá, y no en el
// frontmatter de la sección, para que ambos no puedan divergir: el texto de
// acceptedAnswer debe ser exactamente el que el usuario lee en pantalla.

export const CREDISEGURO_FAQS = [
   {
      q: '¿CrediSeguro está registrada ante CONDUSEF?',
      a: 'Sí, localizado con folio 00234 al 04 ago 2026.',
   },
   {
      q: '¿Cómo verifico las tasas antes de contratar?',
      a: 'Consulta el sitio oficial o el documento de condiciones publicado.',
   },
];
