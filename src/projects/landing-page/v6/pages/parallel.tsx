import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'
import productDirections from '../../screenshots/product-directions.png'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'

// ── Parallel — Deployment log / Linear changelog ────────────────────────
// Dark background, green accent, left-aligned timeline, monospace labels.
// Vercel deployment page meets Linear changelog. Technical, precise, alive.
const C = {
  bg: '#0C0C0C',
  surface: '#141414',
  surfaceHover: '#1A1A1A',
  text: '#E8E8E6',
  textSec: '#9B9B98',
  textTer: '#5C5C5A',
  border: '#252525',
  borderSoft: '#1E1E1E',
  green: '#22C55E',
  greenDim: '#1A9A48',
  greenGlow: 'rgba(34, 197, 94, 0.15)',
  greenGlowStrong: 'rgba(34, 197, 94, 0.25)',
  shadow1: '0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.2)',
  shadow2: '0 4px 16px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)',
  shadow3: '0 12px 48px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)',
}

const font = '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const mono = '"Geist Mono", "JetBrains Mono", "SF Mono", "Fira Code", Menlo, monospace'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Cursor blink keyframes (injected via style tag) ─────────────────────
const cursorBlinkCSS = `
@keyframes cursorBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@font-face {
  font-family: 'Geist';
  src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist';
  src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/Geist-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Geist Mono';
  src: url('https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/GeistMono-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
`

// ── Timeline dot ────────────────────────────────────────────────────────
function TimelineDot({ active = false }: { active?: boolean }) {
  return (
    <div style={{
      width: 12, height: 12, borderRadius: 12,
      background: active ? C.green : C.border,
      boxShadow: active ? `0 0 8px ${C.greenGlow}, 0 0 2px ${C.green}` : 'none',
      flexShrink: 0,
      position: 'relative',
      zIndex: 1,
    }} />
  )
}

// ── Timeline node wrapper ───────────────────────────────────────────────
function TimelineNode({ children, active = false, last = false }: {
  children: React.ReactNode
  active?: boolean
  last?: boolean
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '12px 1fr',
      gap: 24,
      position: 'relative',
    }}>
      {/* Vertical line + dot */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <TimelineDot active={active} />
        {!last && (
          <div style={{
            width: 1,
            flex: 1,
            background: `linear-gradient(to bottom, ${C.border}, ${C.borderSoft})`,
            marginTop: 0,
          }} />
        )}
      </div>
      {/* Content */}
      <div style={{ paddingBottom: last ? 0 : 64 }}>
        {children}
      </div>
    </div>
  )
}

// ── Nav ─────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px', maxWidth: 720, margin: '0 auto 0 0',
      marginLeft: 'max(48px, calc((100% - 720px) / 2 - 48px + 48px))',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: mono, fontSize: 13, fontWeight: 500,
        color: C.text, letterSpacing: '0.02em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: mono, fontSize: 12, fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — LIVE badge + headline ────────────────────────────────────────
function Hero() {
  return (
    <div style={{ paddingTop: 4 }}>
      {/* LIVE badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '4px 12px 4px 8px',
        background: C.greenGlow,
        borderRadius: 20,
        marginBottom: 24,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: 8,
          background: C.green,
          boxShadow: `0 0 6px ${C.green}`,
        }} />
        <span style={{
          fontFamily: mono, fontSize: 11, fontWeight: 500,
          color: C.green, letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}>Live</span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: font, fontSize: 36, fontWeight: 600,
        color: C.text, lineHeight: 1.2, letterSpacing: '-0.03em',
        margin: '0 0 12px', textWrap: 'pretty',
      }}>
        Design in code.<br />
        Ship what you see.
      </h1>

      {/* Timestamp-style version */}
      <p style={{
        fontFamily: mono, fontSize: 13, fontWeight: 400,
        color: C.textTer, margin: 0, textWrap: 'pretty',
      }}>
        v0.0.35 — February 2026
      </p>

      {/* Subtitle */}
      <p style={{
        fontFamily: font, fontSize: 15, fontWeight: 400,
        color: C.textSec, marginTop: 20, marginBottom: 0,
        lineHeight: 1.6, textWrap: 'pretty', maxWidth: 520,
      }}>
        An infinite, zoomable canvas for Claude Code. See many directions at once, annotate directly on the design, and ship exactly what you see.
      </p>
    </div>
  )
}

