// src/constants/faqIcons.ts
//
// Íconos (contenido interno de un <svg>, mismo estilo trazado/minimalista que
// ya usaba @sections/el-hack/ElHackFAQ.astro antes de migrar a
// @components/ui/FAQAccordion.astro) + un color por categoría temática, para
// que cada pregunta de FAQ en todo el sitio (home, /faqs, /el-hack) tenga un
// ícono que representa de qué trata -- no decorativos genéricos -- y un color
// que tenga lógica con ese tema (dinero=verde, tiempo=azul, legal=índigo,
// amenaza=rojo, etc.) en vez de que todo sea el mismo morado de marca.
// Preguntas repetidas en más de un archivo de constantes (p. ej. "¿El Hack
// elimina mi deuda?" en home/el-hack/faqsPageElHack) usan la MISMA categoría
// acá para que el ícono/color no varíe según en qué página aparezcan.

export const FAQ_ICONS = {
   // Billete: temas de deuda existente / dinero que ya se debe.
   bill: '<rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="3"></circle><path d="M6 10h.01M18 14h.01"></path>',
   // Etiqueta de precio: costo del servicio.
   tag: '<path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83Z"></path><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none"></circle>',
   // Burbuja de chat: primer contacto / WhatsApp.
   chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"></path>',
   // Reloj: tiempo/duración del proceso.
   clock: '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path>',
   // Edificio: identidad de la empresa (Movapp).
   building: '<rect x="5" y="3" width="14" height="18" rx="1"></rect><path d="M9 21v-4h6v4"></path><path d="M9 7h.01M9 11h.01M15 7h.01M15 11h.01"></path>',
   // Escudo con check: identidad/protección del producto (El Hack).
   shield: '<path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6Z"></path><path d="m9.5 12 1.8 1.8L15 10.3"></path>',
   // Balanza: temas legales/derechos.
   scale: '<path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M5 7 2 13h6L5 7Z"></path><path d="M19 7 16 13h6l-3-6Z"></path><path d="M8 21h8"></path>',
   // Personas: familia/contactos.
   users: '<circle cx="9" cy="8" r="3"></circle><path d="M4 20c0-3 2.5-5 5-5s5 2 5 5"></path><circle cx="17" cy="9" r="2.3"></circle><path d="M15.5 13.2c1.8.4 3 1.8 3 3.3"></path>',
   // Triángulo de alerta: amenazas/riesgo.
   alertTriangle: '<path d="M12 3 2 20h20L12 3Z"></path><path d="M12 9v5"></path><path d="M12 17h.01"></path>',
   // Casa: visita a domicilio.
   home: '<path d="M4 11 12 4l8 7"></path><path d="M6 10v10h12V10"></path><path d="M10 20v-5h4v5"></path>',
   // Círculo prohibido: límites / "qué no hace".
   prohibit: '<circle cx="12" cy="12" r="9"></circle><path d="m6 6 12 12"></path>',
   // Portapapeles con check: seguimiento posterior / soporte continuo.
   checklist: '<rect x="6" y="4" width="12" height="17" rx="1.5"></rect><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"></path><path d="m9 12 2 2 4-4"></path><path d="M9 17h6"></path>',
} as const;

export const FAQ_COLORS = {
   debt: '#10b981', // esmeralda -- deuda/dinero que ya se debe
   cost: '#f59e0b', // ámbar -- costo/precio del servicio
   contact: '#14b8a6', // verde azulado -- primer contacto/WhatsApp
   time: '#0ea5e9', // celeste -- tiempo/duración
   company: '#3b82f6', // azul -- identidad de Movapp
   protection: '#8149e2', // morado de marca -- identidad/protección de El Hack
   legal: '#6366f1', // índigo -- legal/derechos
   family: '#ec4899', // rosa -- familia/contactos
   threat: '#ef4444', // rojo -- amenazas/riesgo
   homeVisit: '#f97316', // naranja -- visita a domicilio
   limits: '#fb7185', // rosa-rojizo -- límites/"qué no hace"
   followUp: '#06b6d4', // cian -- seguimiento/soporte posterior
} as const;
