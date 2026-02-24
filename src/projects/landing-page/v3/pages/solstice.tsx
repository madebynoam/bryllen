import { useState } from 'react'
import { LP, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Solstice — warm sunset gradient, soft organic curves, dreamy ─────────
// Think golden hour. Warm gradients, soft shapes, rounded everything,
// diffused glows. The anti-dark-mode landing page.
const So = {
  bg: '#FFFBF5',
  bgWarm: '#FFF5E8',
  surface: '#FFFCF8',
  border: '#F0E4D3',
  borderHover: '#E4D4BD',
  text: '#2D1810',
  textSec: '#8B6E5A',
  textTer: '#B89E89',
  // Warm sunset gradient
  gradientStart: '#FF9A6C',
  gradientMid: '#FF6B95',
  gradientEnd: '#A855F7',
  gradient: 'linear-gradient(135deg, #FF9A6C, #FF6B95, #A855F7)',
  gradientSoft: 'linear-gradient(135deg, rgba(255,154,108,0.12), rgba(255,107,149,0.08), rgba(168,85,247,0.06))',
  gradientGlow: 'linear-gradient(135deg, rgba(255,154,108,0.20), rgba(255,107,149,0.15))',
  accentOrange: '#FF8C42',
  accentOrangeSoft: 'rgba(255, 140, 66, 0.10)',
}

const soDisplay = '"Fraunces", Georgia, serif'
const soBody = '"Nunito Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'

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
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400&family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  )
}

