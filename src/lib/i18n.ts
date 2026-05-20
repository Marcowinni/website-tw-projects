// Static i18n module — replaces the original React Context implementation.
//
// Astro renders each interactive React component as its own "island" with its
// own React root, which means React Context cannot cross islands. Wrapping
// every island in a LanguageProvider adds boilerplate and risks drift, so we
// expose the translations as a plain module export. `useLanguage()` keeps the
// same call signature as before (`const { t } = useLanguage()`) so existing
// components compile without changes.
//
// Language switching is still a single-language stub (`de`). When real i18n
// lands, swap this for a route-based or query-string-driven solution; until
// then `setLanguage` is intentionally a no-op.

import de from '../locales/de.json' with { type: 'json' }

export type Translations = typeof de
export type Language = 'de'

export const t: Translations = de
export const language: Language = 'de'

export function useLanguage() {
  return {
    t,
    language,
    setLanguage: (_lang: Language) => {
      /* no-op until multi-language support is reintroduced */
    },
  }
}
