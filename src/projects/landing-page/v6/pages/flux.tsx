import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'

// ── Flux — Gradient mesh + glassmorphism ─────────────────────────────────
// Animated CSS gradient mesh background. Glass cards with backdrop-filter.
// Like peering through frosted glass at a living aurora.
const C = {
  // Mesh colors
  indigo: '#312E81',
  violet: '#5B21B6',
  rose: '#9F1239',
  amber: '#92400E',
  // Surface
  bg: '#1A1033',
  glass: 'rgba(255,255,255,0.08)',
  glassHover: 'rgba(255,255,255,0.12)',
  glassBorder: 'rgba(255,255,255,0.12)',
  glassBorderHover: 'rgba(255,255,255,0.20)',
  glassStrong: 'rgba(255,255,255,0.15)',
  // Text
  text: '#F5F3FF',
  textSec: 'rgba(245,243,255,0.72)',
  textTer: 'rgba(245,243,255,0.44)',
  // Accents
  glow: 'rgba(244,187,213,0.25)',
  glowSoft: 'rgba(244,187,213,0.12)',
  accentPink: '#F9A8D4',
  // Shadows
  shadow1: '0 2px 8px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.05)',
  shadow2: '0 8px 32px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.08)',
  shadow3: '0 20px 60px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.10)',
}

const font = '"General Sans", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
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

// ── Keyframes injected via style tag ────────────────────────────────────
const meshKeyframes = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@keyframes meshRotate {
  0% {
    background-position: 0% 0%, 100% 100%, 50% 0%, 0% 50%;
  }
  25% {
    background-position: 50% 30%, 0% 50%, 100% 80%, 80% 0%;
  }
  50% {
    background-position: 100% 100%, 50% 0%, 0% 50%, 50% 100%;
  }
  75% {
    background-position: 30% 50%, 100% 80%, 80% 20%, 0% 50%;
  }
  100% {
    background-position: 0% 0%, 100% 100%, 50% 0%, 0% 50%;
  }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
`

// ── Gradient border wrapper ─────────────────────────────────────────────
function GradientBorderCard({
  children,
  hovered = false,
  style,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode
  hovered?: boolean
  style?: React.CSSProperties
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        borderRadius: 24,
        padding: 1,
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.24), rgba(249,168,212,0.32), rgba(255,255,255,0.16))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(249,168,212,0.16), rgba(255,255,255,0.08))',
        transition: `all 0.35s ${springCSS}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'default',
        ...style,
      }}
    >
      <div style={{
        borderRadius: 23,
        background: C.glass,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        height: '100%',
      }}>
        {children}
      </div>
    </div>
  )
}

