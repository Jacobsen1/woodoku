
export class CellClass {
  filled: boolean = false
  hover: boolean = false
  size = 50
  key: number
  x: number
  y: number

  constructor(key: number, x: number, y: number) {
    this.key = key
    this.x = x
    this.y = y
  }
}