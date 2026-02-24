import { useState } from 'react'
import { LP, Dark, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// -- Vapor palette: atmospheric warm fog on near-black --
const V = {
  fogWarm: 'rgba(232, 89, 12, 0.04)',
  fogAmber: 'rgba(245, 158, 11, 0.03)',
  lightBeam: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(245, 158, 11, 0.08), transparent 70%)',
  glowSoft: '0 0 80px 40px rgba(232, 89, 12, 0.06)',
  glowHover: '0 0 120px 60px rgba(232, 89, 12, 0.10)',
  textDim: '#888888',
  vignette: 'radial-gradient(ellipse 70% 50% at 50% 50%, transparent 50%, rgba(0, 0, 0, 0.4) 100%)',
}

// -- Interaction hooks --
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// -- Nav --
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s20}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 10,
    }}>
      <span style={{
        fontFamily: LP.mono, fontSize: 16, fontWeight: 600,
        color: Dark.textTertiary, letterSpacing: '-0.02em',
        transition: `color 0.3s ${springGentle}`,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: LP.font, fontSize: 13, fontWeight: 500,
              color: hl === link ? Dark.text : Dark.textTertiary,
              transition: `color 0.25s ${springGentle}`,
              cursor: 'default', textWrap: 'pretty',
            }}>
            {link}
          </span>
        ))}
      </div>
    </nav>
  )
}

// -- Light beam (volumetric light at top) --
function LightBeam() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 800,
      background: V.lightBeam,
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

// -- Fog layer --
function FogLayer({ top, left, size, color }: {
  top: string; left: string; size: number; color: string
}) {
  return (
    <div style={{
      position: 'absolute', top, left, width: size, height: size,
      borderRadius: '50%', background: color, filter: 'blur(80px)',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

// -- Hero --
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: `120px ${LP.s32}px ${LP.s64}px`,
      maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2,
    }}>
      <h1 style={{
        fontFamily: LP.font, fontSize: 64, fontWeight: 600,
        color: Dark.text, lineHeight: 1.08, letterSpacing: '-0.035em',
        margin: 0, textWrap: 'pretty',
      }}>
        Design at the speed of thought.
      </h1>
      <p style={{
        fontFamily: LP.font, fontSize: 19, fontWeight: 400,
        color: V.textDim, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.55, textWrap: 'pretty', maxWidth: 500,
      }}>
        An infinite canvas where every frame is live React code.
        No export step. No handoff. Just design.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: LP.font, fontWeight: 600,
        fontSize: 15, borderRadius: LP.pillRadius,
        padding: `${LP.s12}px ${LP.s32}px`,
        background: Dark.accent, color: Dark.text,
        transform: ba ? 'scale(0.95)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.25s ${spring}, box-shadow 0.35s ${springGentle}`,
        boxShadow: bh
          ? '0 4px 32px rgba(232,89,12,0.35), 0 0 80px rgba(232,89,12,0.12)'
          : '0 2px 16px rgba(232,89,12,0.15)',
      }}>
        Install Plugin
      </button>
    </section>
  )
}

