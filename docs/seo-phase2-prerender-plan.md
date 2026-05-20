# Phase 2 — Static Prerendering for tw-services.ch

**Status:** Planned. Not implemented in `seo-phase1-discovery-schema` PR.
**Estimated effort:** 4–8 hours including testing.

## Why Phase 2 is needed

Phase 1 (this PR) fixes 70% of the SEO surface — discovery files, schema, OG tags, security headers — by injecting metadata into the static `index.html` that Vite serves. Crawlers that follow `<link rel="canonical">`, parse JSON-LD, and read OG tags work correctly after Phase 1.

What Phase 1 does **not** fix: the static HTML body is `<div id="root"></div>`. Crawlers that don't execute JavaScript (Bing fast pass, ChatGPT browse, Perplexity, Claude Web, smaller crawlers) see no visible content. Google can render JS but the second-wave indexer is slower and less consistent.

Phase 2 produces a static HTML snapshot per route so the body is crawlable without JS execution.

## Approach: Playwright postbuild snapshotter

We already have `playwright` in `devDependencies`. Writing a custom snapshotter is more reliable than dragging in `react-snap` (unmaintained since 2020) or `vite-plugin-prerender-spa-fix` (puppeteer-based).

### Architecture

```
vite build          → dist/ with index.html + assets/
  ↓
scripts/prerender.ts → Playwright spins up vite preview, visits each route,
                       waits for network idle + animation completion,
                       saves rendered HTML as dist/<route>/index.html
  ↓
vercel deploys      → static files served directly per route
```

### Routes to prerender

Static routes (handled trivially):
- `/`
- `/projects`
- `/impressum`
- `/agb`

Dynamic routes (need an ID manifest):
- `/services/:id` — read from `src/locales/de.json` services list, or hard-coded ID list
- `/about/:id` — same approach

### Implementation steps

1. **Define route manifest** at `scripts/routes.ts`:
   ```ts
   export const STATIC_ROUTES = ['/', '/projects', '/impressum', '/agb']
   export const SERVICE_IDS = ['werbefilm', 'social-cuts', '...']  // from de.json
   export const PROFILE_IDS = ['till', 'marco']
   export const allRoutes = () => [
     ...STATIC_ROUTES,
     ...SERVICE_IDS.map(id => `/services/${id}`),
     ...PROFILE_IDS.map(id => `/about/${id}`),
   ]
   ```

2. **Write prerender script** at `scripts/prerender.ts` (~80 lines):
   - Boot `vite preview` on a free port
   - Launch Playwright chromium
   - For each route: navigate, wait for `networkidle` + custom `data-snapshot-ready` marker
   - Strip framer-motion/gsap inline transforms that should restart on hydration
   - Save `dist/<route>/index.html` with the rendered content

3. **Add `data-snapshot-ready` marker** in `src/App.tsx` so the script knows when content is settled:
   ```tsx
   useEffect(() => {
     document.documentElement.setAttribute('data-snapshot-ready', 'true')
   }, [])
   ```

4. **Update `package.json`**:
   ```json
   "scripts": {
     "build": "vite build && tsx scripts/prerender.ts",
     "prerender": "tsx scripts/prerender.ts"
   }
   ```

5. **Per-route metadata injection** — each snapshotted HTML gets its own:
   - `<title>` from the route's content
   - `<meta name="description">`
   - `<link rel="canonical">`
   - JSON-LD specific to the route (e.g. `Service` schema for `/services/:id`)

6. **Update sitemap.xml** to include all prerendered routes after build.

### Risks and mitigations

| Risk | Mitigation |
|------|-----------|
| Animation libs (Framer Motion, GSAP, tsparticles) leave inline transforms in snapshot → flash on hydrate | Reset transform styles via post-snapshot DOM cleanup; or use CSS `view-transition` for entry animations |
| Supabase client makes network calls during snapshot → snapshot contains loading state | Mock Supabase in snapshot mode via env var `VITE_PRERENDER=true` and a feature-gated stub |
| LanguageContext (i18n) — snapshot must pick one language | Phase 2 prerenders German only; English variant can be added with `/en/` URL prefix in Phase 3 |
| Dynamic IDs change → stale snapshots | Manifest is checked into git; CI fails if `services/` IDs in de.json don't match manifest |
| Hydration mismatch | Use `hydrateRoot` (React 18) instead of `createRoot` only when `__SSR__` flag detects prerendered HTML |

### Acceptance criteria

- [ ] `curl https://www.tw-services.ch/` returns HTML where `<body>` contains the hero heading, services list, and footer (not empty `<div id="root">`)
- [ ] Same for `/projects`, `/services/<id>`, `/about/<id>`, `/impressum`, `/agb`
- [ ] Lighthouse SEO score ≥ 95 on production
- [ ] Schema.org validator passes for all routes
- [ ] No visible flicker/flash when hydration runs (test in slow-3G + 4x CPU throttle)
- [ ] Sitemap includes all prerendered routes

### Out of scope for Phase 2

- React Router framework mode migration
- Astro / Next.js migration (separate decision)
- Per-route OG image generation (would need `@vercel/og` or canvas-design)
- English / French i18n routing

## When to do Phase 2

Trigger conditions (any one):
- Phase 1 deployed and Google Search Console shows < 50% indexed pages after 30 days
- Bing/ChatGPT/Perplexity referrals are zero after 60 days post-Phase-1
- Client / lead pipeline depends on long-tail keyword rankings that need dedicated service pages
