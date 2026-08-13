// src/constants/blogImages.ts
//
// Imagen real por artículo, keyed por slug (mismo criterio que
// @constants/blog.ts: "slug sale del nombre de archivo de imagen del
// wireframe") -- migradas de public/img/blog a src/assets siguiendo la skill
// de Rendimiento. El resto de public/img/blog que no aparece acá todavía no
// tiene un slug/artículo correspondiente en @constants/blog.ts ni en
// @constants/blogCategoryPages.ts, así que se quedó donde estaba sin usar.
//
// Excepción a "slug = nombre de archivo": 'que-es-movapp' no tenía ninguna
// imagen con ese nombre -- a pedido, usa el-hack-funciona.webp (no coincide
// con el slug, asignada a mano en vez de por convención de nombre).
import ImgErikMann from '@assets/erik-mann-contra-los-montadeudas.webp';
import ImgAppsPrestamos from '@assets/aplicaciones-de-prestamos-confiables.webp';
import ImgOjoApps from '@assets/ojo-aplicaciones-montadeudas.webp';
import ImgQueHacer from '@assets/app-montadeudas-que-hacer.webp';
import ImgElHackFunciona from '@assets/el-hack-funciona.webp';
import ImgPrestamaxConfiable from '@assets/prestamax-es-confiable.webp';
import ImgListaMontadeudas from '@assets/lista-de-montadeudas.webp';
import ImgFastEfectivo from '@assets/fast-efectivo-es-confiable.webp';
import ImgOkDineroCondusef from '@assets/ok-dinero-condusef.webp';

export const BLOG_IMAGES: Record<string, ImageMetadata> = {
   'erik-mann-contra-los-montadeudas': ImgErikMann,
   'aplicaciones-de-prestamos-confiables': ImgAppsPrestamos,
   'ojo-aplicaciones-montadeudas': ImgOjoApps,
   'app-montadeudas-que-hacer': ImgQueHacer,
   'que-es-movapp': ImgElHackFunciona,
   'prestamax-es-confiable': ImgPrestamaxConfiable,
   'lista-de-montadeudas': ImgListaMontadeudas,
   'fast-efectivo-es-confiable': ImgFastEfectivo,
   'ok-dinero-condusef': ImgOkDineroCondusef,
   // 'que-paso-con-fortaprest' -- sin imagen todavía (no existe en public/img/blog
   // ni en ningún otro lado del repo); usa el fallback ImagePlaceholder hasta que
   // se entregue el archivo real.
};
