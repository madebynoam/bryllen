import { useState } from 'react'
import { LP, Light, springGentle } from '../tokens'
import canvasFull from '../../screenshots/canvas-full.png'
import canvasComponents from '../../screenshots/canvas-components.png'
import canvasTokens from '../../screenshots/canvas-tokens.png'

const ease = `cubic-bezier(0.22, 1.0, 0.36, 1)`
const tr = `all 0.3s ${ease}`

const navLinks = ['Features', 'Docs', 'Blog']
const cliCommand = '/canvai-new my-project'

const features = [
  { title: 'Live Canvas', desc: 'Every frame renders real React. Type in an input, click a button \u2014 it works.', wide: true },
  { title: 'Annotation System', desc: 'Click any element, describe a change, AI applies it instantly.', wide: true },
  { title: 'Component Matrix', desc: 'States \u00d7 Variations. See everything at once.', wide: false },
  { title: 'Iteration Snapshots', desc: 'V1, V2, V3. Each frozen, each complete.', wide: false },
  { title: 'Ship-Ready', desc: 'Copy the component. It\u2019s already production React.', wide: false },
]

const steps = [
  { num: '01', code: '/canvai-new button', label: 'Scaffold a design project' },
  { num: '02', code: '/canvai-design', label: 'Open the live canvas' },
  { num: '03', code: 'Annotate & iterate', label: 'Point, click, change, ship' },
]

const pretty: any = { textWrap: 'pretty' }

