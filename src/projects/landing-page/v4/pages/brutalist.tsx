import { useState } from 'react'
import { LP, spring } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Brutalist — raw, exposed, anti-design. Courier type, thick borders ───
// Exposed grid. No rounded corners. No shadows. Just structure and honesty.
const B = {
  bg: '#F2F0E6',
  surface: '#FAFAF2',
  text: '#111111',
  textSec: '#444444',
  textTer: '#888888',
  border: '#111111',
  borderLight: '#CCCCCC',
  accent: '#FF0000',
  accentBg: 'rgba(255, 0, 0, 0.06)',
}

const bFont = '"Courier Prime", "Courier New", Courier, monospace'
const bDisplay = '"Space Grotesk", -apple-system, system-ui, sans-serif'

// Actually, per the frontend-design skill, I should avoid Space Grotesk.
// Using a more distinctive choice:
const bHeading = '"Anybody", "Arial Black", sans-serif'

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
    <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Anybody:wght@400;900&display=swap" rel="stylesheet" />
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
      borderBottom: `3px solid ${B.border}`,
    }}>
      <span style={{
        fontFamily: bFont, fontSize: 16, fontWeight: 700,
        color: B.text, textTransform: 'uppercase', letterSpacing: '0.15em',
      }}>CANVAI*</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['[Features]', '[Docs]', '[GitHub]'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: bFont, fontSize: 13, fontWeight: 400,
              color: hl === link ? B.accent : B.textSec,
              transition: `color 0.1s ease`, cursor: 'default',
              textDecoration: hl === link ? 'underline' : 'none',
              textDecorationThickness: 2, textUnderlineOffset: 4,
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
      padding: `${LP.s80}px ${LP.s32}px ${LP.s64}px`,
      maxWidth: LP.maxWidth, margin: '0 auto', boxSizing: 'border-box',
    }}>
      {/* Oversized brutalist headline */}
      <h1 style={{
        fontFamily: bHeading, fontSize: 120, fontWeight: 900,
        color: B.text, lineHeight: 0.9, letterSpacing: '-0.04em',
        margin: 0, textTransform: 'uppercase', textWrap: 'pretty',
      }}>
        DESIGN<br />
        <span style={{
          WebkitTextStroke: `3px ${B.text}`,
          WebkitTextFillColor: 'transparent',
        } as React.CSSProperties}>IN CODE</span>
      </h1>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginTop: LP.s32, paddingTop: LP.s32,
        borderTop: `1px solid ${B.borderLight}`,
      }}>
        <p style={{
          fontFamily: bFont, fontSize: 16, fontWeight: 400,
          color: B.textSec, lineHeight: 1.7, margin: 0, maxWidth: 440,
          textWrap: 'pretty',
        }}>
          An infinite canvas where every frame is a live
          React component. No export step. No handoff.
          The design is the code.
        </p>
        <button {...bhB} {...baB} style={{
          border: `3px solid ${B.border}`, cursor: 'default',
          fontFamily: bFont, fontWeight: 700, fontSize: 14,
          textTransform: 'uppercase', letterSpacing: '0.1em',
          borderRadius: 0, padding: `${LP.s16}px ${LP.s32}px`,
          background: ba ? B.border : bh ? B.accentBg : B.surface,
          color: ba ? B.surface : B.text,
          transform: ba ? 'translate(2px, 2px)' : 'translate(0, 0)',
          transition: `all 0.1s ease`,
          boxShadow: ba ? 'none' : `4px 4px 0px ${B.border}`,
        }}>
          Install \u2192
        </button>
      </div>
    </section>
  )
}

