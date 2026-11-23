// src/constants/blogArticles.ts
//
// Contenido de la página de detalle de UN artículo individual del blog
// (/blog/<slug>, ver src/pages/blog/[articulo].astro). Una entrada acá = una
// página nueva, nada que tocar en el .astro.
//
// 2026-11-10 (rama update-SEO-11-10-2026): los 27 artículos originales se
// reescribieron con las fichas "Blog del sitio nuevo · Documento para
// desarrollo" (ART-001 a ART-027, PDF): H1, meta title/description, OG
// title, autor, fechas, ALT de portada, cuerpo verbatim, enlaces internos,
// preguntas frecuentes y fuentes. Cada artículo vive ahora en su propio
// archivo de @constants/blog-articles/ (antes eran ~2,300 líneas en este
// archivo) y se ensambla abajo con seoArticle(), que deriva lo que la ficha
// no repite: breadcrumb y headline del schema = H1, minutos de lectura
// calculados del texto, y títulos de "relacionados" tomados del H1 vigente
// de cada artículo (antes estaban copiados a mano y se desincronizaban).
//
// Las tarjetas de @constants/blog.ts y @constants/blogCategoryPages.ts
// siguen llevando su propio título (criterio existente del proyecto); se
// actualizaron al H1 nuevo en el mismo cambio.
export interface BlogArticle {
   slug: string;
   // H1. Se muestra en mayúsculas vía CSS ("uppercase").
   title: string;
   // <title> del documento, completo con el "| Movapp" incluido.
   metaTitle: string;
   // Meta description (y og:description / twitter:description).
   metaDescription: string;
   // og:title / twitter:title cuando la ficha pide uno distinto del meta
   // title (2026-11-10, fichas ART-001..027). Sin esto se usa metaTitle.
   ogTitle?: string;
   // Texto del breadcrumb visible y del último ListItem del BreadcrumbList.
   breadcrumbLabel: string;
   author: string;
   // Fecha visible, formato "Mes D, AAAA" (la parsea parseSpanishDate).
   publishDate: string;
   // datePublished del schema con hora exacta (ISO 8601), cuando la ficha la
   // trae. Sin esto se usa publishDate convertida a AAAA-MM-DD.
   publishedAt?: string;
   // dateModified del schema (AAAA-MM-DD). Sin esto, = datePublished.
   modifiedAt?: string;
   readingMinutes: number;
   // Override solo para móvil -- ver BlogArticleHero.astro. Opcional.
   mobileAuthor?: string;
   mobileReadingMinutes?: number;
   // Subtítulo bajo el H1, ALT y pie de foto de la imagen destacada, y un
   // "headline" del BlogPosting distinto del metaTitle.
   subtitle?: string;
   heroAlt?: string;
   heroCaption?: string;
   schemaHeadline?: string;
   // Etiqueta corta sobre el H1 ("COMUNICADO · CIBERSEGURIDAD"), texto
   // normal, nunca encabezado (2026-11-23, comunicado del EC3 Cyber
   // Innovation Forum). Opcional.
   kicker?: string;
   // @type del artículo en el schema cuando la ficha pide uno distinto de
   // BlogPosting (p. ej. NewsArticle para un comunicado) y su nodo "about"
   // (p. ej. el Event del que trata). Solo datos visibles en la página.
   schemaType?: 'BlogPosting' | 'NewsArticle';
   schemaAbout?: Record<string, unknown>;
   // Secciones de cuerpo -- cada una es un H2 opcional + una secuencia
   // ordenada de bloques (ver BlogArticleBody.astro).
   sections: {
      heading?: string;
      blocks: BlogBlock[];
   }[];
   // Preguntas frecuentes (2026-11-10): se pintan como H2 + H3 por pregunta
   // al final del cuerpo Y alimentan el FAQPage del schema desde el mismo
   // array, para que el texto visible y el JSON-LD no puedan divergir. Las
   // respuestas usan la misma sintaxis inline del cuerpo (**negrita**,
   // [enlace](href)); el schema la limpia a texto plano.
   faqHeading?: string;
   faqs?: { q: string; a: string }[];
   // Lista "Fuentes" (H2 + viñetas) después de las preguntas frecuentes.
   sourcesList?: string[];
   authorBio: {
      name: string;
      text: string;
   };
   relatedArticles: { slug: string; title: string }[];
}

