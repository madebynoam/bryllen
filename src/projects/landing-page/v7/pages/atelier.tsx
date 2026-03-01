/* ------------------------------------------------------------------ */
/*  Atelier — Warm minimal with strong typography, subtle orange       */
/*  Inspired by: gola.io context, refined editorial approach           */
/* ------------------------------------------------------------------ */

const SERIF = 'Georgia, "Times New Roman", serif'
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'

const S = {
  bg: 'oklch(0.97 0.01 70)',       // Warm off-white
  bgWarm: 'oklch(0.94 0.02 65)',   // Warmer section
  bgDark: 'oklch(0.18 0 0)',       // Dark sections
  text: 'oklch(0.15 0 0)',         // Near black
  textMuted: 'oklch(0.5 0.01 50)', // Warm gray
  textLight: 'oklch(0.95 0 0)',
  accent: 'oklch(0.6 0.2 30)',     // Terracotta orange
  border: 'oklch(0.9 0.015 70)',
}

function Nav() {
  return (
    <nav style={{
      padding: '32px 80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{
        fontSize: 20,
        fontFamily: SERIF,
        color: S.text,
        fontStyle: 'italic',
      }}>Atelier</span>
      <div style={{
        display: 'flex',
        gap: 48,
        fontSize: 13,
        color: S.text,
        fontFamily: SANS,
      }}>
        <span>Projects</span>
        <span>Philosophy</span>
        <span>Journal</span>
        <span>Contact</span>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{
      padding: '60px 80px 100px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'center',
    }}>
      <div>
        <h1 style={{
          fontSize: 72,
          fontWeight: 400,
          color: S.text,
          lineHeight: 1.05,
          letterSpacing: -2,
          margin: 0,
          fontFamily: SERIF,
        }}>
          Spaces that
          <br />
          <em style={{ fontStyle: 'italic' }}>breathe</em> with
          <br />
          intention.
        </h1>
        <p style={{
          fontSize: 15,
          color: S.textMuted,
          lineHeight: 1.7,
          margin: 0,
          marginTop: 32,
          maxWidth: 400,
          fontFamily: SANS,
        }}>
          We design interiors that honor both the craft of making
          and the art of living. Each project is a study in restraint.
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        height: 480,
      }}>
        <div style={{
          background: 'oklch(0.75 0.06 45)',
          borderRadius: 12,
        }} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={{
            flex: 1,
            background: S.accent,
            borderRadius: 12,
          }} />
          <div style={{
            flex: 1,
            background: 'oklch(0.88 0.03 75)',
            borderRadius: 12,
          }} />
        </div>
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section style={{
      padding: '100px 80px',
      background: S.bgWarm,
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 11,
          color: S.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 2,
          margin: 0,
          marginBottom: 32,
          fontFamily: SANS,
        }}>Our approach</p>
        <h2 style={{
          fontSize: 42,
          fontWeight: 400,
          color: S.text,
          lineHeight: 1.4,
          margin: 0,
          fontFamily: SERIF,
        }}>
          "Design should serve life, not demand attention.
          The best spaces are those you feel before you see."
        </h2>
        <p style={{
          fontSize: 13,
          color: S.textMuted,
          margin: 0,
          marginTop: 32,
          fontFamily: SANS,
        }}>— Studio philosophy, 2018</p>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section style={{
      padding: '100px 80px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 48,
      }}>
        <div>
          <p style={{
            fontSize: 11,
            color: S.textMuted,
            textTransform: 'uppercase',
            letterSpacing: 2,
            margin: 0,
            marginBottom: 12,
            fontFamily: SANS,
          }}>Selected work</p>
          <h3 style={{
            fontSize: 32,
            fontWeight: 400,
            color: S.text,
            margin: 0,
            fontFamily: SERIF,
          }}>Recent projects</h3>
        </div>
        <span style={{
          fontSize: 13,
          color: S.accent,
          fontFamily: SANS,
          borderBottom: `1px solid ${S.accent}`,
          paddingBottom: 2,
        }}>View all work →</span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
      }}>
        {[
          { name: 'Maison Lumière', type: 'Residential', color: 'oklch(0.82 0.04 80)' },
          { name: 'Café Noir', type: 'Hospitality', color: 'oklch(0.25 0.02 40)' },
          { name: 'Studio Blanc', type: 'Commercial', color: 'oklch(0.72 0.05 150)' },
        ].map((project, i) => (
          <div key={i}>
            <div style={{
              height: 320,
              background: project.color,
              borderRadius: 8,
              marginBottom: 20,
            }} />
            <h4 style={{
              fontSize: 18,
              fontWeight: 400,
              color: S.text,
              margin: 0,
              marginBottom: 6,
              fontFamily: SERIF,
            }}>{project.name}</h4>
            <p style={{
              fontSize: 12,
              color: S.textMuted,
              margin: 0,
              fontFamily: SANS,
            }}>{project.type}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Services() {
  return (
    <section style={{
      padding: '100px 80px',
      background: S.bgDark,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 120,
      }}>
        <div>
          <p style={{
            fontSize: 11,
            color: 'oklch(0.6 0 0)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            margin: 0,
            marginBottom: 20,
            fontFamily: SANS,
          }}>Services</p>
          <h3 style={{
            fontSize: 28,
            fontWeight: 400,
            color: S.textLight,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: SERIF,
          }}>
            From concept
            <br />
            to completion.
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px 64px',
        }}>
          {[
            { num: '01', title: 'Space Planning', desc: 'Thoughtful layouts that maximize function and flow.' },
            { num: '02', title: 'Material Selection', desc: 'Curated palettes of natural, enduring materials.' },
            { num: '03', title: 'Custom Furniture', desc: 'Bespoke pieces designed for your specific space.' },
            { num: '04', title: 'Project Management', desc: 'Seamless execution from design to installation.' },
          ].map(service => (
            <div key={service.num}>
              <span style={{
                fontSize: 11,
                color: S.accent,
                fontFamily: SANS,
              }}>{service.num}</span>
              <h4 style={{
                fontSize: 18,
                fontWeight: 400,
                color: S.textLight,
                margin: 0,
                marginTop: 12,
                marginBottom: 8,
                fontFamily: SERIF,
              }}>{service.title}</h4>
              <p style={{
                fontSize: 13,
                color: 'oklch(0.6 0 0)',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: SANS,
              }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section style={{
      padding: '100px 80px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'center',
    }}>
      <div>
        <p style={{
          fontSize: 11,
          color: S.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 2,
          margin: 0,
          marginBottom: 24,
          fontFamily: SANS,
        }}>Start a project</p>
        <h3 style={{
          fontSize: 42,
          fontWeight: 400,
          color: S.text,
          lineHeight: 1.3,
          margin: 0,
          marginBottom: 24,
          fontFamily: SERIF,
        }}>
          Let's create
          <br />
          something together.
        </h3>
        <button style={{
          padding: '16px 32px',
          background: S.accent,
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          fontFamily: SANS,
          cursor: 'default',
        }}>Get in touch</button>
      </div>
      <div style={{
        height: 360,
        background: 'oklch(0.85 0.04 55)',
        borderRadius: 12,
      }} />
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      padding: '48px 80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: `1px solid ${S.border}`,
    }}>
      <span style={{
        fontSize: 16,
        fontFamily: SERIF,
        fontStyle: 'italic',
        color: S.text,
      }}>Atelier</span>
      <div style={{
        display: 'flex',
        gap: 40,
        fontSize: 12,
        color: S.textMuted,
        fontFamily: SANS,
      }}>
        <span>Instagram</span>
        <span>Pinterest</span>
        <span>LinkedIn</span>
      </div>
      <span style={{
        fontSize: 12,
        color: S.textMuted,
        fontFamily: SANS,
      }}>© 2026 Atelier Studio</span>
    </footer>
  )
}

export function Atelier() {
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
      <Statement />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}
