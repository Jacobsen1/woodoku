import { createRoot } from 'react-dom/client'
import GameRoot from './GameRoot'
import type { MountFn } from './hub/contract'

/** Entry point for the game hub (exposed as `woodoku/mount`). */
export const mount: MountFn = (el, ctx) => {
  const root = createRoot(el)
  root.render(<GameRoot ctx={ctx} />)
  return () => root.unmount()
}
