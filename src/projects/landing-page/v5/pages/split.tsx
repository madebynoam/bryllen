import { useState } from 'react'
import productDirections from '../../screenshots/product-directions.png'
import productComponents from '../../screenshots/product-components.png'

// ── Split — Strict 40/60 asymmetric, text pinned left ───────────────────
// The page IS the split. Left column is text, right column is product.
// Like a Braun catalog spread: one page text, one page product photography.
const S = {
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
      padding: '16px 48px', maxWidth: 1440, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: font, fontSize: 16, fontWeight: 500,
        color: S.text,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hl === link ? S.text : S.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — strict 2fr / 3fr split ───────────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '2fr 3fr',
      minHeight: 600, maxWidth: 1440, margin: '0 auto',
    }}>
      {/* Left — text pinned */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 48px 80px 48px',
      }}>
        <span style={{
          fontFamily: font, fontSize: 16, fontWeight: 500,
          color: S.text, marginBottom: 64,
        }}>canvai</span>
        <h1 style={{
          fontFamily: font, fontSize: 32, fontWeight: 500,
          color: S.text, lineHeight: 1.2, letterSpacing: '-0.02em',
          margin: 0, textWrap: 'pretty',
        }}>
          The canvas replaces the meeting.
        </h1>
        <p style={{
          fontFamily: font, fontSize: 15, fontWeight: 400,
          color: S.textSec, marginTop: 16, marginBottom: 40,
          lineHeight: 1.6, textWrap: 'pretty', maxWidth: 360,
        }}>
          Describe what you want. See five directions at once. React, annotate, iterate. What ships is what you see.
        </p>
        <div>
          <button {...bhB} {...baB} style={{
            border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
            fontSize: 14, borderRadius: 8, padding: '12px 24px',
            background: S.accent, color: S.onDark,
            transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
            transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
            boxShadow: bh ? S.shadow2 : 'none',
          }}>Start designing</button>
        </div>
      </div>

      {/* Right — screenshot filling entire column */}
      <div style={{
        overflow: 'hidden',
        borderRadius: '12px 0 0 12px',
        boxShadow: S.shadow3,
      }}>
        <img src={productDirections} alt="Four dashboard design directions on the Canvai canvas" style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Features below the fold — simple left-aligned text ──────────────────
const features = [
  { title: 'See many directions at once', desc: 'Five layouts on one canvas instead of one at a time in a chat thread.' },
  { title: 'Point and refine', desc: 'Click anywhere on the canvas. Describe the change. Watch the code update.' },
  { title: 'Every version preserved', desc: 'Nothing is overwritten. Compare directions. Branch without fear.' },
]

function Features() {
  return (
    <section style={{
      maxWidth: 1440, margin: '0 auto', padding: '96px 48px 120px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 520 }}>
        {features.map((f, i) => (
          <div key={f.title} style={{
            paddingTop: 24, paddingBottom: 24,
            borderTop: `1px solid ${S.borderSoft}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <span style={{
                fontFamily: mono, fontSize: 11, fontWeight: 400,
                color: S.textTer, flexShrink: 0,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{
                  fontFamily: font, fontSize: 14, fontWeight: 500,
                  color: S.text, margin: '0 0 4px', textWrap: 'pretty',
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: font, fontSize: 13, fontWeight: 400,
                  color: S.textSec, margin: 0, lineHeight: 1.55, textWrap: 'pretty',
                }}>{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${S.borderSoft}` }} />
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
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        boxShadow: h ? S.shadow3 : S.shadow2,
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
      padding: '20px 48px', maxWidth: 1440, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${S.border}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: S.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? S.text : S.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Split() {
  return (
    <div style={{
      background: S.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <Features />
      <SecondaryShot />
      <Footer />
    </div>
  )
}
