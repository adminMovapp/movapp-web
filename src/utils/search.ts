// Motor de búsqueda del sitio (ver SearchPanel.astro) -- sin dependencias
// externas a propósito (evita sumar peso a un bundle que solo filtra ~20
// entradas). Hace 3 cosas para lograr que "prácticamente cualquier keyword"
// encuentre resultados en vez de exigir el texto exacto:
//   1. Normaliza acentos/mayúsculas antes de comparar.
//   2. Puntúa por substring/prefijo, no solo por igualdad exacta.
//   3. Tolera errores de tipeo con distancia de Levenshtein acotada.
import type { SearchEntry } from '@constants/searchIndex';

const DIACRITICS_RE = new RegExp('[\\u0300-\\u036f]', 'g');

function normalize(input: string): string {
   return input
      .toLowerCase()
      .normalize('NFD')
      .replace(DIACRITICS_RE, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
}

// Distancia de edición clásica (DP de 2 filas) -- las cadenas acá son
// palabras sueltas (rara vez más de 15 caracteres), así que el costo
// cuadrático no pesa nada en la práctica.
function levenshtein(a: string, b: string): number {
   if (a === b) return 0;
   if (!a.length) return b.length;
   if (!b.length) return a.length;

   let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
   let curr = new Array(b.length + 1).fill(0);

   for (let i = 1; i <= a.length; i++) {
      curr[0] = i;
      for (let j = 1; j <= b.length; j++) {
         const cost = a[i - 1] === b[j - 1] ? 0 : 1;
         curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      [prev, curr] = [curr, prev];
   }
   return prev[b.length];
}

// Puntaje de UN token de la búsqueda contra UNA palabra del índice. Escalones
// (exacto > empieza con > contiene > tipeo cercano) en vez de un único umbral,
// para que un match más preciso siempre gane sobre uno solo "parecido".
function tokenScore(token: string, word: string): number {
   if (word === token) return 10;
   if (word.startsWith(token)) return 7;
   if (word.includes(token)) return 5;

   // Palabras cortas toleran solo 1 error (si no, "es"/"el hack" empiezan a
   // confundirse con cualquier palabra corta del índice); palabras largas
   // toleran 2 (cubre errores de tipeo típicos sin volverse ruido).
   const tolerance = token.length <= 4 ? 1 : 2;
   const dist = levenshtein(token, word);
   if (dist <= tolerance) return Math.max(1, 4 - dist);
   return 0;
}

export function searchSite(query: string, index: SearchEntry[], limit = 6): SearchEntry[] {
   const tokens = normalize(query).split(' ').filter(Boolean);
   if (!tokens.length) return [];

   const scored: { entry: SearchEntry; score: number }[] = [];

   for (const entry of index) {
      const titleWords = normalize(entry.title).split(' ').filter(Boolean);
      const words = normalize([entry.title, entry.description, ...entry.keywords].join(' '))
         .split(' ')
         .filter(Boolean);

      let total = 0;
      for (const token of tokens) {
         let best = 0;
         for (const word of words) {
            const score = tokenScore(token, word);
            // El nombre de la sección pesa más que un sinónimo/keyword suelto:
            // si el usuario escribe justo el nombre de la página, esa entrada
            // debe ganarle a cualquier otra que solo la mencione de pasada.
            const boosted = titleWords.includes(word) ? score * 1.5 : score;
            if (boosted > best) best = boosted;
         }
         total += best;
      }

      if (total > 0) scored.push({ entry, score: total });
   }

   scored.sort((a, b) => b.score - a.score);
   return scored.slice(0, limit).map((s) => s.entry);
}
