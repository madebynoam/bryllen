/**
 * Light Style — Vision
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

export function LightSummary() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 48, display: 'flex', gap: 32 }}>
      {/* Left: Image */}
      <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
          alt="Creative workspace"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Right: Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
          Vision
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.3, marginBottom: 24 }}>
          See every direction — at once.
        </h1>

        <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, marginBottom: 32 }}>
          An infinite canvas for design exploration. Generate real React components. Compare directions side-by-side. Ship what works.
        </p>

        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { value: '∞', label: 'Canvas' },
            { value: 'N', label: 'Directions' },
            { value: '1', label: 'Click' },
          ].map((m, i) => (
            <div key={i}>
              <div style={{ fontSize: 28, fontWeight: 300, color: C.accent }}>{m.value}</div>
              <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
