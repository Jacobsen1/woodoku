import { createRoot } from 'react-dom/client'
import GameRoot from './GameRoot'
import { localStore } from './hub/localStore'

createRoot(document.getElementById('root') as HTMLElement).render(
  <GameRoot ctx={{ highscore: localStore, basePath: import.meta.env.BASE_URL }} />
)
