// src/constants/testimonials.ts
//
// PLACEHOLDER -- pendiente de validación (ver comentario de Angel Martínez en
// la revisión de estructura semántica de /testimonials): el texto de cada
// testimonio todavía no está confirmado. El mockup fuente traía estas mismas
// 9 personas (con foto real, ver import de abajo) con citas parcialmente
// ilegibles/con errores de OCR; se redactó un texto placeholder limpio y con
// el mismo tono (agradecimiento, tranquilidad recuperada) para cada una en
// vez de reproducir literalmente el texto dañado del mockup. No reemplazar
// el texto por contenido real sin que el equipo de contenido lo confirme
// primero -- las fotos, en cambio, ya son las reales entregadas
// (public/img/testimonios, migradas a src/assets siguiendo la skill de
// Rendimiento).
import ImgRamon from '@assets/ramon-aparicio.webp';
import ImgElizabeth from '@assets/elizabeth-chima.webp';
import ImgLorena from '@assets/lorena-garcia.webp';
import ImgSalma from '@assets/salma-valeria.webp';
import ImgAmed from '@assets/amed-zacala.webp';
import ImgOliver from '@assets/oliver-vargas.webp';
import ImgJose from '@assets/jose-de-jesus.webp';
import ImgOmar from '@assets/omar-testimonio.webp';
import ImgGaby from '@assets/gaby-testimonio.webp';

export const TESTIMONIALS = [
   {
      name: 'Ramón Aparicio',
      text: 'Agradezco mucho la atención que recibí. Sin duda recomendaría Movapp a cualquiera que esté pasando por lo mismo que yo pasé.',
      photo: ImgRamon,
   },
   {
      name: 'Elizabeth Chima',
      text: 'Gracias a ustedes recuperé mi tranquilidad. No fue fácil, pero el mensaje me llegó justo a tiempo.',
      photo: ImgElizabeth,
   },
   {
      name: 'Lorena García',
      text: 'Quiero agradecer todo el apoyo durante este proceso. Las llamadas y los mensajes disminuyeron muchísimo, gran equipo.',
      photo: ImgLorena,
   },
   {
      name: 'Salma Valeria',
      text: 'Muchas gracias por su apoyo. Poco a poco recuperé mi paz y mi tranquilidad; nunca imaginé que esto tuviera solución.',
      photo: ImgSalma,
   },
   {
      name: 'Amed Zacala',
      text: 'La verdad soy súper fan de Movapp. Estoy recuperando mi estabilidad emocional, económica y sobre todo personal.',
      photo: ImgAmed,
   },
   {
      name: 'Oliver Vargas',
      text: 'Admiro mucho su labor y el tiempo que le dedican a cada caso. Me devolvieron la tranquilidad justo cuando más la necesitaba.',
      photo: ImgOliver,
   },
   {
      name: 'José de Jesús',
      text: 'Debo agradecer mucho la ayuda y el acompañamiento. Ya pasaron varios meses y no he vuelto a tener problemas con esas aplicaciones.',
      photo: ImgJose,
   },
   {
      name: 'Omar',
      text: 'La diferencia es enorme gracias al equipo de Movapp. Hoy estoy recuperando mi paz y puedo seguir adelante sin tanta preocupación.',
      photo: ImgOmar,
   },
   {
      name: 'Gaby',
      text: 'Volví a dormir tranquila después de meses. Las llamadas pararon casi de inmediato. No hay que enfrentar esto solos.',
      photo: ImgGaby,
   },
];
