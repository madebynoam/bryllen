import './v1/tokens.css'

import { SlideSummary } from './v1/pages/slide-summary'
import { SlideJtbd } from './v1/pages/slide-jtbd'
import { SlideCompetitors } from './v1/pages/slide-competitors'
import { SlideShipCut } from './v1/pages/slide-ship-cut'
import { SlideTimeline } from './v1/pages/slide-timeline'
import { SlideNaming } from './v1/pages/slide-naming'
import { SlideDocs } from './v1/pages/slide-docs'
import { SlidePolish } from './v1/pages/slide-polish'
import { MasterBoard } from './v1/pages/master-board'
import type { ProjectManifest } from '../../runtime/types'

const manifest: ProjectManifest = {
  project: 'canvai-launch-plan',
  iterations: [
    {
      name: 'V1',
      description: '7-Day Ship Plan — Dieter Rams Grid',
      pages: [
        {
          name: 'All Slides',
          grid: { columns: 4, columnWidth: 800, rowHeight: 600, gap: 32 },
          frames: [
            { id: 'summary', title: '01 — Vision', component: SlideSummary, width: 800, height: 600 },
            { id: 'jtbd', title: '02 — Jobs to Be Done', component: SlideJtbd, width: 800, height: 600 },
            { id: 'competitors', title: '03 — The Landscape', component: SlideCompetitors, width: 800, height: 600 },
            { id: 'ship-cut', title: '04 — Ship vs Cut', component: SlideShipCut, width: 800, height: 600 },
            { id: 'timeline', title: '05 — Timeline', component: SlideTimeline, width: 800, height: 600 },
            { id: 'naming', title: '06 — Naming', component: SlideNaming, width: 800, height: 600 },
            { id: 'docs', title: '07 — Docs', component: SlideDocs, width: 800, height: 600 },
            { id: 'polish', title: '08 — Polish', component: SlidePolish, width: 800, height: 600 },
            { id: 'master', title: '09 — Master', component: MasterBoard, width: 800, height: 600 },
          ],
        },
      ],
    },
  ],
}

export default manifest
