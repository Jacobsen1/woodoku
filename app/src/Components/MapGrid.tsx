import { BOARD_SIZE, CELL_SIZE } from "../Game/constants"
import Cell from "./Cell"

const coordinates = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => ({
  x: i % BOARD_SIZE,
  y: Math.floor(i / BOARD_SIZE),
}))

const MapGrid = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(" + BOARD_SIZE + ", 1fr)",
      width: CELL_SIZE * BOARD_SIZE + 3,
      height: CELL_SIZE * BOARD_SIZE + 3,
      border: "3px solid black"
    }}>
    {coordinates.map(({ x, y }) => <Cell key={y * BOARD_SIZE + x} x={x} y={y} />)}
  </div>
)

export default MapGrid
