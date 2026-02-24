import { useState, useEffect } from 'react'
import productDirections from '../../screenshots/product-directions.png'
import canvasWide from '../../screenshots/canvas-wide.png'

// ── Lumen — Vercel-inspired editorial light ────────────────────────────
// Warm cream, oversized serif headlines, dramatic multi-layer shadows.
// Confident, editorial, distinctly NOT generic AI aesthetic.

const C = {
  bg: '#FDFCFA',
  bgWarm: '#FAF8F5',
  surface: '#F7F5F2',
  text: '#1C1917',
  textSec: '#57534E',
  textTer: '#A8A29E',
  border: '#E7E5E4',
  borderWarm: '#D6D3D1',
  accent: '#92400E',
  accentHover: '#78350F',
  accentGlow: 'rgba(146, 64, 14, 0.08)',
  onAccent: '#FEFDFB',
  // Tobias Ahlin multi-layer shadows
  shadow1: '0 1px 1px rgba(28,25,23,0.03), 0 0 0 1px rgba(28,25,23,0.02)',
  shadow3: '0 2px 4px rgba(28,25,23,0.04), 0 4px 8px rgba(28,25,23,0.04), 0 8px 16px rgba(28,25,23,0.04)',
  shadow5: '0 2px 4px rgba(28,25,23,0.02), 0 4px 8px rgba(28,25,23,0.03), 0 8px 16px rgba(28,25,23,0.04), 0 16px 32px rgba(28,25,23,0.05), 0 32px 64px rgba(28,25,23,0.06)',
  shadowDramatic: '0 4px 8px rgba(28,25,23,0.03), 0 8px 16px rgba(28,25,23,0.04), 0 16px 32px rgba(28,25,23,0.05), 0 32px 64px rgba(28,25,23,0.06), 0 64px 128px rgba(28,25,23,0.08)',
}

const serif = '"Playfair Display", Georgia, "Times New Roman", serif'
const sans = '"Satoshi", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const mono = '"SF Mono", "Fira Code", Menlo, monospace'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// ── Noise texture as inline SVG data URI ────────────────────────────────
const grainOverlay: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  opacity: 0.4,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundSize: '256px 256px',
  zIndex: 1,
}

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
  useEffect(() => {
    if (document.querySelector('[data-lumen-fonts]')) return
    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://fonts.googleapis.com'
    document.head.appendChild(preconnect)

    const preconnect2 = document.createElement('link')
    preconnect2.rel = 'preconnect'
    preconnect2.href = 'https://fonts.gstatic.com'
    preconnect2.crossOrigin = 'anonymous'
    document.head.appendChild(preconnect2)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap'
    link.setAttribute('data-lumen-fonts', 'true')
    document.head.appendChild(link)

    return () => {
      preconnect.remove()
      preconnect2.remove()
      link.remove()
    }
  }, [])
  return null
}

// ── Nav ─────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      position: 'relative', zIndex: 10,
    }}>
      <span style={{
        fontFamily: serif, fontSize: 20, fontWeight: 700,
        color: C.text, letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'About', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: sans, fontSize: 14, fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: sans, fontWeight: 500,
          fontSize: 14, borderRadius: 8, padding: '8px 20px',
          background: C.accent, color: C.onAccent,
          transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: bh ? `0 0 0 4px ${C.accentGlow}` : 'none',
        }}>Get started</button>
      </div>
    </nav>
  )
}

