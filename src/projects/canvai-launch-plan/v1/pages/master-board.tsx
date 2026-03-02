/**
 * Master Board — Everything at a Glance
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMuted, marginBottom: G * 2, paddingBottom: G, borderBottom: `1px solid ${C.border}` }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: `${G}px 0`, borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
      <span style={{ color: C.textSec }}>{label}</span>
      <span style={{ color: color || C.text, fontWeight: color ? 600 : 400 }}>{value}</span>
    </div>
  )
}

export function MasterBoard() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 4, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: G * 3, paddingBottom: G * 2, borderBottom: `2px solid ${C.borderStrong}` }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>Canvai</div>
          <div style={{ fontSize: 12, color: C.textSec, marginTop: 4 }}>Ship in 7 days</div>
        </div>
        <div style={{ fontSize: 11, color: C.textMuted }}>March 2026</div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: G * 3, flex: 1 }}>
        <Section title="Vision">
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: G }}>
            See every direction at once
          </div>
          <div style={{ fontSize: 11, color: C.textSec, lineHeight: 1.5 }}>
            Infinite canvas for Claude Code. Generate 5+ real React components. Compare side-by-side. Ship what works.
          </div>
        </Section>

        <Section title="Ship">
          <Row label="Core loop" value="✓" color={C.green} />
          <Row label="canvai new" value="✓" color={C.green} />
          <Row label="canvai design" value="✓" color={C.green} />
          <Row label="Share button" value="✓" color={C.green} />
          <Row label="Docs" value="✓" color={C.green} />
        </Section>

        <Section title="Cut">
          <Row label="GitHub comments" value="✕" color={C.red} />
          <Row label="/close" value="✕" color={C.red} />
          <Row label="/update" value="✕" color={C.red} />
          <Row label="/share" value="✕" color={C.red} />
          <Row label="50+ LPs" value="✕" color={C.red} />
        </Section>

        <Section title="Timeline">
          <Row label="D1-2" value="Core loop" />
          <Row label="D3" value="Simplify" />
          <Row label="D4" value="LP select" />
          <Row label="D5" value="Homepage" />
          <Row label="D6" value="Docs" />
          <Row label="D7" value="Ship 🚀" />
        </Section>
      </div>

      {/* Footer */}
      <div style={{ marginTop: G * 2, padding: G * 2, border: `1px solid ${C.borderStrong}`, fontSize: 12, color: C.text }}>
        <strong>Goal:</strong> npx canvai new → shareable URL in under 5 minutes
      </div>
    </div>
  )
}
