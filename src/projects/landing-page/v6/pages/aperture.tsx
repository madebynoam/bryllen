import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'
import productDirections from '../../screenshots/product-directions.png'

// ── Aperture — Photography-inspired, dramatic scale ────────────────────
// Light warm gray bg, huge hero product image, Cormorant Garamond serif,
// film strip aesthetic, terracotta accent, contact sheet feature grid.
const C = {
  bg: '#F4F3F1',
  surface: '#EFEEEC',
  card: '#FAF9F7',
  text: '#1C1A17',
  textSec: '#5C5955',
  textTer: '#8A8683',
  border: '#D8D5D0',
  borderLight: '#E8E5E1',
  accent: '#C2410C',
  accentSoft: 'rgba(194, 65, 12, 0.08)',
  accentHover: '#A3370A',
  overlay: 'rgba(28, 26, 23, 0.72)',
  overlayLight: 'rgba(28, 26, 23, 0.48)',
  onDark: '#F4F3F1',
  onDarkSec: 'rgba(244, 243, 241, 0.64)',
  shadow1: '0 1px 2px rgba(28, 26, 23, 0.06)',
  shadow2: '0 4px 16px rgba(28, 26, 23, 0.08), 0 1px 4px rgba(28, 26, 23, 0.04)',
  shadow3: '0 12px 48px rgba(28, 26, 23, 0.12), 0 4px 12px rgba(28, 26, 23, 0.06)',
}

const cormorant = '"Cormorant Garamond", "Georgia", "Times New Roman", serif'
const workSans = '"Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Google Fonts ────────────────────────────────────────────────────────
function FontLoader() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Work+Sans:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  )
}

// ── Nav — transparent floating over hero with backdrop blur ──────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 48px',
      boxSizing: 'border-box',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(28, 26, 23, 0.12)',
      borderBottom: '1px solid rgba(244, 243, 241, 0.08)',
    }}>
      <span style={{
        fontFamily: cormorant,
        fontSize: 20,
        fontWeight: 600,
        color: C.onDark,
        letterSpacing: '0.04em',
        textWrap: 'pretty',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Gallery', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)}
            onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: workSans,
              fontSize: 13,
              fontWeight: 400,
              color: hl === link ? C.onDark : C.onDarkSec,
              transition: `color 0.2s ${springCSS}`,
              cursor: 'default',
              textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — full-width product image with text on dark band ──────────────
function Hero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '76vh',
      minHeight: 560,
      overflow: 'hidden',
      background: '#1C1A17',
    }}>
      {/* Product image — absolutely positioned to fill, acts as background */}
      <img
        src={canvasWide}
        alt="Canvai canvas with multiple design frames"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          display: 'block',
          zIndex: 1,
        }}
      />
      {/* Semi-transparent dark band at bottom for text legibility */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        background: 'linear-gradient(to top, rgba(28, 26, 23, 0.92) 0%, rgba(28, 26, 23, 0.78) 60%, transparent 100%)',
        padding: '80px 48px 48px',
        boxSizing: 'border-box',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <h1 style={{
            fontFamily: cormorant,
            fontSize: 80,
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: C.onDark,
            margin: 0,
            textWrap: 'pretty',
            WebkitFontSmoothing: 'antialiased',
          }}>
            Every frame<br />is alive
          </h1>
          <p style={{
            fontFamily: workSans,
            fontSize: 16,
            fontWeight: 300,
            lineHeight: 1.6,
            color: C.onDarkSec,
            margin: '20px 0 0',
            maxWidth: 440,
            textWrap: 'pretty',
            WebkitFontSmoothing: 'antialiased',
          }}>
            An infinite, zoomable canvas where every Claude Code generation
            lives as a frame you can compare, annotate, and keep.
          </p>
        </div>
      </div>
      {/* Film frame reference number — top right corner */}
      <span style={{
        position: 'absolute',
        top: 20,
        right: 48,
        fontFamily: workSans,
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: '0.06em',
        color: C.onDarkSec,
        zIndex: 21,
        textWrap: 'pretty',
      }}>No. 001</span>
    </section>
  )
}

