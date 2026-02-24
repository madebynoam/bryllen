import { useState } from 'react'
import { LP } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Object — The product IS the hero ─────────────────────────────────────
// Screenshot dominates. Minimal text above. The product speaks for itself.
// Rams' T3 radio didn't need a headline. It was just... there.
const O = {
  bg: 'oklch(0.975 0.001 197)',
  surface: 'oklch(0.990 0.003 80)',
  text: 'oklch(0.180 0.005 80)',
  textSec: 'oklch(0.400 0.005 80)',
  textTer: 'oklch(0.560 0.005 80)',
  border: 'oklch(0.895 0.005 80)',
  accent: 'oklch(0.300 0.005 80)',
  shadow1: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
  shadow2: '0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
  shadow3: '0 16px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.05)',
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

function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{ fontFamily: font, fontSize: 16, fontWeight: 500, color: O.text }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: hl === link ? O.text : O.textTer,
              transition: `color 0.15s ${springCSS}`, cursor: 'default',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — product-first, text minimal ──────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '64px 48px 0',
    }}>
      {/* Compact text above the product */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 32,
      }}>
        <div>
          <h1 style={{
            fontFamily: font, fontSize: 28, fontWeight: 500,
            color: O.text, lineHeight: 1.2, letterSpacing: '-0.02em',
            margin: 0, textWrap: 'pretty',
          }}>Ship what you designed, not a spec of it.</h1>
          <p style={{
            fontFamily: font, fontSize: 16, fontWeight: 400,
            color: O.textSec, marginTop: 8, margin: '8px 0 0',
            lineHeight: 1.5, textWrap: 'pretty', maxWidth: 480,
          }}>
            A canvas where your designs are already running React.
          </p>
        </div>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 15, borderRadius: 8, padding: '12px 28px',
          background: O.accent, color: O.bg,
          transform: ba ? 'scale(0.97)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}`,
          flexShrink: 0,
        }}>Start designing</button>
      </div>

      {/* The product — takes up the full width */}
      <div style={{
        borderRadius: 12, overflow: 'hidden',
        boxShadow: O.shadow3,
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Three feature cards below the product ───────────────────────────────
const features = [
  { title: 'See your design running', desc: 'Every component is real, interactive React. Type in an input. Click a button. This is your design, not a picture of it.' },
  { title: 'Refine by pointing', desc: 'Click anywhere and say what should change. The AI updates the code while you watch. No tickets, no standups.' },
  { title: 'Keep everything, lose nothing', desc: 'Every version is preserved. Go back to yesterday. Compare directions. Branch without fear.' },
]

function Features() {
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '96px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {features.map(f => (
          <div key={f.title}>
            <h3 style={{
              fontFamily: font, fontSize: 16, fontWeight: 500,
              color: O.text, margin: '0 0 12px', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: O.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Two secondary screenshots ───────────────────────────────────────────
function SecondaryShots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 12, overflow: 'hidden',
    boxShadow: hovered ? O.shadow2 : O.shadow1,
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
  })
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 96px' }}>
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

// ── Bottom CTA — barely there ───────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 48px 96px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: `1px solid ${O.border}`, paddingTop: 48,
    }}>
      <div>
        <h2 style={{
          fontFamily: font, fontSize: 24, fontWeight: 500,
          color: O.text, margin: '0 0 8px', textWrap: 'pretty',
        }}>Your next design could ship today.</h2>
        <p style={{
          fontFamily: font, fontSize: 14, fontWeight: 400,
          color: O.textTer, margin: 0, textWrap: 'pretty',
        }}>Free and open source. A Claude Code plugin.</p>
      </div>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
        fontSize: 15, borderRadius: 8, padding: '12px 28px',
        background: O.accent, color: O.bg,
        transform: ba ? 'scale(0.97)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}`,
        flexShrink: 0,
      }}>Start designing</button>
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
    }}>
      <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: O.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? O.text : O.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Object_() {
  return (
    <div style={{
      background: O.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <Features />
      <SecondaryShots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
