
const CellImage = ({ cellSize, visible }: { cellSize: number, visible: boolean }) => {
  return <div data-testid="piece-cell" data-filled={visible} style={{
    width: cellSize + "px",
    height: cellSize + "px",
    backgroundImage: visible ? "url('./wood.png')" : "",
    backgroundRepeat: "repeat",
  }} />
}

export default CellImage