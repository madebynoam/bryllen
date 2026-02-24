import { useState } from 'react'
import { LP, Dark, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// ── Prism palette ─────────────────────────────────────────────────────────
const P = {
  bg: '#0B0B0B', surface: '#141318', border: '#2A2835',
  purple: '#7C3AED', purpleGlow: 'rgba(124, 58, 237, 0.15)',
  blue: '#3B82F6', cta: '#E8590C',
  text: '#F5F4F3', textSec: '#888888', textTer: '#555555',
  grad: 'linear-gradient(135deg, #7C3AED, #3B82F6, #E8590C)',
  glass: 'rgba(124, 58, 237, 0.06)', glassBorder: 'rgba(124, 58, 237, 0.18)',
  glassHov: 'rgba(124, 58, 237, 0.12)', glassBorderHov: 'rgba(124, 58, 237, 0.32)',
}

// ── Helpers ───────────────────────────────────────────────────────────────
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}
const sc = (h: boolean, a: boolean) => a ? 'scale(0.97)' : h ? 'scale(1.02)' : 'scale(1)'
const sect: React.CSSProperties = { maxWidth: LP.maxWidth, margin: '0 auto', boxSizing: 'border-box' }
const purpleLine = `linear-gradient(90deg, transparent, ${P.purple}, ${P.blue}, transparent)`

const features = [
  { e: '\u{1F3A8}', t: 'Live React Canvas', d: 'Every frame is a real React component on an infinite canvas. No export, no handoff.' },
  { e: '\u{1F4AC}', t: 'Point & Click Feedback', d: 'Annotate directly on the design. Your AI agent picks up changes and iterates live.' },
  { e: '\u26A1', t: 'Instant Iterations', d: 'Every change snapshots a new iteration. Compare, revert, branch \u2014 version control for design.' },
  { e: '\u{1F9E9}', t: 'Component Matrix', d: 'See every state of every component at once: sizes, variants, themes. A living spec.' },
  { e: '\u{1F4E6}', t: 'Ship-Ready Code', d: 'The design IS the code. Deploy straight from the canvas. Zero translation layer.' },
  { e: '\u{1F916}', t: 'AI-Native Workflow', d: 'Describe what you want. The agent writes React, you see it live on the canvas.' },
]

const steps = [
  { n: '01', t: 'Describe', d: 'Tell the agent what you want in plain English.', s: '/canvai-new pulse-dashboard' },
  { n: '02', t: 'Design', d: 'The agent generates live React on the canvas. Click to annotate and iterate.', s: '"Add a sidebar with navigation and a stats card."' },
  { n: '03', t: 'Ship', d: 'The design is the code. Deploy directly or copy components into your codebase.', s: '/canvai-share' },
]

