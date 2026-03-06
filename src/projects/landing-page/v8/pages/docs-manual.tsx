import { useState } from 'react'

// ── Docs Manual — Book-style Documentation ──────────────────────────────────
// Extends the Codex aesthetic to documentation. Warm cream, numbered chapters,
// dot leaders, book-like reading experience. Approachable for designers.

const C = {
  bg: 'oklch(0.985 0.008 85)',
  text: 'oklch(0.150 0.010 80)',
  textSec: 'oklch(0.400 0.008 80)',
  textTer: 'oklch(0.580 0.006 80)',
  border: 'oklch(0.900 0.010 85)',
  accent: 'oklch(0.280 0.010 80)',
  accentSoft: 'oklch(0.950 0.015 85)',
  code: 'oklch(0.970 0.005 85)',
}

const font = '"Söhne", -apple-system, system-ui, sans-serif'
const mono = '"SF Mono", "Fira Code", Menlo, monospace'

function DotLeader() {
  return (
    <span style={{
      flex: 1, borderBottom: `1px dotted ${C.border}`,
      margin: '0 16px', alignSelf: 'baseline',
      position: 'relative', top: -5,
    }} />
  )
}

const toc = [
  { num: '01', title: 'Getting Started', sections: ['Install', 'First Project'] },
  { num: '02', title: 'The Canvas', sections: ['Navigation', 'Frames', 'Pages'] },
  { num: '03', title: 'Generating Designs', sections: ['Prompts', 'Directions'] },
  { num: '04', title: 'Annotations', sections: ['Click to Refine', 'Ideate Mode'] },
  { num: '05', title: 'Iterations', sections: ['Version History', 'Branching'] },
  { num: '06', title: 'Sharing', sections: ['Deploy', 'Share Links'] },
  { num: '07', title: 'CLI Reference', sections: ['Commands'] },
]

export function DocsManual() {
  const [activeChapter, setActiveChapter] = useState('01')

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflow: 'auto', fontFamily: font, WebkitFontSmoothing: 'antialiased' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 80px', maxWidth: 1120, margin: '0 auto',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: C.text }}>bryllen</span>
          <span style={{ fontFamily: mono, fontSize: 11, color: C.textTer, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Documentation</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textTer }}>v1.0</span>
      </nav>

      <div style={{ display: 'flex', maxWidth: 1120, margin: '0 auto', padding: '0 80px', boxSizing: 'border-box' }}>
        {/* Sidebar TOC */}
        <aside style={{
          width: 260, flexShrink: 0, paddingRight: 48,
          borderRight: `1px solid ${C.border}`, paddingTop: 40,
        }}>
          <p style={{
            fontFamily: mono, fontSize: 10, color: C.textTer,
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 20px',
          }}>Contents</p>
          {toc.map((ch) => (
            <div
              key={ch.num}
              onClick={() => setActiveChapter(ch.num)}
              style={{
                display: 'flex', alignItems: 'baseline', padding: '10px 0',
                cursor: 'default', opacity: activeChapter === ch.num ? 1 : 0.6,
                transition: 'opacity 0.15s ease',
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 11, color: C.textTer, width: 28, flexShrink: 0 }}>{ch.num}</span>
              <span style={{ fontFamily: font, fontSize: 14, fontWeight: activeChapter === ch.num ? 500 : 400, color: C.text }}>{ch.title}</span>
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, padding: '40px 0 80px 48px' }}>
          <p style={{
            fontFamily: mono, fontSize: 10, color: C.textTer,
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 12px',
          }}>Chapter 01</p>
          <h1 style={{
            fontFamily: font, fontSize: 36, fontWeight: 500, color: C.text,
            lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 32px',
          }}>Getting Started</h1>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: font, fontSize: 18, fontWeight: 500, color: C.text,
              margin: '0 0 16px', display: 'flex', alignItems: 'baseline',
            }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.textTer, width: 40 }}>1.1</span>
              Install
            </h2>
            <p style={{
              fontFamily: font, fontSize: 15, color: C.textSec,
              lineHeight: 1.65, margin: '0 0 16px', maxWidth: 560,
            }}>
              Bryllen is a Claude Code plugin. Install it from the plugin marketplace:
            </p>
            <div style={{
              background: C.code, borderRadius: 6, padding: '14px 18px',
              fontFamily: mono, fontSize: 13, color: C.text,
              border: `1px solid ${C.border}`,
            }}>
              claude plugin install bryllen
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: font, fontSize: 18, fontWeight: 500, color: C.text,
              margin: '0 0 16px', display: 'flex', alignItems: 'baseline',
            }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.textTer, width: 40 }}>1.2</span>
              First Project
            </h2>
            <p style={{
              fontFamily: font, fontSize: 15, color: C.textSec,
              lineHeight: 1.65, margin: '0 0 16px', maxWidth: 560,
            }}>
              Create a new design project with the new command. This sets up the folder structure and starts the canvas:
            </p>
            <div style={{
              background: C.code, borderRadius: 6, padding: '14px 18px',
              fontFamily: mono, fontSize: 13, color: C.text,
              border: `1px solid ${C.border}`, marginBottom: 16,
            }}>
              /bryllen-new my-landing-page
            </div>
            <p style={{
              fontFamily: font, fontSize: 15, color: C.textSec,
              lineHeight: 1.65, margin: 0, maxWidth: 560,
            }}>
              Describe what you want to design. Bryllen generates multiple directions you can compare side by side on the canvas.
            </p>
          </section>

          {/* Chapter nav */}
          <div style={{
            borderTop: `1px solid ${C.border}`, paddingTop: 32, marginTop: 48,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ fontFamily: font, fontSize: 13, color: C.textTer }}>← Previous</span>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: C.text }}>Next: The Canvas</span>
              <span style={{ fontFamily: font, fontSize: 13, color: C.textTer, marginLeft: 8 }}>→</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
