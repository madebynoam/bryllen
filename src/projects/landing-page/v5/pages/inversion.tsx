import { useState } from 'react'
import productDirections from '../../screenshots/product-directions.png'

// ── Inversion — Dark variant, ET 66 calculator ──────────────────────────
// Deep charcoal background. Light text. The screenshot glows against dark.
// Like the Braun ET 66: dark body, pale keys, quiet authority.
const V = {
  bg: 'oklch(0.130 0.005 80)',
  surface: 'oklch(0.170 0.005 80)',
  text: 'oklch(0.930 0.003 80)',
  textSec: 'oklch(0.650 0.005 80)',
  textTer: 'oklch(0.480 0.005 80)',
  border: 'oklch(0.220 0.005 80)',
  borderSoft: 'oklch(0.190 0.005 80)',
  accent: 'oklch(0.880 0.003 80)',
  accentBg: 'oklch(0.930 0.003 80)',
  onAccent: 'oklch(0.130 0.005 80)',
  shadow1: '0 1px 2px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.1)',
  shadow2: '0 4px 16px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)',
  shadow3: '0 12px 48px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)',
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
        color: V.text,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hl === link ? V.text : V.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero text — small, left-aligned, above the screenshot ───────────────
function HeroText() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '80px 48px 32px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 520 }}>
        <h1 style={{
          fontFamily: font, fontSize: 28, fontWeight: 500,
          color: V.text, lineHeight: 1.25, letterSpacing: '-0.02em',
          margin: 0, textWrap: 'pretty',
        }}>
          Compare. React. Ship.
        </h1>
        <p style={{
          fontFamily: font, fontSize: 15, fontWeight: 400,
          color: V.textSec, marginTop: 12, marginBottom: 32,
          lineHeight: 1.6, textWrap: 'pretty',
        }}>
          Anyone can describe a UI to Claude Code. Canvai shows you five directions at once on an infinite canvas.
        </p>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '12px 24px',
          background: V.accentBg, color: V.onAccent,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: bh ? V.shadow2 : 'none',
        }}>Start designing</button>
      </div>
    </section>
  )
}

// ── Product screenshot — full width, glowing against dark ───────────────
function Product() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px',
      boxSizing: 'border-box',
    }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${V.border}`,
        boxShadow: h ? V.shadow3 : V.shadow2,
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

// ── Features — 3-column grid, text only, no cards ───────────────────────
const features = [
  { idx: '01', title: 'See many directions at once', desc: 'Five layouts on one canvas. Compare without switching tabs or scrolling through chat history.' },
  { idx: '02', title: 'Point and refine', desc: 'Click anywhere on the canvas and describe the change. The code updates while you watch.' },
  { idx: '03', title: 'Every version preserved', desc: 'Nothing is overwritten. Go back to yesterday. Branch a direction. Your creative history stays intact.' },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48,
        borderTop: `1px solid ${V.borderSoft}`,
        paddingTop: 48,
      }}>
        {features.map((f, i) => (
          <div key={f.title}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{ cursor: 'default' }}>
            <span style={{
              fontFamily: mono, fontSize: 11, fontWeight: 400,
              color: hi === i ? V.textSec : V.textTer,
              display: 'block', marginBottom: 16,
              transition: `color 0.15s ${springCSS}`,
            }}>{f.idx}</span>
            <h3 style={{
              fontFamily: font, fontSize: 15, fontWeight: 500,
              color: V.text, margin: '0 0 8px', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hi === i ? V.textSec : V.textTer, margin: 0,
              lineHeight: 1.6, textWrap: 'pretty',
              transition: `color 0.15s ${springCSS}`,
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
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${V.borderSoft}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: V.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? V.text : V.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Inversion() {
  return (
    <div style={{
      background: V.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <HeroText />
      <Product />
      <Features />
      <Footer />
    </div>
  )
}
