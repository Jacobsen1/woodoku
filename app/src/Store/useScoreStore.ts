import { create } from "zustand"

type ScoreStoreType = {
  score: number
  combo: number
  updateScore: (points: number) => void
  incrementCombo: (increment: number) => void
  resetCombo: () => void
}

export const useScoreStore = create<ScoreStoreType>((set) => ({
  score: 0,
  combo: 0,
  updateScore: (points) => set((state) => ({ score: state.score + points })),
  incrementCombo: (increment) => set((state) => ({ combo: state.combo + increment })),
  resetCombo: () => set({ combo: 0 }),
}))
