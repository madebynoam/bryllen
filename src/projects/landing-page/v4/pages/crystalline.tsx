import { useState } from 'react'
import { LP, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Crystalline — frosted glass layers, prismatic light, cool palette ────
// Glassmorphism done RIGHT: layered depth, real frosted surfaces, not
// just backdrop-blur slapped on everything. Thin prismatic rainbow accents.
const C = {
  bg: '#0D1117',
  surface: 'rgba(22, 27, 34, 0.8)',
  surfaceSolid: '#161B22',
  glass: 'rgba(255, 255, 255, 0.03)',
  glassHover: 'rgba(255, 255, 255, 0.06)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  glassBorderHover: 'rgba(255, 255, 255, 0.15)',
  text: '#E6EDF3',
  textSec: '#8B949E',
  textTer: '#484F58',
  // Prismatic accent — rainbow gradient for thin lines/highlights
  prism: 'linear-gradient(90deg, #FF6B6B, #FFE66D, #4ECDC4, #45B7D1, #96E6FF, #DDA0DD)',
  prismVert: 'linear-gradient(180deg, #FF6B6B, #FFE66D, #4ECDC4, #45B7D1, #96E6FF, #DDA0DD)',
  accentBlue: '#58A6FF',
  accentBlueSoft: 'rgba(88, 166, 255, 0.10)',
  accentBlueGlow: 'rgba(88, 166, 255, 0.20)',
}

const cFont = '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const cMono = '"JetBrains Mono", "SF Mono", monospace'

// ── Hooks ────────────────────────────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Font Loader ──────────────────────────────────────────────────────────
function FontLoader() {
  return (
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  )
}

// ── Prismatic line ──────────────────────────────────────────────────────
function PrismLine({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      height: 1, background: C.prism, opacity: 0.3,
      ...style,
    }} />
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s16}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: cFont, fontSize: 18, fontWeight: 700,
        color: C.text, letterSpacing: '-0.02em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: cFont, fontSize: 14, fontWeight: 500,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.2s ${springGentle}`, cursor: 'default',
            }}>
            {link}
          </span>
        ))}
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
      textAlign: 'center', padding: `120px ${LP.s32}px ${LP.s64}px`,
      maxWidth: 900, margin: '0 auto', position: 'relative',
    }}>
      {/* Ambient prismatic orb */}
      <div style={{
        position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 300, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(88,166,255,0.06), rgba(78,205,196,0.03), transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        fontFamily: cMono, fontSize: 12, fontWeight: 500, color: C.accentBlue,
        padding: `${LP.s8}px ${LP.s20}px`, borderRadius: LP.pillRadius,
        background: C.accentBlueSoft, marginBottom: LP.s32,
        border: `1px solid rgba(88, 166, 255, 0.15)`,
      }}>open source</div>
      <h1 style={{
        fontFamily: cFont, fontSize: 72, fontWeight: 700,
        color: C.text, lineHeight: 1.06, letterSpacing: '-0.04em',
        margin: 0, textWrap: 'pretty',
      }}>
        The design surface<br />for live code
      </h1>
      <p style={{
        fontFamily: cFont, fontSize: 18, fontWeight: 400,
        color: C.textSec, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.6, textWrap: 'pretty', maxWidth: 480,
      }}>
        An infinite canvas where every frame is a React component.
        Annotate, iterate, ship.
      </p>
      <div style={{ display: 'flex', gap: LP.s12 }}>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: cFont, fontWeight: 600,
          fontSize: 15, borderRadius: LP.s8,
          padding: `${LP.s12}px ${LP.s32}px`,
          background: C.accentBlue, color: C.bg,
          transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.2s ${spring}, box-shadow 0.3s ${springGentle}`,
          boxShadow: bh
            ? `0 4px 24px ${C.accentBlueGlow}, 0 0 48px rgba(88,166,255,0.08)`
            : `0 2px 12px rgba(88,166,255,0.12)`,
        }}>Install Plugin</button>
        <button style={{
          border: `1px solid ${C.glassBorder}`, cursor: 'default',
          fontFamily: cFont, fontWeight: 500, fontSize: 15,
          borderRadius: LP.s8, padding: `${LP.s12}px ${LP.s32}px`,
          background: C.glass, backdropFilter: 'blur(20px)',
          color: C.text,
        }}>View Source</button>
      </div>
    </section>
  )
}

// ── Product shot ────────────────────────────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s32}px`,
    }}>
      {/* Prismatic border top */}
      <PrismLine style={{ marginBottom: -1, borderRadius: '12px 12px 0 0' }} />
      <div {...hB} style={{
        borderRadius: LP.s12, overflow: 'hidden',
        border: `1px solid ${h ? C.glassBorderHover : C.glassBorder}`,
        transition: `all 0.4s ${springGentle}`,
        transform: h ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: h
          ? `0 24px 80px rgba(0,0,0,0.5), 0 0 40px ${C.accentBlueGlow}`
          : '0 8px 40px rgba(0,0,0,0.3)',
      }}>
        <img src={pulseDashboard} alt="Canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Feature cards — frosted glass ───────────────────────────────────────
