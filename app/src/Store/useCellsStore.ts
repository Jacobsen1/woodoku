import { CellClass } from '../Components/Cell'
import { create } from 'zustand'

type CellsStoreType = {
  cells: CellClass[][]
  updateCells: (updatedCells: CellClass[]) => void
}

export const useCellsStore = create<CellsStoreType>((set) => ({
  cells: CellClass.Init(9, 9),
  updateCells: (updatedCells) => set((state) => {
    const cells = [...state.cells]
    updatedCells.forEach(cell => {
      cells[cell.x][cell.y] = { ...cells[cell.x][cell.y], filled: true }
    })
    return { cells }
  })
}))

