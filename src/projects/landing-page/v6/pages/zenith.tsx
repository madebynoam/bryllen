import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'
import productDirections from '../../screenshots/product-directions.png'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'

// ── Zenith — Ultra-white, single accent blue, Vercel deploy energy ──────
// 80%+ whitespace. One bold punch of vibrant blue. Typography does the work.

const C = {
  bg: '#FAFAFA',
  text: '#111110',
  textSec: '#555553',
  textTer: '#888886',
  border: '#E8E8E6',
  blue: '#2563EB',
  blueHover: '#1D4ED8',
  onBlue: '#FAFAFA',
  shadow1: '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
  shadow2: '0 8px 32px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)',
  shadow3: '0 16px 56px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
}

const sora = '"Sora", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const body = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Google Fonts loader ─────────────────────────────────────────────────
function FontLoader() {
  return (
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');`}</style>
  )
}

// ── Nav ─────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 64px', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: sora, fontSize: 17, fontWeight: 600,
        color: C.text, letterSpacing: '-0.02em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: body, fontSize: 14, fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${spring}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: body, fontWeight: 500,
          fontSize: 13, borderRadius: 20, padding: '8px 20px',
          background: C.blue, color: C.onBlue,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.2s ${spring}, background 0.15s ease`,
          ...(bh && !ba ? { background: C.blueHover } : {}),
        }}>Get started</button>
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
      textAlign: 'center', padding: '80px 64px 80px',
      maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
    }}>
      <h1 style={{
        fontFamily: sora, fontSize: 64, fontWeight: 600,
        color: C.text, lineHeight: 1.08, letterSpacing: '-0.035em',
        margin: 0, textWrap: 'pretty',
      }}>
        The canvas for <span style={{ color: C.blue }}>design</span>
      </h1>
      <p style={{
        fontFamily: body, fontSize: 18, fontWeight: 400,
        color: C.textSec, marginTop: 20, marginBottom: 44,
        lineHeight: 1.6, textWrap: 'pretty', maxWidth: 460,
      }}>
        Describe a UI to Claude Code. See five directions at once on an infinite, zoomable canvas.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: body, fontWeight: 500,
        fontSize: 15, borderRadius: 8, padding: '12px 32px',
        background: C.blue, color: C.onBlue,
        transform: ba ? 'scale(0.92)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.2s ${spring}, background 0.15s ease, box-shadow 0.2s ease`,
        boxShadow: bh ? '0 4px 20px rgba(37,99,235,0.25)' : 'none',
        ...(bh && !ba ? { background: C.blueHover } : {}),
      }}>Start designing</button>
    </section>
  )
}

// ── Product screenshot — full-bleed hero image ──────────────────────────
function ProductHero() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1200, margin: '0 auto', padding: '0 64px 120px',
      boxSizing: 'border-box',
    }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${C.border}`,
        boxShadow: h ? C.shadow3 : C.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.35s ${spring}, box-shadow 0.35s ease`,
      }}>
        <img src={canvasWide} alt="The Canvai canvas showing multiple design directions side by side" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Features — pure typography, no cards ─────────────────────────────────
const features = [
  {
    title: 'See many directions at once',
    desc: 'One prompt generates five layouts on a single canvas. Compare without switching tabs or scrolling through chat history.',
  },
  {
    title: 'Annotate and refine',
    desc: 'Click anywhere on a frame and describe the change. Claude picks it up and iterates while you watch.',
  },
  {
    title: 'Every version preserved',
    desc: 'Nothing is overwritten. Go back to any iteration. Branch a direction. Your creative history stays intact.',
  },
]

function Features() {
  return (
    <section style={{
      maxWidth: 1200, margin: '0 auto', padding: '0 64px 120px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 520 }}>
        {features.map((f, i) => (
          <div key={f.title} style={{ marginBottom: i < features.length - 1 ? 48 : 0 }}>
            <h3 style={{
              fontFamily: sora, fontSize: 18, fontWeight: 600,
              color: C.text, margin: '0 0 8px', textWrap: 'pretty',
              letterSpacing: '-0.01em',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: body, fontSize: 15, fontWeight: 400,
              color: C.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Secondary screenshots — 2-column grid ────────────────────────────────
function SecondaryScreenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 12, overflow: 'hidden',
    border: `1px solid ${C.border}`,
    boxShadow: hovered ? C.shadow3 : C.shadow1,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    transition: `transform 0.35s ${spring}, box-shadow 0.35s ease`,
  })
  return (
    <section style={{
      maxWidth: 1200, margin: '0 auto', padding: '0 64px 120px',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div {...h1B} style={card(h1)}>
          <img src={productDirections} alt="Multiple design directions compared on canvas" style={{ width: '100%', display: 'block' }} />
        </div>
        <div {...h2B} style={card(h2)}>
          <img src={pulseDashboard} alt="Dashboard design iteration on the canvas" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

// ── Bottom CTA ───────────────────────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: '80px 64px 120px',
      maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
    }}>
      <h2 style={{
        fontFamily: sora, fontSize: 40, fontWeight: 600,
        color: C.text, margin: 0, marginBottom: 28,
        letterSpacing: '-0.03em', textWrap: 'pretty',
      }}>
        Ready to design?
      </h2>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: body, fontWeight: 500,
        fontSize: 15, borderRadius: 8, padding: '12px 32px',
        background: C.blue, color: C.onBlue,
        transform: ba ? 'scale(0.92)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.2s ${spring}, background 0.15s ease, box-shadow 0.2s ease`,
        boxShadow: bh ? '0 4px 20px rgba(37,99,235,0.25)' : 'none',
        ...(bh && !ba ? { background: C.blueHover } : {}),
      }}>Start designing</button>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 64px', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${C.border}`,
    }}>
      <span style={{
        fontFamily: body, fontSize: 13, fontWeight: 400,
        color: C.textTer, textWrap: 'pretty',
      }}>&copy; 2025 canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l}
            onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: body, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? C.text : C.textTer,
              transition: `color 0.15s ${spring}`,
              textWrap: 'pretty',
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────
export function Zenith() {
  return (
    <div style={{
      background: C.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: body, WebkitFontSmoothing: 'antialiased',
      cursor: 'default', paddingTop: 16,
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <ProductHero />
      <Features />
      <SecondaryScreenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
