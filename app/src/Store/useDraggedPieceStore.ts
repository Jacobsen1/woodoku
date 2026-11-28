import { create } from 'zustand'
import { DraggedPiece } from '../Game/Pieces'

type DraggedPieceStore = {
  /** The piece being dragged from the tray, or null when no tray drag is in progress. */
  draggedPiece: DraggedPiece | null
  setDraggedPiece: (draggedPiece: DraggedPiece | null) => void
}

export const useDraggedPieceStore = create<DraggedPieceStore>((set) => ({
  draggedPiece: null,
  setDraggedPiece: (draggedPiece) => set({ draggedPiece }),
}))