// ── Nav — glass pill bar ────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  const [ctaH, ctaHB] = useHover()
  const [ctaP, ctaPB] = usePress()
  return (
    <nav style={{
      position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 28px', borderRadius: 100,
      background: 'rgba(255,255,255,0.06)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: `1px solid ${C.glassBorder}`,
      width: 'calc(100% - 80px)', maxWidth: 960,
      boxSizing: 'border-box',
      boxShadow: '0 8px 32px rgba(0,0,0,0.20)',
    }}>
      <span style={{
        fontFamily: font, fontSize: 17, fontWeight: 700,
        color: C.text, letterSpacing: '-0.02em',
        WebkitFontSmoothing: 'antialiased' as any,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {['Features', 'Install', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 14, fontWeight: 500,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.2s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
              WebkitFontSmoothing: 'antialiased' as any,
            }}>{link}</span>
        ))}
        <button {...ctaHB} {...ctaPB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 600,
          fontSize: 13, borderRadius: 100, padding: '8px 20px',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          color: C.text,
          transform: ctaP ? 'scale(0.92)' : ctaH ? 'scale(1.04)' : 'scale(1)',
          transition: `all 0.2s ${springCSS}`,
          boxShadow: ctaH ? `0 0 20px ${C.glowSoft}` : 'none',
          WebkitFontSmoothing: 'antialiased' as any,
        }}>Get Started</button>
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  const [bh1, bhB1] = useHover()
  const [bp1, bpB1] = usePress()
  const [bh2, bhB2] = useHover()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: '160px 32px 80px',
      maxWidth: 900, margin: '0 auto', position: 'relative',
    }}>
      {/* Ambient glow behind headline */}
      <div style={{
        position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300, borderRadius: '50%', pointerEvents: 'none',
        background: `radial-gradient(ellipse, ${C.glow}, transparent 70%)`,
        filter: 'blur(80px)',
        animation: 'glowPulse 6s ease-in-out infinite',
      }} />
      <div style={{
        fontFamily: mono, fontSize: 12, fontWeight: 500, color: C.accentPink,
        padding: '8px 20px', borderRadius: 100,
        background: 'rgba(249,168,212,0.08)',
        border: '1px solid rgba(249,168,212,0.16)',
        marginBottom: 32, letterSpacing: '0.04em',
        textTransform: 'uppercase' as const,
        WebkitFontSmoothing: 'antialiased' as any,
      }}>Claude Code + Canvas</div>
      <h1 style={{
        fontFamily: font, fontSize: 72, fontWeight: 800,
        color: C.text, lineHeight: 1.04, letterSpacing: '-0.04em',
        margin: 0, textWrap: 'pretty', position: 'relative',
        WebkitFontSmoothing: 'antialiased' as any,
      }}>
        The infinite canvas<br />for design
      </h1>
      <p style={{
        fontFamily: font, fontSize: 19, fontWeight: 400,
        color: C.textSec, marginTop: 24, marginBottom: 48,
        lineHeight: 1.65, textWrap: 'pretty', maxWidth: 520,
        position: 'relative',
        WebkitFontSmoothing: 'antialiased' as any,
      }}>
        Describe a UI to Claude Code. See five directions at once on a
        zoomable canvas. Annotate, iterate, ship.
      </p>
      <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
        <button {...bhB1} {...bpB1} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 600,
          fontSize: 15, borderRadius: 100, padding: '16px 36px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.16), rgba(249,168,212,0.20))',
          backdropFilter: 'blur(20px)',
          color: C.text,
          transform: bp1 ? 'scale(0.92)' : bh1 ? 'scale(1.04)' : 'scale(1)',
          transition: `all 0.2s ${springCSS}`,
          boxShadow: bh1
            ? `0 8px 32px rgba(249,168,212,0.20), 0 0 0 1px rgba(255,255,255,0.16)`
            : `0 2px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.10)`,
          WebkitFontSmoothing: 'antialiased' as any,
        }}>Install Plugin</button>
        <button {...bhB2} style={{
          border: `1px solid ${bh2 ? C.glassBorderHover : C.glassBorder}`,
          cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 15, borderRadius: 100, padding: '16px 36px',
          background: 'transparent',
          color: C.textSec,
          transition: `all 0.2s ${springCSS}`,
          WebkitFontSmoothing: 'antialiased' as any,
        }}>View Source</button>
      </div>
    </section>
  )
}

// ── Product screenshot in glass frame ───────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 32px',
    }}>
      <div
        {...hB}
        style={{
          position: 'relative', borderRadius: 24, padding: 2,
          background: h
            ? 'linear-gradient(135deg, rgba(249,168,212,0.40), rgba(91,33,182,0.40), rgba(159,18,57,0.30), rgba(146,64,14,0.30))'
            : 'linear-gradient(135deg, rgba(249,168,212,0.24), rgba(91,33,182,0.24), rgba(159,18,57,0.16), rgba(146,64,14,0.16))',
          transition: `all 0.4s ${springCSS}`,
          transform: h ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: h
            ? `0 32px 80px rgba(0,0,0,0.40), 0 0 60px ${C.glowSoft}`
            : '0 12px 48px rgba(0,0,0,0.30)',
          cursor: 'default',
        }}
      >
        <div style={{
          borderRadius: 22, overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
          <img src={canvasWide} alt="Canvai Canvas" style={{
            width: '100%', display: 'block',
          }} />
        </div>
      </div>
    </section>
  )
}