// ── Product screenshot ──────────────────────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <div>
      <span style={{
        fontFamily: mono, fontSize: 11, fontWeight: 400,
        color: C.textTer, display: 'block', marginBottom: 16,
        letterSpacing: '0.04em',
      }}>
        canvas.render()
      </span>
      <div {...hB} style={{
        borderRadius: 8, overflow: 'hidden',
        border: `1px solid ${C.border}`,
        boxShadow: h ? C.shadow3 : C.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
      }}>
        <img src={canvasWide} alt="Canvai canvas with multiple design directions" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </div>
  )
}

// ── Features as log entries ─────────────────────────────────────────────
function Features() {
  const [hi, setHi] = useState<number | null>(null)
  const entries = [
    {
      label: 'parallel.render',
      time: '00:00:12',
      title: 'See many directions at once',
      desc: 'Five layouts on one infinite canvas. Compare without switching tabs or scrolling chat history.',
    },
    {
      label: 'annotation.push',
      time: '00:00:24',
      title: 'Point and refine',
      desc: 'Click anywhere on the canvas and describe the change. Watch the code update in real time.',
    },
    {
      label: 'version.freeze',
      time: '00:00:36',
      title: 'Every version preserved',
      desc: 'Nothing is overwritten. Go back to any iteration. Branch a direction. Your creative history stays intact.',
    },
  ]

  return (
    <div>
      <span style={{
        fontFamily: mono, fontSize: 11, fontWeight: 400,
        color: C.textTer, display: 'block', marginBottom: 20,
        letterSpacing: '0.04em',
      }}>
        features.log
      </span>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>
        {entries.map((f, i) => (
          <div
            key={f.label}
            onMouseEnter={() => setHi(i)}
            onMouseLeave={() => setHi(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '20px 1fr',
              gap: 16,
              padding: '16px 0',
              borderTop: `1px solid ${C.borderSoft}`,
              borderBottom: i === entries.length - 1 ? `1px solid ${C.borderSoft}` : 'none',
              cursor: 'default',
            }}
          >
            {/* Green checkmark */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: 2,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7.5L5.5 10L11 4"
                  stroke={C.green}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4,
              }}>
                <span style={{
                  fontFamily: mono, fontSize: 12, fontWeight: 500,
                  color: hi === i ? C.text : C.textSec,
                  transition: `color 0.15s ${springCSS}`,
                }}>{f.label}</span>
                <span style={{
                  fontFamily: mono, fontSize: 11, fontWeight: 400,
                  color: C.textTer,
                }}>{f.time}</span>
              </div>
              <h3 style={{
                fontFamily: font, fontSize: 14, fontWeight: 500,
                color: C.text, margin: '0 0 4px', textWrap: 'pretty',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: font, fontSize: 13, fontWeight: 400,
                color: hi === i ? C.textSec : C.textTer, margin: 0,
                lineHeight: 1.55, textWrap: 'pretty',
                transition: `color 0.15s ${springCSS}`,
              }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Terminal block ──────────────────────────────────────────────────────
function Terminal() {
  return (
    <div>
      <span style={{
        fontFamily: mono, fontSize: 11, fontWeight: 400,
        color: C.textTer, display: 'block', marginBottom: 16,
        letterSpacing: '0.04em',
      }}>
        install.sh
      </span>
      <div style={{
        background: C.surface,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        overflow: 'hidden',
      }}>
        {/* Terminal header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 16px',
          borderBottom: `1px solid ${C.borderSoft}`,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: 8, background: '#3B3B3B' }} />
          <div style={{ width: 8, height: 8, borderRadius: 8, background: '#3B3B3B' }} />
          <div style={{ width: 8, height: 8, borderRadius: 8, background: '#3B3B3B' }} />
          <span style={{
            fontFamily: mono, fontSize: 11, fontWeight: 400,
            color: C.textTer, marginLeft: 8,
          }}>terminal</span>
        </div>
        {/* Terminal body */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.textTer }}>$ </span>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.text }}>
              npx canvai new my-project
            </span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>
              {'\u2713'} Scaffolded project in ./my-project
            </span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.textTer }}>$ </span>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.text }}>
              npx canvai design
            </span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.green }}>
              {'\u2713'} Dev server running on :5173
            </span>
          </div>
          <div style={{ marginBottom: 0 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.textTer }}>$ </span>
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 16,
                background: C.green,
                verticalAlign: 'text-bottom',
                animation: 'cursorBlink 1.2s step-end infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Secondary screenshots grid ──────────────────────────────────────────
