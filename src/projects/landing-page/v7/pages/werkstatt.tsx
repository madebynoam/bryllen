/* ------------------------------------------------------------------ */
/*  Werkstatt — Bold geometric with strong black/orange contrast       */
/*  Inspired by: gola.io context, German design studio aesthetic       */
/* ------------------------------------------------------------------ */

const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const DISPLAY = 'system-ui, sans-serif'

const S = {
  bg: 'oklch(0.98 0.005 80)',      // Near white
  bgDark: 'oklch(0.12 0 0)',       // Pure black
  bgOrange: 'oklch(0.62 0.23 30)', // Bold orange
  text: 'oklch(0.1 0 0)',
  textMuted: 'oklch(0.55 0 0)',
  textLight: 'oklch(0.97 0 0)',
  border: 'oklch(0.92 0 0)',
}

function Nav() {
  return (
    <nav style={{
      padding: '24px 60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: S.bg,
    }}>
      <span style={{
        fontSize: 22,
        fontWeight: 700,
        color: S.text,
        fontFamily: DISPLAY,
        textTransform: 'uppercase',
        letterSpacing: -0.5,
      }}>WERK</span>
      <div style={{
        display: 'flex',
        gap: 32,
        fontSize: 11,
        color: S.text,
        fontFamily: SANS,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
      }}>
        <span>Projects</span>
        <span>Studio</span>
        <span>Process</span>
        <span>Contact</span>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: 600,
    }}>
      {/* Left: Black with text */}
      <div style={{
        background: S.bgDark,
        padding: '80px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{
            fontSize: 11,
            color: 'oklch(0.5 0 0)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            margin: 0,
            marginBottom: 32,
            fontFamily: SANS,
          }}>Design studio / Est. 2019</p>
          <h1 style={{
            fontSize: 64,
            fontWeight: 700,
            color: S.textLight,
            lineHeight: 1,
            letterSpacing: -2,
            margin: 0,
            fontFamily: DISPLAY,
            textTransform: 'uppercase',
          }}>
            WE
            <br />
            MAKE
            <br />
            THINGS
            <br />
            <span style={{ color: S.bgOrange }}>WORK.</span>
          </h1>
        </div>
        <p style={{
          fontSize: 14,
          color: 'oklch(0.6 0 0)',
          lineHeight: 1.7,
          margin: 0,
          maxWidth: 320,
          fontFamily: SANS,
        }}>
          Industrial design meets digital craft.
          We build products that perform.
        </p>
      </div>

      {/* Right: Orange with navigation */}
      <div style={{
        background: S.bgOrange,
        padding: '80px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {['FURNITURE', 'LIGHTING', 'OBJECTS', 'SPACES'].map((item, i) => (
            <div key={item} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}>
              <span style={{
                fontSize: 36,
                fontWeight: 700,
                color: 'white',
                fontFamily: DISPLAY,
                letterSpacing: -1,
              }}>{item}</span>
              <span style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: SANS,
              }}>0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section style={{
      padding: '60px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 40,
      borderBottom: `1px solid ${S.border}`,
    }}>
      {[
        { num: '127', label: 'Projects completed' },
        { num: '12', label: 'Design awards' },
        { num: '8', label: 'Countries' },
        { num: '15', label: 'Team members' },
      ].map(stat => (
        <div key={stat.label}>
          <span style={{
            fontSize: 48,
            fontWeight: 700,
            color: S.text,
            fontFamily: DISPLAY,
            letterSpacing: -2,
          }}>{stat.num}</span>
          <p style={{
            fontSize: 12,
            color: S.textMuted,
            margin: 0,
            marginTop: 8,
            fontFamily: SANS,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>{stat.label}</p>
        </div>
      ))}
    </section>
  )
}

