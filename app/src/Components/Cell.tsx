import { CellProps } from "./ComponentPropTypes/CellProps"
import { memo } from "react"

const Cell = memo(({ cellSize, cell, image, border }: CellProps) => {
  return image ? (
    <div style={{ width: cellSize + "px", height: cellSize + "px", backgroundImage: "url('./wood.png')", backgroundRepeat: "repeat" }} />
  ) : (
    <div
      style={{
        width: cellSize - 2 + "px",
        height: cellSize - 2 + "px",
        border: border ? "1px solid black" : "",
        backgroundImage: cell?.filled ? "url('./wood.png')" : ""
      }} />
  )
})

export default Cell


export class CellClass {
  filled: boolean = false
  key: number
  x: number
  y: number

  constructor(key: number, x: number, y: number) {
    this.key = key
    this.x = x
    this.y = y
  }

  static Init(cols: number, rows: number): CellClass[][] {
    let cells: CellClass[][] = []
    let key = 0
    for (let i = 0; i < cols; i++) {
      let row: CellClass[] = []
      for (let j = 0; j < rows; j++) {
        row.push(new CellClass(key, i, j))
        key++
      }
      cells.push(row)
    }
    return cells
  }
}