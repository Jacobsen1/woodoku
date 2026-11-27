import { BOX_SIZE } from "./constants"
import { CellClass } from "./Cell"
import { DraggedPiece, Piece, allPieces } from "./Pieces"

type Board = CellClass[][]

/** Calls `fn` with the board coordinates of every filled cell of `piece` placed at (x, y). */
const forEachPieceCell = (piece: Piece, x: number, y: number, fn: (x: number, y: number) => void) =>
  piece.value.forEach((row, i) => row.forEach((val, j) => {
    if (val === 1) fn(x + j, y + i)
  }))

/*
 * The board helpers mutate the cell objects in place and return a new outer array,
 * which is what tells the store that the board changed.
 */
export class Game {

  static Init(size: number): Board {
    return Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) => new CellClass(x, y)))
  }

  static GetThreeRandomPieces = () => {
    let pieces: Piece[] = []
    for (let i = 0; i < 3; i++) {
      let randomPiece = allPieces[Math.floor(Math.random() * allPieces.length)]
      if (pieces.some(piece => piece.name === randomPiece.name))
        i--
      else
        pieces.push(randomPiece)
    }
    return pieces
  }

  static CanPlacePiece = (cells: Board, piece: Piece, x: number, y: number): boolean =>
    piece.value.every((row, i) =>
      row.every((val, j) => val !== 1 || cells[y + i]?.[x + j]?.filled === false))

  static PlacePiece = (cells: Board, piece: Piece, x: number, y: number): Board => {
    forEachPieceCell(piece, x, y, (cx, cy) => { cells[cy][cx].filled = true })
    return [...cells]
  }

  static SetHover = (cells: Board, piece: Piece, x: number, y: number): Board => {
    forEachPieceCell(piece, x, y, (cx, cy) => { cells[cy][cx].hover = true })
    return [...cells]
  }

  /** Clears the hover and removable markers of the placement preview. */
  static ClearPreview = (cells: Board): Board => {
    cells.flat().forEach(cell => {
      cell.hover = false
      cell.removable = false
    })
    return [...cells]
  }

  static RemovePieceFromRandomPieces(pieceName: string, randomPieces: Piece[]): Piece[] {
    let newRandomPieces = randomPieces.filter(piece => piece.name !== pieceName)
    if (newRandomPieces.length === 0)
      newRandomPieces = Game.GetThreeRandomPieces()

    return newRandomPieces
  }

  /**
   * Returns the cells of every full row, column and box. A cell that is part of several
   * full groups is included once per group, so the length is always a multiple of 9.
   */
  static GetPiecesForRemoval(cells: Board): CellClass[] {
    const groups: CellClass[][] = [
      ...cells,
      ...cells[0].map((_, x) => cells.map(row => row[x])),
    ]
    for (let i = 0; i < cells.length; i += BOX_SIZE) {
      for (let j = 0; j < cells.length; j += BOX_SIZE) {
        groups.push(cells.slice(i, i + BOX_SIZE).flatMap(row => row.slice(j, j + BOX_SIZE)))
      }
    }
    return groups.filter(group => group.every(cell => cell.filled)).flat()
  }

  /** The cells that would be removed if `piece` was placed at (x, y), without changing the board. */
  static GetPiecesForRemovalIfPlaced(cells: Board, piece: Piece, x: number, y: number): CellClass[] {
    const copy = cells.map(row => row.map(cell => ({ ...cell })))
    return Game.GetPiecesForRemoval(Game.PlacePiece(copy, piece, x, y))
  }

  /** Number of rows, columns and boxes cleared. */
  static GetClearedGroups = (piecesForRemoval: CellClass[]): number => piecesForRemoval.length / 9

  static RemovePieces(cells: Board, piecesForRemoval: CellClass[]) {
    piecesForRemoval.forEach(({ x, y }) => {
      cells[y][x].filled = false
      cells[y][x].hover = false
    })
  }

  static SetCellRemoval(cells: Board, piecesForRemoval: CellClass[]) {
    piecesForRemoval.forEach(({ x, y }) => {
      cells[y][x].removable = true
    })
  }

  static GetScore(piecesForRemoval: CellClass[], draggedPiece: DraggedPiece): number {
    const combo = Game.GetClearedGroups(piecesForRemoval)
    let score = 0
    for (let i = 1; i <= combo; i++) {
      score += (i + 1) * 9
    }
    score += draggedPiece.value.flat().reduce((prev, cur) => prev + cur)

    return score
  }
}
