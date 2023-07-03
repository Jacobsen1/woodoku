import './App.css';

import MapGrid from './Components/MapGrid';

function App() {
  return (
    <div className="App">
      <MapGrid rows={10} cols={10} />
    </div>
  );
}

export default App;
