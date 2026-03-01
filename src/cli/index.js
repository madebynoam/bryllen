#!/usr/bin/env node

import { spawn, execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'net'

const __dirname = dirname(fileURLToPath(import.meta.url))
import {
  indexHtml,
  viteConfig,
  mainTsx,
  appTsx,
  indexCss,
  viteEnvDts,
  tsconfigJson,
  tsconfigAppJson,
  tsconfigNodeJson,
  claudeSettingsJson,
  claudeMd,
  gitignore,
} from './templates.js'
import { runMigrations, writeMarker, getCanvaiVersion } from './migrate.js'

const command = process.argv[2]
const subcommand = process.argv[3]

// ─── HTTP helpers ───────────────────────────────────────────────────────────

function getHttpPort() {
  try {
    const ports = JSON.parse(readFileSync(join(process.cwd(), '.canvai-ports.json'), 'utf8'))
    return ports.http || 4748
  } catch {
    return 4748
  }
}

async function httpGet(path) {
  const port = getHttpPort()
  const res = await fetch(`http://localhost:${port}${path}`)
  return res.json()
}

async function httpPost(path) {
  const port = getHttpPort()
  const res = await fetch(`http://localhost:${port}${path}`, { method: 'POST' })
  return res.json()
}

// ─── Annotation CLI commands ────────────────────────────────────────────────

async function watchAnnotations() {
  const args = process.argv.slice(3)
  let timeout = 15000
  const timeoutIdx = args.indexOf('--timeout')
  if (timeoutIdx !== -1 && args[timeoutIdx + 1]) {
    timeout = parseInt(args[timeoutIdx + 1], 10) * 1000
  }

  try {
    const result = await httpGet(`/annotations/next?timeout=${timeout}`)

    if (result.timeout) {
      console.log(JSON.stringify({ timeout: true }))
      return
    }

    // Output the annotation as JSON for Claude to parse
    console.log(JSON.stringify(result, null, 2))
  } catch (err) {
    console.error(JSON.stringify({ error: err.message, hint: 'Is canvai design running?' }))
    process.exit(1)
  }
}

async function resolveAnnotation() {
  const id = process.argv[3]
  if (!id) {
    console.error('Usage: canvai resolve <id>')
    process.exit(1)
  }

  try {
    const result = await httpPost(`/annotations/${id}/resolve`)
    if (result.error) {
      console.error(JSON.stringify({ error: `Annotation #${id} not found` }))
      process.exit(1)
    }
    console.log(JSON.stringify({ resolved: true, id, comment: result.comment }))
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }))
    process.exit(1)
  }
}

async function pendingAnnotations() {
  try {
    const pending = await httpGet('/annotations?status=pending')
    console.log(JSON.stringify(pending, null, 2))
  } catch (err) {
    console.error(JSON.stringify({ error: err.message, hint: 'Is canvai design running?' }))
    process.exit(1)
  }
}

async function listAnnotations() {
  try {
    const all = await httpGet('/annotations')
    console.log(JSON.stringify(all, null, 2))
  } catch (err) {
    console.error(JSON.stringify({ error: err.message, hint: 'Is canvai design running?' }))
    process.exit(1)
  }
}

async function screenshotCanvas() {
  const args = process.argv.slice(3)
  const params = new URLSearchParams()

  const frameIdx = args.indexOf('--frame')
  if (frameIdx !== -1 && args[frameIdx + 1]) {
    params.set('frame', args[frameIdx + 1])
  }

  const delayIdx = args.indexOf('--delay')
  if (delayIdx !== -1 && args[delayIdx + 1]) {
    params.set('delay', args[delayIdx + 1])
  }

  try {
    const qs = params.toString()
    const result = await httpGet(`/screenshot${qs ? '?' + qs : ''}`)

    if (result.error) {
      if (result.install) {
        console.log(JSON.stringify({ error: 'Playwright not installed', install: result.install }))
      } else {
        console.error(JSON.stringify({ error: result.error }))
        process.exit(1)
      }
      return
    }

    console.log(JSON.stringify({ path: result.path }))
  } catch (err) {
    console.error(JSON.stringify({ error: err.message, hint: 'Is canvai design running?' }))
    process.exit(1)
  }
}

