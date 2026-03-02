/**
 * Slide: Jobs to Be Done
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

function Job({ number, when, want, so, interaction }: {
  number: string
  when: string
  want: string
  so: string
  interaction: string
}) {
  return (
    <div style={{ padding: G * 2, border: `1px solid ${C.border}`, backgroundColor: C.surface }}>
      <div style={{ fontSize: 10, color: C.accent, fontWeight: 600, marginBottom: G }}>JOB {number}</div>
      <div style={{ fontSize: 12, color: C.textSec, lineHeight: 1.6, marginBottom: G * 2 }}>
        <span style={{ color: C.textMuted }}>When</span> {when},<br />
        <span style={{ color: C.textMuted }}>I want to</span> {want},<br />
        <span style={{ color: C.textMuted }}>so I can</span> {so}.
      </div>
      <div style={{ fontSize: 11, color: C.text, fontWeight: 600, padding: `${G}px`, backgroundColor: C.bg, borderLeft: `2px solid ${C.accent}` }}>
        {interaction}
      </div>
    </div>
  )
}

function JourneyRow({ stage, job, interaction }: { stage: string; job: string; interaction: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: G * 2, padding: `${G * 1.5}px 0`, borderBottom: `1px solid ${C.border}`, fontSize: 12, alignItems: 'baseline' }}>
      <span style={{ fontWeight: 600, color: C.accent }}>{stage}</span>
      <span style={{ color: C.textSec }}>{job}</span>
      <span style={{ color: C.text, fontFamily: 'monospace', fontSize: 11 }}>{interaction}</span>
    </div>
  )
}

export function SlideJtbd() {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif', padding: G * 6, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G * 2 }}>Jobs to Be Done</div>

      <h1 style={{ fontSize: 28, fontWeight: 700, color: C.text, margin: 0, marginBottom: G * 3 }}>
        What Canvai Is Hired For
      </h1>

      {/* The 4 Jobs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: G * 2, marginBottom: G * 4 }}>
        <Job
          number="1"
          when="I'm starting a design"
          want="see multiple options at once"
          so="I can find the right direction"
          interaction="Canvas shows directions"
        />
        <Job
          number="2"
          when="I see something to change"
          want="describe it in words"
          so="I don't have to switch tools"
          interaction="Click → Type → Applied"
        />
        <Job
          number="3"
          when="I've found the right design"
          want="grab it and use it"
          so="I can ship"
          interaction="Cmd+Shift+Click → Finder"
        />
        <Job
          number="4"
          when="I need approval"
          want="share a link"
          so="stakeholders can see it"
          interaction="Share → Link"
        />
      </div>

      {/* Journey Table */}
      <div style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: G, paddingBottom: G, borderBottom: `1px solid ${C.borderStrong}` }}>
        The Journey
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: G * 2, fontSize: 10, color: C.textMuted, paddingBottom: G }}>
        <span>Stage</span>
        <span>Job</span>
        <span>Interaction</span>
      </div>

      <JourneyRow stage="Start" job="I need a landing page" interaction="canvai new" />
      <JourneyRow stage="Explore" job="Show me options" interaction="Canvas → directions" />
      <JourneyRow stage="Iterate" job="Make this bigger" interaction="Click → annotate" />
      <JourneyRow stage="Decide" job="This one" interaction="Cmd+Shift+Click" />
      <JourneyRow stage="Feedback" job="What do you think?" interaction="Share → link" />
      <JourneyRow stage="Ship" job="Let's use it" interaction="File is there" />

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: G * 2, border: `1px solid ${C.borderStrong}`, fontSize: 12, color: C.text }}>
        <strong>The code was never a mockup.</strong> Explore → Decide → Ship. No handoff.
      </div>
    </div>
  )
}
