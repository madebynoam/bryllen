/**
 * Dark Style — Ship vs Cut
 * Dramatic, cinematic, bold
 */

const C = {
  bg: '#0D0D0D',
  text: '#FAFAFA',
  textSec: '#A1A1A1',
  textMuted: '#6B6B6B',
  accent: '#C4956A',
  green: '#7FB07F',
  red: '#C47F7F',
}

export function DarkShipCut() {
  const ship = ['Core loop', 'canvai new', 'canvai design', 'Share button', 'Docs']
  const cut = ['GH comments', '/close', '/update', '/share', '50+ LPs']

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: 'Inter, -apple-system, sans-serif', padding: 64, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
        Ship vs Cut
      </div>

      <h1 style={{ fontSize: 48, fontWeight: 300, color: C.text, margin: 0, lineHeight: 1.2, marginBottom: 48 }}>
        Ruthless prioritization.
      </h1>

      <div style={{ display: 'flex', gap: 80, flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.green, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Ship</div>
          {ship.map((item, i) => (
            <div key={i} style={{ fontSize: 16, color: C.text, padding: '12px 0', borderBottom: `1px solid ${C.textMuted}20` }}>
              {item}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.red, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Cut</div>
          {cut.map((item, i) => (
            <div key={i} style={{ fontSize: 16, color: C.textMuted, padding: '12px 0', borderBottom: `1px solid ${C.textMuted}20`, textDecoration: 'line-through' }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
