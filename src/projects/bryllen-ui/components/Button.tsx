import { useState } from 'react'
import { S, R, T, FONT, A, N } from '../tokens'

export function Button({ label = 'Click me', variant = 'primary' }: {
  label?: string
  variant?: 'primary' | 'ghost'
}) {
  const [hovered, setHovered] = useState(false)
  const isPrimary = variant === 'primary'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: `${S.sm}px ${S.lg}px`,
        background: isPrimary
          ? (hovered ? A.hover : A.accent)
          : (hovered ? N.chromeSub : 'transparent'),
        color: isPrimary ? 'oklch(1 0 0)' : N.txtPri,
        border: isPrimary ? 'none' : `1px solid ${N.border}`,
        borderRadius: R.card,
        fontSize: T.body,
        fontWeight: 500,
        fontFamily: FONT,
        cursor: 'default',
      }}
    >
      {label}
    </button>
  )
}
