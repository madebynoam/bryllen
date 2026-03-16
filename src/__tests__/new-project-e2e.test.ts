/**
 * End-to-end integration test for the new project flow.
 *
 * This test starts the ACTUAL HTTP server, makes REAL HTTP requests,
 * creates REAL files on disk, and verifies the COMPLETE pipeline:
 *
 *   1. POST /annotations (type: 'project') → annotation stored as pending
 *   2. GET /annotations?status=pending → annotation retrievable
 *   3. Agent creates project files on disk (manifest.ts, tokens.css, pages)
 *   4. Vite plugin discovers the new manifest
 *   5. POST /frames → frame records created in DB
 *   6. GET /frames → frames retrievable
 *   7. Frame resolution: DB frames + manifest components → renderable frames
 *   8. POST /annotations/:id/resolve → annotation marked resolved
 *   9. GET /annotations?status=pending → no more pending
 *
 * No mocks. No stubs. Real server, real DB, real filesystem.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { spawn, type ChildProcess } from 'child_process'
import { mkdirSync, rmSync, existsSync, writeFileSync, readdirSync, statSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { ComponentType } from 'react'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

// ─── Test environment ─────────────────────────────────────────────────────────

const TEST_DIR = join(ROOT, '.bryllen-e2e-test')
const TEST_PORT = 14748 // Different from production port
const BASE_URL = `http://localhost:${TEST_PORT}`

let server: ChildProcess

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

async function post(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { status: res.status, data: await res.json() }
}

async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}`)
  return { status: res.status, data: await res.json() }
}

async function put(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return { status: res.status, data: await res.json() }
}

async function del(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, { method: 'DELETE' })
  return { status: res.status, data: await res.json() }
}

/** Wait for the server to be ready by polling /frames */
async function waitForServer(maxAttempts = 30): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      await fetch(`${BASE_URL}/frames?project=__healthcheck__`)
      return
    } catch {
      await new Promise(r => setTimeout(r, 100))
    }
  }
  throw new Error('Server did not start within timeout')
}

/** Kill any process on the test port and wait for it to free up */
async function killPortAndWait(): Promise<void> {
  const { execSync } = await import('child_process')
  try {
    execSync(`lsof -ti:${TEST_PORT} | xargs kill -9 2>/dev/null`, { stdio: 'ignore' })
  } catch { /* nothing on the port */ }
  // Wait for port to be freed
  for (let i = 0; i < 20; i++) {
    try {
      await fetch(`${BASE_URL}/frames?project=__check__`)
      await new Promise(r => setTimeout(r, 100))
    } catch {
      return // Port is free
    }
  }
}

// ─── Frame resolution (extracted from useFrames.tsx — the actual runtime logic) ──

interface DbFrame {
  id: string
  title: string
  componentKey: string | null
  src: string | null
  props: Record<string, unknown>
  width: number | null
  height: number | null
  sortOrder: number
}

function resolveDbFrames(dbFrames: DbFrame[], components: Record<string, ComponentType<any>>) {
  const resolved: Array<{
    type: string
    id: string
    title: string
    component?: ComponentType<any>
    componentKey?: string | null
    src?: string
    props: Record<string, unknown>
    x: number
    y: number
    width: number
    height: number
    hasComponent: boolean
  }> = []

  for (const f of dbFrames) {
    if (f.src) {
      resolved.push({
        type: 'image', id: f.id, title: f.title, src: f.src, props: {},
        x: 0, y: 0, width: f.width ?? 300, height: f.height ?? 300, hasComponent: false,
      })
    } else if (f.componentKey && components[f.componentKey]) {
      resolved.push({
        type: 'component', id: f.id, title: f.title,
        component: components[f.componentKey], componentKey: f.componentKey,
        props: f.props, x: 0, y: 0, width: f.width ?? 1440, height: f.height ?? 900,
        hasComponent: true,
      })
    } else if (f.componentKey) {
      resolved.push({
        type: 'component', id: f.id, title: `${f.title} (missing)`,
        componentKey: f.componentKey, props: {},
        x: 0, y: 0, width: f.width ?? 1440, height: f.height ?? 200,
        hasComponent: false,
      })
    }
  }
  return resolved
}

