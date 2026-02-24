import React, { useState, useRef, useEffect } from 'react'
import { LP, Dark, spring } from '../tokens'
import canvasFull from '../../screenshots/canvas-full.png'
import canvasWide from '../../screenshots/canvas-wide.png'

// ── Keyframe animations ────────────────────────────────────────────────────
const keyframes = `
@keyframes aurora-drift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
`

// ── Data ───────────────────────────────────────────────────────────────────
const features = [
  { icon: '#E8590C', title: 'Live React Canvas', desc: 'Every design is real React code running in an infinite canvas. No export step, no translation layer.' },
  { icon: '#A855F7', title: 'Point & Change', desc: 'Click any element to inspect it. Annotate directly on the canvas and watch changes apply in real time.' },
  { icon: '#3B82F6', title: 'Ship What You See', desc: 'The design IS the code. Deploy straight from the canvas to production — zero handoff.' },
  { icon: '#10B981', title: 'Component Library', desc: 'Build a living design system. Every component is interactive, testable, and version-controlled.' },
  { icon: '#F59E0B', title: 'AI Copilot', desc: 'Describe what you want in natural language. The AI writes the code and you see it live on the canvas.' },
  { icon: '#EC4899', title: 'Multiplayer Ready', desc: 'Collaborate in real time. Designers and developers see the same live canvas simultaneously.' },
]

const navItems = ['Features', 'Docs', 'Blog']

const auroraGradient = [
  'radial-gradient(ellipse at 50% 0%, rgba(232, 89, 12, 0.3) 0%, transparent 50%)',
  'radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
  'radial-gradient(ellipse at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
].join(', ')

