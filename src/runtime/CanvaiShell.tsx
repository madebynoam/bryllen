import { useState, useEffect, useCallback } from 'react'
import { Canvas } from './Canvas'
import { Frame } from './Frame'
import { useFrames } from './useFrames'
import { layoutFrames } from './layout'
import { TopBar } from './TopBar'
import { IterationSidebar } from './IterationSidebar'
import { AnnotationOverlay } from './AnnotationOverlay'
import { CommentOverlay } from './CommentOverlay'
import { NewIterationDialog } from './NewIterationDialog'
import { NewProjectDialog } from './NewProjectDialog'
import { useNavMemory } from './useNavMemory'
import { ZoomControl } from './ZoomControl'
import { CanvasColorPicker } from './CanvasColorPicker'
import { loadCanvasBg, saveCanvasBg } from './Canvas'
import { ActionButton } from './Menu'
import { N, E, S, T, R, FONT } from './tokens'
import type { ProjectManifest } from './types'

interface CanvaiShellProps {
  manifests: ProjectManifest[]
  annotationEndpoint?: string
}

export function CanvaiShell({ manifests, annotationEndpoint = 'http://localhost:4748' }: CanvaiShellProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [iterDialogOpen, setIterDialogOpen] = useState(false)
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)

  const handleNewProject = useCallback(async (payload: { name: string, description: string, prompt: string }) => {
    try {
      await fetch(`${annotationEndpoint}/annotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'project', comment: JSON.stringify(payload) }),
      })
    } catch {
      // Server may be unavailable
    }
  }, [annotationEndpoint])

  const handleNewIteration = useCallback(async (prompt: string) => {
    try {
      await fetch(`${annotationEndpoint}/annotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'iteration', comment: prompt }),
      })
    } catch {
      // Server may be unavailable
    }
  }, [annotationEndpoint])

  const activeProject: ProjectManifest | undefined = manifests[activeProjectIndex]
  const { iterationIndex: activeIterationIndex, pageIndex: activePageIndex, setIteration: setActiveIterationIndex, setPage: setActivePageIndex } = useNavMemory(
    activeProject?.project ?? '',
    activeProject?.iterations ?? [],
  )

  const activeIteration = activeProject?.iterations?.[activeIterationIndex]
  const iterClass = activeIteration ? `iter-${activeIteration.name.toLowerCase()}` : ''
  const activePage = activeIteration?.pages?.[activePageIndex]
  const layoutedFrames = activePage ? layoutFrames(activePage) : []

  const { frames, updateFrame, handleResize } = useFrames(layoutedFrames, activePage?.grid)

  const projectKey = activeProject?.project ?? ''
  const [canvasBg, setCanvasBg] = useState(() => loadCanvasBg(projectKey) ?? N.canvas)
  useEffect(() => { setCanvasBg(loadCanvasBg(projectKey) ?? N.canvas) }, [projectKey])
  useEffect(() => { saveCanvasBg(projectKey, canvasBg) }, [projectKey, canvasBg])

  // Empty state — no projects yet
  if (manifests.length === 0) {
    return (
      <div id="canvai-root" style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: N.canvas,
        fontFamily: FONT,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: S.lg,
          padding: S.xxl,
          background: N.card,
          border: `1px solid ${N.border}`,
          borderRadius: R.panel,
          maxWidth: 400,
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: T.title,
            fontWeight: 600,
            color: N.txtPri,
            margin: 0,
            textWrap: 'pretty',
          }}>
            Start a new project
          </h2>
          <p style={{
            fontSize: T.body,
            color: N.txtSec,
            margin: 0,
            lineHeight: 1.5,
            textWrap: 'pretty',
          }}>
            Describe what you're designing and the agent will set it up
          </p>
          <ActionButton variant="primary" onClick={() => setProjectDialogOpen(true)}>
            New Project
          </ActionButton>
        </div>
        {import.meta.env.DEV && (
          <NewProjectDialog
            open={projectDialogOpen}
            onClose={() => setProjectDialogOpen(false)}
            onSubmit={handleNewProject}
          />
        )}
      </div>
    )
  }

  return (
    <div id="canvai-root" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar
        projects={manifests}
        activeProjectIndex={activeProjectIndex}
        onSelectProject={setActiveProjectIndex}
        iterations={activeProject?.iterations ?? []}
        activeIterationIndex={activeIterationIndex}
        onSelectIteration={setActiveIterationIndex}
        annotationEndpoint={annotationEndpoint}
        commentCount={commentCount}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        onNewIteration={() => setIterDialogOpen(true)}
        onNewProject={() => setProjectDialogOpen(true)}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <IterationSidebar
          iterationName={activeIteration?.name ?? ''}
          pages={activeIteration?.pages ?? []}
          activePageIndex={activePageIndex}
          onSelectPage={setActivePageIndex}
          collapsed={!sidebarOpen}
        />

        <div className={iterClass} style={{ flex: 1, backgroundColor: N.chrome, padding: `${E.insetTop}px ${E.inset}px ${E.inset}px` }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: 32,
            cornerShape: 'squircle',
            backgroundColor: canvasBg,
            boxShadow: E.shadow,
            overflow: 'hidden',
            position: 'relative',
          } as React.CSSProperties}>
            <Canvas
              pageKey={`${activeProject?.project ?? ''}-${activeIteration?.name ?? ''}-${activePage?.name ?? ''}`}
              hud={<>
                <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 5 }}>
                  <CanvasColorPicker activeColor={canvasBg} onSelect={setCanvasBg} />
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}>
                  <ZoomControl />
                </div>
              </>}
            >
              {frames.map(frame => (
                <Frame
                  key={frame.id}
                  id={frame.id}
                  title={frame.title}
                  x={frame.x}
                  y={frame.y}
                  width={frame.width}
                  height={frame.height}
                  onMove={(id, newX, newY) => updateFrame(id, { x: newX, y: newY })}
                  onResize={handleResize}
                >
                  <frame.component {...(frame.props ?? {})} />
                </Frame>
              ))}
            </Canvas>
          </div>
        </div>
      </div>

      {import.meta.env.DEV && <AnnotationOverlay endpoint={annotationEndpoint} frames={frames} />}
      <CommentOverlay endpoint={annotationEndpoint} frames={frames} onCommentCountChange={setCommentCount} />
      {import.meta.env.DEV && (
        <NewIterationDialog
          open={iterDialogOpen}
          onClose={() => setIterDialogOpen(false)}
          onSubmit={handleNewIteration}
        />
      )}
      {import.meta.env.DEV && (
        <NewProjectDialog
          open={projectDialogOpen}
          onClose={() => setProjectDialogOpen(false)}
          onSubmit={handleNewProject}
        />
      )}
    </div>
  )
}
