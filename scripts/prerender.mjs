#!/usr/bin/env node
// Playwright postbuild snapshotter for tw-services.ch SPA.
// Boots `vite preview`, navigates Chromium through STATIC_ROUTES, waits for the
// `data-prerender-ready` marker set by src/main.tsx, then writes per-route
// index.html files into dist/ so Vercel serves static HTML to crawlers.
//
// Dynamic routes (/services/:id, /about/:id) are out of scope for Phase 2 —
// they continue to fall through to the SPA shell.

import { spawn } from 'node:child_process'
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import net from 'node:net'
import { chromium } from 'playwright'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')

const BASE_URL = 'https://www.tw-services.ch'

// Per-route metadata injected into each snapshotted HTML.
// Phase 2.5 will source these from a manifest; for now they live here.
const ROUTES = [
  {
    path: '/',
    title: 'TW Services — Premium-Werbefilme für Neubauprojekte | DACH',
    description: 'TW Services produziert KI-gestützte Werbefilme für Bauträger und Projektentwickler im DACH-Raum. Mehr qualifizierte Anfragen, kürzere Vermarktungsdauer.',
    canonical: `${BASE_URL}/`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
  },
  {
    path: '/projects',
    title: 'Projekte — TW Services',
    description: 'Showcase aller produzierten Werbefilme für Neubauprojekte. Beispiele aus dem DACH-Raum.',
    canonical: `${BASE_URL}/projects`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1',
  },
  {
    path: '/impressum',
    title: 'Impressum — TW Services',
    description: 'Impressum der TW Services (Marke der TW Projects GmbH), Dürnten ZH.',
    canonical: `${BASE_URL}/impressum`,
    robots: 'noindex,follow',
  },
  {
    path: '/agb',
    title: 'AGB — TW Services',
    description: 'Allgemeine Geschäftsbedingungen der TW Services (Marke der TW Projects GmbH).',
    canonical: `${BASE_URL}/agb`,
    robots: 'noindex,follow',
  },
]

async function findFreePort() {
  return new Promise((res, rej) => {
    const srv = net.createServer()
    srv.unref()
    srv.on('error', rej)
    srv.listen(0, () => {
      const { port } = srv.address()
      srv.close(() => res(port))
    })
  })
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url)
      if (r.ok) return true
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`)
}

function injectMeta(html, { title, description, canonical, robots }) {
  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)

  // Replace or insert <meta name="description">
  if (/<meta\s+name="description"[^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${description}" />`)
  } else {
    html = html.replace(/<\/title>/i, `</title>\n    <meta name="description" content="${description}" />`)
  }

  // Replace or insert canonical
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`)
  } else {
    html = html.replace(/<\/title>/i, `</title>\n    <link rel="canonical" href="${canonical}" />`)
  }

  // Replace or insert robots meta
  if (/<meta\s+name="robots"[^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="${robots}" />`)
  } else {
    html = html.replace(/<\/title>/i, `</title>\n    <meta name="robots" content="${robots}" />`)
  }

  return html
}

async function main() {
  if (!existsSync(DIST)) {
    console.error(`✗ dist/ not found. Run "vite build" first.`)
    process.exit(1)
  }

  const port = await findFreePort()
  const previewUrl = `http://localhost:${port}`

  console.log(`→ Starting vite preview on port ${port}...`)
  const preview = spawn(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    ['vite', 'preview', '--port', String(port), '--strictPort'],
    { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'], shell: false }
  )
  preview.stdout?.on('data', () => {}) // silence
  preview.stderr?.on('data', (d) => process.stderr.write(`[vite preview] ${d}`))

  try {
    await waitForServer(previewUrl)
    console.log(`✓ Server ready at ${previewUrl}`)

    const browser = await chromium.launch({ headless: true })
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      userAgent: 'Mozilla/5.0 (Prerender; tw-services Playwright snapshotter)',
      locale: 'de-CH',
    })
    const page = await ctx.newPage()

    for (const route of ROUTES) {
      console.log(`→ Snapshot ${route.path}`)
      const url = previewUrl + route.path
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForFunction(
        () => document.documentElement.getAttribute('data-prerender-ready') === 'true',
        null,
        { timeout: 15000 }
      )

      // Drop the readiness marker so it doesn't ship to production.
      await page.evaluate(() => document.documentElement.removeAttribute('data-prerender-ready'))

      let html = await page.content()
      html = injectMeta(html, route)

      const outDir = route.path === '/' ? DIST : join(DIST, route.path.replace(/^\//, ''))
      if (route.path !== '/') await mkdir(outDir, { recursive: true })
      const outFile = join(outDir, 'index.html')
      await writeFile(outFile, html, 'utf-8')
      console.log(`  ✓ wrote ${outFile}`)
    }

    await browser.close()
    console.log('✓ Prerender complete')
  } finally {
    if (!preview.killed) {
      preview.kill('SIGTERM')
      // On Windows SIGTERM does not always work; fall back.
      setTimeout(() => {
        if (!preview.killed) preview.kill('SIGKILL')
      }, 2000)
    }
  }
}

main().catch((err) => {
  console.error('✗ Prerender failed:', err)
  process.exit(1)
})
