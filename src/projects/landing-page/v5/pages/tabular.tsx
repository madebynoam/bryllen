import { useState } from 'react'
import productDirections from '../../screenshots/product-directions.png'

// ── Tabular — Grid/table precision, mathematical layout ─────────────────
// Every element snaps to a strict grid. Features as a table with monospace
// indices. The discipline of a Braun spec sheet applied to a landing page.
const T = {
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
        color: T.text,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hl === link ? T.text : T.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — text top-left, screenshot right-aligned 65% ──────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [sh, shB] = useHover()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '64px 48px 96px',
      display: 'grid', gridTemplateColumns: '7fr 13fr', gap: 48,
      alignItems: 'start', boxSizing: 'border-box',
    }}>
      {/* Left — small text block */}
      <div style={{ paddingTop: 24 }}>
        <h1 style={{
          fontFamily: font, fontSize: 28, fontWeight: 500,
          color: T.text, lineHeight: 1.25, letterSpacing: '-0.02em',
          margin: 0, textWrap: 'pretty',
        }}>
          Describe once. See many.
        </h1>
        <p style={{
          fontFamily: font, fontSize: 15, fontWeight: 400,
          color: T.textSec, marginTop: 12, marginBottom: 32,
          lineHeight: 1.6, textWrap: 'pretty',
        }}>
          Anyone can describe a UI to Claude Code. Canvai shows you five directions at once on an infinite canvas.
        </p>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '12px 24px',
          background: T.accent, color: T.onDark,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: bh ? T.shadow2 : 'none',
        }}>Start designing</button>
      </div>

      {/* Right — screenshot taking 65% */}
      <div {...shB} style={{
        borderRadius: 8, overflow: 'hidden',
        boxShadow: sh ? T.shadow3 : T.shadow2,
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

// ── Features — table layout with strict grid ────────────────────────────
const features = [
  { title: 'Many at once', desc: 'Five layouts on one canvas. Compare without switching tabs or scrolling through chat history. The whole design space, visible.' },
  { title: 'Point and refine', desc: 'Click anywhere on the canvas and describe the change. The code updates while you watch. No tickets, no handoff.' },
  { title: 'Version history', desc: 'Every iteration preserved. Go back to any point. Branch a direction. Your creative history is never overwritten.' },
  { title: 'Live React', desc: 'What you see is not a picture. It is running code. Type in inputs, click buttons, resize. This is your product.' },
  { title: 'Ship what you see', desc: 'No gap between design and production. What you approve on the canvas is what deploys. The handoff is gone.' },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px',
      boxSizing: 'border-box',
    }}>
      {features.map((f, i) => {
        const hovered = hi === i
        return (
          <div key={f.title}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{
              display: 'grid', gridTemplateColumns: '48px 200px 1fr',
              gap: 24, alignItems: 'baseline',
              padding: '24px 0',
              borderTop: `1px solid ${T.borderSoft}`,
              cursor: 'default',
            }}>
            <span style={{
              fontFamily: mono, fontSize: 12, fontWeight: 400,
              color: hovered ? T.text : T.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{String(i + 1).padStart(2, '0')}</span>
            <h3 style={{
              fontFamily: font, fontSize: 14, fontWeight: 500,
              color: T.text, margin: 0, textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              color: hovered ? T.textSec : T.textTer,
              margin: 0, lineHeight: 1.55, textWrap: 'pretty',
              transition: `color 0.15s ${springCSS}`,
            }}>{f.desc}</p>
          </div>
        )
      })}
      <div style={{ borderTop: `1px solid ${T.borderSoft}` }} />
    </section>
  )
}

// ── Bottom CTA — minimal, left-aligned ──────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px',
      display: 'grid', gridTemplateColumns: '48px 1fr', gap: 24,
      alignItems: 'baseline', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: mono, fontSize: 12, fontWeight: 400,
        color: T.textTer,
      }}></span>
      <div>
        <h2 style={{
          fontFamily: font, fontSize: 20, fontWeight: 500,
          color: T.text, margin: '0 0 8px', textWrap: 'pretty',
          letterSpacing: '-0.01em',
        }}>Your next design could ship today.</h2>
        <p style={{
          fontFamily: font, fontSize: 14, fontWeight: 400,
          color: T.textTer, margin: '0 0 24px', textWrap: 'pretty',
        }}>Free and open source. A Claude Code plugin.</p>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '12px 24px',
          background: T.accent, color: T.onDark,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: bh ? T.shadow2 : 'none',
        }}>Start designing</button>
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
      borderTop: `1px solid ${T.border}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: T.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? T.text : T.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Tabular() {
  return (
    <div style={{
      background: T.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <Features />
      <BottomCTA />
      <Footer />
    </div>
  )
}
