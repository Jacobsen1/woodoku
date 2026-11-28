import { BOX_SIZE, CELL_SIZE } from "../Game/constants"
import { WOOD_TEXTURE } from "../Game/textures"
import { memo, type DragEvent } from "react"
import { Game } from "../Game/Game"
import { useCellsStore } from "../Store/useCellsStore"
import { useDraggedPieceStore } from "../Store/useDraggedPieceStore"
import { useRandomPieceStore } from "../Store/useRandomPieceStore"
import { useScoreStore } from "../Store/useScoreStore"

type CellProps = {
  x: number
  y: number
}

const isBoxEdge = (i: number) => i > 0 && i % BOX_SIZE === 0

const onDragOver = (e: DragEvent) => e.preventDefault()

const Cell = memo(({ x, y }: CellProps) => {
  // Subscribe only to this cell's own flags; the handlers read everything else on demand,
  // so a board update re-renders only the cells whose flags changed.
  const filled = useCellsStore(state => state.cells[y][x].filled)
  const hover = useCellsStore(state => state.cells[y][x].hover)
  const removable = useCellsStore(state => state.cells[y][x].removable)

  /**
   * The piece dragged from the tray and where its top-left corner lands when its grabbed
   * cell is over this cell, or null when the drag did not start in the tray.
   */
  const draggedPieceOrigin = () => {
    const { draggedPiece } = useDraggedPieceStore.getState()
    if (!draggedPiece) return null
    return { draggedPiece, px: x - draggedPiece.mouseX, py: y - draggedPiece.mouseY }
  }

  const onDrop = () => {
    const origin = draggedPieceOrigin()
    if (!origin) return
    const { draggedPiece, px, py } = origin
    const { cells, updateCells } = useCellsStore.getState()
    if (!Game.CanPlacePiece(cells, draggedPiece, px, py)) return

    const tray = useRandomPieceStore.getState()
    const score = useScoreStore.getState()
    const newRandomPieces = Game.RemovePieceFromRandomPieces(draggedPiece.name, tray.pieces)
    const newCells = Game.PlacePiece(cells, draggedPiece, px, py)
    const piecesForRemoval = Game.GetPiecesForRemoval(newCells)
    Game.RemovePieces(newCells, piecesForRemoval)
    Game.ClearPreview(newCells)

    const clearedGroups = Game.GetClearedGroups(piecesForRemoval)
    if (clearedGroups > 0) score.incrementCombo(clearedGroups)
    else score.resetCombo()
    score.updateScore(Game.GetScore(piecesForRemoval, draggedPiece))
    tray.setPieces(newRandomPieces)
    updateCells(newCells)
    useDraggedPieceStore.getState().setDraggedPiece(null)
  }

  const onDragEnter = () => {
    const origin = draggedPieceOrigin()
    if (!origin) return
    const { draggedPiece, px, py } = origin
    const { cells, updateCells } = useCellsStore.getState()
    const newCells = Game.ClearPreview(cells)

    if (Game.CanPlacePiece(newCells, draggedPiece, px, py)) {
      Game.SetHover(newCells, draggedPiece, px, py)
      Game.SetCellRemoval(newCells, Game.GetPiecesForRemovalIfPlaced(newCells, draggedPiece, px, py))
    }
    updateCells(newCells)
  }

  return (
    <div
      data-testid="cell"
      data-x={x}
      data-y={y}
      data-filled={filled}
      data-hover={hover}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      style={{
        width: CELL_SIZE - 2 + "px",
        height: CELL_SIZE - 2 + "px",
        border: "1px solid black",
        borderLeft: isBoxEdge(x) ? "3px solid black" : ",",
        borderTop: isBoxEdge(y) ? "3px solid black" : ",",
        backgroundImage: filled ? WOOD_TEXTURE : "",
        backgroundColor: hover ? "gray" : "",
        filter: removable && filled ? "brightness(65%)" : "",
      }} />
  )
})

export default Cell
