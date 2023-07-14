import './App.css';

import { Game } from './Game/Game';
import Grid from '@mui/material/Grid';
import MapGrid from './Components/MapGrid';
import Piece from './Components/Piece';
import { useCellsStore } from './Store/useCellsStore';
import { useState } from 'react';

function App() {
  const [randomPieces] = useState(Game.GetThreeRandomPieces())
  const cells = useCellsStore((state) => state.cells)

  return (
    <div className="App">
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item>
          <h1>Woodoku</h1>
        </Grid>
        <Grid item>
          <MapGrid cells={cells} />
        </Grid>
        <Grid item style={{ display: "flex" }}>
          {randomPieces.map((piece, i) => {
            return <Piece piece={piece} key={i}></Piece>
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