// ── Pull quote ──────────────────────────────────────────────────────────
function PullQuote() {
  return (
    <section style={{
      maxWidth: 640,
      margin: '0 auto',
      padding: '96px 48px',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: cormorant,
        fontSize: 32,
        fontWeight: 400,
        fontStyle: 'italic',
        lineHeight: 1.45,
        color: C.text,
        margin: 0,
        textWrap: 'pretty',
        WebkitFontSmoothing: 'antialiased',
      }}>
        "Chat gives you one thing at a time. A canvas lets you
        see every direction at once — and that changes how you think."
      </p>
      <div style={{
        width: 40,
        height: 1,
        background: C.accent,
        margin: '32px auto 0',
      }} />
    </section>
  )
}

// ── Features as contact sheet ───────────────────────────────────────────
const features = [
  {
    num: '01',
    title: 'Compare, don\u2019t choose',
    desc: 'Five layouts, one canvas. Zoom in on detail, zoom out for the whole picture. No more scrolling through chat history.',
  },
  {
    num: '02',
    title: 'Point and refine',
    desc: 'Click anywhere on the canvas and describe the change. The code updates in real time. No tickets, no handoffs, no waiting.',
  },
  {
    num: '03',
    title: 'Every version preserved',
    desc: 'Nothing is overwritten. Go back to Tuesday. Branch from any point. Your entire creative history stays on the canvas.',
  },
]