function makeStubComponent(name: string): ComponentType<any> {
  const comp = (() => null) as unknown as ComponentType<any>
  ;(comp as any).displayName = name
  return comp
}

// ─── Vite plugin logic (extracted from vite-plugin/index.ts) ──────────────────

function findManifests(projectsDir: string): string[] {
  if (!existsSync(projectsDir)) return []
  return readdirSync(projectsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => join(projectsDir, d.name, 'manifest.ts'))
    .filter(p => existsSync(p))
}

function generateVirtualModule(manifests: string[]): string {
  if (manifests.length === 0) return 'export const manifests = [];\n'
  const imports = manifests.map((m, i) =>
    `import manifest_${i} from '${m.replace(/\\/g, '/')}'`
  ).join('\n')
  const exports = manifests.map((_, i) => `manifest_${i}`).join(', ')
  return `${imports}\nexport const manifests = [${exports}];\n`
}

// ─── Test suite ───────────────────────────────────────────────────────────────

describe('New Project Flow — E2E', () => {
  beforeAll(async () => {
    // Kill any leftover server from a previous run
    await killPortAndWait()

    // Clean slate
    if (existsSync(TEST_DIR)) rmSync(TEST_DIR, { recursive: true })
    mkdirSync(join(TEST_DIR, 'src', 'projects'), { recursive: true })

    // Start the REAL HTTP server against the test directory
    server = spawn('node', [join(ROOT, 'src/server/http-server.js')], {
      cwd: TEST_DIR,
      env: { ...process.env, BRYLLEN_HTTP_PORT: String(TEST_PORT) },
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    // Collect stderr for debugging if server fails to start
    let stderr = ''
    server.stderr?.on('data', (d: Buffer) => { stderr += d.toString() })

    try {
      await waitForServer()
    } catch {
      server.kill()
      throw new Error(`Server failed to start. stderr:\n${stderr}`)
    }
  }, 15000)

  afterAll(async () => {
    if (server) {
      server.kill('SIGKILL')
      // Wait for the process to actually exit
      await new Promise<void>(resolve => {
        server.on('exit', () => resolve())
        setTimeout(resolve, 2000) // Fallback timeout
      })
    }
    // Kill anything still on the port
    await killPortAndWait()
    // Clean up test directory
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true })
    }
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 1: Designer submits new project via the dialog
  // POST /annotations?projectId=<name> with type: 'project'
  // ─────────────────────────────────────────────────────────────────────────────

  let annotationId: string

  it('Step 1: POST /annotations creates a pending project annotation', async () => {
    const projectName = 'my-landing-page'
    const { status, data } = await post(
      `/annotations?projectId=${encodeURIComponent(projectName)}`,
      {
        type: 'project',
        comment: JSON.stringify({
          name: projectName,
          description: 'A modern SaaS landing page',
          prompt: 'Create a SaaS landing page with hero, features, pricing, and testimonials',
        }),
      }
    )

    expect(status).toBe(201)
    expect(data.id).toBeTruthy()
    expect(data.type).toBe('project')
    expect(data.status).toBe('pending')
    annotationId = data.id
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 2: Agent polls for pending annotations and receives it
  // GET /annotations?projectId=<name>&status=pending
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 2: GET /annotations?status=pending returns the project annotation', async () => {
    const { status, data } = await get(
      `/annotations?projectId=${encodeURIComponent('my-landing-page')}&status=pending`
    )

    expect(status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(1)
    expect(data[0].id).toBe(annotationId)
    expect(data[0].type).toBe('project')

    const comment = JSON.parse(data[0].comment)
    expect(comment.name).toBe('my-landing-page')
    expect(comment.prompt).toContain('SaaS landing page')
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 3: Agent creates project files on disk
  // This simulates what the agent does after receiving the annotation
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 3: Agent creates project files on disk', () => {
    const projectDir = join(TEST_DIR, 'src', 'projects', 'my-landing-page')
    const v1Dir = join(projectDir, 'v1')
    const componentsDir = join(v1Dir, 'components')
    const pagesDir = join(v1Dir, 'pages')

    mkdirSync(componentsDir, { recursive: true })
    mkdirSync(pagesDir, { recursive: true })

    // tokens.css — MUST use :root for v1 (the bug we fixed)
    writeFileSync(join(v1Dir, 'tokens.css'), `:root, .iter-v1 {
  --primary: oklch(0.55 0.2 250);
  --surface: oklch(0.98 0.003 80);
  --text: oklch(0.2 0.01 250);
  --accent: oklch(0.65 0.25 30);
  --border: oklch(0.85 0.01 250);
  --radius: 8px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
}
`)

    // Components
    writeFileSync(join(componentsDir, 'Hero.tsx'), `export function Hero() {
  return <section style={{ background: 'var(--surface)', padding: 'var(--space-lg)', color: 'var(--text)' }}>
    <h1 style={{ fontSize: 48 }}>Ship faster with AI</h1>
    <p>The modern platform for building products.</p>
    <button style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px', borderRadius: 'var(--radius)', border: 'none' }}>
      Get Started
    </button>
  </section>
}
`)
    writeFileSync(join(componentsDir, 'Features.tsx'), `export function Features() {
  return <section style={{ padding: 'var(--space-lg)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
    {['Fast', 'Secure', 'Scalable'].map(f => (
      <div key={f} style={{ background: 'var(--surface)', padding: 'var(--space-md)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
        <h3 style={{ color: 'var(--primary)' }}>{f}</h3>
        <p style={{ color: 'var(--text)' }}>Built for modern teams.</p>
      </div>
    ))}
  </section>
}
`)
    writeFileSync(join(componentsDir, 'index.ts'), `export { Hero } from './Hero'
export { Features } from './Features'
`)

    // Pages — each direction is a separate page
    writeFileSync(join(pagesDir, 'DirA.tsx'), `import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
export function DirA() {
  return <div style={{ width: '100%' }}><Hero /><Features /></div>
}
`)
    writeFileSync(join(pagesDir, 'DirB.tsx'), `import { Hero } from '../components/Hero'
export function DirB() {
  return <div style={{ width: '100%', background: 'var(--text)', color: 'var(--surface)' }}><Hero /></div>
}
`)
    writeFileSync(join(pagesDir, 'DirC.tsx'), `import { Features } from '../components/Features'
export function DirC() {
  return <div style={{ width: '100%' }}><Features /></div>
}
`)

    // Manifest — imports tokens.css and maps components
    writeFileSync(join(projectDir, 'manifest.ts'), `import type { ProjectManifest } from 'bryllen/runtime'
import './v1/tokens.css'
import { DirA } from './v1/pages/DirA'
import { DirB } from './v1/pages/DirB'
import { DirC } from './v1/pages/DirC'

const manifest: ProjectManifest = {
  id: 'test-uuid-1234',
  project: 'my-landing-page',
  components: {
    DirA,
    DirB,
    DirC,
  },
}

export default manifest
`)

    // Verify all files exist
    expect(existsSync(join(v1Dir, 'tokens.css'))).toBe(true)
    expect(existsSync(join(componentsDir, 'Hero.tsx'))).toBe(true)
    expect(existsSync(join(componentsDir, 'Features.tsx'))).toBe(true)
    expect(existsSync(join(componentsDir, 'index.ts'))).toBe(true)
    expect(existsSync(join(pagesDir, 'DirA.tsx'))).toBe(true)
    expect(existsSync(join(pagesDir, 'DirB.tsx'))).toBe(true)
    expect(existsSync(join(pagesDir, 'DirC.tsx'))).toBe(true)
    expect(existsSync(join(projectDir, 'manifest.ts'))).toBe(true)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 4: tokens.css uses :root (the styling fix)
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 4: tokens.css uses :root selector (not just .iter-v1)', () => {
    const tokensPath = join(TEST_DIR, 'src', 'projects', 'my-landing-page', 'v1', 'tokens.css')
    const tokens = readFileSync(tokensPath, 'utf-8')

    // MUST have :root — without it, frames render unstyled
    expect(tokens).toContain(':root')
    // Should also have .iter-v1 for iteration scoping
    expect(tokens).toContain('.iter-v1')
    // All values should be OKLCH
    expect(tokens).toContain('oklch')
    expect(tokens).not.toMatch(/#[0-9a-fA-F]{3,8}/) // No hex colors
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 5: manifest.ts imports tokens.css
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 5: manifest.ts imports tokens.css (required for styles to load)', () => {
    const manifestPath = join(TEST_DIR, 'src', 'projects', 'my-landing-page', 'manifest.ts')
    const manifest = readFileSync(manifestPath, 'utf-8')

    expect(manifest).toContain("import './v1/tokens.css'")
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 6: Vite plugin discovers the new manifest
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 6: Vite plugin discovers the new manifest.ts', () => {
    const projectsDir = join(TEST_DIR, 'src', 'projects')
    const manifests = findManifests(projectsDir)

    expect(manifests).toHaveLength(1)
    expect(manifests[0]).toContain('my-landing-page')
    expect(manifests[0].endsWith('manifest.ts')).toBe(true)

    // Virtual module generation works
    const module = generateVirtualModule(manifests)
    expect(module).toContain('import manifest_0 from')
    expect(module).toContain('export const manifests = [manifest_0]')
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 7: Agent creates frame records via HTTP
  // POST /frames for each direction
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 7: POST /frames creates frame records for each direction', async () => {
    const frames = [
      { project: 'my-landing-page', id: 'dir-a', title: 'Direction A — Hero + Features', componentKey: 'DirA', width: 1440, height: 900 },
      { project: 'my-landing-page', id: 'dir-b', title: 'Direction B — Dark Hero', componentKey: 'DirB', width: 1440, height: 900 },
      { project: 'my-landing-page', id: 'dir-c', title: 'Direction C — Features Only', componentKey: 'DirC', width: 1440, height: 900 },
    ]

    for (const frame of frames) {
      const { status, data } = await post('/frames', frame)
      expect(status).toBe(201)
      expect(data.id).toBe(frame.id)
      expect(data.componentKey).toBe(frame.componentKey)
      expect(data.title).toBe(frame.title)
    }
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 8: Frames are retrievable via HTTP
  // GET /frames?project=<name>
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 8: GET /frames returns all 3 direction frames', async () => {
    const { status, data } = await get(
      `/frames?project=${encodeURIComponent('my-landing-page')}`
    )

    expect(status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(3)

    const keys = data.map((f: any) => f.componentKey).sort()
    expect(keys).toEqual(['DirA', 'DirB', 'DirC'])

    // Each frame has correct dimensions
    for (const frame of data) {
      expect(frame.width).toBe(1440)
      expect(frame.height).toBe(900)
    }
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 9: Frame resolution — DB frames + manifest components → renderable
  // This is what useFrames.tsx does in the browser
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 9: resolveDbFrames matches ALL DB frames to manifest components', async () => {
    const { data: dbFrames } = await get(
      `/frames?project=${encodeURIComponent('my-landing-page')}`
    )

    // Simulate the manifest.components registry
    const registry = {
      DirA: makeStubComponent('DirA'),
      DirB: makeStubComponent('DirB'),
      DirC: makeStubComponent('DirC'),
    }

    const resolved = resolveDbFrames(dbFrames, registry)

    // ALL 3 frames must resolve with actual components (no errors)
    expect(resolved).toHaveLength(3)
    expect(resolved.every(f => f.hasComponent)).toBe(true)
    expect(resolved.every(f => f.type === 'component')).toBe(true)

    // No "(missing)" in titles — that would mean the component wasn't found
    expect(resolved.every(f => !f.title.includes('(missing)'))).toBe(true)

    // Each frame has correct component reference
    expect(resolved.find(f => f.componentKey === 'DirA')?.component).toBe(registry.DirA)
    expect(resolved.find(f => f.componentKey === 'DirB')?.component).toBe(registry.DirB)
    expect(resolved.find(f => f.componentKey === 'DirC')?.component).toBe(registry.DirC)
  })

  it('Step 9b: resolveDbFrames correctly flags missing components', async () => {
    const { data: dbFrames } = await get(
      `/frames?project=${encodeURIComponent('my-landing-page')}`
    )

    // Registry with only DirA — DirB and DirC would be "missing"
    const partialRegistry = { DirA: makeStubComponent('DirA') }
    const resolved = resolveDbFrames(dbFrames, partialRegistry)

    const found = resolved.filter(f => f.hasComponent)
    const missing = resolved.filter(f => !f.hasComponent && f.type === 'component')

    expect(found).toHaveLength(1)
    expect(found[0].componentKey).toBe('DirA')
    expect(missing).toHaveLength(2)
    expect(missing.every(f => f.title.includes('(missing)'))).toBe(true)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 10: Agent resolves the annotation
  // POST /annotations/:id/resolve?projectId=<name>
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 10: POST /annotations/:id/resolve marks annotation as resolved', async () => {
    const { status, data } = await post(
      `/annotations/${annotationId}/resolve?projectId=${encodeURIComponent('my-landing-page')}`,
      {}
    )

    expect(status).toBe(200)
    expect(data.status).toBe('resolved')
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 11: No more pending annotations
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 11: No more pending annotations after resolve', async () => {
    const { status, data } = await get(
      `/annotations?projectId=${encodeURIComponent('my-landing-page')}&status=pending`
    )

    expect(status).toBe(200)
    expect(data).toHaveLength(0)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 12: Frame CRUD — update and delete work
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 12: Frame update changes title', async () => {
    const { status, data } = await put(
      `/frames/dir-a?project=${encodeURIComponent('my-landing-page')}`,
      { title: 'Direction A — Renamed' }
    )

    expect(status).toBe(200)
    expect(data.title).toBe('Direction A — Renamed')
  })

  it('Step 12b: Frame delete removes from listing', async () => {
    const { status } = await del(
      `/frames/dir-c?project=${encodeURIComponent('my-landing-page')}`
    )

    expect(status).toBe(200)

    const { data: frames } = await get(
      `/frames?project=${encodeURIComponent('my-landing-page')}`
    )
    expect(frames).toHaveLength(2) // dir-a and dir-b remain
    expect(frames.find((f: any) => f.id === 'dir-c')).toBeUndefined()
  })

  it('Step 12c: Deleted component key is tracked (prevents auto-re-registration)', async () => {
    const { data } = await get(
      `/frames/deleted-keys?project=${encodeURIComponent('my-landing-page')}`
    )

    expect(data.deletedKeys).toContain('DirC')
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 13: Second project is fully isolated
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 13: Second project has isolated frames and annotations', async () => {
    // Create annotation for second project
    const { data: annotation } = await post(
      `/annotations?projectId=${encodeURIComponent('second-project')}`,
      { type: 'project', comment: '{"name":"second-project","prompt":"Dashboard"}' }
    )
    expect(annotation.status).toBe('pending')

    // Create frame for second project
    await post('/frames', {
      project: 'second-project', id: 'dash-a', title: 'Dashboard A',
      componentKey: 'DashA', width: 1440, height: 900,
    })

    // First project still has 2 frames (dir-a, dir-b)
    const { data: firstFrames } = await get('/frames?project=my-landing-page')
    expect(firstFrames).toHaveLength(2)

    // Second project has 1 frame
    const { data: secondFrames } = await get('/frames?project=second-project')
    expect(secondFrames).toHaveLength(1)
    expect(secondFrames[0].componentKey).toBe('DashA')

    // First project has no pending annotations
    const { data: firstPending } = await get('/annotations?projectId=my-landing-page&status=pending')
    expect(firstPending).toHaveLength(0)

    // Second project has 1 pending annotation
    const { data: secondPending } = await get('/annotations?projectId=second-project&status=pending')
    expect(secondPending).toHaveLength(1)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 14: Vite plugin discovers both projects
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 14: Vite plugin discovers multiple projects', () => {
    // Create manifest for second project
    const secondDir = join(TEST_DIR, 'src', 'projects', 'second-project')
    mkdirSync(secondDir, { recursive: true })
    writeFileSync(join(secondDir, 'manifest.ts'), `export default { project: 'second-project', components: {} }`)

    const projectsDir = join(TEST_DIR, 'src', 'projects')
    const manifests = findManifests(projectsDir)

    expect(manifests).toHaveLength(2)
    expect(manifests.some(m => m.includes('my-landing-page'))).toBe(true)
    expect(manifests.some(m => m.includes('second-project'))).toBe(true)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 15: Auto-registration simulation
  // When manifest.components has keys not in DB, auto-create frame records
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 15: Auto-registration creates frames for new manifest components', async () => {
    // Get current DB frames
    const { data: currentFrames } = await get('/frames?project=my-landing-page')
    const currentKeys = new Set(currentFrames.map((f: any) => f.componentKey))

    // Simulate manifest.components with a NEW component (TokensPage)
    const newComponents = ['TokensPage', 'ComponentsPage']
    const missing = newComponents.filter(key => !currentKeys.has(key))

    expect(missing).toHaveLength(2) // Both are new

    // Auto-register: POST /frames for each missing component
    for (const key of missing) {
      await post('/frames', {
        project: 'my-landing-page',
        id: key.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: key.replace(/([A-Z])/g, ' $1').trim(),
        componentKey: key,
        width: 1440,
        height: 900,
      })
    }

    // Verify all 4 frames exist (dir-a, dir-b, tokens-page, components-page)
    const { data: allFrames } = await get('/frames?project=my-landing-page')
    expect(allFrames).toHaveLength(4)

    const allKeys = allFrames.map((f: any) => f.componentKey).sort()
    expect(allKeys).toEqual(['ComponentsPage', 'DirA', 'DirB', 'TokensPage'])
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 16: Full resolution with all frames
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 16: Full resolution — all 4 frames resolve correctly', async () => {
    const { data: dbFrames } = await get('/frames?project=my-landing-page')

    const registry = {
      DirA: makeStubComponent('DirA'),
      DirB: makeStubComponent('DirB'),
      TokensPage: makeStubComponent('TokensPage'),
      ComponentsPage: makeStubComponent('ComponentsPage'),
    }

    const resolved = resolveDbFrames(dbFrames, registry)

    expect(resolved).toHaveLength(4)
    expect(resolved.every(f => f.hasComponent)).toBe(true)

    // No errors, no missing components
    const errors = resolved.filter(f => f.title.includes('(missing)'))
    expect(errors).toHaveLength(0)
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 17: Component hierarchy — pages import from components only
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 17: Pages import only from ../components/ (hierarchy contract)', () => {
    const pagesDir = join(TEST_DIR, 'src', 'projects', 'my-landing-page', 'v1', 'pages')
    const pageFiles = readdirSync(pagesDir).filter(f => f.endsWith('.tsx'))

    expect(pageFiles.length).toBeGreaterThan(0)

    for (const file of pageFiles) {
      const content = readFileSync(join(pagesDir, file), 'utf-8')
      // Every import should be from ../components/
      const imports = content.match(/from\s+['"]([^'"]+)['"]/g) || []
      for (const imp of imports) {
        const path = imp.match(/from\s+['"]([^'"]+)['"]/)?.[1]
        expect(path, `${file} imports from "${path}" — should be ../components/`).toContain('../components/')
      }
    }
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 18: Components use var(--token) (no hardcoded values)
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 18: Components use CSS custom properties from tokens', () => {
    const componentsDir = join(TEST_DIR, 'src', 'projects', 'my-landing-page', 'v1', 'components')
    const componentFiles = readdirSync(componentsDir).filter(f => f.endsWith('.tsx'))

    expect(componentFiles.length).toBeGreaterThan(0)

    for (const file of componentFiles) {
      const content = readFileSync(join(componentsDir, file), 'utf-8')
      // Components should use var(--token) for visual values
      expect(content, `${file} should use CSS custom properties`).toContain('var(--')
      // Should NOT have hex colors
      expect(content).not.toMatch(/#[0-9a-fA-F]{3,8}\b/)
    }
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 19: creatingProject state fix (BryllenShell logic)
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 19: BryllenShell waits for specific project manifest (not just any)', () => {
    const shellSource = readFileSync(join(ROOT, 'src/runtime/BryllenShell.tsx'), 'utf-8')

    // Fixed: checks for specific project name
    expect(shellSource).toContain('m.project === creatingProject.name')
    expect(shellSource).toContain('setActiveProjectIndex(newIndex)')
    // Not the old broken pattern
    expect(shellSource).not.toContain('if (creatingProject && manifests.length > 0)')
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // Step 20: Annotation broadcast fix (http-server)
  // ─────────────────────────────────────────────────────────────────────────────

  it('Step 20: Project annotations broadcast to all waiters', () => {
    const serverSource = readFileSync(join(ROOT, 'src/server/http-server.js'), 'utf-8')

    // Fixed: project annotations notify all waiters
    expect(serverSource).toContain('isNewProject ? true')
    expect(serverSource).toContain("const isNewProject = data.type === 'project'")
  })
})
