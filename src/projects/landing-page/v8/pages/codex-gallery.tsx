import { useState } from 'react'
import canvasOriginals from '../../screenshots/canvas-originals.png'
import canvasRams from '../../screenshots/canvas-rams-grid.png'
import canvasExpressive from '../../screenshots/v6-expressive-canvas.png'

// ── Codex Gallery — Museum Whitespace ───────────────────────────────────────
// Pure white gallery. Screenshots as art pieces with generous negative space.
// Soft shadows, rounded corners, playful but refined. Less text, more visual.

const C = {
  bg: 'oklch(1.000 0 0)',
  bgSoft: 'oklch(0.980 0.005 260)',
  text: 'oklch(0.120 0.010 260)',
  textSec: 'oklch(0.450 0.010 260)',
  textTer: 'oklch(0.600 0.008 260)',
  border: 'oklch(0.920 0.005 260)',
  accent: 'oklch(0.550 0.200 260)',
  accentSoft: 'oklch(0.940 0.030 260)',
}

const font = '"Inter", -apple-system, system-ui, sans-serif'
const spring = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

function GalleryCard({ img, title, hover, hoverBind }: { img: string, title: string, hover: boolean, hoverBind: object }) {
  return (
    <div {...hoverBind} style={{
      borderRadius: 16, overflow: 'hidden',
      background: C.bg,
      boxShadow: hover
        ? '0 20px 50px oklch(0.2 0.02 260 / 0.15), 0 8px 20px oklch(0.2 0.02 260 / 0.1)'
        : '0 4px 20px oklch(0.2 0.01 260 / 0.06), 0 1px 4px oklch(0.2 0.01 260 / 0.04)',
      transform: hover ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
      transition: `transform 0.4s ${spring}, box-shadow 0.4s ease`,
    }}>
      <img src={img} alt={title} style={{ width: '100%', display: 'block' }} />
      <div style={{ padding: '16px 20px' }}>
        <span style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: C.textSec }}>{title}</span>
      </div>
    </div>
  )
}

export function CodexGallery() {
  const [bh, bhB] = useHover()
  const [ba, baB] = usePress()
  const [h1, h1B] = useHover()
  const [h2, h2B] = useHover()
  const [h3, h3B] = useHover()

  const features = [
    { icon: '◎', title: 'Infinite canvas', desc: 'See every design direction at once' },
    { icon: '◇', title: 'Live React', desc: 'Ship real code, not mockups' },
    { icon: '◈', title: 'Direct annotation', desc: 'Click elements, describe changes' },
  ]

  return (
    <div style={{ background: C.bg, minHeight: '100%', overflow: 'auto', fontFamily: font, WebkitFontSmoothing: 'antialiased' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 80px', maxWidth: 1200, margin: '0 auto',
        width: '100%', boxSizing: 'border-box',
      }}>
        <span style={{ fontFamily: font, fontSize: 17, fontWeight: 600, color: C.text, letterSpacing: '-0.02em' }}>bryllen</span>
        <button {...bhB} {...baB} style={{
          border: 'none', cursor: 'default', fontFamily: font, fontWeight: 500,
          fontSize: 13, borderRadius: 20, padding: '10px 22px',
          background: C.accent, color: C.bg,
          transform: ba ? 'scale(0.94)' : bh ? 'scale(1.02)' : 'scale(1)',
          transition: `transform 0.15s ${spring}`,
        }}>Start designing</button>
      </nav>

      {/* Hero */}
      <section style={{
        padding: '100px 80px 120px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
        textAlign: 'center' as const,
      }}>
        <h1 style={{
          fontFamily: font, fontSize: 64, fontWeight: 600, color: C.text,
          lineHeight: 1.05, letterSpacing: '-0.04em', margin: '0 0 28px',
        }}>
          See every direction<br />at once
        </h1>
        <p style={{
          fontFamily: font, fontSize: 19, fontWeight: 400, color: C.textSec,
          maxWidth: 520, margin: '0 auto', lineHeight: 1.55,
        }}>
          An infinite canvas for design exploration. Claude Code generates real React components you can compare and ship.
        </p>
      </section>

      {/* Gallery Grid */}
      <section style={{
        padding: '0 80px 100px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr', gap: 32,
        }}>
          <GalleryCard img={canvasOriginals} title="Multiple directions from one prompt" hover={h1} hoverBind={h1B} />
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 32,
        }}>
          <GalleryCard img={canvasRams} title="Compare side by side" hover={h2} hoverBind={h2B} />
          <GalleryCard img={canvasExpressive} title="Every frame is real code" hover={h3} hoverBind={h3B} />
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: '80px 80px 100px', maxWidth: 1200, margin: '0 auto', boxSizing: 'border-box',
        background: C.bgSoft, borderRadius: 24,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48,
        }}>
          {features.map((f) => (
            <div key={f.title} style={{ textAlign: 'center' as const }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: C.bg, margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, color: C.accent,
                boxShadow: '0 2px 8px oklch(0.2 0.01 260 / 0.06)',
              }}>{f.icon}</div>
              <h3 style={{
                fontFamily: font, fontSize: 17, fontWeight: 600, color: C.text,
                margin: '0 0 8px',
              }}>{f.title}</h3>
              <p style={{
                fontFamily: font, fontSize: 14, fontWeight: 400, color: C.textSec,
                margin: 0, lineHeight: 1.5,
              }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Description blocks */}
      <section style={{
        padding: '100px 80px', maxWidth: 900, margin: '0 auto', boxSizing: 'border-box',
      }}>
        {[
          { num: '01', title: 'The infinite canvas', body: 'Every design generation lives as a frame on an infinite, zoomable surface. No tabs to click through, no chat history to scroll. Everything visible at once.' },
          { num: '02', title: 'Multiple directions', body: 'One prompt generates five complete layouts — not variations, but genuinely different structural approaches. Compare them side by side and pick what works.' },
          { num: '03', title: 'Direct annotation', body: 'Click anywhere on any frame. Describe what you want changed. The code updates while you watch. No separate feedback tool, no export-annotate-reimport.' },
          { num: '04', title: 'Production code', body: 'Every frame is working React. Ship what you designed. The canvas produces the artifact, not a picture of one.' },
        ].map((item, i) => (
          <div key={item.num} style={{
            display: 'flex', gap: 40, padding: '40px 0',
            borderTop: i > 0 ? `1px solid ${C.border}` : 'none',
          }}>
            <span style={{
              fontFamily: font, fontSize: 13, fontWeight: 500, color: C.accent,
              width: 32, flexShrink: 0,
            }}>{item.num}</span>
            <div>
              <h3 style={{
                fontFamily: font, fontSize: 22, fontWeight: 600, color: C.text,
                margin: '0 0 12px', letterSpacing: '-0.02em',
              }}>{item.title}</h3>
              <p style={{
                fontFamily: font, fontSize: 16, fontWeight: 400, color: C.textSec,
                margin: 0, lineHeight: 1.65,
              }}>{item.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 80px', maxWidth: 1200, margin: '0 auto',
        width: '100%', boxSizing: 'border-box',
        textAlign: 'center' as const,
      }}>
        <span style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: C.textTer }}>bryllen</span>
      </footer>
    </div>
  )
}
