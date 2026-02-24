import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'
import productDirections from '../../screenshots/product-directions.png'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'

// ── Carbon — Developer Marketing, Terminal-Native ────────────────────────
// Dark bg with amber/gold accent. Code IS the design language.
// GitHub marketing meets Warp terminal.
const C = {
  bg: '#0D0D0D',
  surface: '#141414',
  surfaceRaised: '#1A1A1A',
  surfaceCode: '#111111',
  text: '#E5E5E5',
  textSec: '#999999',
  textTer: '#666666',
  textDim: '#444444',
  border: 'rgba(255, 255, 255, 0.06)',
  borderHover: 'rgba(255, 255, 255, 0.12)',
  amber: '#F59E0B',
  amberSoft: 'rgba(245, 158, 11, 0.12)',
  amberBorder: 'rgba(245, 158, 11, 0.24)',
  amberGlow: '0 0 40px rgba(245, 158, 11, 0.12), 0 0 80px rgba(245, 158, 11, 0.04)',
  amberGlowStrong: '0 0 60px rgba(245, 158, 11, 0.20), 0 0 120px rgba(245, 158, 11, 0.08)',
  // Syntax colors
  synKeyword: '#F59E0B',
  synString: '#34D399',
  synComment: '#4B5563',
  synFunction: '#60A5FA',
  synFlag: '#F59E0B',
  synPunctuation: '#6B7280',
  synPrompt: '#666666',
  synOutput: '#9CA3AF',
  // Window chrome
  dotRed: '#FF5F57',
  dotYellow: '#FEBD2E',
  dotGreen: '#28C840',
  shadow1: '0 1px 2px rgba(0,0,0,0.5)',
  shadow2: '0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)',
  shadow3: '0 16px 64px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)',
}

const inter = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
const firaCode = '"Fira Code", "SF Mono", "JetBrains Mono", Menlo, monospace'
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
      href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  )
}

// ── Editor Window Frame ────────────────────────────────────────────────
function EditorWindow({ title, children, hover }: { title?: string; children: React.ReactNode; hover?: boolean }) {
  const [h, hB] = useHover()
  const isHovered = hover !== undefined ? hover : h
  return (
    <div {...(hover === undefined ? hB : {})} style={{
      borderRadius: 12,
      border: `1px solid ${isHovered ? C.borderHover : C.border}`,
      background: C.surfaceCode,
      boxShadow: isHovered ? C.shadow3 : C.shadow2,
      overflow: 'hidden',
      transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      transition: `transform 0.4s ${springCSS}, box-shadow 0.4s ease, border-color 0.3s ease`,
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 16px',
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: C.dotRed }} />
          <div style={{ width: 12, height: 12, borderRadius: 12, background: C.dotYellow }} />
          <div style={{ width: 12, height: 12, borderRadius: 12, background: C.dotGreen }} />
        </div>
        {title && (
          <span style={{
            fontFamily: firaCode, fontSize: 11, fontWeight: 400,
            color: C.textTer, marginLeft: 8, textWrap: 'pretty',
          }}>{title}</span>
        )}
      </div>
      {children}
    </div>
  )
}

// ── Amber CTA Button ───────────────────────────────────────────────────
function AmberCTA({ label, outline, large }: { label: string; outline?: boolean; large?: boolean }) {
  const [h, hB] = useHover()
  const [p, pB] = usePress()
  const sz = large ? 16 : 14
  const pad = large ? '12px 32px' : '8px 20px'
  return (
    <button {...hB} {...pB} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      border: outline ? `1px solid ${h ? C.amber : C.amberBorder}` : 'none',
      borderRadius: 8,
      padding: pad,
      background: outline ? 'transparent' : (h ? '#D97706' : C.amber),
      cursor: 'default',
      fontFamily: inter, fontSize: sz, fontWeight: 600,
      color: outline ? (h ? C.amber : C.textSec) : C.bg,
      transform: p ? 'scale(0.96)' : h ? 'scale(1.02)' : 'scale(1)',
      transition: `transform 0.2s ${springCSS}, background 0.2s ease, border-color 0.2s ease, box-shadow 0.3s ease, color 0.2s ease`,
      boxShadow: h && !outline ? C.amberGlow : 'none',
      textWrap: 'pretty',
      letterSpacing: '-0.01em',
    }}>
      {label}
    </button>
  )
}

