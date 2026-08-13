// Lógica compartida del buscador difuso de la navbar. Tanto HeaderSearch.astro
// (escritorio) como MobileSearch.astro (móvil) son el mismo patrón -- un
// ícono que se "despliega" in-place en un campo + dropdown de sugerencias,
// nunca un modal -- solo cambia el layout/posicionamiento alrededor de cada
// uno. Esta función conecta todo el comportamiento (abrir/cerrar, buscar,
// teclado) a partir de un set de ids, para no duplicar la misma lógica de
// armado de resultados en dos archivos .astro.
import { SEARCH_INDEX, type SearchEntry } from '@constants/searchIndex';
import { searchSite } from '@utils/search';

export interface SearchWidgetIds {
   root: string;
   toggle: string;
   input: string;
   dropdown: string;
   results: string;
   empty: string;
}

export function initSearchWidget(ids: SearchWidgetIds) {
   const root = document.getElementById(ids.root);
   const toggle = document.getElementById(ids.toggle);
   const input = document.getElementById(ids.input) as HTMLInputElement | null;
   const dropdown = document.getElementById(ids.dropdown);
   const resultsList = document.getElementById(ids.results) as HTMLUListElement | null;
   const emptyState = document.getElementById(ids.empty);
   if (!root || !toggle || !input || !dropdown || !resultsList || !emptyState) return;

   let currentResults: SearchEntry[] = [];
   let highlightedIndex = -1;

   function updateHighlight() {
      resultsList!.querySelectorAll<HTMLElement>('.search-result-item').forEach((item, i) => {
         item.classList.toggle('is-active', i === highlightedIndex);
      });
   }

   function renderResults(entries: SearchEntry[]) {
      currentResults = entries;
      highlightedIndex = entries.length ? 0 : -1;
      resultsList!.innerHTML = '';

      entries.forEach((entry, i) => {
         const li = document.createElement('li');
         const a = document.createElement('a');
         a.href = entry.href;
         a.dataset.resultIndex = String(i);
         a.className =
            'search-result-item flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-purple_mv/10 dark:hover:bg-white/5';

         const title = document.createElement('span');
         title.className = 'font-semibold text-gray-900 dark:text-white';
         title.textContent = entry.title;

         const desc = document.createElement('span');
         desc.className = 'text-sm text-gray-600 dark:text-white/60';
         desc.textContent = entry.description;

         a.append(title, desc);
         li.appendChild(a);
         resultsList!.appendChild(li);
      });

      updateHighlight();
   }

   // Sin query escrita: se muestra el índice COMPLETO como "sugerencias" --
   // a pedido explícito, los títulos de cada página/sección (sus h1) en vez
   // de un texto instructivo tipo "escribe una palabra clave". El usuario
   // decide desde ahí si tipear o clickear directo algo que le llame la
   // atención. Con query, el matching difuso de @utils/search.ts filtra.
   function runSearch() {
      const query = input!.value.trim();
      const matches = query ? searchSite(query, SEARCH_INDEX, 6) : SEARCH_INDEX;
      emptyState!.classList.toggle('hidden', matches.length > 0);
      renderResults(matches);
   }

   function isOpen() {
      return root!.classList.contains('is-open');
   }

   function open() {
      if (isOpen()) return;
      root!.classList.add('is-open');
      toggle!.setAttribute('aria-expanded', 'true');
      dropdown!.classList.remove('hidden');
      runSearch();
      input!.focus();
   }

   function close() {
      if (!isOpen()) return;
      root!.classList.remove('is-open');
      toggle!.setAttribute('aria-expanded', 'false');
      dropdown!.classList.add('hidden');
      input!.value = '';
   }

   toggle.addEventListener('click', () => {
      if (isOpen()) close();
      else open();
   });

   input.addEventListener('input', runSearch);

   // Cierra al hacer click afuera del cluster (ícono + campo + dropdown) --
   // no hay backdrop propio porque esto no es un modal.
   document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      if (!(e.target instanceof Node)) return;
      if (!root!.contains(e.target)) close();
   });

   document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;

      if (e.key === 'Escape') {
         close();
         toggle!.focus();
         return;
      }
      if (!currentResults.length) return;

      if (e.key === 'ArrowDown') {
         e.preventDefault();
         highlightedIndex = (highlightedIndex + 1) % currentResults.length;
         updateHighlight();
      } else if (e.key === 'ArrowUp') {
         e.preventDefault();
         highlightedIndex = (highlightedIndex - 1 + currentResults.length) % currentResults.length;
         updateHighlight();
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
         window.location.href = currentResults[highlightedIndex].href;
      }
   });
}
