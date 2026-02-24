import { useState } from 'react'
import { LP } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Signal — Dark Rams ───────────────────────────────────────────────────
// Near-black bg, warm off-white text. Same restraint, inverted.
// Quiet confidence. The dark variant of Edition.
const S = {
  bg: 'oklch(0.130 0.005 80)',
  surface: 'oklch(0.170 0.005 80)',
  text: 'oklch(0.930 0.003 80)',
  textSec: 'oklch(0.580 0.005 80)',
  textTer: 'oklch(0.420 0.005 80)',
  border: 'oklch(0.220 0.005 80)',
  accent: 'oklch(0.930 0.003 80)',
  accentHover: 'oklch(0.850 0.003 80)',
  shadow1: '0 1px 2px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)',
  shadow2: '0 4px 16px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)',
  shadow3: '0 12px 48px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)',
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
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s16}px ${LP.s48}px`, maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{ fontFamily: font, fontSize: 16, fontWeight: 500, color: S.text }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: hl === link ? S.text : S.textTer,
              transition: `color 0.15s ${springCSS}`, cursor: 'default',
            }}>{link}</span>
        ))}
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '8px 20px',
          background: S.accent, color: S.bg,
          transform: ba ? 'scale(0.97)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}`,
        }}>Start designing</button>
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
      maxWidth: 680, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: font, fontSize: 56, fontWeight: 500,
        color: S.text, lineHeight: 1.1, letterSpacing: '-0.03em',
        margin: 0, textWrap: 'pretty',
      }}>Your design is already live</h1>
      <p style={{
        fontFamily: font, fontSize: 20, fontWeight: 400,
        color: S.textSec, marginTop: 24, marginBottom: 40,
        lineHeight: 1.6, textWrap: 'pretty',
      }}>
        A canvas where your designs are already running React.
        Click anywhere to refine. Deploy when ready.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 16, borderRadius: 8, padding: '12px 32px',
          background: S.accent, color: S.bg,
          transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}`,
        }}>See it live</button>
        <GhostButton label="View source" />
      </div>
    </section>
  )
}

function GhostButton({ label }: { label: string }) {
  const [h, hB] = useHover()
  return (
    <span {...hB} style={{
      fontFamily: font, fontSize: 16, fontWeight: 400,
      color: h ? S.text : S.textTer, cursor: 'default',
      padding: '12px 20px',
      transition: `color 0.15s ${springCSS}`,
    }}>{label}</span>
  )
}

function Screenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px' }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${S.border}`,
        boxShadow: h ? S.shadow3 : S.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

const features = [
  { title: 'See your design running', desc: 'Every component is real React. Type in an input. Resize a panel. This is not a picture of your design.' },
  { title: 'Refine by pointing', desc: 'Click anywhere and describe the change. No tickets. No standups. Point, describe, see the result.' },
  { title: 'Keep everything, lose nothing', desc: 'Every version preserved. Go back to Tuesday. Compare two directions side by side. Branch without fear.' },
]

function Features() {
  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px 120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {features.map(f => (
          <div key={f.title}>
            <h3 style={{
              fontFamily: font, fontSize: 16, fontWeight: 500,
              color: S.text, margin: '0 0 12px', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: font, fontSize: 14, fontWeight: 400,
              color: S.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SecondaryShots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 12, overflow: 'hidden',
    border: `1px solid ${S.border}`,
    boxShadow: hovered ? S.shadow2 : S.shadow1,
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

function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '0 48px 120px',
    }}>
      <h2 style={{
        fontFamily: font, fontSize: 40, fontWeight: 500,
        color: S.text, letterSpacing: '-0.02em',
        margin: '0 0 12px', textWrap: 'pretty',
      }}>Design it. Ship it.</h2>
      <p style={{
        fontFamily: font, fontSize: 16, fontWeight: 400,
        color: S.textTer, margin: '0 0 32px', textWrap: 'pretty',
      }}>No steps in between. Free and open source.</p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
        fontSize: 16, borderRadius: 8, padding: '12px 32px',
        background: S.accent, color: S.bg,
        transform: ba ? 'scale(0.97)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}`,
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
      borderTop: `1px solid ${S.border}`,
    }}>
      <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: S.textTer }}>canvai</span>
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

export function Signal() {
  return (
    <div style={{
      background: S.bg, minHeight: '100%', overflow: 'auto',
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
