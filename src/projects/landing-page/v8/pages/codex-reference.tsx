import { useState } from 'react'
import canvasRams from '../../screenshots/canvas-rams-grid.png'
import canvasOriginals from '../../screenshots/canvas-originals.png'

// ── Codex Reference — Refined Swiss Book ────────────────────────────────────
// Table of contents metaphor with better screenshots showing real canvas work.
// Warm cream, dot leaders, numbered chapters. Müller-Brockmann meets Dieter Rams.

const C = {
  bg: 'oklch(0.985 0.008 85)',
  text: 'oklch(0.150 0.010 80)',
  textSec: 'oklch(0.400 0.008 80)',
  textTer: 'oklch(0.580 0.006 80)',
  border: 'oklch(0.900 0.010 85)',
  accent: 'oklch(0.280 0.010 80)',
  onDark: 'oklch(0.965 0.005 85)',
}

const font = '"Söhne", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const mono = '"SF Mono", "Fira Code", Menlo, monospace'
const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

function DotLeader() {
  return (
    <span style={{
      flex: 1, borderBottom: `1px dotted ${C.border}`,
      margin: '0 16px', alignSelf: 'baseline',
      position: 'relative', top: -5,
    }} />
  )
}

export function CodexReference() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()

  const chapters = [
    { num: '01', title: 'The Infinite Canvas', desc: 'Every design visible at once' },
    { num: '02', title: 'Multiple Directions', desc: 'Generate 5+ layouts from one prompt' },
    { num: '03', title: 'Direct Annotation', desc: 'Click, describe, apply' },
    { num: '04', title: 'Version History', desc: 'Freeze iterations, branch freely' },
    { num: '05', title: 'Production Code', desc: 'Ship working React, not mockups' },
  ]

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflow: 'auto', fontFamily: font, WebkitFontSmoothing: 'antialiased' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 80px', maxWidth: 1120, margin: '0 auto',
        width: '100%', boxSizing: 'border-box',
      }}>
        <span style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: C.text, letterSpacing: '-0.01em' }}>bryllen</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textTer, letterSpacing: '0.02em' }}>design canvas</span>
      </nav>

      {/* Title */}
      <section style={{
        padding: '100px 80px 80px', maxWidth: 1120, margin: '0 auto', boxSizing: 'border-box',
        borderTop: `1px solid ${C.border}`,
      }}>
        <p style={{
          fontFamily: mono, fontSize: 11, color: C.textTer,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          margin: '0 0 20px',
        }}>Reference Manual</p>
        <h1 style={{
          fontFamily: font, fontSize: 52, fontWeight: 500, color: C.text,
          lineHeight: 1.08, letterSpacing: '-0.035em', margin: 0, textWrap: 'balance',
        }}>
          See every direction<br />at once
        </h1>
        <p style={{
          fontFamily: font, fontSize: 18, fontWeight: 400, color: C.textSec,
          marginTop: 28, marginBottom: 44, lineHeight: 1.6, textWrap: 'pretty', maxWidth: 500,
        }}>
          An infinite canvas where Claude Code generates real React components. Describe what you need. Compare side by side. Ship the best one.
        </p>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 6, padding: '14px 32px',
          background: C.accent, color: C.onDark,
          transform: ba ? 'scale(0.94)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${spring}`,
        }}>Start designing</button>
      </section>

      {/* Hero Screenshot */}
      <section style={{
        padding: '0 80px 80px', maxWidth: 1120, margin: '0 auto', boxSizing: 'border-box',
      }}>
        <div {...h1B} style={{
          borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`,
          boxShadow: '0 4px 24px oklch(0.2 0.01 80 / 0.08)',
          transform: h1 ? 'translateY(-3px)' : 'translateY(0)',
          transition: `transform 0.35s ${spring}, box-shadow 0.35s ease`,
        }}>
          <img src={canvasRams} alt="Bryllen canvas with multiple design directions" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* Table of Contents */}
      <section style={{
        padding: '60px 80px 80px', maxWidth: 1120, margin: '0 auto', boxSizing: 'border-box',
        borderTop: `1px solid ${C.border}`,
      }}>
        <p style={{
          fontFamily: mono, fontSize: 11, color: C.textTer,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
          margin: '0 0 32px',
        }}>Contents</p>
        {chapters.map((ch) => (
          <div key={ch.num} style={{
            display: 'flex', alignItems: 'baseline',
            padding: '16px 0',
          }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.textTer, width: 40, flexShrink: 0 }}>{ch.num}</span>
            <span style={{ fontFamily: font, fontSize: 17, fontWeight: 500, color: C.text, flexShrink: 0 }}>{ch.title}</span>
            <DotLeader />
            <span style={{ fontFamily: font, fontSize: 14, color: C.textSec, flexShrink: 0 }}>{ch.desc}</span>
          </div>
        ))}
      </section>

      {/* Chapter sections */}
      {[
        { num: '01', title: 'The Infinite Canvas', body: 'An infinite, zoomable surface where every generation lives as a frame. No tabs, no chat history. Everything visible at once — the comparison surface that transforms how you design.' },
        { num: '02', title: 'Multiple Directions', body: 'One prompt generates five complete layouts. Not variations — directions. Each one is a different structural approach to your description. Compare them side by side and pick what works.' },
        { num: '03', title: 'Direct Annotation', body: 'Click anywhere on any frame. Describe what you want changed. The code updates while you watch. No separate feedback tool, no export-annotate-reimport cycle.' },
        { num: '04', title: 'Version History', body: 'Every iteration is frozen and preserved. Go back to yesterday\'s direction. Branch from any point. Your creative history stays intact — nothing is ever overwritten.' },
        { num: '05', title: 'Production Code', body: 'Every frame is working React. Not a mockup, not a screenshot. Ship what you designed. The canvas produces the artifact, not a picture of one.' },
      ].map((ch) => (
        <section key={ch.num} style={{
          padding: '48px 80px', maxWidth: 1120, margin: '0 auto', boxSizing: 'border-box',
          borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{ display: 'flex', gap: 48 }}>
            <span style={{
              fontFamily: mono, fontSize: 13, color: C.textTer, flexShrink: 0, width: 40,
            }}>{ch.num}</span>
            <div>
              <h3 style={{
                fontFamily: font, fontSize: 20, fontWeight: 500, color: C.text,
                margin: '0 0 14px', textWrap: 'pretty',
              }}>{ch.title}</h3>
              <p style={{
                fontFamily: font, fontSize: 16, fontWeight: 400, color: C.textSec,
                margin: 0, lineHeight: 1.65, textWrap: 'pretty', maxWidth: 540,
              }}>{ch.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Secondary Screenshot */}
      <section style={{
        padding: '48px 80px 100px', maxWidth: 1120, margin: '0 auto', boxSizing: 'border-box',
      }}>
        <div {...h2B} style={{
          borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}`,
          boxShadow: '0 4px 24px oklch(0.2 0.01 80 / 0.08)',
          transform: h2 ? 'translateY(-3px)' : 'translateY(0)',
          transition: `transform 0.35s ${spring}, box-shadow 0.35s ease`,
        }}>
          <img src={canvasOriginals} alt="Multiple landing page designs" style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 80px', maxWidth: 1120, margin: '0 auto',
        width: '100%', boxSizing: 'border-box', borderTop: `1px solid ${C.border}`,
      }}>
        <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: C.textTer }}>bryllen</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: C.textTer }}>End of reference</span>
      </footer>
    </div>
  )
}
