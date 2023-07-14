import { create } from 'zustand'
import { CellClass } from '../Game/Cell'
import { Game } from '../Game/Game'

type CellsStoreType = {
  cells: CellClass[][]
  updateCells: (updatedCells: CellClass[][]) => void
}

export const useCellsStore = create<CellsStoreType>((set) => ({
  cells: Game.Init(9, 9),
  updateCells: (updatedCells) => set(() => ({
    cells: updatedCells
  }))
}))

