# Bryllen × 2026 agent platform upgrades

Research synthesis (June 2026): what's shipped in Claude Code, Codex, and the AI design-tool landscape since Bryllen's integration architecture was built — and how Bryllen harnesses it.

## Where Bryllen stands (v0.0.155)

The integration is **CLI polling + SSE**:

- The agent loops `npx bryllen watch` — a 15s long-poll against the local HTTP server (`/annotations/next`, sqlite-backed).
- Screenshots via Playwright (`/screenshot` endpoint), read back with the Read tool.
- Auto-commit on `resolve`.
- The plugin is purely skills — no hooks, no MCP, no subagents, no Agent SDK. (MCP was deliberately removed in v0.0.79 in favor of CLI commands.)

The polling loop is the outdated part: the industry converged on push. Codex moved to a bidirectional App Server protocol (JSON-RPC over stdio/WebSocket); Cursor's browser integration is push-based MCP; GitHub/Windsurf built "agent inbox" surfaces for long-running agents.

## Prioritized upgrades

### 1. Event-driven annotations — kill the polling loop ⬅ shipped in this round

Claude Code's **Monitor tool** (stable) watches a long-running command; every stdout line becomes a notification that wakes the agent. The agent stays free between annotations — no burn-a-turn-every-15s loop, and the designer can chat with the agent while it waits.

Implementation:

- `bryllen watch --stream`: never exits; long-polls `/annotations/next` in an internal loop and prints **one compact JSON line per annotation**. Reconnects with backoff if the server restarts.
- `/bryllen-design` arms it via Monitor (`persistent: true`) instead of looping `watch`.
- The old single-shot `watch` remains for harnesses without Monitor.

Future option: **Channels** (research preview) — MCP-based push where canvas events arrive as inbound session messages with two-way replies. Revisit when it stabilizes.

### 2. Plugin modernization ⬅ shipped in this round

- **SessionStart hook**: detects a Bryllen workspace (`.bryllen-ports.json` / `src/projects/`) and injects server status + project list as context, so any session opened in a Bryllen project knows the canvas state without the designer running anything.
- **`disallowed-tools` on skills**: keep watch-mode focused (no WebSearch etc.).
- Distribution niceties now available: `claude plugin init` scaffolding, `.zip` / `--plugin-url` installs.

### 3. Parallel direction generation with subagents ⬅ shipped in this round

`/bryllen-new` generated 3–5 directions sequentially in one context. Plugins can bundle **custom agents**; the skill now spawns one direction-generator subagent per direction concurrently. Each gets the design brief plus a distinct visual bet and is blind to the others — faster, and genuinely more diverse because directions don't anchor on each other. Tokens + shared scaffolding are laid down first by the main agent; subagents fill in their direction's components/page.

### 4. Design-system grounding per project

Figma's MCP server generates a design-system rules file from your codebase; that's the benchmark. Bryllen equivalent: auto-generate a per-project context file (tokens, component inventory, hierarchy rules as *data*) that is fed to every generation, rather than rules the model must remember from CLAUDE.md prose.

### 5. "No terminal" mode via the Claude Agent SDK

Bryllen's audience is designers who never open a terminal — yet it requires a running Claude Code session. The **Agent SDK** (TypeScript, stable; hooks, sessions, structured outputs, `canUseTool`) would let the Bryllen server drive Claude directly: annotation → SDK `query()` → file edits → HMR. Codex's App Server and Figma Make's codebase-connection validate this embedded-agent shape.

Trade-offs: loses the user's Claude Code session context (their CLAUDE.md, plugins, memory); Agent SDK usage bills against separate credits as of June 15, 2026. Ship as an *alternative* runtime, not a replacement.

### 6. Model & effort routing

- **Fable 5** (strong planning + vision, 1M context) for new directions and iteration protocols.
- Cheaper/faster models for mechanical passes (screenshot review, changelog updates) via subagent `model` frontmatter.
- **Effort levels** are tunable per skill/agent frontmatter; fast mode where latency is the UX (one-line annotation tweaks).

## Competitive landscape notes (mid-2026)

- **Codex**: App Server protocol (bidirectional JSON-RPC, embeddable agent), in-app browser for visual verification, persisted Goals, TS SDK.
- **Cursor Design Mode**: click elements, *draw on the page*, or speak changes by voice — the agent sees selected elements + code + layout. Bryllen's annotate mode is click+type; freehand marks and voice are natural additions (selector + computedStyles capture already exists).
- **Google Antigravity**: agents report via **Artifacts** — screenshots, recordings, walkthroughs as an evidence trail. Bryllen analog: per-annotation before/after card in the ProgressPanel.
- **Figma Design Agent / Make**: N stylistic variations on canvas with deep design-system context; Make edits your local codebase with element-anchored prompting. Variations-as-first-class validates Bryllen's directions model.
- **v0, Lovable, Replit Agent 4**: design modes with direct element editing written straight to code; checkpoint rollback.
- **Patterns**: MCP is universal (Linux Foundation, every major vendor); push-over-poll bidirectional channels; visual verification via browser control is table stakes.

## Sequencing

1. ✅ `watch --stream` + Monitor (this round)
2. ✅ Plugin refresh: SessionStart hook, disallowed-tools (this round)
3. ✅ Parallel direction subagents in `/bryllen-new` (this round)
4. Per-project design-system context file fed to generations
5. Agent SDK headless backend prototype ("Bryllen without a terminal")
6. Annotate-mode upgrades: freehand draw, voice; before/after artifact cards
