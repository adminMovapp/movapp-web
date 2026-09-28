import { createHash } from 'node:crypto';

// Compartido entre src/middleware.ts (verifica la cookie en cada request) y
// src/pages/verificar-acceso.ts (la emite tras validar la contraseña) --
// mismo criterio de hashing que netlify/functions/meta-conversion.js
// (node:crypto, sha256 hex). La cookie nunca guarda la contraseña en texto
// plano: si SITE_LOCK_PASSWORD cambia, cualquier cookie emitida con la
// contraseña anterior deja de ser válida sola, sin tener que invalidarla a mano.
export const SITE_LOCK_GATE_PATH = '/en-desarrollo';
export const SITE_LOCK_VERIFY_PATH = '/verificar-acceso';
export const SITE_LOCK_COOKIE_NAME = 'site_access';

export function hashSiteLockPassword(password: string): string {
   return createHash('sha256').update(password).digest('hex');
}

export function isSiteLockEnabled(): boolean {
   return import.meta.env.SITE_LOCK_ENABLED === 'true';
}
