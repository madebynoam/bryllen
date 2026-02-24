import React, { useState, useRef } from 'react'
import { LP, Dark, Light, spring } from '../tokens'
import canvasFull from '../../screenshots/canvas-full.png'
import canvasShell from '../../screenshots/canvas-shell.png'
import canvasWide from '../../screenshots/canvas-wide.png'

// ---- Interaction hooks ----
function useHover() {
  const [hovered, setHovered] = useState(false)
  const bind = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }
  return [hovered, bind] as const
}

function useActive() {
  const [active, setActive] = useState(false)
  const bind = {
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onMouseLeave: () => setActive(false),
  }
  return [active, bind] as const
}

const btnBase: React.CSSProperties = {
  border: 'none',
  cursor: 'default',
  fontFamily: LP.font,
  fontWeight: 600,
  fontSize: LP.bodySize,
  borderRadius: LP.pillRadius,
  transition: `transform 0.2s ${spring}, box-shadow 0.2s ${spring}`,
}

// ---- Dark Nav ----
function Nav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [ctaHover, ctaHoverBind] = useHover()
  const [ctaActive, ctaActiveBind] = useActive()
  const links = ['Features', 'Docs']

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${LP.s20}px ${LP.s32}px`,
      maxWidth: LP.maxWidth,
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: LP.mono,
        fontSize: LP.h3Size,
        fontWeight: 700,
        color: Dark.text,
        letterSpacing: '-0.02em',
      }}>
        canvai
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {links.map(link => (
          <span
            key={link}
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              fontFamily: LP.font,
              fontSize: LP.captionSize,
              fontWeight: 500,
              color: hoveredLink === link ? Dark.text : Dark.textSecondary,
              transition: `color 0.2s ease`,
              cursor: 'default',
              textWrap: 'pretty',
            }}
          >
            {link}
          </span>
        ))}
        <button
          {...ctaHoverBind}
          {...ctaActiveBind}
          style={{
            ...btnBase,
            padding: `${LP.s8}px ${LP.s20}px`,
            fontSize: LP.captionSize,
            background: 'transparent',
            color: Dark.text,
            border: `1px solid ${ctaHover ? Dark.accent : Dark.border}`,
            transform: ctaActive ? 'scale(0.96)' : ctaHover ? 'scale(1.02)' : 'scale(1)',
            boxShadow: ctaHover ? `0 0 16px ${Dark.accentMuted}` : 'none',
            transition: `transform 0.2s ${spring}, box-shadow 0.2s ${spring}, border-color 0.2s ease`,
          }}
        >
          Get Started
        </button>
      </div>
    </nav>
  )
}

// ---- Dark Hero ----
function DarkHero({ onScrollDown }: { onScrollDown: () => void }) {
  const [primaryHover, primaryHoverBind] = useHover()
  const [primaryActive, primaryActiveBind] = useActive()
  const [ghostHover, ghostHoverBind] = useHover()
  const [ghostActive, ghostActiveBind] = useActive()

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: `${LP.s80}px ${LP.s32}px ${LP.s48}px`,
      maxWidth: LP.maxWidth,
      margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: LP.font,
        fontSize: 64,
        fontWeight: 700,
        color: Dark.text,
        lineHeight: 1.05,
        letterSpacing: '-0.04em',
        margin: 0,
        textWrap: 'pretty',
      }}>
        Design at the speed of thought.
      </h1>
      <p style={{
        fontFamily: LP.font,
        fontSize: 18,
        fontWeight: 400,
        color: Dark.textSecondary,
        marginTop: LP.s24,
        marginBottom: LP.s40,
        lineHeight: 1.5,
        maxWidth: 560,
        textWrap: 'pretty',
      }}>
        An AI-powered canvas where code IS the design. No mockups. No handoff.
      </p>

      <div style={{ display: 'flex', gap: LP.s16 }}>
        <button
          {...primaryHoverBind}
          {...primaryActiveBind}
          style={{
            ...btnBase,
            padding: `${LP.s16}px ${LP.s32}px`,
            background: Dark.accent,
            color: Dark.text,
            transform: primaryActive ? 'scale(0.96)' : primaryHover ? 'scale(1.02)' : 'scale(1)',
            boxShadow: primaryHover
              ? `0 4px 24px rgba(232, 89, 12, 0.4)`
              : `0 2px 12px rgba(232, 89, 12, 0.2)`,
          }}
        >
          Install Plugin
        </button>
        <button
          {...ghostHoverBind}
          {...ghostActiveBind}
          onClick={onScrollDown}
          style={{
            ...btnBase,
            padding: `${LP.s16}px ${LP.s32}px`,
            background: 'transparent',
            color: Dark.text,
            border: `1px solid ${ghostHover ? 'rgba(255,255,255,0.4)' : Dark.border}`,
            transform: ghostActive ? 'scale(0.96)' : ghostHover ? 'scale(1.02)' : 'scale(1)',
            transition: `transform 0.2s ${spring}, box-shadow 0.2s ${spring}, border-color 0.25s ease`,
          }}
        >
          See it in action ↓
        </button>
      </div>
    </section>
  )
}

// ---- Floating Product Screenshot ----
function FloatingScreenshot() {
  const [hovered, hoverBind] = useHover()

  return (
    <div style={{
      position: 'relative',
      maxWidth: LP.maxWidth - 120,
      margin: '0 auto',
      padding: `0 ${LP.s32}px`,
      zIndex: 2,
      marginBottom: -120,
    }}>
      <div
        {...hoverBind}
        style={{
          borderRadius: LP.cardRadius,
          overflow: 'hidden',
          border: `1px solid ${Dark.border}`,
          background: Dark.surface,
          transition: `transform 0.35s ${spring}, box-shadow 0.35s ease`,
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: hovered
            ? `0 32px 80px rgba(232, 89, 12, 0.18), 0 0 60px rgba(232, 89, 12, 0.08)`
            : `0 16px 60px rgba(232, 89, 12, 0.1), 0 4px 20px rgba(0, 0, 0, 0.4)`,
        }}
      >
        <img
          src={canvasFull}
          alt="Canvai live canvas"
          style={{ width: '100%', display: 'block' }}
        />
      </div>
    </div>
  )
}

// ---- Transition Gradient ----
function TransitionZone() {
  return (
    <div style={{
      height: 120,
      background: `linear-gradient(to bottom, ${Dark.bg}, ${Light.bg})`,
      position: 'relative',
      zIndex: 1,
    }} />
  )
}

// ---- Light Feature Card ----
function FeatureCard({ title, description, span, icon }: {
  title: string
  description: string
  span: number
  icon: string
}) {
  const [hovered, hoverBind] = useHover()

  return (
    <div
      {...hoverBind}
      style={{
        background: Light.surface,
        border: `1px solid ${hovered ? Light.accent : Light.border}`,
        borderRadius: 12,
        padding: LP.s32,
        gridColumn: span === 2 ? 'span 2' : 'span 1',
        transition: `transform 0.25s ${spring}, border-color 0.3s ease, box-shadow 0.3s ease`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0, 0, 0, 0.08)`
          : `0 1px 3px rgba(0, 0, 0, 0.04)`,
      }}
    >
      <div style={{
        fontSize: 28,
        marginBottom: LP.s12,
        lineHeight: 1,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: LP.font,
        fontSize: 20,
        fontWeight: 700,
        color: Light.text,
        margin: 0,
        marginBottom: LP.s8,
        textWrap: 'pretty',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: LP.font,
        fontSize: LP.captionSize,
        color: Light.textSecondary,
        lineHeight: 1.6,
        margin: 0,
        textWrap: 'pretty',
      }}>
        {description}
      </p>
    </div>
  )
}

