import { useState, useRef, useEffect } from 'react'
import { X, SwatchBook } from 'lucide-react'
import { S, R, T, ICON, FONT, V } from './tokens'

import type { PageManifest } from './types'

interface TokenPanelProps {
  open: boolean
  onClose: () => void
  tokensPage?: PageManifest
}

export function TokenPanel({ open, onClose, tokensPage }: TokenPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  // Close on click outside
  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Small delay to avoid immediate close from the toggle button click
    const timer = setTimeout(() => {
      document.addEventListener('pointerdown', handlePointerDown)
    }, 100)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [open, onClose])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Stop wheel/pointer events from reaching Canvas (native listeners)
  useEffect(() => {
    const panel = panelRef.current
    if (!panel || !open) return

    function stopProp(e: Event) {
      e.stopPropagation()
    }
    panel.addEventListener('wheel', stopProp, { passive: false })
    panel.addEventListener('pointerdown', stopProp)
    return () => {
      panel.removeEventListener('wheel', stopProp)
      panel.removeEventListener('pointerdown', stopProp)
    }
  }, [open])

  if (!open) return null

  // Get the Tokens frame component
  const tokensFrame = tokensPage?.frames?.[0]
  const TokensComponent = tokensFrame && 'component' in tokensFrame ? tokensFrame.component : null

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: 12,
        right: 48,
        bottom: 48,
        width: 340,
        zIndex: 10,
        background: V.chrome,
        border: `1px solid ${V.border}`,
        borderRadius: R.ui, cornerShape: 'squircle',
        fontFamily: FONT,
        boxShadow: V.shadowPanel,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${S.sm}px ${S.md}px`,
        borderBottom: `1px solid ${V.border}`,
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: S.sm,
          fontSize: T.ui,
          fontWeight: 500,
          color: V.txtPri,
        }}>
          <SwatchBook size={ICON.sm} strokeWidth={1.5} style={{ color: V.txtSec }} />
          Tokens
        </div>
        <button
          onClick={onClose}
          style={{
            width: 24,
            height: 24,
            borderRadius: R.sm,
            border: 'none',
            background: 'transparent',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: V.txtSec,
          }}
        >
          <X size={ICON.sm} strokeWidth={1.5} />
        </button>
      </div>

      {/* Content - scrollable */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: S.md,
      }}>
        {TokensComponent ? (
          <TokensComponent />
        ) : (
          <div style={{
            color: V.txtSec,
            fontSize: T.ui,
            textAlign: 'center',
            padding: S.xl,
          }}>
            No tokens page found in this iteration
          </div>
        )}
      </div>
    </div>
  )
}

interface TokenPanelToggleProps {
  onClick: () => void
}

export function TokenPanelToggle({ onClick }: TokenPanelToggleProps) {
  return (
    <button
      onClick={onClick}
      title="Tokens"
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: `1px solid ${V.border}`,
        background: V.chrome,
        cursor: 'default',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SwatchBook size={ICON.md} strokeWidth={1.5} style={{ color: V.txtSec }} />
    </button>
  )
}
