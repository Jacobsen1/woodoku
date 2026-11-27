import { DraggedPiece, type Piece as PieceType } from "../Game/Pieces"
import { CELL_SIZE } from "../Game/constants"
import CellImage from "./CellImage"
import type { DragEvent } from "react"
import { useDraggedPieceStore } from "../Store/useDraggedPieceStore"

const Piece = ({ piece }: { piece: PieceType }) => {
  const pieceDimension = piece.value.length
  const setDraggedPiece = useDraggedPieceStore(state => state.setDraggedPiece)

  const dragStart = (event: DragEvent) => {
    const elementRect = event.currentTarget.getBoundingClientRect()
    const relMouseX = Math.floor((event.clientX - elementRect.left) / CELL_SIZE)
    const relMouseY = Math.floor((event.clientY - elementRect.top) / CELL_SIZE)
    setDraggedPiece(new DraggedPiece(piece.value, piece.name, relMouseX, relMouseY))
  }

  return (
    <div
      data-testid="piece"
      data-piece-name={piece.name}
      draggable
      onDragStart={dragStart}
      style={{
        display: "grid",
        margin: "10px",
        gridTemplateColumns: "repeat(" + pieceDimension + ", 1fr)",
        width: CELL_SIZE * pieceDimension,
        height: CELL_SIZE * pieceDimension,
      }}>
      {piece.value.flatMap((row, i) =>
        row.map((col, j) => <CellImage key={i * pieceDimension + j} visible={col === 1} />))}
    </div>
  )
}

export default Piece
