import './App.css';

import MapGrid from './Components/MapGrid';
import PieceSelection from './Components/PieceSelection';
import Score from './Components/Score';
import Stack from '@mui/material/Stack';

function App() {

  return (
    <div className="App">
      <Stack direction="column" sx={{ justifyContent: "space-around", alignItems: "center" }}>
        <h1>Woodoku</h1>
        <Score />
        <MapGrid />
        <PieceSelection />
      </Stack>
    </div>
  );
}

export default App;
