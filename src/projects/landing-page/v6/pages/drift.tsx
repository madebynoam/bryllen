import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'

// ── Drift — Linear App Vibes ────────────────────────────────────────────
// Near-black bg, purple-to-blue gradient hero, command palette CTA,
// glass cards, noise grain overlay. Linear.app-level craft.
const C = {
  bg: '#09090B',
  surface: '#0F0F12',
  surfaceGlass: 'rgba(255, 255, 255, 0.03)',
  surfaceGlassHover: 'rgba(255, 255, 255, 0.06)',
  text: '#EDEDEF',
  textSec: '#8B8B8E',
  textTer: '#5C5C5F',
  border: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(255, 255, 255, 0.10)',
  accent: '#8B5CF6',
  accentSoft: 'rgba(139, 92, 246, 0.12)',
  accentBorder: 'rgba(139, 92, 246, 0.20)',
  accentGlow: '0 0 40px rgba(139, 92, 246, 0.15), 0 0 80px rgba(139, 92, 246, 0.05)',
  gradientText: 'linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 40%, #6366F1 70%, #818CF8 100%)',
  shadow1: '0 1px 2px rgba(0,0,0,0.4)',
  shadow2: '0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)',
  shadow3: '0 16px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
}

const inter = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const jetbrains = '"JetBrains Mono", "SF Mono", "Fira Code", Menlo, monospace'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// Noise overlay as inline SVG data URI
const noiseOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Google Fonts link injector ──────────────────────────────────────────
function FontLoader() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  )
}

// ── Pill CTA with command palette aesthetic ──────────────────────────────
function PillCTA({ label, shortcut, large }: { label: string; shortcut?: string; large?: boolean }) {
  const [h, hB] = useHover()
  const [p, pB] = usePress()
  const sz = large ? 16 : 14
  const pad = large ? '12px 28px' : '8px 20px'
  return (
    <button {...hB} {...pB} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      border: `1px solid ${h ? C.borderHover : C.border}`,
      borderRadius: 40,
      padding: pad,
      background: h ? C.surfaceGlassHover : C.surfaceGlass,
      cursor: 'default',
      fontFamily: inter, fontSize: sz, fontWeight: 500,
      color: C.text,
      transform: p ? 'scale(0.96)' : h ? 'scale(1.02)' : 'scale(1)',
      transition: `transform 0.2s ${springCSS}, background 0.2s ease, border-color 0.2s ease, box-shadow 0.3s ease`,
      boxShadow: h ? C.accentGlow : 'none',
      textWrap: 'pretty',
    }}>
      {label}
      {shortcut && (
        <span style={{
          fontFamily: jetbrains, fontSize: 11, fontWeight: 400,
          color: C.textTer,
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: 4,
          padding: '2px 6px',
          lineHeight: 1,
        }}>{shortcut}</span>
      )}
    </button>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: inter, fontSize: 15, fontWeight: 600,
        color: C.text, letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: inter, fontSize: 13, fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
        <PillCTA label="Get started" shortcut="K" />
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: '120px 48px 80px',
      maxWidth: 720, margin: '0 auto',
    }}>
      <span style={{
        fontFamily: jetbrains, fontSize: 12, fontWeight: 400,
        color: C.accent, letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 20, textWrap: 'pretty',
      }}>design canvas for claude code</span>
      <h1 style={{
        fontFamily: inter, fontSize: 64, fontWeight: 600,
        lineHeight: 1.05, letterSpacing: '-0.04em',
        margin: 0,
        background: C.gradientText,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textWrap: 'pretty',
      }}>
        See every direction at once
      </h1>
      <p style={{
        fontFamily: inter, fontSize: 18, fontWeight: 400,
        color: C.textSec, marginTop: 24, marginBottom: 40,
        lineHeight: 1.65, maxWidth: 520, textWrap: 'pretty',
      }}>
        An infinite, zoomable canvas where every Claude Code generation
        lives as a frame you can see side by side.
      </p>
      <PillCTA label="Start designing" shortcut="K" large />
    </section>
  )
}

// ── Product screenshot ───────────────────────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1120, margin: '0 auto', padding: '0 48px 80px',
      boxSizing: 'border-box',
    }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${h ? C.borderHover : C.border}`,
        boxShadow: h ? `${C.shadow3}, ${C.accentGlow}` : C.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.4s ${springCSS}, box-shadow 0.4s ease, border-color 0.3s ease`,
      }}>
        <img src={canvasWide} alt="Canvai canvas showing multiple design directions" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Stats bar ────────────────────────────────────────────────────────────
const stats = [
  { value: '0', label: 'Handoffs' },
  { value: '< 60s', label: 'To Live' },
  { value: '\u221E', label: 'Canvas' },
  { value: '100%', label: 'React' },
]