// ---- How It Works (spans 2 cols) ----
function HowItWorks() {
  const [hovered, hoverBind] = useHover()
  const steps = [
    { num: '01', label: 'Describe', code: '/canvai-new my-app' },
    { num: '02', label: 'Annotate', code: '"Make the header bolder"' },
    { num: '03', label: 'Ship', code: '/canvai-share' },
  ]

  return (
    <div
      {...hoverBind}
      style={{
        background: Light.surface,
        border: `1px solid ${hovered ? Light.accent : Light.border}`,
        borderRadius: 12,
        padding: LP.s32,
        gridColumn: 'span 2',
        transition: `transform 0.25s ${spring}, border-color 0.3s ease, box-shadow 0.3s ease`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0, 0, 0, 0.08)`
          : `0 1px 3px rgba(0, 0, 0, 0.04)`,
      }}
    >
      <h3 style={{
        fontFamily: LP.font,
        fontSize: 20,
        fontWeight: 700,
        color: Light.text,
        margin: 0,
        marginBottom: LP.s24,
        textWrap: 'pretty',
      }}>
        How it works
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s16 }}>
        {steps.map((step, i) => (
          <React.Fragment key={step.num}>
            <div style={{
              flex: 1,
              background: Light.bgSubtle,
              borderRadius: 8,
              padding: LP.s20,
            }}>
              <div style={{
                fontFamily: LP.mono,
                fontSize: LP.labelSize,
                fontWeight: 700,
                color: Light.accent,
                marginBottom: LP.s4,
              }}>
                {step.num}
              </div>
              <div style={{
                fontFamily: LP.font,
                fontSize: LP.bodySize,
                fontWeight: 600,
                color: Light.text,
                marginBottom: LP.s8,
              }}>
                {step.label}
              </div>
              <code style={{
                fontFamily: LP.mono,
                fontSize: LP.labelSize,
                color: Light.textSecondary,
                background: Light.surface,
                padding: `${LP.s4}px ${LP.s8}px`,
                borderRadius: 4,
                border: `1px solid ${Light.border}`,
              }}>
                {step.code}
              </code>
            </div>
            {i < steps.length - 1 && (
              <span style={{
                fontFamily: LP.font,
                fontSize: 20,
                color: Light.textTertiary,
                flexShrink: 0,
              }}>
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// ---- Ship-Ready Card with thumbnail ----
function ShipReadyCard() {
  const [hovered, hoverBind] = useHover()

  return (
    <div
      {...hoverBind}
      style={{
        background: Light.surface,
        border: `1px solid ${hovered ? Light.accent : Light.border}`,
        borderRadius: 12,
        padding: LP.s32,
        transition: `transform 0.25s ${spring}, border-color 0.3s ease, box-shadow 0.3s ease`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 32px rgba(0, 0, 0, 0.08)`
          : `0 1px 3px rgba(0, 0, 0, 0.04)`,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: LP.s12, lineHeight: 1 }}>
        &#9881;
      </div>
      <h3 style={{
        fontFamily: LP.font,
        fontSize: 20,
        fontWeight: 700,
        color: Light.text,
        margin: 0,
        marginBottom: LP.s8,
        textWrap: 'pretty',
      }}>
        Ship-Ready Components
      </h3>
      <p style={{
        fontFamily: LP.font,
        fontSize: LP.captionSize,
        color: Light.textSecondary,
        lineHeight: 1.6,
        margin: 0,
        marginBottom: LP.s16,
        textWrap: 'pretty',
      }}>
        What you design is what ships. Real React code from the start.
      </p>
      <div style={{
        borderRadius: 8,
        overflow: 'hidden',
        border: `1px solid ${Light.border}`,
      }}>
        <img
          src={canvasShell}
          alt="Component preview"
          style={{ width: '100%', display: 'block' }}
        />
      </div>
    </div>
  )
}

