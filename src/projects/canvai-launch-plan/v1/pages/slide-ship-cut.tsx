/**
 * Slide 3: Ship vs Cut
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
  green: '#2E7D32',
  red: '#C62828',
}

const G = 8

function Item({ label, status }: { label: string; status: 'ship' | 'cut' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: `${G * 1.5}px 0`, borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
      <span style={{ color: C.text }}>{label}</span>
      <span style={{ color: status === 'ship' ? C.green : C.red, fontWeight: 600, fontSize: 11 }}>
        {status === 'ship' ? '✓ SHIP' : '✕ CUT'}
      </span>
    </div>
  )
}

export function SlideShipCut() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>03 — Ship vs Cut</div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 4 }}>
        Ruthless Prioritization
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: G * 4, flex: 1 }}>
        <div>
          <div style={{ fontSize: 10, color: C.green, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2, paddingBottom: G, borderBottom: `2px solid ${C.green}` }}>Ship Now</div>
          <Item label="Core annotation loop" status="ship" />
          <Item label="canvai new" status="ship" />
          <Item label="canvai design" status="ship" />
          <Item label="Share button (in UI)" status="ship" />
          <Item label="Vue-style docs" status="ship" />
          <Item label="README + demo GIF" status="ship" />
        </div>
        <div>
          <div style={{ fontSize: 10, color: C.red, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2, paddingBottom: G, borderBottom: `2px solid ${C.red}` }}>Cut / Defer</div>
          <Item label="GitHub comments" status="cut" />
          <Item label="/close command" status="cut" />
          <Item label="/update command" status="cut" />
          <Item label="/share command" status="cut" />
          <Item label="50+ LP variations" status="cut" />
          <Item label="Complex iteration UX" status="cut" />
        </div>
      </div>

      <div style={{ padding: G * 2, backgroundColor: C.surface, border: `1px solid ${C.border}`, marginTop: G * 3 }}>
        <div style={{ fontSize: 12, color: C.textSec }}>
          <strong style={{ color: C.text }}>Commands:</strong> 5 → 2 (new, design). Close = Ctrl+C. Update = npm. Share = button.
        </div>
      </div>
    </div>
  )
}
