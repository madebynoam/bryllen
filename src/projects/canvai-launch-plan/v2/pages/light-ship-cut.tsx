/**
 * Light Style — Ship vs Cut
 * Warm, organic, hopeful
 */

const C = {
  bg: '#F5F3EF',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSec: '#5C5C5C',
  textMuted: '#8C8C8C',
  accent: '#7C8C6A',
  red: '#B85C5C',
}

export function LightShipCut() {
  const ship = ['Core annotation loop', 'canvai new', 'canvai design', 'Share button', 'Vue-style docs']
  const cut = ['GitHub comments', '/close', '/update', '/share', '50+ variations']

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 48, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
        Ship vs Cut
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.3, marginBottom: 32 }}>
        Ruthless prioritization.
      </h1>

      <div style={{ display: 'flex', gap: 24, flex: 1 }}>
        <div style={{ flex: 1, backgroundColor: C.card, borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 12, color: C.accent, fontWeight: 500, marginBottom: 20 }}>Ship Now</div>
          {ship.map((item, i) => (
            <div key={i} style={{ fontSize: 14, color: C.text, padding: '10px 0', borderBottom: `1px solid ${C.bg}` }}>
              {item}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, backgroundColor: C.card, borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 12, color: C.red, fontWeight: 500, marginBottom: 20 }}>Cut / Defer</div>
          {cut.map((item, i) => (
            <div key={i} style={{ fontSize: 14, color: C.textMuted, padding: '10px 0', borderBottom: `1px solid ${C.bg}`, textDecoration: 'line-through' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 13, color: C.textSec, marginTop: 24 }}>
        Commands: 5 → 2. Less is more.
      </div>
    </div>
  )
}
