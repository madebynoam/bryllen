import { useState, useRef, useEffect } from 'react'
import { LP, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Silk palette — warm cream, zero borders, shadow-only definition ──────
// Inspired by James McDonald & Derek Briggs multi-layered shadow technique:
// Instead of borders, use 3-5 layered shadows at different opacities/spreads
// to create a border-like effect that feels more elevated and subtle.
const S = {
  bg: '#FAF9F6',
  bgWarm: '#F5F2ED',
  surface: '#FEFDFB',
  text: '#1C1917',
  textSec: '#78716C',
  textTer: '#A8A29E',
  accent: '#D97706',
  accentSoft: 'rgba(217, 119, 6, 0.08)',
  accentGlow: 'rgba(217, 119, 6, 0.15)',
  // Multi-layered shadow sets (the McDonald/Briggs technique)
  cardShadow: [
    '0 0 0 1px rgba(28, 25, 23, 0.04)',        // hairline definition
    '0 1px 2px rgba(28, 25, 23, 0.06)',         // tight contact shadow
    '0 4px 16px rgba(28, 25, 23, 0.04)',        // mid-range diffusion
  ].join(', '),
  cardShadowHover: [
    '0 0 0 1px rgba(28, 25, 23, 0.06)',
    '0 2px 4px rgba(28, 25, 23, 0.08)',
    '0 8px 32px rgba(28, 25, 23, 0.08)',
    '0 24px 64px rgba(28, 25, 23, 0.04)',       // extra depth layer on hover
  ].join(', '),
  heroShadow: [
    '0 0 0 1px rgba(28, 25, 23, 0.03)',
    '0 2px 4px rgba(28, 25, 23, 0.04)',
    '0 8px 24px rgba(28, 25, 23, 0.06)',
    '0 24px 48px rgba(28, 25, 23, 0.06)',
    '0 48px 96px rgba(28, 25, 23, 0.04)',       // 5 layers for hero element
  ].join(', '),
  heroShadowHover: [
    '0 0 0 1px rgba(28, 25, 23, 0.04)',
    '0 2px 8px rgba(28, 25, 23, 0.06)',
    '0 12px 32px rgba(28, 25, 23, 0.08)',
    '0 32px 64px rgba(28, 25, 23, 0.08)',
    '0 64px 128px rgba(28, 25, 23, 0.06)',
  ].join(', '),
  btnShadow: [
    '0 0 0 1px rgba(217, 119, 6, 0.2)',
    '0 1px 3px rgba(217, 119, 6, 0.15)',
    '0 4px 12px rgba(217, 119, 6, 0.10)',
  ].join(', '),
  btnShadowHover: [
    '0 0 0 1px rgba(217, 119, 6, 0.25)',
    '0 2px 6px rgba(217, 119, 6, 0.2)',
    '0 8px 24px rgba(217, 119, 6, 0.15)',
    '0 16px 48px rgba(217, 119, 6, 0.08)',
  ].join(', '),
}

const silk = '"Instrument Serif", Georgia, "Times New Roman", serif'
const silkSans = '"DM Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'

// ── Hooks ────────────────────────────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Google Fonts loader ──────────────────────────────────────────────────
function FontLoader() {
  return (
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s20}px ${LP.s48}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: silk, fontSize: 28, fontWeight: 400,
        color: S.text, fontStyle: 'italic',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: silkSans, fontSize: 14, fontWeight: 500,
              color: hl === link ? S.text : S.textTer,
              transition: `color 0.2s ${springGentle}`,
              cursor: 'default', letterSpacing: '0.01em',
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
      textAlign: 'center', padding: `100px ${LP.s48}px ${LP.s64}px`,
      maxWidth: 880, margin: '0 auto',
    }}>
      {/* Warm ambient glow */}
      <div style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(217, 119, 6, 0.06), transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div style={{
        fontFamily: silkSans, fontSize: 12, fontWeight: 600,
        color: S.accent, letterSpacing: '0.12em', textTransform: 'uppercase',
        marginBottom: LP.s32,
        padding: `${LP.s8}px ${LP.s20}px`, borderRadius: LP.pillRadius,
        background: S.accentSoft,
        boxShadow: '0 0 0 1px rgba(217, 119, 6, 0.12)',
      }}>
        Design studio for code
      </div>
      <h1 style={{
        fontFamily: silk, fontSize: 80, fontWeight: 400,
        color: S.text, lineHeight: 1.05, letterSpacing: '-0.02em',
        margin: 0, textWrap: 'pretty', fontStyle: 'italic',
      }}>
        Where every design<br />lives in code
      </h1>
      <p style={{
        fontFamily: silkSans, fontSize: 18, fontWeight: 400,
        color: S.textSec, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.65, textWrap: 'pretty', maxWidth: 460,
      }}>
        An infinite canvas of live React components.
        No export. No handoff. Just design, then ship.
      </p>
      <div style={{ display: 'flex', gap: LP.s16 }}>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: silkSans, fontWeight: 600,
          fontSize: 15, borderRadius: LP.pillRadius,
          padding: `${LP.s12}px ${LP.s32}px`,
          background: S.accent, color: '#FEFDFB',
          transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.2s ${spring}, box-shadow 0.3s ${springGentle}`,
          boxShadow: bh ? S.btnShadowHover : S.btnShadow,
        }}>
          Install Plugin
        </button>
        <SecondaryButton label="View on GitHub" />
      </div>
    </section>
  )
}

function SecondaryButton({ label }: { label: string }) {
  const [h, hB] = useHover()
  const [a, aB] = usePress()
  return (
    <button {...hB} {...aB} style={{
      border: 'none', cursor: 'default', fontFamily: silkSans, fontWeight: 500,
      fontSize: 15, borderRadius: LP.pillRadius,
      padding: `${LP.s12}px ${LP.s32}px`,
      background: S.surface, color: S.text,
      transform: a ? 'scale(0.96)' : h ? 'scale(1.02)' : 'scale(1)',
      transition: `transform 0.2s ${spring}, box-shadow 0.3s ${springGentle}`,
      boxShadow: h ? S.cardShadowHover : S.cardShadow,
    }}>
      {label}
    </button>
  )
}

// ── Hero Screenshot ──────────────────────────────────────────────────────
function HeroScreenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s48}px ${LP.s80}px`,
    }}>
      <div {...hB} style={{
        borderRadius: 20, overflow: 'hidden',
        transition: `transform 0.4s ${springGentle}, box-shadow 0.5s ${springGentle}`,
        transform: h ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: h ? S.heroShadowHover : S.heroShadow,
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Features — three cards with layered shadows ─────────────────────────
const features = [
  {
    title: 'Live Canvas',
    desc: 'Every frame is a real React component running in the browser. Edit code, see it instantly.',
    num: '01',
  },
  {
    title: 'Annotations',
    desc: 'Click anywhere to leave feedback. Your AI agent picks it up and iterates in real time.',
    num: '02',
  },
  {
    title: 'Iterations',
    desc: 'Every change is versioned. Compare side by side, revert, branch. Nothing is ever lost.',
    num: '03',
  },
]

function Features() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s48}px`,
    }}>
      <h2 style={{
        fontFamily: silk, fontSize: 48, fontWeight: 400, fontStyle: 'italic',
        color: S.text, textAlign: 'center', letterSpacing: '-0.01em',
        margin: `0 0 ${LP.s48}px`, textWrap: 'pretty',
      }}>
        Thoughtfully crafted
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s24 }}>
        {features.map((f, i) => {
          const hovered = hoveredIdx === i
          return (
            <div key={f.title}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                padding: LP.s32, borderRadius: 16,
                background: S.surface, cursor: 'default',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: `transform 0.35s ${spring}, box-shadow 0.4s ${springGentle}`,
                boxShadow: hovered ? S.cardShadowHover : S.cardShadow,
              }}>
              <span style={{
                fontFamily: silkSans, fontSize: 12, fontWeight: 600,
                color: S.accent, letterSpacing: '0.08em',
              }}>{f.num}</span>
              <h3 style={{
                fontFamily: silk, fontSize: 28, fontWeight: 400,
                color: S.text, margin: `${LP.s16}px 0 ${LP.s12}px`,
                fontStyle: 'italic', textWrap: 'pretty',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: silkSans, fontSize: 15, fontWeight: 400,
                color: S.textSec, margin: 0, lineHeight: 1.65,
                textWrap: 'pretty',
              }}>{f.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Quote ────────────────────────────────────────────────────────────────
function Quote() {
  return (
    <section style={{
      maxWidth: 800, margin: '0 auto',
      padding: `${LP.s80}px ${LP.s48}px`, textAlign: 'center',
    }}>
      <div style={{
        width: 48, height: 2, background: S.accent, margin: '0 auto',
        marginBottom: LP.s40, borderRadius: 1,
        boxShadow: '0 0 12px rgba(217, 119, 6, 0.15)',
      }} />
      <p style={{
        fontFamily: silk, fontSize: 40, fontWeight: 400, fontStyle: 'italic',
        color: S.text, lineHeight: 1.35, letterSpacing: '-0.01em',
        margin: 0, textWrap: 'pretty',
      }}>
        "The future of UI design<br />is code."
      </p>
    </section>
  )
}

// ── Secondary Screenshots ───────────────────────────────────────────────
function SecondaryScreenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const cardStyle = (hovered: boolean): React.CSSProperties => ({
    borderRadius: 16, overflow: 'hidden', cursor: 'default',
    transition: `transform 0.35s ${spring}, box-shadow 0.4s ${springGentle}`,
    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
    boxShadow: hovered ? S.cardShadowHover : S.cardShadow,
  })

  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s48}px ${LP.s80}px`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s24 }}>
        <div {...h1B} style={cardStyle(h1)}>
          <img src={pulseComponents} alt="Component matrix" style={{ width: '100%', display: 'block' }} />
        </div>
        <div {...h2B} style={cardStyle(h2)}>
          <img src={pulseSettings} alt="Design settings" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

