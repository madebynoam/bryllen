import { useState } from 'react'
import { LP, Light, spring, springGentle } from '../../v1/tokens'
import pulseDashboard from '../../screenshots/pulse-dashboard.png'
import pulseComponents from '../../screenshots/pulse-components.png'
import pulseSettings from '../../screenshots/pulse-settings.png'

// --- Design tokens ---
const AC = '#E8590C'
const AC_HOVER = '#CF4F0B'
const COLS = 12
const COL_GAP = 20
const MAX_W = 1200
const GRID_DOT = `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`
const GRID_LINE = `rgba(0,0,0,0.04)`
const springTr = `all 0.25s ${spring}`

// --- Hover / press helpers ---
function useHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) }] as const
}
function usePress() {
  const [p, setP] = useState(false)
  return [p, { onMouseDown: () => setP(true), onMouseUp: () => setP(false), onMouseLeave: () => setP(false) }] as const
}

// --- Section label (monospace, engineering style) ---
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontFamily: LP.mono, fontSize: 11, fontWeight: 500,
      color: AC, letterSpacing: '0.12em', textTransform: 'uppercase',
      marginBottom: LP.s24, textWrap: 'pretty',
    }}>
      {label}
    </div>
  )
}

// --- Figure caption ---
function FigCaption({ text }: { text: string }) {
  return (
    <div style={{
      fontFamily: LP.mono, fontSize: 11, color: Light.textTertiary,
      marginTop: LP.s12, letterSpacing: '0.02em', textWrap: 'pretty',
    }}>
      {text}
    </div>
  )
}

// --- Nav link ---
function NavLink({ label }: { label: string }) {
  const [h, hB] = useHover()
  return (
    <span {...hB} style={{
      fontFamily: LP.mono, fontSize: LP.labelSize, fontWeight: 500,
      color: h ? Light.text : Light.textSecondary,
      transition: 'color 0.2s ease', cursor: 'default', textWrap: 'pretty',
    }}>
      {label}
    </span>
  )
}

// --- Grid column wrapper (maps to 12-col grid) ---
function Col({ start, end, children, style }: {
  start: number; end: number; children: React.ReactNode; style?: React.CSSProperties
}) {
  return (
    <div style={{ gridColumn: `${start} / ${end + 1}`, ...style }}>
      {children}
    </div>
  )
}

// --- Feature item ---
function Feature({ num, title, desc }: { num: string; title: string; desc: string }) {
  const [h, hB] = useHover()
  return (
    <div {...hB} style={{
      borderTop: `1px solid ${h ? AC : Light.border}`,
      paddingTop: LP.s20, transition: springTr, cursor: 'default',
    }}>
      <div style={{
        fontFamily: LP.mono, fontSize: 11, color: AC,
        letterSpacing: '0.08em', marginBottom: LP.s8,
      }}>
        {num}
      </div>
      <div style={{
        fontFamily: LP.font, fontSize: LP.bodySize, fontWeight: 600,
        color: Light.text, marginBottom: LP.s8, textWrap: 'pretty',
      }}>
        {title}
      </div>
      <div style={{
        fontFamily: LP.font, fontSize: LP.captionSize, color: Light.textSecondary,
        lineHeight: 1.5, textWrap: 'pretty',
      }}>
        {desc}
      </div>
    </div>
  )
}

