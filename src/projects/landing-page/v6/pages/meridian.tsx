import { useState } from 'react'
import canvasWide from '../../screenshots/canvas-wide.png'

// ── Meridian — Midnight editorial, electric cyan ─────────────────────────
// Bloomberg Terminal meets Linear. Deep navy, cyan accents, editorial grid.
// Massive typography, numbered sections, hairline rules. Authoritative + electric.
const M = {
  bg: '#0A0E1A',
  bgEdge: '#060810',
  surface: '#0F1424',
  text: '#E8E9ED',
  textSec: '#8B8FA3',
  textTer: '#565B73',
  border: '#1A1F35',
  cyan: '#06B6D4',
  cyanDim: '#0891B2',
  cyanGlow: '0 0 40px rgba(6,182,212,0.2)',
  cyanGlowStrong: '0 0 60px rgba(6,182,212,0.3), 0 0 20px rgba(6,182,212,0.15)',
  shadow1: '0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03)',
  shadow2: '0 4px 16px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)',
  shadow3: '0 12px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
}

const headlineFont = '"Space Grotesk", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const bodyFont = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
const mono = '"IBM Plex Mono", "SF Mono", Menlo, monospace'
const springCSS = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// ── Google Fonts loader ─────────────────────────────────────────────────
function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    `}</style>
  )
}

// ── Horizontal rule with section number ─────────────────────────────────
function SectionRule({ number }: { number: string }) {
  return (
    <div style={{
      maxWidth: 1280, margin: '0 auto', padding: '0 48px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        borderTop: `1px solid ${M.border}`,
        paddingTop: 12, paddingBottom: 12,
      }}>
        <span style={{
          fontFamily: mono, fontSize: 11, fontWeight: 400,
          color: M.cyan, letterSpacing: '0.05em',
          textWrap: 'pretty' as const,
        }}>{number}</span>
        <div style={{
          flex: 1, height: 1,
          background: `linear-gradient(to right, ${M.border}, transparent)`,
        }} />
      </div>
    </div>
  )
}

// ── Nav ──────────────────────────────────────────────────────────────────
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box' as const,
    }}>
      <span style={{
        fontFamily: headlineFont, fontSize: 16, fontWeight: 600,
        color: M.text, letterSpacing: '0.02em',
        textWrap: 'pretty' as const,
      }}>canvai</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        {['Features', 'Docs', 'GitHub'].map(link => (
          <span key={link}
            onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: bodyFont, fontSize: 13, fontWeight: 400,
              color: hl === link ? M.text : M.textTer,
              transition: `color 0.15s ${springCSS}`,
              cursor: 'default', textWrap: 'pretty' as const,
            }}>{link}</span>
        ))}
      </div>

      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: bodyFont, fontWeight: 500,
        fontSize: 13, borderRadius: 20, padding: '8px 20px',
        background: M.cyan, color: M.bg,
        transform: ba ? 'scale(0.95)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? M.cyanGlow : 'none',
      }}>Start designing</button>
    </nav>
  )
}

// ── Hero — massive 120px headline, tracked wide ─────────────────────────
function Hero() {
  const [b1h, b1hB] = useHover()
  const [b1a, b1aB] = usePress()
  const [b2h, b2hB] = useHover()
  return (
    <section style={{
      display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
      textAlign: 'center' as const, padding: '120px 48px 80px',
      maxWidth: 1280, margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: headlineFont, fontSize: 128, fontWeight: 700,
        color: M.text, lineHeight: 0.9, letterSpacing: '0.06em',
        margin: 0, textWrap: 'pretty' as const,
        textTransform: 'uppercase' as const,
      }}>
        Design<br />in code
      </h1>
      <p style={{
        fontFamily: bodyFont, fontSize: 18, fontWeight: 400,
        color: M.textSec, marginTop: 32, marginBottom: 48,
        lineHeight: 1.65, maxWidth: 520, textWrap: 'pretty' as const,
      }}>
        An infinite, zoomable canvas for Claude Code. See five directions at once.
        Point, annotate, iterate. What ships is what you designed.
      </p>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <button {...b1hB} {...b1aB} style={{
          border: 'none', cursor: 'default', fontFamily: bodyFont, fontWeight: 500,
          fontSize: 15, borderRadius: 24, padding: '12px 32px',
          background: M.cyan, color: M.bg,
          transform: b1a ? 'scale(0.95)' : b1h ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
          boxShadow: b1h ? M.cyanGlow : 'none',
        }}>Start designing</button>
        <button {...b2hB} style={{
          border: `1px solid ${M.border}`, cursor: 'default',
          fontFamily: bodyFont, fontWeight: 400,
          fontSize: 15, borderRadius: 24, padding: '12px 32px',
          background: 'transparent', color: b2h ? M.text : M.textSec,
          transition: `color 0.15s ${springCSS}, border-color 0.15s ease`,
          borderColor: b2h ? M.textTer : M.border,
        }}>View docs</button>
      </div>
    </section>
  )
}

// ── Product shot — cyan glow on hover ───────────────────────────────────
function ProductShot() {
  const [h, hB] = useHover()
  return (
    <section style={{
      maxWidth: 1080, margin: '0 auto', padding: '40px 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div {...hB} style={{
        borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${h ? M.cyanDim : M.border}`,
        boxShadow: h ? M.cyanGlowStrong : M.shadow2,
        transform: h ? 'translateY(-4px)' : 'translateY(0)',
        transition: `transform 0.3s ${springCSS}, box-shadow 0.4s ease, border-color 0.3s ease`,
      }}>
        <img src={canvasWide} alt="Canvai canvas with multiple design directions" style={{
          width: '100%', display: 'block',
        }} />
      </div>
    </section>
  )
}

