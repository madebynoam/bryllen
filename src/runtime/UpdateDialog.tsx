import { useState, useCallback } from 'react'
import { ArrowUp, Loader2 } from 'lucide-react'
import { Overlay, DialogCard, DialogActions, ActionButton } from './Menu'
import { D, S, R, T, V, ICON, FONT } from './tokens'
import { setDismissedVersion } from './versionCheck'

interface UpdateDialogProps {
  open: boolean
  onClose: () => void
  currentVersion: string
  latestVersion: string
  endpoint: string
}

export function UpdateDialog({ open, onClose, currentVersion, latestVersion, endpoint }: UpdateDialogProps) {
  const [updating, setUpdating] = useState(false)

  const handleUpdate = useCallback(async () => {
    setUpdating(true)
    try {
      await fetch(`${endpoint}/update`, { method: 'POST' })
    } catch {}
    // Stay in "Updating..." until the page reloads automatically
  }, [endpoint])

  const handleDismiss = useCallback(() => {
    setDismissedVersion(latestVersion)
    onClose()
  }, [latestVersion, onClose])

  return (
    <Overlay open={open} onClose={updating ? () => {} : onClose}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <DialogCard width={360}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: S.sm,
          marginBottom: S.lg,
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: R.ui, cornerShape: 'squircle',
            background: updating ? 'oklch(0.45 0.14 250)' : 'oklch(0.55 0.14 250)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: D.text,
            transition: 'background 0.2s ease-out',
          } as React.CSSProperties}>
            {updating
              ? <Loader2 size={ICON.lg} strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }} />
              : <ArrowUp size={ICON.lg} strokeWidth={2} />
            }
          </div>
          <div>
            <div style={{
              fontSize: T.ui,
              fontWeight: 600,
              color: V.txtPri,
              fontFamily: FONT,
            }}>
              {updating ? 'Updating...' : 'Update available'}
            </div>
            <div style={{
              fontSize: 12,
              color: V.txtSec,
              fontFamily: FONT,
            }}>
              {currentVersion} → {latestVersion}
            </div>
          </div>
        </div>

        {updating ? (
          /* Updating state — static, canvas will reload automatically */
          <div style={{
            fontSize: 12,
            color: V.txtSec,
            fontFamily: FONT,
            lineHeight: 1.5,
            textWrap: 'pretty',
          } as React.CSSProperties}>
            Installing update... The canvas will reload automatically when it's ready.
          </div>
        ) : (
          <>
            {/* Description */}
            <div style={{
              fontSize: 12,
              color: V.txtSec,
              fontFamily: FONT,
              lineHeight: 1.5,
              textWrap: 'pretty',
              marginBottom: S.md,
            } as React.CSSProperties}>
              Bryllen {latestVersion} is available. Click Update to install it now — no terminal needed.
            </div>

            {/* Actions */}
            <DialogActions>
              <ActionButton variant="ghost" onClick={handleDismiss}>Dismiss</ActionButton>
              <ActionButton variant="primary" onClick={handleUpdate}>Update</ActionButton>
            </DialogActions>
          </>
        )}
      </DialogCard>
    </Overlay>
  )
}