// ── Stats ────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: '0', unit: 'handoffs', desc: 'Design is the code' },
    { value: '< 60s', unit: '', desc: 'From idea to live component' },
    { value: '\u221E', unit: 'canvas', desc: 'Infinite design surface' },
  ]
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s48}px`, background: S.bgWarm,
      borderRadius: 20, margin: `0 ${LP.s48}px`, marginBottom: LP.s80,
      boxShadow: [
        'inset 0 0 0 1px rgba(28, 25, 23, 0.03)',
        '0 1px 2px rgba(28, 25, 23, 0.03)',
      ].join(', '),
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s32 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: silk, fontSize: 56, fontWeight: 400, fontStyle: 'italic',
              color: S.text, letterSpacing: '-0.02em', lineHeight: 1,
            }}>
              {s.value}
              {s.unit && <span style={{
                fontSize: 20, color: S.textTer, fontStyle: 'normal',
                fontFamily: silkSans, marginLeft: 4,
              }}>{s.unit}</span>}
            </div>
            <div style={{
              fontFamily: silkSans, fontSize: 14, color: S.textSec,
              marginTop: LP.s8, textWrap: 'pretty',
            }}>{s.desc}</div>
          </div>
        ))}
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
      padding: `${LP.s48}px ${LP.s48}px ${LP.s80}px`, textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: silk, fontSize: 44, fontWeight: 400, fontStyle: 'italic',
        color: S.text, margin: `0 0 ${LP.s12}px`,
        letterSpacing: '-0.01em', textWrap: 'pretty',
      }}>
        Start designing
      </h2>
      <p style={{
        fontFamily: silkSans, fontSize: 15, fontWeight: 400,
        color: S.textTer, margin: `0 0 ${LP.s32}px`,
        textWrap: 'pretty',
      }}>
        Free, open source. A Claude Code plugin.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: silkSans, fontWeight: 600,
        fontSize: 16, borderRadius: LP.pillRadius,
        padding: `${LP.s16}px ${LP.s40}px`,
        background: S.accent, color: '#FEFDFB',
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.2s ${spring}, box-shadow 0.3s ${springGentle}`,
        boxShadow: bh ? S.btnShadowHover : S.btnShadow,
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
      padding: `${LP.s24}px ${LP.s48}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: silk, fontSize: 20, fontWeight: 400, fontStyle: 'italic',
        color: S.textTer,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['GitHub', 'Docs'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: silkSans, fontSize: 13, fontWeight: 500,
              color: hl === link ? S.text : S.textTer,
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
export function Silk() {
  return (
    <div style={{
      background: S.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: silkSans, WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <HeroScreenshot />
      <Features />
      <Quote />
      <SecondaryScreenshots />
      <Stats />
      <BottomCTA />
      <Footer />
    </div>
  )
}
