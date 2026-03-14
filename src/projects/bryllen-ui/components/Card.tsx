import { S, R, T, FONT, N } from '../tokens'

export function Card({ title = 'Card title', children }: {
  title?: string
  children?: React.ReactNode
}) {
  return (
    <div style={{
      background: N.card,
      borderRadius: R.card,
      border: `1px solid ${N.border}`,
      boxShadow: `0 1px ${S.xs}px rgba(0,0,0,0.04)`,
      padding: S.xxl,
      fontFamily: FONT,
      width: 320,
    }}>
      <div style={{
        fontSize: T.title,
        fontWeight: 600,
        color: N.txtPri,
        marginBottom: S.md,
      }}>
        {title}
      </div>
      <div style={{ fontSize: T.body, color: N.txtSec, lineHeight: 1.5 }}>
        {children ?? 'Card content goes here. This is a basic card component for testing layout and theming.'}
      </div>
    </div>
  )
}
