import { useState, useEffect, useCallback, useRef } from 'react'

const NAV_KEY = 'canvai:nav:'
const SYSTEM_PAGES = ['Tokens', 'Components']

interface NavState {
  iteration: number
  page: number
}

function save(project: string, state: NavState) {
  try { localStorage.setItem(NAV_KEY + project, JSON.stringify(state)) } catch {}
}

function load(project: string): NavState | null {
  try {
    const raw = localStorage.getItem(NAV_KEY + project)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function firstContentPage(pages: { name: string }[]): number {
  const idx = pages.findIndex(p => !SYSTEM_PAGES.includes(p.name))
  return idx >= 0 ? idx : 0
}

function resolveNav(project: string, iterations: { name: string; pages: { name: string }[] }[]): NavState {
  const latestIdx = Math.max(0, iterations.length - 1)
  const saved = load(project)
  if (saved && saved.iteration < iterations.length) {
    if (saved.iteration < latestIdx) {
      const pages = iterations[latestIdx]?.pages ?? []
      return { iteration: latestIdx, page: firstContentPage(pages) }
    }
    const iter = iterations[saved.iteration]
    if (saved.page < (iter?.pages?.length ?? 0)) return saved
  }
  const pages = iterations[latestIdx]?.pages ?? []
  return { iteration: latestIdx, page: firstContentPage(pages) }
}

/**
 * Remembers iteration + page selection per project.
 * On fresh load: latest iteration, first content page (not Tokens/Components).
 */
export function useNavMemory(
  project: string,
  iterations: { name: string; pages: { name: string }[] }[],
) {
  const [state, setState] = useState<NavState>(() => resolveNav(project, iterations))
  const prevProject = useRef(project)

  // Reset nav state when the active project changes
  useEffect(() => {
    if (prevProject.current !== project) {
      prevProject.current = project
      setState(resolveNav(project, iterations))
    }
  }, [project, iterations])

  // Persist on change
  useEffect(() => {
    if (project) save(project, state)
  }, [project, state])

  const setIteration = useCallback((i: number) => {
    const pages = iterations[i]?.pages ?? []
    const pageIdx = firstContentPage(pages)
    setState({ iteration: i, page: pageIdx })
  }, [iterations])

  const setPage = useCallback((p: number) => {
    setState(s => ({ ...s, page: p }))
  }, [])

  return {
    iterationIndex: state.iteration,
    pageIndex: state.page,
    setIteration,
    setPage,
  }
}
