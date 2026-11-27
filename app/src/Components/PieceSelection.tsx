import Piece from "./Piece"
import Stack from "@mui/material/Stack"
import { useRandomPieceStore } from "../Store/useRandomPieceStore"

const PieceSelection = () => {
  const randomPieces = useRandomPieceStore(state => state.pieces)

  return (
    <div style={{ width: "600px", height: "200px" }} data-testid="piece-selection">
      <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        {randomPieces.map((piece, i) => {
          return <Piece piece={piece} key={i}></Piece>
        })}
      </Stack>
    </div>
  )
}

export default PieceSelection
