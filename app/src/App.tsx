import './App.css';

import Grid from '@mui/material/Grid';
import MapGrid from './Components/MapGrid';
import PieceSelection from './Components/PieceSelection';
import Score from './Components/Score';

function App() {

  return (
    <div className="App">
      <Grid container direction="column" justifyContent="space-around" alignItems="center">
        <Grid item>
          <h1>Woodoku</h1>
        </Grid>
        <Grid item>
          <Score />
        </Grid>
        <Grid item>
          <MapGrid />
        </Grid>
        <Grid item>
          <PieceSelection />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
