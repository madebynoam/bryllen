import { useRef } from 'react'
import { S, T, FONT } from './tokens'
import type { CanvasSticky } from './types'

interface StickyProps {
  sticky: CanvasSticky
  x: number          // absolute canvas x (computed from parent + offset)
  y: number          // absolute canvas y
  zoom: number
  selected: boolean
  onSelect: (id: string, shiftKey: boolean) => void
}

/* Sticky note — warm amber Post-it, visually distinct from frames */
const STICKY_BG    = 'oklch(0.93 0.10 85)'   // warm amber yellow
const STICKY_BG_SEL = 'oklch(0.88 0.13 82)'  // slightly deeper when selected
const STICKY_TEXT  = 'oklch(0.32 0.07 75)'   // dark warm brown
const STICKY_FOLD  = 'oklch(0.82 0.12 80)'   // fold corner (darker edge)

export function Sticky({ sticky, x, y, zoom, selected, onSelect }: StickyProps) {
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    pointerDownPos.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation()
    if (!pointerDownPos.current) return
    const dx = e.clientX - pointerDownPos.current.x
    const dy = e.clientY - pointerDownPos.current.y
    if (Math.sqrt(dx * dx + dy * dy) < 5) {
      onSelect(sticky.id, e.shiftKey)
    }
    pointerDownPos.current = null
  }

  const FOLD = 14  // folded corner size

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 200,
        background: selected ? STICKY_BG_SEL : STICKY_BG,
        // Folded corner via clip-path
        clipPath: `polygon(0 0, calc(100% - ${FOLD}px) 0, 100% ${FOLD}px, 100% 100%, 0 100%)`,
        boxShadow: selected
          ? `2px 4px 12px rgba(0,0,0,0.18)`
          : `2px 3px 8px rgba(0,0,0,0.12)`,
        padding: `${S.md}px ${S.md}px ${S.md}px ${S.md}px`,
        cursor: 'default',
        userSelect: 'none',
        fontFamily: FONT,
        fontSize: T.ui,
        color: STICKY_TEXT,
        zIndex: 10,
        transition: 'background 0.1s, box-shadow 0.1s',
        pointerEvents: 'auto',
      } as React.CSSProperties}
    >
      {/* Folded corner triangle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: FOLD,
          height: FOLD,
          background: STICKY_FOLD,
          clipPath: `polygon(0 0, 100% 100%, 100% 0)`,
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          lineHeight: 1.5,
          color: STICKY_TEXT,
          textWrap: 'pretty',
          whiteSpace: 'pre-wrap',
          display: 'block',
        } as React.CSSProperties}
      >
        {sticky.content}
      </span>
    </div>
  )
}
