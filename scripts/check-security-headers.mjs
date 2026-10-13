// Comprueba que el bloque [[headers]] for="/*" de netlify.toml (archivos
// estáticos del CDN) diga exactamente lo mismo que src/utils/securityHeaders.ts
// (respuestas SSR/Edge vía src/middleware.ts). Netlify no aplica [[headers]]
// a respuestas de funciones, por eso existen las dos copias.
//
// Uso: `npm run check:headers`. Node >= 22.18 / 24: importa el .ts directo
// (type stripping nativo); el módulo es puro a propósito (sin imports ni
// import.meta.env). Sin dependencias.
//
// Los estáticos se comparan contra buildSecurityHeaders({ dev: false }) SIN
// apiOrigin: netlify.toml es común a todos los contextos de deploy y el
// único HTML estático (blog) no hace fetch a la API ni monta islas.
import { readFileSync } from 'node:fs';
import { buildSecurityHeaders } from '../src/utils/securityHeaders.ts';

const toml = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
const block = toml.match(
   /\[\[headers\]\]\s*\n\s*for = "\/\*"\s*\n\s*\[headers\.values\]\n((?:[ \t]+[\w-]+ = ".*"\n?)+)/,
)?.[1];
if (!block) {
   console.error('FAIL: no se encontró el bloque [[headers]] for = "/*" en netlify.toml');
   process.exit(1);
}
const actual = Object.fromEntries([...block.matchAll(/^[ \t]+([\w-]+) = "(.*)"$/gm)].map(([, k, v]) => [k, v]));
const expected = buildSecurityHeaders({ apiOrigin: undefined, dev: false });

let ok = true;
for (const [name, value] of Object.entries(expected)) {
   if (actual[name] !== value) {
      ok = false;
      console.error(`FAIL ${name}\n  netlify.toml: ${actual[name] ?? '(ausente)'}\n  ts:           ${value}`);
   }
}
for (const name of Object.keys(actual)) {
   if (!(name in expected)) {
      ok = false;
      console.error(`FAIL ${name}: existe en netlify.toml pero no en securityHeaders.ts`);
   }
}
console.log(
   ok
      ? 'OK: netlify.toml coincide con src/utils/securityHeaders.ts'
      : 'netlify.toml y src/utils/securityHeaders.ts difieren',
);
process.exit(ok ? 0 : 1);
