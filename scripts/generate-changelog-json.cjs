#!/usr/bin/env node
//
// Parses CHANGELOG.md into src/runtime/changelog.json
// Called by bump-version.sh after every version bump.
//
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const changelog = fs.readFileSync(path.join(ROOT, 'CHANGELOG.md'), 'utf-8')

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .trim()
}

const entries = []
const sections = changelog.split(/^## /m).slice(1)

for (const section of sections) {
  const lines = section.split('\n')
  const heading = lines[0].trim()

  // Only match semver headings (skip V10, bryllen-ui-system V6, etc.)
  const match = heading.match(/^(\d+\.\d+\.\d+)(?:\s*[—–-]\s*(.+))?/)
  if (!match) continue

  const version = match[1]
  const title = match[2] ? stripMarkdown(match[2]) : null

  // Collect top-level bullet changes only
  const changes = []
  for (const line of lines.slice(1)) {
    if (line.startsWith('- ')) {
      changes.push(stripMarkdown(line.slice(2)))
    }
  }

  entries.push({ version, title, changes })
}

const outPath = path.join(ROOT, 'src', 'runtime', 'changelog.json')
fs.writeFileSync(outPath, JSON.stringify(entries, null, 2) + '\n')
console.log(`  Generated changelog.json with ${entries.length} entries`)