// ── Hero — 60/40 asymmetric split ───────────────────────────────────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [cardHover, cardHoverB] = useHover()
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '3fr 2fr',
      maxWidth: 1280, margin: '0 auto', padding: '80px 48px 96px',
      gap: 64, alignItems: 'center', boxSizing: 'border-box',
      position: 'relative', zIndex: 2,
    }}>
      {/* Left — 60% text */}
      <div>
        <div style={{
          fontFamily: sans, fontSize: 13, fontWeight: 500,
          color: C.accent, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
          marginBottom: 24, textWrap: 'pretty',
        }}>
          Design with AI
        </div>
        <h1 style={{
          fontFamily: serif, fontSize: 72, fontWeight: 900,
          color: C.text, lineHeight: 1.05, letterSpacing: '-0.03em',
          margin: '0 0 28px', textWrap: 'pretty',
        }}>
          The canvas<br />for code
        </h1>
        <p style={{
          fontFamily: sans, fontSize: 19, fontWeight: 400,
          color: C.textSec, marginTop: 0, marginBottom: 40,
          lineHeight: 1.65, textWrap: 'pretty', maxWidth: 480,
        }}>
          An infinite, zoomable canvas where every AI generation lives as a frame
          you can see side by side, compare across iterations, and ship as real code.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button {...bhB} {...baB} style={{
            border: 'none', cursor: 'default', fontFamily: sans, fontWeight: 600,
            fontSize: 16, borderRadius: 8, padding: '12px 32px',
            background: C.accent, color: C.onAccent,
            transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
            transition: `transform 0.15s ${springCSS}, box-shadow 0.25s ease`,
            boxShadow: bh
              ? `0 4px 16px rgba(146,64,14,0.2), 0 0 0 4px ${C.accentGlow}`
              : '0 2px 8px rgba(146,64,14,0.12)',
          }}>Start designing</button>
          <span style={{
            fontFamily: sans, fontSize: 14, fontWeight: 400,
            color: C.textTer, textWrap: 'pretty',
          }}>Free and open source</span>
        </div>
      </div>

      {/* Right — 40% floating product card */}
      <div {...cardHoverB} style={{
        borderRadius: 12, overflow: 'hidden',
        background: C.onAccent,
        boxShadow: cardHover ? C.shadowDramatic : C.shadow5,
        transform: cardHover ? 'translateY(-8px) rotate(-0.5deg)' : 'translateY(0) rotate(0deg)',
        transition: `transform 0.4s ${springCSS}, box-shadow 0.4s ease`,
        position: 'relative',
      }}>
        <div style={{
          padding: '12px 12px 0 12px',
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
        }}>
          <div style={{ display: 'flex', gap: 6, paddingBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.borderWarm }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.borderWarm }} />
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.borderWarm }} />
          </div>
        </div>
        <img src={productDirections} alt="Four design directions rendered live on the Canvai canvas" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Divider ─────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px',
      boxSizing: 'border-box', position: 'relative', zIndex: 2,
    }}>
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${C.borderWarm}, transparent)`,
      }} />
    </div>
  )
}

// ── Features — editorial 2-column grid with oversized numbers ───────────
const features = [
  {
    num: '01',
    title: 'See every direction at once',
    desc: 'Five layouts on one canvas instead of one at a time in a chat thread. Compare, contrast, and converge on the strongest direction without losing anything.',
  },
  {
    num: '02',
    title: 'Annotate directly on the canvas',
    desc: 'Click anywhere on a live frame and describe what should change. The AI updates the code while you watch. No more copying screenshots into chat.',
  },
  {
    num: '03',
    title: 'Every version preserved forever',
    desc: 'Nothing is overwritten. Go back to yesterday. Branch from any iteration. The entire history of your design thinking is always one click away.',
  },
]

function Features() {
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '96px 48px 120px',
      boxSizing: 'border-box', position: 'relative', zIndex: 2,
    }}>
      <div style={{
        fontFamily: sans, fontSize: 13, fontWeight: 500,
        color: C.accent, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
        marginBottom: 48, textWrap: 'pretty',
      }}>
        How it works
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '64px 80px',
      }}>
        {features.map(f => (
          <div key={f.num} style={{
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <span style={{
              fontFamily: mono, fontSize: 48, fontWeight: 400,
              color: C.border, lineHeight: 1, letterSpacing: '-0.04em',
              textWrap: 'pretty',
            }}>{f.num}</span>
            <h3 style={{
              fontFamily: serif, fontSize: 28, fontWeight: 700,
              color: C.text, margin: 0, lineHeight: 1.2,
              letterSpacing: '-0.02em', textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: sans, fontSize: 16, fontWeight: 400,
              color: C.textSec, margin: 0, lineHeight: 1.65,
              textWrap: 'pretty', maxWidth: 420,
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Full-bleed product image ────────────────────────────────────────────
function FullBleedImage() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px 120px',
      boxSizing: 'border-box', position: 'relative', zIndex: 2,
    }}>
      <div {...hB} style={{
        borderRadius: 16, overflow: 'hidden',
        boxShadow: h ? C.shadowDramatic : C.shadow5,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.4s ${springCSS}, box-shadow 0.4s ease`,
      }}>
        <img src={canvasWide} alt="Canvai canvas showing a full design workspace with multiple frames" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Testimonial / Quote ─────────────────────────────────────────────────
