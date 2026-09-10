// Índice de búsqueda del sitio (ver SearchPanel.astro para la UI y
// @utils/search.ts para el matching difuso). Cada entrada es una página o
// una sub-sección de una página con anchor propio -- "keywords" son
// sinónimos/términos relacionados en español, no el texto literal de la
// página: el usuario puede escribir "acoso" o "me amenazan" y de todos
// modos llegar a "¿Qué hacer si tienes problemas...?", no solo a una
// coincidencia de texto exacto.
//
// El hub /aplicaciones-prestamo, sus 8 landings de apps y las 5
// sub-secciones con anchor de esa página se quitaron de este índice
// (2026-09-10, a pedido explícito y de momento) -- ya no son alcanzables
// desde ningún punto del sitio, ver el comentario en
// MenuMobilePanel.astro/MenuDesktopPanel.astro.

export interface SearchEntry {
   title: string;
   href: string;
   description: string;
   keywords: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
   {
      title: 'Inicio',
      href: '/',
      description: 'Página principal de Movapp y El Hack.',
      keywords: ['home', 'pagina principal', 'movapp', 'el hack', 'bloquear apps de prestamos'],
   },
   {
      title: 'Movapp',
      href: '/nosotros',
      description: 'Quiénes somos y qué hace Movapp.',
      keywords: ['nosotros', 'quienes somos', 'sobre movapp', 'que es movapp', 'mision', 'equipo', 'about us'],
   },
   {
      title: 'El Hack',
      href: '/el-hack',
      description: 'Bloquea el acoso de las apps de préstamo y recupera tu paz.',
      keywords: [
         'el hack',
         'comprar el hack',
         'precio',
         'cuanto cuesta',
         'como funciona el hack',
         'bloquear acoso',
         'apps de prestamo',
         'hostigamiento',
         'cobranza extrajudicial',
         'proteger mis datos',
         'eliminar apps',
         'desinstalar apps',
         'montadeudas',
         'acoso',
      ],
   },
   {
      title: 'Colaboraciones',
      href: '/collaborations',
      description: 'Colaboraciones y alianzas de Movapp.',
      keywords: ['colaboraciones', 'alianzas', 'medios', 'video', 'partners'],
   },
   {
      title: 'Preguntas frecuentes',
      href: '/preguntas-frecuente',
      description: 'Dudas frecuentes sobre El Hack, Movapp y el acoso de apps de préstamos.',
      keywords: ['preguntas frecuentes', 'dudas', 'faq', 'ayuda', 'como funciona'],
   },
   {
      title: 'Testimonios',
      href: '/testimonios',
      description: 'Experiencias reales de personas que usaron El Hack.',
      keywords: ['testimonios', 'opiniones', 'experiencias', 'casos de exito', 'reseñas', 'clientes'],
   },
   {
      title: 'Mente digital',
      href: '/mind',
      description: 'Apoyo psicológico para recuperar tu bienestar emocional.',
      keywords: [
         'mente digital',
         'apoyo psicologico',
         'salud mental',
         'terapia',
         'ansiedad',
         'dra dalia',
         'bienestar emocional',
         'psicologa',
         'ayuda emocional',
      ],
   },
   {
      title: 'Nuestras redes',
      href: '/red',
      description: 'Síguenos en redes sociales y canales oficiales de WhatsApp.',
      keywords: ['redes sociales', 'instagram', 'facebook', 'tiktok', 'youtube', 'whatsapp', 'canales', 'seguirnos'],
   },
   {
      title: 'Blog',
      href: '/blog',
      description: 'Blog de préstamos, deudas y montadeudas.',
      keywords: ['blog', 'noticias', 'articulos', 'blog de prestamos', 'deudas'],
   },
   {
      title: 'Evaluaciones de apps y lista negra',
      href: '/blog/evaluaciones',
      description: 'Noticias y evaluaciones sobre apps de préstamos.',
      keywords: ['evaluaciones de apps', 'lista negra', 'apps evaluadas', 'es confiable', 'prestamax', 'fast efectivo', 'ok dinero'],
   },
   {
      title: 'Contáctanos',
      href: '/contacto',
      description: 'Escríbenos por WhatsApp o contacto directo.',
      keywords: ['contacto', 'whatsapp', 'hablar con alguien', 'asesoria', 'denunciar', 'ayuda', 'telefono', 'correo', 'escribenos'],
   },
   {
      title: 'Tienda',
      href: '/tienda',
      description: 'Compra El Hack y protege tus datos.',
      keywords: ['tienda', 'comprar', 'precio', 'pago', 'checkout', 'producto', 'comprar el hack', 'carrito'],
   },
   {
      title: 'Aviso de privacidad',
      href: '/aviso-de-privacidad',
      description: 'Política de privacidad y manejo de datos personales.',
      keywords: ['aviso de privacidad', 'politica de privacidad', 'datos personales', 'proteccion de datos', 'privacidad'],
   },
];