// ---- Bento Feature Grid ----
function BentoGrid() {
  return (
    <section style={{
      maxWidth: LP.maxWidth,
      margin: '0 auto',
      padding: `${LP.s80}px ${LP.s32}px ${LP.s64}px`,
    }}>
      <h2 style={{
        fontFamily: LP.font,
        fontSize: LP.h1Size,
        fontWeight: 700,
        color: Light.text,
        textAlign: 'center',
        marginBottom: LP.s48,
        letterSpacing: '-0.02em',
        textWrap: 'pretty',
      }}>
        Everything you need to design in code
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: LP.s20,
      }}>
        <FeatureCard
          icon="&#9632;"
          title="Live Canvas"
          description="An infinite canvas where every frame is a real React component. No export step."
          span={1}
        />
        <FeatureCard
          icon="&#9998;"
          title="Smart Annotations"
          description="Click anywhere to leave feedback. Your AI agent iterates in real time."
          span={1}
        />
        <FeatureCard
          icon="&#8635;"
          title="Instant Iterations"
          description="Every change creates a new version. Compare side by side, never lose work."
          span={1}
        />
        <HowItWorks />
        <ShipReadyCard />
      </div>
    </section>
  )
}

// ---- Social Proof ----
const quotes = [
  { name: 'Sarah Chen', role: 'Design Lead, Vercel', text: 'Canvai eliminated our entire handoff process. Designers and engineers finally speak the same language.' },
  { name: 'Marcus Rivera', role: 'Staff Engineer, Stripe', text: 'The annotation workflow is magic. I click, describe what I want, and it just happens.' },
  { name: 'Aiko Tanaka', role: 'Founding Designer, Arc', text: 'I shipped a full component library in a day. No Figma, no Storybook. Just Canvai.' },
]

