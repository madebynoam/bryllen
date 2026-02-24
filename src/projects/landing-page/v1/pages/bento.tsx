import { useState, useEffect } from 'react'
import { LP, Dark, Light, spring } from '../tokens'
import canvasFull from '../../screenshots/canvas-full.png'
import canvasTokens from '../../screenshots/canvas-tokens.png'
import canvasComponents from '../../screenshots/canvas-components.png'

// Noise grain overlay as inline SVG data URI
const noise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

const BG = '#F5F5F0'
const WARM = '#F5F0EB'
const DK = '#0B0B0B'
const AC = '#E8590C'
const AC_HOVER = '#F06A22'
const RADIUS = 20
const GAP = 12
const springTr = `all 0.35s ${spring}`

/* ── Reusable bento card with hover lift + noise ── */

function Card({ children, style, hoverStyle, gridColumn, gridRow }: {
  children: React.ReactNode
  style: React.CSSProperties
  hoverStyle?: React.CSSProperties
  gridColumn?: string
  gridRow?: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: RADIUS, overflow: 'hidden', position: 'relative',
        cursor: 'default', transition: springTr, gridColumn, gridRow,
        ...style,
        ...(hovered
          ? { transform: 'translateY(-4px) scale(1.005)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.06)',
              ...hoverStyle }
          : { transform: 'translateY(0) scale(1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }),
      }}
    >
      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, backgroundImage: noise,
        backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
        pointerEvents: 'none', zIndex: 2,
      }} />
      {children}
    </div>
  )
}

/* Shared inner cell layout */
const inner = (justify: string = 'flex-start', align?: string): React.CSSProperties => ({
  padding: LP.s24, display: 'flex', flexDirection: 'column',
  justifyContent: justify as any, alignItems: align,
  height: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 1,
})

/* ── Card A: Hero — full-bleed screenshot with dark overlay ── */

function HeroCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Card gridColumn="span 2" gridRow="span 2" style={{ background: DK }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <img src={canvasFull} alt="Canvai design studio" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transition: `transform 0.6s ${spring}`,
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)',
        }} />
        <div style={{ position: 'absolute', bottom: LP.s32, left: LP.s32, zIndex: 3 }}>
          <div style={{
            fontSize: LP.labelSize, fontFamily: LP.mono, color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: LP.s8, textWrap: 'pretty',
          }}>canvai</div>
          <div style={{
            fontSize: 36, fontWeight: 700, color: Dark.text,
            lineHeight: 1.1, fontFamily: LP.font, textWrap: 'pretty',
          }}>
            The AI<br />Design Studio
          </div>
        </div>
      </div>
    </Card>
  )
}

/* ── Card B: Accent — "Live Code" ── */

function LiveCodeCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Card
      style={{ background: hovered ? AC_HOVER : AC, transition: springTr }}
      hoverStyle={{ background: AC_HOVER }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...inner('space-between') }}
      >
        <div style={{
          fontSize: LP.h3Size, fontWeight: 700, color: Dark.text,
          fontFamily: LP.font, lineHeight: 1.2, textWrap: 'pretty',
        }}>Live Code</div>
        <div style={{
          fontSize: LP.captionSize, color: 'rgba(255,255,255,0.8)',
          fontFamily: LP.font, lineHeight: 1.4, textWrap: 'pretty',
        }}>
          Every design is React.<br />Ship what you see.
        </div>
      </div>
    </Card>
  )
}

/* ── Card C: Dark stat — "60s" ── */

function StatCard() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < 60) {
      const t = setTimeout(() => setCount(c => Math.min(c + 2, 60)), 30)
      return () => clearTimeout(t)
    }
  }, [count])

  return (
    <Card style={{ background: DK }}>
      <div style={inner('center', 'center')}>
        <div style={{
          fontSize: 56, fontWeight: 800, color: Dark.text, fontFamily: LP.font,
          lineHeight: 1, letterSpacing: '-0.03em',
        }}>{count}s</div>
        <div style={{
          fontSize: LP.labelSize, color: Dark.textSecondary, fontFamily: LP.font,
          marginTop: LP.s8, textAlign: 'center', lineHeight: 1.3, textWrap: 'pretty',
        }}>
          Average time to ship<br />a component
        </div>
      </div>
    </Card>
  )
}

/* ── Card D: Light feature — annotation workflow with thumbnail ── */