// ── Gradient blob ───────────────────────────────────────────────────────
function GradientBlob({ top, left, size, opacity = 0.15 }: {
  top: string; left: string; size: number; opacity?: number
}) {
  return (
    <div style={{
      position: 'absolute', top, left, width: size, height: size,
      borderRadius: '50%', background: So.gradientGlow,
      filter: `blur(${size * 0.4}px)`, opacity, pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s20}px ${LP.s40}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 5,
    }}>
      <span style={{
        fontFamily: soDisplay, fontSize: 24, fontWeight: 700,
        color: So.text,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: soBody, fontSize: 14, fontWeight: 600,
              color: hl === link ? So.text : So.textTer,
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
      textAlign: 'center', padding: `100px ${LP.s40}px ${LP.s64}px`,
      maxWidth: 880, margin: '0 auto', position: 'relative', zIndex: 5,
    }}>
      {/* Gradient badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: LP.s8,
        padding: `${LP.s8}px ${LP.s20}px`, borderRadius: LP.pillRadius,
        background: So.gradientSoft, marginBottom: LP.s32,
        border: `1px solid rgba(255, 140, 66, 0.15)`,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: So.gradient,
        }} />
        <span style={{
          fontFamily: soBody, fontSize: 12, fontWeight: 700,
          color: So.accentOrange, letterSpacing: '0.05em',
        }}>Open Source</span>
      </div>
      <h1 style={{
        fontFamily: soDisplay, fontSize: 72, fontWeight: 900,
        color: So.text, lineHeight: 1.06, letterSpacing: '-0.03em',
        margin: 0, textWrap: 'pretty',
      }}>
        Design that<br />
        <span style={{
          background: So.gradient, WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>feels alive</span>
      </h1>
      <p style={{
        fontFamily: soBody, fontSize: 18, fontWeight: 400,
        color: So.textSec, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.65, textWrap: 'pretty', maxWidth: 460,
      }}>
        An infinite canvas of live React components.
        No export. No handoff. Every design ships as code.
      </p>
      <div style={{ display: 'flex', gap: LP.s12 }}>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: soBody, fontWeight: 700,
          fontSize: 15, borderRadius: LP.pillRadius,
          padding: `${LP.s12}px ${LP.s32}px`,
          background: So.gradient, color: '#FFFBF5',
          transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.25s ${spring}, box-shadow 0.3s ${springGentle}`,
          boxShadow: bh
            ? '0 4px 24px rgba(255,140,66,0.3), 0 8px 48px rgba(255,107,149,0.15)'
            : '0 2px 12px rgba(255,140,66,0.15)',
        }}>Install Plugin</button>
        <button style={{
          border: `1px solid ${So.border}`, cursor: 'default',
          fontFamily: soBody, fontWeight: 600, fontSize: 15,
          borderRadius: LP.pillRadius, padding: `${LP.s12}px ${LP.s32}px`,
          background: So.surface, color: So.text,
        }}>View Source</button>
      </div>
    </section>
  )
}

// ── Hero screenshot ─────────────────────────────────────────────────────
function HeroScreenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s40}px ${LP.s80}px`, position: 'relative', zIndex: 5,
    }}>
      {/* Gradient glow behind */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', height: '70%', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,140,66,0.08), rgba(255,107,149,0.04), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div {...hB} style={{
        position: 'relative', borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${h ? So.borderHover : So.border}`,
        transition: `all 0.4s ${springGentle}`,
        transform: h ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: h
          ? '0 24px 80px rgba(255,140,66,0.12), 0 8px 32px rgba(0,0,0,0.08)'
          : '0 8px 40px rgba(0,0,0,0.06)',
      }}>
        <img src={pulseDashboard} alt="Canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Features — soft rounded cards with gradient accents ──────────────────
const features = [
  { title: 'Live Canvas', desc: 'Real React components on an infinite surface. Edit and see changes instantly.' },
  { title: 'Annotations', desc: 'Point and click to leave feedback. Your AI agent iterates in real time.' },
  { title: 'Iterations', desc: 'Every change is versioned. Compare, revert, branch — nothing is lost.' },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s40}px`, position: 'relative', zIndex: 5,
    }}>
      <h2 style={{
        fontFamily: soDisplay, fontSize: 44, fontWeight: 900,
        color: So.text, textAlign: 'center', letterSpacing: '-0.02em',
        margin: `0 0 ${LP.s48}px`, textWrap: 'pretty',
      }}>
        Beautifully simple
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s20 }}>
        {features.map((f, i) => {
          const hovered = hi === i
          return (
            <div key={f.title}
              onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
              style={{
                padding: LP.s32, borderRadius: 20, cursor: 'default',
                background: hovered ? So.bgWarm : So.surface,
                border: `1px solid ${hovered ? So.borderHover : So.border}`,
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: `all 0.3s ${springGentle}`,
                boxShadow: hovered
                  ? '0 12px 40px rgba(255,140,66,0.08), 0 4px 16px rgba(0,0,0,0.04)'
                  : '0 2px 8px rgba(0,0,0,0.03)',
              }}>
              {/* Gradient dot */}
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: So.gradient, marginBottom: LP.s20,
                boxShadow: hovered ? '0 0 12px rgba(255,140,66,0.3)' : 'none',
                transition: `box-shadow 0.3s ${springGentle}`,
              }} />
              <h3 style={{
                fontFamily: soDisplay, fontSize: 22, fontWeight: 700,
                color: So.text, margin: `0 0 ${LP.s12}px`, textWrap: 'pretty',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: soBody, fontSize: 15, fontWeight: 400,
                color: So.textSec, margin: 0, lineHeight: 1.65, textWrap: 'pretty',
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
    borderRadius: 16, overflow: 'hidden',
    border: `1px solid ${hovered ? So.borderHover : So.border}`,
    transition: `all 0.3s ${springGentle}`,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hovered
      ? '0 12px 40px rgba(255,140,66,0.08), 0 4px 16px rgba(0,0,0,0.04)'
      : '0 2px 8px rgba(0,0,0,0.03)',
  })
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s40}px ${LP.s80}px`, position: 'relative', zIndex: 5,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s20 }}>
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

// ── Warm gradient divider ───────────────────────────────────────────────
function WarmDivider() {
  return (
    <div style={{
      maxWidth: 120, margin: '0 auto', height: 3, borderRadius: 2,
      background: So.gradient, opacity: 0.4,
    }} />
  )
}

// ── Bottom CTA ──────────────────────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto', textAlign: 'center',
      padding: `${LP.s80}px ${LP.s40}px`, position: 'relative', zIndex: 5,
    }}>
      <WarmDivider />
      <h2 style={{
        fontFamily: soDisplay, fontSize: 44, fontWeight: 900,
        color: So.text, letterSpacing: '-0.02em',
        margin: `${LP.s40}px 0 ${LP.s16}px`, textWrap: 'pretty',
      }}>
        Start your journey
      </h2>
      <p style={{
        fontFamily: soBody, fontSize: 15, fontWeight: 400,
        color: So.textTer, margin: `0 0 ${LP.s32}px`, textWrap: 'pretty',
      }}>
        Free and open source. A Claude Code plugin.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: soBody, fontWeight: 700,
        fontSize: 16, borderRadius: LP.pillRadius,
        padding: `${LP.s16}px ${LP.s40}px`,
        background: So.gradient, color: '#FFFBF5',
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.03)' : 'scale(1)',
        transition: `transform 0.25s ${spring}, box-shadow 0.35s ${springGentle}`,
        boxShadow: bh
          ? '0 6px 32px rgba(255,140,66,0.25), 0 0 64px rgba(255,107,149,0.10)'
          : '0 2px 16px rgba(255,140,66,0.12)',
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
      padding: `${LP.s24}px ${LP.s40}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 5,
    }}>
      <span style={{
        fontFamily: soDisplay, fontSize: 18, fontWeight: 700,
        color: So.textTer,
      }}>canvai</span>
      <div style={{ display: 'flex', gap: LP.s24 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: soBody, fontSize: 13, fontWeight: 600, cursor: 'default',
              color: hl === l ? So.text : So.textTer,
              transition: `color 0.2s ${springGentle}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────
export function Solstice() {
  return (
    <div style={{
      background: So.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: soBody, WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      <FontLoader />
      <GradientBlob top="-200px" left="20%" size={600} opacity={0.12} />
      <GradientBlob top="800px" left="60%" size={500} opacity={0.08} />
      <GradientBlob top="1800px" left="10%" size={400} opacity={0.10} />
      <Nav />
      <Hero />
      <HeroScreenshot />
      <Features />
      <Screenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
