import type { ProjectManifest } from '../../runtime/types'
import { Dashboard } from './v1/pages/dashboard'
import { Components } from './v1/pages/components'
import { Settings } from './v1/pages/settings'
import { DashLight } from './v1/pages/dash-light'
import { DashDark } from './v1/pages/dash-dark'
import { DashMinimal } from './v1/pages/dash-minimal'

const manifest: ProjectManifest = {
  project: 'pulse',
  iterations: [
    {
      name: 'V1',
      pages: [
        {
          name: 'All Directions',
          grid: { columns: 2, columnWidth: 1440, rowHeight: 900, gap: 40 },
          frames: [
            { id: 'v1-dash-light', title: 'Direction A — Light Sidebar', component: DashLight, width: 1440, height: 900 },
            { id: 'v1-dash-dark', title: 'Direction B — Dark Dense', component: DashDark, width: 1440, height: 900 },
            { id: 'v1-dash-minimal', title: 'Direction C — Ultra Minimal', component: DashMinimal, width: 1440, height: 900 },
            { id: 'v1-dashboard-orig', title: 'Direction D — Original', component: Dashboard, width: 1440, height: 900 },
          ],
        },
        {
          name: 'Dashboard',
          grid: { columns: 1, columnWidth: 1440, rowHeight: 900, gap: 40 },
          frames: [
            { id: 'v1-dashboard', title: 'Dashboard — Analytics Overview', component: Dashboard, width: 1440, height: 900 },
          ],
        },
        {
          name: 'Components',
          grid: { columns: 1, columnWidth: 1440, rowHeight: 1200, gap: 40 },
          frames: [
            { id: 'v1-components', title: 'Components — UI Library', component: Components, width: 1440, height: 1200 },
          ],
        },
        {
          name: 'Settings',
          grid: { columns: 1, columnWidth: 1440, rowHeight: 900, gap: 40 },
          frames: [
            { id: 'v1-settings', title: 'Settings — Account Preferences', component: Settings, width: 1440, height: 900 },
          ],
        },
      ],
    },
  ],
}

export default manifest
