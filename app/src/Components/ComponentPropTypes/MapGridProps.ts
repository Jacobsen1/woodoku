import { CellClass } from './../Cell';
export type MapGridProps = {
  cells: CellClass[][]
  placePiece: (pieceName: string, x: number, y: number) => void
}