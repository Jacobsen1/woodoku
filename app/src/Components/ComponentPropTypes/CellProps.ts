import { CellClass } from "../../Game/Cell"

export type CellProps = {
  cellSize: number
  cell: CellClass
  border?: boolean
  hover?: boolean
}