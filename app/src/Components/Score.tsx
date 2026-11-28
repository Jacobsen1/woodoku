import { useScoreStore } from "../Store/useScoreStore"

const Score = () => {
  const score = useScoreStore(state => state.score)
  const combo = useScoreStore(state => state.combo)
  return <p data-testid="score">combo: {combo} | score: {score}</p>
}

export default Score