export type BlogBlock =
   | { type: 'paragraph'; text: string; mobileText?: string }
   | { type: 'appGrid'; apps: { name: string; icon: string | null }[] }
   | { type: 'orderedList'; items: string[]; start?: number }
   // Lista con viñetas, sin numerar.
   | { type: 'unorderedList'; items: string[] }
   // Lista con letras (A, B, C...), ya incluidas en cada item.
   | { type: 'letteredList'; items: string[] }
   // Imagen ilustrativa de cuerpo. Sin "src" se muestra el ImagePlaceholder.
   | { type: 'image'; alt: string; src?: ImageMetadata; caption?: string }
   // Fuentes numeradas, destino de las llamadas [^n].
   | { type: 'sources'; items: string[] }
   // Subtítulo H3 dentro de una sección (2026-11-10, fichas ART).
   | { type: 'subheading'; text: string }
   // Recuadro destacado (aclaraciones, línea de crisis) -- 2026-11-10.
   // "title" (2026-11-23, EC3): primera línea en negrita, en su propia línea.
   | { type: 'callout'; text: string; title?: string }
   // Tabla con encabezado (registro SIPRES, comparativas) -- 2026-11-10.
   // Celdas con la misma sintaxis inline del cuerpo.
   | { type: 'table'; head: string[]; rows: string[][] }
   // Preguntas frecuentes con el diseño de FAQAccordion.astro (tarjetas,
   // giro de entrada y estela), 2026-11-17, artículo del Buen Fin. "title"
   // es el H2 de la sección y cada "q" un H3. A diferencia del campo "faqs"
   // del artículo, NO alimenta el FAQPage del schema: es solo diseño.
   | { type: 'faqAccordion'; title: string; items: { q: string; a: string }[] };

// Lo que trae cada ficha ART: todo menos lo que se deriva en seoArticle().
export type SeoArticleInput = Omit<
   BlogArticle,
   'breadcrumbLabel' | 'schemaHeadline' | 'readingMinutes' | 'authorBio' | 'relatedArticles'
> & {
   // Slugs de los artículos relacionados (orden = orden de las tarjetas).
   related: string[];
};

import { BUEN_FIN_ARTICLE } from '@constants/blog-articles/buen-fin-apps-montadeudas.ts';
import { EC3_FORUM_ARTICLE } from '@constants/blog-articles/ec3-cyber-innovation-forum-2026-europol.ts';
import { OCTOPUS_ARTICLE } from '@constants/blog-articles/octopus-conference-2026-ciberdelincuencia-ia-extorsion.ts';
import { ART_001 } from '@constants/blog-articles/prestamax-es-confiable.ts';
import { ART_002 } from '@constants/blog-articles/apps-prestamos-confiables.ts';
import { ART_003 } from '@constants/blog-articles/fast-efectivo-es-confiable.ts';
import { ART_004 } from '@constants/blog-articles/lista-montadeudas.ts';
import { ART_005 } from '@constants/blog-articles/ok-dinero-condusef.ts';
import { ART_006 } from '@constants/blog-articles/que-paso-fortaprest.ts';
import { ART_007 } from '@constants/blog-articles/como-identificar-apps-montadeudas.ts';
import { ART_008 } from '@constants/blog-articles/estrategias-montadeudas.ts';
import { ART_009 } from '@constants/blog-articles/montadeudas-van-a-tu-casa.ts';
import { ART_010 } from '@constants/blog-articles/kaby-es-montadeudas.ts';
import { ART_011 } from '@constants/blog-articles/mexdin-llama-contactos.ts';
import { ART_012 } from '@constants/blog-articles/montadeudas-redes-sociales.ts';
import { ART_013 } from '@constants/blog-articles/cobranza-starpresta.ts';
import { ART_014 } from '@constants/blog-articles/hicredito-es-confiable.ts';
import { ART_015 } from '@constants/blog-articles/que-pasa-si-no-pago-credmex.ts';
import { ART_016 } from '@constants/blog-articles/mexicash-es-montadeudas.ts';
import { ART_017 } from '@constants/blog-articles/que-hacer-con-apps-montadeudas.ts';
import { ART_018 } from '@constants/blog-articles/que-hacer-si-descargaste-app-montadeudas.ts';
import { ART_019 } from '@constants/blog-articles/como-denunciar-montadeudas.ts';
import { ART_020 } from '@constants/blog-articles/condusef-montadeudas.ts';
import { ART_021 } from '@constants/blog-articles/que-pasa-si-no-pagas-montadeudas.ts';
import { ART_022 } from '@constants/blog-articles/que-es-movapp.ts';
import { ART_023 } from '@constants/blog-articles/historia-movapp.ts';
import { ART_024 } from '@constants/blog-articles/movapp-es-confiable.ts';
import { ART_025 } from '@constants/blog-articles/hack-movapp-es-confiable.ts';
import { ART_026 } from '@constants/blog-articles/hack-app-no-disponible.ts';
import { ART_027 } from '@constants/blog-articles/defensa-del-deudor-vs-movapp.ts';

