import { useState } from 'react'
import { LP, Dark, spring } from '../tokens'
import canvasFull from '../../screenshots/canvas-full.png'
import canvasTokens from '../../screenshots/canvas-tokens.png'
import canvasComponents from '../../screenshots/canvas-components.png'

// Shared interaction helpers
const btn: React.CSSProperties = {
  border: 'none', cursor: 'default', fontFamily: LP.font, fontWeight: 600,
  fontSize: LP.bodySize, borderRadius: LP.pillRadius,
  transition: `transform 0.2s ${spring}, box-shadow 0.2s ${spring}`,
}

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}
function scale(hover: boolean, active: boolean) {
  return active ? 'scale(0.98)' : hover ? 'scale(1.02)' : 'scale(1)'
}

// ---- Nav ----
function Nav() {
  const [hl, setHL] = useState<string | null>(null)
  const [ch, chB] = useHover()
  const [ca, caB] = usePress()

  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: `${LP.s16}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto',
      width: '100%', boxSizing: 'border-box' }}>
      <span style={{ fontFamily: LP.mono, fontSize: LP.h3Size, fontWeight: 700,
        color: Dark.text, letterSpacing: '-0.02em' }}>canvai</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: LP.s32 }}>
        {['Features', 'Docs'].map(link => (
          <span key={link} onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
            style={{ fontFamily: LP.font, fontSize: LP.captionSize, fontWeight: 500,
              color: hl === link ? Dark.text : Dark.textSecondary,
              transition: 'color 0.2s ease, opacity 0.2s ease',
              opacity: hl === link ? 1 : 0.8, cursor: 'default', textWrap: 'pretty' }}>
            {link}
          </span>
        ))}
        <button {...chB} {...caB} style={{ ...btn, padding: `${LP.s8}px ${LP.s20}px`,
          fontSize: LP.captionSize, background: Dark.accent, color: Dark.text,
          transform: scale(ch, ca), boxShadow: ch ? `0 0 20px ${Dark.accentMuted}` : 'none' }}>
          Get Started
        </button>
      </div>
    </nav>
  )
}

// ---- Hero ----
function Hero() {
  const [ph, phB] = useHover()
  const [pa, paB] = usePress()
  const [sh, shB] = useHover()
  const [sa, saB] = usePress()

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', padding: `${LP.s80}px ${LP.s32}px ${LP.s64}px`,
      maxWidth: LP.maxWidth, margin: '0 auto' }}>
      <h1 style={{ fontFamily: LP.font, fontSize: LP.heroSize, fontWeight: 800,
        color: Dark.text, lineHeight: 1.05, letterSpacing: '-0.04em',
        margin: 0, textWrap: 'pretty' }}>
        The AI Design Studio
      </h1>
      <p style={{ fontFamily: LP.font, fontSize: LP.h3Size, fontWeight: 400,
        color: Dark.textSecondary, marginTop: LP.s24, marginBottom: LP.s48,
        lineHeight: 1.4, textWrap: 'pretty' }}>
        Where every design is live React code.
      </p>
      <div style={{ display: 'flex', gap: LP.s16 }}>
        <button {...phB} {...paB} style={{ ...btn, padding: `${LP.s16}px ${LP.s32}px`,
          background: Dark.accent, color: Dark.text, transform: scale(ph, pa),
          boxShadow: ph ? '0 4px 24px rgba(232,89,12,0.35)' : '0 2px 12px rgba(232,89,12,0.2)' }}>
          Start Designing
        </button>
        <button {...shB} {...saB} style={{ ...btn, padding: `${LP.s16}px ${LP.s32}px`,
          background: 'transparent', color: Dark.text, border: `1px solid ${Dark.border}`,
          transform: scale(sh, sa), boxShadow: sh ? '0 0 16px rgba(255,255,255,0.05)' : 'none' }}>
          View on GitHub
        </button>
      </div>
    </section>
  )
}

// ---- Feature Cards ----
const features = [
  { title: 'Live Code Canvas', desc: 'An infinite canvas where every frame is a real React component. No export step, no handoff.', span: 1 },
  { title: 'Point & Click Annotations', desc: 'Click anywhere on the canvas to leave feedback. Your AI agent picks it up and iterates in real time.', span: 1 },
  { title: 'Instant Iterations', desc: 'Every change creates a new iteration. Compare side by side, revert in one click, never lose work.', span: 1 },
  { title: 'Component Matrix', desc: 'See every component state at once: sizes, variants, themes. A living spec that never goes stale.', span: 1 },
  { title: 'Ship-Ready React', desc: 'What you design is what you ship. No translation layer, no design tokens to sync. The design is the code.', span: 2 },
]

function FeatureCard({ title, desc, span }: { title: string; desc: string; span: number }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{
      background: Dark.surface, border: `1px solid ${h ? Dark.textTertiary : Dark.border}`,
      borderRadius: LP.cardRadius, padding: LP.s32,
      gridColumn: span === 2 ? 'span 2' : 'span 1',
      transition: `transform 0.25s ${spring}, border-color 0.3s ease, box-shadow 0.3s ease`,
      transform: h ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: h ? `0 8px 32px rgba(232,89,12,0.08), 0 0 0 1px ${Dark.textTertiary}` : 'none',
    }}>
      <h3 style={{ fontFamily: LP.font, fontSize: 20, fontWeight: 700, color: Dark.text,
        margin: 0, marginBottom: LP.s12, textWrap: 'pretty' }}>{title}</h3>
      <p style={{ fontFamily: LP.font, fontSize: LP.bodySize, color: Dark.textSecondary,
        lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>{desc}</p>
    </div>
  )
}

function Features() {
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto', padding: `${LP.s64}px ${LP.s32}px` }}>
      <h2 style={{ fontFamily: LP.font, fontSize: LP.h2Size, fontWeight: 700, color: Dark.text,
        textAlign: 'center', marginBottom: LP.s48, letterSpacing: '-0.02em', textWrap: 'pretty' }}>
        Everything you need to design in code
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s20 }}>
        {features.map(f => <FeatureCard key={f.title} {...f} />)}
      </div>
    </section>
  )
}

// ---- Product Screenshot ----
function Thumb({ src, alt }: { src: string; alt: string }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{ borderRadius: LP.s12, overflow: 'hidden',
      border: `1px solid ${Dark.border}`,
      transition: `transform 0.3s ${spring}, box-shadow 0.3s ease`,
      transform: h ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: h ? '0 12px 40px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.2)' }}>
      <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
    </div>
  )
}

function ProductScreenshot() {
  const [h, hB] = useHover()
  return (
    <section style={{ maxWidth: LP.maxWidth, margin: '0 auto',
      padding: `${LP.s48}px ${LP.s32}px ${LP.s80}px` }}>
      <div {...hB} style={{ borderRadius: LP.cardRadius, overflow: 'hidden',
        border: `1px solid ${Dark.border}`,
        transition: `transform 0.35s ${spring}, box-shadow 0.35s ease`,
        transform: h ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: h
          ? '0 24px 80px rgba(232,89,12,0.12), 0 0 60px rgba(232,89,12,0.06)'
          : '0 8px 40px rgba(0,0,0,0.4)' }}>
        <img src={canvasFull} alt="Canvai canvas" style={{ width: '100%', display: 'block' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LP.s20, marginTop: LP.s20 }}>
        <Thumb src={canvasTokens} alt="Design tokens on canvas" />
        <Thumb src={canvasComponents} alt="Component matrix on canvas" />
      </div>
    </section>
  )
}

// ---- Bottom CTA ----
function BottomCTA() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()

  return (
    <section style={{ maxWidth: 640, margin: '0 auto',
      padding: `${LP.s80}px ${LP.s32}px`, textAlign: 'center' }}>
      <h2 style={{ fontFamily: LP.font, fontSize: LP.h2Size, fontWeight: 700,
        color: Dark.text, marginBottom: LP.s16, letterSpacing: '-0.02em', textWrap: 'pretty' }}>
        Start building with Canvai
      </h2>
      <p style={{ fontFamily: LP.font, fontSize: LP.bodySize, color: Dark.textSecondary,
        marginBottom: LP.s32, lineHeight: 1.6, textWrap: 'pretty' }}>
        Canvai is open source. Start designing in code today.
      </p>
      <button {...bhB} {...baB}
        style={{ ...btn, padding: `${LP.s16}px ${LP.s32}px`, background: Dark.accent,
          color: Dark.text, transform: scale(bh, ba),
          boxShadow: bh ? '0 4px 20px rgba(232,89,12,0.3)' : 'none' }}>
        Install Plugin
      </button>
    </section>
  )
}

// ---- Footer ----
function Footer() {
  const [hl, setHL] = useState<string | null>(null)
  const cols = [
    { heading: 'Product', links: ['Features', 'Changelog', 'Roadmap'] },
    { heading: 'Resources', links: ['Documentation', 'Blog'] },
    { heading: 'Community', links: ['GitHub', 'Discord', 'Twitter'] },
  ]

  return (
    <footer style={{ borderTop: `1px solid ${Dark.border}`,
      padding: `${LP.s48}px ${LP.s32}px ${LP.s32}px`, maxWidth: LP.maxWidth, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: LP.s40, marginBottom: LP.s48 }}>
        <div>
          <span style={{ fontFamily: LP.mono, fontSize: LP.h3Size, fontWeight: 700,
            color: Dark.text }}>canvai</span>
          <p style={{ fontFamily: LP.font, fontSize: LP.captionSize, color: Dark.textTertiary,
            marginTop: LP.s12, lineHeight: 1.6, textWrap: 'pretty' }}>
            Design in code.<br />Ship what you see.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.heading}>
            <h4 style={{ fontFamily: LP.font, fontSize: LP.labelSize, fontWeight: 600,
              color: Dark.textTertiary, textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: LP.s16, marginTop: 0 }}>{col.heading}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: LP.s12 }}>
              {col.links.map(link => (
                <span key={link} onMouseEnter={() => setHL(link)} onMouseLeave={() => setHL(null)}
                  style={{ fontFamily: LP.font, fontSize: LP.captionSize,
                    color: hl === link ? Dark.text : Dark.textSecondary,
                    transition: 'color 0.2s ease', cursor: 'default', textWrap: 'pretty' }}>
                  {link}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${Dark.border}`, paddingTop: LP.s24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: LP.font, fontSize: LP.labelSize, color: Dark.textTertiary }}>
          &copy; 2026 Canvai. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: LP.s20 }}>
          {['Twitter', 'GitHub', 'Discord'].map(s => (
            <span key={s} onMouseEnter={() => setHL(s)} onMouseLeave={() => setHL(null)}
              style={{ fontFamily: LP.font, fontSize: LP.labelSize,
                color: hl === s ? Dark.text : Dark.textTertiary,
                transition: 'color 0.2s ease', cursor: 'default' }}>{s}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ---- Main Component ----
export function Noir() {
  return (
    <div style={{ background: Dark.bg, minHeight: '100%', overflow: 'auto',
      fontFamily: LP.font, WebkitFontSmoothing: 'antialiased' }}>
      <Nav />
      <Hero />
      <ProductScreenshot />
      <Features />
      <BottomCTA />
      <Footer />
    </div>
  )
}