// ── Nav ───────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  const [bh, bhB] = useHover(); const [ba, baB] = usePress()
  return (
    <nav style={{ ...sect, position: 'sticky', top: 0, zIndex: 100, width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s16}px ${LP.s32}px`, backdropFilter: 'blur(20px)',
      background: 'rgba(11, 11, 11, 0.85)', borderBottom: `1px solid ${P.border}` }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: purpleLine, opacity: 0.4 }} />
      <span style={{ fontFamily: LP.mono, fontSize: LP.h3Size, fontWeight: 700,
        color: P.text, letterSpacing: '-0.02em' }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs', 'GitHub'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{ fontFamily: LP.font, fontSize: LP.captionSize, fontWeight: 500,
              color: hl === l ? P.text : P.textSec, cursor: 'default', textWrap: 'pretty',
              transition: `color 0.2s ${springGentle}` }}>{l}</span>
        ))}
        <button {...bhB} {...baB} style={{ border: 'none', fontFamily: LP.font, fontWeight: 600,
          fontSize: LP.captionSize, borderRadius: LP.pillRadius, padding: `${LP.s8}px ${LP.s20}px`,
          background: P.cta, color: P.text, cursor: 'default', transform: sc(bh, ba),
          boxShadow: bh ? '0 0 24px rgba(232,89,12,0.35)' : 'none',
          transition: `all 0.25s ${spring}` }}>Install Plugin</button>
      </div>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const [ph, phB] = useHover(); const [pa, paB] = usePress()
  const [gh, ghB] = useHover(); const [ga, gaB] = usePress()
  return (
    <section style={{ ...sect, textAlign: 'center', position: 'relative',
      padding: `${LP.s80 * 1.5}px ${LP.s32}px ${LP.s64}px` }}>
      {/* Ambient purple glow */}
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(60px)',
        background: `radial-gradient(ellipse, ${P.purpleGlow}, transparent 70%)` }} />
      {/* Badge */}
      <div style={{ position: 'relative', display: 'inline-block', borderRadius: LP.pillRadius,
        padding: `${LP.s8}px ${LP.s20}px`, background: P.purpleGlow,
        border: `1px solid ${P.glassBorder}`, color: P.purple, fontSize: LP.labelSize,
        fontWeight: 600, fontFamily: LP.font, letterSpacing: 0.5, marginBottom: LP.s32,
        boxShadow: `0 0 20px ${P.purpleGlow}` }}>Open source</div>
      {/* Gradient headline */}
      <h1 style={{ position: 'relative', fontFamily: LP.font, fontSize: LP.heroSize,
        fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', textWrap: 'pretty',
        margin: `0 0 ${LP.s24}px`, background: P.grad,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        The design studio<br />that ships code.
      </h1>
      <p style={{ position: 'relative', fontFamily: LP.font, fontSize: 20, color: P.textSec,
        lineHeight: 1.6, maxWidth: 520, margin: `0 auto ${LP.s48}px`, textWrap: 'pretty' }}>
        An infinite canvas where every design is live React. Point at it, annotate it, ship it.
      </p>
      {/* CTAs */}
      <div style={{ position: 'relative', display: 'flex', gap: LP.s16, justifyContent: 'center' }}>
        <button {...phB} {...paB} style={{ border: 'none', fontFamily: LP.font, fontWeight: 600,
          fontSize: LP.bodySize, borderRadius: LP.pillRadius, padding: `${LP.s16}px ${LP.s32}px`,
          background: P.cta, color: P.text, cursor: 'default', transform: sc(ph, pa),
          boxShadow: ph ? '0 0 32px rgba(232,89,12,0.4), 0 8px 24px rgba(232,89,12,0.2)'
            : '0 4px 16px rgba(232,89,12,0.15)', transition: `all 0.3s ${spring}` }}>
          Install Plugin
        </button>
        <button {...ghB} {...gaB} style={{ fontFamily: LP.font, fontWeight: 600,
          fontSize: LP.bodySize, borderRadius: LP.pillRadius, padding: `${LP.s16}px ${LP.s32}px`,
          background: gh ? P.glassHov : P.glass, backdropFilter: 'blur(16px)',
          border: `1px solid ${gh ? P.glassBorderHov : P.glassBorder}`,
          color: P.text, cursor: 'default', transform: sc(gh, ga),
          boxShadow: gh ? `0 0 24px ${P.purpleGlow}` : 'none',
          transition: `all 0.3s ${spring}` }}>
          View on GitHub
        </button>
      </div>
    </section>
  )
}

// ── Product screenshot ───────────────────────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{ ...sect, padding: `${LP.s48}px ${LP.s32}px ${LP.s80}px` }}>
      <div {...hB} style={{ borderRadius: LP.cardRadius, overflow: 'hidden',
        border: `1px solid ${h ? P.glassBorderHov : P.border}`,
        transition: `all 0.4s ${springGentle}`,
        transform: h ? 'translateY(-8px) scale(1.005)' : 'translateY(0) scale(1)',
        boxShadow: h ? `0 32px 80px rgba(124,58,237,0.2), 0 0 60px ${P.purpleGlow}`
          : `0 16px 48px rgba(0,0,0,0.4), 0 0 32px ${P.purpleGlow}` }}>
        <img src={pulseDashboard} alt="Canvai dashboard" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// ── Feature bento grid ───────────────────────────────────────────────────
function FeatureBento() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{ ...sect, padding: `${LP.s64}px ${LP.s32}px` }}>
      <h2 style={{ fontFamily: LP.font, fontSize: LP.h1Size, fontWeight: 700, color: P.text,
        textAlign: 'center', letterSpacing: '-0.02em', marginBottom: LP.s16, textWrap: 'pretty' }}>
        Everything you need
      </h2>
      <p style={{ fontFamily: LP.font, fontSize: LP.bodySize, color: P.textSec,
        textAlign: 'center', marginBottom: LP.s48, textWrap: 'pretty' }}>
        A complete design-to-code studio, powered by AI.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: LP.s20 }}>
        {features.map((f, i) => {
          const h = hi === i
          return (
            <div key={i} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
              style={{ padding: LP.s32, borderRadius: LP.cardRadius, cursor: 'default',
                background: h ? P.glassHov : P.glass, backdropFilter: 'blur(20px)',
                border: `1px solid ${h ? P.glassBorderHov : P.glassBorder}`,
                transform: h ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: h ? `0 16px 48px rgba(124,58,237,0.15), 0 0 32px ${P.purpleGlow}`
                  : '0 4px 16px rgba(0,0,0,0.2)', transition: `all 0.35s ${spring}` }}>
              <div style={{ fontSize: 28, marginBottom: LP.s16,
                filter: h ? 'brightness(1.2)' : 'brightness(1)',
                transition: `filter 0.3s ${springGentle}` }}>{f.e}</div>
              <h3 style={{ fontFamily: LP.font, fontSize: 20, fontWeight: 700, color: P.text,
                margin: `0 0 ${LP.s8}px`, textWrap: 'pretty' }}>{f.t}</h3>
              <p style={{ fontFamily: LP.font, fontSize: 15, color: P.textSec,
                lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>{f.d}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── How it works ─────────────────────────────────────────────────────────
function HowItWorks() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{ ...sect, padding: `${LP.s80}px ${LP.s32}px`, position: 'relative' }}>
      <h2 style={{ fontFamily: LP.font, fontSize: LP.h1Size, fontWeight: 700, color: P.text,
        textAlign: 'center', letterSpacing: '-0.02em', marginBottom: LP.s64, textWrap: 'pretty' }}>
        How it works
      </h2>
      <div style={{ display: 'flex', gap: LP.s48, position: 'relative' }}>
        {/* Vertical gradient line */}
        <div style={{ position: 'absolute', left: 32, top: LP.s20, bottom: LP.s20,
          width: 2, borderRadius: 1, opacity: 0.4,
          background: `linear-gradient(180deg, ${P.purple}, ${P.blue}, ${P.cta})` }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: LP.s40, flex: 1 }}>
          {steps.map((s, i) => {
            const h = hi === i
            return (
              <div key={i} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
                style={{ display: 'flex', gap: LP.s32, alignItems: 'flex-start', cursor: 'default' }}>
                <div style={{ width: LP.s64, minWidth: LP.s64, height: LP.s64,
                  borderRadius: LP.cardRadius, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: h ? P.glassHov : P.glass,
                  border: `1px solid ${h ? P.glassBorderHov : P.glassBorder}`,
                  boxShadow: h ? `0 0 24px ${P.purpleGlow}` : 'none',
                  transition: `all 0.3s ${spring}` }}>
                  <span style={{ fontFamily: LP.mono, fontSize: LP.bodySize, fontWeight: 700,
                    color: P.purple }}>{s.n}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: LP.font, fontSize: LP.h3Size, fontWeight: 700,
                    color: P.text, margin: `0 0 ${LP.s8}px`, textWrap: 'pretty' }}>{s.t}</h3>
                  <p style={{ fontFamily: LP.font, fontSize: LP.bodySize, color: P.textSec,
                    lineHeight: 1.6, margin: `0 0 ${LP.s16}px`, textWrap: 'pretty' }}>{s.d}</p>
                  <div style={{ fontFamily: LP.mono, fontSize: 13, color: P.purple,
                    padding: `${LP.s12}px ${LP.s16}px`, borderRadius: LP.s8, display: 'inline-block',
                    background: P.glass, border: `1px solid ${P.glassBorder}`,
                    boxShadow: h ? `0 0 16px ${P.purpleGlow}` : 'none',
                    transition: `box-shadow 0.3s ${springGentle}` }}>{s.s}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Screenshots row ──────────────────────────────────────────────────────
function ScreenshotsRow() {
  const [h1, h1B] = useHover(); const [h2, h2B] = useHover()
  const card = (h: boolean): React.CSSProperties => ({
    flex: 1, borderRadius: LP.cardRadius, overflow: 'hidden',
    border: `1px solid ${h ? P.glassBorderHov : P.border}`,
    background: P.glass, backdropFilter: 'blur(12px)', transition: `all 0.35s ${spring}`,
    transform: h ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: h ? `0 20px 60px rgba(124,58,237,0.15), 0 0 32px ${P.purpleGlow}`
      : '0 8px 32px rgba(0,0,0,0.3)',
  })
  return (
    <section style={{ ...sect, padding: `${LP.s48}px ${LP.s32}px ${LP.s80}px` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s20 }}>
        <div {...h1B} style={card(h1)}>
          <img src={pulseComponents} alt="Component matrix" style={{ width: '100%', display: 'block' }} />
        </div>
        <div {...h2B} style={card(h2)}>
          <img src={pulseSettings} alt="Design settings" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

// ── Bottom CTA ───────────────────────────────────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover(); const [ba, baB] = usePress()
  return (
    <section style={{ ...sect, padding: `${LP.s80}px ${LP.s32}px`, textAlign: 'center',
      position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(40px)',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1), transparent 70%)' }} />
      <h2 style={{ position: 'relative', fontFamily: LP.font, fontSize: LP.h1Size, fontWeight: 700,
        color: P.text, letterSpacing: '-0.02em', marginBottom: LP.s16, textWrap: 'pretty' }}>
        Built for designers who<br />use Claude Code
      </h2>
      <p style={{ position: 'relative', fontFamily: LP.font, fontSize: LP.bodySize, color: P.textSec,
        marginBottom: LP.s40, lineHeight: 1.6, textWrap: 'pretty' }}>
        Free and open source. Install the plugin and start designing in code.
      </p>
      <button {...bhB} {...baB} style={{ position: 'relative', border: 'none', fontFamily: LP.font,
        fontWeight: 700, fontSize: LP.bodySize, borderRadius: LP.pillRadius,
        padding: `${LP.s16}px ${LP.s48}px`, cursor: 'default', color: P.text, letterSpacing: 0.3,
        transform: sc(bh, ba),
        background: bh ? `linear-gradient(135deg, ${P.purple}, ${P.cta})` : P.cta,
        boxShadow: bh ? `0 0 48px rgba(124,58,237,0.3), 0 8px 32px rgba(232,89,12,0.25)`
          : '0 4px 20px rgba(232,89,12,0.2)', transition: `all 0.35s ${spring}` }}>
        Install Plugin
      </button>
    </section>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  const cols = [
    { heading: 'Product', links: ['Features', 'Changelog', 'Roadmap'] },
    { heading: 'Resources', links: ['Documentation', 'GitHub'] },
    { heading: 'Community', links: ['Discord', 'Twitter'] },
  ]
  return (
    <footer style={{ ...sect, position: 'relative', padding: `${LP.s48}px ${LP.s32}px ${LP.s32}px` }}>
      <div style={{ position: 'absolute', top: 0, left: LP.s32, right: LP.s32, height: 1,
        background: purpleLine, opacity: 0.3 }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: LP.s40, marginBottom: LP.s48 }}>
        <div>
          <span style={{ fontFamily: LP.mono, fontSize: LP.h3Size, fontWeight: 700,
            color: P.text }}>canvai</span>
          <p style={{ fontFamily: LP.font, fontSize: LP.captionSize, color: P.textTer,
            marginTop: LP.s12, lineHeight: 1.6, textWrap: 'pretty' }}>
            Design in code.<br />Ship what you see.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.heading}>
            <h4 style={{ fontFamily: LP.font, fontSize: LP.labelSize, fontWeight: 600,
              color: P.textTer, textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: LP.s16, marginTop: 0 }}>{col.heading}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: LP.s12 }}>
              {col.links.map(l => (
                <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
                  style={{ fontFamily: LP.font, fontSize: LP.captionSize, cursor: 'default',
                    color: hl === l ? P.text : P.textSec, textWrap: 'pretty',
                    transition: `color 0.2s ${springGentle}` }}>{l}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: LP.s24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: LP.font, fontSize: LP.labelSize, color: P.textTer }}>
          {'\u00A9'} 2026 Canvai. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: LP.s20 }}>
          {['Twitter', 'GitHub', 'Discord'].map(s => (
            <span key={s} onMouseEnter={() => setHL(s + '-f')} onMouseLeave={() => setHL(null)}
              style={{ fontFamily: LP.font, fontSize: LP.labelSize, cursor: 'default',
                color: hl === s + '-f' ? P.text : P.textTer,
                transition: `color 0.2s ${springGentle}` }}>{s}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────
export function Prism() {
  return (
    <div style={{ background: P.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: LP.font, WebkitFontSmoothing: 'antialiased', color: P.text }}>
      <Nav />
      <Hero />
      <ProductShot />
      <FeatureBento />
      <HowItWorks />
      <ScreenshotsRow />
      <BottomCTA />
      <Footer />
    </div>
  )
}
