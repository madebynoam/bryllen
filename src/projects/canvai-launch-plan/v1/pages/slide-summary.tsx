/**
 * Slide 1: What We're Building
 * Dieter Rams — grid, minimal, functional
 */

const C = {
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E5E5E5',
  borderStrong: '#1A1A1A',
  accent: '#E54D2E',
  text: '#1A1A1A',
  textSec: '#666666',
  textMuted: '#999999',
}

const G = 8

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: 'center', padding: G * 3, border: `1px solid ${C.border}` }}>
      <div style={{ fontSize: 48, fontWeight: 700, color: C.text, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: G }}>{label}</div>
    </div>
  )
}

export function SlideSummary() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>01 — Vision</div>

      <h1 style={{ fontSize: 40, fontWeight: 700, color: C.text, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        See every direction<br />at once
      </h1>

      <p style={{ fontSize: 16, color: C.textSec, margin: `${G * 3}px 0`, maxWidth: 400, lineHeight: 1.5 }}>
        Design canvas for Claude Code. Generate real React components. Compare directions side-by-side. Ship what works.
      </p>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, backgroundColor: C.border }}>
        <Metric value="∞" label="Canvas" />
        <Metric value="N" label="Directions" />
        <Metric value="1" label="Click to Share" />
        <Metric value="0" label="Mockups" />
      </div>

      <div style={{ marginTop: G * 4, fontSize: 13, color: C.textSec }}>
        Not mockups. Not chat. A canvas where designs become code.
      </div>
    </div>
  )
}