const features = [
  { title: 'Live Canvas', desc: 'Real React components running on an infinite canvas. Edit and see instantly.' },
  { title: 'Annotations', desc: 'Click to leave feedback. Your AI agent picks up changes live.' },
  { title: 'Iterations', desc: 'Every change is versioned. Compare, revert, branch — nothing lost.' },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s80}px ${LP.s32}px`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s16 }}>
        {features.map((f, i) => {
          const hovered = hi === i
          return (
            <div key={f.title}
              onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
              style={{
                padding: LP.s32, borderRadius: LP.s12, cursor: 'default',
                background: hovered ? C.glassHover : C.glass,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${hovered ? C.glassBorderHover : C.glassBorder}`,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: `all 0.3s ${springGentle}`,
                boxShadow: hovered
                  ? `0 16px 48px rgba(0,0,0,0.3), 0 0 20px ${C.accentBlueGlow}`
                  : '0 4px 16px rgba(0,0,0,0.15)',
              }}>
              <h3 style={{
                fontFamily: cFont, fontSize: 18, fontWeight: 600,
                color: C.text, margin: `0 0 ${LP.s12}px`, textWrap: 'pretty',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: cFont, fontSize: 15, fontWeight: 400,
                color: C.textSec, margin: 0, lineHeight: 1.6, textWrap: 'pretty',
              }}>{f.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Screenshots ─────────────────────────────────────────────────────────
function Screenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: LP.s12, overflow: 'hidden',
    border: `1px solid ${hovered ? C.glassBorderHover : C.glassBorder}`,
    transition: `all 0.3s ${springGentle}`,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.2)',
  })
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto', padding: `0 ${LP.s32}px ${LP.s80}px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s16 }}>
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
      maxWidth: 640, margin: '0 auto', textAlign: 'center',
      padding: `${LP.s64}px ${LP.s32}px ${LP.s80}px`, position: 'relative',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 200, borderRadius: '50%', pointerEvents: 'none',
        background: `radial-gradient(ellipse, ${C.accentBlueGlow}, transparent 70%)`,
        filter: 'blur(40px)',
      }} />
      <PrismLine style={{ width: 60, margin: '0 auto', marginBottom: LP.s40 }} />
      <h2 style={{
        fontFamily: cFont, fontSize: 40, fontWeight: 700,
        color: C.text, letterSpacing: '-0.03em',
        margin: `0 0 ${LP.s16}px`, textWrap: 'pretty', position: 'relative',
      }}>Start designing</h2>
      <p style={{
        fontFamily: cFont, fontSize: 15, color: C.textTer,
        margin: `0 0 ${LP.s32}px`, textWrap: 'pretty', position: 'relative',
      }}>Free and open source.</p>
      <button {...bhB} {...baB} style={{
        position: 'relative', border: 'none', cursor: 'default',
        fontFamily: cFont, fontWeight: 600, fontSize: 16, borderRadius: LP.s8,
        padding: `${LP.s16}px ${LP.s40}px`,
        background: C.accentBlue, color: C.bg,
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.2s ${spring}, box-shadow 0.3s ${springGentle}`,
        boxShadow: bh ? `0 6px 32px ${C.accentBlueGlow}` : `0 2px 16px rgba(88,166,255,0.12)`,
      }}>Install Plugin</button>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s24}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <PrismLine style={{ position: 'absolute', top: 0, left: LP.s32, right: LP.s32 }} />
      <span style={{ fontFamily: cFont, fontSize: 15, fontWeight: 700, color: C.textTer }}>canvai</span>
      <div style={{ display: 'flex', gap: LP.s24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: cFont, fontSize: 13, fontWeight: 500, cursor: 'default',
              color: hl === l ? C.text : C.textTer,
              transition: `color 0.2s ${springGentle}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────
export function Crystalline() {
  return (
    <div style={{
      background: C.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: cFont, WebkitFontSmoothing: 'antialiased', position: 'relative',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <ProductShot />
      <Features />
      <Screenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