// -- Main Screenshot with glow halo --
function MainScreenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s32}px ${LP.s80}px`,
      position: 'relative', zIndex: 2,
    }}>
      <div style={{ position: 'relative' }}>
        {/* Glow halo behind screenshot */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', height: '80%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(232,89,12,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          transition: `opacity 0.5s ${springGentle}`,
          opacity: h ? 1.4 : 1,
        }} />
        <div {...hB} style={{
          position: 'relative',
          borderRadius: LP.s12, overflow: 'hidden',
          border: `1px solid ${h ? Dark.border : Dark.borderSubtle}`,
          transition: `transform 0.4s ${springGentle}, box-shadow 0.5s ${springGentle}, border-color 0.3s ease`,
          transform: h ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: h
            ? '0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(232,89,12,0.08)'
            : '0 8px 40px rgba(0,0,0,0.3)',
        }}>
          <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

// -- Feature fog --
const features = [
  {
    title: 'Live Code Canvas',
    desc: 'Every frame is a real React component running in the browser. Edit code, see it instantly. No compile step, no refresh.',
  },
  {
    title: 'Point & Click Annotations',
    desc: 'Click anywhere on the canvas to leave feedback. Your AI agent picks it up and iterates in real time.',
  },
  {
    title: 'Instant Iterations',
    desc: 'Every change creates a versioned iteration. Compare side by side, revert in one click. Nothing is ever lost.',
  },
]

function FeatureFog() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 680, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s32}px`, position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: LP.s64 }}>
        {features.map((f, i) => {
          const hovered = hoveredIdx === i
          // Each feature has a fog bank positioned differently
          const fogPositions = [
            { left: '-20%', color: V.fogWarm },
            { left: '60%', color: V.fogAmber },
            { left: '10%', color: V.fogWarm },
          ]
          return (
            <div key={f.title}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ position: 'relative', cursor: 'default' }}
            >
              {/* Fog bank behind feature */}
              <div style={{
                position: 'absolute', top: '-40px',
                left: fogPositions[i].left, width: 400, height: 200,
                borderRadius: '50%',
                background: fogPositions[i].color,
                filter: 'blur(60px)', pointerEvents: 'none',
                transition: `opacity 0.5s ${springGentle}`,
                opacity: hovered ? 2.5 : 1,
              }} />
              <div style={{ position: 'relative' }}>
                <h3 style={{
                  fontFamily: LP.font, fontSize: 22, fontWeight: 600,
                  color: hovered ? Dark.text : Dark.textSecondary,
                  margin: 0, marginBottom: LP.s12,
                  transition: `color 0.3s ${springGentle}`,
                  textWrap: 'pretty',
                }}>{f.title}</h3>
                <p style={{
                  fontFamily: LP.font, fontSize: 16, fontWeight: 400,
                  color: hovered ? V.textDim : Dark.textTertiary,
                  margin: 0, lineHeight: 1.65,
                  transition: `color 0.3s ${springGentle}`,
                  textWrap: 'pretty',
                }}>{f.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// -- Floating screenshots at angles --
function FloatingScreenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()

  const glowStyle = (hovered: boolean): React.CSSProperties => ({
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%', height: '75%', borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(232,89,12,0.05) 0%, transparent 65%)',
    filter: 'blur(30px)', pointerEvents: 'none',
    transition: `opacity 0.4s ${springGentle}`,
    opacity: hovered ? 1.8 : 1,
  })

  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s48}px ${LP.s80}px`,
      position: 'relative', zIndex: 2,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s24,
        alignItems: 'start',
      }}>
        {/* Left screenshot, tilted -1deg */}
        <div {...h1B} style={{ position: 'relative', marginTop: LP.s20 }}>
          <div style={glowStyle(h1)} />
          <div style={{
            position: 'relative',
            borderRadius: LP.s12, overflow: 'hidden',
            border: `1px solid ${h1 ? Dark.border : Dark.borderSubtle}`,
            transform: h1
              ? 'rotate(-1deg) translateY(-8px) scale(1.01)'
              : 'rotate(-1deg)',
            transition: `transform 0.4s ${springGentle}, box-shadow 0.4s ${springGentle}, border-color 0.3s ease`,
            boxShadow: h1
              ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(232,89,12,0.06)'
              : '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: h1 ? 3 : 1,
          }}>
            <img src={pulseComponents} alt="Component matrix" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
        {/* Right screenshot, tilted +1deg, offset down for overlap feel */}
        <div {...h2B} style={{ position: 'relative', marginTop: LP.s48 }}>
          <div style={glowStyle(h2)} />
          <div style={{
            position: 'relative',
            borderRadius: LP.s12, overflow: 'hidden',
            border: `1px solid ${h2 ? Dark.border : Dark.borderSubtle}`,
            transform: h2
              ? 'rotate(1deg) translateY(-8px) scale(1.01)'
              : 'rotate(1deg)',
            transition: `transform 0.4s ${springGentle}, box-shadow 0.4s ${springGentle}, border-color 0.3s ease`,
            boxShadow: h2
              ? '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(232,89,12,0.06)'
              : '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: h2 ? 3 : 1,
          }}>
            <img src={pulseSettings} alt="Design settings" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

// -- Quote --
function Quote() {
  return (
    <section style={{
      maxWidth: 800, margin: '0 auto',
      padding: `${LP.s80}px ${LP.s32}px`, textAlign: 'center',
      position: 'relative', zIndex: 2,
    }}>
      {/* Pool of warm light behind quote */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 200, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <p style={{
        fontFamily: LP.font, fontSize: LP.h2Size, fontWeight: 300,
        fontStyle: 'italic', color: Dark.text, lineHeight: 1.35,
        letterSpacing: '-0.02em', margin: 0, position: 'relative',
        textWrap: 'pretty',
      }}>
        "The future of UI design is code."
      </p>
    </section>
  )
}

// -- Bottom CTA --
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s32}px ${LP.s80}px`, textAlign: 'center',
      position: 'relative', zIndex: 2,
    }}>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: LP.font, fontWeight: 600,
        fontSize: 16, borderRadius: LP.pillRadius,
        padding: `${LP.s16}px ${LP.s40}px`,
        background: Dark.accent, color: Dark.text,
        transform: ba ? 'scale(0.95)' : bh ? 'scale(1.03)' : 'scale(1)',
        transition: `transform 0.25s ${spring}, box-shadow 0.4s ${springGentle}`,
        boxShadow: bh
          ? '0 6px 40px rgba(232,89,12,0.35), 0 0 100px rgba(232,89,12,0.10)'
          : '0 2px 20px rgba(232,89,12,0.15)',
      }}>
        Start designing
      </button>
      <p style={{
        fontFamily: LP.font, fontSize: 14, fontWeight: 400,
        color: Dark.textTertiary, marginTop: LP.s20,
        textWrap: 'pretty',
      }}>
        Free and open source. A Claude Code plugin.
      </p>
    </section>
  )
}

