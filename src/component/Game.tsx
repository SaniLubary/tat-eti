import React, { ReactElement } from 'react';
import PropTypes, { InferProps } from "prop-types";
import Board from './Board';

Game.propTypes = {
  history: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ])).isRequired,
}

Game.defaultProps = {
  history: Array(9).fill(null)
}

function Game({history}: InferProps<typeof Game.propTypes> ): ReactElement
{
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