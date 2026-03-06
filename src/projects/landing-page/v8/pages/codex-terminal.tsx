import { useState } from 'react'
import canvasExpressive from '../../screenshots/v6-expressive-canvas.png'
import canvasDirections from '../../screenshots/canvas-v3-directions.png'

// ── Codex Terminal — Dark Developer CLI ─────────────────────────────────────
// Deep black, terminal aesthetic, code-like structure. For developers who think
// in terminals. Sharp green accent on charcoal. Monospace dominance.

const C = {
  bg: 'oklch(0.100 0.005 260)',
  bgSec: 'oklch(0.130 0.008 260)',
  text: 'oklch(0.920 0.008 260)',
  textSec: 'oklch(0.650 0.010 260)',
  textTer: 'oklch(0.450 0.008 260)',
  border: 'oklch(0.200 0.010 260)',
  accent: 'oklch(0.720 0.180 145)',
  accentDim: 'oklch(0.500 0.120 145)',
}

const mono = '"SF Mono", "Fira Code", "JetBrains Mono", Menlo, monospace'
const font = '"Inter", -apple-system, system-ui, sans-serif'
const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

function TerminalLine({ prefix, text, dim }: { prefix: string, text: string, dim?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '6px 0' }}>
      <span style={{ fontFamily: mono, fontSize: 13, color: C.accent }}>{prefix}</span>
      <span style={{ fontFamily: mono, fontSize: 13, color: dim ? C.textTer : C.textSec }}>{text}</span>
    </div>
  )
}

export function CodexTerminal() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()

  const commands = [
    { cmd: 'canvas', desc: 'Infinite zoomable surface — all frames visible' },
    { cmd: 'directions', desc: 'Generate 5 complete layouts from one prompt' },
    { cmd: 'annotate', desc: 'Click elements, describe changes, watch updates' },
    { cmd: 'history', desc: 'Frozen iterations, branch from any point' },
    { cmd: 'ship', desc: 'Production React — not mockups, real code' },
  ]

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflow: 'auto', fontFamily: mono, WebkitFontSmoothing: 'antialiased' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 64px', maxWidth: 1200, margin: '0 auto',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: C.accent, fontSize: 14 }}>▸</span>
          <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 500, color: C.text }}>bryllen</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 12, color: C.textTer }}>v1.0.0</span>
      </nav>

      {/* Hero */}
      <section style={{
        padding: '80px 64px 60px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
        borderTop: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <span style={{ color: C.accent, fontSize: 14 }}>$</span>
          <span style={{ color: C.textTer, fontSize: 14 }}>bryllen --help</span>
        </div>
        <h1 style={{
          fontFamily: font, fontSize: 48, fontWeight: 600, color: C.text,
          lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 24px', textWrap: 'balance',
        }}>
          See every direction<br />
          <span style={{ color: C.accent }}>at once</span>
        </h1>
        <p style={{
          fontFamily: font, fontSize: 17, fontWeight: 400, color: C.textSec,
          marginBottom: 40, lineHeight: 1.6, textWrap: 'pretty', maxWidth: 520,
        }}>
          An infinite canvas where Claude Code generates real React components. Describe → Compare → Ship.
        </p>
        <button {...bhB} {...baB} style={{
          border: `1px solid ${C.accent}`,
          cursor: 'default', fontFamily: mono, fontWeight: 500,
          fontSize: 13, borderRadius: 4, padding: '12px 24px',
          background: 'transparent', color: C.accent,
          transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.15s ${spring}, background 0.2s ease`,
          ...(bh ? { background: C.accent, color: C.bg } : {}),
        }}>npx bryllen new</button>
      </section>

      {/* Screenshot */}
      <section style={{
        padding: '0 64px 60px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
      }}>
        <div {...h1B} style={{
          borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}`,
          background: C.bgSec,
          transform: h1 ? 'translateY(-3px)' : 'translateY(0)',
          transition: `transform 0.3s ${spring}`,
        }}>
          <div style={{
            padding: '8px 12px', borderBottom: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.65 0.2 25)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.75 0.18 90)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.65 0.18 145)' }} />
            <span style={{ marginLeft: 8, fontSize: 11, color: C.textTer }}>bryllen — canvas</span>
          </div>
          <img src={canvasExpressive} alt="Bryllen canvas" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* Commands */}
      <section style={{
        padding: '48px 64px 60px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
        borderTop: `1px solid ${C.border}`,
      }}>
        <TerminalLine prefix="$" text="bryllen features" />
        <div style={{ marginTop: 20, marginLeft: 24 }}>
          {commands.map((c, i) => (
            <div key={c.cmd} style={{ display: 'flex', alignItems: 'baseline', padding: '10px 0' }}>
              <span style={{ fontFamily: mono, fontSize: 14, color: C.accentDim, width: 24, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: mono, fontSize: 14, color: C.accent, width: 120, flexShrink: 0, fontWeight: 500 }}>
                {c.cmd}
              </span>
              <span style={{ fontFamily: font, fontSize: 14, color: C.textSec }}>
                {c.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature blocks */}
      {[
        { title: 'canvas', desc: 'An infinite, zoomable surface where every generation lives as a frame. No tabs, no chat history — everything visible at once. The comparison surface that transforms design.' },
        { title: 'directions', desc: 'One prompt generates five complete layouts. Not variations — directions. Each one is a different structural approach. Compare side by side, pick what works.' },
        { title: 'annotate', desc: 'Click anywhere on any frame. Describe the change. Watch the code update live. No separate feedback tool, no export-annotate-reimport.' },
        { title: 'history', desc: 'Every iteration frozen and preserved. Go back to yesterday\'s direction. Branch from any point. Nothing is ever overwritten or lost.' },
        { title: 'ship', desc: 'Every frame is working React. Not a mockup. Ship what you designed. The canvas produces the artifact, not a picture of one.' },
      ].map((f) => (
        <section key={f.title} style={{
          padding: '40px 64px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
          borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{ display: 'flex', gap: 32 }}>
            <span style={{
              fontFamily: mono, fontSize: 13, color: C.accent, width: 100, flexShrink: 0,
            }}>--{f.title}</span>
            <p style={{
              fontFamily: font, fontSize: 15, color: C.textSec,
              margin: 0, lineHeight: 1.65, maxWidth: 560,
            }}>{f.desc}</p>
          </div>
        </section>
      ))}

      {/* Secondary Screenshot */}
      <section style={{
        padding: '48px 64px 80px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
      }}>
        <div {...h2B} style={{
          borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}`,
          background: C.bgSec,
          transform: h2 ? 'translateY(-3px)' : 'translateY(0)',
          transition: `transform 0.3s ${spring}`,
        }}>
          <div style={{
            padding: '8px 12px', borderBottom: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.65 0.2 25)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.75 0.18 90)' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'oklch(0.65 0.18 145)' }} />
            <span style={{ marginLeft: 8, fontSize: 11, color: C.textTer }}>bryllen — directions</span>
          </div>
          <img src={canvasDirections} alt="Design directions" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 64px', maxWidth: 1200, margin: '0 auto',
        width: '100%', boxSizing: 'border-box', borderTop: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: C.textTer, fontSize: 12 }}>▸</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.textTer }}>bryllen</span>
        </div>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textTer }}>EOF</span>
      </footer>
    </div>
  )
}
