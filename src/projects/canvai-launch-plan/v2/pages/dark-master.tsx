/**
 * Dark Style — Master Board
 * Dramatic, cinematic, bold
 */

const C = {
  bg: '#0D0D0D',
  text: '#FAFAFA',
  textSec: '#A1A1A1',
  textMuted: '#6B6B6B',
  accent: '#C4956A',
}

export function DarkMaster() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
        alt="Mountain peak"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: 64, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>Overview</div>
          <h1 style={{ fontSize: 48, fontWeight: 300, color: C.text, margin: 0 }}>Canvai</h1>
          <div style={{ fontSize: 16, color: C.textSec, marginTop: 12 }}>See every direction at once</div>
        </div>

        {/* Grid */}
        <div style={{ display: 'flex', gap: 64, flex: 1 }}>
          <div>
            <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Jobs</div>
            {['Explore', 'Iterate', 'Decide', 'Share'].map((j, i) => (
              <div key={i} style={{ fontSize: 15, color: C.text, padding: '8px 0' }}>{j}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Ship</div>
            {['Core loop', 'canvai new', 'canvai design', 'Share button'].map((s, i) => (
              <div key={i} style={{ fontSize: 15, color: C.text, padding: '8px 0' }}>{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Timeline</div>
            {['D1-2 Core', 'D3 Simplify', 'D4-5 Site', 'D6 Docs', 'D7 Ship'].map((d, i) => (
              <div key={i} style={{ fontSize: 15, color: C.textSec, padding: '8px 0' }}>{d}</div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${C.textMuted}30`, paddingTop: 24 }}>
          <div style={{ fontSize: 14, color: C.text }}>
            Goal: npx canvai new → shareable URL in under 5 minutes
          </div>
        </div>
      </div>
    </div>
  )
}
