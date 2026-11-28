import './index.css'

import { StrictMode } from 'react'
import App from './App'
import type { GameContext } from './hub/contract'

/** Everything the game needs around <App/>, shared by the standalone page and the hub. */
export default function GameRoot(_props: { ctx: GameContext }) {
  return (
    <StrictMode>
      <div className="game-woodoku">
        <App />
      </div>
    </StrictMode>
  )
}
