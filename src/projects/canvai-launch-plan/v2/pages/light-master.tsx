/**
 * Light Style — Master Board
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

export function LightMaster() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 48, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 300, color: C.text, margin: 0 }}>Canvai</h1>
          <div style={{ fontSize: 13, color: C.textSec, marginTop: 8 }}>See every direction at once</div>
        </div>
        <div style={{ width: 120, height: 80, borderRadius: 8, overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&q=80"
            alt="Team working"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, flex: 1 }}>
        {/* Jobs */}
        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Jobs</div>
          {['Explore', 'Iterate', 'Decide', 'Share'].map((j, i) => (
            <div key={i} style={{ fontSize: 13, color: C.text, padding: '6px 0' }}>{j}</div>
          ))}
        </div>

        {/* Ship */}
        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Ship</div>
          {['Core loop', 'new', 'design', 'Share btn', 'Docs'].map((s, i) => (
            <div key={i} style={{ fontSize: 13, color: C.text, padding: '6px 0' }}>{s}</div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ backgroundColor: C.card, borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>7 Days</div>
          {['D1-2 Core', 'D3 Simplify', 'D4 LP', 'D5-6 Site', 'D7 Ship'].map((d, i) => (
            <div key={i} style={{ fontSize: 13, color: C.textSec, padding: '6px 0' }}>{d}</div>
          ))}
        </div>

        {/* Goal */}
        <div style={{ backgroundColor: C.accent, borderRadius: 12, padding: 20, color: '#fff' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, opacity: 0.8 }}>Goal</div>
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>
            npx canvai new → shareable URL in under 5 minutes
          </div>
        </div>
      </div>
    </div>
  )
}