// ── Nav ─────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 48px', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: firaCode, fontSize: 15, fontWeight: 500,
        color: C.text, letterSpacing: '-0.01em',
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: inter, fontSize: 13, fontWeight: 400,
              color: hl === link ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty',
            }}>{link}</span>
        ))}
        <AmberCTA label="Get started" outline />
      </div>
    </nav>
  )
}

// ── Hero Code Block (right side) ────────────────────────────────────────
function HeroCodeBlock() {
  const lines = [
    { num: 1, tokens: [{ text: '# scaffold a new project', color: C.synComment }] },
    { num: 2, tokens: [
      { text: '$ ', color: C.synPrompt },
      { text: 'npx', color: C.synFunction },
      { text: ' canvai ', color: C.text },
      { text: 'new', color: C.synKeyword },
      { text: ' my-app', color: C.synString },
    ]},
    { num: 3, tokens: [] },
    { num: 4, tokens: [{ text: '# start the canvas + annotation server', color: C.synComment }] },
    { num: 5, tokens: [
      { text: '$ ', color: C.synPrompt },
      { text: 'npx', color: C.synFunction },
      { text: ' canvai ', color: C.text },
      { text: 'design', color: C.synKeyword },
    ]},
    { num: 6, tokens: [] },
    { num: 7, tokens: [{ text: '  Canvas ready at ', color: C.synOutput }, { text: 'http://localhost:5173', color: C.synString }] },
    { num: 8, tokens: [{ text: '  Annotation MCP at ', color: C.synOutput }, { text: ':3333', color: C.synString }] },
    { num: 9, tokens: [{ text: '  Watching for changes...', color: C.synOutput }] },
    { num: 10, tokens: [] },
    { num: 11, tokens: [{ text: '# iterate on the canvas', color: C.synComment }] },
    { num: 12, tokens: [
      { text: '$ ', color: C.synPrompt },
      { text: '"make the hero bolder"', color: C.synString },
    ]},
    { num: 13, tokens: [{ text: '  Updated ', color: C.synOutput }, { text: 'v2/hero.tsx', color: C.amber }, { text: ' \u2192 hot reloaded', color: C.synOutput }] },
  ]

  return (
    <EditorWindow title="terminal \u2014 canvai">
      {/* Tab bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        borderBottom: `1px solid ${C.border}`,
        background: C.surface,
      }}>
        <div style={{
          padding: '8px 16px',
          fontFamily: firaCode, fontSize: 11, fontWeight: 400,
          color: C.amber,
          borderBottom: `2px solid ${C.amber}`,
          background: C.surfaceCode,
        }}>terminal</div>
        <div style={{
          padding: '8px 16px',
          fontFamily: firaCode, fontSize: 11, fontWeight: 400,
          color: C.textDim,
        }}>output</div>
      </div>
      {/* Code area */}
      <div style={{ padding: '16px 0', fontFamily: firaCode, fontSize: 13, lineHeight: 1.7 }}>
        {lines.map(line => (
          <div key={line.num} style={{ display: 'flex', minHeight: 22 }}>
            <span style={{
              width: 44, textAlign: 'right', paddingRight: 16,
              color: C.textDim, fontSize: 12,
              userSelect: 'none', flexShrink: 0,
            }}>{line.num}</span>
            <span>
              {line.tokens.map((t, i) => (
                <span key={i} style={{ color: t.color }}>{t.text}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </EditorWindow>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
      alignItems: 'center',
      maxWidth: 1200, margin: '0 auto',
      padding: '100px 48px 80px',
      boxSizing: 'border-box',
    }}>
      {/* Left — copy */}
      <div>
        <span style={{
          fontFamily: firaCode, fontSize: 12, fontWeight: 400,
          color: C.amber, letterSpacing: '0.04em',
          display: 'block', marginBottom: 20, textWrap: 'pretty',
        }}>design canvas for claude code</span>
        <h1 style={{
          fontFamily: inter, fontSize: 56, fontWeight: 700,
          lineHeight: 1.05, letterSpacing: '-0.04em',
          color: C.text, margin: '0 0 24px',
          textWrap: 'pretty',
        }}>
          Ship the design,{'\n'}not the spec
        </h1>
        <p style={{
          fontFamily: inter, fontSize: 17, fontWeight: 400,
          color: C.textSec, margin: '0 0 40px',
          lineHeight: 1.65, maxWidth: 440, textWrap: 'pretty',
        }}>
          An infinite, zoomable canvas where every Claude Code generation
          lives as a frame. Compare directions side by side, annotate directly,
          and iterate in real time.
        </p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <AmberCTA label="Start building" large />
          <AmberCTA label="View on GitHub" outline />
        </div>
      </div>
      {/* Right — code block */}
      <HeroCodeBlock />
    </section>
  )
}

// ── Product Screenshot in Editor Window ─────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1120, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <div {...hB}>
        <EditorWindow title="canvai \u2014 canvas" hover={h}>
          <img src={canvasWide} alt="Canvai canvas with multiple design directions" style={{
            width: '100%', display: 'block',
          }} />
        </EditorWindow>
      </div>
    </section>
  )
}

// ── CLI Feature Flags ──────────────────────────────────────────────────
const cliFeatures = [
  {
    flag: '--live',
    title: 'Hot-reload everything',
    desc: 'Every change updates the canvas instantly. No build step, no refresh. Edit code and see it in the frame while you type.',
  },
  {
    flag: '--annotate',
    title: 'Point and describe',
    desc: 'Click anywhere on a frame and describe the change. The annotation goes straight to Claude Code via MCP. No tickets, no handoffs.',
  },
  {
    flag: '--iterate',
    title: 'Keep every version',
    desc: 'Nothing is overwritten. Every iteration is preserved. Go back to Tuesday, branch a direction, compare five layouts at once.',
  },
]

function CLIFeature({ feature }: { feature: typeof cliFeatures[0] }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{
      padding: 32,
      borderRadius: 8,
      border: `1px solid ${h ? C.amberBorder : C.border}`,
      background: h ? 'rgba(245, 158, 11, 0.04)' : 'transparent',
      transition: `border-color 0.3s ease, background 0.3s ease, transform 0.3s ${springCSS}`,
      transform: h ? 'translateY(-4px)' : 'translateY(0)',
      cursor: 'default',
    }}>
      <span style={{
        fontFamily: firaCode, fontSize: 15, fontWeight: 500,
        color: C.amber, display: 'block', marginBottom: 12,
        textWrap: 'pretty',
      }}>{feature.flag}</span>
      <h3 style={{
        fontFamily: inter, fontSize: 18, fontWeight: 600,
        color: C.text, margin: '0 0 8px',
        letterSpacing: '-0.01em', textWrap: 'pretty',
      }}>{feature.title}</h3>
      <p style={{
        fontFamily: inter, fontSize: 14, fontWeight: 400,
        color: h ? C.textSec : C.textTer, margin: 0,
        lineHeight: 1.65, textWrap: 'pretty',
        transition: 'color 0.3s ease',
      }}>{feature.desc}</p>
    </div>
  )
}

