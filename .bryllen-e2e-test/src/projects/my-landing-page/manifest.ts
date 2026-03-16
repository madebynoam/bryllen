import type { ProjectManifest } from 'bryllen/runtime'
import './v1/tokens.css'
import { DirA } from './v1/pages/DirA'
import { DirB } from './v1/pages/DirB'
import { DirC } from './v1/pages/DirC'

const manifest: ProjectManifest = {
  id: 'test-uuid-1234',
  project: 'my-landing-page',
  components: {
    DirA,
    DirB,
    DirC,
  },
}

export default manifest
