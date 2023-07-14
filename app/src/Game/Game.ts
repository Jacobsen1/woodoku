import { CellClass } from "./Cell"
import { DraggedPiece, Piece, allPieces } from "./Pieces"

/* const findPiece = (pieceName: string): Piece => allPieceDict[pieceName]
 */
export class Game {
  static Init(cols: number, rows: number): CellClass[][] {
    let cells: CellClass[][] = []
    let key = 0
    for (let i = 0; i < cols; i++) {
      let row: CellClass[] = []
      for (let j = 0; j < rows; j++) {
        row.push(new CellClass(key, j, i))
        key++
      }
      cells.push(row)
    }
    return cells
  }

  static GetThreeRandomPieces = () => {
    let pieces: Piece[] = []
    for (let i = 0; i < 3; i++) {
      let randomPiece = allPieces[Math.floor(Math.random() * allPieces.length)]
      pieces.push(randomPiece)
    }
    return pieces
  }

  static CanPlacePiece = (cells: CellClass[][], piece: DraggedPiece, x: number, y: number): boolean => {
    let canPlacePiece = true
    piece.value.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1 && (cells[y + i] === undefined || cells[y + i][x + j] === undefined || cells[y + i][x + j].filled)) {
          canPlacePiece = false
        }
      })
    })

    return canPlacePiece
  }

  static PlacePiece = (cells: CellClass[][], draggedPiece: DraggedPiece, x: number, y: number): CellClass[][] => {
    let newCells = [...cells]
    draggedPiece.value.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val === 1) {
          newCells[y + i][x + j].filled = true
        }
      })
    });

    return newCells
  }

  static SetHover = (cells: CellClass[][], draggedPiece: DraggedPiece, x: number, y: number): CellClass[][] => {
    let newCells = [...cells]
    draggedPiece.value.forEach((row, i) => {
      row.forEach((val, j) => {
        if (val === 1) {
          newCells[y + i][x + j].hover = true
        }
      })
    });

    return newCells
  }

  static ClearHover = (cells: CellClass[][]): CellClass[][] => {
    let newCells = [...cells]
    cells.forEach(row => {
      row.forEach(cell => {
        cell.hover = false
      });
    });

    return newCells
  }

  static GetThreeFirstPieces = () => [allPieces[0], allPieces[1], allPieces[8]]

}