// ── Product Shot — raw, no shadows ──────────────────────────────────────
function ProductShot() {
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s32}px ${LP.s64}px`,
    }}>
      <div style={{
        border: `3px solid ${B.border}`,
        overflow: 'hidden',
      }}>
        <img src={pulseDashboard} alt="Canvas" style={{ width: '100%', display: 'block' }} />
      </div>
      <div style={{
        fontFamily: bFont, fontSize: 11, color: B.textTer,
        marginTop: LP.s8, letterSpacing: '0.05em',
      }}>
        Fig. 01 — Canvai infinite canvas, showing live React components
      </div>
    </section>
  )
}

// ── Features — numbered list, typewriter style ──────────────────────────
const features = [
  { title: 'LIVE CANVAS', desc: 'Every frame is a real React component. Edit code, see it instantly.' },
  { title: 'ANNOTATIONS', desc: 'Click anywhere to leave feedback. AI agent iterates in real time.' },
  { title: 'ITERATIONS', desc: 'Every change snapshots a new version. Compare, revert, branch.' },
  { title: 'COMPONENTS', desc: 'See every state of every component. A living specification.' },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s32}px`,
    }}>
      <div style={{
        fontFamily: bFont, fontSize: 12, fontWeight: 700,
        color: B.textTer, letterSpacing: '0.15em', textTransform: 'uppercase',
        marginBottom: LP.s32, paddingBottom: LP.s12,
        borderBottom: `1px solid ${B.borderLight}`,
      }}>INDEX OF FEATURES</div>
      {features.map((f, i) => {
        const hovered = hi === i
        return (
          <div key={f.title}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{
              display: 'flex', gap: LP.s24, alignItems: 'baseline',
              padding: `${LP.s20}px 0`,
              borderBottom: `1px solid ${hovered ? B.border : B.borderLight}`,
              cursor: 'default',
              background: hovered ? B.accentBg : 'transparent',
              transition: 'background 0.1s ease, border-color 0.1s ease',
              marginLeft: hovered ? -8 : 0, marginRight: hovered ? -8 : 0,
              paddingLeft: hovered ? 8 : 0, paddingRight: hovered ? 8 : 0,
            }}>
            <span style={{
              fontFamily: bFont, fontSize: 12, color: hovered ? B.accent : B.textTer,
              minWidth: 32, transition: 'color 0.1s ease',
            }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{
              fontFamily: bFont, fontSize: 16, fontWeight: 700,
              color: B.text, minWidth: 200, letterSpacing: '0.02em',
            }}>{f.title}</span>
            <span style={{
              fontFamily: bFont, fontSize: 14, color: B.textSec,
              flex: 1, textWrap: 'pretty',
            }}>{f.desc}</span>
          </div>
        )
      })}
    </section>
  )
}

// ── Secondary Screenshots ───────────────────────────────────────────────
function SecondaryScreenshots() {
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s32}px ${LP.s64}px`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s16 }}>
        <div>
          <div style={{ border: `2px solid ${B.border}`, overflow: 'hidden' }}>
            <img src={pulseComponents} alt="Components" style={{ width: '100%', display: 'block' }} />
          </div>
          <div style={{ fontFamily: bFont, fontSize: 11, color: B.textTer, marginTop: LP.s8 }}>
            Fig. 02 — Component matrix view
          </div>
        </div>
        <div>
          <div style={{ border: `2px solid ${B.border}`, overflow: 'hidden' }}>
            <img src={pulseSettings} alt="Settings" style={{ width: '100%', display: 'block' }} />
          </div>
          <div style={{ fontFamily: bFont, fontSize: 11, color: B.textTer, marginTop: LP.s8 }}>
            Fig. 03 — Design token settings
          </div>
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
      padding: `${LP.s64}px ${LP.s32}px`,
      borderTop: `3px solid ${B.border}`,
      borderBottom: `3px solid ${B.border}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        <h2 style={{
          fontFamily: bHeading, fontSize: 48, fontWeight: 900,
          color: B.text, margin: 0, textTransform: 'uppercase',
          letterSpacing: '-0.02em', textWrap: 'pretty',
        }}>START NOW</h2>
        <p style={{
          fontFamily: bFont, fontSize: 14, color: B.textSec, marginTop: LP.s8, textWrap: 'pretty',
        }}>Free + open source. A Claude Code plugin.</p>
      </div>
      <button {...bhB} {...baB} style={{
        border: `3px solid ${B.border}`, cursor: 'default',
        fontFamily: bFont, fontWeight: 700, fontSize: 14,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        borderRadius: 0, padding: `${LP.s16}px ${LP.s40}px`,
        background: ba ? B.border : bh ? B.accentBg : B.surface,
        color: ba ? B.surface : B.text,
        transform: ba ? 'translate(2px, 2px)' : 'translate(0, 0)',
        transition: 'all 0.1s ease',
        boxShadow: ba ? 'none' : `4px 4px 0px ${B.border}`,
      }}>
        Install \u2192
      </button>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s24}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: bFont, fontSize: 12, fontWeight: 700,
        color: B.textTer, textTransform: 'uppercase', letterSpacing: '0.1em',
      }}>CANVAI* 2026</span>
      <span style={{
        fontFamily: bFont, fontSize: 12, color: B.textTer,
      }}>Made with Claude Code</span>
    </footer>
  )
}

// ── Main Export ──────────────────────────────────────────────────────────
export function Brutalist() {
  return (
    <div style={{
      background: B.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: bFont, WebkitFontSmoothing: 'antialiased',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <ProductShot />
      <Features />
      <SecondaryScreenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