function QuoteCard({ name, role, text }: typeof quotes[0]) {
  const [hovered, hoverBind] = useHover()

  return (
    <div
      {...hoverBind}
      style={{
        background: Light.surface,
        border: `1px solid ${hovered ? Light.accent : Light.border}`,
        borderRadius: 12,
        padding: LP.s32,
        transition: `transform 0.25s ${spring}, border-color 0.3s ease, box-shadow 0.3s ease`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px rgba(0, 0, 0, 0.06)` : 'none',
      }}
    >
      <p style={{
        fontFamily: LP.font,
        fontSize: LP.captionSize,
        color: Light.textSecondary,
        lineHeight: 1.7,
        margin: 0,
        marginBottom: LP.s24,
        fontStyle: 'italic',
        textWrap: 'pretty',
      }}>
        "{text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s12 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${Light.accent}, ${Dark.accentHover})`,
          flexShrink: 0,
        }} />
        <div>
          <div style={{
            fontFamily: LP.font,
            fontSize: LP.captionSize,
            fontWeight: 600,
            color: Light.text,
            textWrap: 'pretty',
          }}>
            {name}
          </div>
          <div style={{
            fontFamily: LP.font,
            fontSize: LP.labelSize,
            color: Light.textTertiary,
            textWrap: 'pretty',
          }}>
            {role}
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialProof() {
  return (
    <section style={{
      maxWidth: LP.maxWidth,
      margin: '0 auto',
      padding: `${LP.s48}px ${LP.s32}px ${LP.s64}px`,
    }}>
      <h2 style={{
        fontFamily: LP.font,
        fontSize: LP.h2Size,
        fontWeight: 700,
        color: Light.text,
        textAlign: 'center',
        marginBottom: LP.s40,
        letterSpacing: '-0.02em',
        textWrap: 'pretty',
      }}>
        Built by designers, for designers
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: LP.s20,
      }}>
        {quotes.map(q => <QuoteCard key={q.name} {...q} />)}
      </div>
    </section>
  )
}

// ---- Final CTA ----
function FinalCTA() {
  const [btnHover, btnHoverBind] = useHover()
  const [btnActive, btnActiveBind] = useActive()

  return (
    <section style={{
      background: Light.bgSubtle,
      padding: `${LP.s80}px ${LP.s32}px`,
    }}>
      <div style={{
        maxWidth: 560,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: LP.font,
          fontSize: LP.h2Size,
          fontWeight: 700,
          color: Light.text,
          marginBottom: LP.s16,
          letterSpacing: '-0.02em',
          textWrap: 'pretty',
        }}>
          Ready to try Canvai?
        </h2>
        <p style={{
          fontFamily: LP.font,
          fontSize: LP.bodySize,
          color: Light.textSecondary,
          marginBottom: LP.s32,
          lineHeight: 1.5,
          textWrap: 'pretty',
        }}>
          Start designing in code today. Free and open source.
        </p>

        <button
          {...btnHoverBind}
          {...btnActiveBind}
          style={{
            ...btnBase,
            padding: `${LP.s16}px ${LP.s32}px`,
            background: Light.accent,
            color: Dark.text,
            transform: btnActive ? 'scale(0.96)' : btnHover ? 'scale(1.02)' : 'scale(1)',
            boxShadow: btnHover ? `0 4px 20px rgba(232, 89, 12, 0.3)` : 'none',
          }}
        >
          Install Plugin
        </button>
        <p style={{
          fontFamily: LP.font,
          fontSize: LP.labelSize,
          color: Light.textTertiary,
          marginTop: LP.s16,
          lineHeight: 1.5,
          textWrap: 'pretty',
        }}>
          Install the Claude Code plugin and start designing.
        </p>
      </div>
    </section>
  )
}

// ---- Dark Footer ----
function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const footerLinks = ['Features', 'Docs', 'GitHub', 'Twitter', 'Privacy']

  return (
    <footer style={{
      background: Dark.bg,
      padding: `${LP.s32}px ${LP.s32}px`,
    }}>
      <div style={{
        maxWidth: LP.maxWidth,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: LP.mono,
          fontSize: LP.bodySize,
          fontWeight: 700,
          color: Dark.text,
          letterSpacing: '-0.02em',
        }}>
          canvai
        </span>
        <div style={{ display: 'flex', gap: LP.s24, alignItems: 'center' }}>
          {footerLinks.map(link => (
            <span
              key={link}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: LP.font,
                fontSize: LP.labelSize,
                color: hoveredLink === link ? Dark.text : Dark.textTertiary,
                transition: 'color 0.2s ease',
                cursor: 'default',
                textWrap: 'pretty',
              }}
            >
              {link}
            </span>
          ))}
        </div>
        <span style={{
          fontFamily: LP.font,
          fontSize: LP.labelSize,
          color: Dark.textTertiary,
        }}>
          &copy; 2026 Canvai
        </span>
      </div>
    </footer>
  )
}

// ---- Main Component ----
export function Shift() {
  const contentRef = useRef<HTMLDivElement>(null)

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{
      minHeight: '100%',
      overflow: 'auto',
      fontFamily: LP.font,
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Dark half */}
      <div style={{ background: Dark.bg }}>
        <Nav />
        <DarkHero onScrollDown={handleScrollDown} />
        <FloatingScreenshot />
      </div>

      {/* Transition */}
      <TransitionZone />

      {/* Light half */}
      <div ref={contentRef} style={{ background: Light.bg }}>
        <div style={{ paddingTop: 80 }}>
          <BentoGrid />
          <SocialProof />
        </div>
      </div>

      {/* Light CTA band */}
      <FinalCTA />

      {/* Dark footer returns */}
      <Footer />
    </div>
  )
}
