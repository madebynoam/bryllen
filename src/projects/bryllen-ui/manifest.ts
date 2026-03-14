import type { ProjectManifest } from '../../runtime/types'
import { Tokens } from './pages/tokens'
import { Components } from './pages/components'

const manifest: ProjectManifest = {
  id: 'b1a2c3d4-ui01-4dev-test-bryllenui0001',
  project: 'bryllen-ui',
  components: {
    'tokens': Tokens,
    'components': Components,
  },
}

export default manifest
