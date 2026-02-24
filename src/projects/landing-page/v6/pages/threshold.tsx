import { useState } from 'react'
import productDirections from '../../screenshots/product-directions.png'
import canvasWide from '../../screenshots/canvas-wide.png'

// ── Threshold — Swiss International split-screen poster ──────────────────
// 50/50 charcoal / cream. Josef Muller-Brockmann meets Apple.
// Geometric precision, dramatic contrast, zero decoration.
// ONE accent: signal red. Everything else is charcoal or cream.

const C = {
  charcoal: '#1C1B1A',
  cream: '#FAF9F6',
  red: '#DC2626',
  textDark: '#1C1B1A',
  textLight: '#FAF9F6',
  textSecDark: '#5A5856',
  textSecLight: '#B8B5B0',
  textTerDark: '#8A8785',
  textTerLight: '#7A7672',
  borderDark: '#2E2D2B',
  borderLight: '#E8E6E2',
  shadow1: '0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
  shadow2: '0 4px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
  shadow3: '0 12px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
  shadowDeep: '0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)',
}

const font = '"Instrument Sans", "DM Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
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
    <link
      href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  )
}

// ── Nav — full width, logo on charcoal side, links on cream ─────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', width: '100%', position: 'absolute' as const,
      top: 0, left: 0, zIndex: 10,
    }}>
      {/* Left half — charcoal */}
      <div style={{
        width: '50%', padding: '20px 48px',
        display: 'flex', alignItems: 'center',
        boxSizing: 'border-box' as const,
      }}>
        <span style={{
          fontFamily: font, fontSize: 16, fontWeight: 600,
          color: C.textLight, letterSpacing: '0.02em',
          textWrap: 'pretty' as const,
        }}>canvai</span>
      </div>
      {/* Right half — cream */}
      <div style={{
        width: '50%', padding: '20px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        gap: 32, boxSizing: 'border-box' as const,
      }}>
        {['Features', 'Philosophy', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 500,
              color: hl === link ? C.textDark : C.textTerDark,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty' as const,
              letterSpacing: '0.01em',
            }}>{link}</span>
        ))}
      </div>
    </nav>
  )
}

// ── Hero — 50/50 split, text crossing boundary, floating product ────────
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()

  return (
    <section style={{
      display: 'flex', width: '100%', minHeight: 720,
      position: 'relative' as const,
    }}>
      {/* Left half — charcoal */}
      <div style={{
        width: '50%', background: C.charcoal,
        display: 'flex', flexDirection: 'column' as const,
        justifyContent: 'center', alignItems: 'flex-end',
        padding: '120px 0 120px 48px',
        boxSizing: 'border-box' as const,
        position: 'relative' as const,
      }}>
        {/* Decorative circle — top left */}
        <div style={{
          position: 'absolute' as const, top: 80, left: 48,
          width: 48, height: 48, borderRadius: '50%',
          border: `1px solid ${C.borderDark}`,
        }} />

        <div style={{ paddingRight: 80, maxWidth: 560 }}>
          <h1 style={{
            fontFamily: font, fontSize: 64, fontWeight: 700,
            color: C.textLight, lineHeight: 1.05,
            letterSpacing: '-0.03em', margin: 0,
            textWrap: 'pretty' as const,
          }}>
            Describe{'\u00A0'}once.
          </h1>
          <p style={{
            fontFamily: font, fontSize: 16, fontWeight: 400,
            color: C.textSecLight, marginTop: 24, marginBottom: 0,
            lineHeight: 1.6, textWrap: 'pretty' as const,
            maxWidth: 320,
          }}>
            An infinite canvas for Claude Code. See five directions at once instead of one at a time.
          </p>
        </div>
      </div>

      {/* Right half — cream */}
      <div style={{
        width: '50%', background: C.cream,
        display: 'flex', flexDirection: 'column' as const,
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '120px 48px 120px 0',
        boxSizing: 'border-box' as const,
        position: 'relative' as const,
      }}>
        {/* Decorative circle — bottom right */}
        <div style={{
          position: 'absolute' as const, bottom: 80, right: 48,
          width: 48, height: 48, borderRadius: '50%',
          background: C.red, opacity: 0.12,
        }} />

        <div style={{ paddingLeft: 80, maxWidth: 560 }}>
          <h1 style={{
            fontFamily: font, fontSize: 64, fontWeight: 700,
            color: C.textDark, lineHeight: 1.05,
            letterSpacing: '-0.03em', margin: 0,
            textWrap: 'pretty' as const,
          }}>
            See{'\u00A0'}many.
          </h1>
          <div style={{ marginTop: 40 }}>
            <button {...bhB} {...baB} style={{
              border: 'none', cursor: 'default', fontFamily: font,
              fontWeight: 600, fontSize: 14, letterSpacing: '0.01em',
              borderRadius: 4, padding: '12px 32px',
              background: C.red, color: C.cream,
              transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
              transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
              boxShadow: bh ? '0 4px 16px rgba(220,38,38,0.25)' : 'none',
            }}>Start designing</button>
          </div>
        </div>
      </div>

      {/* Floating product screenshot — straddling the split boundary */}
      <div style={{
        position: 'absolute' as const,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640, zIndex: 5,
      }}>
        <div style={{
          borderRadius: 8, overflow: 'hidden',
          boxShadow: C.shadowDeep,
          border: `1px solid rgba(0,0,0,0.08)`,
        }}>
          <img src={productDirections} alt="Four design directions on the Canvai canvas" style={{
            width: '100%', display: 'block',
          }} />
        </div>
      </div>

      {/* Vertical hairline at the split */}
      <div style={{
        position: 'absolute' as const, top: 0, bottom: 0,
        left: '50%', width: 1,
        background: 'rgba(0,0,0,0.06)',
        zIndex: 1,
      }} />
    </section>
  )
}