// Texto plano de la sintaxis inline del cuerpo: quita **negritas**, deja
// solo el texto de los [enlaces](href) y las llamadas [^n]. Lo usan el
// conteo de palabras y el FAQPage del schema.
export function stripInline(text: string): string {
   return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[\^\d+\]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function blockText(block: BlogBlock): string[] {
   switch (block.type) {
      case 'paragraph':
      case 'subheading':
         return [block.text];
      case 'callout':
         return [block.title ?? '', block.text];
      case 'orderedList':
      case 'unorderedList':
      case 'letteredList':
      case 'sources':
         return block.items;
      case 'table':
         return [...block.head, ...block.rows.flat()];
      case 'faqAccordion':
         return [block.title, ...block.items.flatMap((item) => [item.q, item.a])];
      default:
         return [];
   }
}

// ~200 palabras por minuto (mismo criterio que el artículo de Octopus).
function readingMinutesOf(input: Pick<SeoArticleInput, 'sections' | 'faqs'>): number {
   const texts = [
      ...input.sections.flatMap((s) => [s.heading ?? '', ...s.blocks.flatMap(blockText)]),
      ...(input.faqs ?? []).flatMap((f) => [f.q, f.a]),
   ];
   const words = stripInline(texts.join(' ')).split(/\s+/).filter(Boolean).length;
   return Math.max(1, Math.round(words / 200));
}

const DEFAULT_AUTHOR_BIO = {
   name: 'Equipo Movapp',
   text: 'Investigamos y verificamos reportes de usuarios sobre apps financieras en México.',
};

function seoArticle({ related, ...input }: SeoArticleInput): BlogArticle {
   return {
      ...input,
      // La ficha pide el H1 completo en el breadcrumb y en el headline.
      breadcrumbLabel: input.title,
      schemaHeadline: input.title,
      readingMinutes: readingMinutesOf(input),
      authorBio: DEFAULT_AUTHOR_BIO,
      // El título real se completa abajo, con el H1 vigente de cada slug.
      relatedArticles: related.map((slug) => ({ slug, title: slug })),
   };
}

const ARTICLES: BlogArticle[] = [
   ...[
      ART_002,
      ART_001,
      ART_004,
      ART_003,
      ART_005,
      ART_006,
      ART_007,
      ART_008,
      ART_011,
      ART_009,
      ART_010,
      ART_012,
      ART_013,
      ART_014,
      ART_015,
      ART_016,
      ART_017,
      ART_018,
      ART_019,
      ART_020,
      ART_021,
      ART_022,
      ART_023,
      ART_024,
      ART_025,
      ART_026,
      ART_027,
   ].map(seoArticle),
   OCTOPUS_ARTICLE,
   // 2026-11-17, Buen Fin y apps montadeudas: ficha propia (no ART-0xx) con
   // Erik Mann de autor, así que la bio es la suya (misma que Octopus) en
   // vez de la de "Equipo Movapp" que pone seoArticle().
   { ...seoArticle(BUEN_FIN_ARTICLE), authorBio: OCTOPUS_ARTICLE.authorBio },
   // 2026-11-23, comunicado del EC3 Cyber Innovation Forum: mismo criterio
   // que Buen Fin (ficha propia, Erik Mann de autor, su bio).
   { ...seoArticle(EC3_FORUM_ARTICLE), authorBio: OCTOPUS_ARTICLE.authorBio },
];

// Títulos de "relacionados" = H1 vigente de cada artículo (fuente única).
const TITLE_BY_SLUG = new Map(ARTICLES.map((a) => [a.slug, a.title]));

export const BLOG_ARTICLES: BlogArticle[] = ARTICLES.map((article) => ({
   ...article,
   relatedArticles: article.relatedArticles.map((r) => ({ slug: r.slug, title: TITLE_BY_SLUG.get(r.slug) ?? r.title })),
}));
