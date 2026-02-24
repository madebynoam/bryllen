import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'
import productDirections from '../../screenshots/product-directions.png'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'

// ── Harmonic — Warm, rounded, refined playfulness ────────────────────────
// Amber-cream bg, coral accents, Nunito headlines, large rounded corners.
// Notion's warmth meets Stripe's polish. Approachable, delightful, zero cold corporate energy.
const C = {
  bg: '#FFF8F0',
  bgGradientEnd: '#FFF0E6',
  surface: '#FFFCF9',
  surfaceWarm: '#FFF5EB',
  card: '#FFFDFB',
  text: '#2D2520',
  textSec: '#6B5E54',
  textTer: '#9B8E84',
  border: '#EDE5DC',
  borderHover: '#DDD2C6',
  accent: '#E11D48',
  accentSoft: 'rgba(225, 29, 72, 0.08)',
  accentHover: '#C81740',
  pillLive: '#F59E0B',
  pillAnnotate: '#8B5CF6',
  pillIterate: '#06B6D4',
  cardAccent1: '#E11D48',
  cardAccent2: '#F59E0B',
  cardAccent3: '#8B5CF6',
  shadow1: '0 1px 4px rgba(0,0,0,0.04), 0 1px 8px rgba(200,100,0,0.03)',
  shadow2: '0 4px 16px rgba(0,0,0,0.04), 0 2px 12px rgba(200,100,0,0.03)',
  shadow3: '0 12px 40px rgba(0,0,0,0.04), 0 4px 20px rgba(200,100,0,0.03)',
  shadowNav: '0 2px 16px rgba(0,0,0,0.04), 0 1px 8px rgba(200,100,0,0.03)',
}

const headlineFont = '"Nunito", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const bodyFont = '"Outfit", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Google Fonts loader ─────────────────────────────────────────────────
function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&family=Lora:ital,wght@1,400;1,500&display=swap');
    `}</style>
  )
}

// ── Coral CTA button ────────────────────────────────────────────────────
function CoralButton({ label, large, ghost }: { label: string; large?: boolean; ghost?: boolean }) {
  const [h, hB] = useHover()
  const [p, pB] = usePress()
  const sz = large ? 16 : 14
  const pad = large ? '14px 36px' : '10px 24px'
  const rad = large ? 16 : 12

  if (ghost) {
    return (
      <button {...hB} {...pB} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        border: `1.5px solid ${h ? C.borderHover : C.border}`,
        borderRadius: rad,
        padding: pad,
        background: h ? C.surfaceWarm : 'transparent',
        cursor: 'default',
        fontFamily: bodyFont, fontSize: sz, fontWeight: 500,
        color: C.textSec,
        transform: p ? 'scale(0.95)' : h ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.25s ${springCSS}, background 0.2s ease, border-color 0.2s ease`,
        textWrap: 'pretty' as const,
      }}>
        {label}
      </button>
    )
  }

  return (
    <button {...hB} {...pB} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      border: 'none',
      borderRadius: rad,
      padding: pad,
      background: h ? C.accentHover : C.accent,
      cursor: 'default',
      fontFamily: bodyFont, fontSize: sz, fontWeight: 600,
      color: '#FFF8F0',
      transform: p ? 'scale(0.93)' : h ? 'scale(1.02)' : 'scale(1)',
      transition: `transform 0.25s ${springCSS}, background 0.15s ease, box-shadow 0.3s ease`,
      boxShadow: h
        ? '0 4px 20px rgba(225, 29, 72, 0.25), 0 2px 8px rgba(225, 29, 72, 0.15)'
        : '0 2px 8px rgba(225, 29, 72, 0.15)',
      textWrap: 'pretty' as const,
    }}>
      {label}
    </button>
  )
}

