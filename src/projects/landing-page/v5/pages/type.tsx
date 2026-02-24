import { useState } from 'react'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import { LP, Dark, spring, springGentle } from '../../v1/tokens'

// -- Interaction hooks --
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

const btn: React.CSSProperties = {
  border: 'none', cursor: 'default', fontFamily: LP.font, fontWeight: 600,
  fontSize: LP.bodySize, borderRadius: LP.pillRadius,
  transition: `transform 0.2s ${spring}, box-shadow 0.2s ${spring}`,
}

// -- Nav --
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s32}px ${LP.s40}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box' }}>
      <span style={{ fontFamily: LP.mono, fontSize: LP.captionSize, fontWeight: 500,
        color: Dark.textSecondary, letterSpacing: '0.02em' }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Docs', 'GitHub'].map(link => (
          <span key={link} onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{ fontFamily: LP.font, fontSize: LP.captionSize, fontWeight: 400,
              color: hl === link ? Dark.text : Dark.textTertiary,
              transition: `color 0.25s ${springGentle}`, cursor: 'default', textWrap: 'pretty' }}>
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
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s40}px ${LP.s80}px` }}>
      <h1 style={{ fontFamily: LP.font, fontSize: 180, fontWeight: 900,
        color: Dark.text, lineHeight: 0.88, letterSpacing: '-0.05em',
        margin: 0, textTransform: 'uppercase', textWrap: 'pretty' }}>
        DESIGN
      </h1>
      <h2 style={{ fontFamily: LP.font, fontSize: 120, fontWeight: 200,
        color: Dark.textSecondary, lineHeight: 1, letterSpacing: '-0.04em',
        margin: 0, marginTop: LP.s8, textTransform: 'uppercase', textWrap: 'pretty' }}>
        IN CODE.
      </h2>
      <p style={{ fontFamily: LP.font, fontSize: 20, fontWeight: 400,
        color: Dark.textTertiary, marginTop: LP.s32, marginBottom: LP.s40,
        lineHeight: 1.5, maxWidth: 480, textWrap: 'pretty' }}>
        An infinite canvas where every design is live React.
        No export step. No handoff. The design is the code.
      </p>
      <button {...bhB} {...baB} style={{ ...btn, padding: `${LP.s16}px ${LP.s32}px`,
        background: Dark.accent, color: Dark.text,
        transform: ba ? 'scale(0.96)' : bh ? 'scale(1.03)' : 'scale(1)',
        boxShadow: bh ? '0 4px 24px rgba(232,89,12,0.35)' : 'none' }}>
        Install Plugin
      </button>
    </section>
  )
}

// -- Screenshot --
function Screenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `0 ${LP.s40}px ${LP.s80}px`, display: 'flex', gap: LP.s40,
      alignItems: 'flex-start' }}>
      <p style={{ fontFamily: LP.font, fontSize: LP.captionSize, fontWeight: 400,
        color: Dark.textTertiary, lineHeight: 1.7, minWidth: 200, maxWidth: 240,
        marginTop: LP.s8, textWrap: 'pretty', flexShrink: 0 }}>
        A real project, designed in Canvai. Every frame is a live, interactive
        React component running on an infinite canvas.
      </p>
      <div {...hB} style={{ flex: 1, borderRadius: LP.s12, overflow: 'hidden',
        border: `1px solid ${Dark.border}`,
        transition: `transform 0.35s ${springGentle}, box-shadow 0.35s ease`,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: h ? '0 16px 48px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.25)' }}>
        <img src={pulseDashboard} alt="Canvai project" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// -- Feature Words --
const featureWords = [
  { word: 'LIVE', size: 120, desc: 'Every design is real, interactive React.' },
  { word: 'ANNOTATE', size: 100, desc: 'Point, describe, let the AI build it.' },
  { word: 'ITERATE', size: 100, desc: 'Version everything. Compare side by side.' },
  { word: 'SHIP', size: 120, desc: 'Export production-ready code. Zero handoff.' },
]

function FeatureWord({ word, size, desc, isLast }: { word: string; size: number; desc: string; isLast: boolean }) {
  const [h, hB] = useHover()
  return (
    <>
      <div {...hB} style={{ padding: `${LP.s32}px 0`, cursor: 'default',
        display: 'flex', alignItems: 'flex-end', gap: LP.s24, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: LP.font, fontSize: size, fontWeight: 900,
          color: h ? Dark.text : Dark.text, letterSpacing: '-0.04em', lineHeight: 0.85,
          display: 'inline-block', textTransform: 'uppercase',
          borderBottom: h ? `3px solid ${Dark.accent}` : '3px solid transparent',
          transition: `border-color 0.3s ${springGentle}`, paddingBottom: LP.s4 }}>
          {word}
        </span>
        <p style={{ fontFamily: LP.font, fontSize: 16, fontWeight: 400,
          color: h ? Dark.textSecondary : Dark.textTertiary, margin: 0,
          lineHeight: 1.5, textWrap: 'pretty', paddingBottom: LP.s8,
          transition: `color 0.3s ${springGentle}` }}>
          {desc}
        </p>
      </div>
      {!isLast && (
        <div style={{ height: 1, background: Dark.border, width: '100%' }} />
      )}
    </>
  )
}

function Features() {
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s40}px ${LP.s64}px` }}>
      {featureWords.map((f, i) => (
        <FeatureWord key={f.word} {...f} isLast={i === featureWords.length - 1} />
      ))}
    </section>
  )
}

