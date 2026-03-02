/**
 * Slide 6: Docs Strategy
 * Dieter Rams — grid, minimal, functional
 */

const C = {
  bg: '#FAFAFA',
  surface: '#FFFFFF',
  border: '#E5E5E5',
  borderStrong: '#1A1A1A',
  accent: '#42B883', // Vue green
  text: '#1A1A1A',
  textSec: '#666666',
  textMuted: '#999999',
}

const G = 8

function Step({ num, title, time, code }: { num: number; title: string; time: string; code: string }) {
  return (
    <div style={{ padding: G * 2, border: `1px solid ${C.border}`, backgroundColor: C.surface }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: G }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.accent }}>{num}. {title}</span>
        <span style={{ fontSize: 10, color: C.textMuted }}>{time}</span>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 12, color: C.text, backgroundColor: '#1E1E1E', padding: G, borderRadius: 4 }}>
        <span style={{ color: '#D4D4D4' }}>{code}</span>
      </div>
    </div>
  )
}

export function SlideDocs() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>06 — Docs Strategy</div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 2 }}>
        Learn from Vue.js
      </h1>

      <p style={{ fontSize: 14, color: C.textSec, marginBottom: G * 4, maxWidth: 400 }}>
        Vue won because of docs. Approachable, beautiful, progressively disclosed.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: G * 2, marginBottom: G * 4 }}>
        <div style={{ padding: G * 2, border: `1px solid ${C.accent}`, backgroundColor: `${C.accent}10` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: G / 2 }}>Approachability</div>
          <div style={{ fontSize: 12, color: C.textSec }}>No jargon. Enable more people to build.</div>
        </div>
        <div style={{ padding: G * 2, border: `1px solid ${C.accent}`, backgroundColor: `${C.accent}10` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: G / 2 }}>Progressive</div>
          <div style={{ fontSize: 12, color: C.textSec }}>Minimal core. Add complexity gradually.</div>
        </div>
        <div style={{ padding: G * 2, border: `1px solid ${C.accent}`, backgroundColor: `${C.accent}10` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: G / 2 }}>Sensible Defaults</div>
          <div style={{ fontSize: 12, color: C.textSec }}>Works out of the box. Config optional.</div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2, paddingBottom: G, borderBottom: `1px solid ${C.borderStrong}` }}>
        Quick Start — 60 Seconds to First Design
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: G * 2 }}>
        <Step num={1} title="Install" time="5s" code="npx canvai new my-app" />
        <Step num={2} title="Design" time="10s" code="npx canvai design" />
        <Step num={3} title="Annotate" time="30s" code="// Click → Describe → Apply" />
        <Step num={4} title="Share" time="5s" code="// Click Share button → Get URL" />
      </div>

      <div style={{ marginTop: 'auto', paddingTop: G * 3, fontSize: 12, color: C.textMuted }}>
        If they can't start in 60 seconds, we've failed.
      </div>
    </div>
  )
}
