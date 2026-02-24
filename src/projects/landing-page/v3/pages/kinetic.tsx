import { useState, useRef, useCallback } from 'react'
import { LP, Dark, spring } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Kinetic palette — Emil-style: high contrast, speed, restraint ───────
// Every animation is <200ms. Tension 300, Friction 20 (snappy spring).
// No gratuitous motion. If it doesn't help the user, it doesn't move.
const K = {
  bg: '#09090B',
  surface: '#18181B',
  surfaceHover: '#27272A',
  border: '#27272A',
  text: '#FAFAFA',
  textSec: '#A1A1AA',
  textTer: '#52525B',
  accent: '#EF4444',
  accentSoft: 'rgba(239, 68, 68, 0.10)',
  accentGlow: 'rgba(239, 68, 68, 0.25)',
}

const kFont = '"Space Mono", "SF Mono", "Fira Code", monospace'
const kSans = '"Geist", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'

// Snappy spring — Emil's speed philosophy: under 200ms, no overshoot
const snappy = 'cubic-bezier(0.25, 1, 0.5, 1)'

// ── Hooks ────────────────────────────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// Mouse-tracking tilt hook
function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`,
      transition: `transform 0.15s ${snappy}`,
    })
  }, [])
  const onLeave = useCallback(() => {
    setStyle({ transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)', transition: `transform 0.3s ${snappy}` })
  }, [])
  return { ref, style, onMouseMove: onMove, onMouseLeave: onLeave }
}

// ── Font loader ──────────────────────────────────────────────────────────
function FontLoader() {
  return (
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
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
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s8 }}>
        {/* Red dot — alive indicator */}
        <div style={{
          width: 8, height: 8, borderRadius: '50%', background: K.accent,
          boxShadow: `0 0 8px ${K.accentGlow}`,
        }} />
        <span style={{
          fontFamily: kFont, fontSize: 14, fontWeight: 700,
          color: K.text, letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>canvai</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['DOCS', 'GITHUB'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: kFont, fontSize: 11, fontWeight: 400,
              color: hl === link ? K.text : K.textTer,
              letterSpacing: '0.1em',
              transition: `color 0.15s ${snappy}`,
              cursor: 'default',
            }}>
            {link}
          </span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — massive type, minimal chrome ──────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      padding: `120px ${LP.s32}px ${LP.s64}px`,
      maxWidth: LP.maxWidth, margin: '0 auto', boxSizing: 'border-box',
    }}>
      {/* Oversized headline */}
      <h1 style={{
        fontFamily: kSans, fontSize: 96, fontWeight: 800,
        color: K.text, lineHeight: 0.95, letterSpacing: '-0.05em',
        margin: 0, textWrap: 'pretty',
      }}>
        DESIGN<br />
        <span style={{ color: K.accent }}>IN CODE.</span>
      </h1>
      <p style={{
        fontFamily: kSans, fontSize: 18, fontWeight: 400,
        color: K.textSec, marginTop: LP.s24, marginBottom: LP.s40,
        lineHeight: 1.6, textWrap: 'pretty', maxWidth: 440,
      }}>
        An infinite canvas where every frame is live React.
        No export step. No handoff.
      </p>
      <button {...bhB} {...baB} style={{
        border: `1px solid ${K.accent}`, cursor: 'default',
        fontFamily: kFont, fontWeight: 700, fontSize: 12,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        borderRadius: 0, padding: `${LP.s16}px ${LP.s32}px`,
        background: ba ? K.accent : bh ? K.accentSoft : 'transparent',
        color: ba ? K.bg : K.accent,
        transform: ba ? 'scale(0.97)' : 'scale(1)',
        transition: `all 0.15s ${snappy}`,
        boxShadow: bh ? `0 0 24px ${K.accentGlow}` : 'none',
      }}>
        Install Plugin
      </button>
    </section>
  )
}

// ── Stats bar ────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { n: '0', label: 'HANDOFFS' },
    { n: '< 60', label: 'SECONDS TO LIVE' },
    { n: '\u221E', label: 'CANVAS SIZE' },
    { n: '100%', label: 'REAL CODE' },
  ]
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto', boxSizing: 'border-box',
      padding: `${LP.s48}px ${LP.s32}px`,
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
      borderTop: `1px solid ${K.border}`,
      borderBottom: `1px solid ${K.border}`,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          padding: `0 ${LP.s24}px`,
          borderLeft: i > 0 ? `1px solid ${K.border}` : 'none',
        }}>
          <div style={{
            fontFamily: kSans, fontSize: 48, fontWeight: 800,
            color: K.text, letterSpacing: '-0.04em', lineHeight: 1,
          }}>{s.n}</div>
          <div style={{
            fontFamily: kFont, fontSize: 10, fontWeight: 400,
            color: K.textTer, marginTop: LP.s8,
            letterSpacing: '0.15em',
          }}>{s.label}</div>
        </div>
      ))}
    </section>
  )
}

// ── Product shot with tilt ──────────────────────────────────────────────
function ProductShot() {
  const tilt = useTilt()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s32}px`,
    }}>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
        style={{
          borderRadius: 4, overflow: 'hidden',
          border: `1px solid ${K.border}`,
          boxShadow: '0 16px 64px rgba(0,0,0,0.5)',
          ...tilt.style,
        }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Features — stacked horizontal blocks ────────────────────────────────
const features = [
  { tag: '01', title: 'Live Canvas', desc: 'Every frame is a real React component running in the browser. Edit code, see it instantly.' },
  { tag: '02', title: 'Annotations', desc: 'Click anywhere to leave feedback. Your AI agent picks it up and iterates in real time.' },
  { tag: '03', title: 'Iterations', desc: 'Every change creates a versioned snapshot. Compare, revert, branch. Nothing is ever lost.' },
]

function Features() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s32}px`,
    }}>
      {features.map((f, i) => {
        const hovered = hoveredIdx === i
        return (
          <div key={f.tag}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              display: 'flex', gap: LP.s32, alignItems: 'baseline',
              padding: `${LP.s32}px 0`,
              borderTop: `1px solid ${hovered ? K.textTer : K.border}`,
              transition: `border-color 0.15s ${snappy}`,
              cursor: 'default',
            }}>
            <span style={{
              fontFamily: kFont, fontSize: 12, fontWeight: 400,
              color: hovered ? K.accent : K.textTer,
              letterSpacing: '0.08em', minWidth: 40,
              transition: `color 0.15s ${snappy}`,
            }}>{f.tag}</span>
            <h3 style={{
              fontFamily: kSans, fontSize: 28, fontWeight: 700,
              color: K.text, margin: 0, minWidth: 200,
              letterSpacing: '-0.02em', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: kSans, fontSize: 16, fontWeight: 400,
              color: hovered ? K.textSec : K.textTer,
              margin: 0, lineHeight: 1.6, flex: 1,
              transition: `color 0.15s ${snappy}`,
              textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        )
      })}
      <div style={{ borderTop: `1px solid ${K.border}` }} />
    </section>
  )
}

// ── Code Block — terminal style ─────────────────────────────────────────
function CodeBlock() {
  const [copied, setCopied] = useState(false)
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s32}px ${LP.s64}px`,
    }}>
      <div {...hB}
        onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        style={{
          background: K.surface, borderRadius: 4,
          border: `1px solid ${h ? K.textTer : K.border}`,
          padding: `${LP.s20}px ${LP.s24}px`,
          fontFamily: kFont, fontSize: 14, lineHeight: 2,
          cursor: 'default',
          transition: `border-color 0.15s ${snappy}`,
        }}>
        <div>
          <span style={{ color: K.accent }}>$ </span>
          <span style={{ color: K.text }}>npx canvai new my-project</span>
        </div>
        <div>
          <span style={{ color: K.accent }}>$ </span>
          <span style={{ color: K.text }}>npx canvai design</span>
        </div>
        <div style={{ marginTop: LP.s8 }}>
          <span style={{ color: K.textTer }}>
            {copied ? '  Copied to clipboard.' : '  Canvas running at localhost:5173'}
          </span>
        </div>
      </div>
    </section>
  )
}

