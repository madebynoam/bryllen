import { useState } from 'react'
import { LP } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Form — Rams restraint with serif warmth ──────────────────────────────
// One serif (Instrument Serif for display, system sans for body).
// Light, warm, material. Shadows define surfaces. No borders on cards.
const F = {
  bg: 'oklch(0.980 0.005 80)',
  surface: 'oklch(0.993 0.003 80)',
  text: 'oklch(0.180 0.005 80)',
  textSec: 'oklch(0.400 0.005 80)',
  textTer: 'oklch(0.560 0.005 80)',
  border: 'oklch(0.900 0.005 80)',
  accent: 'oklch(0.300 0.005 80)',
  shadow1: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
  shadow2: '0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
  shadow3: '0 12px 48px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
}

const serif = '"Instrument Serif", Georgia, "Times New Roman", serif'
const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

function FontLoader() {
  return <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap" rel="stylesheet" />
}

function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: serif, fontSize: 24, fontWeight: 400,
        color: F.text, fontStyle: 'italic',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: sans, fontSize: 14, fontWeight: 400,
              color: hl === link ? F.text : F.textTer,
              transition: `color 0.15s ${springCSS}`, cursor: 'default',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: '120px 48px 80px',
      maxWidth: 720, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: serif, fontSize: 64, fontWeight: 400,
        color: F.text, lineHeight: 1.08, letterSpacing: '-0.02em',
        margin: 0, textWrap: 'pretty', fontStyle: 'italic',
      }}>
        Describe it. See it. Ship it.
      </h1>
      <p style={{
        fontFamily: sans, fontSize: 18, fontWeight: 400,
        color: F.textSec, marginTop: 24, marginBottom: 40,
        lineHeight: 1.65, textWrap: 'pretty', maxWidth: 480,
      }}>
        Describe what you want. An AI agent builds it on a live canvas.
        Annotate to iterate. What you see is what ships.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: sans, fontWeight: 500,
        fontSize: 15, borderRadius: 8, padding: '12px 32px',
        background: F.accent, color: F.bg,
        transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? F.shadow2 : 'none',
      }}>Start designing</button>
    </section>
  )
}

function Screenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px' }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        boxShadow: h ? F.shadow3 : F.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

const features = [
  { title: 'See your design running', desc: 'Every component is real, interactive React. What you see is not a picture of your design. It is your design.' },
  { title: 'Refine by pointing', desc: 'Click anywhere and describe the change. No tickets. No standups. Just point, describe, see the result.' },
  { title: 'Keep everything, lose nothing', desc: 'Every version preserved. Compare directions side by side. Your creative history is never overwritten.' },
]

function Features() {
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {features.map(f => (
          <div key={f.title} style={{
            padding: 32, borderRadius: 12,
            boxShadow: F.shadow1, background: F.surface,
          }}>
            <h3 style={{
              fontFamily: serif, fontSize: 22, fontWeight: 400,
              color: F.text, margin: '0 0 12px', fontStyle: 'italic', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: sans, fontSize: 14, fontWeight: 400,
              color: F.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section style={{
      maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '0 48px 120px',
    }}>
      <div style={{ width: 40, height: 1, background: F.border, margin: '0 auto 40px' }} />
      <p style={{
        fontFamily: serif, fontSize: 28, fontWeight: 400, fontStyle: 'italic',
        color: F.text, lineHeight: 1.4, margin: '0 0 16px', textWrap: 'pretty',
      }}>
        "I used to hand designs to engineering and get back something 80% right.
        Now what I design is what ships. That last 20% was everything."
      </p>
      <span style={{
        fontFamily: sans, fontSize: 13, fontWeight: 400, color: F.textTer,
      }}>Product designer</span>
    </section>
  )
}

function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '0 48px 120px',
    }}>
      <h2 style={{
        fontFamily: serif, fontSize: 44, fontWeight: 400, fontStyle: 'italic',
        color: F.text, letterSpacing: '-0.01em',
        margin: '0 0 12px', textWrap: 'pretty',
      }}>What if everything you designed just worked?</h2>
      <p style={{
        fontFamily: sans, fontSize: 15, fontWeight: 400,
        color: F.textTer, margin: '0 0 32px', textWrap: 'pretty',
      }}>Free and open source.</p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: sans, fontWeight: 500,
        fontSize: 16, borderRadius: 8, padding: '12px 32px',
        background: F.accent, color: F.bg,
        transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? F.shadow2 : 'none',
      }}>Ship your first design</button>
    </section>
  )
}

function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${F.border}`,
    }}>
      <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 400, fontStyle: 'italic', color: F.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: sans, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? F.text : F.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Form() {
  return (
    <div style={{
      background: F.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: sans, WebkitFontSmoothing: 'antialiased',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <Screenshot />
      <Features />
      <Quote />
      <BottomCTA />
      <Footer />
    </div>
  )
}