// ── Feature pill badge ──────────────────────────────────────────────────
function FeaturePill({ label, color, dotColor }: { label: string; color: string; dotColor: string }) {
  const [h, hB] = useHover()
  return (
    <span {...hB} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 20px',
      borderRadius: 40,
      background: h ? `${color}14` : `${color}0A`,
      border: `1px solid ${color}20`,
      fontFamily: bodyFont, fontSize: 13, fontWeight: 500,
      color: C.text,
      transform: h ? 'translateY(-2px)' : 'translateY(0)',
      transition: `transform 0.3s ${springCSS}, background 0.2s ease`,
      cursor: 'default',
      textWrap: 'pretty' as const,
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: 4,
        background: dotColor,
        flexShrink: 0,
      }} />
      {label}
    </span>
  )
}

// ── Nav — rounded pill shape ────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <div style={{
      padding: '20px 48px 0', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box' as const,
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 12px 12px 28px',
        borderRadius: 52,
        background: C.card,
        boxShadow: C.shadowNav,
        border: `1px solid ${C.border}`,
      }}>
        <span style={{
          fontFamily: headlineFont, fontSize: 17, fontWeight: 800,
          color: C.text, letterSpacing: '-0.01em',
          textWrap: 'pretty' as const,
        }}>canvai</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Features', 'Examples', 'Docs'].map(link => (
            <span key={link}
              onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
              style={{
                fontFamily: bodyFont, fontSize: 14, fontWeight: 400,
                color: hl === link ? C.text : C.textTer,
                transition: `color 0.15s ${springCSS}`,
                cursor: 'default', textWrap: 'pretty' as const,
              }}>{link}</span>
          ))}
          <CoralButton label="Get started" />
        </div>
      </nav>
    </div>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      textAlign: 'center' as const, padding: '96px 48px 48px',
      maxWidth: 800, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: headlineFont, fontSize: 72, fontWeight: 800,
        color: C.text, lineHeight: 1.05, letterSpacing: '-0.03em',
        margin: 0, textWrap: 'pretty' as const,
      }}>
        Design with confidence
      </h1>
      <p style={{
        fontFamily: bodyFont, fontSize: 20, fontWeight: 400,
        color: C.textSec, marginTop: 24, marginBottom: 40,
        lineHeight: 1.6, maxWidth: 540, textWrap: 'pretty' as const,
      }}>
        An infinite, zoomable canvas where every Claude Code generation
        lives as a frame you can compare, annotate, and iterate on.
      </p>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <CoralButton label="Start designing" large />
        <CoralButton label="See how it works" large ghost />
      </div>
    </section>
  )
}

// ── Feature pills row ───────────────────────────────────────────────────
function FeaturePills() {
  return (
    <div style={{
      display: 'flex', gap: 12, justifyContent: 'center',
      padding: '32px 48px 48px',
    }}>
      <FeaturePill label="Live Canvas" color="#F59E0B" dotColor={C.pillLive} />
      <FeaturePill label="Annotations" color="#8B5CF6" dotColor={C.pillAnnotate} />
      <FeaturePill label="Iterations" color="#06B6D4" dotColor={C.pillIterate} />
    </div>
  )
}

