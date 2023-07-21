import Grid from "@mui/material/Grid"
import Piece from "./Piece"
import { useRandomPieceStore } from "../Store/useRandomPieceStore"

const PieceSelection = () => {
  const randomPieces = useRandomPieceStore(state => state.pieces)

  return (
    <div style={{ width: "600px", height: "200px" }}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {randomPieces.map((piece, i) => {
          return <Piece piece={piece} key={i}></Piece>
        })}
      </Grid>
    </div>
  )
}

export default PieceSelection