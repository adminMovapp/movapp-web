// src/constants/blogImages.ts
//
// Imagen real por artículo, keyed por slug. Set de imágenes nuevo (sept.
// 2026, carpeta "blogf" entregada para reemplazar el set anterior) -- las 27
// cubren exactamente los 27 slugs de @constants/blogArticles.ts, confirmado
// 1 a 1 antes de reemplazar nada. Los archivos originales tenían el título
// del artículo como nombre (con acentos/espacios/signos); se copiaron a
// src/assets con el nombre `blog-<slug>.png` para que el nombre de archivo
// sea estable y no dependa de caracteres especiales.
//
// 2026-11-11: reemplazadas por las portadas .webp de las fichas ART-001..027
// (mismo patrón `blog-<slug>`, ahora .webp). Viven en src/assets para que
// astro:assets las redimensione y optimice; las PNG anteriores se borraron.
import ImgAppsPrestamosConfiables from '@assets/blog-apps-prestamos-confiables.webp';
import ImgCobranzaStarpresta from '@assets/blog-cobranza-starpresta.webp';
import ImgComoDenunciarMontadeudas from '@assets/blog-como-denunciar-montadeudas.webp';
import ImgComoIdentificarAppsMontadeudas from '@assets/blog-como-identificar-apps-montadeudas.webp';
import ImgCondusefMontadeudas from '@assets/blog-condusef-montadeudas.webp';
import ImgDefensaDelDeudorVsMovapp from '@assets/blog-defensa-del-deudor-vs-movapp.webp';
import ImgEstrategiasMontadeudas from '@assets/blog-estrategias-montadeudas.webp';
import ImgFastEfectivoEsConfiable from '@assets/blog-fast-efectivo-es-confiable.webp';
import ImgHackAppNoDisponible from '@assets/blog-hack-app-no-disponible.webp';
import ImgHackMovappEsConfiable from '@assets/blog-hack-movapp-es-confiable.webp';
import ImgHicreditoEsConfiable from '@assets/blog-hicredito-es-confiable.webp';
import ImgHistoriaMovapp from '@assets/blog-historia-movapp.webp';
import ImgKabyEsMontadeudas from '@assets/blog-kaby-es-montadeudas.webp';
import ImgListaMontadeudas from '@assets/blog-lista-montadeudas.webp';
import ImgMexdinLlamaContactos from '@assets/blog-mexdin-llama-contactos.webp';
import ImgMexicashEsMontadeudas from '@assets/blog-mexicash-es-montadeudas.webp';
import ImgMontadeudasRedesSociales from '@assets/blog-montadeudas-redes-sociales.webp';
import ImgMontadeudasVanATuCasa from '@assets/blog-montadeudas-van-a-tu-casa.webp';
import ImgMovappEsConfiable from '@assets/blog-movapp-es-confiable.webp';
import ImgOkDineroCondusef from '@assets/blog-ok-dinero-condusef.webp';
import ImgPrestamaxEsConfiable from '@assets/blog-prestamax-es-confiable.webp';
import ImgQueEsMovapp from '@assets/blog-que-es-movapp.webp';
import ImgQueHacerConAppsMontadeudas from '@assets/blog-que-hacer-con-apps-montadeudas.webp';
import ImgQueHacerSiDescargasteAppMontadeudas from '@assets/blog-que-hacer-si-descargaste-app-montadeudas.webp';
import ImgQuePasaSiNoPagasMontadeudas from '@assets/blog-que-pasa-si-no-pagas-montadeudas.webp';
import ImgQuePasaSiNoPagoCredmex from '@assets/blog-que-pasa-si-no-pago-credmex.webp';
import ImgQuePasoFortaprest from '@assets/blog-que-paso-fortaprest.webp';
// 2026-11-05, artículo de Octopus Conference 2026: nombre de archivo de la
// ficha SEO/GEO (no el patrón blog-<slug>), recorte horizontal de la foto
// vertical original (EU2.webp) a la proporción 1200x630 de la ficha, la misma
// del og:image (ver [articulo].astro); el hero 16:10 solo recorta los lados.
import ImgOctopusConference2026 from '@assets/movapp-octopus-2026-portada.webp';
// 2026-11-17, Buen Fin y apps montadeudas: entregada como "BUEN FIN
// 2026.webp" (1024x683, 3:2), renombrada al patrón blog-<slug>. El hero 16:10
// recorta apenas arriba/abajo; el og:image 1200x630 sale encajado, sin recorte.
import ImgBuenFinAppsMontadeudas from '@assets/blog-buen-fin-apps-montadeudas.webp';
// 2026-11-23, EC3 Cyber Innovation Forum: portada diseñada (1600x900, 16:9,
// entregada con nombre de UUID), renombrada al patrón blog-<slug>. El hero
// 16:10 recorta ~5% por lado (el texto de la izquierda queda dentro); el
// og:image 1200x630 sale encajado, sin recorte.
import ImgEc3CyberInnovationForum2026 from '@assets/blog-ec3-cyber-innovation-forum-2026-europol.webp';

export const BLOG_IMAGES: Record<string, ImageMetadata> = {
   'ec3-cyber-innovation-forum-2026-europol': ImgEc3CyberInnovationForum2026,
   'buen-fin-apps-montadeudas': ImgBuenFinAppsMontadeudas,
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
   'octopus-conference-2026-ciberdelincuencia-ia-extorsion': ImgOctopusConference2026,
};
