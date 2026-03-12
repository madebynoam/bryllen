import { Overlay, DialogCard, DialogActions, ActionButton } from './Menu'
import { S, T, FONT, V } from './tokens'
import changelog from './changelog.json'

interface ChangelogEntry {
  version: string
  title: string | null
  changes: string[]
}

interface ChangelogDialogProps {
  open: boolean
  onClose: () => void
}

export function ChangelogDialog({ open, onClose }: ChangelogDialogProps) {
  const entries = changelog as ChangelogEntry[]

  return (
    <Overlay open={open} onClose={onClose}>
      <DialogCard title="What's new" width={440}>
        <div style={{
          maxHeight: 400,
          overflowY: 'auto',
          marginRight: -S.sm,
          paddingRight: S.sm,
        }}>
          {entries.map((entry, i) => (
            <div key={entry.version} style={{
              padding: `${S.md}px 0`,
              borderTop: i > 0 ? `1px solid ${V.border}` : undefined,
            }}>
              <div style={{
                fontSize: T.ui,
                fontWeight: 600,
                color: V.txtPri,
                fontFamily: FONT,
                lineHeight: 1.4,
              }}>
                {entry.version}
                {entry.title && (
                  <span style={{ fontWeight: 400, color: V.txtSec }}>
                    {' — '}{entry.title}
                  </span>
                )}
              </div>

              {entry.changes.length > 0 && (
                <div style={{
                  marginTop: S.xs,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}>
                  {entry.changes.map((change, j) => (
                    <div key={j} style={{
                      fontSize: T.ui,
                      color: V.txtMuted,
                      fontFamily: FONT,
                      lineHeight: 1.5,
                      paddingLeft: S.md,
                      textIndent: -S.sm,
                      textWrap: 'pretty',
                    }}>
                      {'· '}{change}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogActions>
          <ActionButton variant="ghost" onClick={onClose}>Close</ActionButton>
        </DialogActions>
      </DialogCard>
    </Overlay>
  )
}