async function contextImages() {
  const args = process.argv.slice(3)

  let project = null
  let iteration = 'v1'

  const projectIdx = args.indexOf('--project')
  if (projectIdx !== -1 && args[projectIdx + 1]) {
    project = args[projectIdx + 1]
  }

  const iterIdx = args.indexOf('--iteration')
  if (iterIdx !== -1 && args[iterIdx + 1]) {
    iteration = args[iterIdx + 1]
  }

  // Auto-detect project if not specified
  if (!project) {
    const projectsDir = join(process.cwd(), 'src', 'projects')
    if (existsSync(projectsDir)) {
      const { readdirSync } = await import('fs')
      const projects = readdirSync(projectsDir).filter(f => {
        const stat = require('fs').statSync(join(projectsDir, f))
        return stat.isDirectory() && !f.startsWith('.')
      })
      if (projects.length === 1) {
        project = projects[0]
      } else if (projects.length > 1) {
        console.error(JSON.stringify({ error: 'Multiple projects found. Use --project <name>', projects }))
        process.exit(1)
      }
    }
  }

  if (!project) {
    console.error(JSON.stringify({ error: 'No project specified. Use --project <name>' }))
    process.exit(1)
  }

  const contextDir = join(process.cwd(), 'src', 'projects', project, iteration, 'context')

  if (!existsSync(contextDir)) {
    console.log(JSON.stringify({ images: [], message: 'No context images found' }))
    return
  }

  const { readdirSync } = await import('fs')
  const files = readdirSync(contextDir).filter(f =>
    /\.(png|jpg|jpeg|gif|webp)$/i.test(f)
  )

  if (files.length === 0) {
    console.log(JSON.stringify({ images: [], message: 'No context images found' }))
    return
  }

  // Return image paths (not base64 — Claude can read files directly)
  const images = files.map(filename => ({
    filename,
    path: join(contextDir, filename),
  }))

  console.log(JSON.stringify({ images }, null, 2))
}

