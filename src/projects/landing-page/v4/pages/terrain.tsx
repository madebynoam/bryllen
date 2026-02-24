import { useState, useMemo } from 'react'
import { LP, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Terrain palette — earthy, topographic, Jhey-inspired CSS creativity ──
// Background textures with SVG contour lines, layered depth, natural tones.
const T = {
  bg: '#1A1916',
  bgLight: '#222019',
  surface: '#2A2823',
  surfaceHover: '#33312B',
  border: '#3D3A33',
  borderLight: '#4A4639',
  text: '#E8E4DB',
  textSec: '#A09A8C',
  textTer: '#6B665A',
  green: '#84CC16',
  greenSoft: 'rgba(132, 204, 22, 0.10)',
  greenGlow: 'rgba(132, 204, 22, 0.20)',
  greenMuted: '#6B9A14',
  sand: '#C4B99A',
  sandSoft: 'rgba(196, 185, 154, 0.06)',
}

const tDisplay = '"Playfair Display", Georgia, serif'
const tBody = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const tMono = '"IBM Plex Mono", "SF Mono", monospace'

// ── Hooks ────────────────────────────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Font loader ──────────────────────────────────────────────────────────
function FontLoader() {
  return (
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
  )
}

// ── Topographic background — SVG contour lines ──────────────────────────
function TopoBackground() {
  // Generate procedural contour paths
  const lines = useMemo(() => {
    const paths: { d: string; opacity: number }[] = []
    for (let i = 0; i < 18; i++) {
      const y = 60 + i * 80
      const amp = 20 + (i % 5) * 12
      const freq = 0.003 + (i % 3) * 0.001
      const phase = i * 47
      // Simple wave using cubic bezier approximation
      const points: string[] = []
      for (let x = 0; x <= 1440; x += 60) {
        const py = y + Math.sin(x * freq + phase) * amp + Math.cos(x * freq * 0.7 + phase * 0.5) * (amp * 0.5)
        points.push(`${x},${py.toFixed(1)}`)
      }
      paths.push({
        d: `M ${points.join(' L ')}`,
        opacity: 0.04 + (i % 3) * 0.02,
      })
    }
    return paths
  }, [])

  return (
    <svg style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: 0.6,
    }} viewBox="0 0 1440 2400" preserveAspectRatio="none">
      {lines.map((line, i) => (
        <path key={i} d={line.d} fill="none"
          stroke={T.sand} strokeWidth="1" opacity={line.opacity} />
      ))}
    </svg>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s20}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 5,
    }}>
      <span style={{
        fontFamily: tDisplay, fontSize: 22, fontWeight: 700,
        color: T.text, letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: tBody, fontSize: 14, fontWeight: 500,
              color: hl === link ? T.text : T.textTer,
              transition: `color 0.25s ${springGentle}`,
              cursor: 'default',
            }}>
            {link}
          </span>
        ))}
      </div>
    </nav>
  )
}

