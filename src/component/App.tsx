import React, { ReactElement } from 'react';
import Game from './Game';
import '../css/App.css';

function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
