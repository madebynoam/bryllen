/**
 * Light Style — Polish
 * Warm, organic, hopeful
 */

const C = {
  bg: '#F5F3EF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSec: '#5C5C5C',
  textMuted: '#8C8C8C',
  accent: '#7C8C6A',
  yellow: '#B8A44C',
}

export function LightPolish() {
  const items = [
    { task: 'Instant scaffold (<5s)', priority: 'must' },
    { task: 'Multiple directions shown', priority: 'must' },
    { task: 'Click → marker instantly', priority: 'must' },
    { task: 'Share button in topbar', priority: 'must' },
    { task: 'URL copied immediately', priority: 'must' },
    { task: 'Pan/zoom 60fps', priority: 'must' },
    { task: 'Error has retry', priority: 'should' },
    { task: 'Consistent radii', priority: 'should' },
  ]

  const priorityColor = (p: string) => p === 'must' ? C.accent : C.yellow

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 48, display: 'flex', gap: 32 }}>
      {/* Left */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
          Polish
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.3, marginBottom: 24 }}>
          What makes it "wow".
        </h1>

        <div style={{ display: 'flex', gap: 16, marginBottom: 24, fontSize: 11 }}>
          <span style={{ color: C.accent }}>● Must</span>
          <span style={{ color: C.yellow }}>● Should</span>
        </div>

        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20, flex: 1 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < items.length - 1 ? `1px solid ${C.bg}` : 'none' }}>
              <span style={{ fontSize: 13, color: C.text }}>{item.task}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: priorityColor(item.priority) }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Image */}
      <div style={{ width: 280, borderRadius: 12, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80"
          alt="Team collaboration"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
