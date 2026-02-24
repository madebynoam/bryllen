import { useState } from 'react'
import { LP, Dark, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// -- Mono palette: hairline borders, near-black bg, off-white text --
const M = {
  border: '#1E1E1E',
  borderHover: '#333333',
  codeBg: '#0E0E0E',
  codeText: '#9A9A9A',
  codeKeyword: '#CCCCCC',
  codeAccent: '#777777',
  divider: '#1A1A1A',
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
      padding: `${LP.s16}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderBottom: `1px solid ${M.border}`,
    }}>
      <span style={{
        fontFamily: LP.mono, fontSize: 18, fontWeight: 600,
        color: Dark.text, letterSpacing: '-0.02em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: LP.font, fontSize: 13, fontWeight: 500,
              color: hl === link ? Dark.text : Dark.textTertiary,
              transition: `color 0.2s ${springGentle}`,
              cursor: 'default', textWrap: 'pretty',
            }}>
            {link}
          </span>
        ))}
      </div>
    </nav>
  )
}

// -- Hero --
function Hero() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: `120px ${LP.s32}px ${LP.s80}px`,
      maxWidth: 900, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: LP.font, fontSize: 88, fontWeight: 300,
        color: Dark.text, lineHeight: 1.0, letterSpacing: '-0.04em',
        margin: 0, textWrap: 'pretty',
      }}>
        Design in code.
      </h1>
      <p style={{
        fontFamily: LP.font, fontSize: 19, fontWeight: 400,
        color: Dark.textSecondary, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.55, textWrap: 'pretty', maxWidth: 480,
      }}>
        An infinite canvas where every frame is a live React component.
        No export step. No handoff.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: LP.font, fontWeight: 600,
        fontSize: 15, borderRadius: LP.pillRadius,
        padding: `${LP.s12}px ${LP.s32}px`,
        background: Dark.accent, color: Dark.text,
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.25s ${spring}, box-shadow 0.25s ${springGentle}`,
        boxShadow: bh ? '0 4px 24px rgba(232,89,12,0.3)' : 'none',
      }}>
        Install Plugin
      </button>
    </section>
  )
}