function FeatureCard() {
  return (
    <Card gridColumn="span 2" style={{ background: Light.bg }}>
      <div style={{
        ...inner(), flexDirection: 'row', alignItems: 'center', gap: LP.s24,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: LP.captionSize, color: AC, fontWeight: 600, fontFamily: LP.font,
            marginBottom: LP.s8, letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>Annotations</div>
          <div style={{
            fontSize: LP.bodySize, color: Light.text, fontFamily: LP.font,
            lineHeight: 1.5, fontWeight: 500, textWrap: 'pretty',
          }}>
            Point at any element.<br />
            Describe a change.<br />
            Watch it happen.
          </div>
        </div>
        <div style={{
          width: 120, height: 80, borderRadius: LP.s8, overflow: 'hidden',
          flexShrink: 0, border: `1px solid ${Light.border}`,
        }}>
          <img src={canvasComponents} alt="Canvas annotations"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </Card>
  )
}

/* ── Card E: Warm gradient — annotation icon card ── */

function AnnotationCard() {
  return (
    <Card style={{ background: `linear-gradient(135deg, ${WARM} 0%, #FFF5EB 100%)` }}>
      <div style={inner('space-between')}>
        <div>
          <div style={{
            width: 32, height: 32, borderRadius: LP.s8,
            background: 'rgba(232, 89, 12, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: LP.s12,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={AC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{
            fontSize: LP.bodySize, fontWeight: 700, color: Light.text,
            fontFamily: LP.font, textWrap: 'pretty',
          }}>Annotations</div>
        </div>
        <div style={{
          fontSize: 13, color: Light.textSecondary, fontFamily: LP.font,
          lineHeight: 1.4, textWrap: 'pretty',
        }}>
          Click anywhere on the canvas to leave feedback
        </div>
      </div>
    </Card>
  )
}

/* ── Card F: Tall dark — code snippet with typing cursor ── */

function CodeCard() {
  const [typed, setTyped] = useState('')
  const full = '"make the button rounder"'

  useEffect(() => {
    if (typed.length < full.length) {
      const t = setTimeout(() => setTyped(full.slice(0, typed.length + 1)), 60)
      return () => clearTimeout(t)
    }
    // Reset after a pause to loop the animation
    const reset = setTimeout(() => setTyped(''), 2000)
    return () => clearTimeout(reset)
  }, [typed, full])

  return (
    <Card gridRow="span 2" style={{ background: DK }}>
      <div style={inner('center')}>
        <div style={{
          fontSize: LP.labelSize, color: Dark.textTertiary, fontFamily: LP.mono,
          marginBottom: LP.s16, textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>Get started</div>

        <div style={{ fontFamily: LP.mono, fontSize: 13, lineHeight: 2.2, color: Dark.textSecondary }}>
          <span style={{ color: AC }}>&gt;</span>{' '}
          <span style={{ color: Dark.text }}>/canvai-new</span>
          <br />
          <span style={{ color: Dark.textTertiary }}># scaffold project</span>
          <br /><br />

          <span style={{ color: AC }}>&gt;</span>{' '}
          <span style={{ color: Dark.text }}>/canvai-design</span>
          <br />
          <span style={{ color: Dark.textTertiary }}># open canvas</span>
          <br /><br />

          <span style={{ color: AC }}>&gt;</span>{' '}
          <span style={{ color: Dark.text }}>
            {typed}
            <span className="bento-cursor">|</span>
          </span>
        </div>
      </div>
    </Card>
  )
}

/* ── Card G: Screenshot — canvas tokens ── */

function ScreenshotCard() {
  const [hovered, setHovered] = useState(false)

  return (
    <Card gridColumn="span 2" style={{ background: DK }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <img src={canvasTokens} alt="Design tokens on canvas" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transition: `transform 0.6s ${spring}`,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: LP.s20, left: LP.s20, zIndex: 3,
          fontSize: LP.captionSize, color: 'rgba(255,255,255,0.85)',
          fontFamily: LP.font, fontWeight: 600, textWrap: 'pretty',
        }}>
          Design tokens, live on canvas
        </div>
      </div>
    </Card>
  )
}

/* ── Card H: "0 handoff" stat ── */

function HandoffCard() {
  return (
    <Card style={{ background: Light.bg }}>
      <div style={inner('center', 'center')}>
        <div style={{
          fontSize: 44, fontWeight: 800, color: Light.text, fontFamily: LP.font,
          lineHeight: 1, letterSpacing: '-0.03em',
        }}>0</div>
        <div style={{
          fontSize: LP.captionSize, color: Light.textSecondary, fontFamily: LP.font,
          marginTop: LP.s4, fontWeight: 500, textWrap: 'pretty',
        }}>handoff</div>
      </div>
    </Card>
  )
}

/* ── Main export ── */

export function Bento() {
  const [ctaHovered, setCtaHovered] = useState(false)
  const [ctaActive, setCtaActive] = useState(false)
  const [navHovered, setNavHovered] = useState(false)

  return (
    <div style={{
      minHeight: '100vh', background: BG, fontFamily: LP.font,
      overflow: 'auto', cursor: 'default',
    }}>
      {/* Keyframes */}
      <style>{`
        @keyframes bento-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .bento-cursor {
          animation: bento-blink 1s step-end infinite;
          color: ${AC};
          font-weight: 400;
          display: inline-block;
        }
      `}</style>

      {/* Nav — minimal pill + text link */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${LP.s16}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      }}>
        <div style={{
          background: DK, color: Dark.text, fontSize: LP.captionSize,
          fontWeight: 600, fontFamily: LP.font,
          padding: `${LP.s4}px ${LP.s16}px`, borderRadius: LP.pillRadius,
          letterSpacing: '0.02em',
        }}>canvai</div>
        <a
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
          href="#get-started"
          style={{
            fontSize: LP.captionSize, color: navHovered ? AC : Light.text,
            fontFamily: LP.font, fontWeight: 500, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: LP.s4,
            transition: 'color 0.2s ease',
          }}
        >
          Get Started
          <span style={{
            display: 'inline-block', transition: `transform 0.2s ${spring}`,
            transform: navHovered ? 'translateX(3px)' : 'translateX(0)',
          }}>&rarr;</span>
        </a>
      </nav>

      {/* Bento Grid — THE hero */}
      <div style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `${LP.s16}px ${LP.s32}px ${LP.s48}px`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '180px', gap: `${GAP}px`,
        }}>
          {/* Row 1–2: hero spans 2x2, accent + stat fill right */}
          <HeroCard />
          <LiveCodeCard />
          <StatCard />
          {/* Row 3: feature spans 2 cols */}
          <FeatureCard />
          {/* Row 4–5: annotation + code (2-tall), screenshot spans 2 cols */}
          <AnnotationCard />
          <CodeCard />
          <ScreenshotCard />
          {/* Row 5: handoff stat fills remaining */}
          <HandoffCard />
        </div>
      </div>

      {/* CTA — centered below the grid */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: `${LP.s64}px ${LP.s32}px ${LP.s48}px`,
      }}>
        <button
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => { setCtaHovered(false); setCtaActive(false) }}
          onMouseDown={() => setCtaActive(true)}
          onMouseUp={() => setCtaActive(false)}
          style={{
            background: AC, color: Dark.text, border: 'none',
            borderRadius: LP.pillRadius,
            padding: `${LP.s16}px ${LP.s40}px`,
            fontSize: LP.bodySize, fontWeight: 600, fontFamily: LP.font,
            cursor: 'default', transition: springTr,
            transform: ctaActive ? 'scale(0.92)' : ctaHovered ? 'scale(1.04)' : 'scale(1)',
            boxShadow: ctaHovered
              ? '0 12px 32px rgba(232, 89, 12, 0.3)'
              : '0 4px 16px rgba(232, 89, 12, 0.15)',
          }}
        >
          Start designing
        </button>
        <div style={{
          fontSize: LP.captionSize, color: Light.textSecondary,
          fontFamily: LP.font, marginTop: LP.s12, textWrap: 'pretty',
        }}>
          Free and open source
        </div>
      </div>

      {/* Footer — single line */}
      <footer style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: `${LP.s24}px ${LP.s32}px`,
        borderTop: `1px solid ${Light.border}`,
        maxWidth: LP.maxWidth, margin: '0 auto',
      }}>
        <div style={{
          fontSize: LP.labelSize, color: Light.textTertiary,
          fontFamily: LP.font, textWrap: 'pretty',
        }}>
          canvai &mdash; design with code, ship with confidence
        </div>
      </footer>
    </div>
  )
}
