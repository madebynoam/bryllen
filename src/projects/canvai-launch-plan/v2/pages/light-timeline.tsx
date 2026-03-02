/**
 * Light Style — Timeline
 * Warm, organic, hopeful
 */

const C = {
  bg: '#F5F3EF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSec: '#5C5C5C',
  textMuted: '#8C8C8C',
  accent: '#7C8C6A',
}

export function LightTimeline() {
  const days = [
    { num: 1, title: 'Core Loop', desc: 'Fix annotation flows' },
    { num: 2, title: 'Polish', desc: 'Error states, loading' },
    { num: 3, title: 'Simplify', desc: 'Share button, cut commands' },
    { num: 4, title: 'LP Select', desc: 'Pick best designs' },
    { num: 5, title: 'Homepage', desc: 'canvai.dev + demo' },
    { num: 6, title: 'Docs', desc: '60s quickstart' },
    { num: 7, title: 'Ship', desc: 'Soft launch' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 48, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
            Timeline
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.3 }}>
            7 days to ship.
          </h1>
        </div>
        <div style={{ width: 200, height: 120, borderRadius: 8, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
            alt="Sunrise over mountains"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {days.map((day, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', backgroundColor: day.num === 7 ? C.accent : C.card, borderRadius: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: day.num === 7 ? '#fff' : C.textMuted, width: 32 }}>D{day.num}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: day.num === 7 ? '#fff' : C.text, width: 100 }}>{day.title}</div>
            <div style={{ fontSize: 13, color: day.num === 7 ? 'rgba(255,255,255,0.8)' : C.textSec }}>{day.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
