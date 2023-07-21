import CellImage from "./CellImage"
import { DraggedPiece } from "../Game/Pieces"
import { PieceProps } from "./ComponentPropTypes/PieceProps"
import React from "react"
import { useDraggedPieceStore } from "../Store/useDraggedPieceStore"

const Piece = ({ piece }: PieceProps) => {
  const pieceDimension = piece.value.length
  const cellSize = 50
  let key = 0

  const setDraggedPiece = useDraggedPieceStore(state => state.setDraggedPiece)

  const dragStart = (event: React.DragEvent) => {
    var elementRect = event.currentTarget.getBoundingClientRect()
    var relMouseX = Math.floor((event.clientX - elementRect.left) / cellSize)
    var relMouseY = Math.floor((event.clientY - elementRect.top) / cellSize)

    var draggedPiece = new DraggedPiece(piece.value, piece.name, relMouseX, relMouseY)
    setDraggedPiece(draggedPiece)
  }

  return (
    <div
      draggable
      onDragStart={dragStart}
      style={{
        display: "grid",
        margin: "10px",
        gridTemplateColumns: "repeat(" + pieceDimension + ", 1fr)",
        width: cellSize * pieceDimension,
        height: cellSize * pieceDimension,
      }}>
      {piece.value.map(row => {
        return row.map(col => {
          key++
          return <CellImage key={key} cellSize={cellSize} visible={col === 1}></CellImage>
        })
      })}
    </div >
  )
}

export default Piece