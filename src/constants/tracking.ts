// src/constants/tracking.ts
//
// Catálogo de valores controlados para los parámetros de tracking GA4/GTM
// (ver doc maestro de tracking, hojas 05/08/10). La hoja 08 "Catálogos" del
// documento nunca se recibió -- ERROR_TYPES queda como placeholder hasta
// tenerla confirmada.
import { REPORTED_APPS, REGULATED_APPS } from '@constants/directorioApps';

export const DESTINATION_TYPES = {
   whatsapp: 'whatsapp',
   anchor: 'anchor',
   internalPage: 'internal_page',
   appStore: 'app_store',
   ecommerce: 'ecommerce',
   form: 'form',
   external: 'external',
} as const;

// "Reportadas" (hoja de negocio: apps montadeudas/ilegales) vs "reguladas"
// (apps legales) ya están clasificadas en src/constants/directorioApps.ts --
// se deriva app_type de ahí en vez de mantener una segunda lista paralela.
export const APP_TYPE_BY_SLUG: Record<string, 'legal' | 'ilegal'> = {
   ...Object.fromEntries(REPORTED_APPS.map((app) => [app.slug, 'ilegal' as const])),
   ...Object.fromEntries(REGULATED_APPS.map((app) => [app.slug, 'legal' as const])),
};

// Nombre visible de cada app ("FortaPrest", no "fortapresta"), para el
// parámetro app_name de GA4. Sale del mismo catálogo que APP_TYPE_BY_SLUG:
// el slug identifica (app_id) y este es el nombre que se lee en los
// informes, así que tiene que ser idéntico en TODOS los eventos que hablan
// de una app (app_detail_view, app_select, whatsapp_click, cta_click) --
// si cada sección escribe el suyo a mano, la misma app se parte en dos
// filas distintas del informe.
export const APP_NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
   [...REPORTED_APPS, ...REGULATED_APPS].map((app) => [app.slug, app.name]),
);

export const CHECKOUT_STEPS = {
   cart: 'cart',
   checkout: 'checkout',
   payment: 'payment',
   confirmation: 'confirmation',
} as const;

// TODO(hoja 08): reemplazar por el catálogo real de negocio cuando llegue.
// Valores provisionales derivados de los ejemplos citados en las hojas 01/03/04;
// "validation" es el valor que fija el "Plan de eventos GA4" (fase 1) para
// form_error y checkout_error.
export const ERROR_TYPES = {
   paymentDeclined: 'payment_declined',
   validationError: 'validation',
   backendError: 'backend_error',
} as const;
