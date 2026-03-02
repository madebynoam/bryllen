/**
 * Light Style — Jobs to Be Done
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

export function LightJtbd() {
  const jobs = [
    { name: 'Explore', desc: 'See multiple directions at once', icon: '◐' },
    { name: 'Iterate', desc: 'Describe changes in words', icon: '↻' },
    { name: 'Decide', desc: 'Grab the file you want', icon: '◉' },
    { name: 'Share', desc: 'Get feedback instantly', icon: '→' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 48, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
        Jobs to Be Done
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.3, marginBottom: 40 }}>
        What Canvai is hired for.
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, flex: 1 }}>
        {jobs.map((job, i) => (
          <div key={i} style={{ backgroundColor: C.card, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, color: C.accent, marginBottom: 12 }}>{job.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 8 }}>{job.name}</div>
            <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.5 }}>{job.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 14, color: C.textSec, marginTop: 24 }}>
        The code was never a mockup. Explore → Decide → Ship.
      </div>
    </div>
  )
}
