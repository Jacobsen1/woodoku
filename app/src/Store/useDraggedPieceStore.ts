import { create } from 'zustand'
import { DraggedPiece } from '../Game/Pieces'

type DraggedPieceStore = {
  draggedPiece: DraggedPiece
  setDraggedPiece: (draggedPiece: DraggedPiece) => void
}

export const useDraggedPieceStore = create<DraggedPieceStore>((set) => ({
  draggedPiece: new DraggedPiece([], "", 0, 0),
  setDraggedPiece: (draggedPiece) => set(() => {
    return { draggedPiece }
  })
}))