function Features() {
  return (
    <section style={{
      maxWidth: 1120, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 40,
      }}>
        <span style={{
          fontFamily: firaCode, fontSize: 12, fontWeight: 400,
          color: C.synPrompt,
        }}>$</span>
        <span style={{
          fontFamily: firaCode, fontSize: 12, fontWeight: 400,
          color: C.textTer, textWrap: 'pretty',
        }}>canvai design</span>
        <span style={{
          fontFamily: firaCode, fontSize: 12, fontWeight: 400,
          color: C.textDim,
        }}>[flags]</span>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
      }}>
        {cliFeatures.map(f => (
          <CLIFeature key={f.flag} feature={f} />
        ))}
      </div>
    </section>
  )
}

// ── Secondary Screenshots in Editor Windows ─────────────────────────────
function SecondaryShots() {
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  return (
    <section style={{
      maxWidth: 1120, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
      }}>
        <div {...h1B}>
          <EditorWindow title="directions.tsx" hover={h1}>
            <img src={productDirections} alt="Multiple design directions on canvas" style={{
              width: '100%', display: 'block',
            }} />
          </EditorWindow>
        </div>
        <div {...h2B}>
          <EditorWindow title="dashboard.tsx" hover={h2}>
            <img src={pulseDashboard} alt="Pulse dashboard design" style={{
              width: '100%', display: 'block',
            }} />
          </EditorWindow>
        </div>
      </div>
    </section>
  )
}

