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

export const CHECKOUT_STEPS = {
   cart: 'cart',
   checkout: 'checkout',
   payment: 'payment',
   confirmation: 'confirmation',
} as const;

// TODO(hoja 08): reemplazar por el catálogo real de negocio cuando llegue.
// Valores provisionales derivados de los ejemplos citados en las hojas 01/03/04.
export const ERROR_TYPES = {
   paymentDeclined: 'payment_declined',
   validationError: 'validation_error',
   backendError: 'backend_error',
} as const;