// -- Pull Quote --
function PullQuote() {
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s64}px ${LP.s40}px`, display: 'flex', alignItems: 'stretch', gap: LP.s24 }}>
      <div style={{ width: 3, background: Dark.accent, borderRadius: 2, flexShrink: 0 }} />
      <blockquote style={{ fontFamily: LP.font, fontSize: 48, fontWeight: 300,
        fontStyle: 'italic', color: Dark.text, lineHeight: 1.2,
        letterSpacing: '-0.03em', margin: 0, textWrap: 'pretty' }}>
        The future of UI design is code.
      </blockquote>
    </section>
  )
}

// -- Secondary Screenshot --
function SecondaryShot() {
  const [h, hB] = useHover()
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s32}px ${LP.s40}px ${LP.s80}px`, display: 'flex', justifyContent: 'center' }}>
      <div {...hB} style={{ width: '50%', borderRadius: LP.s12, overflow: 'hidden',
        border: `1px solid ${Dark.border}`,
        transition: `transform 0.35s ${springGentle}, box-shadow 0.35s ease`,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: h ? '0 16px 48px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.25)' }}>
        <img src={pulseComponents} alt="Component matrix" style={{ width: '100%', display: 'block' }} />
      </div>
    </section>
  )
}

// -- CTA --
function CTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [gh, ghB] = useHover()
  const [ga, gaB] = usePress()
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s40}px ${LP.s64}px` }}>
      <div style={{ height: 1, background: Dark.border, marginBottom: LP.s48 }} />
      <h2 style={{ fontFamily: LP.font, fontSize: 120, fontWeight: 900,
        color: Dark.text, letterSpacing: '-0.05em', lineHeight: 0.9,
        margin: 0, textTransform: 'uppercase', textWrap: 'pretty' }}>
        START
      </h2>
      <div style={{ marginTop: LP.s32, display: 'flex', alignItems: 'center', gap: LP.s16 }}>
        <button {...bhB} {...baB} style={{ ...btn, padding: `${LP.s16}px ${LP.s32}px`,
          background: Dark.accent, color: Dark.text,
          transform: ba ? 'scale(0.96)' : bh ? 'scale(1.03)' : 'scale(1)',
          boxShadow: bh ? '0 4px 24px rgba(232,89,12,0.35)' : 'none' }}>
          Install Plugin
        </button>
        <button {...ghB} {...gaB} style={{ ...btn, padding: `${LP.s16}px ${LP.s32}px`,
          background: 'transparent', color: Dark.textSecondary,
          border: `1px solid ${Dark.border}`,
          transform: ga ? 'scale(0.96)' : gh ? 'scale(1.03)' : 'scale(1)',
          boxShadow: gh ? `0 0 16px rgba(245,244,243,0.04)` : 'none' }}>
          View on GitHub
        </button>
      </div>
      <div style={{ marginTop: LP.s24, display: 'flex', alignItems: 'center', gap: LP.s16 }}>
        <span style={{ fontFamily: LP.mono, fontSize: LP.captionSize, fontWeight: 400,
          color: Dark.textTertiary, textWrap: 'pretty' }}>
          /canvai-new my-project
        </span>
        <span style={{ fontFamily: LP.font, fontSize: LP.labelSize, fontWeight: 400,
          color: Dark.textTertiary, textWrap: 'pretty' }}>
          -- Free and open source
        </span>
      </div>
    </section>
  )
}

// -- Footer --
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  const links = ['GitHub', 'Docs', 'Changelog']
  return (
    <footer style={{ borderTop: `1px solid ${Dark.border}`, maxWidth: LP.maxWidth,
      margin: '0 auto', padding: `${LP.s24}px ${LP.s40}px`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: LP.mono, fontSize: LP.labelSize, fontWeight: 500,
        color: Dark.textTertiary }}>canvai</span>
      <div style={{ display: 'flex', gap: LP.s24 }}>
        {links.map(link => (
          <span key={link} onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{ fontFamily: LP.font, fontSize: LP.labelSize, fontWeight: 400,
              color: hl === link ? Dark.text : Dark.textTertiary,
              transition: `color 0.25s ${springGentle}`, cursor: 'default' }}>
            {link}
          </span>
        ))}
      </div>
    </footer>
  )
}

// -- Main --
export function Type() {
  return (
    <div style={{ background: Dark.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: LP.font, WebkitFontSmoothing: 'antialiased' }}>
      <Nav />
      <Hero />
      <Screenshot />
      <Features />
      <PullQuote />
      <SecondaryShot />
      <CTA />
      <Footer />
    </div>
  )
}