function Work() {
  return (
    <section style={{
      padding: '80px 60px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 48,
      }}>
        <h2 style={{
          fontSize: 14,
          fontWeight: 600,
          color: S.text,
          margin: 0,
          fontFamily: SANS,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}>Selected Work</h2>
        <span style={{
          fontSize: 12,
          color: S.textMuted,
          fontFamily: SANS,
        }}>View archive →</span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: 24,
      }}>
        <div style={{
          height: 400,
          background: S.bgDark,
          borderRadius: 4,
          gridRow: 'span 2',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
          }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              color: S.textLight,
              margin: 0,
              fontFamily: DISPLAY,
              textTransform: 'uppercase',
            }}>Axis Chair</h3>
            <p style={{
              fontSize: 12,
              color: 'oklch(0.5 0 0)',
              margin: 0,
              marginTop: 4,
              fontFamily: SANS,
            }}>Furniture / 2024</p>
          </div>
        </div>
        <div style={{
          height: 188,
          background: 'oklch(0.92 0.02 75)',
          borderRadius: 4,
        }} />
        <div style={{
          height: 188,
          background: S.bgOrange,
          borderRadius: 4,
        }} />
        <div style={{
          height: 188,
          background: 'oklch(0.85 0.03 180)',
          borderRadius: 4,
        }} />
        <div style={{
          height: 188,
          background: 'oklch(0.75 0.05 50)',
          borderRadius: 4,
        }} />
      </div>
    </section>
  )
}

function Process() {
  return (
    <section style={{
      padding: '80px 60px',
      background: 'oklch(0.96 0.005 80)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 100,
      }}>
        <div>
          <h2 style={{
            fontSize: 14,
            fontWeight: 600,
            color: S.text,
            margin: 0,
            marginBottom: 20,
            fontFamily: SANS,
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}>How We Work</h2>
          <p style={{
            fontSize: 14,
            color: S.textMuted,
            lineHeight: 1.7,
            margin: 0,
            fontFamily: SANS,
          }}>
            Our process is methodical yet adaptive.
            We believe in iteration through making.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
        }}>
          {[
            { step: '01', title: 'Research', desc: 'Deep dive into context, constraints, and possibilities.' },
            { step: '02', title: 'Prototype', desc: 'Rapid physical and digital modeling to test ideas.' },
            { step: '03', title: 'Refine', desc: 'Obsessive attention to detail until it feels right.' },
          ].map(item => (
            <div key={item.step}>
              <span style={{
                fontSize: 11,
                color: S.bgOrange,
                fontFamily: SANS,
                fontWeight: 600,
              }}>{item.step}</span>
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                color: S.text,
                margin: 0,
                marginTop: 12,
                marginBottom: 8,
                fontFamily: DISPLAY,
                textTransform: 'uppercase',
              }}>{item.title}</h3>
              <p style={{
                fontSize: 13,
                color: S.textMuted,
                lineHeight: 1.6,
                margin: 0,
                fontFamily: SANS,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{
      padding: '100px 60px',
      background: S.bgDark,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div>
        <h2 style={{
          fontSize: 42,
          fontWeight: 700,
          color: S.textLight,
          margin: 0,
          fontFamily: DISPLAY,
          textTransform: 'uppercase',
          letterSpacing: -1,
        }}>
          HAVE A PROJECT
          <br />
          IN MIND?
        </h2>
      </div>
      <button style={{
        padding: '18px 40px',
        background: S.bgOrange,
        color: 'white',
        border: 'none',
        borderRadius: 4,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: SANS,
        textTransform: 'uppercase',
        letterSpacing: 1,
        cursor: 'default',
      }}>Start a conversation</button>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '32px 60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: S.bg,
    }}>
      <span style={{
        fontSize: 18,
        fontWeight: 700,
        color: S.text,
        fontFamily: DISPLAY,
        textTransform: 'uppercase',
      }}>WERK</span>
      <div style={{
        display: 'flex',
        gap: 32,
        fontSize: 11,
        color: S.textMuted,
        fontFamily: SANS,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        <span>Instagram</span>
        <span>Behance</span>
        <span>LinkedIn</span>
      </div>
      <span style={{
        fontSize: 11,
        color: S.textMuted,
        fontFamily: SANS,
      }}>© 2026 Werkstatt</span>
    </footer>
  )
}

export function Werkstatt() {
  return (
    <div style={{
      minHeight: '100%',
      background: S.bg,
      fontFamily: SANS,
      WebkitFontSmoothing: 'antialiased',
      cursor: 'default',
    }}>
      <Nav />
      <Hero />
      <Stats />
      <Work />
      <Process />
      <CTA />
      <Footer />
    </div>
  )
}
