// eslint-disable-next-line
import React, { ReactElement, useEffect, useState } from 'react';
// eslint-disable-next-line
import PropTypes, { arrayOf, InferProps } from "prop-types";
import Board from './Board';
import Button from 'react-bootstrap/Button';

Game.propTypes = { 
  history:PropTypes.arrayOf(
    PropTypes.shape({
      squares: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.oneOf([null])
        ])
      ).isRequired
    }).isRequired
  ).isRequired,
  
  crossTurn: PropTypes.bool.isRequired,
}

Game.defaultProps = {
  history: [{squares: Array(9).fill(null)}],
  crossTurn: true
}

function Game({history, crossTurn}: InferProps<typeof Game.propTypes> ): ReactElement
{
  const [state_history, setHistory] = useState(history),
        [state_crossTurn, setCrossTurn] = useState(crossTurn),
        current = state_history[state_history.length -1],
        winner = checkWinner(current.squares);
        
  function checkWinner(squaresArr: Array<string|null|undefined>) {
    let winner = null;
    const line1 = squaresArr.slice(0,3),
          line2 = squaresArr.slice(3,6),
          line3 = squaresArr.slice(6),
          allLines = [line1, line2, line3];

    // horizontal line win case
    const checkLine = (line: Array<string|null|undefined>) => line.every( (state_square) => line[0] && line[0] === state_square );
    for(const line of allLines) {
      if(checkLine(line)) {
        return winner = line[0];
      }
    }

    // vertical line win case
    for (const i in line1) {
      if (line1[i] && (line1[i] === line2[i] && line1[i] === line3[i])) {
        return winner = line1[i];
      }
    }

    // diagonal line win case
    const diagonal_extremes = (line1[0] === line3[2])? line1[0] : ( (line1[2] === line3[0])? line1[2]:null );
    if (line2[1] && (line2[1] === (diagonal_extremes))) {
      return winner = line2[1];
    }
    
    return winner;
  }
        
  /**
   * Method for Square onclick
   * @param i Square's id, is set by Board's renderSquare(i)
   */
  const handleSquareClick = (i: number) => {
    let history = state_history;
    const current = state_history[state_history.length -1];
    const squares = current.squares.slice();
    
    if (checkWinner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = state_crossTurn?'X':'O';
    history = history.concat([{squares: squares}])
    setHistory(history);
    setCrossTurn(!state_crossTurn);

  }

  const handleTime = (i: number) => {
    console.log('wassup', i);
  }

  const handleRestart = () => {
    console.log('way sup');
  }
  

  const status = winner? `Winner: ${winner}`:`Next Player: ${state_crossTurn?'X':'O'}`;
  
  return (
    <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i: number) => handleSquareClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            <li className='btn'>
              <Button variant='info' onClick={ () => handleTime(-1) }>last move</Button>
            </li>
            <li className='btn'>
              <Button variant='info' onClick={ () => handleTime(1) }>next move</Button>
            </li>
          </ol>

          <Button variant='warning' onClick={ () => handleRestart() }>Restart</Button>
        </div>
      </div>
  )
}

export default Game;