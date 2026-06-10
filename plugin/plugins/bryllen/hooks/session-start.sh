#!/bin/bash
# SessionStart hook — when a session opens inside a Bryllen workspace, inject
# canvas state as context. Plain stdout from a SessionStart hook is added to
# the agent's context. Prints nothing (and exits 0) outside Bryllen workspaces.

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# A Bryllen workspace has the version marker or a bryllen dependency
if [ ! -f .bryllen-version ] && ! grep -q '"bryllen"' package.json 2>/dev/null; then
  exit 0
fi

projects=$(ls src/projects 2>/dev/null | grep -v '^\.' | tr '\n' ' ' | sed 's/ $//')

running=false
vite_port=5173
if [ -f .bryllen-ports.json ]; then
  vite_port=$(node -e "try{console.log(JSON.parse(require('fs').readFileSync('.bryllen-ports.json','utf8')).vite||5173)}catch{console.log(5173)}" 2>/dev/null)
  http_pid=$(node -e "try{console.log(JSON.parse(require('fs').readFileSync('.bryllen-ports.json','utf8')).httpPid||'')}catch{}" 2>/dev/null)
  if [ -n "$http_pid" ] && kill -0 "$http_pid" 2>/dev/null; then
    running=true
  fi
fi

echo "## Bryllen workspace"
if [ "$running" = true ]; then
  echo "This directory is a Bryllen design workspace. The dev server is RUNNING — canvas at http://localhost:${vite_port}. To process canvas annotations, invoke /bryllen-design (it drains the backlog and arms the annotation stream)."
else
  echo "This directory is a Bryllen design workspace. The dev server is NOT running — start it with /bryllen-design."
fi
if [ -n "$projects" ]; then
  echo "Canvas projects in src/projects/: ${projects}"
fi
exit 0
