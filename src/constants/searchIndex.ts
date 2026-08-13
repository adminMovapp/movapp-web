// Índice de búsqueda del sitio (ver SearchPanel.astro para la UI y
// @utils/search.ts para el matching difuso). Cada entrada es una página o
// una sub-sección de una página con anchor propio -- "keywords" son
// sinónimos/términos relacionados en español, no el texto literal de la
// página: el usuario puede escribir "acoso" o "me amenazan" y de todos
// modos llegar a "¿Qué hacer si tienes problemas...?", no solo a una
// coincidencia de texto exacto.
//
// Los nombres de las apps se importan de directorioApps.ts (no se
// duplican a mano) para que buscar el nombre de una app reportada o
// regulada lleve directo a esa sub-sección.
import { REPORTED_APPS, REGULATED_APPS } from './directorioApps';

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
      title: 'Aplicaciones',
      href: '/directorio-de-apps',
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
      title: 'Apps de préstamos reportadas',
      href: '/directorio-de-apps#directorio-reportadas',
      description: 'Historial de apps con reportes verificados por extorsión o cobros indebidos.',
      keywords: [
         'apps reportadas',
         'lista negra',
         'apps con fraude',
         'extorsion',
         'cobros indebidos',
         'apps peligrosas',
         ...REPORTED_APPS.map((app) => app.name),
      ],
   },
   {
      title: 'Apps de préstamos reguladas',
      href: '/directorio-de-apps#directorio-reguladas',
      description: 'Catálogo de plataformas autorizadas por la Condusef y la CNBV.',
      keywords: [
         'apps reguladas',
         'apps autorizadas',
         'condusef',
         'cnbv',
         'apps seguras',
         'apps confiables',
         ...REGULATED_APPS.map((app) => app.name),
      ],
   },
   {
      title: '¿Cómo identificamos el estatus de una app?',
      href: '/directorio-de-apps#directorio-como-identificamos',
      description: 'Criterios usados para clasificar el estatus de una app de préstamos.',
      keywords: ['como identificamos', 'criterios', 'como saber si una app es segura', 'verificar app'],
   },
   {
      title: 'Señales de alerta en una app de préstamos',
      href: '/directorio-de-apps#directorio-senales-alerta',
      description: 'Señales para detectar fraudes o apps montadeudas.',
      keywords: ['señales de alerta', 'como detectar fraude', 'permisos sospechosos', 'acceso a contactos', 'amenazas'],
   },
   {
      title: '¿Qué hacer si tienes problemas con una app de préstamos?',
      href: '/directorio-de-apps#directorio-que-hacer',
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
      title: 'Colaboraciones',
      href: '/collaborations',
      description: 'Colaboraciones y alianzas de Movapp.',
      keywords: ['colaboraciones', 'alianzas', 'medios', 'video', 'partners'],
   },
   {
      title: 'Preguntas frecuentes',
      href: '/faqs',
      description: 'Dudas frecuentes sobre El Hack, Movapp y el acoso de apps de préstamos.',
      keywords: ['preguntas frecuentes', 'dudas', 'faq', 'ayuda', 'como funciona'],
   },
   {
      title: 'Testimonios',
      href: '/testimonials',
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
      href: '/contactanos',
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
      href: '/privacypolicy',
      description: 'Política de privacidad y manejo de datos personales.',
      keywords: ['aviso de privacidad', 'politica de privacidad', 'datos personales', 'proteccion de datos', 'privacidad'],
   },
];
