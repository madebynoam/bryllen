import { useState } from 'react'
import { LP } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Edition — The archetypal Rams page ───────────────────────────────────
// Light, system font, centered. 5 colors. No decoration. Every element earns its place.
const E = {
  bg: 'oklch(0.985 0 90)',
  surface: 'oklch(0.993 0.003 80)',
  text: 'oklch(0.180 0.005 80)',
  textSec: 'oklch(0.380 0.005 80)',
  textTer: 'oklch(0.540 0.005 80)',
  border: 'oklch(0.895 0.005 80)',
  accent: 'oklch(0.300 0.005 80)',
  accentHover: 'oklch(0.400 0.005 80)',
  // Multi-layered shadows
  shadow1: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)',
  shadow2: '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
  shadow3: '0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
}

const font = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
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
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s16}px ${LP.s48}px`, maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: font, fontSize: 16, fontWeight: 500,
        color: E.text, letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: hl === link ? E.text : E.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '8px 20px',
          background: E.accent, color: E.bg,
          transform: ba ? 'scale(0.97)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}`,
        }}>Start designing</button>
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: `120px ${LP.s48}px 80px`,
      maxWidth: 680, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: font, fontSize: 56, fontWeight: 500,
        color: E.text, lineHeight: 1.1, letterSpacing: '-0.03em',
        margin: 0, textWrap: 'pretty',
      }}>
        Ship what you designed
      </h1>
      <p style={{
        fontFamily: font, fontSize: 20, fontWeight: 400,
        color: E.textSec, marginTop: 24, marginBottom: 40,
        lineHeight: 1.6, textWrap: 'pretty',
      }}>
        You stay in design mode. The AI writes the React.
        Every pixel you approve is production-ready code.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
        fontSize: 16, borderRadius: 8, padding: '12px 32px',
        background: E.accent, color: E.bg,
        transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? E.shadow2 : 'none',
      }}>Start designing</button>
    </section>
  )
}

// ── Screenshot ──────────────────────────────────────────────────────────
function Screenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: `0 ${LP.s48}px 120px`,
    }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        boxShadow: h ? E.shadow3 : E.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Features ────────────────────────────────────────────────────────────
const features = [
  { title: 'See your design running', desc: 'Every component is real, interactive React. Type in an input. Click a button. What you see is your design.' },
  { title: 'Refine by pointing', desc: 'Click anywhere and say what should change. The AI updates the code while you watch.' },
  { title: 'Keep everything, lose nothing', desc: 'Every version is preserved. Go back to yesterday. Compare two directions. Branch without fear.' },
]

function Features() {
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: `0 ${LP.s48}px 120px`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {features.map(f => (
          <div key={f.title}>
            <h3 style={{
              fontFamily: font, fontSize: 16, fontWeight: 500,
              color: E.text, margin: '0 0 12px', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: E.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Secondary screenshots ───────────────────────────────────────────────
function SecondaryShots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 12, overflow: 'hidden',
    boxShadow: hovered ? E.shadow2 : E.shadow1,
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
  })
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: `0 ${LP.s48}px 120px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div {...h1B} style={card(h1)}>
          <img src={pulseComponents} alt="Components" style={{ width: '100%', display: 'block' }} />
        </div>
        <div {...h2B} style={card(h2)}>
          <img src={pulseSettings} alt="Settings" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

// ── Bottom CTA ──────────────────────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 680, margin: '0 auto', textAlign: 'center',
      padding: `0 ${LP.s48}px 120px`,
    }}>
      <h2 style={{
        fontFamily: font, fontSize: 40, fontWeight: 500,
        color: E.text, letterSpacing: '-0.02em',
        margin: '0 0 12px', textWrap: 'pretty',
      }}>Your next design could ship today</h2>
      <p style={{
        fontFamily: font, fontSize: 16, fontWeight: 400,
        color: E.textTer, margin: '0 0 32px', textWrap: 'pretty',
      }}>Free and open source.</p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
        fontSize: 16, borderRadius: 8, padding: '12px 32px',
        background: E.accent, color: E.bg,
        transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? E.shadow2 : 'none',
      }}>Start designing</button>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `20px ${LP.s48}px`, maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${E.border}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: E.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? E.text : E.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Edition() {
  return (
    <div style={{
      background: E.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <Screenshot />
      <Features />
      <SecondaryShots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
