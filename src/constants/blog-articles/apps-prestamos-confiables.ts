// ART-002 — ficha "Blog del sitio nuevo · Documento para desarrollo" (2026-11-10). Copy verbatim.
// 2026-11-11: cuerpo reemplazado por el wireframe del blog (H1, autor y 4 párrafos de intro, sin FAQs ni fuentes).
import type { SeoArticleInput } from '@constants/blogArticles.ts';

export const ART_002: SeoArticleInput = {
   slug: 'apps-prestamos-confiables',
   title: 'Aplicaciones de préstamos confiables – Los mejores préstamos confiables en línea',
   metaTitle: 'Apps de préstamos confiables: cómo identificarlas | Movapp',
   metaDescription:
      '¿Qué apps de préstamos son confiables? Conoce 5 criterios para comprobarlo y tres apps cuyo registro verificamos en la CONDUSEF.',
   ogTitle: 'Aplicaciones de préstamos confiables',
   author: 'Equipo Movapp',
   publishDate: 'Diciembre 10, 2025',
   publishedAt: '2025-12-10T18:02:48+00:00',
   modifiedAt: '2026-11-11',
   heroAlt: 'Persona comparando aplicaciones de préstamos en su celular antes de solicitar un crédito',
   sections: [
      {
         blocks: [
            {
               type: 'paragraph',
               text: 'En Movapp no ofrecemos préstamos, ayudamos a personas que han sido víctimas de aplicaciones de préstamos montadeudas. Una consulta que nos hacen con mucha frecuencia es qué préstamos en línea son confiables y seguros.',
            },
            {
               type: 'paragraph',
               text: 'En esta época en la que hay tantas aplicaciones que roban tu información y la usan para intimidarte se ha vuelto una pregunta muy importante.',
            },
            {
               type: 'paragraph',
               text: 'Sabemos que tienes la necesidad de cubrir un gasto que es muy urgente e importante para ti. Y lo que menos deseamos en Movapp es que llegues a caer con los montadeudas y pases un mal momento por su culpa.',
            },
            {
               type: 'paragraph',
               text: 'Por lo tanto, hemos decidido realizar un listado con unas cuantas aplicaciones que no realizan acoso a tus contactos. Es decir, te damos una lista curada con aplicaciones de préstamos en los que puedes confiar.',
            },
         ],
      },
   ],
   related: ['fast-efectivo-es-confiable', 'ok-dinero-condusef', 'que-paso-fortaprest', 'prestamax-es-confiable'],
};
