import Cell from "./Cell"
import { MapGridProps } from "./ComponentPropTypes/MapGridProps"
import React from "react"

const MapGrid = ({ cells, placePiece }: MapGridProps) => {

  const cellSize = 50

  const onDrop = (event: React.DragEvent) => {
    let clientRect = event.currentTarget.getBoundingClientRect()
    var relMouseX = Math.floor((event.clientX - clientRect.left) / cellSize)
    var relMouseY = Math.floor((event.clientY - clientRect.top) / cellSize)

    var dataTransfer = event.dataTransfer.getData("piece").split("-");
    var pieceName = dataTransfer[0]
    var relElementOffSetX = parseInt(dataTransfer[1].split("")[0])
    var relElementOffSetY = parseInt(dataTransfer[1].split("")[1])
    placePiece(pieceName, relMouseX - relElementOffSetX, relMouseY - relElementOffSetY)
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(" + cells.length + ", 1fr)",
        width: cellSize * cells.length,
        height: cellSize * cells.length,
        border: "1px solid black"
      }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {cells.map(row => {
        return row.map(cell => {
          return <Cell key={cell.key} cell={cell} cellSize={cellSize} border></Cell>
        })
      })
      }
    </div >
  )
}

export default MapGrid