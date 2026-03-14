import { S, R, T, FONT, N, A } from '../tokens'

export function Badge({ label = 'New', variant = 'default' }: {
  label?: string
  variant?: 'default' | 'accent'
}) {
  const isAccent = variant === 'accent'

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: `2px ${S.sm}px`,
      background: isAccent ? A.accent : N.chromeSub,
      color: isAccent ? 'oklch(1 0 0)' : N.txtSec,
      borderRadius: R.pill,
      fontSize: T.pill,
      fontWeight: 600,
      fontFamily: FONT,
      letterSpacing: '0.02em',
    }}>
      {label}
    </span>
  )
}
