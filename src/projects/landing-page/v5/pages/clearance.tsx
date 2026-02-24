import { useState } from 'react'
import productDirections from '../../screenshots/product-directions.png'

// ── Clearance — Maximum white space, tiny text, huge product ─────────────
// Like a Braun catalog page: the product dominates, text is secondary.
// 50%+ white space. Confidence, not anxiety.
const C = {
  bg: 'oklch(0.985 0 90)',
  text: 'oklch(0.180 0.005 80)',
  textSec: 'oklch(0.380 0.005 80)',
  textTer: 'oklch(0.540 0.005 80)',
  border: 'oklch(0.895 0.005 80)',
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
      padding: '16px 64px', maxWidth: 1440, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: font, fontSize: 16, fontWeight: 500,
        color: C.text, letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — narrow left column, vast white space ─────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      padding: '120px 64px 80px',
      maxWidth: 1440, margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 480 }}>
        <h1 style={{
          fontFamily: font, fontSize: 32, fontWeight: 500,
          color: C.text, lineHeight: 1.2, letterSpacing: '-0.02em',
          margin: 0, textWrap: 'pretty',
        }}>
          Describe once. See many.
        </h1>
        <p style={{
          fontFamily: font, fontSize: 16, fontWeight: 400,
          color: C.textSec, marginTop: 16, marginBottom: 40,
          lineHeight: 1.6, textWrap: 'pretty',
        }}>
          Anyone can describe a UI to Claude Code. Canvai shows you five directions at once on an infinite canvas.
        </p>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 15, borderRadius: 8, padding: '12px 28px',
          background: C.accent, color: C.onDark,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: bh ? C.shadow2 : 'none',
        }}>Start designing</button>
      </div>
    </section>
  )
}

// ── Product screenshot — full width, dominating ─────────────────────────
function Product() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1440, margin: '0 auto', padding: '0 64px 120px',
      boxSizing: 'border-box',
    }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        boxShadow: h ? C.shadow3 : C.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={productDirections} alt="Four dashboard design directions on the Canvai canvas" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Features — simple left-aligned text, no cards, no icons ─────────────
const features = [
  { title: 'See many directions at once', desc: 'Five layouts on one canvas. Compare without switching tabs or scrolling through chat history.' },
  { title: 'Point and refine', desc: 'Click anywhere on the canvas and describe the change. The code updates while you watch.' },
  { title: 'Every version preserved', desc: 'Nothing is overwritten. Go back to yesterday. Branch a direction. Your creative history stays intact.' },
]

function Features() {
  return (
    <section style={{
      maxWidth: 1440, margin: '0 auto', padding: '0 64px 120px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 480 }}>
        {features.map((f, i) => (
          <div key={f.title} style={{ marginBottom: i < features.length - 1 ? 40 : 0 }}>
            <h3 style={{
              fontFamily: font, fontSize: 15, fontWeight: 500,
              color: C.text, margin: '0 0 8px', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: C.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
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
      padding: '20px 64px', maxWidth: 1440, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${C.border}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: C.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Clearance() {
  return (
    <div style={{
      background: C.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <Product />
      <Features />
      <Footer />
    </div>
  )
}
