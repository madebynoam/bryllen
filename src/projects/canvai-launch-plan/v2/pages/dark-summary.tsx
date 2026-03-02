/**
 * Dark Style — Vision
 * Dramatic, cinematic, bold
 */

const C = {
  bg: '#0D0D0D',
  text: '#FAFAFA',
  textSec: '#A1A1A1',
  textMuted: '#6B6B6B',
  accent: '#C4956A',
}

export function DarkSummary() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80"
        alt="Desert dunes"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: 64, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
          Vision
        </div>

        <h1 style={{ fontSize: 48, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.2, maxWidth: 500 }}>
          See every direction — at once.
        </h1>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', gap: 48 }}>
          {[
            { value: '∞', label: 'Infinite canvas' },
            { value: 'N', label: 'Directions' },
            { value: '0', label: 'Mockups needed' },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 32, fontWeight: 300, color: C.text }}>{m.value}</div>
              <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
