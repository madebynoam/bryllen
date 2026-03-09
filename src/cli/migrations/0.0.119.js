/**
 * Migration 0.0.119: Switch to DB-driven frame manifest format
 *
 * Before: manifest.ts has `frames: []` (empty scaffold) + `grid: {...}`
 * After:  manifest.ts has `components: {}` (component registry only)
 *
 * Only applies to manifests with an empty frames array (freshly scaffolded).
 * Manifests with real frame definitions are left untouched — they continue
 * to work in backward-compat mode.
 */

export const version = '0.0.119'

export const description = 'Switch from empty frames array to DB-driven components registry'

export const files = [] // Manifests are auto-discovered

/**
 * Only migrate manifests that have an empty frames array (the scaffold default).
 * Manifests with actual frame data keep working via the frames[] backward-compat path.
 */
export function applies(fileContents) {
  for (const [filepath, content] of Object.entries(fileContents)) {
    if (!filepath.endsWith('/manifest.ts')) continue
    if (!content) continue

    // Has ProjectManifest type + empty frames array + no components key yet
    if (
      content.includes('ProjectManifest') &&
      /frames:\s*\[\s*\]/.test(content) &&
      !content.includes('components:')
    ) {
      return true
    }
  }
  return false
}

/**
 * Replace `frames: [], grid: {...}` with `components: {}` in manifest.ts files.
 */
export function migrate(fileContents) {
  const result = {}

  for (const [filepath, content] of Object.entries(fileContents)) {
    if (!filepath.endsWith('/manifest.ts')) continue
    if (!content) continue

    // Skip if doesn't have the empty frames pattern
    if (!content.includes('ProjectManifest') || !/frames:\s*\[\s*\]/.test(content)) {
      continue
    }

    // Skip if already migrated
    if (content.includes('components:')) continue

    let migrated = content

    // Remove empty frames array and grid block that follows it
    // Pattern: frames: [],\n  grid: {\n    ...\n  },\n
    migrated = migrated.replace(
      /\s*frames:\s*\[\s*\],\s*\n(\s*grid:\s*\{[^}]*\},?\s*\n)?/s,
      '\n  components: {},\n'
    )

    // Fallback: if regex above didn't match, just replace frames: [] with components: {}
    if (migrated === content) {
      migrated = migrated.replace(/frames:\s*\[\s*\]/, 'components: {}')
    }

    if (migrated !== content) {
      result[filepath] = migrated
    }
  }

  return result
}
