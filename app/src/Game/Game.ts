import { DraggedPiece, Piece, allPieces } from "./Pieces"

import { CellClass } from "./Cell"

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
      if (pieces.some(piece => piece.name === randomPiece.name))
        i--
      else
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

  static RemovePieceFromRandomPieces(pieceName: string, randomPieces: Piece[]): Piece[] {
    let newRandomPieces = randomPieces.filter(piece => piece.name !== pieceName)
    if (newRandomPieces.length === 0)
      newRandomPieces = Game.GetThreeRandomPieces()

    return newRandomPieces
  }

  static GetPiecesForRemoval(cells: CellClass[][]): CellClass[] {
    let removablePieces: CellClass[] = []

    cells.forEach(row => {
      if (row.every(cell => cell.filled))
        removablePieces = removablePieces.concat(row)
    });

    for (let i = 0; i < cells[0].length; i++) {
      let column = cells.map(cell => cell[i])
      if (column.every(cell => cell.filled)) {
        removablePieces = removablePieces.concat(column)
      }
    }

    for (let i = 0; i < cells.length; i += 3) {
      for (let j = 0; j < cells.length; j += 3) {
        let threeByThree = cells.slice(i, i + 3).map(row => row.slice(j, j + 3)).flat()
        if (threeByThree.every(cell => cell.filled))
          removablePieces = removablePieces.concat(threeByThree)
      }
    }

    return removablePieces
  }

  static RemovePieces(newCells: CellClass[][], piecesForRemoval: CellClass[]) {
    piecesForRemoval.forEach(cell => {
      newCells[cell.y][cell.x].filled = false
      newCells[cell.y][cell.x].hover = false
    });
  }

  static SetCellRemoval(newCells: CellClass[][], piecesForRemoval: CellClass[]) {
    piecesForRemoval.forEach(cell => {
      newCells[cell.y][cell.x].removable = true
    });
  }

  static ClearRemovable(cells: CellClass[][]) {
    let newCells = [...cells]
    cells.forEach(row => {
      row.forEach(cell => {
        cell.removable = false
      });
    });

    return newCells
  }

  static GetScore(piecesForRemoval: CellClass[], draggedPiece: DraggedPiece): number {
    let combo = (piecesForRemoval.length / 9)
    let score = 0
    for (let i = 1; i <= combo; i++) {
      score += (i + 1) * 9
    }
    score += draggedPiece.value.flat().reduce((prev, cur) => prev + cur)

    return score
  }

  static GetThreeFirstPieces = () => [allPieces[4], allPieces[8], allPieces[4]]

}


