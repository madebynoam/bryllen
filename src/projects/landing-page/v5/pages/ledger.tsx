import { useState } from 'react'
import productDirections from '../../screenshots/product-directions.png'
import productComponents from '../../screenshots/product-components.png'

// ── Ledger — Systematic, numbered, asymmetric ───────────────────────────
// Like a Braun product catalog: monospace indices, 40/60 split,
// text flush-left, product flush-right. Systematic precision.
const L = {
  bg: 'oklch(0.985 0 90)',
  text: 'oklch(0.180 0.005 80)',
  textSec: 'oklch(0.380 0.005 80)',
  textTer: 'oklch(0.540 0.005 80)',
  border: 'oklch(0.895 0.005 80)',
  borderSoft: 'oklch(0.925 0.003 80)',
  accent: 'oklch(0.300 0.005 80)',
  onDark: 'oklch(0.97 0.003 80)',
  shadow1: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
  shadow2: '0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
  shadow3: '0 12px 48px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
}

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const mono = '"SF Mono", "Fira Code", Menlo, monospace'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: font, fontSize: 16, fontWeight: 500,
        color: L.text,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hl === link ? L.text : L.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — 40/60 asymmetric split ───────────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [sh, shB] = useHover()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '80px 48px 120px',
      display: 'grid', gridTemplateColumns: '2fr 3fr', gap: 64,
      alignItems: 'start', boxSizing: 'border-box',
    }}>
      {/* Left 40% — all text */}
      <div style={{ paddingTop: 32 }}>
        <h1 style={{
          fontFamily: font, fontSize: 28, fontWeight: 500,
          color: L.text, lineHeight: 1.25, letterSpacing: '-0.02em',
          margin: 0, textWrap: 'pretty',
        }}>
          Five directions. One canvas.
        </h1>
        <p style={{
          fontFamily: font, fontSize: 15, fontWeight: 400,
          color: L.textSec, marginTop: 16, marginBottom: 0,
          lineHeight: 1.6, textWrap: 'pretty',
        }}>
          React, annotate, iterate. What ships is what you see.
        </p>

        {/* Numbered features */}
        <div style={{ marginTop: 48 }}>
          {[
            { title: 'See many directions at once', desc: 'Five layouts on one canvas instead of one at a time in a chat thread.' },
            { title: 'Point and refine', desc: 'Click anywhere on the canvas. Describe the change. Watch the code update.' },
            { title: 'Every version preserved', desc: 'Nothing is overwritten. Compare directions. Branch without fear.' },
          ].map((f, i) => (
            <div key={f.title} style={{
              display: 'grid', gridTemplateColumns: '28px 1fr', gap: 12,
              alignItems: 'baseline',
              paddingTop: 20, paddingBottom: 20,
              borderTop: i === 0 ? `1px solid ${L.borderSoft}` : 'none',
              borderBottom: `1px solid ${L.borderSoft}`,
            }}>
              <span style={{
                fontFamily: mono, fontSize: 11, fontWeight: 400,
                color: L.textTer, lineHeight: 1,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{
                  fontFamily: font, fontSize: 14, fontWeight: 500,
                  color: L.text, margin: '0 0 4px', textWrap: 'pretty',
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: font, fontSize: 13, fontWeight: 400,
                  color: L.textTer, margin: 0, lineHeight: 1.55, textWrap: 'pretty',
                }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '12px 24px',
          background: L.accent, color: L.onDark, marginTop: 32,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: bh ? L.shadow2 : 'none',
        }}>Start designing</button>
      </div>

      {/* Right 60% — screenshot */}
      <div {...shB} style={{
        borderRadius: 8, overflow: 'hidden',
        boxShadow: sh ? L.shadow3 : L.shadow2,
        transform: sh ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={productDirections} alt="Four dashboard design directions on the Canvai canvas" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Secondary screenshot — full width ───────────────────────────────────
function SecondaryShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24,
      }}>
        <span style={{
          fontFamily: mono, fontSize: 11, fontWeight: 400, color: L.textTer,
        }}>04</span>
        <span style={{
          fontFamily: font, fontSize: 14, fontWeight: 500, color: L.text, textWrap: 'pretty',
        }}>All your originals, side by side</span>
      </div>
      <div {...hB} style={{
        borderRadius: 8, overflow: 'hidden',
        boxShadow: h ? L.shadow3 : L.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={productComponents} alt="Component library on the Canvai canvas" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${L.border}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: L.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? L.text : L.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Ledger() {
  return (
    <div style={{
      background: L.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <SecondaryShot />
      <Footer />
    </div>
  )
}