function Quote() {
  return (
    <section style={{
      maxWidth: 800, margin: '0 auto', padding: '0 48px 120px',
      textAlign: 'center', boxSizing: 'border-box',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{
        fontFamily: serif, fontSize: 14, fontWeight: 400,
        color: C.borderWarm, marginBottom: 32, letterSpacing: '0.2em',
      }}>
        &#8226; &#8226; &#8226;
      </div>
      <blockquote style={{
        fontFamily: serif, fontSize: 32, fontWeight: 400,
        fontStyle: 'italic', color: C.text, lineHeight: 1.45,
        letterSpacing: '-0.01em', margin: '0 0 28px',
        textWrap: 'pretty',
      }}>
        &ldquo;I used to describe a UI in chat and get one result at a time.
        Now I see five directions on one canvas and ship the one I love.&rdquo;
      </blockquote>
      <div style={{
        fontFamily: sans, fontSize: 14, fontWeight: 500,
        color: C.textSec, textWrap: 'pretty',
      }}>
        A designer, somewhere
      </div>
      <div style={{
        fontFamily: sans, fontSize: 13, fontWeight: 400,
        color: C.textTer, marginTop: 4, textWrap: 'pretty',
      }}>
        Building with Canvai
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
      maxWidth: 720, margin: '0 auto', textAlign: 'center',
      padding: '0 48px 120px', boxSizing: 'border-box',
      position: 'relative', zIndex: 2,
    }}>
      <h2 style={{
        fontFamily: serif, fontSize: 48, fontWeight: 900,
        color: C.text, letterSpacing: '-0.03em',
        lineHeight: 1.1, margin: '0 0 16px', textWrap: 'pretty',
      }}>Your next design<br />could ship today</h2>
      <p style={{
        fontFamily: sans, fontSize: 17, fontWeight: 400,
        color: C.textTer, margin: '0 0 40px', textWrap: 'pretty',
        lineHeight: 1.6,
      }}>
        Free, open source, and built for designers who code — or coders who design.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: sans, fontWeight: 600,
        fontSize: 16, borderRadius: 8, padding: '16px 40px',
        background: C.accent, color: C.onAccent,
        transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.25s ease`,
        boxShadow: bh
          ? `0 4px 16px rgba(146,64,14,0.2), 0 0 0 4px ${C.accentGlow}`
          : '0 2px 8px rgba(146,64,14,0.12)',
      }}>Start designing</button>
    </section>
  )
}

// ── Footer — 4-column grid ──────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  const cols = [
    { heading: 'Product', links: ['Features', 'Changelog', 'Roadmap'] },
    { heading: 'Resources', links: ['Documentation', 'Examples', 'Blog'] },
    { heading: 'Community', links: ['GitHub', 'Discord', 'Twitter'] },
    { heading: 'Company', links: ['About', 'Open source', 'Contact'] },
  ]
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`,
      position: 'relative', zIndex: 2,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '64px 48px 40px',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr',
          gap: 48,
        }}>
          {/* Brand column */}
          <div>
            <span style={{
              fontFamily: serif, fontSize: 20, fontWeight: 700,
              color: C.text, display: 'block', marginBottom: 12,
            }}>canvai</span>
            <p style={{
              fontFamily: sans, fontSize: 13, fontWeight: 400,
              color: C.textTer, margin: 0, lineHeight: 1.55,
              textWrap: 'pretty', maxWidth: 200,
            }}>
              The spatial canvas for AI-generated design.
            </p>
          </div>
          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <div style={{
                fontFamily: sans, fontSize: 12, fontWeight: 600,
                color: C.textTer, letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                marginBottom: 16, textWrap: 'pretty',
              }}>{col.heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(link => (
                  <span key={link}
                    onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
                    style={{
                      fontFamily: sans, fontSize: 13, fontWeight: 400, cursor: 'default',
                      color: hl === link ? C.text : C.textSec,
                      transition: `color 0.15s ${springCSS}`,
                      textWrap: 'pretty',
                    }}>{link}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 64, paddingTop: 20,
          borderTop: `1px solid ${C.border}`,
        }}>
          <span style={{
            fontFamily: sans, fontSize: 12, fontWeight: 400,
            color: C.textTer, textWrap: 'pretty',
          }}>
            Built with Canvai
          </span>
          <span style={{
            fontFamily: sans, fontSize: 12, fontWeight: 400,
            color: C.textTer, textWrap: 'pretty',
          }}>
            Open source under MIT
          </span>
        </div>
      </div>
    </footer>
  )
}

// ── Main export ─────────────────────────────────────────────────────────
export function Lumen() {
  return (
    <div style={{
      background: C.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: sans, WebkitFontSmoothing: 'antialiased',
      cursor: 'default', position: 'relative',
    }}>
      <FontLoader />
      {/* Grain texture overlay */}
      <div style={grainOverlay} />
      <Nav />
      <Hero />
      <Divider />
      <Features />
      <FullBleedImage />
      <Quote />
      <Divider />
      <BottomCTA />
      <Footer />
    </div>
  )
}