function scaffold() {
  const cwd = process.cwd()

  const files = [
    ['index.html', indexHtml],
    ['vite.config.ts', viteConfig],
    ['tsconfig.json', tsconfigJson],
    ['tsconfig.app.json', tsconfigAppJson],
    ['tsconfig.node.json', tsconfigNodeJson],
    ['src/main.tsx', mainTsx],
    ['src/App.tsx', appTsx],
    ['src/index.css', indexCss],
    ['src/vite-env.d.ts', viteEnvDts],
    ['.claude/settings.json', claudeSettingsJson],
    ['CLAUDE.md', claudeMd],
    ['.gitignore', gitignore],
  ]

  let wrote = 0
  let skipped = 0

  for (const [relative, content] of files) {
    const abs = join(cwd, relative)
    if (existsSync(abs)) {
      skipped++
      continue
    }
    mkdirSync(join(abs, '..'), { recursive: true })
    writeFileSync(abs, content)
    wrote++
    console.log(`  created ${relative}`)
  }

  // Ensure src/projects/ exists
  const projectsDir = join(cwd, 'src/projects')
  if (!existsSync(projectsDir)) {
    mkdirSync(projectsDir, { recursive: true })
    console.log('  created src/projects/')
  }

  // Write .canvai-version marker
  writeMarker(cwd, getCanvaiVersion())
  console.log('  created .canvai-version')

  if (wrote === 0) {
    console.log('All scaffold files already exist — nothing to write.')
  } else {
    console.log(`\nScaffolded ${wrote} file${wrote === 1 ? '' : 's'}${skipped ? ` (${skipped} already existed)` : ''}.`)
  }

  // Check for missing peer deps
  const needed = [
    'react', 'react-dom',
    '@vitejs/plugin-react', 'vite', 'typescript',
    '@types/react', '@types/react-dom',
  ]
  const missing = needed.filter(dep => !existsSync(join(cwd, 'node_modules', dep)))

  if (missing.length > 0) {
    console.log(`\nInstalling dependencies: ${missing.join(', ')}`)
    const install = spawn('npm', ['install', '--save-dev', ...missing], {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    install.on('exit', (code) => {
      if (code === 0) {
        console.log('\nReady! Run `npx canvai design` to start.')
      } else {
        console.error('\nnpm install failed. Install manually and try again.')
      }
      process.exit(code ?? 0)
    })
  } else {
    console.log('\nReady! Run `npx canvai design` to start.')
  }
}

function update() {
  const cwd = process.cwd()
  console.log('Updating canvai to latest...\n')

  // Remove cached canvai so npm re-resolves from GitHub instead of using the locked SHA.
  // Both node_modules AND the lockfile entry must be cleared — npm uses the lockfile
  // resolved commit SHA even when node_modules is deleted.
  const cachedPkg = join(cwd, 'node_modules', 'canvai')
  if (existsSync(cachedPkg)) {
    rmSync(cachedPkg, { recursive: true, force: true })
  }
  try {
    const lockPath = join(cwd, 'package-lock.json')
    if (existsSync(lockPath)) {
      const lock = JSON.parse(readFileSync(lockPath, 'utf8'))
      let changed = false
      if (lock.packages?.['node_modules/canvai']) { delete lock.packages['node_modules/canvai']; changed = true }
      if (lock.dependencies?.canvai) { delete lock.dependencies.canvai; changed = true }
      if (changed) writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n')
    }
  } catch {}

  const install = spawn('npm', ['install', 'github:madebynoam/canvai'], {
    cwd,
    stdio: 'inherit',
    shell: true,
  })
  install.on('exit', (code) => {
    if (code === 0) {
      // Clear Vite cache so stale bundled deps don't linger
      const viteCache = join(cwd, 'node_modules', '.vite')
      if (existsSync(viteCache)) {
        rmSync(viteCache, { recursive: true, force: true })
        console.log('Cleared Vite cache.')
      }
      // Run migrations in a NEW process so the freshly-installed code is used.
      // The current process still has the old modules loaded from before npm install.
      const migratePath = join(cwd, 'node_modules', 'canvai', 'src', 'cli', 'index.js')
      const migrate = spawn('node', [migratePath, 'migrate'], {
        cwd,
        stdio: 'inherit',
      })
      migrate.on('exit', () => {
        console.log('\nUpdated! Restart `npx canvai design` to use the latest.')
        process.exit(0)
      })
    } else {
      console.error('\nUpdate failed. Try running: npm install github:madebynoam/canvai')
      process.exit(code ?? 1)
    }
  })
}

/** Check if a port is free (uses localhost to match Vite/Node defaults). */
function isPortFree(port) {
  return new Promise((resolve) => {
    const srv = createServer()
    srv.once('error', () => resolve(false))
    srv.once('listening', () => { srv.close(); resolve(true) })
    srv.listen(port, 'localhost')
  })
}

/** Find a free port starting from `start`, incrementing until one is available. */
async function findFreePort(start) {
  for (let port = start; port < start + 100; port++) {
    if (await isPortFree(port)) return port
  }
  throw new Error(`No free port found in range ${start}–${start + 99}`)
}

/** Write port info so MCP server and Vite plugin can discover them. */
function writePorts(cwd, httpPort, vitePort, vitePid, httpPid) {
  writeFileSync(join(cwd, '.canvai-ports.json'), JSON.stringify({ http: httpPort, vite: vitePort, vitePid, httpPid, pid: process.pid }) + '\n')
}

async function startDev() {
  const cwd = process.cwd()

  // Clear Vite dep cache so updated canvai code is re-bundled
  const viteCache = join(cwd, 'node_modules', '.vite')
  if (existsSync(viteCache)) {
    rmSync(viteCache, { recursive: true, force: true })
  }

  // Run migrations before starting
  const applied = runMigrations(cwd)
  if (applied > 0) {
    console.log(`Applied ${applied} migration${applied === 1 ? '' : 's'}.\n`)
  }

  // Find free ports — never kill existing servers
  const httpPort = await findFreePort(4748)
  const vitePort = await findFreePort(5173)

  // Write ports BEFORE spawning so Vite's config() can read them
  writePorts(cwd, httpPort, vitePort, null, null)
  console.log(`[canvai] HTTP server → :${httpPort}  Vite → :${vitePort}`)

  // Start Vite dev server on the chosen port
  const vite = spawn('npx', ['vite', '--port', String(vitePort), '--strictPort'], {
    cwd,
    stdio: 'inherit',
    shell: true,
  })

  // Start annotation HTTP server with the chosen port
  const httpServerPath = join(__dirname, '..', 'mcp', 'http-server.js')
  const httpSrv = spawn('node', [httpServerPath], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, CANVAI_HTTP_PORT: String(httpPort), CANVAI_VITE_PORT: String(vitePort) },
  })

  // Update ports file with PIDs for safe cleanup
  writePorts(cwd, httpPort, vitePort, vite.pid, httpSrv.pid)

  // Clean up on exit — remove ports file so stale info doesn't linger
  function cleanup() {
    try { rmSync(join(cwd, '.canvai-ports.json'), { force: true }) } catch {}
    vite.kill()
    httpSrv.kill()
    process.exit()
  }

  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)

  vite.on('exit', (code) => {
    try { rmSync(join(cwd, '.canvai-ports.json'), { force: true }) } catch {}
    httpSrv.kill()
    process.exit(code ?? 0)
  })
}