// ── Features — 3 glass cards ────────────────────────────────────────────
const features = [
  {
    color: 'linear-gradient(135deg, #818CF8, #6366F1)',
    title: 'Infinite Canvas',
    desc: 'Pan, zoom, and arrange every design on a spatial surface. See all directions at once.',
  },
  {
    color: 'linear-gradient(135deg, #F472B6, #EC4899)',
    title: 'Live Annotations',
    desc: 'Click anywhere to leave feedback. Your AI agent picks up annotations and iterates live.',
  },
  {
    color: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
    title: 'Version History',
    desc: 'Every iteration is preserved. Compare, revert, or branch at any point in your design.',
  },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto',
      padding: '80px 32px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {features.map((f, i) => {
          const hovered = hi === i
          return (
            <GradientBorderCard
              key={f.title}
              hovered={hovered}
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
            >
              <div style={{ padding: 32 }}>
                {/* Icon placeholder — colored circle */}
                <div style={{
                  width: 48, height: 48, borderRadius: 16,
                  background: f.color,
                  marginBottom: 24, opacity: hovered ? 1 : 0.8,
                  transition: `opacity 0.2s ${springCSS}`,
                  boxShadow: hovered ? `0 4px 20px rgba(0,0,0,0.20)` : 'none',
                }} />
                <h3 style={{
                  fontFamily: font, fontSize: 20, fontWeight: 700,
                  color: C.text, margin: '0 0 12px', textWrap: 'pretty',
                  WebkitFontSmoothing: 'antialiased' as any,
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: font, fontSize: 15, fontWeight: 400,
                  color: C.textSec, margin: 0, lineHeight: 1.6, textWrap: 'pretty',
                  WebkitFontSmoothing: 'antialiased' as any,
                }}>{f.desc}</p>
              </div>
            </GradientBorderCard>
          )
        })}
      </div>
    </section>
  )
}

// ── Gradient divider ────────────────────────────────────────────────────
function GradientDivider() {
  return (
    <div style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 32px',
    }}>
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(249,168,212,0.32), rgba(129,140,248,0.32), rgba(251,191,36,0.24), transparent)',
      }} />
    </div>
  )
}

// ── Stats — 4 glass cards with oversized numbers ────────────────────────
const stats = [
  { number: '5x', label: 'More directions per session' },
  { number: '<2s', label: 'Time to first render' },
  { number: '100%', label: 'React components, not mockups' },
  { number: '0', label: 'Prototyping tools needed' },
]

function Stats() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto',
      padding: '80px 32px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {stats.map((s, i) => {
          const hovered = hi === i
          return (
            <GradientBorderCard
              key={s.label}
              hovered={hovered}
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
            >
              <div style={{
                padding: 32, display: 'flex', flexDirection: 'column',
                alignItems: 'center', textAlign: 'center',
              }}>
                <span style={{
                  fontFamily: font, fontSize: 48, fontWeight: 800,
                  color: C.text, lineHeight: 1,
                  letterSpacing: '-0.04em',
                  marginBottom: 12,
                  WebkitFontSmoothing: 'antialiased' as any,
                  background: 'linear-gradient(135deg, #F5F3FF, #F9A8D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{s.number}</span>
                <span style={{
                  fontFamily: font, fontSize: 14, fontWeight: 500,
                  color: C.textTer, textWrap: 'pretty',
                  WebkitFontSmoothing: 'antialiased' as any,
                }}>{s.label}</span>
              </div>
            </GradientBorderCard>
          )
        })}
      </div>
    </section>
  )
}

// ── Code install — glass terminal card ──────────────────────────────────
function CodeInstall() {
  const [h, hB] = useHover()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText('claude plugin marketplace install canvai')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      maxWidth: 640, margin: '0 auto', padding: '0 32px 80px',
    }}>
      <GradientBorderCard hovered={h} onMouseEnter={hB.onMouseEnter} onMouseLeave={hB.onMouseLeave}>
        <div style={{ padding: 32 }}>
          {/* Terminal title bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: 'rgba(255,255,255,0.12)' }} />
            <div style={{ width: 12, height: 12, borderRadius: 12, background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ width: 12, height: 12, borderRadius: 12, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{
              fontFamily: mono, fontSize: 11, color: C.textTer,
              marginLeft: 8, WebkitFontSmoothing: 'antialiased' as any,
            }}>terminal</span>
          </div>
          {/* Command */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.04)', borderRadius: 12,
            padding: '16px 20px',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <code style={{
              fontFamily: mono, fontSize: 14, color: C.text,
              WebkitFontSmoothing: 'antialiased' as any,
            }}>
              <span style={{ color: C.textTer }}>$ </span>
              claude plugin marketplace install canvai
            </code>
            <button onClick={handleCopy} style={{
              border: 'none', cursor: 'default',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 8, padding: '6px 12px',
              fontFamily: mono, fontSize: 11,
              color: copied ? C.accentPink : C.textTer,
              transition: `all 0.2s ${springCSS}`,
              WebkitFontSmoothing: 'antialiased' as any,
            }}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <p style={{
            fontFamily: font, fontSize: 13, color: C.textTer,
            marginTop: 16, marginBottom: 0, textWrap: 'pretty',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased' as any,
          }}>One command. Free and open source.</p>
        </div>
      </GradientBorderCard>
    </section>
  )
}

