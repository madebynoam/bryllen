import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { existsSync, mkdirSync, rmSync, writeFileSync, readdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import type { ComponentType } from 'react'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')

// ─── Import DB functions directly ─────────────────────────────────────────────
// We test the actual DB layer (not HTTP), since that's where data integrity lives.

import {
  initDb,
  closeDb,
  createFrame,
  getFrames,
  getFrame,
  getDeletedComponentKeys,
  softDeleteFrame,
  getProjectAnnotationDb,
  addProjectAnnotation,
  getProjectAnnotations,
  getProjectAnnotation,
  updateProjectAnnotationStatus,
  closeProjectDbs,
} from '../server/db.js'

// ─── Import runtime logic (pure functions, no React) ──────────────────────────

import { relayoutFrames } from '../runtime/layout'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TEST_DIR = join(ROOT, '.bryllen-test-tmp')
const TEST_PROJECTS_DIR = join(TEST_DIR, 'projects')
const TEST_BRYLLEN_DIR = join(TEST_DIR, 'bryllen-db')

function cleanTestDir() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true })
  }
}

/** Stub React component (tests don't render, just check registration logic) */
const StubComponent = (() => null) as unknown as ComponentType<any>
StubComponent.displayName = 'StubComponent'

function makeStubComponent(name: string): ComponentType<any> {
  const comp = (() => null) as unknown as ComponentType<any>
  ;(comp as any).displayName = name
  return comp
}

// ─── resolveDbFrames (extracted logic, tested without React) ──────────────────

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

/**
 * Pure function extracted from useFrames.tsx — resolves DB frames against a component registry.
 * This is the CRITICAL function: if it can't find a component, the frame shows as unstyled error text.
 */
function resolveDbFrames(dbFrames: DbFrame[], components: Record<string, ComponentType<any>>) {
  const resolved: Array<{
    type: string
    id: string
    title: string
    component?: ComponentType<any>
    componentKey?: string
    src?: string
    props: Record<string, unknown>
    x: number
    y: number
    width: number
    height: number
    error?: boolean
  }> = []

  for (const f of dbFrames) {
    if (f.src) {
      resolved.push({
        type: 'image',
        id: f.id,
        title: f.title,
        src: f.src,
        props: {},
        x: 0, y: 0,
        width: f.width ?? 300,
        height: f.height ?? 300,
      })
    } else if (f.componentKey && components[f.componentKey]) {
      resolved.push({
        type: 'component',
        id: f.id,
        title: f.title,
        component: components[f.componentKey],
        componentKey: f.componentKey,
        props: f.props,
        x: 0, y: 0,
        width: f.width ?? 1440,
        height: f.height ?? 900,
      })
    } else if (f.componentKey) {
      // ERROR path — component not found. This produces the unstyled error text the designer sees.
      resolved.push({
        type: 'component',
        id: f.id,
        title: `${f.title} (missing)`,
        componentKey: f.componentKey,
        props: {},
        x: 0, y: 0,
        width: f.width ?? 1440,
        height: f.height ?? 200,
        error: true,
      })
    }
  }
  return resolved
}

/**
 * Simulates the auto-registration logic from useFrames.tsx.
 * When manifest.components has keys not in the DB, auto-create frame records.
 */
async function autoRegisterMissingFrames(
  project: string,
  dbFrames: DbFrame[],
  registry: Record<string, ComponentType<any>>,
) {
  const dbComponentKeys = new Set(dbFrames.map(f => f.componentKey).filter(Boolean))
  const deletedKeys = new Set(getDeletedComponentKeys(project))
  const missing = Object.keys(registry).filter(
    key => !dbComponentKeys.has(key) && !deletedKeys.has(key)
  )

  if (missing.length === 0) return false

  for (const key of missing) {
    createFrame(project, {
      id: key.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: key.replace(/([A-Z])/g, ' $1').trim(),
      componentKey: key,
      width: 1440,
      height: 900,
      sortOrder: 0,
    })
  }
  return true
}

