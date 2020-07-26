import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Partida from './components/partida/partida';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Partida />
        </header>
      </div>
    );
  }
}

export default App;
