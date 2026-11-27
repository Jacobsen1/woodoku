export class CellClass {
  filled = false
  hover = false
  removable = false
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}
