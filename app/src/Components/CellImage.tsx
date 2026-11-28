import { CELL_SIZE } from "../Game/constants"
import { WOOD_TEXTURE } from "../Game/textures"

const CellImage = ({ visible }: { visible: boolean }) => (
  <div data-testid="piece-cell" data-filled={visible} style={{
    width: CELL_SIZE + "px",
    height: CELL_SIZE + "px",
    backgroundImage: visible ? WOOD_TEXTURE : "",
    backgroundRepeat: "repeat",
  }} />
)

export default CellImage
