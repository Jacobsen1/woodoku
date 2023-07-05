export class Piece {
  value: number[][]
  name: string

  constructor(value: number[][], name: string) {
    this.value = value
    this.name = name
  }
}

const Joe =
  [[0, 1, 0],
  [1, 1, 1],
  [0, 1, 0]]

const Mac =
  [[1, 0],
  [1, 1]]

const Richard =
  [[0, 1, 0],
  [0, 1, 0],
  [1, 1, 1]]

const LilRichie =
  [[0, 0, 0],
  [0, 1, 0],
  [1, 1, 1]]

const Craig =
  [[1, 1],
  [1, 1]]

const Caden =
  [[1, 0, 0],
  [1, 0, 0],
  [1, 1, 1]]

const TheWorm =
  [[1, 0, 0],
  [1, 1, 0],
  [0, 1, 0]]

const Dot =
  [[1]]

const TwoDot =
  [[0, 0],
  [1, 1]]

const ThreeDot =
  [[0, 0, 0],
  [0, 0, 0],
  [1, 1, 1]]

const FourDot =
  [[0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 1]]

const FiveDot =
  [[0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1]]

const Luigi =
  [[1, 0, 0],
  [1, 0, 0],
  [1, 1, 0]]

const Waluigi =
  [[0, 1, 0],
  [0, 1, 0],
  [1, 1, 0]]

const EvilWorm =
  [[0, 1, 0],
  [1, 1, 0],
  [1, 0, 0]]

const Stair =
  [[0, 1],
  [1, 0]]

const ThreeStair =
  [[0, 0, 1],
  [0, 1, 0],
  [1, 0, 0]]

const FourStair =
  [[0, 0, 0, 1],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [1, 0, 0, 0]]


const TheHelmet =
  [[1, 1, 1],
  [1, 0, 1],
  [0, 0, 0]]


export const allPieces = [
  new Piece(Joe, "Joe"),
  new Piece(Mac, "Mac"),
  new Piece(Richard, "Richard"),
  new Piece(LilRichie, "LilRichie"),
  new Piece(Craig, "Craig"),
  new Piece(Caden, "Caden"),
  new Piece(TheWorm, "TheWork"),
  new Piece(Dot, "Dot"),
  new Piece(TwoDot, "TwoDot"),
  new Piece(ThreeDot, "ThreeDot"),
  new Piece(FourDot, "FourDot"),
  new Piece(FiveDot, "FiveDot"),
  new Piece(Luigi, "Luigi"),
  new Piece(Waluigi, "Waluigi"),
  new Piece(EvilWorm, "EvilWork"),
  new Piece(Stair, "Stair"),
  new Piece(ThreeStair, "ThreeStair"),
  new Piece(FourStair, "FourStair"),
  new Piece(TheHelmet, "TheHelmet")
]

export const allPieceDict = Object.fromEntries(allPieces.map(x => [x.name, x]))