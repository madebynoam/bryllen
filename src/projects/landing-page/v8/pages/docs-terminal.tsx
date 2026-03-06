import { useState } from 'react'

// ── Docs Terminal — CLI Man Page Style ──────────────────────────────────────
// Dark mode documentation styled like terminal man pages. Monospace dominant,
// green accent, command-focused. For developers who live in the terminal.

const C = {
  bg: 'oklch(0.100 0.005 260)',
  bgSec: 'oklch(0.130 0.008 260)',
  bgCode: 'oklch(0.080 0.005 260)',
  text: 'oklch(0.920 0.008 260)',
  textSec: 'oklch(0.650 0.010 260)',
  textTer: 'oklch(0.450 0.008 260)',
  border: 'oklch(0.200 0.010 260)',
  accent: 'oklch(0.720 0.180 145)',
  accentDim: 'oklch(0.500 0.120 145)',
}

const mono = '"SF Mono", "Fira Code", "JetBrains Mono", Menlo, monospace'
const font = '"Inter", -apple-system, system-ui, sans-serif'

const commands = [
  { cmd: 'new', desc: 'Create a new project' },
  { cmd: 'design', desc: 'Start the dev server' },
  { cmd: 'share', desc: 'Deploy to GitHub Pages' },
  { cmd: 'close', desc: 'Stop all servers' },
  { cmd: 'update', desc: 'Update bryllen' },
]

const sections = [
  { id: 'synopsis', title: 'SYNOPSIS' },
  { id: 'description', title: 'DESCRIPTION' },
  { id: 'commands', title: 'COMMANDS' },
  { id: 'workflow', title: 'WORKFLOW' },
  { id: 'examples', title: 'EXAMPLES' },
]

export function DocsTerminal() {
  const [activeSection, setActiveSection] = useState('synopsis')

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflow: 'auto', fontFamily: mono, WebkitFontSmoothing: 'antialiased' }}>
      {/* Header bar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px', background: C.bgSec, borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.65 0.2 25)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.75 0.18 90)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.65 0.18 145)' }} />
          </div>
          <span style={{ fontSize: 12, color: C.textTer }}>bryllen(1) — Bryllen Manual</span>
        </div>
        <span style={{ fontSize: 11, color: C.textTer }}>v1.0.0</span>
      </header>

      <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto' }}>
        {/* Sidebar */}
        <aside style={{
          width: 200, flexShrink: 0, padding: '24px 20px',
          borderRight: `1px solid ${C.border}`,
        }}>
          <p style={{ fontSize: 10, color: C.accent, letterSpacing: '0.1em', margin: '0 0 16px' }}>SECTIONS</p>
          {sections.map((s) => (
            <div
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '8px 0', cursor: 'default',
                color: activeSection === s.id ? C.accent : C.textTer,
                fontSize: 12,
              }}
            >
              {s.title}
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: '32px 40px 80px' }}>
          {/* NAME */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 11, color: C.accent, letterSpacing: '0.1em', margin: '0 0 12px' }}>NAME</h2>
            <p style={{ fontSize: 14, color: C.text, margin: 0 }}>
              <span style={{ color: C.accent }}>bryllen</span> — AI canvas for design exploration with Claude Code
            </p>
          </section>

          {/* SYNOPSIS */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 11, color: C.accent, letterSpacing: '0.1em', margin: '0 0 12px' }}>SYNOPSIS</h2>
            <div style={{
              background: C.bgCode, borderRadius: 4, padding: '12px 16px',
              border: `1px solid ${C.border}`,
            }}>
              <code style={{ fontSize: 13, color: C.text }}>
                /bryllen-<span style={{ color: C.accentDim }}>&lt;command&gt;</span> [<span style={{ color: C.textTer }}>options</span>]
              </code>
            </div>
          </section>

          {/* DESCRIPTION */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 11, color: C.accent, letterSpacing: '0.1em', margin: '0 0 12px' }}>DESCRIPTION</h2>
            <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7, margin: '0 0 12px', fontFamily: font }}>
              Bryllen is an infinite canvas where Claude Code generates real React components.
              Describe what you need in plain English, see multiple design directions at once,
              click to annotate and refine, then ship production-ready code.
            </p>
            <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7, margin: 0, fontFamily: font }}>
              Like Figma, but AI does the design work. No code required from you.
            </p>
          </section>

          {/* COMMANDS */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 11, color: C.accent, letterSpacing: '0.1em', margin: '0 0 16px' }}>COMMANDS</h2>
            {commands.map((c) => (
              <div key={c.cmd} style={{ display: 'flex', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                <code style={{ fontSize: 13, color: C.accent, width: 120, flexShrink: 0 }}>/bryllen-{c.cmd}</code>
                <span style={{ fontSize: 13, color: C.textSec, fontFamily: font }}>{c.desc}</span>
              </div>
            ))}
          </section>

          {/* WORKFLOW */}
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 11, color: C.accent, letterSpacing: '0.1em', margin: '0 0 16px' }}>WORKFLOW</h2>
            <div style={{ paddingLeft: 16, borderLeft: `2px solid ${C.border}` }}>
              {[
                { step: '1', text: 'Create project with /bryllen-new' },
                { step: '2', text: 'Describe what you want to design' },
                { step: '3', text: 'Compare multiple directions on the canvas' },
                { step: '4', text: 'Click elements to annotate and refine' },
                { step: '5', text: 'Deploy with /bryllen-share' },
              ].map((w) => (
                <div key={w.step} style={{ display: 'flex', alignItems: 'baseline', padding: '8px 0' }}>
                  <span style={{ fontSize: 12, color: C.accentDim, width: 24 }}>{w.step}.</span>
                  <span style={{ fontSize: 13, color: C.text, fontFamily: font }}>{w.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* EXAMPLES */}
          <section>
            <h2 style={{ fontSize: 11, color: C.accent, letterSpacing: '0.1em', margin: '0 0 16px' }}>EXAMPLES</h2>
            <div style={{
              background: C.bgCode, borderRadius: 4, padding: '16px 20px',
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: C.textTer }}># Create a new landing page project</span>
              </div>
              <code style={{ fontSize: 13, color: C.text }}>/bryllen-new my-landing-page</code>
              <div style={{ marginTop: 20, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: C.textTer }}># Start designing (if server stopped)</span>
              </div>
              <code style={{ fontSize: 13, color: C.text }}>/bryllen-design</code>
              <div style={{ marginTop: 20, marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: C.textTer }}># Deploy to GitHub Pages</span>
              </div>
              <code style={{ fontSize: 13, color: C.text }}>/bryllen-share</code>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