// --- Main export ---
export function Grid() {
  const [ctaHover, ctaHB] = useHover()
  const [ctaPress, ctaPB] = usePress()
  const [cta2Hover, cta2HB] = useHover()
  const [cta2Press, cta2PB] = usePress()
  const [ghHover, ghHB] = useHover()
  const [ghPress, ghPB] = usePress()
  const [heroImgH, heroImgHB] = useHover()
  const [sc1H, sc1HB] = useHover()
  const [sc2H, sc2HB] = useHover()

  const gridContainer: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
    gap: `0 ${COL_GAP}px`,
    maxWidth: MAX_W,
    margin: '0 auto',
    padding: `0 ${LP.s32}px`,
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
  }

  return (
    <div style={{
      minHeight: '100%', overflow: 'auto', cursor: 'default',
      background: Light.bg, fontFamily: LP.font,
      backgroundImage: GRID_DOT,
      backgroundSize: '24px 24px',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* Faint vertical grid lines overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          ...gridContainer,
          height: '100%', position: 'absolute',
          left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: MAX_W,
        }}>
          {Array.from({ length: COLS }).map((_, i) => (
            <div key={i} style={{
              borderLeft: `1px dotted ${GRID_LINE}`,
              borderRight: i === COLS - 1 ? `1px dotted ${GRID_LINE}` : 'none',
              height: '100%',
            }} />
          ))}
        </div>
      </div>

      {/* Content — everything z-index above grid lines */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Column markers */}
        <div style={{ ...gridContainer, paddingTop: LP.s16, paddingBottom: LP.s4 }}>
          {Array.from({ length: COLS }).map((_, i) => (
            <div key={i} style={{
              fontFamily: LP.mono, fontSize: 9, color: Light.textTertiary,
              textAlign: 'center', opacity: 0.6,
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* ===== 01 HEADER ===== */}
        <header style={{ ...gridContainer, alignItems: 'center', paddingTop: LP.s16, paddingBottom: LP.s16 }}>
          <Col start={1} end={3}>
            <span style={{
              fontFamily: LP.mono, fontSize: 15, fontWeight: 700,
              color: Light.text, letterSpacing: '-0.01em',
            }}>
              canvai
            </span>
          </Col>
          <Col start={8} end={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: LP.s32, alignItems: 'center' }}>
            <NavLink label="Features" />
            <NavLink label="Docs" />
            <NavLink label="GitHub" />
          </Col>
        </header>

        {/* Red rule */}
        <div style={{ ...gridContainer }}>
          <Col start={1} end={12}>
            <div style={{ height: 2, background: AC }} />
          </Col>
        </div>

        {/* ===== 02 HERO ===== */}
        <section style={{ ...gridContainer, paddingTop: LP.s80, paddingBottom: LP.s64 }}>
          <Col start={1} end={8}>
            <SectionLabel label="01 Hero" />
            <h1 style={{
              fontFamily: `Georgia, "Times New Roman", serif`,
              fontSize: 56, fontWeight: 700, color: Light.text,
              lineHeight: 1.08, letterSpacing: '-0.03em',
              margin: 0, textWrap: 'pretty',
            }}>
              Code is<br />the canvas.
            </h1>
          </Col>
          <Col start={1} end={6} style={{ paddingTop: LP.s24 }}>
            <p style={{
              fontFamily: LP.font, fontSize: LP.bodySize, color: Light.textSecondary,
              lineHeight: 1.6, margin: 0, textWrap: 'pretty',
            }}>
              An infinite canvas where every design is live React code.
              No handoff. No export. What you see is what ships.
            </p>
          </Col>
          <Col start={1} end={3} style={{ paddingTop: LP.s32 }}>
            <button {...ctaHB} {...ctaPB} style={{
              fontFamily: LP.mono, fontSize: LP.captionSize, fontWeight: 600,
              background: ctaPress ? AC_HOVER : ctaHover ? AC : AC,
              color: '#FAF9F8', border: 'none', cursor: 'default',
              padding: `${LP.s12}px ${LP.s24}px`, borderRadius: 4,
              transition: springTr, width: '100%',
              transform: ctaPress ? 'scale(0.96)' : ctaHover ? 'scale(1.02)' : 'scale(1)',
              boxShadow: ctaHover ? `0 8px 24px rgba(232,89,12,0.25)` : 'none',
            }}>
              Install Plugin
            </button>
          </Col>
          <Col start={4} end={6} style={{ paddingTop: LP.s32 }}>
            <button {...ghHB} {...ghPB} style={{
              fontFamily: LP.mono, fontSize: LP.captionSize, fontWeight: 500,
              background: 'transparent', color: Light.text,
              border: `1px solid ${ghHover ? Light.text : Light.border}`,
              cursor: 'default', padding: `${LP.s12}px ${LP.s24}px`, borderRadius: 4,
              transition: springTr, width: '100%',
              transform: ghPress ? 'scale(0.96)' : ghHover ? 'scale(1.02)' : 'scale(1)',
            }}>
              View on GitHub
            </button>
          </Col>
        </section>

        {/* ===== 03 PRODUCT ===== */}
        <section style={{ ...gridContainer, paddingBottom: LP.s64 }}>
          <Col start={1} end={12}>
            <SectionLabel label="02 Product" />
            <div
              {...heroImgHB}
              style={{
                border: `1px solid ${heroImgH ? Light.text : Light.border}`,
                borderRadius: 4, overflow: 'hidden',
                transition: springTr,
                boxShadow: heroImgH ? '0 16px 48px rgba(0,0,0,0.08)' : '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <img src={pulseDashboard} alt="Pulse analytics dashboard" style={{
                width: '100%', display: 'block',
              }} />
            </div>
            <FigCaption text="fig. 01 — Dashboard view, Pulse analytics project" />
          </Col>
        </section>

        {/* ===== 04 FEATURES ===== */}
        <section style={{ ...gridContainer, paddingBottom: LP.s64 }}>
          <Col start={1} end={12}>
            <SectionLabel label="03 Features" />
          </Col>
          <Col start={1} end={3}>
            <Feature num="01" title="Live Code Canvas"
              desc="Every frame is a real React component. No static mockups." />
          </Col>
          <Col start={4} end={6}>
            <Feature num="02" title="Point & Annotate"
              desc="Click anywhere, describe a change. Watch it happen in real time." />
          </Col>
          <Col start={7} end={9}>
            <Feature num="03" title="Instant Iterations"
              desc="Every change creates a snapshot. Compare, revert, never lose work." />
          </Col>
          <Col start={10} end={12}>
            <Feature num="04" title="Ship-Ready Code"
              desc="What you design is what you ship. No translation layer required." />
          </Col>
        </section>

        {/* ===== 05 CODE BLOCK ===== */}
        <section style={{ ...gridContainer, paddingBottom: LP.s64 }}>
          <Col start={1} end={8}>
            <SectionLabel label="04 Get Started" />
            <div style={{
              background: '#1A1918', borderRadius: 4, padding: LP.s24,
              fontFamily: LP.mono, fontSize: 13, lineHeight: 2.2,
              border: `1px solid #2A2A28`,
            }}>
              <div>
                <span style={{ color: AC }}>$</span>{' '}
                <span style={{ color: '#E8E6E3' }}>claude</span>{' '}
                <span style={{ color: '#9C9A97' }}>plugin marketplace add canvai</span>
              </div>
              <div style={{ color: '#555550', marginTop: LP.s4 }}># install the canvai plugin</div>
              <div style={{ marginTop: LP.s16 }}>
                <span style={{ color: AC }}>&gt;</span>{' '}
                <span style={{ color: '#E8E6E3' }}>/canvai-new</span>{' '}
                <span style={{ color: '#9C9A97' }}>my-project</span>
              </div>
              <div style={{ color: '#555550', marginTop: LP.s4 }}># scaffold a design project</div>
              <div style={{ marginTop: LP.s16 }}>
                <span style={{ color: AC }}>&gt;</span>{' '}
                <span style={{ color: '#E8E6E3' }}>/canvai-design</span>
              </div>
              <div style={{ color: '#555550', marginTop: LP.s4 }}># open canvas + watch mode</div>
            </div>
            <FigCaption text="fig. 02 — Claude Code commands" />
          </Col>
        </section>

        {/* ===== 06 SCREENSHOTS ===== */}
        <section style={{ ...gridContainer, paddingBottom: LP.s64 }}>
          <Col start={1} end={12}>
            <SectionLabel label="05 Canvas Views" />
          </Col>
          <Col start={1} end={6}>
            <div
              {...sc1HB}
              style={{
                border: `1px solid ${sc1H ? Light.text : Light.border}`,
                borderRadius: 4, overflow: 'hidden', transition: springTr,
                boxShadow: sc1H ? '0 12px 36px rgba(0,0,0,0.07)' : '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <img src={pulseComponents} alt="Component matrix" style={{ width: '100%', display: 'block' }} />
            </div>
            <FigCaption text="fig. 03 — Component matrix, all states at a glance" />
          </Col>
          <Col start={7} end={12}>
            <div
              {...sc2HB}
              style={{
                border: `1px solid ${sc2H ? Light.text : Light.border}`,
                borderRadius: 4, overflow: 'hidden', transition: springTr,
                boxShadow: sc2H ? '0 12px 36px rgba(0,0,0,0.07)' : '0 2px 8px rgba(0,0,0,0.02)',
              }}
            >
              <img src={pulseSettings} alt="Settings panel" style={{ width: '100%', display: 'block' }} />
            </div>
            <FigCaption text="fig. 04 — Settings view, design tokens panel" />
          </Col>
        </section>

        {/* ===== 07 CTA ===== */}
        <section style={{ ...gridContainer, paddingTop: LP.s48, paddingBottom: LP.s80 }}>
          <Col start={1} end={6}>
            <SectionLabel label="06 Start" />
            <h2 style={{
              fontFamily: `Georgia, "Times New Roman", serif`,
              fontSize: LP.h1Size, fontWeight: 700, color: Light.text,
              lineHeight: 1.1, letterSpacing: '-0.02em',
              margin: 0, textWrap: 'pretty',
            }}>
              Start designing.
            </h2>
            <div style={{ paddingTop: LP.s24, display: 'flex', alignItems: 'center', gap: LP.s16 }}>
              <button {...cta2HB} {...cta2PB} style={{
                fontFamily: LP.mono, fontSize: LP.captionSize, fontWeight: 600,
                background: cta2Press ? AC_HOVER : AC,
                color: '#FAF9F8', border: 'none', cursor: 'default',
                padding: `${LP.s12}px ${LP.s24}px`, borderRadius: 4,
                transition: springTr,
                transform: cta2Press ? 'scale(0.96)' : cta2Hover ? 'scale(1.02)' : 'scale(1)',
                boxShadow: cta2Hover ? `0 8px 24px rgba(232,89,12,0.25)` : 'none',
              }}>
                Install Plugin
              </button>
              <span style={{
                fontFamily: LP.mono, fontSize: 11, color: Light.textTertiary,
                letterSpacing: '0.02em', textWrap: 'pretty',
              }}>
                Free and open source
              </span>
            </div>
          </Col>
        </section>

        {/* ===== 08 FOOTER ===== */}
        <footer style={{ ...gridContainer, paddingTop: 0, paddingBottom: LP.s32 }}>
          <Col start={1} end={12}>
            <div style={{ height: 2, background: AC, marginBottom: LP.s24 }} />
          </Col>
          <Col start={1} end={3}>
            <span style={{
              fontFamily: LP.mono, fontSize: 13, fontWeight: 700, color: Light.text,
            }}>
              canvai
            </span>
            <div style={{
              fontFamily: LP.font, fontSize: 11, color: Light.textTertiary,
              marginTop: LP.s8, lineHeight: 1.5, textWrap: 'pretty',
            }}>
              Design in code.
            </div>
          </Col>
          <Col start={4} end={6}>
            <div style={{ display: 'flex', gap: LP.s20 }}>
              {['Features', 'Docs', 'GitHub', 'Changelog'].map(link => (
                <NavLink key={link} label={link} />
              ))}
            </div>
          </Col>
          <Col start={10} end={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <span style={{
              fontFamily: LP.mono, fontSize: 11, color: AC,
              border: `1px solid ${AC}`, borderRadius: 4,
              padding: `${LP.s4}px ${LP.s8}px`, letterSpacing: '0.04em',
              display: 'inline-block', lineHeight: 1,
            }}>
              OPEN SOURCE
            </span>
          </Col>
        </footer>

      </div>
    </div>
  )
}
