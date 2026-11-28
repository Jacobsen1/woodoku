import { create } from 'zustand'
import { BOARD_SIZE } from '../Game/constants'
import { CellClass } from '../Game/Cell'
import { Game } from '../Game/Game'

type CellsStoreType = {
  cells: CellClass[][]
  updateCells: (cells: CellClass[][]) => void
  clearPreview: () => void
}

export const useCellsStore = create<CellsStoreType>((set) => ({
  cells: Game.Init(BOARD_SIZE),
  updateCells: (cells) => set({ cells }),
  clearPreview: () => set((state) => ({ cells: Game.ClearPreview(state.cells) })),
}))