function Stats() {
  return (
    <section style={{
      maxWidth: 1120, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            padding: '36px 0',
            textAlign: 'center',
            borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : 'none',
          }}>
            <div style={{
              fontFamily: jetbrains, fontSize: 36, fontWeight: 500,
              color: C.text, lineHeight: 1, marginBottom: 8,
              letterSpacing: '-0.02em',
            }}>{s.value}</div>
            <div style={{
              fontFamily: jetbrains, fontSize: 11, fontWeight: 400,
              color: C.textTer, textTransform: 'uppercase',
              letterSpacing: '0.08em', textWrap: 'pretty',
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Features — Glass cards with backdrop-blur ────────────────────────────
const features = [
  {
    tag: '01',
    title: 'Compare, don\u2019t choose',
    desc: 'Five layouts on one canvas. Zoom in, zoom out. Compare without losing context or scrolling through chat.',
  },
  {
    tag: '02',
    title: 'Point and refine',
    desc: 'Click anywhere on the canvas and describe the change. No tickets, no handoffs. The code updates while you watch.',
  },
  {
    tag: '03',
    title: 'Every version preserved',
    desc: 'Nothing is overwritten. Go back to Tuesday. Branch a direction. Your entire creative history stays intact.',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{
      padding: 32,
      borderRadius: 12,
      border: `1px solid ${h ? C.accentBorder : C.border}`,
      background: h ? C.surfaceGlassHover : C.surfaceGlass,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: h ? `${C.shadow2}, 0 0 32px rgba(139, 92, 246, 0.08)` : C.shadow1,
      transform: h ? 'translateY(-4px)' : 'translateY(0)',
      transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease`,
      cursor: 'default',
    }}>
      <span style={{
        fontFamily: jetbrains, fontSize: 11, fontWeight: 400,
        color: C.accent, display: 'block', marginBottom: 16,
        letterSpacing: '0.04em',
      }}>{feature.tag}</span>
      <h3 style={{
        fontFamily: inter, fontSize: 18, fontWeight: 600,
        color: C.text, margin: '0 0 12px',
        letterSpacing: '-0.01em', textWrap: 'pretty',
      }}>{feature.title}</h3>
      <p style={{
        fontFamily: inter, fontSize: 14, fontWeight: 400,
        color: h ? C.textSec : C.textTer, margin: 0,
        lineHeight: 1.65, textWrap: 'pretty',
        transition: `color 0.3s ease`,
      }}>{feature.desc}</p>
    </div>
  )
}

function Features() {
  return (
    <section style={{
      maxWidth: 1120, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: jetbrains, fontSize: 11, fontWeight: 400,
        color: C.textTer, textTransform: 'uppercase',
        letterSpacing: '0.08em', display: 'block',
        marginBottom: 32, textWrap: 'pretty',
      }}>Features</span>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
      }}>
        {features.map((f, i) => (
          <FeatureCard key={f.tag} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}

// ── Code block — terminal install command ────────────────────────────────
function CodeBlock() {
  const [h, hB] = useHover()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText('npx canvai new my-project')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      maxWidth: 640, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <div {...hB} onClick={handleCopy} style={{
        padding: '20px 24px',
        borderRadius: 12,
        border: `1px solid ${h ? C.borderHover : C.border}`,
        background: C.surface,
        boxShadow: h ? C.shadow2 : C.shadow1,
        cursor: 'default',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
        transition: `box-shadow 0.3s ease, border-color 0.3s ease`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: jetbrains, fontSize: 13, fontWeight: 400,
            color: C.textTer,
          }}>$</span>
          <span style={{
            fontFamily: jetbrains, fontSize: 13, fontWeight: 400,
            color: C.text,
          }}>npx canvai new my-project</span>
        </div>
        <span style={{
          fontFamily: jetbrains, fontSize: 11, fontWeight: 400,
          color: copied ? C.accent : C.textTer,
          transition: `color 0.2s ease`,
        }}>{copied ? 'copied' : 'copy'}</span>
      </div>
    </section>
  )
}

// ── Bottom CTA ───────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto', textAlign: 'center',
      padding: '0 48px 96px', boxSizing: 'border-box',
    }}>
      <h2 style={{
        fontFamily: inter, fontSize: 40, fontWeight: 600,
        lineHeight: 1.1, letterSpacing: '-0.03em',
        margin: '0 0 16px',
        background: C.gradientText,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textWrap: 'pretty',
      }}>Design ships here</h2>
      <p style={{
        fontFamily: inter, fontSize: 16, fontWeight: 400,
        color: C.textTer, margin: '0 0 32px', textWrap: 'pretty',
      }}>Free, open source, runs in your terminal.</p>
      <PillCTA label="Get started" shortcut="K" large />
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${C.border}`,
    }}>
      <span style={{
        fontFamily: inter, fontSize: 13, fontWeight: 500,
        color: C.textTer,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {['GitHub', 'Docs', 'Twitter'].map(l => (
          <span key={l}
            onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: inter, fontSize: 12, fontWeight: 400,
              color: hl === l ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default',
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main export ──────────────────────────────────────────────────────────
export function Drift() {
  return (
    <div style={{
      background: C.bg,
      minHeight: '100%',
      overflow: 'auto',
      fontFamily: inter,
      WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      <FontLoader />
      {/* Noise grain overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: noiseOverlay,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.5,
      }} />
      {/* Ambient glow behind hero */}
      <div style={{
        position: 'absolute',
        top: -200,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 800,
        height: 600,
        background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Nav />
        <Hero />
        <ProductShot />
        <Stats />
        <Features />
        <CodeBlock />
        <BottomCTA />
        <Footer />
      </div>
    </div>
  )
}
