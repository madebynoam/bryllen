/**
 * Slide 7: Polish Checklist
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
  yellow: '#F9A825',
}

const G = 8

function Category({ title, items }: { title: string; items: { task: string; priority: 'must' | 'should' | 'nice' }[] }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: G, paddingBottom: G, borderBottom: `1px solid ${C.border}` }}>{title}</div>
      {items.map((item, i) => {
        const color = item.priority === 'must' ? C.green : item.priority === 'should' ? C.yellow : C.textMuted
        return (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: `${G}px 0`, fontSize: 12 }}>
            <span style={{ color: C.textSec }}>□ {item.task}</span>
            <span style={{ fontSize: 9, fontWeight: 600, color, textTransform: 'uppercase' }}>{item.priority}</span>
          </div>
        )
      })}
    </div>
  )
}

export function SlidePolish() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>07 — Polish</div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 2 }}>
        What Makes It "Wow"
      </h1>

      <div style={{ display: 'flex', gap: G * 2, marginBottom: G * 4, fontSize: 11 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: G }}><span style={{ width: 8, height: 8, backgroundColor: C.green, borderRadius: 2 }} /><span style={{ color: C.textMuted }}>Must — Ship blocker</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: G }}><span style={{ width: 8, height: 8, backgroundColor: C.yellow, borderRadius: 2 }} /><span style={{ color: C.textMuted }}>Should — Important</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: G }}><span style={{ width: 8, height: 8, backgroundColor: C.textMuted, borderRadius: 2 }} /><span style={{ color: C.textMuted }}>Nice — If time</span></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: G * 4, flex: 1 }}>
        <Category
          title="First 30 Seconds"
          items={[
            { task: 'Instant scaffold (<5s)', priority: 'must' },
            { task: 'Sample shows multiple directions', priority: 'must' },
            { task: 'Zero questions/config', priority: 'must' },
            { task: 'Welcome hint on empty', priority: 'should' },
          ]}
        />
        <Category
          title="Core Interaction"
          items={[
            { task: 'Click → marker instantly', priority: 'must' },
            { task: 'Clear loading state', priority: 'must' },
            { task: 'Error has retry button', priority: 'should' },
            { task: 'Spring physics animation', priority: 'nice' },
          ]}
        />
        <Category
          title="Share Flow"
          items={[
            { task: 'Button in topbar', priority: 'must' },
            { task: 'URL copied immediately', priority: 'must' },
            { task: 'Shared page = no dev UI', priority: 'should' },
            { task: 'og:image preview', priority: 'nice' },
          ]}
        />
        <Category
          title="Visual"
          items={[
            { task: 'All colors from OKLCH', priority: 'must' },
            { task: 'Pan/zoom 60fps', priority: 'must' },
            { task: 'Consistent radii (6px)', priority: 'should' },
            { task: 'Squircle corners', priority: 'nice' },
          ]}
        />
      </div>

      <div style={{ padding: G * 2, border: `2px solid ${C.borderStrong}`, marginTop: G * 3, fontSize: 13, color: C.text }}>
        <strong>Apple Designer:</strong> "Every interaction must feel inevitable."
      </div>
    </div>
  )
}