// ─── Test suites ──────────────────────────────────────────────────────────────

describe('New Project Flow — Integration Tests', () => {
  beforeEach(() => {
    cleanTestDir()
    mkdirSync(TEST_BRYLLEN_DIR, { recursive: true })
    mkdirSync(TEST_PROJECTS_DIR, { recursive: true })
    initDb(TEST_BRYLLEN_DIR)
  })

  afterEach(() => {
    closeDb()
    closeProjectDbs()
    cleanTestDir()
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. DATABASE: Frame CRUD
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Frame database operations', () => {
    it('creates a frame and retrieves it', () => {
      const frame = createFrame('test-project', {
        id: 'dir-a',
        title: 'Direction A',
        componentKey: 'DirA',
        width: 1440,
        height: 900,
        sortOrder: 0,
      })

      expect(frame).toBeTruthy()
      expect(frame.id).toBe('dir-a')
      expect(frame.title).toBe('Direction A')
      expect(frame.componentKey).toBe('DirA')
      expect(frame.width).toBe(1440)
      expect(frame.height).toBe(900)
    })

    it('lists all frames for a project', () => {
      createFrame('test-project', { id: 'dir-a', title: 'A', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })
      createFrame('test-project', { id: 'dir-b', title: 'B', componentKey: 'DirB', width: 1440, height: 900, sortOrder: 1 })
      createFrame('other-project', { id: 'dir-c', title: 'C', componentKey: 'DirC', width: 1440, height: 900, sortOrder: 0 })

      const frames = getFrames('test-project')
      expect(frames).toHaveLength(2)
      expect(frames[0].id).toBe('dir-a')
      expect(frames[1].id).toBe('dir-b')

      // Other project's frames are isolated
      const otherFrames = getFrames('other-project')
      expect(otherFrames).toHaveLength(1)
    })

    it('soft-deletes a frame and excludes it from listings', () => {
      createFrame('test-project', { id: 'dir-a', title: 'A', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })
      softDeleteFrame('test-project', 'dir-a')

      const frames = getFrames('test-project')
      expect(frames).toHaveLength(0)

      // Deleted component keys are tracked
      const deleted = getDeletedComponentKeys('test-project')
      expect(deleted).toContain('DirA')
    })

    it('upserts frame on conflict (re-creating deleted frame)', () => {
      createFrame('test-project', { id: 'dir-a', title: 'A', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })
      softDeleteFrame('test-project', 'dir-a')

      // Re-create same ID — should upsert and clear deleted_at
      createFrame('test-project', { id: 'dir-a', title: 'A v2', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })

      const frame = getFrame('test-project', 'dir-a')
      expect(frame).toBeTruthy()
      expect(frame.title).toBe('A v2')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. FRAME RESOLUTION: manifest.components → rendered frames
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Frame resolution (manifest → canvas)', () => {
    it('resolves DB frames when components exist in registry', () => {
      const dbFrames: DbFrame[] = [
        { id: 'dir-a', title: 'Direction A', componentKey: 'DirA', src: null, props: {}, width: 1440, height: 900, sortOrder: 0 },
        { id: 'dir-b', title: 'Direction B', componentKey: 'DirB', src: null, props: {}, width: 1440, height: 900, sortOrder: 1 },
      ]

      const registry = {
        DirA: makeStubComponent('DirA'),
        DirB: makeStubComponent('DirB'),
      }

      const resolved = resolveDbFrames(dbFrames, registry)

      expect(resolved).toHaveLength(2)
      expect(resolved[0].component).toBe(registry.DirA)
      expect(resolved[0].error).toBeUndefined()
      expect(resolved[1].component).toBe(registry.DirB)
      expect(resolved[1].error).toBeUndefined()
    })

    it('marks frames as error when component is NOT in registry', () => {
      const dbFrames: DbFrame[] = [
        { id: 'dir-a', title: 'Direction A', componentKey: 'DirA', src: null, props: {}, width: 1440, height: 900, sortOrder: 0 },
      ]

      // Empty registry — component not found
      const resolved = resolveDbFrames(dbFrames, {})

      expect(resolved).toHaveLength(1)
      expect(resolved[0].error).toBe(true)
      expect(resolved[0].title).toContain('(missing)')
    })

    it('resolves image frames regardless of registry', () => {
      const dbFrames: DbFrame[] = [
        { id: 'img-1', title: 'Inspiration', componentKey: null, src: 'http://localhost/image.png', props: {}, width: 300, height: 300, sortOrder: 0 },
      ]

      const resolved = resolveDbFrames(dbFrames, {})
      expect(resolved).toHaveLength(1)
      expect(resolved[0].type).toBe('image')
      expect(resolved[0].src).toBe('http://localhost/image.png')
    })

    it('handles mixed component and image frames', () => {
      const DirA = makeStubComponent('DirA')
      const dbFrames: DbFrame[] = [
        { id: 'dir-a', title: 'Direction A', componentKey: 'DirA', src: null, props: {}, width: 1440, height: 900, sortOrder: 0 },
        { id: 'img-1', title: 'Inspo', componentKey: null, src: 'http://localhost/img.png', props: {}, width: 300, height: 300, sortOrder: 1 },
        { id: 'dir-b', title: 'Direction B', componentKey: 'MissingComponent', src: null, props: {}, width: 1440, height: 900, sortOrder: 2 },
      ]

      const resolved = resolveDbFrames(dbFrames, { DirA })
      expect(resolved).toHaveLength(3)
      expect(resolved[0].type).toBe('component')
      expect(resolved[0].error).toBeUndefined()
      expect(resolved[1].type).toBe('image')
      expect(resolved[2].error).toBe(true)
    })

    it('passes props through to resolved frames', () => {
      const DirA = makeStubComponent('DirA')
      const customProps = { variant: 'dark', size: 'large' }
      const dbFrames: DbFrame[] = [
        { id: 'dir-a', title: 'A', componentKey: 'DirA', src: null, props: customProps, width: 1440, height: 900, sortOrder: 0 },
      ]

      const resolved = resolveDbFrames(dbFrames, { DirA })
      expect(resolved[0].props).toEqual(customProps)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. AUTO-REGISTRATION: manifest.components → DB frame records
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Auto-registration (manifest → DB)', () => {
    it('auto-registers components that are in manifest but not in DB', async () => {
      const registry = {
        DirA: makeStubComponent('DirA'),
        DirB: makeStubComponent('DirB'),
        DirC: makeStubComponent('DirC'),
      }

      const dbFramesBefore = getFrames('test-project')
      expect(dbFramesBefore).toHaveLength(0)

      const didRegister = await autoRegisterMissingFrames('test-project', [], registry)
      expect(didRegister).toBe(true)

      const dbFramesAfter = getFrames('test-project')
      expect(dbFramesAfter).toHaveLength(3)

      // Verify each frame was created with correct componentKey
      const keys = dbFramesAfter.map(f => f.componentKey).sort()
      expect(keys).toEqual(['DirA', 'DirB', 'DirC'])
    })

    it('does NOT re-register components already in DB', async () => {
      createFrame('test-project', { id: 'dir-a', title: 'A', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })

      const registry = {
        DirA: makeStubComponent('DirA'),
        DirB: makeStubComponent('DirB'),
      }

      const dbFrames = getFrames('test-project')
      const didRegister = await autoRegisterMissingFrames('test-project', dbFrames, registry)
      expect(didRegister).toBe(true) // DirB is new

      const allFrames = getFrames('test-project')
      expect(allFrames).toHaveLength(2)
    })

    it('does NOT re-register intentionally deleted components', async () => {
      createFrame('test-project', { id: 'dir-a', title: 'A', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })
      softDeleteFrame('test-project', 'dir-a')

      const registry = { DirA: makeStubComponent('DirA') }

      const dbFrames = getFrames('test-project')
      const didRegister = await autoRegisterMissingFrames('test-project', dbFrames, registry)
      expect(didRegister).toBe(false) // DirA was deleted, should NOT re-register
    })

    it('returns false when nothing to register', async () => {
      createFrame('test-project', { id: 'dir-a', title: 'A', componentKey: 'DirA', width: 1440, height: 900, sortOrder: 0 })

      const registry = { DirA: makeStubComponent('DirA') }
      const dbFrames = getFrames('test-project')
      const didRegister = await autoRegisterMissingFrames('test-project', dbFrames, registry)
      expect(didRegister).toBe(false)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. ANNOTATION FLOW: new project annotation → DB → pending
  // ─────────────────────────────────────────────────────────────────────────────

  describe('New project annotation flow', () => {
    it('creates per-project annotation DB on first annotation', () => {
      const projectName = 'brand-new-project'
      const projectBryllenDir = join(TEST_PROJECTS_DIR, projectName, '.bryllen')

      // DB doesn't exist yet
      expect(existsSync(projectBryllenDir)).toBe(false)

      // Create annotation — this should create the DB
      const db = getProjectAnnotationDb(TEST_PROJECTS_DIR, projectName)
      expect(db).toBeTruthy()

      // Directory was created
      expect(existsSync(projectBryllenDir)).toBe(true)
      expect(existsSync(join(projectBryllenDir, 'annotations.db'))).toBe(true)
    })

    it('stores project annotation with pending status', () => {
      const db = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'my-app')
      const annotation = addProjectAnnotation(db, {
        type: 'project',
        comment: JSON.stringify({ name: 'my-app', description: 'A landing page', prompt: 'Create a SaaS landing page' }),
      })

      expect(annotation.id).toBeTruthy()
      expect(annotation.type).toBe('project')
      expect(annotation.status).toBe('pending') // Immediate types go straight to pending
      expect(annotation.comment).toContain('SaaS landing page')
    })

    it('retrieves pending annotations by status', () => {
      const db = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'my-app')

      // Add a project annotation (becomes pending immediately)
      addProjectAnnotation(db, {
        type: 'project',
        comment: JSON.stringify({ name: 'my-app', prompt: 'Landing page' }),
      })

      // Add a regular annotation (becomes draft)
      addProjectAnnotation(db, {
        type: 'annotation',
        comment: 'Make the button bigger',
      })

      const pending = getProjectAnnotations(db, 'pending')
      expect(pending).toHaveLength(1)
      expect(pending[0].type).toBe('project')

      const drafts = getProjectAnnotations(db, 'draft')
      expect(drafts).toHaveLength(1)
      expect(drafts[0].type).toBe('annotation')
    })

    it('scans all project directories for pending annotations (getPending behavior)', () => {
      // Simulate getPending('') — scan all project dirs
      const projectA = 'project-a'
      const projectB = 'project-b'

      const dbA = getProjectAnnotationDb(TEST_PROJECTS_DIR, projectA)
      addProjectAnnotation(dbA, { type: 'project', comment: '{"name":"project-a"}' })

      const dbB = getProjectAnnotationDb(TEST_PROJECTS_DIR, projectB)
      addProjectAnnotation(dbB, { type: 'iteration', comment: 'V2' })

      // Scan all project dirs (simulates getPending(''))
      const all: any[] = []
      const dirs = readdirSync(TEST_PROJECTS_DIR).filter(f => {
        try {
          return require('fs').statSync(join(TEST_PROJECTS_DIR, f)).isDirectory() && !f.startsWith('.')
        } catch { return false }
      })

      for (const dir of dirs) {
        const db = getProjectAnnotationDb(TEST_PROJECTS_DIR, dir)
        const annotations = getProjectAnnotations(db, 'pending')
        all.push(...annotations.map(a => ({ ...a, project: dir })))
      }

      expect(all).toHaveLength(2)
      expect(all.find(a => a.project === 'project-a')).toBeTruthy()
      expect(all.find(a => a.project === 'project-b')).toBeTruthy()
    })

    it('resolves annotation status from pending to resolved', () => {
      const db = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'my-app')
      const annotation = addProjectAnnotation(db, {
        type: 'project',
        comment: '{"name":"my-app"}',
      })

      const updated = updateProjectAnnotationStatus(db, annotation.id, 'resolved')
      expect(updated.status).toBe('resolved')

      // No longer appears in pending
      const pending = getProjectAnnotations(db, 'pending')
      expect(pending).toHaveLength(0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. END-TO-END: New project → annotation → frames → resolution
  // ─────────────────────────────────────────────────────────────────────────────

  describe('End-to-end new project flow', () => {
    it('complete flow: create project → annotation → register frames → resolve', async () => {
      const projectName = 'my-landing-page'

      // Step 1: New project dialog submits annotation
      const annotationDb = getProjectAnnotationDb(TEST_PROJECTS_DIR, projectName)
      const annotation = addProjectAnnotation(annotationDb, {
        type: 'project',
        comment: JSON.stringify({
          name: projectName,
          description: 'A SaaS landing page',
          prompt: 'Create a modern SaaS landing page with hero, features, and pricing sections',
        }),
      })
      expect(annotation.status).toBe('pending')

      // Step 2: Agent receives annotation, creates component files
      // (Simulated: in real flow, agent writes .tsx files and updates manifest.ts)
      // The manifest would have these components:
      const registry = {
        TokensPage: makeStubComponent('TokensPage'),
        ComponentsPage: makeStubComponent('ComponentsPage'),
        DirAHero: makeStubComponent('DirAHero'),
        DirBHero: makeStubComponent('DirBHero'),
        DirCHero: makeStubComponent('DirCHero'),
      }

      // Step 3: Auto-register frames from manifest.components → DB
      const dbFramesBefore = getFrames(projectName)
      expect(dbFramesBefore).toHaveLength(0)

      const didRegister = await autoRegisterMissingFrames(projectName, [], registry)
      expect(didRegister).toBe(true)

      // Step 4: Verify frames were created in DB
      const dbFrames = getFrames(projectName)
      expect(dbFrames).toHaveLength(5)

      // Step 5: Resolve frames against registry
      const resolved = resolveDbFrames(dbFrames, registry)
      expect(resolved).toHaveLength(5)

      // ALL frames should resolve successfully (no errors)
      const errors = resolved.filter(f => f.error)
      expect(errors).toHaveLength(0)

      // ALL frames should have actual component references
      const componentFrames = resolved.filter(f => f.type === 'component' && f.component)
      expect(componentFrames).toHaveLength(5)

      // Step 6: Agent resolves the annotation
      const resolvedAnnotation = updateProjectAnnotationStatus(annotationDb, annotation.id, 'resolved')
      expect(resolvedAnnotation.status).toBe('resolved')

      // Step 7: No more pending annotations
      const pending = getProjectAnnotations(annotationDb, 'pending')
      expect(pending).toHaveLength(0)
    })

    it('handles the "empty folder" scenario (first project ever)', async () => {
      // Start with completely empty projects dir
      expect(readdirSync(TEST_PROJECTS_DIR)).toHaveLength(0)

      const projectName = 'first-project'

      // Creating the annotation DB also creates the project directory
      const annotationDb = getProjectAnnotationDb(TEST_PROJECTS_DIR, projectName)
      const annotation = addProjectAnnotation(annotationDb, {
        type: 'project',
        comment: JSON.stringify({ name: projectName, prompt: 'My first design' }),
      })

      // Project directory now exists (created by getProjectAnnotationDb)
      expect(existsSync(join(TEST_PROJECTS_DIR, projectName))).toBe(true)

      // Scan should find it
      const dirs = readdirSync(TEST_PROJECTS_DIR).filter(f =>
        require('fs').statSync(join(TEST_PROJECTS_DIR, f)).isDirectory() && !f.startsWith('.')
      )
      expect(dirs).toContain(projectName)

      // Annotation is pending
      const pending = getProjectAnnotations(annotationDb, 'pending')
      expect(pending).toHaveLength(1)
      expect(pending[0].id).toBe(annotation.id)
    })

    it('second project does not interfere with first project', async () => {
      // Create first project with frames
      const registry1 = { DirA: makeStubComponent('DirA') }
      await autoRegisterMissingFrames('project-1', [], registry1)

      // Create second project with different frames
      const registry2 = { DirX: makeStubComponent('DirX'), DirY: makeStubComponent('DirY') }
      await autoRegisterMissingFrames('project-2', [], registry2)

      // Each project has its own frames
      const frames1 = getFrames('project-1')
      const frames2 = getFrames('project-2')
      expect(frames1).toHaveLength(1)
      expect(frames1[0].componentKey).toBe('DirA')
      expect(frames2).toHaveLength(2)
      expect(frames2.map(f => f.componentKey).sort()).toEqual(['DirX', 'DirY'])

      // Resolution is project-isolated
      const resolved1 = resolveDbFrames(frames1, registry1)
      expect(resolved1).toHaveLength(1)
      expect(resolved1[0].error).toBeUndefined()

      // Resolving project-2 frames against project-1 registry fails gracefully
      const cross = resolveDbFrames(frames2, registry1)
      expect(cross).toHaveLength(2)
      expect(cross.every(f => f.error)).toBe(true)
    })

    it('incremental HMR: adding a component to an existing project', async () => {
      // Initial state: 2 frames
      const initialRegistry = {
        DirA: makeStubComponent('DirA'),
        DirB: makeStubComponent('DirB'),
      }
      await autoRegisterMissingFrames('my-project', [], initialRegistry)

      let frames = getFrames('my-project')
      expect(frames).toHaveLength(2)

      // HMR update: agent adds DirC to manifest
      const updatedRegistry = {
        ...initialRegistry,
        DirC: makeStubComponent('DirC'),
      }

      const didRegister = await autoRegisterMissingFrames('my-project', frames, updatedRegistry)
      expect(didRegister).toBe(true)

      frames = getFrames('my-project')
      expect(frames).toHaveLength(3)

      // All 3 resolve correctly
      const resolved = resolveDbFrames(frames, updatedRegistry)
      expect(resolved.every(f => !f.error)).toBe(true)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. ANNOTATION ISOLATION: per-project databases don't leak
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Annotation isolation', () => {
    it('annotations in project A are NOT visible in project B', () => {
      const dbA = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'project-a')
      const dbB = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'project-b')

      addProjectAnnotation(dbA, { type: 'project', comment: 'Project A annotation' })
      addProjectAnnotation(dbB, { type: 'annotation', comment: 'Project B annotation' })

      const aAnnotations = getProjectAnnotations(dbA)
      const bAnnotations = getProjectAnnotations(dbB)

      expect(aAnnotations).toHaveLength(1)
      expect(aAnnotations[0].comment).toBe('Project A annotation')
      expect(bAnnotations).toHaveLength(1)
      expect(bAnnotations[0].comment).toBe('Project B annotation')
    })

    it('resolving in one project does not affect another', () => {
      const dbA = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'project-a')
      const dbB = getProjectAnnotationDb(TEST_PROJECTS_DIR, 'project-b')

      const annotA = addProjectAnnotation(dbA, { type: 'project', comment: 'A' })
      const annotB = addProjectAnnotation(dbB, { type: 'project', comment: 'B' })

      // Resolve A
      updateProjectAnnotationStatus(dbA, annotA.id, 'resolved')

      // B should still be pending
      const bAnnotation = getProjectAnnotation(dbB, annotB.id)
      expect(bAnnotation.status).toBe('pending')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. VITE PLUGIN: manifest discovery
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Vite plugin manifest discovery', () => {
    it('finds manifest.ts files in project directories', () => {
      // Create project dirs with manifest files
      const projectDir1 = join(TEST_PROJECTS_DIR, 'project-1')
      const projectDir2 = join(TEST_PROJECTS_DIR, 'project-2')
      const emptyDir = join(TEST_PROJECTS_DIR, 'empty-project')

      mkdirSync(projectDir1, { recursive: true })
      mkdirSync(projectDir2, { recursive: true })
      mkdirSync(emptyDir, { recursive: true })

      writeFileSync(join(projectDir1, 'manifest.ts'), 'export default {}')
      writeFileSync(join(projectDir2, 'manifest.ts'), 'export default {}')
      // emptyDir has no manifest.ts

      // Simulate findManifests() logic
      const manifests = readdirSync(TEST_PROJECTS_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => join(TEST_PROJECTS_DIR, d.name, 'manifest.ts'))
        .filter(p => existsSync(p))

      expect(manifests).toHaveLength(2)
      expect(manifests.some(m => m.includes('project-1'))).toBe(true)
      expect(manifests.some(m => m.includes('project-2'))).toBe(true)
    })

    it('generates correct virtual module for discovered manifests', () => {
      const projectDir = join(TEST_PROJECTS_DIR, 'test-project')
      mkdirSync(projectDir, { recursive: true })
      writeFileSync(join(projectDir, 'manifest.ts'), 'export default {}')

      const manifests = readdirSync(TEST_PROJECTS_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => join(TEST_PROJECTS_DIR, d.name, 'manifest.ts'))
        .filter(p => existsSync(p))

      // Simulate generateModule() logic
      const imports = manifests.map((m, i) =>
        `import manifest_${i} from '${m.replace(/\\/g, '/')}'`
      ).join('\n')
      const exports = manifests.map((_, i) => `manifest_${i}`).join(', ')
      const moduleCode = `${imports}\nexport const manifests = [${exports}];\n`

      expect(moduleCode).toContain('import manifest_0 from')
      expect(moduleCode).toContain('export const manifests = [manifest_0]')
    })

    it('returns empty manifests array when no projects exist', () => {
      // Projects dir exists but is empty
      const manifests = readdirSync(TEST_PROJECTS_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => join(TEST_PROJECTS_DIR, d.name, 'manifest.ts'))
        .filter(p => existsSync(p))

      expect(manifests).toHaveLength(0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. CREATING PROJECT STATE (BryllenShell logic)
  // ─────────────────────────────────────────────────────────────────────────────

  describe('CreatingProject state management', () => {
    it('auto-switches to new project when its manifest appears', () => {
      // Simulates the fixed useEffect logic
      const creatingProject = { name: 'new-project', annotationId: '1' }

      // Before: only old project exists
      const manifestsBefore = [{ project: 'old-project', components: {} }]
      const newIndexBefore = manifestsBefore.findIndex(m => m.project === creatingProject.name)
      expect(newIndexBefore).toBe(-1) // Not found yet

      // After: new project's manifest appears via HMR
      const manifestsAfter = [
        { project: 'old-project', components: {} },
        { project: 'new-project', components: {} },
      ]
      const newIndexAfter = manifestsAfter.findIndex(m => m.project === creatingProject.name)
      expect(newIndexAfter).toBe(1) // Found at index 1

      // This is the fix: we switch to the SPECIFIC new project, not just "any manifest exists"
    })

    it('does NOT clear creating state when only old projects exist', () => {
      const creatingProject = { name: 'brand-new', annotationId: '1' }
      const manifests = [{ project: 'existing-project', components: {} }]

      // The OLD buggy code would clear here because manifests.length > 0
      // The FIXED code checks for the specific project name
      const found = manifests.some(m => m.project === creatingProject.name)
      expect(found).toBe(false) // Should NOT clear creating state
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. SERVER: annotation notification for new projects
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Annotation notification logic', () => {
    it('project-type annotations match ANY waiter (regardless of project filter)', () => {
      // Simulates the fixed waiter matching logic from http-server.js
      const waiters = [
        { projectName: 'existing-project' }, // Watching a specific project
        { projectName: '' },                 // Global watcher
      ]

      const projectName = 'brand-new-project'
      const isNewProject = true

      // Fixed logic: for project annotations, match ANY waiter
      const matchedIdx = waiters.findIndex(w =>
        isNewProject ? true : (!w.projectName || w.projectName === projectName)
      )

      expect(matchedIdx).toBe(0) // First waiter matched (even though it watches a different project)
    })

    it('non-project annotations only match global or same-project waiters', () => {
      const waiters = [
        { projectName: 'project-a' },
        { projectName: '' },
      ]

      const projectName = 'project-b'
      const isNewProject = false

      const matchedIdx = waiters.findIndex(w =>
        isNewProject ? true : (!w.projectName || w.projectName === projectName)
      )

      // Matches the global watcher (index 1), not the project-a watcher
      expect(matchedIdx).toBe(1)
    })

    it('project annotations match even when only project-scoped waiters exist', () => {
      const waiters = [
        { projectName: 'project-a' }, // Only a project-scoped watcher, no global
      ]

      const projectName = 'totally-new-project'
      const isNewProject = true

      const matchedIdx = waiters.findIndex(w =>
        isNewProject ? true : (!w.projectName || w.projectName === projectName)
      )

      expect(matchedIdx).toBe(0) // Matched! (wouldn't match without the fix)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. SOURCE CODE CONTRACTS
  // ─────────────────────────────────────────────────────────────────────────────

  describe('Source code contracts', () => {
    it('BryllenShell auto-switches to new project by name (not just manifests.length)', () => {
      const shellSource = readFileSync(join(ROOT, 'src/runtime/BryllenShell.tsx'), 'utf-8')

      // The fix: check for specific project name
      expect(shellSource).toContain('m.project === creatingProject.name')
      // Should NOT have the old buggy pattern
      expect(shellSource).not.toContain('if (creatingProject && manifests.length > 0)')
    })

    it('http-server broadcasts project annotations to ALL waiters', () => {
      const serverSource = readFileSync(join(ROOT, 'src/server/http-server.js'), 'utf-8')

      // The fix: project annotations broadcast to all
      expect(serverSource).toContain('isNewProject ? true')
    })

    it('addProjectAnnotation sets pending status for project-type annotations', () => {
      const dbSource = readFileSync(join(ROOT, 'src/server/db.js'), 'utf-8')

      // Immediate types (project, iteration, etc.) get 'pending' status
      expect(dbSource).toContain("data.type === 'project'")
      expect(dbSource).toContain("isImmediate ? 'pending' : 'draft'")
    })

    it('Vite plugin watches manifest.ts for HMR reload', () => {
      const pluginSource = readFileSync(join(ROOT, 'src/vite-plugin/index.ts'), 'utf-8')

      expect(pluginSource).toContain("filePath.endsWith('manifest.ts')")
      expect(pluginSource).toContain("type: 'full-reload'")
    })

    it('useFrames resolveDbFrames handles missing components gracefully', () => {
      const useFramesSource = readFileSync(join(ROOT, 'src/runtime/useFrames.tsx'), 'utf-8')

      // Error placeholder path exists
      expect(useFramesSource).toContain('Component not found')
      // Auto-registration path exists
      expect(useFramesSource).toContain('Auto-registered frame')
    })
  })
})