// ── Component ──────────────────────────────────────────────────────────────
export function Aurora() {
  const [hovNav, setHovNav] = useState<string | null>(null)
  const [hovCard, setHovCard] = useState<number | null>(null)
  const [hovHero, setHovHero] = useState(false)
  const [hovPri, setHovPri] = useState(false)
  const [actPri, setActPri] = useState(false)
  const [hovSec, setHovSec] = useState(false)
  const [actSec, setActSec] = useState(false)
  const [hovBot, setHovBot] = useState(false)
  const [actBot, setActBot] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const t = spring

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const onScroll = () => setScrollY(el.scrollTop)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const btnScale = (hov: boolean, act: boolean) =>
    act ? 'scale(0.97)' : hov ? 'scale(1.03)' : 'scale(1)'

  const sect = { maxWidth: LP.maxWidth, margin: '0 auto', boxSizing: 'border-box' as const }

  return (
    <div ref={rootRef} style={{
      overflow: 'auto', height: '100%', width: '100%',
      background: Dark.bg, fontFamily: LP.font, color: Dark.text,
    }}>
      <style>{keyframes}</style>

      {/* ── Navigation ────────────────────────────────────────────── */}
      <nav style={{
        ...sect, position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${LP.s16}px ${LP.s32}px`, width: '100%',
        backdropFilter: scrollY > 20 ? 'blur(20px)' : 'none',
        background: scrollY > 20 ? 'rgba(11,11,11,0.8)' : 'transparent',
        borderBottom: scrollY > 20 ? `1px solid ${Dark.border}` : '1px solid transparent',
        transition: `all 0.3s ${t}`,
      }}>
        <div style={{ fontSize: LP.h3Size, fontWeight: 700, letterSpacing: -0.5 }}>
          <span style={{ color: Dark.accent }}>canv</span>ai
        </div>
        <div style={{ display: 'flex', gap: LP.s32, alignItems: 'center' }}>
          {navItems.map((item) => (
            <div
              key={item}
              onMouseEnter={() => setHovNav(item)}
              onMouseLeave={() => setHovNav(null)}
              style={{
                position: 'relative', fontSize: LP.captionSize, cursor: 'default',
                paddingBottom: 2, color: hovNav === item ? Dark.text : Dark.textSecondary,
                transition: `color 0.25s ${t}`,
              }}
            >
              {item}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
                background: Dark.accent, transformOrigin: 'left',
                transform: hovNav === item ? 'scaleX(1)' : 'scaleX(0)',
                transition: `transform 0.3s ${t}`,
              }} />
            </div>
          ))}
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{
        ...sect, position: 'relative', textAlign: 'center',
        padding: `${LP.s80 * 2}px ${LP.s32}px ${LP.s80}px`,
      }}>
        {/* Aurora gradient blobs */}
        <div style={{
          position: 'absolute', inset: 0, background: auroraGradient,
          pointerEvents: 'none', animation: 'aurora-drift 12s ease-in-out infinite',
          backgroundSize: '200% 200%',
        }} />

        {/* Beta badge */}
        <div style={{
          position: 'relative', display: 'inline-block',
          padding: `${LP.s8}px ${LP.s20}px`, borderRadius: LP.pillRadius,
          background: Dark.accentMuted, color: Dark.accent,
          fontSize: LP.labelSize, fontWeight: 600, letterSpacing: 0.5,
          marginBottom: LP.s32, border: '1px solid rgba(232, 89, 12, 0.25)',
          animation: 'glow-pulse 3s ease-in-out infinite',
        }}>
          Open source
        </div>

        {/* Headline */}
        <h1 style={{
          position: 'relative', fontSize: LP.heroSize, fontWeight: 700,
          lineHeight: 1.05, letterSpacing: -2, margin: `0 0 ${LP.s24}px`,
          textWrap: 'pretty',
        }}>
          Design with code.<br />Ship what you see.
        </h1>

        {/* Subheadline */}
        <p style={{
          position: 'relative', fontSize: 20, lineHeight: 1.6,
          color: Dark.textSecondary, maxWidth: 560,
          margin: `0 auto ${LP.s48}px`, textWrap: 'pretty',
        }}>
          An infinite canvas where every pixel is live React.
          Point at it, change it, ship it.
        </p>

        {/* CTA buttons */}
        <div style={{
          position: 'relative', display: 'flex', gap: LP.s16,
          justifyContent: 'center', marginBottom: LP.s80,
        }}>
          {/* Primary — solid accent */}
          <button
            onMouseEnter={() => setHovPri(true)}
            onMouseLeave={() => { setHovPri(false); setActPri(false) }}
            onMouseDown={() => setActPri(true)}
            onMouseUp={() => setActPri(false)}
            style={{
              padding: `${LP.s16}px ${LP.s32}px`, borderRadius: LP.s12,
              border: 'none', background: Dark.accent, color: Dark.text,
              fontSize: LP.bodySize, fontWeight: 600, fontFamily: LP.font,
              cursor: 'default', transform: btnScale(hovPri, actPri),
              boxShadow: hovPri
                ? '0 0 32px rgba(232,89,12,0.4), 0 0 64px rgba(232,89,12,0.2)'
                : 'none',
              transition: `all 0.35s ${t}`,
            }}
          >
            Start Designing
          </button>

          {/* Secondary — glass border */}
          <button
            onMouseEnter={() => setHovSec(true)}
            onMouseLeave={() => { setHovSec(false); setActSec(false) }}
            onMouseDown={() => setActSec(true)}
            onMouseUp={() => setActSec(false)}
            style={{
              padding: `${LP.s16}px ${LP.s32}px`, borderRadius: LP.s12,
              border: `1px solid ${hovSec ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'}`,
              background: hovSec ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
              color: Dark.text, fontSize: LP.bodySize, fontWeight: 600,
              fontFamily: LP.font, cursor: 'default', backdropFilter: 'blur(12px)',
              transform: btnScale(hovSec, actSec),
              boxShadow: hovSec ? '0 0 24px rgba(255,255,255,0.06)' : 'none',
              transition: `all 0.35s ${t}`,
            }}
          >
            Watch Demo
          </button>
        </div>

        {/* Product screenshot with perspective tilt */}
        <div
          onMouseEnter={() => setHovHero(true)}
          onMouseLeave={() => setHovHero(false)}
          style={{ position: 'relative', perspective: 1200, maxWidth: 960, margin: '0 auto' }}
        >
          <img src={canvasFull} alt="Canvai canvas" style={{
            width: '100%', borderRadius: LP.cardRadius, display: 'block',
            border: `1px solid ${Dark.border}`,
            transform: hovHero
              ? 'rotateX(1deg) rotateY(-1deg) scale(1.02)'
              : 'rotateX(2deg) scale(1)',
            boxShadow: hovHero
              ? '0 40px 100px rgba(232,89,12,0.2), 0 20px 60px rgba(0,0,0,0.5)'
              : '0 32px 80px rgba(232,89,12,0.1), 0 16px 40px rgba(0,0,0,0.4)',
            transition: `all 0.5s ${t}`,
          }} />
        </div>
      </section>

      {/* ── Bento Features Grid ──────────────────────────────────── */}
      <section style={{ ...sect, padding: `${LP.s80}px ${LP.s32}px` }}>
        <h2 style={{
          fontSize: LP.h1Size, fontWeight: 700, textAlign: 'center',
          marginBottom: LP.s16, letterSpacing: -1, textWrap: 'pretty',
        }}>
          Everything you need
        </h2>
        <p style={{
          fontSize: LP.bodySize, color: Dark.textSecondary,
          textAlign: 'center', marginBottom: LP.s64, textWrap: 'pretty',
        }}>
          A complete design-to-code platform in one canvas.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s20 }}>
          {features.map((f, i) => {
            const h = hovCard === i
            return (
              <div
                key={i}
                onMouseEnter={() => setHovCard(i)}
                onMouseLeave={() => setHovCard(null)}
                style={{
                  padding: LP.s32, borderRadius: LP.cardRadius, cursor: 'default',
                  background: h ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${h ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.1)'}`,
                  transform: h ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: h ? '0 16px 48px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.15)',
                  transition: `all 0.35s ${t}`,
                }}
              >
                {/* Icon square */}
                <div style={{
                  width: LP.s40, height: LP.s40, borderRadius: LP.s12,
                  background: `linear-gradient(135deg, ${f.icon}, ${f.icon}88)`,
                  marginBottom: LP.s20, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  boxShadow: h ? `0 0 20px ${f.icon}44` : 'none',
                  transition: `box-shadow 0.35s ${t}`,
                }}>
                  <div style={{
                    width: LP.s16, height: LP.s16, borderRadius: LP.s4,
                    background: 'rgba(255,255,255,0.8)',
                  }} />
                </div>

                <h3 style={{
                  fontSize: 20, fontWeight: 700,
                  margin: `0 0 ${LP.s8}px`, textWrap: 'pretty',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: 15, color: Dark.textSecondary,
                  lineHeight: 1.6, margin: 0, textWrap: 'pretty',
                }}>
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Wide screenshot ──────────────────────────────────────── */}
      <section style={{ ...sect, padding: `${LP.s48}px ${LP.s32}px ${LP.s80}px`, textAlign: 'center' }}>
        <img src={canvasWide} alt="Canvai wide view" style={{
          width: '100%', borderRadius: LP.cardRadius, display: 'block',
          border: `1px solid ${Dark.border}`,
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }} />
      </section>

      {/* ── Built for ───────────────────────────────────────────── */}
      <section style={{ ...sect, padding: `${LP.s64}px ${LP.s32}px`, textAlign: 'center' }}>
        <p style={{
          fontSize: LP.captionSize, color: Dark.textTertiary,
          textTransform: 'uppercase', letterSpacing: 2,
          marginBottom: LP.s20, fontWeight: 500,
        }}>
          Built for designers who use Claude Code
        </p>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section style={{
        ...sect, padding: `${LP.s80}px ${LP.s32}px ${LP.s80 * 2}px`,
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: LP.h1Size, fontWeight: 700, letterSpacing: -1,
          marginBottom: LP.s16, textWrap: 'pretty',
        }}>
          Ready to design different?
        </h2>
        <p style={{
          fontSize: LP.bodySize, color: Dark.textSecondary,
          marginBottom: LP.s40, textWrap: 'pretty',
        }}>
          Install the Claude Code plugin and start designing. Free and open source.
        </p>
        <button
          onMouseEnter={() => setHovBot(true)}
          onMouseLeave={() => { setHovBot(false); setActBot(false) }}
          onMouseDown={() => setActBot(true)}
          onMouseUp={() => setActBot(false)}
          style={{
            padding: `${LP.s16}px ${LP.s48}px`, borderRadius: LP.s12,
            border: 'none', color: Dark.text, fontSize: LP.bodySize,
            fontWeight: 700, fontFamily: LP.font, cursor: 'default',
            letterSpacing: 0.3, transform: btnScale(hovBot, actBot),
            background: hovBot
              ? `linear-gradient(135deg, ${Dark.accent}, #A855F7)`
              : `linear-gradient(135deg, ${Dark.accent}, #C04D08)`,
            boxShadow: hovBot
              ? '0 0 48px rgba(232,89,12,0.35), 0 0 96px rgba(168,85,247,0.15)'
              : 'none',
            transition: `all 0.4s ${t}`,
          }}
        >
          Install Plugin
        </button>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{
        ...sect, borderTop: `1px solid ${Dark.border}`,
        padding: `${LP.s40}px ${LP.s32}px`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: LP.captionSize, color: Dark.textTertiary }}>
          {'\u00A9'} 2026 Canvai. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: LP.s24 }}>
          {['Twitter', 'GitHub', 'Discord'].map((link) => (
            <span key={link} style={{
              fontSize: LP.captionSize, color: Dark.textTertiary, cursor: 'default',
            }}>
              {link}
            </span>
          ))}
        </div>
      </footer>
    </div>
  )
}