// -- Footer --
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s24}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      position: 'relative', zIndex: 2,
    }}>
      {/* Subtle warmth at bottom edge */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 120, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(232,89,12,0.02) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <span style={{
        fontFamily: LP.mono, fontSize: 14, fontWeight: 600,
        color: Dark.textTertiary, position: 'relative',
        letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24, position: 'relative' }}>
        {['GitHub', 'Docs'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: LP.font, fontSize: 13, fontWeight: 500,
              color: hl === link ? V.textDim : Dark.textTertiary,
              transition: `color 0.25s ${springGentle}`,
              cursor: 'default', textWrap: 'pretty',
            }}>
            {link}
          </span>
        ))}
      </div>
    </footer>
  )
}

// -- Vignette overlay --
function Vignette() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: V.vignette,
      pointerEvents: 'none', zIndex: 1,
    }} />
  )
}

// -- Main Export --
export function Vapor() {
  return (
    <div style={{
      background: Dark.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: LP.font, WebkitFontSmoothing: 'antialiased',
      position: 'relative',
    }}>
      {/* Atmospheric layers */}
      <LightBeam />
      <Vignette />
      <FogLayer top="-100px" left="-10%" size={800} color={V.fogWarm} />
      <FogLayer top="400px" left="60%" size={600} color={V.fogAmber} />
      <FogLayer top="1200px" left="-5%" size={700} color={V.fogAmber} />
      <FogLayer top="2000px" left="50%" size={500} color={V.fogWarm} />

      {/* Content */}
      <Nav />
      <Hero />
      <MainScreenshot />
      <FeatureFog />
      <FloatingScreenshots />
      <Quote />
      <BottomCTA />
      <Footer />
    </div>
  )
}