switch (command) {
  case 'new':
    scaffold()
    break
  case 'design':
    startDev()
    break
  case 'update':
    update()
    break
  case 'migrate':
  case 'doctor': {
    const cwd = process.cwd()
    if (command === 'doctor') {
      console.log('Running canvai doctor — checking all migrations...\n')
    }
    const applied = runMigrations(cwd)
    if (applied > 0) {
      console.log(`\nApplied ${applied} migration${applied === 1 ? '' : 's'}.`)
    } else {
      console.log('All files are healthy — no migrations needed.')
    }
    break
  }

  // ─── Annotation CLI commands (replaces MCP) ─────────────────────────────────
  case 'watch':
    watchAnnotations()
    break
  case 'resolve':
    resolveAnnotation()
    break
  case 'pending':
    pendingAnnotations()
    break
  case 'list':
    listAnnotations()
    break
  case 'screenshot':
    screenshotCanvas()
    break
  case 'context':
    contextImages()
    break

  default:
    console.log('Canvai — design studio on an infinite canvas\n')
    console.log('Usage:')
    console.log('  canvai new                  Scaffold project files')
    console.log('  canvai design               Start dev server + annotation server')
    console.log('  canvai update               Update canvai to latest')
    console.log('  canvai doctor               Check and fix project files')
    console.log('')
    console.log('Annotation commands (for Claude Code agent):')
    console.log('  canvai watch [--timeout N]  Wait for annotation (default 15s)')
    console.log('  canvai resolve <id>         Mark annotation as resolved')
    console.log('  canvai pending              List pending annotations')
    console.log('  canvai list                 List all annotations')
    console.log('  canvai screenshot [--frame <id>] [--delay <ms>]')
    console.log('  canvai context [--project <name>] [--iteration <v>]')
    console.log('')
    console.log('  canvai help                 Show this message')
    process.exit(command === 'help' ? 0 : 1)
}
