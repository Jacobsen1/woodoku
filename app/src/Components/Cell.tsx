import { Game } from "../Game/Game"
import { useCellsStore } from "../Store/useCellsStore"
import { useDraggedPieceStore } from "../Store/useDraggedPieceStore"
import { CellProps } from "./ComponentPropTypes/CellProps"
import { memo } from "react"

const Cell = memo(({ cell, border, hover }: CellProps) => {

  const cells = useCellsStore(state => state.cells)
  const updateCells = useCellsStore(state => state.updateCells)
  const draggedPiece = useDraggedPieceStore(state => state.draggedPiece)
  const setDraggedPiece = useDraggedPieceStore(state => state.setDraggedPiece)

  const onDrop = () => {
    if (Game.CanPlacePiece(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)) {
      let newCells = Game.PlacePiece(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)
      setDraggedPiece({ ...draggedPiece, gridX: -1, gridY: - 1 })
      updateCells(newCells)
    }
  }

  const onDragEnter = () => {
    let newCells = Game.ClearHover(cells)
    if (Game.CanPlacePiece(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)) {
      newCells = Game.SetHover(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)
    }
    updateCells(newCells)

  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}

      style={{
        width: cell.size - 2 + "px",
        height: cell.size - 2 + "px",
        border: border ? "1px solid black" : "",
        borderLeft: (cell.x === 3 || cell.x === 6) ? "3px solid black" : ",",
        borderTop: (cell.y === 3 || cell.y === 6) ? "3px solid black" : ",",
        backgroundImage: cell.filled ? "url('./wood.png')" : "",
        backgroundColor: hover ? "gray" : ""
      }} />
  )
})

export default Cell

