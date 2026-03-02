/**
 * Slide 4: 7-Day Timeline
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
}

const G = 8

function Day({ num, title, tasks, owner }: { num: number; title: string; tasks: string[]; owner: string }) {
  const isShip = num === 7
  return (
    <div style={{ padding: G * 2, border: isShip ? `2px solid ${C.accent}` : `1px solid ${C.border}`, backgroundColor: C.surface }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: G }}>
        <span style={{ fontSize: 24, fontWeight: 700, color: isShip ? C.accent : C.text }}>D{num}</span>
        <span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase' }}>{owner}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: G }}>{title}</div>
      {tasks.map((t, i) => (
        <div key={i} style={{ fontSize: 12, color: C.textSec, padding: `${G / 2}px 0` }}>□ {t}</div>
      ))}
    </div>
  )
}

export function SlideTimeline() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>04 — Timeline</div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 4 }}>
        7 Days to Ship
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: G * 2, marginBottom: G * 2 }}>
        <Day num={1} title="Core Loop" tasks={['Fix annotation flows', 'Test watch mode', 'Fresh machine test']} owner="Eng" />
        <Day num={2} title="Polish" tasks={['Error states', 'Loading indicators', 'Performance pass']} owner="Eng" />
        <Day num={3} title="Simplify" tasks={['Share button in UI', 'Remove 3 commands', 'Hide GH comments']} owner="Eng" />
        <Day num={4} title="LP Select" tasks={['Pick 3 best LPs', 'Polish winner', 'Archive the rest']} owner="Des" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: G * 2 }}>
        <Day num={5} title="Homepage" tasks={['Ship to canvai.dev', 'Demo GIF', 'SEO + meta']} owner="Des" />
        <Day num={6} title="Docs" tasks={['README overhaul', '60s quick start', 'How it works']} owner="PM" />
        <Day num={7} title="SHIP 🚀" tasks={['Final QA', 'Soft launch', 'Collect feedback']} owner="All" />
      </div>

      <div style={{ marginTop: 'auto', paddingTop: G * 3, fontSize: 12, color: C.textMuted }}>
        One clear outcome per day. No scope creep.
      </div>
    </div>
  )
}
