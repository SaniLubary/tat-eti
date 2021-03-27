import React, { ReactElement, useState } from 'react';
import PropTypes, { InferProps } from "prop-types";
import Square from './Square';

Board.propTypes = {
  iSquares: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null]).isRequired
  ])).isRequired,

  iCrossTurn: PropTypes.bool.isRequired,
  
  iWinner: PropTypes.oneOfType([
    PropTypes.oneOf(['X', 'O'])
  ])
}

Board.defaultProps = {
  iSquares: Array(9).fill(null),
  iCrossTurn: true
}

function Board({ iSquares, iCrossTurn, iWinner }: InferProps<typeof Board.propTypes> ): ReactElement
{
  const [squares, setSquares] = useState(iSquares),
        [crossTurn, setCrossTurn] = useState(iCrossTurn),
        [winner, setWinner] = useState(iWinner);

  const renderSquare = (i: number) => {
    return (
      <Square value={squares[i]} onClick={() => handleClick(i)} />
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
      setWinner(winner);
    }
  }

  function checkWinner(squaresArr: Array<string|null|undefined>) {
    let winner = null;
    const line1 = squaresArr.slice(0,3),
          line2 = squaresArr.slice(3,6),
          line3 = squaresArr.slice(6),
          allLines = [line1, line2, line3];

    // horizontal line win case
    const checkLine = (line: Array<string|null|undefined>) => line.every( (square) => line[0] && line[0] === square );
    for(const line of allLines) {
      if(checkLine(line)) {
        console.log('horizontal')
        return winner = line[0];
      }
    }

    // vertical line win case
    for (const i in line1) {
      if (line1[i] && (line1[i] === line2[i] && line1[i] === line3[i])) {
        console.log('vertical')
        return winner = line1[i];
      }
    }

    // diagonal line win case
    const diagonal_extremes = (line1[0] === line3[2])? line1[0] : ( (line1[2] === line3[0])? line1[2]:null );
    if (line2[1] && (line2[1] === (diagonal_extremes))) {
      console.log('diagonal')
      return winner = line2[1];
    }
    
    return winner;
  }


  return (
    <div>
      <div className="status">Next player: {crossTurn?'X':'O'}</div>
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