function SecondaryShots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  return (
    <div>
      <span style={{
        fontFamily: mono, fontSize: 11, fontWeight: 400,
        color: C.textTer, display: 'block', marginBottom: 16,
        letterSpacing: '0.04em',
      }}>
        output.preview
      </span>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
      }}>
        <div {...h1B} style={{
          borderRadius: 8, overflow: 'hidden',
          border: `1px solid ${C.border}`,
          boxShadow: h1 ? C.shadow3 : C.shadow1,
          transform: h1 ? 'translateY(-4px)' : 'translateY(0)',
          transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
        }}>
          <img src={productDirections} alt="Multiple design directions on canvas" style={{
            width: '100%', display: 'block',
          }} />
        </div>
        <div {...h2B} style={{
          borderRadius: 8, overflow: 'hidden',
          border: `1px solid ${C.border}`,
          boxShadow: h2 ? C.shadow3 : C.shadow1,
          transform: h2 ? 'translateY(-4px)' : 'translateY(0)',
          transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
        }}>
          <img src={pulseDashboard} alt="Pulse dashboard design on canvas" style={{
            width: '100%', display: 'block',
          }} />
        </div>
      </div>
    </div>
  )
}

// ── CTA — Deploy your canvas ────────────────────────────────────────────
function CTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <div style={{ textAlign: 'left' }}>
      <h2 style={{
        fontFamily: font, fontSize: 24, fontWeight: 600,
        color: C.text, lineHeight: 1.25, letterSpacing: '-0.02em',
        margin: '0 0 12px', textWrap: 'pretty',
      }}>
        Deploy your canvas
      </h2>
      <p style={{
        fontFamily: font, fontSize: 14, fontWeight: 400,
        color: C.textSec, margin: '0 0 28px', textWrap: 'pretty',
        lineHeight: 1.6,
      }}>
        One command to start. Every direction lives forever.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none',
        cursor: 'default',
        fontFamily: mono,
        fontWeight: 500,
        fontSize: 13,
        borderRadius: 8,
        padding: '12px 28px',
        background: C.green,
        color: C.bg,
        letterSpacing: '0.01em',
        transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh
          ? `0 0 24px ${C.greenGlowStrong}, 0 0 8px ${C.greenGlow}, ${C.shadow2}`
          : `0 0 12px ${C.greenGlow}`,
      }}>npx canvai new</button>
    </div>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 0',
      maxWidth: 720,
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${C.borderSoft}`,
      marginTop: 80,
    }}>
      <span style={{
        fontFamily: mono, fontSize: 12, fontWeight: 500,
        color: C.textTer,
      }}>canvai</span>
      <div style={{ display: 'flex', gap: 20 }}>
        {['GitHub', 'Docs'].map(l => (
          <span key={l}
            onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: mono, fontSize: 12, fontWeight: 400, cursor: 'default',
              color: hl === l ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main export ─────────────────────────────────────────────────────────
export function Parallel() {
  return (
    <div style={{
      background: C.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: font, WebkitFontSmoothing: 'antialiased',
      cursor: 'default',
    }}>
      <style>{cursorBlinkCSS}</style>
      <Nav />

      {/* Timeline container */}
      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '64px 48px 80px',
        boxSizing: 'border-box',
      }}>
        {/* Node 1: Hero */}
        <TimelineNode active>
          <Hero />
        </TimelineNode>

        {/* Node 2: Product screenshot */}
        <TimelineNode active>
          <ProductShot />
        </TimelineNode>

        {/* Node 3: Features log */}
        <TimelineNode active>
          <Features />
        </TimelineNode>

        {/* Node 4: Terminal */}
        <TimelineNode active>
          <Terminal />
        </TimelineNode>

        {/* Node 5: Secondary screenshots */}
        <TimelineNode active>
          <SecondaryShots />
        </TimelineNode>

        {/* Node 6: CTA */}
        <TimelineNode active last>
          <CTA />
        </TimelineNode>

        <Footer />
      </div>
    </div>
  )
}