// ── Features — 3-column with cyan numbers + hairline separators ─────────
const features = [
  {
    num: '01',
    title: 'Spatial comparison',
    desc: 'Every generation lives as a frame on an infinite canvas. See five directions side by side instead of scrolling through chat.',
  },
  {
    num: '02',
    title: 'Direct annotation',
    desc: 'Click anywhere on the canvas and describe what should change. The AI updates the code while you watch the pixels shift.',
  },
  {
    num: '03',
    title: 'Version permanence',
    desc: 'Nothing is overwritten. Every iteration is preserved. Go back to yesterday. Branch a direction. Your creative history stays intact.',
  },
]

function Features() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '40px 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
      }}>
        {features.map((f, i) => (
          <div key={f.num}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{
              padding: '32px 32px 32px 0',
              borderLeft: i > 0 ? `1px solid ${M.border}` : 'none',
              paddingLeft: i > 0 ? 32 : 0,
              cursor: 'default',
            }}>
            <span style={{
              fontFamily: mono, fontSize: 32, fontWeight: 500,
              color: hi === i ? M.cyan : M.textTer,
              display: 'block', marginBottom: 20,
              transition: `color 0.2s ${springCSS}`,
              lineHeight: 1, textWrap: 'pretty' as const,
            }}>{f.num}</span>
            <h3 style={{
              fontFamily: headlineFont, fontSize: 18, fontWeight: 600,
              color: M.text, margin: '0 0 8px',
              letterSpacing: '-0.01em', textWrap: 'pretty' as const,
            }}>{f.title}</h3>
            <p style={{
              fontFamily: bodyFont, fontSize: 14, fontWeight: 400,
              color: hi === i ? M.textSec : M.textTer, margin: 0,
              lineHeight: 1.65, textWrap: 'pretty' as const,
              transition: `color 0.2s ${springCSS}`,
            }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Stats strip — 4 columns with oversized numbers ──────────────────────
const stats = [
  { value: '5x', label: 'More directions per session' },
  { value: '0', label: 'Prototyping needed' },
  { value: '100%', label: 'Production-ready React' },
  { value: '<2s', label: 'Annotation to update' },
]

function Stats() {
  const [hi, setHi] = useState<number | null>(null)
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '40px 48px 80px',
      boxSizing: 'border-box' as const,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderTop: `1px solid ${M.border}`,
        borderBottom: `1px solid ${M.border}`,
      }}>
        {stats.map((s, i) => (
          <div key={s.label}
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{
              padding: '40px 24px 40px 0',
              borderLeft: i > 0 ? `1px solid ${M.border}` : 'none',
              paddingLeft: i > 0 ? 24 : 0,
              cursor: 'default',
            }}>
            <span style={{
              fontFamily: headlineFont, fontSize: 48, fontWeight: 700,
              color: hi === i ? M.cyan : M.text,
              display: 'block', lineHeight: 1,
              letterSpacing: '-0.02em',
              transition: `color 0.2s ${springCSS}`,
              textWrap: 'pretty' as const,
            }}>{s.value}</span>
            <span style={{
              fontFamily: bodyFont, fontSize: 13, fontWeight: 400,
              color: M.textTer, display: 'block', marginTop: 8,
              textWrap: 'pretty' as const,
            }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Bottom CTA — centered headline + button ─────────────────────────────
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  return (
    <section style={{
      maxWidth: 680, margin: '0 auto', textAlign: 'center' as const,
      padding: '40px 48px 120px',
    }}>
      <h2 style={{
        fontFamily: headlineFont, fontSize: 48, fontWeight: 700,
        color: M.text, letterSpacing: '-0.02em',
        margin: '0 0 12px', textWrap: 'pretty' as const,
        lineHeight: 1.1,
      }}>Ship what you designed</h2>
      <p style={{
        fontFamily: bodyFont, fontSize: 16, fontWeight: 400,
        color: M.textTer, margin: '0 0 36px', textWrap: 'pretty' as const,
      }}>Free, open source, runs in your terminal.</p>
      <button {...bhB} {...baB} style={{
        border: 'none', cursor: 'default', fontFamily: bodyFont, fontWeight: 500,
        fontSize: 16, borderRadius: 24, padding: '14px 40px',
        background: M.cyan, color: M.bg,
        transform: ba ? 'scale(0.95)' : bh ? 'scale(1.02)' : 'scale(1)',
        transition: `transform 0.15s ${springCSS}, box-shadow 0.2s ease`,
        boxShadow: bh ? M.cyanGlowStrong : M.cyanGlow,
      }}>Start designing</button>
    </section>
  )
}

// ── Footer — single line with links ─────────────────────────────────────
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  return (
    <footer style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px', maxWidth: 1280, margin: '0 auto',
      width: '100%', boxSizing: 'border-box' as const,
      borderTop: `1px solid ${M.border}`,
    }}>
      <span style={{
        fontFamily: headlineFont, fontSize: 13, fontWeight: 500,
        color: M.textTer, textWrap: 'pretty' as const,
      }}>canvai</span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['GitHub', 'Docs', 'Changelog'].map(l => (
          <span key={l} onMouseEnter={() => setHL(l)} onMouseLeave={() => setHL(null)}
            style={{
              fontFamily: bodyFont, fontSize: 13, fontWeight: 400, cursor: 'default',
              color: hl === l ? M.cyan : M.textTer,
              transition: `color 0.15s ${springCSS}`,
              textWrap: 'pretty' as const,
            }}>{l}</span>
        ))}
      </div>
    </footer>
  )
}

export function Meridian() {
  return (
    <div style={{
      background: `radial-gradient(ellipse at 50% 30%, ${M.bg} 0%, ${M.bgEdge} 100%)`,
      minHeight: '100%', overflow: 'auto',
      fontFamily: bodyFont,
      WebkitFontSmoothing: 'antialiased',
      cursor: 'default',
    }}>
      <FontLoader />
      <Nav />
      <Hero />
      <SectionRule number="01" />
      <ProductShot />
      <SectionRule number="02" />
      <Features />
      <SectionRule number="03" />
      <Stats />
      <BottomCTA />
      <Footer />
    </div>
  )
}
