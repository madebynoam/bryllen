---
name: canvai-close
description: Stop all Canvai dev servers and free ports
---

# /canvai-close

Stop all running Canvai processes (Vite dev server, MCP HTTP server).

## Steps

1. **Kill only THIS project's servers** using PIDs from the ports file:
   ```bash
   if [ -f .canvai-ports.json ]; then
     # Kill by PID (safe) — never by port (could kill another project's server)
     node -e "
       const f = JSON.parse(require('fs').readFileSync('.canvai-ports.json','utf8'));
       for (const pid of [f.pid, f.vitePid, f.httpPid].filter(Boolean)) {
         try { process.kill(pid, 'SIGTERM'); } catch {}
       }
     "
     rm -f .canvai-ports.json
   else
     echo "No .canvai-ports.json found — no servers to stop for this project."
   fi
   ```
   This kills by PID, not port — so other canvai instances are never affected.

2. **Confirm:** "Canvai servers stopped for this project."
