import { Piece, allPieceDict, allPieces } from "./Pieces"

import { CellClass } from "../Components/Cell"

const findPiece = (pieceName: string): Piece => allPieceDict[pieceName]

export class Game {
  static PlacePiece(cells: CellClass[][], pieceName: string, x: number, y: number): CellClass[] {
    let piece = findPiece(pieceName)
    let updatedCells: CellClass[] = []
    piece.value.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) {
          //cells[x + i][y + j].filled = true
          updatedCells.push(cells[y + i][x + j])
        }
      })
    });
    return updatedCells
  }

  static GetThreeRandomPieces = () => {
    let pieces: Piece[] = []
    for (let i = 0; i < 3; i++) {
      let randomPiece = allPieces[Math.floor(Math.random() * allPieces.length)]
      pieces.push(randomPiece)
    }
    return pieces
  }

  static GetThreeFirstPieces = () => [allPieces[0], allPieces[1], allPieces[2]]

}


