// Vídeos de /prensa. La lista (qué vídeos y en qué orden) viene del backend
// de Movapp: la variable de entorno PRESS_VIDEOS_API_URL trae solo el dominio
// (p. ej. https://api-stage.movapp.com.mx) y aquí se le agrega PRESS_PATH.
// Solo devuelve IDs de Vimeo:
//
//    { success, module, videos: [{ id, videoId, orden }] }
//
// Título, duración, fecha y miniatura de cada uno salen del oEmbed público de
// Vimeo, así que se editan en Vimeo, no en este repo. Todo corre en el
// servidor (SSR): ni la URL del backend ni Vimeo llegan al bundle del cliente.
import { readServerEnv } from '@utils/siteLock.ts';

export interface PressVideo {
   vimeoId: string;
   title: string;
   description: string;
   durationSeconds: number;
   uploadDate: string; // ISO 8601 (fecha de subida a Vimeo)
   // Miniatura de Vimeo sin sufijo de tamaño: se le agrega "-d_<ancho>" (ver
   // vimeoThumb) para pedir el ancho exacto que se va a pintar.
   thumbnailBase: string;
   portrait: boolean;
}

interface PressApiResponse {
   success?: boolean;
   videos?: { videoId?: string | number; orden?: number }[];
}

interface VimeoOEmbed {
   title?: string;
   description?: string;
   duration?: number;
   upload_date?: string;
   width?: number;
   height?: number;
   thumbnail_url?: string;
}

const PRESS_PATH = '/videos/press';
const TIMEOUT_MS = 5000;
// Caché en memoria de la instancia de la función SSR: evita repetir las
// 1 + N peticiones en cada visita mientras la instancia siga caliente.
const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { at: number; videos: PressVideo[] } | null = null;

function getApiUrl(): string {
   const runtime = typeof process !== 'undefined' ? process.env.PRESS_VIDEOS_API_URL : undefined;
   const base = readServerEnv(runtime, import.meta.env.PRESS_VIDEOS_API_URL);
   return base ? base.replace(/\/+$/, '') + PRESS_PATH : '';
}

async function fetchJson<T>(url: string): Promise<T> {
   const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
   if (!res.ok) throw new Error(`${res.status} ${url}`);
   return (await res.json()) as T;
}

async function fetchVideo(vimeoId: string): Promise<PressVideo | null> {
   try {
      const data = await fetchJson<VimeoOEmbed>(
         `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${vimeoId}`)}`,
      );
      if (!data.thumbnail_url) return null;
      return {
         vimeoId,
         title: data.title?.trim() || 'Movapp en los medios',
         description: data.description?.trim() ?? '',
         durationSeconds: data.duration ?? 0,
         uploadDate: (data.upload_date ?? '').slice(0, 10),
         thumbnailBase: data.thumbnail_url.replace(/-d_[\dx]+.*$/, '').replace(/\?.*$/, ''),
         portrait: (data.height ?? 0) > (data.width ?? 0),
      };
   } catch (err) {
      // Un vídeo privado/borrado en Vimeo no tumba la página: se omite.
      console.error('[prensa] oEmbed de Vimeo falló para', vimeoId, err);
      return null;
   }
}

export async function getPressVideos(): Promise<PressVideo[]> {
   if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.videos;

   const apiUrl = getApiUrl();
   if (!apiUrl) {
      console.error('[prensa] Falta la variable de entorno PRESS_VIDEOS_API_URL');
      return [];
   }

   try {
      const data = await fetchJson<PressApiResponse>(apiUrl);
      const ids = (data.videos ?? [])
         .filter((v) => v.videoId)
         .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
         .map((v) => String(v.videoId));
      const videos = (await Promise.all(ids.map(fetchVideo))).filter((v): v is PressVideo => v !== null);
      cache = { at: Date.now(), videos };
      return videos;
   } catch (err) {
      console.error('[prensa] No se pudo leer la lista de vídeos de', apiUrl, err);
      // Si ya hubo una respuesta buena, mejor servirla vencida que nada.
      return cache?.videos ?? [];
   }
}

export function vimeoThumb(video: PressVideo, width: number): string {
   return `${video.thumbnailBase}-d_${width}`;
}

export function vimeoEmbedUrl(video: PressVideo, autoplay = false): string {
   const params = new URLSearchParams({ title: '0', byline: '0', portrait: '0', dnt: '1' });
   if (autoplay) params.set('autoplay', '1');
   return `https://player.vimeo.com/video/${video.vimeoId}?${params}`;
}

// 2932 -> "48:52"; 215 -> "3:35".
export function formatDuration(seconds: number): string {
   const m = Math.floor(seconds / 60);
   const s = String(seconds % 60).padStart(2, '0');
   return `${m}:${s}`;
}