// ── Product screenshot — warm-shadowed rounded frame ────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div {...hB} style={{
        borderRadius: 20, overflow: 'hidden',
        border: `1px solid ${h ? C.borderHover : C.border}`,
        boxShadow: h ? C.shadow3 : C.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.4s ${springCSS}, box-shadow 0.4s ease, border-color 0.3s ease`,
        background: C.card,
      }}>
        <img src={canvasWide} alt="Canvai canvas with multiple design directions" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Features — 3 cards with colored top accent bars ─────────────────────
const features = [
  {
    accent: C.cardAccent1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    title: 'Compare everything',
    desc: 'Every generation lives on an infinite canvas. See five directions at once instead of scrolling through a single chat thread.',
  },
  {
    accent: C.cardAccent2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Annotate directly',
    desc: 'Click anywhere on the canvas and describe what to change. No tickets, no handoffs. The code updates while you watch.',
  },
  {
    accent: C.cardAccent3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M14 2v2" />
        <path d="M14 20v2" />
      </svg>
    ),
    title: 'Every version preserved',
    desc: 'Nothing is overwritten. Go back to any moment. Branch a direction. Your entire creative history stays intact forever.',
  },
]

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{
      padding: 0,
      borderRadius: 20,
      border: `1px solid ${h ? C.borderHover : C.border}`,
      background: C.card,
      boxShadow: h ? C.shadow3 : C.shadow1,
      transform: h ? 'translateY(-8px)' : 'translateY(0)',
      transition: `transform 0.35s ${springCSS}, box-shadow 0.35s ease, border-color 0.25s ease`,
      cursor: 'default',
      overflow: 'hidden',
    }}>
      {/* Colored accent bar */}
      <div style={{
        height: 4, background: feature.accent, borderRadius: '20px 20px 0 0',
      }} />
      <div style={{ padding: '28px 28px 32px' }}>
        {/* Icon circle */}
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `${feature.accent}0C`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
          color: feature.accent,
        }}>
          {feature.icon}
        </div>
        <h3 style={{
          fontFamily: headlineFont, fontSize: 20, fontWeight: 700,
          color: C.text, margin: '0 0 8px',
          letterSpacing: '-0.01em', textWrap: 'pretty' as const,
        }}>{feature.title}</h3>
        <p style={{
          fontFamily: bodyFont, fontSize: 15, fontWeight: 400,
          color: C.textSec, margin: 0,
          lineHeight: 1.6, textWrap: 'pretty' as const,
        }}>{feature.desc}</p>
      </div>
    </div>
  )
}

function Features() {
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
      }}>
        {features.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>
    </section>
  )
}

// ── Testimonial — warm card with serif quote ────────────────────────────
function Testimonial() {
  return (
    <section style={{
      maxWidth: 800, margin: '0 auto', padding: '0 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        padding: '48px 52px',
        borderRadius: 24,
        background: C.surfaceWarm,
        border: `1px solid ${C.border}`,
        boxShadow: C.shadow1,
        textAlign: 'center' as const,
      }}>
        <p style={{
          fontFamily: '"Lora", Georgia, "Times New Roman", serif',
          fontSize: 24, fontWeight: 400,
          fontStyle: 'italic',
          color: C.text, margin: '0 0 24px',
          lineHeight: 1.55, textWrap: 'pretty' as const,
        }}>
          "I used to design one direction at a time and hope it was right.
          Now I see five at once and know which one to ship."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 20,
            background: `linear-gradient(135deg, ${C.accent}30, ${C.pillLive}30)`,
          }} />
          <div>
            <span style={{
              fontFamily: bodyFont, fontSize: 14, fontWeight: 600,
              color: C.text, display: 'block', textWrap: 'pretty' as const,
            }}>Sarah Chen</span>
            <span style={{
              fontFamily: bodyFont, fontSize: 13, fontWeight: 400,
              color: C.textTer, textWrap: 'pretty' as const,
            }}>Design Engineer</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Secondary screenshots — two rounded frames side by side ─────────────
function SecondaryScreenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()

  const frameStyle = (hovered: boolean): React.CSSProperties => ({
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    border: `1px solid ${hovered ? C.borderHover : C.border}`,
    boxShadow: hovered ? C.shadow2 : C.shadow1,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    transition: `transform 0.35s ${springCSS}, box-shadow 0.35s ease, border-color 0.25s ease`,
    background: C.card,
  })

  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '0 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <div {...h1B} style={frameStyle(h1)}>
          <img src={productDirections} alt="Multiple design directions on canvas" style={{
            width: '100%', display: 'block',
          }} />
        </div>
        <div {...h2B} style={frameStyle(h2)}>
          <img src={pulseDashboard} alt="Pulse dashboard design on canvas" style={{
            width: '100%', display: 'block',
          }} />
        </div>
      </div>
    </section>
  )
}

// ── Bottom CTA — warm gradient background ───────────────────────────────
function BottomCTA() {
  return (
    <section style={{
      margin: '0 48px', borderRadius: 24,
      background: `linear-gradient(180deg, ${C.bgGradientEnd} 0%, ${C.bg} 100%)`,
      border: `1px solid ${C.border}`,
      padding: '72px 48px',
      textAlign: 'center' as const,
      maxWidth: 1080,
      marginLeft: 'auto', marginRight: 'auto',
      boxSizing: 'border-box' as const,
    }}>
      <h2 style={{
        fontFamily: headlineFont, fontSize: 44, fontWeight: 800,
        color: C.text, letterSpacing: '-0.02em',
        margin: '0 0 12px', textWrap: 'pretty' as const,
        lineHeight: 1.1,
      }}>Ready to see every direction?</h2>
      <p style={{
        fontFamily: bodyFont, fontSize: 17, fontWeight: 400,
        color: C.textSec, margin: '0 0 36px', textWrap: 'pretty' as const,
        lineHeight: 1.55,
      }}>
        Free, open source, runs in your terminal. Start designing in under a minute.
      </p>
      <CoralButton label="Start designing" large />
    </section>
  )
}

// ── Footer — 3-column, warm and friendly ────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)

  const footerLinks = {
    Product: ['Features', 'Examples', 'Changelog', 'Roadmap'],
    Resources: ['Documentation', 'GitHub', 'Discussions', 'Blog'],
    Community: ['Twitter', 'Discord', 'Newsletter', 'Contributing'],
  }

  return (
    <footer style={{
      maxWidth: 1080, margin: '0 auto', padding: '64px 48px 40px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: 48, marginBottom: 48,
      }}>
        {/* Brand column */}
        <div>
          <span style={{
            fontFamily: headlineFont, fontSize: 20, fontWeight: 800,
            color: C.text, display: 'block', marginBottom: 12,
            textWrap: 'pretty' as const,
          }}>canvai</span>
          <p style={{
            fontFamily: bodyFont, fontSize: 14, fontWeight: 400,
            color: C.textTer, margin: 0, lineHeight: 1.6,
            maxWidth: 240, textWrap: 'pretty' as const,
          }}>
            The spatial design layer for Claude Code. See every direction at once.
          </p>
        </div>
        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <span style={{
              fontFamily: bodyFont, fontSize: 13, fontWeight: 600,
              color: C.text, display: 'block', marginBottom: 16,
              textWrap: 'pretty' as const,
            }}>{heading}</span>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
              {links.map(link => (
                <span key={link}
                  onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
                  style={{
                    fontFamily: bodyFont, fontSize: 13, fontWeight: 400,
                    color: hl === link ? C.text : C.textTer,
                    transition: `color 0.15s ${springCSS}`,
                    cursor: 'default', textWrap: 'pretty' as const,
                  }}>{link}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Bottom bar */}
      <div style={{
        borderTop: `1px solid ${C.border}`,
        paddingTop: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: bodyFont, fontSize: 13, fontWeight: 400,
          color: C.textTer, textWrap: 'pretty' as const,
        }}>Made with care for designers who code.</span>
        <span style={{
          fontFamily: bodyFont, fontSize: 13, fontWeight: 400,
          color: C.textTer, textWrap: 'pretty' as const,
        }}>Free and open source</span>
      </div>
    </footer>
  )
}

// ── Main export ──────────────────────────────────────────────────────────
export function Harmonic() {
  return (
    <div style={{
      background: C.bg,
      minHeight: '100%',
      overflow: 'auto',
      fontFamily: bodyFont,
      WebkitFontSmoothing: 'antialiased',
      cursor: 'default',
    }}>
      <FontLoader />
      {/* Soft warm ambient glow behind hero */}
      <div style={{
        position: 'absolute',
        top: -120,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 900,
        height: 500,
        background: `radial-gradient(ellipse at center, rgba(225, 29, 72, 0.04) 0%, rgba(245, 158, 11, 0.03) 40%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <FeaturePills />
        <ProductShot />
        <Features />
        <Testimonial />
        <SecondaryScreenshots />
        <BottomCTA />
        <Footer />
      </div>
    </div>
  )
}
