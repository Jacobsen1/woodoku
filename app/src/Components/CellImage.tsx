
const CellImage = ({ cellSize, visible }: { cellSize: number, visible: boolean }) => {
  return <div style={{
    width: cellSize + "px",
    height: cellSize + "px",
    backgroundImage: visible ? "url('./wood.png')" : "",
    backgroundRepeat: "repeat",
  }} />
}

export default CellImage