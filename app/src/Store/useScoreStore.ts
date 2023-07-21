import { create } from "zustand"

type ScoreStoreType = {
  score: number,
  combo: number,
  updateScore: (newScore: number) => void
  incrementCombo: (increment: number) => void,
  resetCombo: () => void
}

export const useScoreStore = create<ScoreStoreType>((set) => ({
  score: 0,
  combo: 0,
  updateScore: (newScore) => set((state) => ({
    score: state.score + newScore
  })),
  incrementCombo: (newCombo) => set((state) => ({
    combo: state.combo + newCombo
  })),
  resetCombo: () => set(() => ({
    combo: 0
  }))
}))