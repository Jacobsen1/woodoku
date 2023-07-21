import { create } from 'zustand'

type AnimatingStore = {
  isAnimating: boolean
  setIsAnimating: (isAnimating: boolean) => void
}

export const useAnimatingStore = create<AnimatingStore>((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating) => set(() => ({
    isAnimating: isAnimating
  }))
}))

