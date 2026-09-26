// Índice de búsqueda del sitio (ver SearchPanel.astro para la UI y
// @utils/search.ts para el matching difuso). Cada entrada es una página o
// una sub-sección de una página con anchor propio -- "keywords" son
// sinónimos/términos relacionados en español, no el texto literal de la
// página: el usuario puede escribir "acoso" o "me amenazan" y de todos
// modos llegar a "¿Qué hacer si tienes problemas...?", no solo a una
// coincidencia de texto exacto.
//
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
      title: 'El Hack',
      href: '/el-hack/',
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
      title: 'Aplicaciones',
      href: '/aplicaciones-prestamo/',
      description: 'Listado del estatus legal de apps de préstamos en México.',
      keywords: [
         'aplicaciones',
         'apps de prestamos',
         'directorio de apps',
         'lista negra',
         'apps ilegales',
         'apps confiables',
         'apps seguras',
         'montadeudas',
         'apps fraudulentas',
         'apps de credito',
      ],
   },
   {
      title: '¿Cómo identificamos el estatus de una app?',
      href: '/aplicaciones-prestamo/#directorio-como-identificamos',
      description: 'Criterios usados para clasificar el estatus de una app de préstamos.',
      keywords: ['como identificamos', 'criterios', 'como saber si una app es segura', 'verificar app'],
   },
   {
      title: 'Señales de alerta en una app de préstamos',
      href: '/aplicaciones-prestamo/#directorio-senales-alerta',
      description: 'Señales para detectar fraudes o apps montadeudas.',
      keywords: ['señales de alerta', 'como detectar fraude', 'permisos sospechosos', 'acceso a contactos', 'amenazas'],
   },
   {
      title: '¿Qué hacer si tienes problemas con una app de préstamos?',
      href: '/aplicaciones-prestamo/#directorio-que-hacer',
      description: 'Guía de pasos si estás siendo acosado por una app de préstamos.',
      keywords: [
         'que hacer',
         'me estan acosando',
         'como denunciar',
         'proteger mis contactos',
         'me amenazan',
         'me estan hostigando',
         'evidencia',
         'permisos',
         'proteger mis cuentas',
      ],
   },
   {
      title: 'Preguntas frecuentes',
      href: '/preguntas-frecuentes/',
      description: 'Dudas frecuentes sobre El Hack, Movapp y el acoso de apps de préstamos.',
      keywords: ['preguntas frecuentes', 'dudas', 'faq', 'ayuda', 'como funciona'],
   },
   {
      title: 'Testimonios',
      href: '/testimonios/',
      description: 'Experiencias reales de personas que usaron El Hack.',
      keywords: ['testimonios', 'opiniones', 'experiencias', 'casos de exito', 'reseñas', 'clientes'],
   },
   {
      title: 'Blog',
      href: '/blog/',
      description: 'Blog de préstamos, deudas y montadeudas.',
      keywords: ['blog', 'noticias', 'articulos', 'blog de prestamos', 'deudas'],
   },
   {
      title: 'Evaluaciones de apps y lista negra',
      href: '/blog/evaluaciones/',
      description: 'Noticias y evaluaciones sobre apps de préstamos.',
      keywords: ['evaluaciones de apps', 'lista negra', 'apps evaluadas', 'es confiable', 'prestamax', 'fast efectivo', 'ok dinero'],
   },
   {
      title: 'Contáctanos',
      href: '/contacto/',
      description: 'Escríbenos por WhatsApp o contacto directo.',
      keywords: ['contacto', 'whatsapp', 'hablar con alguien', 'asesoria', 'denunciar', 'ayuda', 'telefono', 'correo', 'escribenos'],
   },
   {
      title: 'Tienda',
      href: '/tienda/',
      description: 'Compra El Hack y protege tus datos.',
      keywords: ['tienda', 'comprar', 'precio', 'pago', 'checkout', 'producto', 'comprar el hack', 'carrito'],
   },
   {
      title: 'Aviso de privacidad',
      href: '/aviso-de-privacidad/',
      description: 'Política de privacidad y manejo de datos personales.',
      keywords: ['aviso de privacidad', 'politica de privacidad', 'datos personales', 'proteccion de datos', 'privacidad'],
   },
];
