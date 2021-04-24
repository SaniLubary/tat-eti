import React, { ReactElement, useState } from 'react';
import PropTypes, { InferProps } from "prop-types";
import Board from './Board';

Game.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.oneOf([null]).isRequired
    ])
  )).isRequired,

  crossTurn: PropTypes.bool.isRequired,
}

Game.defaultProps = {
  history: Array(9).fill(null),
  crossTurn: true
}

function Game({history, crossTurn}: InferProps<typeof Game.propTypes> ): ReactElement
{
  const [state_history, setHistory] = useState(history),
        [state_crossTurn, setCrossTurn] = useState(crossTurn);
  
  return (
    <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
  )
}

export default Game;