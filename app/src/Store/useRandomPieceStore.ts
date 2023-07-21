import { Game } from './../Game/Game';
import { Piece } from './../Game/Pieces';
import { create } from 'zustand'

type RandomPieceStore = {
  pieces: Piece[]
  setPieces: (pieces: Piece[]) => void
}

export const useRandomPieceStore = create<RandomPieceStore>((set) => ({
  pieces: Game.GetThreeRandomPieces(),
  setPieces: (pieces) => set(() => ({
    pieces: pieces
  }))
}))