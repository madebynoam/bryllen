/**
 * Slide 5: The Name
 * Dieter Rams — grid, minimal, functional
 */

const C = {
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E5E5E5',
  borderStrong: '#1A1A1A',
  accent: '#E54D2E',
  text: '#1A1A1A',
  textSec: '#666666',
  textMuted: '#999999',
  green: '#2E7D32',
}

const G = 8

function NameRow({ name, meaning, domain, available }: { name: string; meaning: string; domain: string; available: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', gap: G * 2, padding: `${G * 2}px 0`, borderBottom: `1px solid ${C.border}`, fontSize: 13, alignItems: 'baseline' }}>
      <span style={{ fontWeight: available ? 700 : 400, color: available ? C.accent : C.text }}>{name}</span>
      <span style={{ color: C.textSec }}>{meaning}</span>
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: available ? C.green : C.textMuted }}>{domain}</span>
    </div>
  )
}

export function SlideNaming() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>05 — Identity</div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 4 }}>
        The Name
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', gap: G * 2, fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: G, borderBottom: `1px solid ${C.borderStrong}` }}>
        <span>Name</span>
        <span>Meaning</span>
        <span>Domain</span>
      </div>

      <NameRow name="Pano" meaning="Panoramic — see everything at once" domain="pano.dev ✓" available={true} />
      <NameRow name="Verse" meaning="Every direction is a verse" domain="verse.dev" available={false} />
      <NameRow name="Muse" meaning="Creative inspiration" domain="muse.ai" available={false} />
      <NameRow name="Drift" meaning="Explore directions" domain="drift.com" available={false} />

      <div style={{ flex: 1 }} />

      <div style={{ padding: G * 3, border: `2px solid ${C.green}`, backgroundColor: C.surface }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 10, color: C.green, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G / 2 }}>Recommendation</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.text }}>Pano</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12, color: C.textSec }}>
            Short. Clear. Available.<br />
            "See the whole picture."
          </div>
        </div>
      </div>
    </div>
  )
}
