// src/constants/blogImages.ts
//
// Imagen real por artículo, keyed por slug. Set de imágenes nuevo (sept.
// 2026, carpeta "blogf" entregada para reemplazar el set anterior) -- las 27
// cubren exactamente los 27 slugs de @constants/blogArticles.ts, confirmado
// 1 a 1 antes de reemplazar nada. Los archivos originales tenían el título
// del artículo como nombre (con acentos/espacios/signos); se copiaron a
// src/assets con el nombre `blog-<slug>.png` para que el nombre de archivo
// sea estable y no dependa de caracteres especiales.
import ImgAppsPrestamosConfiables from '@assets/blog-apps-prestamos-confiables.png';
import ImgCobranzaStarpresta from '@assets/blog-cobranza-starpresta.png';
import ImgComoDenunciarMontadeudas from '@assets/blog-como-denunciar-montadeudas.png';
import ImgComoIdentificarAppsMontadeudas from '@assets/blog-como-identificar-apps-montadeudas.png';
import ImgCondusefMontadeudas from '@assets/blog-condusef-montadeudas.png';
import ImgDefensaDelDeudorVsMovapp from '@assets/blog-defensa-del-deudor-vs-movapp.png';
import ImgEstrategiasMontadeudas from '@assets/blog-estrategias-montadeudas.png';
import ImgFastEfectivoEsConfiable from '@assets/blog-fast-efectivo-es-confiable.png';
import ImgHackAppNoDisponible from '@assets/blog-hack-app-no-disponible.png';
import ImgHackMovappEsConfiable from '@assets/blog-hack-movapp-es-confiable.png';
import ImgHicreditoEsConfiable from '@assets/blog-hicredito-es-confiable.png';
import ImgHistoriaMovapp from '@assets/blog-historia-movapp.png';
import ImgKabyEsMontadeudas from '@assets/blog-kaby-es-montadeudas.png';
import ImgListaMontadeudas from '@assets/blog-lista-montadeudas.png';
import ImgMexdinLlamaContactos from '@assets/blog-mexdin-llama-contactos.png';
import ImgMexicashEsMontadeudas from '@assets/blog-mexicash-es-montadeudas.png';
import ImgMontadeudasRedesSociales from '@assets/blog-montadeudas-redes-sociales.png';
import ImgMontadeudasVanATuCasa from '@assets/blog-montadeudas-van-a-tu-casa.png';
import ImgMovappEsConfiable from '@assets/blog-movapp-es-confiable.png';
import ImgOkDineroCondusef from '@assets/blog-ok-dinero-condusef.png';
import ImgPrestamaxEsConfiable from '@assets/blog-prestamax-es-confiable.png';
import ImgQueEsMovapp from '@assets/blog-que-es-movapp.png';
import ImgQueHacerConAppsMontadeudas from '@assets/blog-que-hacer-con-apps-montadeudas.png';
import ImgQueHacerSiDescargasteAppMontadeudas from '@assets/blog-que-hacer-si-descargaste-app-montadeudas.png';
import ImgQuePasaSiNoPagasMontadeudas from '@assets/blog-que-pasa-si-no-pagas-montadeudas.png';
import ImgQuePasaSiNoPagoCredmex from '@assets/blog-que-pasa-si-no-pago-credmex.png';
import ImgQuePasoFortaprest from '@assets/blog-que-paso-fortaprest.png';

export const BLOG_IMAGES: Record<string, ImageMetadata> = {
   'historia-movapp': ImgHistoriaMovapp,
   'apps-prestamos-confiables': ImgAppsPrestamosConfiables,
   'como-identificar-apps-montadeudas': ImgComoIdentificarAppsMontadeudas,
   'que-hacer-con-apps-montadeudas': ImgQueHacerConAppsMontadeudas,
   'que-es-movapp': ImgQueEsMovapp,
   'prestamax-es-confiable': ImgPrestamaxEsConfiable,
   'lista-montadeudas': ImgListaMontadeudas,
   'fast-efectivo-es-confiable': ImgFastEfectivoEsConfiable,
   'ok-dinero-condusef': ImgOkDineroCondusef,
   'que-paso-fortaprest': ImgQuePasoFortaprest,
   'estrategias-montadeudas': ImgEstrategiasMontadeudas,
   'montadeudas-van-a-tu-casa': ImgMontadeudasVanATuCasa,
   'kaby-es-montadeudas': ImgKabyEsMontadeudas,
   'mexdin-llama-contactos': ImgMexdinLlamaContactos,
   'montadeudas-redes-sociales': ImgMontadeudasRedesSociales,
   'cobranza-starpresta': ImgCobranzaStarpresta,
   'hicredito-es-confiable': ImgHicreditoEsConfiable,
   'mexicash-es-montadeudas': ImgMexicashEsMontadeudas,
   'que-pasa-si-no-pago-credmex': ImgQuePasaSiNoPagoCredmex,
   'hack-movapp-es-confiable': ImgHackMovappEsConfiable,
   'movapp-es-confiable': ImgMovappEsConfiable,
   'defensa-del-deudor-vs-movapp': ImgDefensaDelDeudorVsMovapp,
   'hack-app-no-disponible': ImgHackAppNoDisponible,
   'que-hacer-si-descargaste-app-montadeudas': ImgQueHacerSiDescargasteAppMontadeudas,
   'como-denunciar-montadeudas': ImgComoDenunciarMontadeudas,
   'condusef-montadeudas': ImgCondusefMontadeudas,
   'que-pasa-si-no-pagas-montadeudas': ImgQuePasaSiNoPagasMontadeudas,
};
