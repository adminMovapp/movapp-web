// src/constants/testimonials.ts
//
// Texto confirmado y verbatim (ver skill Importaciones): reemplaza el
// placeholder que había antes (el mockup original traía estas citas con
// errores de OCR/parcialmente ilegibles, así que se había redactado un
// texto provisional con el mismo tono en lo que se confirmaba el real). Las
// fotos ya eran las reales entregadas desde antes (public/img/testimonios,
// migradas a src/assets siguiendo la skill de Rendimiento).
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
      text: 'Le agradezco por la atención que me brindó y ofrezco rotundamente mi apoyo para recomendar Movapp a alguien que pase por el mismo problema que yo.',
      photo: ImgRamon,
   },
   {
      name: 'Elizabeth Chima',
      text: 'Gracias a ustedes recuperé mi tranquilidad. No fue nada fácil salir de esto, pero les agradezco por estar ahí cada vez que me llegaba un mensaje.',
      photo: ImgElizabeth,
   },
   {
      name: 'Lorena García',
      text: 'Quería agradecer por todo su apoyo a lo largo de esta situación. Los mensajes han disminuido bastante y las llamadas igual, son un gran equipo.',
      photo: ImgLorena,
   },
   {
      name: 'Salma Valeria',
      text: 'Muchas gracias por su apoyo, paso a paso me han devuelto mucha paz y tranquilidad. Yo jamás imaginé que esto se hiciera un círculo sin fin.',
      photo: ImgSalma,
   },
   {
      name: 'Amed Zacala',
      text: 'Muchas gracias, la verdad soy súper fan de Movapp. Hasta ahora estoy empezando a regresar a mi estabilidad emocional, económica y sobre todo personal.',
      photo: ImgAmed,
   },
   {
      name: 'Oliver Vargas',
      text: 'Admiro mucho su labor y el hecho de que se entreguen a su trabajo durante tantas horas y tantos días. De verdad me regresaron el alma al cuerpo, estuve a punto de perder a mi familia...',
      photo: ImgOliver,
   },
   {
      name: 'José de Jesús',
      text: 'Debo agradecer mucho la ayuda y solidaridad. Ya han pasado los meses y no volví a tener detalle alguno con las aplicaciones que me ayudaste.',
      photo: ImgJose,
   },
   {
      name: 'Omar',
      text: 'La diferencia es abismal gracias a la familia Movapp. Ya río y estoy recuperando mi peso. Respiro, tranquilo, me devolvieron la vida, puedo caminar sin preocupación.',
      photo: ImgOmar,
   },
   {
      name: 'Gaby',
      text: 'Volví a dormir, después de meses no tomé medicamento y dormí. Las llamadas se quitaron, se notó inmediatamente el cambio. Siempre hay que hablar porque solos no podemos.',
      photo: ImgGaby,
   },
];