// -- Main Screenshot --
function MainScreenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s32}px ${LP.s80}px`,
    }}>
      <div {...hB} style={{
        borderRadius: LP.s12, overflow: 'hidden',
        border: `1px solid ${M.border}`,
        transition: `transform 0.4s ${springGentle}, box-shadow 0.4s ${springGentle}, border-color 0.3s ease`,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: h ? M.borderHover : M.border,
        boxShadow: h
          ? '0 16px 48px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.2)',
      }}>
        <img src={pulseDashboard} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// -- Features --
const features = [
  { title: 'Live Canvas', desc: 'Every frame is a real React component running in the browser. Edit code, see it instantly.' },
  { title: 'Annotations', desc: 'Click anywhere to leave feedback. Your AI agent picks it up and iterates in real time.' },
  { title: 'Iterations', desc: 'Every change is versioned. Compare, revert, branch. Nothing is ever lost.' },
]

function Features() {
  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s32}px`,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
      }}>
        {features.map((f, i) => (
          <div key={f.title} style={{
            padding: `0 ${LP.s32}px`,
            borderLeft: i > 0 ? `1px solid ${M.divider}` : 'none',
          }}>
            <h3 style={{
              fontFamily: LP.font, fontSize: 17, fontWeight: 600,
              color: Dark.text, margin: 0, marginBottom: LP.s12,
              textWrap: 'pretty',
            }}>{f.title}</h3>
            <p style={{
              fontFamily: LP.font, fontSize: 15, fontWeight: 400,
              color: Dark.textSecondary, margin: 0, lineHeight: 1.6,
              textWrap: 'pretty',
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// -- Code Block --
function CodeBlock() {
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s32}px`,
    }}>
      <div style={{
        background: M.codeBg,
        border: `1px solid ${M.border}`,
        borderRadius: LP.s12, padding: LP.s32,
        fontFamily: LP.mono, fontSize: 14, lineHeight: 1.8,
      }}>
        <div>
          <span style={{ color: M.codeAccent }}>{'> '}</span>
          <span style={{ color: M.codeKeyword }}>/canvai-new</span>
          <span style={{ color: M.codeText }}>{' my-project'}</span>
        </div>
        <div style={{ marginTop: LP.s4 }}>
          <span style={{ color: Dark.textTertiary }}>{'  Scaffolding project...'}</span>
        </div>
        <div style={{ marginTop: LP.s16 }}>
          <span style={{ color: M.codeAccent }}>{'> '}</span>
          <span style={{ color: M.codeKeyword }}>/canvai-design</span>
        </div>
        <div style={{ marginTop: LP.s4 }}>
          <span style={{ color: Dark.textTertiary }}>{'  Canvas running at '}</span>
          <span style={{ color: Dark.textSecondary }}>{'localhost:5173'}</span>
        </div>
      </div>
    </section>
  )
}

// -- Secondary Screenshots --
function SecondaryScreenshots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const cardStyle = (hovered: boolean): React.CSSProperties => ({
    borderRadius: LP.s12, overflow: 'hidden',
    border: `1px solid ${hovered ? M.borderHover : M.border}`,
    transition: `transform 0.35s ${springGentle}, box-shadow 0.35s ${springGentle}, border-color 0.3s ease`,
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: hovered
      ? '0 12px 36px rgba(0,0,0,0.35)'
      : '0 4px 16px rgba(0,0,0,0.15)',
  })

  return (
    <section style={{
      maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s32}px ${LP.s80}px`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s20 }}>
        <div {...h1B} style={cardStyle(h1)}>
          <img src={pulseComponents} alt="Component matrix" style={{ width: '100%', display: 'block' }} />
        </div>
        <div {...h2B} style={cardStyle(h2)}>
          <img src={pulseSettings} alt="Design settings" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
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
      padding: `${LP.s64}px ${LP.s32}px`, textAlign: 'center',
    }}>
      <h2 style={{
        fontFamily: LP.font, fontSize: LP.h2Size, fontWeight: 300,
        color: Dark.text, margin: 0, marginBottom: LP.s16,
        letterSpacing: '-0.03em', textWrap: 'pretty',
      }}>
        Start designing
      </h2>
      <p style={{
        fontFamily: LP.font, fontSize: 15, fontWeight: 400,
        color: Dark.textTertiary, margin: 0, marginBottom: LP.s32,
        textWrap: 'pretty',
      }}>
        Free and open source.
      </p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: LP.font, fontWeight: 600,
        fontSize: 15, borderRadius: LP.pillRadius,
        padding: `${LP.s12}px ${LP.s32}px`,
        background: Dark.accent, color: Dark.text,
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.25s ${spring}, box-shadow 0.25s ${springGentle}`,
        boxShadow: bh ? '0 4px 24px rgba(232,89,12,0.3)' : 'none',
      }}>
        Install Plugin
      </button>
    </section>
  )
}

// -- Footer --
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s20}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${M.border}`,
    }}>
      <span style={{
        fontFamily: LP.mono, fontSize: 14, fontWeight: 600,
        color: Dark.textTertiary,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s24 }}>
        {['GitHub', 'Docs'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: LP.font, fontSize: 13, fontWeight: 500,
              color: hl === link ? Dark.text : Dark.textTertiary,
              transition: `color 0.2s ${springGentle}`,
              cursor: 'default', textWrap: 'pretty',
            }}>
            {link}
          </span>
        ))}
      </div>
    </footer>
  )
}

// -- Main Export --
export function Mono() {
  return (
    <div style={{
      background: Dark.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: LP.font, WebkitFontSmoothing: 'antialiased',
    }}>
      <Nav />
      <Hero />
      <MainScreenshot />
      <Features />
      <CodeBlock />
      <SecondaryScreenshots />
      <BottomCTA />
      <Footer />
    </div>
  )
}