// ── Install Section — Terminal Block ────────────────────────────────────
function InstallSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText('npx canvai new my-project && cd my-project && npx canvai design')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = [
    { tokens: [{ text: '# install and scaffold', color: C.synComment }] },
    { tokens: [
      { text: '$ ', color: C.synPrompt },
      { text: 'npx', color: C.synFunction },
      { text: ' canvai ', color: C.text },
      { text: 'new', color: C.synKeyword },
      { text: ' my-project', color: C.synString },
    ]},
    { tokens: [] },
    { tokens: [{ text: '# enter the project', color: C.synComment }] },
    { tokens: [
      { text: '$ ', color: C.synPrompt },
      { text: 'cd', color: C.synFunction },
      { text: ' my-project', color: C.text },
    ]},
    { tokens: [] },
    { tokens: [{ text: '# start designing', color: C.synComment }] },
    { tokens: [
      { text: '$ ', color: C.synPrompt },
      { text: 'npx', color: C.synFunction },
      { text: ' canvai ', color: C.text },
      { text: 'design', color: C.synKeyword },
    ]},
  ]

  return (
    <section style={{
      maxWidth: 720, margin: '0 auto', padding: '0 48px 96px',
      boxSizing: 'border-box',
    }}>
      <h2 style={{
        fontFamily: inter, fontSize: 36, fontWeight: 700,
        color: C.text, margin: '0 0 12px',
        textAlign: 'center', letterSpacing: '-0.03em',
        textWrap: 'pretty',
      }}>Get running in seconds</h2>
      <p style={{
        fontFamily: inter, fontSize: 15, fontWeight: 400,
        color: C.textTer, margin: '0 0 40px',
        textAlign: 'center', textWrap: 'pretty',
      }}>Three commands. Zero config.</p>

      <EditorWindow title="terminal">
        <div style={{
          padding: '20px 0', fontFamily: firaCode, fontSize: 13, lineHeight: 1.8,
          position: 'relative',
        }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', paddingLeft: 20, paddingRight: 20, minHeight: 22 }}>
              <span>
                {line.tokens.map((t, j) => (
                  <span key={j} style={{ color: t.color }}>{t.text}</span>
                ))}
              </span>
            </div>
          ))}
          {/* Copy button */}
          <button onClick={handleCopy} style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255, 255, 255, 0.06)',
            border: `1px solid ${C.border}`,
            borderRadius: 4,
            padding: '4px 12px',
            fontFamily: firaCode, fontSize: 11, fontWeight: 400,
            color: copied ? C.amber : C.textTer,
            cursor: 'default',
            transition: 'color 0.2s ease, background 0.2s ease',
          }}>
            {copied ? 'copied!' : 'copy'}
          </button>
        </div>
      </EditorWindow>
    </section>
  )
}

// ── Bottom CTA ──────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section style={{
      maxWidth: 640, margin: '0 auto', textAlign: 'center',
      padding: '0 48px 96px', boxSizing: 'border-box',
    }}>
      {/* Amber glow behind heading */}
      <div style={{
        position: 'relative',
        display: 'inline-block',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, height: 200,
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{
          fontFamily: inter, fontSize: 44, fontWeight: 700,
          lineHeight: 1.1, letterSpacing: '-0.03em',
          margin: '0 0 16px',
          color: C.text,
          position: 'relative',
          textWrap: 'pretty',
        }}>Start building</h2>
      </div>
      <p style={{
        fontFamily: inter, fontSize: 16, fontWeight: 400,
        color: C.textTer, margin: '0 0 36px', textWrap: 'pretty',
      }}>Free, open source, runs in your terminal.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <AmberCTA label="Get started" large />
        <AmberCTA label="Read the docs" outline large />
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1200, margin: '0 auto',
      width: '100%', boxSizing: 'border-box',
      borderTop: `1px solid ${C.border}`,
    }}>
      <span style={{
        fontFamily: firaCode, fontSize: 13, fontWeight: 500,
        color: C.textTer,
      }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {['GitHub', 'Docs', 'npm'].map(l => (
          <span key={l}
            onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: firaCode, fontSize: 12, fontWeight: 400,
              color: hl === l ? C.text : C.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default',
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

// ── Main export ─────────────────────────────────────────────────────────
export function Carbon() {
  return (
    <div style={{
      background: C.bg,
      minHeight: '100%',
      overflow: 'auto',
      fontFamily: inter,
      WebkitFontSmoothing: 'antialiased',
      position: 'relative',
      cursor: 'default',
    }}>
      <FontLoader />
      {/* Ambient amber glow behind hero */}
      <div style={{
        position: 'absolute',
        top: -120,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 1000,
        height: 600,
        background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <ProductShot />
        <Features />
        <SecondaryShots />
        <InstallSection />
        <BottomCTA />
        <Footer />
      </div>
    </div>
  )
}
