import React, { Component } from 'react';
import './partida.css';

class Partida extends Component {
  constructor() {
		super();
		this.state = {
			partida: []
		}
  }
  
  componentDidMount() {
    fetch('/api/partida')
      .then( res => res.json() )
      .then( partida => this.setState({partida}, () => console.log('Partida fetched..', partida)) );
  }

  render(){
    return (
      
      <div>
        <h2>Partidas</h2>
      </div>
    );
  }
}

export default Partida;
