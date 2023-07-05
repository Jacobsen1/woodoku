import Cell from "./Cell"
import { PieceProps } from "./ComponentPropTypes/PieceProps"
import React from "react"

const Piece = ({ piece }: PieceProps) => {
  const pieceDimension = piece.value.length
  const cellSize = 50
  let key = 0

  const dragStart = (event: React.DragEvent, piece: string) => {
    var elementRect = event.currentTarget.getBoundingClientRect()
    var relMouseX = Math.floor((event.clientX - elementRect.left) / cellSize)
    var relMouseY = Math.floor((event.clientY - elementRect.top) / cellSize)
    event.dataTransfer.setData("piece", piece + "-" + relMouseX + "" + relMouseY);
  }

  return (
    <div
      draggable
      onDragStart={(e) => dragStart(e, piece.name)}
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
          return <Cell key={key} cellSize={cellSize} image={col === 1}></Cell>
        })
      })}
    </div >
  )
}

export default Piece