// Atributo title de los enlaces del cuerpo del blog (2026-11-11, comentarios
// de los wireframes del blog). Se deriva del destino para que nunca quede
// desactualizado respecto del texto real de la página enlazada:
//   /blog/<slug>/                 -> H1 vigente del artículo (misma fuente que
//                                    las tarjetas de "Artículos relacionados")
//   /aplicaciones-prestamo/<slug>/ -> "Ficha de <App>: información y reportes de víctimas"
//   otras páginas internas         -> PAGE_TITLES (abajo)
//   enlaces externos               -> el dominio (p. ej. "webapps.condusef.gob.mx")
// Un enlace puede fijar el suyo a mano con [texto](href "title"), ver BlogInline.astro.
import { BLOG_ARTICLES } from '@constants/blogArticles.ts';
import { REGULATED_APPS, REPORTED_APPS } from '@constants/directorioApps.ts';

const BLOG_TITLES = new Map(BLOG_ARTICLES.map((a) => [a.slug, a.title]));
const APP_NAMES = new Map([...REPORTED_APPS, ...REGULATED_APPS].map((app) => [app.slug, app.name]));

// Copy de los comentarios de los wireframes del blog.
const PAGE_TITLES: Record<string, string> = {
   '/el-hack/': 'El Hack: el servicio de Movapp para frenar el acoso de las apps de préstamo',
   '/aplicaciones-prestamo/': 'Apps de préstamos reguladas y reportadas en México',
   '/testimonios/': 'Testimonios de víctimas acompañadas por Movapp',
   '/prensa/': 'Sala de prensa de Movapp',
   '/tienda/': 'Tienda de Movapp',
};

export function blogLinkTitle(href: string): string | undefined {
   if (/^https?:\/\//.test(href)) {
      try {
         return new URL(href).hostname;
      } catch {
         return undefined;
      }
   }
   const path = href.split(/[?#]/)[0];
   const blog = /^\/blog\/([^/]+)\/$/.exec(path);
   if (blog) return BLOG_TITLES.get(blog[1]);
   const app = /^\/aplicaciones-prestamo\/([^/]+)\/$/.exec(path);
   if (app) {
      const name = APP_NAMES.get(app[1]);
      return name ? `Ficha de ${name}: información y reportes de víctimas` : undefined;
   }
   return PAGE_TITLES[path];
}
