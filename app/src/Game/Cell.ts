
export class CellClass {
  filled: boolean = false
  hover: boolean = false
  removable: boolean = false
  size = 50
  key: number
  x: number
  y: number

  constructor(key: number, x: number, y: number) {
    this.key = key
    this.x = x
    this.y = y
  }

  static printFilled(cells: CellClass[][]): void {
    let printableCells = cells.map(row => row.map(cell => cell.filled))
    console.table(printableCells)
  }
}

