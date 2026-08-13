// src/constants/directorioApps.ts
//
// Contenido de /directorio-de-apps (ver skill Importaciones). Los enlaces
// "Ver información" de cada app apuntan a /directorio-de-apps/<slug> --
// esas páginas de detalle todavía no existen, pero el enlace se crea de
// todos modos (mismo criterio ya usado en blog.ts).
//
// Los 5 íconos (icono_prestafacil.webp, icono_fortaprest.webp,
// icono_mexicash.webp, icono_starpresta.webp, icono_crediseguro.webp) no
// existen todavía en el repo -- a pedido explícito, las tarjetas se
// muestran solo con texto (nombre + estatus) hasta que se agreguen los
// archivos reales.

export interface DirectorioApp {
   slug: string;
   name: string;
   status: string;
}

// "Apps de préstamos reportadas" -- historial de apps con reportes
// verificados por extorsión o cobros indebidos.
export const REPORTED_APPS: DirectorioApp[] = [
   { slug: 'prestafacil', name: 'PrestaFácil', status: 'Reportes verificados' },
   { slug: 'fortaprest', name: 'FortaPrest', status: 'Reportes verificados' },
   { slug: 'mexicash', name: 'MexiCash', status: 'Reportes verificados' },
   { slug: 'starpresta', name: 'StarPresta', status: 'Reportes verificados' },
];

// "Apps de préstamos reguladas" -- catálogo de plataformas autorizadas por
// la Condusef y la CNBV. Solo se confirmó 1 app hasta ahora (CrediSeguro);
// el mockup mostraba 3 espacios vacíos adicionales -- no se inventan más
// entradas hasta que se confirmen (ver skill Importaciones, "No hacer").
export const REGULATED_APPS: DirectorioApp[] = [{ slug: 'crediseguro', name: 'CrediSeguro', status: 'Verificada' }];

// "¿Cómo identificamos el estatus de una app?"
export const IDENTIFICATION_CRITERIA: string[] = ['Empresa responsable', 'Información oficial', 'Información pública', 'Reportes disponibles'];

// "Señales de alerta en una app de préstamos"
export const WARNING_SIGNS: string[] = [
   'Solicitud de permisos',
   'Acceso a contactos',
   'Falta de información',
   'Condiciones poco claras',
   'Amenazas',
   'Contacto a terceros',
];

export interface DirectorioStep {
   title: string;
   text: string;
}

// "Qué hacer si tienes problemas"
export const WHAT_TO_DO_STEPS: DirectorioStep[] = [
   { title: 'Conserva la evidencia', text: 'Capturas, mensajes, comprobantes, permisos solicitados.' },
   {
      title: 'Avísale tú primero a tu gente cercana',
      text: 'En cuanto tus contactos saben lo que pasa, la amenaza pierde casi toda su fuerza.',
   },
   { title: 'Revisa y limita permisos', text: 'Contactos, cámara, ubicación, SMS.' },
   { title: 'Protege tus cuentas', text: 'Contraseñas, 2FA, movimientos bancarios.' },
   {
      title: 'Verifica pagos, denuncia y solicita orientación',
      text: 'Busca acompañamiento antes de tomar cualquier decisión.',
   },
];
