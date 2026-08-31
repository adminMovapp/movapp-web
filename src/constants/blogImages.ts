// src/constants/blogImages.ts
//
// Imagen real por artículo, keyed por slug -- migradas de public/img/blog a
// src/assets siguiendo la skill de Rendimiento. El resto de public/img/blog
// que no aparece acá todavía no tiene un slug/artículo correspondiente en
// @constants/blog.ts ni en @constants/blogCategoryPages.ts, así que se
// quedó donde estaba sin usar.
//
// El nombre del archivo importado (@assets/<archivo>.webp) ya no coincide
// con el slug del artículo en varios casos -- el slug ahora sigue la URL
// canónica del documento maestro de SEO, mientras que el nombre de archivo
// quedó fijo al del wireframe/origen original (incl. 3 archivos de
// "riesgo" y 2 de "noticias" ya limpiados a mano de sufijos de WordPress
// como "-1024x683" o "-2" al migrarlos a src/assets). Solo la clave del
// diccionario (el slug) importa para la resolución de imagen; el nombre de
// archivo es independiente y no hace falta que coincida.
import ImgErikMann from '@assets/erik-mann-contra-los-montadeudas.webp';
import ImgAppsPrestamos from '@assets/aplicaciones-de-prestamos-confiables.webp';
import ImgOjoApps from '@assets/ojo-aplicaciones-montadeudas.webp';
import ImgQueHacer from '@assets/app-montadeudas-que-hacer.webp';
import ImgElHackFunciona from '@assets/el-hack-funciona.webp';
import ImgPrestamaxConfiable from '@assets/prestamax-es-confiable.webp';
import ImgListaMontadeudas from '@assets/lista-de-montadeudas.webp';
import ImgFastEfectivo from '@assets/fast-efectivo-es-confiable.webp';
import ImgOkDineroCondusef from '@assets/ok-dinero-condusef.webp';
import ImgEstrategiasComunes from '@assets/estrategias-comunes-de-los-montadeudas.webp';
import ImgMontadeudasVanATuCasa from '@assets/montadeudas-van-a-tu-casa.webp';
import ImgKabyLlamaContactos from '@assets/montadeudas-kaby-llama-contactos.webp';
import ImgMexdinLlamaContactos from '@assets/mexdin-llama-a-tus-contactos.webp';
import ImgPublicarEnRedes from '@assets/montadeudas-publicar-en-redes-sociales.webp';
import ImgCobranzaStarpresta from '@assets/la-cobranza-de-starpresta.webp';
import ImgHicreditoCobrando from '@assets/hicredito-te-esta-cobrando.webp';
import ImgMexicashMolesta from '@assets/mexicash-molesta-a-tus-contactos.webp';
import ImgMovappConfiable from '@assets/movapp-confiable-erik-mann.webp';
import ImgDefensaDeudor from '@assets/defensa-del-deudor-v-movapp.webp';
import ImgQuePasoFortaprest from '@assets/que-paso-con-fortaprest.webp';
import ImgQuePasaCredmex from '@assets/que-pasa-si-no-pago-credmex.webp';
import ImgRealizarElHack from '@assets/realizar-el-hack.webp';
import ImgQueHacerSiDescargaste from '@assets/que-hacer-en-caso-de-descargar-apps-montadeudas.webp';
import ImgComoDenunciarMontadeudas from '@assets/como-denunciar-app-de-prestamos-fraude.webp';
import ImgCondusefVsMontadeudas from '@assets/condusef-vs-los-montadeudas.webp';
import ImgComoNoPagarMontadeudas from '@assets/como-no-pagar-a-montadeudas.webp';
import ImgQueEsMovapp from '@assets/que-es-movapp.webp';

export const BLOG_IMAGES: Record<string, ImageMetadata> = {
   'historia-movapp': ImgErikMann,
   'apps-prestamos-confiables': ImgAppsPrestamos,
   'como-identificar-apps-montadeudas': ImgOjoApps,
   'que-hacer-con-apps-montadeudas': ImgQueHacer,
   // 2026-08-30: reemplaza el placeholder compartido con
   // 'hack-movapp-es-confiable' -- este artículo ya tiene wireframe propio
   // con su propia imagen ("que-es-movapp.webp", encontrada sin usar en
   // public/img/blog/, migrada a src/assets). 'hack-movapp-es-confiable'
   // sigue con ImgElHackFunciona hasta que se construya su propio wireframe.
   'que-es-movapp': ImgQueEsMovapp,
   'prestamax-es-confiable': ImgPrestamaxConfiable,
   'lista-montadeudas': ImgListaMontadeudas,
   'fast-efectivo-es-confiable': ImgFastEfectivo,
   'ok-dinero-condusef': ImgOkDineroCondusef,
   'que-paso-fortaprest': ImgQuePasoFortaprest,
   'estrategias-montadeudas': ImgEstrategiasComunes,
   'montadeudas-van-a-tu-casa': ImgMontadeudasVanATuCasa,
   'kaby-es-montadeudas': ImgKabyLlamaContactos,
   'mexdin-llama-contactos': ImgMexdinLlamaContactos,
   'montadeudas-redes-sociales': ImgPublicarEnRedes,
   'cobranza-starpresta': ImgCobranzaStarpresta,
   'hicredito-es-confiable': ImgHicreditoCobrando,
   'mexicash-es-montadeudas': ImgMexicashMolesta,
   'que-pasa-si-no-pago-credmex': ImgQuePasaCredmex,
   // 'hack-movapp-es-confiable' (categoría "noticias") -- sin wireframe
   // propio todavía, usa este placeholder temporal (ImgElHackFunciona)
   // hasta que se construya su propio artículo.
   'hack-movapp-es-confiable': ImgElHackFunciona,
   'movapp-es-confiable': ImgMovappConfiable,
   'defensa-del-deudor-vs-movapp': ImgDefensaDeudor,
   'hack-app-no-disponible': ImgRealizarElHack,
   'que-hacer-si-descargaste-app-montadeudas': ImgQueHacerSiDescargaste,
   'como-denunciar-montadeudas': ImgComoDenunciarMontadeudas,
   'condusef-montadeudas': ImgCondusefVsMontadeudas,
   'que-pasa-si-no-pagas-montadeudas': ImgComoNoPagarMontadeudas,
};
