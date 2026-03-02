/**
 * Dark Style — Jobs to Be Done
 * Dramatic, cinematic, bold
 */

const C = {
  bg: '#0D0D0D',
  text: '#FAFAFA',
  textSec: '#A1A1A1',
  textMuted: '#6B6B6B',
  accent: '#C4956A',
}

export function DarkJtbd() {
  const jobs = [
    { name: 'Explore', desc: 'See multiple directions at once' },
    { name: 'Iterate', desc: 'Describe changes in words' },
    { name: 'Decide', desc: 'Grab the file you want' },
    { name: 'Share', desc: 'Get feedback instantly' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', display: 'flex' }}>
      {/* Left: Image */}
      <div style={{ width: '40%', position: 'relative' }}>
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80"
          alt="Mountains at dawn"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Right: Content */}
      <div style={{ flex: 1, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
          Jobs to Be Done
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.3, marginBottom: 40 }}>
          What Canvai is hired for.
        </h1>

        {jobs.map((job, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '16px 0', borderBottom: i < 3 ? `1px solid ${C.textMuted}30` : 'none' }}>
            <div style={{ fontSize: 14, color: C.accent, width: 80 }}>{job.name}</div>
            <div style={{ fontSize: 16, color: C.text }}>{job.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
