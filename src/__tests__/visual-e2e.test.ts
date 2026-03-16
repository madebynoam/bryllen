/**
 * Visual E2E test — PROOF that the new project flow works.
 *
 * This test does what a real designer does:
 *   1. Scaffold a consumer app from templates
 *   2. Create a project with manifest, tokens.css, components, pages
 *   3. Start the actual Vite dev server + HTTP server
 *   4. Open a real Chromium browser via Playwright
 *   5. Wait for the canvas to render frames
 *   6. Assert frames have STYLED content (backgrounds, colors — not unstyled text)
 *   7. Take a screenshot as evidence
 *
 * No mocks. No stubs. Real servers, real browser, real rendering.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { chromium, type Browser, type Page } from 'playwright'
import { spawn, type ChildProcess, execSync } from 'child_process'
import {
  mkdirSync, rmSync, existsSync, writeFileSync, symlinkSync,
  readFileSync,
} from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

// ─── Test environment ─────────────────────────────────────────────────────────

const TEST_DIR = join(ROOT, '.bryllen-e2e-visual')
const HTTP_PORT = 14849
const VITE_PORT = 15173
const HTTP_URL = `http://localhost:${HTTP_PORT}`
const VITE_URL = `http://localhost:${VITE_PORT}`

let httpServer: ChildProcess
let viteServer: ChildProcess
let browser: Browser
let page: Page

// ─── Helpers ──────────────────────────────────────────────────────────────────

function killPort(port: number) {
  try {
    execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null`, { stdio: 'ignore' })
  } catch { /* nothing on the port */ }
}

async function waitForHttp(url: string, maxMs = 15000): Promise<void> {
  const deadline = Date.now() + maxMs
  while (Date.now() < deadline) {
    try {
      await fetch(url)
      return
    } catch {
      await new Promise(r => setTimeout(r, 200))
    }
  }
  throw new Error(`${url} not reachable within ${maxMs}ms`)
}

// ─── Consumer app scaffolding ─────────────────────────────────────────────────

