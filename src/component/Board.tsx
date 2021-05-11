import React, { ReactElement } from 'react';
import PropTypes, { InferProps } from "prop-types";
import Square from './Square';

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null])
    ])
  ).isRequired,

  onClick: PropTypes.any.isRequired
}

function Board({ squares, onClick }: InferProps<typeof Board.propTypes> ): ReactElement
{
  const renderSquare = (i: number) => {
    return (
      <Square value={squares[i]} onClick={ () => onClick(i) } />
    ); 
  }

  return (
    <div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  )
}

export default Board
