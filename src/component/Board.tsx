import React, { ReactElement, useState } from 'react';
import PropTypes, { InferProps } from "prop-types";
import Square from './Square';

Board.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      square: PropTypes.arrayOf(
        PropTypes.oneOf(['X','O',null])
      )
    })
  ).isRequired,

  onClick: PropTypes.any.isRequired
}

function Board({ history, onClick }: InferProps<typeof Board.propTypes> ): ReactElement
{
  const renderSquare = (i: number) => {
    return (
      <Square value={history[i]} onClick={() => handleClick(i)} />
    ); 
  }

  const handleClick = (i: number) => {
    const squaresArr = squares.slice();
    
    if (squaresArr[i] == null) {
      squaresArr[i] = crossTurn?'X':'O';
      const isCrossTurn = crossTurn?false:true;
      setSquares(squaresArr);
      setCrossTurn(isCrossTurn);
    }
    
    const player = checkWinner(squaresArr)
    if (player) {
      setSquares(Array(9).fill(null));
      setCrossTurn(crossTurn);
      setWinner(player);
    }
  }

  const checkWinner = (squaresArr: Array<string|null|undefined>) => {
    let winner = null;
    const line1 = squaresArr.slice(0,3),
          line2 = squaresArr.slice(3,6),
          line3 = squaresArr.slice(6),
          allLines = [line1, line2, line3];

    // horizontal line win case
    const checkLine = (line: Array<string|null|undefined>) => line.every( (square) => line[0] && line[0] === square );
    for(const line of allLines) {
      if(checkLine(line)) {
        winner = line[0];
      }
    }

    // vertical line win case
    for (const i in line1) {
      if (line1[i] && (line1[i] === line2[i] && line1[i] === line3[i])) {
        winner = line1[i];
      }
    }

    // diagonal line win case
    const diagonal_extremes = (line1[0] === line3[2])? line1[0] : ( (line1[2] === line3[0])? line1[2]:null );
    if (line2[1] && (line2[1] === (diagonal_extremes))) {
      winner = line2[1];
    }
    
    return winner;
  }
  
  let status;
  if (winner) {
    status = <div><p>{winner} Won!</p><p>Starts X</p></div>;
  } else status = `Next player: ${crossTurn?'X':'O'}`; 

  return (
    <div>
      <div className="status">{status}</div>
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
