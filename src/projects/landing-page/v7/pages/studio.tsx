/* ------------------------------------------------------------------ */
/*  Studio — Furniture studio aesthetic with bold orange accent        */
/*  Inspired by: gola.io context image, overlapping cards              */
/* ------------------------------------------------------------------ */

const SERIF = 'Georgia, "Times New Roman", serif'
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'

const S = {
  bg: 'oklch(0.96 0.012 75)',      // Warm cream
  bgDark: 'oklch(0.15 0 0)',       // Near black
  text: 'oklch(0.12 0 0)',         // Dark text
  textMuted: 'oklch(0.45 0 0)',    // Muted
  textLight: 'oklch(0.92 0 0)',    // Light text on dark
  accent: 'oklch(0.58 0.22 28)',   // Bold orange-red
  border: 'oklch(0.88 0.015 75)',
}

function Nav() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 64px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{
          fontSize: 18,
          fontWeight: 400,
          color: S.text,
          fontFamily: SERIF,
        }}>— Studio</span>
      </div>
      <div style={{
        display: 'flex',
        gap: 40,
        fontSize: 12,
        color: S.textMuted,
        fontFamily: SANS,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        <span>Work</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: '40px 64px 120px',
    }}>
      {/* Main content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        alignItems: 'start',
      }}>
        {/* Left: Typography */}
        <div style={{ paddingTop: 40 }}>
          <p style={{
            fontSize: 12,
            color: S.textMuted,
            margin: 0,
            marginBottom: 24,
            fontFamily: SANS,
            lineHeight: 1.7,
            maxWidth: 320,
          }}>
            Your house have many functions, which
            requires that its device be ergonomic — This
            begins to help you make the most of your
            space.
          </p>
          <h1 style={{
            fontSize: 96,
            fontWeight: 400,
            color: S.text,
            lineHeight: 0.95,
            letterSpacing: -3,
            margin: 0,
            fontFamily: SERIF,
            marginTop: 100,
          }}>
            — STU
            <br />
            ROMA
            <br />
            NEW /
          </h1>
        </div>

        {/* Right: Overlapping cards */}
        <div style={{
          position: 'relative',
          height: 500,
        }}>
          {/* Back card - cream with image */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 340,
            height: 420,
            background: 'oklch(0.92 0.02 70)',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
            {/* Chair placeholder */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, oklch(0.85 0.04 50) 0%, oklch(0.75 0.06 40) 100%)',
            }} />
          </div>

          {/* Front card - orange with nav */}
          <div style={{
            position: 'absolute',
            top: 80,
            right: 100,
            width: 300,
            height: 360,
            background: S.accent,
            borderRadius: 8,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              {['ABOUT US', 'BLOG', 'CONTACT'].map(item => (
                <span key={item} style={{
                  fontSize: 32,
                  fontWeight: 400,
                  color: 'white',
                  fontFamily: SERIF,
                  letterSpacing: -0.5,
                }}>— {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section style={{
      padding: '80px 64px',
      background: S.bgDark,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 40,
      }}>
        {[
          { title: 'Interior decoration', items: ['Living spaces', 'Bedrooms', 'Kitchens'] },
          { title: 'Details in projects', items: ['Materials', 'Lighting', 'Textures'] },
          { title: 'Modern approach', items: ['Sustainable', 'Minimal', 'Timeless'] },
        ].map((section, i) => (
          <div key={i}>
            <h3 style={{
              fontSize: 14,
              fontWeight: 500,
              color: S.textLight,
              margin: 0,
              marginBottom: 20,
              fontFamily: SANS,
            }}>{section.title}</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              {section.items.map(item => (
                <span key={item} style={{
                  fontSize: 13,
                  color: 'oklch(0.6 0 0)',
                  fontFamily: SANS,
                }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section style={{
      padding: '80px 64px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 24,
        marginBottom: 24,
      }}>
        <div style={{
          height: 400,
          background: 'oklch(0.25 0.01 50)',
          borderRadius: 8,
        }} />
        <div style={{
          height: 400,
          background: 'oklch(0.88 0.03 70)',
          borderRadius: 8,
        }} />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 24,
      }}>
        <div style={{
          height: 300,
          background: S.accent,
          borderRadius: 8,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <span style={{
            fontSize: 24,
            color: 'white',
            fontFamily: SERIF,
          }}>View all
            <br />projects →</span>
        </div>
        <div style={{
          height: 300,
          background: 'oklch(0.92 0.02 75)',
          borderRadius: 8,
        }} />
      </div>
    </section>
  )
}

function About() {
  return (
    <section style={{
      padding: '80px 64px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      borderTop: `1px solid ${S.border}`,
    }}>
      <div>
        <p style={{
          fontSize: 11,
          color: S.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          margin: 0,
          marginBottom: 24,
          fontFamily: SANS,
        }}>About us</p>
        <p style={{
          fontSize: 24,
          fontWeight: 400,
          color: S.text,
          lineHeight: 1.5,
          margin: 0,
          fontFamily: SERIF,
        }}>
          House must fully reflect
          personality of the owner
          — Which is why we...
        </p>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        paddingTop: 32,
      }}>
        <p style={{
          fontSize: 14,
          color: S.textMuted,
          lineHeight: 1.7,
          margin: 0,
          fontFamily: SANS,
        }}>
          We believe in design that speaks quietly but carries weight.
          Every project is a conversation between space, light, and the
          people who will live within it.
        </p>
        <button style={{
          padding: '14px 28px',
          background: S.text,
          color: S.bg,
          border: 'none',
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 500,
          fontFamily: SANS,
          cursor: 'default',
          alignSelf: 'flex-start',
        }}>Learn more</button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '48px 64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: `1px solid ${S.border}`,
    }}>
      <span style={{
        fontSize: 16,
        fontFamily: SERIF,
        color: S.text,
      }}>— Studio</span>
      <div style={{
        display: 'flex',
        gap: 32,
        fontSize: 12,
        color: S.textMuted,
        fontFamily: SANS,
      }}>
        <span>Instagram</span>
        <span>Pinterest</span>
        <span>Behance</span>
      </div>
      <span style={{
        fontSize: 12,
        color: S.textMuted,
        fontFamily: SANS,
      }}>© 2026</span>
    </footer>
  )
}

export function Studio() {
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
      <Features />
      <Gallery />
      <About />
      <Footer />
    </div>
  )
}
