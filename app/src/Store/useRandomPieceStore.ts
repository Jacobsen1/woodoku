import { create } from 'zustand'
import { Game } from '../Game/Game'
import { Piece } from '../Game/Pieces'

type RandomPieceStore = {
  pieces: Piece[]
  setPieces: (pieces: Piece[]) => void
}

export const useRandomPieceStore = create<RandomPieceStore>((set) => ({
  pieces: Game.GetThreeRandomPieces(),
  setPieces: (pieces) => set({ pieces }),
}))