function ContactFrame({ feature }: { feature: typeof features[0] }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{
      border: `1px solid ${h ? C.border : C.borderLight}`,
      background: C.card,
      transition: `border-color 0.2s ${springCSS}, box-shadow 0.3s ease`,
      boxShadow: h ? C.shadow2 : C.shadow1,
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Thin top accent bar — like a film frame edge */}
      <div style={{
        height: 2,
        background: h ? C.accent : C.borderLight,
        transition: `background 0.3s ${springCSS}`,
      }} />
      {/* Content area with film-like padding */}
      <div style={{ padding: '32px 28px 28px', flex: 1 }}>
        <h3 style={{
          fontFamily: cormorant,
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.2,
          color: C.text,
          margin: 0,
          textWrap: 'pretty',
          WebkitFontSmoothing: 'antialiased',
        }}>{feature.title}</h3>
        <p style={{
          fontFamily: workSans,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.65,
          color: h ? C.textSec : C.textTer,
          margin: '16px 0 0',
          textWrap: 'pretty',
          transition: `color 0.2s ease`,
          WebkitFontSmoothing: 'antialiased',
        }}>{feature.desc}</p>
      </div>
      {/* Bottom caption — like film frame numbering */}
      <div style={{
        padding: '12px 28px',
        borderTop: `1px solid ${C.borderLight}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: workSans,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.06em',
          color: h ? C.accent : C.textTer,
          transition: `color 0.2s ${springCSS}`,
          textWrap: 'pretty',
        }}>{feature.num}</span>
        <span style={{
          fontFamily: workSans,
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: '0.04em',
          color: C.textTer,
          textTransform: 'uppercase',
          textWrap: 'pretty',
        }}>canvai</span>
      </div>
    </div>
  )
}

function ContactSheet() {
  return (
    <section style={{
      maxWidth: 1120,
      margin: '0 auto',
      padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      {/* Section label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 40,
      }}>
        <span style={{
          fontFamily: workSans,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: C.textTer,
          textWrap: 'pretty',
        }}>Contact Sheet</span>
        <div style={{
          flex: 1,
          height: 1,
          background: C.borderLight,
        }} />
      </div>
      {/* 3-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
      }}>
        {features.map(f => (
          <ContactFrame key={f.num} feature={f} />
        ))}
      </div>
    </section>
  )
}

// ── Full-bleed secondary image ──────────────────────────────────────────
function SecondaryImage() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      margin: '0 0 96px',
    }}>
      <img
        src={productDirections}
        alt="Multiple design directions side by side on the canvas"
        style={{
          width: '100%',
          display: 'block',
        }}
      />
      {/* Caption overlay — bottom right */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: '16px 48px 20px',
        background: 'linear-gradient(to right, transparent, rgba(28, 26, 23, 0.64) 40%)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <span style={{
          fontFamily: workSans,
          fontSize: 11,
          fontWeight: 400,
          color: C.onDarkSec,
          letterSpacing: '0.04em',
          textWrap: 'pretty',
        }}>No. 002</span>
        <span style={{
          fontFamily: cormorant,
          fontSize: 15,
          fontWeight: 400,
          fontStyle: 'italic',
          color: C.onDark,
          textWrap: 'pretty',
          WebkitFontSmoothing: 'antialiased',
        }}>Five directions, one canvas session</span>
      </div>
    </section>
  )
}

// ── Details — 2-column split ────────────────────────────────────────────
function Details() {
  return (
    <section style={{
      maxWidth: 1120,
      margin: '0 auto',
      padding: '0 48px 96px',
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'start',
    }}>
      {/* Left — large serif title */}
      <div>
        <h2 style={{
          fontFamily: cormorant,
          fontSize: 52,
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          color: C.text,
          margin: 0,
          textWrap: 'pretty',
          WebkitFontSmoothing: 'antialiased',
        }}>
          Design is spatial.<br />
          Your tools should be too.
        </h2>
      </div>
      {/* Right — body text */}
      <div style={{ paddingTop: 12 }}>
        <p style={{
          fontFamily: workSans,
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.7,
          color: C.textSec,
          margin: '0 0 24px',
          textWrap: 'pretty',
          WebkitFontSmoothing: 'antialiased',
        }}>
          Claude Code generates one thing at a time. That is the right model
          for code. It is the wrong model for design, where seeing many
          directions at once is the whole point.
        </p>
        <p style={{
          fontFamily: workSans,
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.7,
          color: C.textSec,
          margin: '0 0 24px',
          textWrap: 'pretty',
          WebkitFontSmoothing: 'antialiased',
        }}>
          Canvai adds the spatial layer. Every generation is a frame on an
          infinite, zoomable canvas. Compare five layouts. Annotate directly.
          Branch from any point. Nothing is overwritten.
        </p>
        <p style={{
          fontFamily: workSans,
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.7,
          color: C.textSec,
          margin: 0,
          textWrap: 'pretty',
          WebkitFontSmoothing: 'antialiased',
        }}>
          Every frame is live React. Not a screenshot, not a prototype.
          Real code running in the browser, ready for production.
        </p>
      </div>
    </section>
  )
}

// ── Bottom CTA ──────────────────────────────────────────────────────────
function BottomCTA() {
  const [h, hB] = useHover()
  const [p, pB] = usePress()
  return (
    <section style={{
      maxWidth: 640,
      margin: '0 auto',
      textAlign: 'center',
      padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        fontFamily: cormorant,
        fontSize: 44,
        fontWeight: 400,
        lineHeight: 1.15,
        color: C.text,
        margin: '0 0 12px',
        textWrap: 'pretty',
        WebkitFontSmoothing: 'antialiased',
      }}>Start composing</h2>
      <p style={{
        fontFamily: workSans,
        fontSize: 14,
        fontWeight: 400,
        color: C.textTer,
        margin: '0 0 36px',
        textWrap: 'pretty',
        WebkitFontSmoothing: 'antialiased',
      }}>Free, open source, runs in your terminal.</p>
      <button {...hB} {...pB} style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 36px',
        border: 'none',
        borderRadius: 4,
        background: h ? C.accentHover : C.accent,
        cursor: 'default',
        fontFamily: workSans,
        fontSize: 14,
        fontWeight: 500,
        color: C.onDark,
        letterSpacing: '0.02em',
        transform: p ? 'scale(0.96)' : h ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.2s ${springCSS}, background 0.2s ease`,
        boxShadow: h ? '0 4px 20px rgba(194, 65, 12, 0.24)' : '0 2px 8px rgba(194, 65, 12, 0.16)',
        textWrap: 'pretty',
        WebkitFontSmoothing: 'antialiased',
      }}>
        Get started
      </button>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 48px',
      maxWidth: 1440,
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      borderTop: `1px solid ${C.borderLight}`,
    }}>
      <span style={{
        fontFamily: cormorant,
        fontSize: 18,
        fontWeight: 500,
        color: C.textTer,
        textWrap: 'pretty',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        {['GitHub', 'Docs', 'Twitter'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)}
            onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: workSans,
              fontSize: 12,
              fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default',
              textWrap: 'pretty',
            }}>{link}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main export ─────────────────────────────────────────────────────────
export function Aperture() {
  return (
    <div style={{
      background: C.bg,
      minHeight: '100%',
      overflow: 'auto',
      fontFamily: workSans,
      WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <PullQuote />
      <ContactSheet />
      <SecondaryImage />
      <Details />
      <BottomCTA />
      <Footer />
    </div>
  )
}