// ── Features — 4-column strict grid with hairline borders ───────────────
const features = [
  {
    title: 'Spatial comparison',
    desc: 'Five layouts on one canvas. See patterns emerge across directions that a chat thread hides.',
  },
  {
    title: 'Point and refine',
    desc: 'Click anywhere on the canvas. Describe the change. The code updates in place.',
  },
  {
    title: 'Version archaeology',
    desc: 'Nothing is overwritten. Every iteration preserved. Go back to Tuesday. Branch from any point.',
  },
  {
    title: 'Ship what you see',
    desc: 'What renders on the canvas is the code. No handoff. No prototype. Deploy directly.',
  },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)

  return (
    <section style={{
      background: C.cream, padding: '96px 48px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 48,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: C.red,
          }} />
          <span style={{
            fontFamily: font, fontSize: 12, fontWeight: 600,
            color: C.textTerDark, letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            textWrap: 'pretty' as const,
          }}>Features</span>
        </div>

        {/* 4-column grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${C.borderLight}`,
          borderBottom: `1px solid ${C.borderLight}`,
        }}>
          {features.map((f, i) => (
            <div key={f.title}
              onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
              style={{
                padding: '32px 24px 32px 0',
                borderRight: i < 3 ? `1px solid ${C.borderLight}` : 'none',
                paddingLeft: i > 0 ? 24 : 0,
                cursor: 'default',
              }}>
              {/* Red dot marker */}
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: hi === i ? C.red : C.borderLight,
                transition: `background 0.2s ${springCSS}`,
                marginBottom: 20,
              }} />
              <h3 style={{
                fontFamily: font, fontSize: 15, fontWeight: 600,
                color: C.textDark, margin: '0 0 8px',
                textWrap: 'pretty' as const, lineHeight: 1.3,
              }}>{f.title}</h3>
              <p style={{
                fontFamily: font, fontSize: 13, fontWeight: 400,
                color: hi === i ? C.textSecDark : C.textTerDark,
                margin: 0, lineHeight: 1.6,
                textWrap: 'pretty' as const,
                transition: `color 0.15s ${springCSS}`,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Full-width product section on charcoal ──────────────────────────────
function ProductWide() {
  const [h, hB] = useHover()
  return (
    <section style={{
      background: C.charcoal, padding: '96px 48px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 48,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            border: `1px solid ${C.borderDark}`,
          }} />
          <span style={{
            fontFamily: font, fontSize: 12, fontWeight: 600,
            color: C.textTerLight, letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            textWrap: 'pretty' as const,
          }}>The canvas</span>
        </div>

        <div {...hB} style={{
          borderRadius: 8, overflow: 'hidden',
          border: `1px solid ${C.borderDark}`,
          boxShadow: h ? '0 24px 64px rgba(0,0,0,0.4)' : '0 12px 48px rgba(0,0,0,0.25)',
          transform: h ? 'translateY(-4px)' : 'translateY(0)',
          transition: `transform 0.3s ${springCSS}, box-shadow 0.3s ease`,
        }}>
          <img src={canvasWide} alt="Canvai infinite canvas with multiple design directions" style={{
            width: '100%', display: 'block',
          }} />
        </div>
      </div>
    </section>
  )
}

// ── Philosophy / quote section on cream ─────────────────────────────────
function Philosophy() {
  return (
    <section style={{
      background: C.cream, padding: '120px 48px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        maxWidth: 960, margin: '0 auto',
        display: 'flex', flexDirection: 'column' as const,
        alignItems: 'center',
      }}>
        {/* Decorative red line */}
        <div style={{
          width: 48, height: 2, background: C.red,
          marginBottom: 48,
        }} />

        <blockquote style={{
          fontFamily: font, fontSize: 32, fontWeight: 400,
          color: C.textDark, lineHeight: 1.4,
          letterSpacing: '-0.01em', margin: 0,
          textAlign: 'center' as const,
          fontStyle: 'italic' as const,
          textWrap: 'pretty' as const,
          maxWidth: 720,
        }}>
          Design used to mean choosing between directions you couldn't see. The canvas makes the invisible visible.
        </blockquote>

        <p style={{
          fontFamily: font, fontSize: 13, fontWeight: 500,
          color: C.textTerDark, marginTop: 32, margin: '32px 0 0',
          letterSpacing: '0.04em',
          textWrap: 'pretty' as const,
          textAlign: 'center' as const,
        }}>
          The comparison surface is the product.
        </p>
      </div>
    </section>
  )
}

// ── Bottom CTA — 50/50 split with button at center intersection ────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()

  return (
    <section style={{
      display: 'flex', width: '100%', minHeight: 400,
      position: 'relative' as const,
    }}>
      {/* Left half — charcoal */}
      <div style={{
        width: '50%', background: C.charcoal,
        display: 'flex', flexDirection: 'column' as const,
        justifyContent: 'center', alignItems: 'flex-end',
        padding: '80px 80px 80px 48px',
        boxSizing: 'border-box' as const,
      }}>
        <div style={{ maxWidth: 400, textAlign: 'right' as const }}>
          <h2 style={{
            fontFamily: font, fontSize: 36, fontWeight: 700,
            color: C.textLight, lineHeight: 1.15,
            letterSpacing: '-0.02em', margin: 0,
            textWrap: 'pretty' as const,
          }}>
            Ready to see everything at once?
          </h2>
        </div>
      </div>

      {/* Right half — cream */}
      <div style={{
        width: '50%', background: C.cream,
        display: 'flex', flexDirection: 'column' as const,
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '80px 48px 80px 80px',
        boxSizing: 'border-box' as const,
      }}>
        <div style={{ maxWidth: 400 }}>
          <p style={{
            fontFamily: font, fontSize: 15, fontWeight: 400,
            color: C.textSecDark, margin: '0 0 32px',
            lineHeight: 1.6, textWrap: 'pretty' as const,
          }}>
            Install the plugin. Describe what you want. The canvas does the rest.
          </p>
          <button {...bhB} {...baB} style={{
            border: 'none', cursor: 'default', fontFamily: font,
            fontWeight: 600, fontSize: 14, letterSpacing: '0.01em',
            borderRadius: 4, padding: '12px 32px',
            background: C.charcoal, color: C.cream,
            transform: ba ? 'scale(0.92)' : bh ? 'scale(1.01)' : 'scale(1)',
            transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
            boxShadow: bh ? C.shadow3 : 'none',
          }}>Get started</button>
        </div>
      </div>

      {/* Vertical hairline at the split */}
      <div style={{
        position: 'absolute' as const, top: 0, bottom: 0,
        left: '50%', width: 1,
        background: 'rgba(0,0,0,0.06)',
      }} />

      {/* Red circle at center intersection */}
      <div style={{
        position: 'absolute' as const,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 56, height: 56, borderRadius: '50%',
        background: C.red,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
        boxShadow: '0 4px 16px rgba(220,38,38,0.3)',
      }}>
        {/* Arrow icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'block' }}>
          <path d="M6 14L14 6M14 6H7M14 6V13" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

// ── Footer — full width, minimal ────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', width: '100%',
    }}>
      {/* Left half — charcoal */}
      <div style={{
        width: '50%', background: C.charcoal,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center',
        boxSizing: 'border-box' as const,
      }}>
        <span style={{
          fontFamily: font, fontSize: 13, fontWeight: 500,
          color: C.textTerLight,
          textWrap: 'pretty' as const,
        }}>canvai</span>
      </div>
      {/* Right half — cream */}
      <div style={{
        width: '50%', background: C.cream,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
        gap: 24, boxSizing: 'border-box' as const,
        borderTop: `1px solid ${C.borderLight}`,
      }}>
        {['GitHub', 'Docs', 'Twitter'].map(l => (
          <span key={l}
            onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: font, fontSize: 13, fontWeight: 400,
              cursor: 'default',
              color: hl === l ? C.textDark : C.textTerDark,
              transition: `color 0.15s ${springCSS}`,
              textWrap: 'pretty' as const,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main export ─────────────────────────────────────────────────────────
export function Threshold() {
  return (
    <div style={{
      minHeight: '100%', overflow: 'auto',
      fontFamily: font,
      WebkitFontSmoothing: 'antialiased',
      cursor: 'default',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <Features />
      <ProductWide />
      <Philosophy />
      <BottomCTA />
      <Footer />
    </div>
  )
}
