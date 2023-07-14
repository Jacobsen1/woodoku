import Cell from "./Cell"
import { MapGridProps } from "./ComponentPropTypes/MapGridProps"

const MapGrid = ({ cells }: MapGridProps) => {

  const cellSize = cells[0][0].size

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(" + cells.length + ", 1fr)",
        width: cellSize * cells.length + 3,
        height: cellSize * cells.length + 3,
        border: "3px solid black"
      }}>
      {cells.map((row, i) => {
        return row.map((cell, j) => {
          return <Cell key={cell.key} cell={cell} cellSize={cellSize} border hover={cell.hover}></Cell>
        })
      })
      }
    </div >
  )
}

export default MapGrid