// ── Bottom CTA ──────────────────────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [bp, bpB] = usePress()
  return (
    <section style={{
      maxWidth: 700, margin: '0 auto', textAlign: 'center',
      padding: '64px 32px 80px', position: 'relative',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 240, borderRadius: '50%', pointerEvents: 'none',
        background: `radial-gradient(ellipse, ${C.glow}, transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      <h2 style={{
        fontFamily: font, fontSize: 48, fontWeight: 800,
        color: C.text, letterSpacing: '-0.03em',
        margin: '0 0 16px', textWrap: 'pretty', position: 'relative',
        WebkitFontSmoothing: 'antialiased' as any,
      }}>Start designing today</h2>
      <p style={{
        fontFamily: font, fontSize: 17, color: C.textSec,
        margin: '0 0 40px', textWrap: 'pretty', position: 'relative',
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased' as any,
      }}>
        The canvas for Claude Code. Free, open source, one install.
      </p>
      {/* Gradient-border pill button */}
      <div
        {...bhB} {...bpB}
        style={{
          display: 'inline-block', position: 'relative',
          borderRadius: 100, padding: 2,
          background: bh
            ? 'linear-gradient(135deg, rgba(249,168,212,0.56), rgba(129,140,248,0.48), rgba(249,168,212,0.40))'
            : 'linear-gradient(135deg, rgba(249,168,212,0.32), rgba(129,140,248,0.28), rgba(249,168,212,0.24))',
          transform: bp ? 'scale(0.92)' : bh ? 'scale(1.04)' : 'scale(1)',
          transition: `all 0.2s ${springCSS}`,
          boxShadow: bh ? `0 8px 40px rgba(249,168,212,0.20)` : 'none',
          cursor: 'default',
        }}
      >
        <div style={{
          borderRadius: 98, padding: '16px 48px',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}>
          <span style={{
            fontFamily: font, fontSize: 16, fontWeight: 600,
            color: C.text,
            WebkitFontSmoothing: 'antialiased' as any,
          }}>Install Plugin</span>
        </div>
      </div>
    </section>
  )
}

// ── Footer — glass pill bar ─────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      maxWidth: 960, margin: '0 auto 40px', padding: '0 32px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 28px', borderRadius: 100,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <span style={{
          fontFamily: font, fontSize: 15, fontWeight: 700, color: C.textTer,
          WebkitFontSmoothing: 'antialiased' as any,
        }}>canvai</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['GitHub', 'Docs', 'Plugin'].map(l => (
            <span key={l}
              onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
              style={{
                fontFamily: font, fontSize: 13, fontWeight: 500,
                color: hl === l ? C.textSec : C.textTer,
                transition: `color 0.2s ${springCSS}`,
                cursor: 'default', textWrap: 'pretty',
                WebkitFontSmoothing: 'antialiased' as any,
              }}>{l}</span>
          ))}
        </div>
        <span style={{
          fontFamily: font, fontSize: 12, color: C.textTer,
          WebkitFontSmoothing: 'antialiased' as any,
        }}>Built for designers</span>
      </div>
    </footer>
  )
}

// ── Main — Flux ─────────────────────────────────────────────────────────
export function Flux() {
  return (
    <div style={{
      minHeight: '100%', position: 'relative', overflow: 'hidden',
      cursor: 'default', backgroundColor: C.bg,
    }}>
      {/* Injected keyframes */}
      <style>{meshKeyframes}</style>

      {/* Animated gradient mesh background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 30%, ${C.indigo} 0%, transparent 60%),
          radial-gradient(ellipse 70% 50% at 80% 70%, ${C.violet} 0%, transparent 55%),
          radial-gradient(ellipse 60% 60% at 50% 10%, ${C.rose} 0%, transparent 50%),
          radial-gradient(ellipse 50% 50% at 10% 80%, ${C.amber} 0%, transparent 50%)
        `,
        backgroundColor: C.bg,
        backgroundSize: '200% 200%, 200% 200%, 200% 200%, 200% 200%',
        animation: 'meshRotate 20s ease-in-out infinite',
      }} />

      {/* Noise / grain overlay for texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        opacity: 0.03, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: 256,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Nav />
        <Hero />
        <ProductShot />
        <Features />
        <GradientDivider />
        <Stats />
        <GradientDivider />
        <CodeInstall />
        <BottomCTA />
        <Footer />
      </div>
    </div>
  )
}
