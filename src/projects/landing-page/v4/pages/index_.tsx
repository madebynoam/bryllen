import { useState } from 'react'
import { LP } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Index — Left-aligned, numbered, editorial ────────────────────────────
// Asymmetric 60/40 hero. Features as numbered list. Rams structure applied
// to an editorial layout. Text left, image right. Confident asymmetry
// that serves hierarchy.
const I = {
  bg: 'oklch(0.985 0 90)',
  surface: 'oklch(0.993 0.003 80)',
  text: 'oklch(0.180 0.005 80)',
  textSec: 'oklch(0.380 0.005 80)',
  textTer: 'oklch(0.540 0.005 80)',
  border: 'oklch(0.895 0.005 80)',
  borderSoft: 'oklch(0.925 0.003 80)',
  accent: 'oklch(0.300 0.005 80)',
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

function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{ fontFamily: font, fontSize: 16, fontWeight: 500, color: I.text }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: hl === link ? I.text : I.textTer,
              transition: `color 0.15s ${springCSS}`, cursor: 'default',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — 60/40 split ──────────────────────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [sh, shB] = useHover()
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '96px 48px 120px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
      alignItems: 'center',
    }}>
      <div>
        <h1 style={{
          fontFamily: font, fontSize: 48, fontWeight: 500,
          color: I.text, lineHeight: 1.12, letterSpacing: '-0.03em',
          margin: 0, textWrap: 'pretty',
        }}>
          Stop handing off. Start shipping.
        </h1>
        <p style={{
          fontFamily: font, fontSize: 17, fontWeight: 400,
          color: I.textSec, marginTop: 24, marginBottom: 40,
          lineHeight: 1.6, textWrap: 'pretty',
        }}>
          You stay in design mode. The AI writes the React.
          Every pixel you approve is production-ready code.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button {...bhB} {...baB} style={{
            border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
            fontSize: 15, borderRadius: 8, padding: '12px 28px',
            background: I.accent, color: I.bg,
            transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
            transition: `transform 0.15s ${springCSS}`,
          }}>Start designing</button>
          <span style={{
            fontFamily: font, fontSize: 15, fontWeight: 400, color: I.textTer,
            padding: '12px 16px', cursor: 'default',
          }}>View source</span>
        </div>
      </div>
      <div {...shB} style={{
        borderRadius: 12, overflow: 'hidden',
        boxShadow: sh ? I.shadow3 : I.shadow2,
        transform: sh ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Features — numbered index ───────────────────────────────────────────
const features = [
  { title: 'See your design running', desc: 'Every component is real, interactive React. What you see is not a picture of your design. It is your design.' },
  { title: 'Refine by pointing', desc: 'Click anywhere and describe the change. No tickets, no standups. Point, describe, see the result.' },
  { title: 'Keep everything, lose nothing', desc: 'Every version preserved. Compare directions side by side. Branch without fear. Your creative history is never overwritten.' },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px',
    }}>
      {features.map((f, i) => {
        const hovered = hi === i
        return (
          <div key={f.title}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{
              display: 'grid', gridTemplateColumns: '48px 200px 1fr',
              gap: 24, alignItems: 'baseline',
              padding: '28px 0',
              borderTop: `1px solid ${I.borderSoft}`,
              cursor: 'default',
            }}>
            <span style={{
              fontFamily: mono, fontSize: 12, fontWeight: 400,
              color: hovered ? I.text : I.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{String(i + 1).padStart(2, '0')}</span>
            <h3 style={{
              fontFamily: font, fontSize: 16, fontWeight: 500,
              color: I.text, margin: 0, textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: hovered ? I.textSec : I.textTer,
              margin: 0, lineHeight: 1.6, textWrap: 'pretty',
              transition: `color 0.15s ${springCSS}`,
            }}>{f.desc}</p>
          </div>
        )
      })}
      <div style={{ borderTop: `1px solid ${I.borderSoft}` }} />
    </section>
  )
}

// ── Secondary screenshots ───────────────────────────────────────────────
function SecondaryShots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 12, overflow: 'hidden',
    boxShadow: hovered ? I.shadow2 : I.shadow1,
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
  })
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px' }}>
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
      maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '0 48px 120px',
    }}>
      <h2 style={{
        fontFamily: font, fontSize: 40, fontWeight: 500,
        color: I.text, letterSpacing: '-0.02em',
        margin: '0 0 12px', textWrap: 'pretty',
      }}>Design it. Ship it.</h2>
      <p style={{
        fontFamily: font, fontSize: 16, fontWeight: 400,
        color: I.textTer, margin: '0 0 32px', textWrap: 'pretty',
      }}>No steps in between.</p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
        fontSize: 16, borderRadius: 8, padding: '12px 32px',
        background: I.accent, color: I.bg,
        transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? I.shadow2 : 'none',
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
      borderTop: `1px solid ${I.borderSoft}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: I.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? I.text : I.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Index() {
  return (
    <div style={{
      background: I.bg, minHeight: '100%', overflow: 'auto',
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
