import { S, T, FONT, N, A, R } from '../tokens'
import { TokenSwatch, SpacingToken, RadiusToken, FontSizeToken } from '../../../runtime'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: S.xxl }}>
      <div style={{
        fontSize: T.label, fontWeight: 600, color: N.txtFaint,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: S.sm, fontFamily: FONT,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export function Tokens() {
  return (
    <div style={{ padding: S.xxl, fontFamily: FONT }}>
      <div style={{ fontSize: T.title, fontWeight: 600, color: N.txtPri, marginBottom: S.xl }}>
        Design Tokens
      </div>

      <Section title="Neutrals">
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.sm }}>
          <TokenSwatch color={N.chrome} label="chrome" sublabel="L=0.985" oklch={{ l: 0.985, c: 0, h: 90 }} tokenPath="--chrome" />
          <TokenSwatch color={N.chromeSub} label="chromeSub" sublabel="L=0.955" oklch={{ l: 0.955, c: 0.003, h: 80 }} tokenPath="--chrome-sub" />
          <TokenSwatch color={N.canvas} label="canvas" sublabel="L=0.972" oklch={{ l: 0.972, c: 0.001, h: 197 }} tokenPath="--canvas" />
          <TokenSwatch color={N.card} label="card" sublabel="L=0.993" oklch={{ l: 0.993, c: 0.003, h: 80 }} tokenPath="--card" />
          <TokenSwatch color={N.border} label="border" sublabel="L=0.895" oklch={{ l: 0.895, c: 0.005, h: 80 }} tokenPath="--border" />
          <TokenSwatch color={N.txtPri} label="txtPri" sublabel="L=0.180" oklch={{ l: 0.18, c: 0.005, h: 80 }} tokenPath="--txt-pri" />
          <TokenSwatch color={N.txtSec} label="txtSec" sublabel="L=0.380" oklch={{ l: 0.38, c: 0.005, h: 80 }} tokenPath="--txt-sec" />
          <TokenSwatch color={N.txtTer} label="txtTer" sublabel="L=0.540" oklch={{ l: 0.54, c: 0.005, h: 80 }} tokenPath="--txt-ter" />
        </div>
      </Section>

      <Section title="Accent">
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.sm }}>
          <TokenSwatch color={A.accent} label="accent" sublabel="L=0.300" oklch={{ l: 0.3, c: 0.005, h: 80 }} tokenPath="--accent" />
          <TokenSwatch color={A.hover} label="hover" sublabel="L=0.400" oklch={{ l: 0.4, c: 0.005, h: 80 }} tokenPath="--accent-hover" />
          <TokenSwatch color={A.muted} label="muted" sublabel="L=0.920" oklch={{ l: 0.92, c: 0.003, h: 80 }} tokenPath="--accent-muted" />
        </div>
      </Section>

      <Section title="Spacing — 4px grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.sm }}>
          <SpacingToken value={S.xs} label="S.xs" sublabel="4px" tokenPath="--spacing-xs" />
          <SpacingToken value={S.sm} label="S.sm" sublabel="8px" tokenPath="--spacing-sm" />
          <SpacingToken value={S.md} label="S.md" sublabel="12px" tokenPath="--spacing-md" />
          <SpacingToken value={S.lg} label="S.lg" sublabel="16px" tokenPath="--spacing-lg" />
          <SpacingToken value={S.xl} label="S.xl" sublabel="20px" tokenPath="--spacing-xl" />
          <SpacingToken value={S.xxl} label="S.xxl" sublabel="24px" tokenPath="--spacing-xxl" />
        </div>
      </Section>

      <Section title="Radii">
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.sm }}>
          <RadiusToken value={R.control} label="R.control" sublabel="4px" tokenPath="--radius-control" />
          <RadiusToken value={R.card} label="R.card" sublabel="8px" tokenPath="--radius-card" />
          <RadiusToken value={R.panel} label="R.panel" sublabel="12px" tokenPath="--radius-panel" />
          <RadiusToken value={R.pill} label="R.pill" sublabel="20px" tokenPath="--radius-pill" />
        </div>
      </Section>

      <Section title="Typography">
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.sm }}>
          <FontSizeToken value={T.label} label="T.label" sublabel="9px" tokenPath="--font-label" />
          <FontSizeToken value={T.body} label="T.body" sublabel="12px" tokenPath="--font-body" />
          <FontSizeToken value={T.title} label="T.title" sublabel="13px" tokenPath="--font-title" />
        </div>
      </Section>
    </div>
  )
}
