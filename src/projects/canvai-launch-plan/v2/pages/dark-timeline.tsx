/**
 * Dark Style — Timeline
 * Dramatic, cinematic, bold
 */

const C = {
  bg: '#0D0D0D',
  text: '#FAFAFA',
  textSec: '#A1A1A1',
  textMuted: '#6B6B6B',
  accent: '#C4956A',
}

export function DarkTimeline() {
  const days = [
    { num: 1, title: 'Core Loop' },
    { num: 2, title: 'Polish' },
    { num: 3, title: 'Simplify' },
    { num: 4, title: 'LP Select' },
    { num: 5, title: 'Homepage' },
    { num: 6, title: 'Docs' },
    { num: 7, title: 'Ship' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200&q=80"
        alt="Desert road"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: 64, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
          Timeline
        </div>

        <h1 style={{ fontSize: 48, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.2, marginBottom: 48 }}>
          7 days to ship.
        </h1>

        <div style={{ display: 'flex', gap: 24, flex: 1, alignItems: 'flex-end' }}>
          {days.map((day, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                height: day.num === 7 ? 180 : 60 + (i * 15),
                width: 3,
                backgroundColor: day.num === 7 ? C.accent : C.textMuted,
                marginBottom: 12
              }} />
              <div style={{ fontSize: 12, color: day.num === 7 ? C.accent : C.textMuted, fontFamily: 'monospace' }}>D{day.num}</div>
              <div style={{ fontSize: 12, color: day.num === 7 ? C.text : C.textSec, marginTop: 4 }}>{day.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