// ── Elevation badge ─────────────────────────────────────────────────────
function ElevationBadge({ label }: { label: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: LP.s8,
      padding: `${LP.s4}px ${LP.s16}px`, borderRadius: LP.pillRadius,
      background: T.greenSoft, border: `1px solid rgba(132, 204, 22, 0.15)`,
      fontFamily: tMono, fontSize: 11, fontWeight: 500,
      color: T.green, letterSpacing: '0.05em',
    }}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%', background: T.green,
        boxShadow: `0 0 6px ${T.greenGlow}`,
      }} />
      {label}
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: `100px ${LP.s32}px ${LP.s64}px`,
      maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 5,
    }}>
      <ElevationBadge label="v0.0.35 — open source" />
      <h1 style={{
        fontFamily: tDisplay, fontSize: 76, fontWeight: 900,
        color: T.text, lineHeight: 1.05, letterSpacing: '-0.03em',
        margin: `${LP.s32}px 0 0 0`, textWrap: 'pretty',
      }}>
        Chart new<br />
        <span style={{ color: T.green }}>territory</span>
      </h1>
      <p style={{
        fontFamily: tBody, fontSize: 19, fontWeight: 400,
        color: T.textSec, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.65, textWrap: 'pretty', maxWidth: 480,
      }}>
        An infinite canvas where every design is live React code.
        Explore, iterate, and ship — all in one place.
      </p>
      <div style={{ display: 'flex', gap: LP.s12 }}>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: tBody, fontWeight: 600,
          fontSize: 15, borderRadius: LP.s8,
          padding: `${LP.s12}px ${LP.s32}px`,
          background: T.green, color: T.bg,
          transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.25s ${spring}, box-shadow 0.3s ${springGentle}`,
          boxShadow: bh
            ? `0 4px 24px ${T.greenGlow}, 0 0 48px rgba(132, 204, 22, 0.08)`
            : `0 2px 12px rgba(132, 204, 22, 0.12)`,
        }}>
          Install Plugin
        </button>
        <button style={{
          border: `1px solid ${T.border}`, cursor: 'default',
          fontFamily: tBody, fontWeight: 500, fontSize: 15,
          borderRadius: LP.s8, padding: `${LP.s12}px ${LP.s32}px`,
          background: 'transparent', color: T.textSec,
        }}>
          View Source
        </button>
      </div>
    </section>
  )
}

// ── Hero Screenshot ─────────────────────────────────────────────────────
function HeroScreenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s32}px ${LP.s80}px`,
      position: 'relative', zIndex: 5,
    }}>
      <div {...hB} style={{
        borderRadius: LP.s12, overflow: 'hidden',
        border: `1px solid ${h ? T.borderLight : T.border}`,
        transition: `transform 0.4s ${springGentle}, box-shadow 0.5s ${springGentle}, border-color 0.3s ease`,
        transform: h ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: h
          ? `0 24px 80px rgba(0,0,0,0.5), 0 0 40px ${T.greenGlow}`
          : '0 8px 40px rgba(0,0,0,0.3)',
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Contour Feature Cards ───────────────────────────────────────────────
const features = [
  {
    title: 'Live Code Canvas',
    desc: 'Every frame is a real React component. Edit code, see it instantly on an infinite surface.',
    elevation: '2,400ft',
  },
  {
    title: 'Point & Click Annotations',
    desc: 'Click anywhere to leave feedback. Your AI agent picks it up and iterates in real time.',
    elevation: '3,100ft',
  },
  {
    title: 'Versioned Iterations',
    desc: 'Every change is a new layer. Compare, revert, branch — the full topography of your design.',
    elevation: '4,200ft',
  },
]

function FeatureCards() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s32}px`, position: 'relative', zIndex: 5,
    }}>
      <div style={{
        fontFamily: tMono, fontSize: 11, fontWeight: 500,
        color: T.textTer, letterSpacing: '0.12em', textTransform: 'uppercase',
        textAlign: 'center', marginBottom: LP.s40,
      }}>
        Elevation Guide
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s20 }}>
        {features.map((f, i) => {
          const hovered = hoveredIdx === i
          return (
            <div key={f.title}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: LP.s32, borderRadius: LP.s12,
                background: hovered ? T.surfaceHover : T.surface,
                border: `1px solid ${hovered ? T.borderLight : T.border}`,
                cursor: 'default',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: `all 0.3s ${springGentle}`,
                boxShadow: hovered
                  ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${T.greenGlow}`
                  : '0 4px 16px rgba(0,0,0,0.15)',
              }}>
              <div style={{
                fontFamily: tMono, fontSize: 11, fontWeight: 500,
                color: hovered ? T.green : T.textTer,
                letterSpacing: '0.05em', marginBottom: LP.s16,
                transition: `color 0.2s ${springGentle}`,
              }}>{f.elevation}</div>
              <h3 style={{
                fontFamily: tDisplay, fontSize: 24, fontWeight: 700,
                color: T.text, margin: `0 0 ${LP.s12}px`,
                textWrap: 'pretty',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: tBody, fontSize: 15, fontWeight: 400,
                color: T.textSec, margin: 0, lineHeight: 1.65,
                textWrap: 'pretty',
              }}>{f.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Topographic Separator ───────────────────────────────────────────────
function TopoSeparator() {
  return (
    <div style={{
      maxWidth: LP.maxWidth, margin: '0 auto', padding: `0 ${LP.s32}px`,
      position: 'relative', zIndex: 5,
    }}>
      <svg viewBox="0 0 1200 60" style={{ width: '100%', height: 60, display: 'block' }}>
        <path d="M 0,30 Q 150,10 300,30 T 600,30 T 900,30 T 1200,30"
          fill="none" stroke={T.border} strokeWidth="1" />
        <path d="M 0,35 Q 200,50 400,35 T 800,35 T 1200,35"
          fill="none" stroke={T.border} strokeWidth="0.5" opacity="0.5" />
        <circle cx="600" cy="30" r="3" fill={T.green} opacity="0.6" />
      </svg>
    </div>
  )
}

// ── How it Works — trail markers ────────────────────────────────────────
const steps = [
  { marker: 'A', title: 'Describe', desc: 'Tell the agent what you want in natural language.', code: '/canvai-new pulse-dashboard' },
  { marker: 'B', title: 'Explore', desc: 'Watch it generate live React on the canvas. Click anywhere to annotate.', code: '"Add a sidebar with stats"' },
  { marker: 'C', title: 'Summit', desc: 'The design is the code. Deploy directly or extract components.', code: '/canvai-share' },
]

function HowItWorks() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 720, margin: '0 auto',
      padding: `${LP.s80}px ${LP.s32}px`, position: 'relative', zIndex: 5,
    }}>
      <h2 style={{
        fontFamily: tDisplay, fontSize: 44, fontWeight: 900,
        color: T.text, textAlign: 'center', letterSpacing: '-0.02em',
        margin: `0 0 ${LP.s64}px`, textWrap: 'pretty',
      }}>
        The trail
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: LP.s40, position: 'relative' }}>
        {/* Vertical dashed trail */}
        <div style={{
          position: 'absolute', left: 19, top: LP.s24, bottom: LP.s24,
          width: 1, borderLeft: `2px dashed ${T.border}`,
        }} />
        {steps.map((s, i) => {
          const hovered = hi === i
          return (
            <div key={s.marker}
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
              style={{
                display: 'flex', gap: LP.s24, alignItems: 'flex-start',
                cursor: 'default',
              }}>
              {/* Trail marker */}
              <div style={{
                width: 40, height: 40, minWidth: 40, borderRadius: LP.s8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: hovered ? T.greenSoft : T.surface,
                border: `1px solid ${hovered ? T.green : T.border}`,
                transition: `all 0.25s ${springGentle}`,
                boxShadow: hovered ? `0 0 16px ${T.greenGlow}` : 'none',
              }}>
                <span style={{
                  fontFamily: tMono, fontSize: 13, fontWeight: 500,
                  color: hovered ? T.green : T.textTer,
                  transition: `color 0.2s ${springGentle}`,
                }}>{s.marker}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: tDisplay, fontSize: 24, fontWeight: 700,
                  color: T.text, margin: `0 0 ${LP.s8}px`, textWrap: 'pretty',
                }}>{s.title}</h3>
                <p style={{
                  fontFamily: tBody, fontSize: 16, color: T.textSec,
                  lineHeight: 1.6, margin: `0 0 ${LP.s12}px`, textWrap: 'pretty',
                }}>{s.desc}</p>
                <div style={{
                  fontFamily: tMono, fontSize: 13, color: T.green,
                  padding: `${LP.s8}px ${LP.s16}px`, borderRadius: LP.s4,
                  background: T.greenSoft, display: 'inline-block',
                  border: `1px solid rgba(132, 204, 22, 0.12)`,
                }}>{s.code}</div>
              </div>
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
    border: `1px solid ${hovered ? T.borderLight : T.border}`,
    transition: `all 0.3s ${springGentle}`,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hovered
      ? `0 16px 48px rgba(0,0,0,0.4), 0 0 16px ${T.greenGlow}`
      : '0 4px 20px rgba(0,0,0,0.2)',
  })
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s32}px ${LP.s80}px`,
      position: 'relative', zIndex: 5,
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

// ── Bottom CTA ──────────────────────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s32}px ${LP.s80}px`, textAlign: 'center',
      position: 'relative', zIndex: 5,
    }}>
      <h2 style={{
        fontFamily: tDisplay, fontSize: 44, fontWeight: 900,
        color: T.text, letterSpacing: '-0.02em',
        margin: `0 0 ${LP.s16}px`, textWrap: 'pretty',
      }}>
        Begin the ascent
      </h2>
      <p style={{
        fontFamily: tBody, fontSize: 15, fontWeight: 400,
        color: T.textTer, margin: `0 0 ${LP.s32}px`, textWrap: 'pretty',
      }}>
        Free, open source. A Claude Code plugin.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: tBody, fontWeight: 600,
        fontSize: 16, borderRadius: LP.s8,
        padding: `${LP.s16}px ${LP.s40}px`,
        background: T.green, color: T.bg,
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.03)' : 'scale(1)',
        transition: `transform 0.25s ${spring}, box-shadow 0.35s ${springGentle}`,
        boxShadow: bh
          ? `0 6px 32px ${T.greenGlow}, 0 0 64px rgba(132, 204, 22, 0.08)`
          : `0 2px 16px rgba(132, 204, 22, 0.1)`,
      }}>
        Install Plugin
      </button>
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
      borderTop: `1px solid ${T.border}`, position: 'relative', zIndex: 5,
    }}>
      <span style={{
        fontFamily: tDisplay, fontSize: 18, fontWeight: 700,
        color: T.textTer,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['GitHub', 'Docs'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: tBody, fontSize: 13, fontWeight: 500,
              color: hl === link ? T.text : T.textTer,
              transition: `color 0.2s ${springGentle}`,
              cursor: 'default',
            }}>
            {link}
          </span>
        ))}
      </div>
    </footer>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────
export function Terrain() {
  return (
    <div style={{
      background: T.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: tBody, WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      <FontLoader />
      <TopoBackground />
      <Nav />
      <Hero />
      <HeroScreenshot />
      <FeatureCards />
      <TopoSeparator />
      <HowItWorks />
      <Screenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
