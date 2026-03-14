import { useState } from 'react'
import { S, R, T, FONT, N } from '../tokens'

export function Input({ placeholder = 'Type something...', label }: {
  placeholder?: string
  label?: string
}) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ fontFamily: FONT, width: 280 }}>
      {label && (
        <div style={{
          fontSize: T.caption,
          fontWeight: 500,
          color: N.txtTer,
          marginBottom: S.xs,
        }}>
          {label}
        </div>
      )}
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: `${S.sm}px ${S.md}px`,
          background: N.canvas,
          color: N.txtPri,
          border: `1px solid ${focused ? N.txtTer : N.border}`,
          borderRadius: R.card,
          fontSize: T.body,
          fontFamily: 'inherit',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}
