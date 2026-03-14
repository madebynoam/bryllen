import { S, T, FONT, N } from '../tokens'
import { Button, Card, Badge, Input } from '../components'

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

export function Components() {
  return (
    <div style={{ padding: S.xxl, fontFamily: FONT }}>
      <div style={{ fontSize: T.title, fontWeight: 600, color: N.txtPri, marginBottom: S.xl }}>
        Components
      </div>

      <Section title="Button — Primary">
        <div style={{ display: 'flex', gap: S.sm }}>
          <Button label="Create" variant="primary" />
          <Button label="Cancel" variant="ghost" />
        </div>
      </Section>

      <Section title="Card">
        <Card title="Design tokens" />
      </Section>

      <Section title="Badge">
        <div style={{ display: 'flex', gap: S.sm, alignItems: 'center' }}>
          <Badge label="New" variant="accent" />
          <Badge label="Draft" variant="default" />
          <Badge label="v0.0.154" variant="default" />
        </div>
      </Section>

      <Section title="Input">
        <div style={{ display: 'flex', flexDirection: 'column', gap: S.md }}>
          <Input label="Project name" placeholder="my-project" />
          <Input placeholder="Search..." />
        </div>
      </Section>
    </div>
  )
}
