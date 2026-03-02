/**
 * Dark Style — Polish
 * Dramatic, cinematic, bold
 */

const C = {
  bg: '#0D0D0D',
  text: '#FAFAFA',
  textSec: '#A1A1A1',
  textMuted: '#6B6B6B',
  accent: '#C4956A',
  green: '#7FB07F',
  yellow: '#D4B85C',
}

export function DarkPolish() {
  const categories = [
    { title: 'First Impression', items: ['Instant scaffold', 'Multiple directions', 'Zero config'] },
    { title: 'Core Loop', items: ['Click → marker', 'Loading state', 'Error recovery'] },
    { title: 'Share', items: ['Button in topbar', 'URL copied', 'Clean shared view'] },
    { title: 'Visual', items: ['OKLCH colors', '60fps pan/zoom', 'Consistent radii'] },
  ]

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 64, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
        Polish
      </div>

      <h1 style={{ fontSize: 48, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.2, marginBottom: 48 }}>
        What makes it "wow".
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, flex: 1 }}>
        {categories.map((cat, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>{cat.title}</div>
            {cat.items.map((item, j) => (
              <div key={j} style={{ fontSize: 14, color: C.text, padding: '8px 0' }}>{item}</div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 14, color: C.textSec, marginTop: 32, borderTop: `1px solid ${C.textMuted}30`, paddingTop: 24 }}>
        "Every interaction must feel inevitable."
      </div>
    </div>
  )
}