// ── Secondary screenshots ───────────────────────────────────────────────
function SecondaryScreenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const card = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 4, overflow: 'hidden',
    border: `1px solid ${hovered ? K.textTer : K.border}`,
    transition: `all 0.15s ${snappy}`,
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
  })
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s32}px ${LP.s64}px`,
    }}>
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
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s80}px ${LP.s32}px`, textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: kSans, fontSize: 56, fontWeight: 800,
        color: K.text, letterSpacing: '-0.04em', lineHeight: 1.0,
        margin: `0 0 ${LP.s16}px`, textWrap: 'pretty',
      }}>
        START<br />
        <span style={{ color: K.accent }}>BUILDING.</span>
      </h2>
      <p style={{
        fontFamily: kSans, fontSize: 16, fontWeight: 400,
        color: K.textTer, margin: `0 0 ${LP.s40}px`,
        textWrap: 'pretty',
      }}>
        Free and open source.
      </p>
      <button {...bhB} {...baB} style={{
        border: `1px solid ${K.accent}`, cursor: 'default',
        fontFamily: kFont, fontWeight: 700, fontSize: 12,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        borderRadius: 0, padding: `${LP.s16}px ${LP.s40}px`,
        background: ba ? K.accent : bh ? K.accentSoft : 'transparent',
        color: ba ? K.bg : K.accent,
        transform: ba ? 'scale(0.97)' : 'scale(1)',
        transition: `all 0.15s ${snappy}`,
        boxShadow: bh ? `0 0 32px ${K.accentGlow}` : 'none',
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
      padding: `${LP.s20}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${K.border}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: K.accent }} />
        <span style={{
          fontFamily: kFont, fontSize: 11, fontWeight: 700,
          color: K.textTer, letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>canvai</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['GITHUB', 'DOCS'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: kFont, fontSize: 11, fontWeight: 400,
              color: hl === link ? K.text : K.textTer,
              letterSpacing: '0.1em',
              transition: `color 0.15s ${snappy}`,
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
export function Kinetic() {
  return (
    <div style={{
      background: K.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: kSans, WebkitFontSmoothing: 'antialiased',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <StatsBar />
      <ProductShot />
      <Features />
      <CodeBlock />
      <SecondaryScreenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
