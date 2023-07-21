import { CellProps } from "./ComponentPropTypes/CellProps"
import { Game } from "../Game/Game"
import { memo } from "react"
import { useCellsStore } from "../Store/useCellsStore"
import { useDraggedPieceStore } from "../Store/useDraggedPieceStore"
import { useRandomPieceStore } from "../Store/useRandomPieceStore"
import { useScoreStore } from "../Store/useScoreStore"

const Cell = memo(({ cell, border, hover, removable }: CellProps) => {

  const cells = useCellsStore(state => state.cells)
  const updateCells = useCellsStore(state => state.updateCells)
  const draggedPiece = useDraggedPieceStore(state => state.draggedPiece)
  const setDraggedPiece = useDraggedPieceStore(state => state.setDraggedPiece)
  const randomPieces = useRandomPieceStore(state => state.pieces)
  const setRandomPieces = useRandomPieceStore(state => state.setPieces)
  const updateScore = useScoreStore(state => state.updateScore)
  const incrementCombo = useScoreStore(state => state.incrementCombo)
  const resetCombo = useScoreStore(state => state.resetCombo)

  const onDrop = () => {
    if (Game.CanPlacePiece(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)) {
      let newRandomPieces = Game.RemovePieceFromRandomPieces(draggedPiece.name, randomPieces)
      let newCells = Game.PlacePiece(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)
      let piecesForRemoval = Game.GetPiecesForRemoval(newCells)
      Game.RemovePieces(newCells, piecesForRemoval)
      let score = Game.GetScore(piecesForRemoval, draggedPiece)

      piecesForRemoval.length > 0 ? incrementCombo(piecesForRemoval.length / 9) : resetCombo()
      updateScore(score)
      setDraggedPiece({ ...draggedPiece, gridX: -1, gridY: - 1 })
      setRandomPieces(newRandomPieces)
      updateCells(newCells)

    }
  }

  const onDragEnter = () => {
    let newCells = Game.ClearHover(cells)
    Game.ClearRemovable(newCells)

    if (Game.CanPlacePiece(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)) {
      newCells = Game.SetHover(cells, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)
      let newCellsCopy = newCells.map(row => row.map(cell => ({ ...cell })))
      let newCellsWithPiece = Game.PlacePiece(newCellsCopy, draggedPiece, cell.x - draggedPiece.mouseX, cell.y - draggedPiece.mouseY)
      let piecesForRemoval = Game.GetPiecesForRemoval(newCellsWithPiece)
      Game.SetCellRemoval(newCells, piecesForRemoval)
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
        backgroundColor: hover ? "gray" : "",
        filter: removable && cell.filled ? "brightness(65%)" : "",
      }} />
  )
})

export default Cell

