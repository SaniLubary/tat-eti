import PropTypes, { InferProps } from 'prop-types';
import React, { ReactElement } from 'react';
import Board from './Board';

Game.propTypes = {
  iHistory:  PropTypes.arrayOf(
    PropTypes.shape({
      square: PropTypes.arrayOf(
        PropTypes.oneOf(['X','O',null])
      )
    })
  ).isRequired,

  iCrossTurn: PropTypes.bool.isRequired,
  
  iWinner: PropTypes.oneOfType([
    PropTypes.oneOf(['X', 'O'])
  ])
}

Game.defaultProps = {
  iHistory: [
    {
      square: Array(9).fill(null),
    }
  ],
  
  iCrossTurn: true
}

function Game({ iHistory, iCrossTrun, iWinner }: InferProps<typeof Game.propTypes> ): ReactElement
{
  render():ReactElement {
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
    );
  }
}

export default Game;