export function CanvasLP() {
  const [copied, setCopied] = useState(false)
  const [hovNav, setHovNav] = useState<string | null>(null)
  const [hovCard, setHovCard] = useState<number | null>(null)
  const [hovStep, setHovStep] = useState<number | null>(null)
  const [ctaDown, setCtaDown] = useState(false)
  const [ctaHov, setCtaHov] = useState(false)

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(cliCommand) } catch { /* sandboxed */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const ctaHandlers = {
    onMouseEnter: () => setCtaHov(true),
    onMouseLeave: () => { setCtaHov(false); setCtaDown(false) },
    onMouseDown: () => setCtaDown(true),
    onMouseUp: () => setCtaDown(false),
  }

  const ctaTransform = ctaDown ? 'scale(0.95)' : ctaHov ? 'scale(1.02)' : 'scale(1)'

  return (
    <div style={{
      overflow: 'auto',
      background: Light.bg,
      fontFamily: LP.font,
      color: Light.text,
      minHeight: '100%',
      WebkitFontSmoothing: 'antialiased' as any,
    }}>

      {/* ── Nav ── */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: LP.maxWidth, margin: '0 auto', padding: `${LP.s16}px ${LP.s32}px`,
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>canvai</span>

        <div style={{ display: 'flex', gap: LP.s32 }}>
          {navLinks.map(link => (
            <a key={link} href="#"
              onMouseEnter={() => setHovNav(link)}
              onMouseLeave={() => setHovNav(null)}
              style={{
                fontSize: LP.captionSize, fontWeight: 500,
                color: hovNav === link ? Light.accent : Light.textSecondary,
                textDecoration: 'none', transition: tr, ...pretty,
              }}
            >{link}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: LP.s20 }}>
          <button {...ctaHandlers} style={{
            background: Light.text, color: Light.bg, border: 'none',
            borderRadius: LP.pillRadius, padding: `${LP.s8}px ${LP.s20}px`,
            fontSize: LP.captionSize, fontWeight: 600, cursor: 'default',
            transition: tr, transform: ctaTransform, opacity: ctaHov ? 0.9 : 1,
          }}>Get Started</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `${LP.s80}px ${LP.s32}px ${LP.s48}px`, textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 56, fontWeight: 700, lineHeight: 1.1,
          letterSpacing: '-0.03em', margin: 0, ...pretty,
        }}>Code is the design.</h1>

        <p style={{
          fontSize: 18, lineHeight: 1.6, color: Light.textSecondary,
          maxWidth: 560, margin: `${LP.s24}px auto 0`, ...pretty,
        }}>
          An infinite canvas where every component is live, interactive React.
          No mockups. No handoff. Just ship.
        </p>

        {/* CLI command pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: LP.s12,
          background: Light.text, color: Light.bg, borderRadius: LP.pillRadius,
          padding: `${LP.s12}px ${LP.s12}px ${LP.s12}px ${LP.s24}px`,
          marginTop: LP.s40, fontFamily: LP.mono, fontSize: LP.captionSize,
        }}>
          <span style={{ opacity: 0.5 }}>&gt;</span>
          <span>{cliCommand}</span>
          <button onClick={handleCopy} style={{
            background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 8,
            padding: `${LP.s8}px ${LP.s12}px`, color: Light.bg, cursor: 'default',
            display: 'flex', alignItems: 'center', gap: LP.s4,
            fontSize: LP.labelSize, fontFamily: LP.font, fontWeight: 500, transition: tr,
          }}>
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            )}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </section>

      {/* ── Product screenshot ── */}
      <section style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `0 ${LP.s32}px ${LP.s80}px`,
      }}>
        <div style={{
          border: `1px solid ${Light.border}`, borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <img src={canvasFull}
            alt="Canvai canvas \u2014 live React components on an infinite canvas"
            style={{ width: '100%', display: 'block' }} />
        </div>
      </section>

      {/* ── Bento feature grid ── */}
      <section style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `0 ${LP.s32}px ${LP.s80}px`,
      }}>
        <h2 style={{
          fontSize: LP.h1Size, fontWeight: 700, letterSpacing: '-0.02em',
          textAlign: 'center', margin: `0 0 ${LP.s48}px`, ...pretty,
        }}>Everything you need, nothing you don't.</h2>

        {/* Top row: 2 wide cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s20, marginBottom: LP.s20 }}>
          {features.filter(f => f.wide).map((f, i) => (
            <FeatureCard key={f.title} title={f.title} desc={f.desc}
              hovered={hovCard === i}
              onEnter={() => setHovCard(i)}
              onLeave={() => setHovCard(null)}
              screenshot={i === 0 ? canvasComponents : canvasTokens} />
          ))}
        </div>

        {/* Bottom row: 3 narrow cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: LP.s20 }}>
          {features.filter(f => !f.wide).map((f, i) => (
            <FeatureCard key={f.title} title={f.title} desc={f.desc}
              hovered={hovCard === i + 2}
              onEnter={() => setHovCard(i + 2)}
              onLeave={() => setHovCard(null)} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `0 ${LP.s32}px ${LP.s80}px`,
      }}>
        <h2 style={{
          fontSize: LP.h1Size, fontWeight: 700, letterSpacing: '-0.02em',
          textAlign: 'center', margin: `0 0 ${LP.s48}px`, ...pretty,
        }}>Three steps. That's it.</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: LP.s24, maxWidth: 720, margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div key={step.num}
              onMouseEnter={() => setHovStep(i)}
              onMouseLeave={() => setHovStep(null)}
              style={{
                display: 'flex', gap: LP.s24, alignItems: 'flex-start',
                padding: LP.s24, transition: tr,
                borderLeft: `2px solid ${hovStep === i ? Light.accent : Light.border}`,
              }}>
              <span style={{
                fontSize: LP.labelSize, fontWeight: 700, fontFamily: LP.mono,
                color: hovStep === i ? Light.accent : Light.textTertiary,
                transition: tr, flexShrink: 0, marginTop: 2,
              }}>{step.num}</span>

              <div style={{ flex: 1 }}>
                <div style={{
                  background: '#0B0B0B', borderRadius: 8,
                  padding: `${LP.s12}px ${LP.s20}px`, fontFamily: LP.mono,
                  fontSize: LP.captionSize, marginBottom: LP.s12, display: 'inline-block',
                }}>
                  {i < 2 ? (
                    <>
                      <span style={{ color: '#F5F4F3' }}>{step.code.split(' ')[0]}</span>
                      {step.code.includes(' ') && (
                        <span style={{ color: Light.accent }}>
                          {' '}{step.code.split(' ').slice(1).join(' ')}
                        </span>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#F5F4F3' }}>{step.code}</span>
                  )}
                </div>
                <p style={{
                  margin: 0, fontSize: LP.bodySize,
                  color: Light.textSecondary, lineHeight: 1.5, ...pretty,
                }}>{step.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `${LP.s64}px ${LP.s32}px`, textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: LP.h2Size, fontWeight: 700, letterSpacing: '-0.02em',
          margin: `0 0 ${LP.s16}px`, ...pretty,
        }}>Ready to ship real components?</h2>
        <p style={{
          fontSize: LP.bodySize, color: Light.textSecondary,
          margin: `0 0 ${LP.s32}px`, ...pretty,
        }}>Start designing with code in under a minute.</p>
        <button {...ctaHandlers} style={{
          background: Light.text, color: Light.bg, border: 'none',
          borderRadius: LP.pillRadius, padding: `${LP.s16}px ${LP.s40}px`,
          fontSize: 16, fontWeight: 600, fontFamily: LP.font,
          cursor: 'default', transition: tr,
          transform: ctaTransform, opacity: ctaHov ? 0.9 : 1,
        }}>Get Started</button>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        maxWidth: LP.maxWidth, margin: '0 auto',
        padding: `${LP.s40}px ${LP.s32}px`,
        borderTop: `1px solid ${Light.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: LP.captionSize, color: Light.textTertiary, ...pretty }}>
          Built for designers who code.
        </span>
        <div style={{ display: 'flex', gap: LP.s24 }}>
          {['GitHub', 'Discord', 'Twitter'].map(link => (
            <a key={link} href="#"
              style={{ fontSize: LP.captionSize, color: Light.textTertiary, textDecoration: 'none', transition: tr }}
              onMouseEnter={e => (e.currentTarget.style.color = Light.textSecondary)}
              onMouseLeave={e => (e.currentTarget.style.color = Light.textTertiary)}
            >{link}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

/* ── Feature card sub-component ── */

function FeatureCard({ title, desc, hovered, onEnter, onLeave, screenshot }: {
  title: string
  desc: string
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
  screenshot?: string
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: Light.surface,
        border: `1px solid ${hovered ? '#D1D5DB' : Light.border}`,
        borderRadius: 12,
        padding: LP.s32,
        transition: `all 0.35s ${springGentle}`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
          : '0 1px 2px rgba(0,0,0,0.02)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: LP.s16,
      }}
    >
      <h3 style={{
        fontSize: LP.h3Size, fontWeight: 700,
        letterSpacing: '-0.01em', margin: 0,
        textWrap: 'pretty' as any,
      }}>{title}</h3>

      <p style={{
        fontSize: LP.bodySize, color: Light.textSecondary,
        lineHeight: 1.5, margin: 0,
        textWrap: 'pretty' as any,
      }}>{desc}</p>

      {screenshot && (
        <div style={{
          marginTop: LP.s8, borderRadius: 8,
          overflow: 'hidden', border: `1px solid ${Light.borderSubtle}`,
        }}>
          <img src={screenshot} alt={title}
            style={{ width: '100%', display: 'block' }} />
        </div>
      )}
    </div>
  )
}
