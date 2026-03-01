import { CanvaiShell } from './runtime/CanvaiShell'
import { manifests } from 'virtual:canvai-manifests'

declare const __CANVAI_HTTP_PORT__: number | undefined
const annotationEndpoint = `http://localhost:${__CANVAI_HTTP_PORT__ ?? 4748}`

export default function App() {
  return <CanvaiShell manifests={manifests} annotationEndpoint={annotationEndpoint} />
}
