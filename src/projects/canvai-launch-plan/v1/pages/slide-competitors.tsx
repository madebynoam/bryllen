/**
 * Slide 2: The Landscape
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

function ProductRow({ name, what, approach }: { name: string; what: string; approach: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: G * 2, padding: `${G * 2}px 0`, borderBottom: `1px solid ${C.border}`, fontSize: 13, alignItems: 'baseline' }}>
      <span style={{ fontWeight: 600, color: C.text }}>{name}</span>
      <span style={{ color: C.textSec }}>{what}</span>
      <span style={{ color: C.textMuted }}>{approach}</span>
    </div>
  )
}

export function SlideCompetitors() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>02 — The Landscape</div>

      <h1 style={{ fontSize: 32, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 4 }}>
        What Exists Today
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: G * 2, fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: G, borderBottom: `1px solid ${C.borderStrong}` }}>
        <span>Product</span>
        <span>What It Does</span>
        <span>Approach</span>
      </div>

      <ProductRow name="Cursor" what="AI code editor, Composer model" approach="IDE-first, one generation" />
      <ProductRow name="v0" what="Chat to UI, Vercel deploy" approach="Conversation, frontend" />
      <ProductRow name="Lovable" what="Full-stack app builder" approach="Chat-based, end-to-end" />
      <ProductRow name="Figma AI" what="Design tool with AI features" approach="Mockups, collaboration" />

      <div style={{ flex: 1 }} />

      <div style={{ padding: G * 3, border: `1px solid ${C.borderStrong}`, backgroundColor: C.surface }}>
        <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G }}>What We're Building</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.text }}>
          Infinite canvas. Multiple directions. Real components.
        </div>
        <div style={{ fontSize: 13, color: C.textSec, marginTop: G }}>
          See 5 designs side-by-side. Click to annotate. Ship real React.
        </div>
      </div>
    </div>
  )
}