function scaffoldConsumerApp() {
  // Create directory structure
  mkdirSync(join(TEST_DIR, 'src', 'projects'), { recursive: true })

  // Symlink node_modules/bryllen → repo root so bryllen/runtime and bryllen/vite-plugin resolve
  const nmDir = join(TEST_DIR, 'node_modules')
  mkdirSync(nmDir, { recursive: true })
  symlinkSync(ROOT, join(nmDir, 'bryllen'), 'dir')

  // Write .bryllen-ports.json BEFORE starting servers
  writeFileSync(
    join(TEST_DIR, '.bryllen-ports.json'),
    JSON.stringify({ http: HTTP_PORT, vite: VITE_PORT, vitePid: null, httpPid: null })
  )

  // index.html
  writeFileSync(join(TEST_DIR, 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bryllen Visual E2E Test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`)

  // vite.config.ts
  writeFileSync(join(TEST_DIR, 'vite.config.ts'), `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { bryllenPlugin } from 'bryllen/vite-plugin'

export default defineConfig({
  plugins: [react(), bryllenPlugin()],
})
`)

  // src/main.tsx
  writeFileSync(join(TEST_DIR, 'src', 'main.tsx'), `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`)

  // src/App.tsx
  writeFileSync(join(TEST_DIR, 'src', 'App.tsx'), `import { BryllenShell } from 'bryllen/runtime'
import { manifests } from 'virtual:bryllen-manifests'

export default function App() {
  return <BryllenShell manifests={manifests} />
}
`)

  // src/index.css
  writeFileSync(join(TEST_DIR, 'src', 'index.css'), `*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: #F0F0F0;
  color: #1F2937;
}
`)

  // src/vite-env.d.ts
  writeFileSync(join(TEST_DIR, 'src', 'vite-env.d.ts'), `/// <reference types="vite/client" />

declare module 'virtual:bryllen-manifests' {
  import type { ProjectManifest } from 'bryllen/runtime'
  export const manifests: ProjectManifest[]
}
`)

  // tsconfig.json (minimal for Vite — it doesn't actually typecheck, just transpiles)
  writeFileSync(join(TEST_DIR, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2020',
      module: 'ESNext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      strict: true,
      noEmit: true,
      skipLibCheck: true,
    },
    include: ['src'],
  }, null, 2))
}

// ─── Test project files ───────────────────────────────────────────────────────

function createTestProject() {
  const projectDir = join(TEST_DIR, 'src', 'projects', 'test-landing')
  const v1Dir = join(projectDir, 'v1')
  const componentsDir = join(v1Dir, 'components')
  const pagesDir = join(v1Dir, 'pages')

  mkdirSync(componentsDir, { recursive: true })
  mkdirSync(pagesDir, { recursive: true })

  // tokens.css — MUST use :root (the bug we fixed)
  writeFileSync(join(v1Dir, 'tokens.css'), `:root, .iter-v1 {
  --primary: oklch(0.55 0.2 250);
  --surface: oklch(0.98 0.003 80);
  --text: oklch(0.2 0.01 250);
  --accent: oklch(0.65 0.25 30);
  --radius: 12px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
}
`)

  // Component: HeroSection
  writeFileSync(join(componentsDir, 'HeroSection.tsx'), `export function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      style={{
        background: 'var(--surface)',
        padding: 'var(--space-lg)',
        color: 'var(--text)',
        minHeight: 400,
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>Ship faster with AI</h1>
      <p style={{ fontSize: 18, marginBottom: 'var(--space-md)', opacity: 0.8 }}>
        The modern platform for building products.
      </p>
      <button
        data-testid="hero-cta"
        style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: 'var(--radius)',
          border: 'none',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Get Started
      </button>
    </section>
  )
}
`)

  // Component: FeatureGrid
  writeFileSync(join(componentsDir, 'FeatureGrid.tsx'), `export function FeatureGrid() {
  const features = ['Fast', 'Secure', 'Scalable']
  return (
    <section
      data-testid="feature-grid"
      style={{
        padding: 'var(--space-lg)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-md)',
      }}
    >
      {features.map(f => (
        <div
          key={f}
          data-testid={\`feature-card-\${f.toLowerCase()}\`}
          style={{
            background: 'var(--surface)',
            padding: 'var(--space-md)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--accent)',
          }}
        >
          <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>{f}</h3>
          <p style={{ color: 'var(--text)' }}>Built for modern teams.</p>
        </div>
      ))}
    </section>
  )
}
`)

  writeFileSync(join(componentsDir, 'index.ts'), `export { HeroSection } from './HeroSection'
export { FeatureGrid } from './FeatureGrid'
`)

  // Page: Direction A — full landing page
  writeFileSync(join(pagesDir, 'DirectionA.tsx'), `import { HeroSection } from '../components/HeroSection'
import { FeatureGrid } from '../components/FeatureGrid'

export function DirectionA() {
  return (
    <div data-testid="direction-a" style={{ width: '100%' }}>
      <HeroSection />
      <FeatureGrid />
    </div>
  )
}
`)

  // Page: Direction B — dark variant
  writeFileSync(join(pagesDir, 'DirectionB.tsx'), `import { HeroSection } from '../components/HeroSection'

export function DirectionB() {
  return (
    <div
      data-testid="direction-b"
      style={{
        width: '100%',
        background: 'var(--text)',
        color: 'var(--surface)',
        minHeight: 400,
      }}
    >
      <HeroSection />
    </div>
  )
}
`)

  // manifest.ts
  writeFileSync(join(projectDir, 'manifest.ts'), `import type { ProjectManifest } from 'bryllen/runtime'
import './v1/tokens.css'
import { DirectionA } from './v1/pages/DirectionA'
import { DirectionB } from './v1/pages/DirectionB'

const manifest: ProjectManifest = {
  id: 'visual-e2e-test-uuid',
  project: 'test-landing',
  components: {
    DirectionA,
    DirectionB,
  },
}

export default manifest
`)
}

// ─── Test suite ───────────────────────────────────────────────────────────────

describe('Visual E2E — New Project Renders Styled Frames', () => {
  beforeAll(async () => {
    // Kill any leftover processes on our test ports
    killPort(HTTP_PORT)
    killPort(VITE_PORT)
    await new Promise(r => setTimeout(r, 500))

    // Clean slate
    if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true })

    // Scaffold consumer app + test project
    scaffoldConsumerApp()
    createTestProject()

    // Start HTTP server
    httpServer = spawn('node', [join(ROOT, 'src/server/http-server.js')], {
      cwd: TEST_DIR,
      env: { ...process.env, BRYLLEN_HTTP_PORT: String(HTTP_PORT) },
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    // Start Vite dev server
    viteServer = spawn('npx', ['vite', '--port', String(VITE_PORT), '--strictPort'], {
      cwd: TEST_DIR,
      env: { ...process.env, BRYLLEN_HTTP_PORT: String(HTTP_PORT) },
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    })

    // Collect stderr for debugging
    let httpStderr = ''
    let viteStderr = ''
    httpServer.stderr?.on('data', (d: Buffer) => { httpStderr += d.toString() })
    viteServer.stderr?.on('data', (d: Buffer) => { viteStderr += d.toString() })

    // Wait for both servers
    try {
      await Promise.all([
        waitForHttp(`${HTTP_URL}/frames?project=__healthcheck__`, 10000),
        waitForHttp(VITE_URL, 30000),
      ])
    } catch (e) {
      httpServer.kill('SIGKILL')
      viteServer.kill('SIGKILL')
      throw new Error(
        `Servers failed to start.\nHTTP stderr:\n${httpStderr}\nVite stderr:\n${viteStderr}\n\nOriginal: ${e}`
      )
    }

    // Create frame records in the DB (simulates what the agent does)
    const frames = [
      { project: 'test-landing', id: 'dir-a', title: 'Direction A', componentKey: 'DirectionA', width: 1440, height: 900 },
      { project: 'test-landing', id: 'dir-b', title: 'Direction B', componentKey: 'DirectionB', width: 1440, height: 900 },
    ]
    for (const frame of frames) {
      await fetch(`${HTTP_URL}/frames`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(frame),
      })
    }

    // Launch browser
    browser = await chromium.launch({ headless: true })
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

    // Collect console errors for debugging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`[BROWSER ERROR] ${msg.text()}`)
      }
    })
    page.on('pageerror', err => {
      console.error(`[PAGE ERROR] ${err.message}`)
    })

    // Suppress the welcome tour by setting localStorage before navigating
    await page.goto(VITE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.evaluate(() => localStorage.setItem('bryllen:tour-completed', 'true'))
    await page.reload({ waitUntil: 'domcontentloaded' })

    // Wait for React to mount and frames to render
    await page.waitForTimeout(5000)
  }, 60000)

  afterAll(async () => {
    if (page) await page.close().catch(() => {})
    if (browser) await browser.close().catch(() => {})
    if (viteServer) viteServer.kill('SIGKILL')
    if (httpServer) httpServer.kill('SIGKILL')

    // Wait for processes to die
    await new Promise(r => setTimeout(r, 500))
    killPort(HTTP_PORT)
    killPort(VITE_PORT)

    // Cleanup
    if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true })
  })

  it('canvas renders with frame containers', async () => {
    // Frames render directly in DOM with data-frame-id attributes
    const frameContainers = await page.$$('[data-frame-id]')
    expect(frameContainers.length).toBe(2) // DirectionA + DirectionB

    // Each frame should have a data-frame-content child
    for (const container of frameContainers) {
      const content = await container.$('[data-frame-content]')
      expect(content).toBeTruthy()
    }
  }, 15000)

  it('hero CTA button has styled background from tokens.css (not transparent)', async () => {
    // The button uses var(--primary) = oklch(0.55 0.2 250)
    // If :root tokens are missing (the bug), it would be transparent
    const button = await page.$('[data-testid="hero-cta"]')
    expect(button).toBeTruthy()

    const bgColor = await button!.evaluate(el => window.getComputedStyle(el).backgroundColor)

    // Must resolve to a real color, not transparent/default
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(bgColor).not.toBe('transparent')
    expect(bgColor).not.toBe('')

    // Should also have border-radius from var(--radius) = 12px
    const radius = await button!.evaluate(el => window.getComputedStyle(el).borderRadius)
    expect(radius).toBe('12px')
  }, 15000)

  it('hero section has styled background from var(--surface)', async () => {
    const hero = await page.$('[data-testid="hero-section"]')
    expect(hero).toBeTruthy()

    const bgColor = await hero!.evaluate(el => window.getComputedStyle(el).backgroundColor)

    // var(--surface) = oklch(0.98 0.003 80) → resolves to a near-white warm color
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(bgColor).not.toBe('transparent')
  }, 15000)

  it('feature grid uses CSS grid layout with 3 cards', async () => {
    const grid = await page.$('[data-testid="feature-grid"]')
    expect(grid).toBeTruthy()

    const display = await grid!.evaluate(el => window.getComputedStyle(el).display)
    expect(display).toBe('grid')

    const cards = await page.$$('[data-testid^="feature-card-"]')
    expect(cards.length).toBe(3)

    // Each card should have styled background and border-radius
    for (const card of cards) {
      const styles = await card.evaluate(el => {
        const s = window.getComputedStyle(el)
        return { bg: s.backgroundColor, radius: s.borderRadius }
      })
      expect(styles.bg).not.toBe('rgba(0, 0, 0, 0)')
      expect(styles.radius).toBe('12px')
    }
  }, 15000)

  it('Direction B has dark background from var(--text)', async () => {
    const dirB = await page.$('[data-testid="direction-b"]')
    expect(dirB).toBeTruthy()

    const bgColor = await dirB!.evaluate(el => window.getComputedStyle(el).backgroundColor)

    // var(--text) = oklch(0.2 0.01 250) → resolves to a dark color
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(bgColor).not.toBe('transparent')
    // It should be a dark color (low lightness) — not white or light
    // Parse rgb values — dark means R, G, B are all < 100
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (match) {
      const [, r, g, b] = match.map(Number)
      expect(r).toBeLessThan(100)
      expect(g).toBeLessThan(100)
      expect(b).toBeLessThan(100)
    }
  }, 15000)

  it('takes a screenshot as visual evidence', async () => {
    const screenshotDir = join(ROOT, '.bryllen-e2e-visual-evidence')
    mkdirSync(screenshotDir, { recursive: true })

    const screenshotPath = join(screenshotDir, 'visual-e2e-canvas.png')
    await page.screenshot({ path: screenshotPath, fullPage: false })

    expect(existsSync(screenshotPath)).toBe(true)

    // File should be a real image, not empty
    const stats = readFileSync(screenshotPath)
    expect(stats.length).toBeGreaterThan(1000) // Minimum reasonable screenshot size
  }, 10000)
})
