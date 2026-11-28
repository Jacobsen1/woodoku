import { createRoot } from 'react-dom/client'
import GameRoot from './GameRoot'
import type { MountFn } from './hub/contract'

/** Entry point for the game hub (exposed as `woodoku/mount`). */
export const mount: MountFn = (el, ctx) => {
  // React renders asynchronously, so a crash never leaves mount(); report it to the hub.
  const root = createRoot(el, { onUncaughtError: (error) => ctx.onError?.(error) })
  root.render(<GameRoot ctx={ctx} />)
  return () => root.unmount()
}
