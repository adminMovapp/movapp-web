// src/constants/testimonials.ts
//
// PLACEHOLDER -- pendiente de validación (ver comentario de Angel Martínez en
// la revisión de estructura semántica de /testimonials): nombres, fotos y
// testimonios definitivos todavía no están confirmados. El mockup fuente
// traía estas mismas 9 personas con citas parcialmente ilegibles/con errores
// de OCR; se redactó un texto placeholder limpio y con el mismo tono
// (agradecimiento, tranquilidad recuperada) para cada una en vez de
// reproducir literalmente el texto dañado del mockup. No reemplazar por
// contenido real sin que el equipo de contenido lo confirme primero.
//
// Sin foto real todavía: el avatar de cada tarjeta se genera en
// TestimonialsGrid.astro (iniciales sobre un color, como <img> con su propio
// alt) en vez de importar una imagen real -- swap directo por una foto real
// (misma interfaz `avatarColor` puede quedar o quitarse) en cuanto Marketing
// la entregue.

export const TESTIMONIALS = [
   {
      name: 'Ramón Aparicio',
      text: 'Agradezco mucho la atención que recibí. Sin duda recomendaría Movapp a cualquiera que esté pasando por lo mismo que yo pasé.',
   },
   {
      name: 'Elizabeth Chima',
      text: 'Gracias a ustedes recuperé mi tranquilidad. No fue fácil, pero el mensaje me llegó justo a tiempo.',
   },
   {
      name: 'Lorena García',
      text: 'Quiero agradecer todo el apoyo durante este proceso. Las llamadas y los mensajes disminuyeron muchísimo, gran equipo.',
   },
   {
      name: 'Salma Valeria',
      text: 'Muchas gracias por su apoyo. Poco a poco recuperé mi paz y mi tranquilidad; nunca imaginé que esto tuviera solución.',
   },
   {
      name: 'Amed Zacala',
      text: 'La verdad soy súper fan de Movapp. Estoy recuperando mi estabilidad emocional, económica y sobre todo personal.',
   },
   {
      name: 'Oliver Vargas',
      text: 'Admiro mucho su labor y el tiempo que le dedican a cada caso. Me devolvieron la tranquilidad justo cuando más la necesitaba.',
   },
   {
      name: 'José de Jesús',
      text: 'Debo agradecer mucho la ayuda y el acompañamiento. Ya pasaron varios meses y no he vuelto a tener problemas con esas aplicaciones.',
   },
   {
      name: 'Omar',
      text: 'La diferencia es enorme gracias al equipo de Movapp. Hoy estoy recuperando mi paz y puedo seguir adelante sin tanta preocupación.',
   },
   {
      name: 'Gaby',
      text: 'Volví a dormir tranquila después de meses. Las llamadas pararon casi de inmediato. No hay que enfrentar esto solos.',
   },
];
