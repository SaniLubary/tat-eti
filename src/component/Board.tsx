import React from 'react';
import Square from './Square';

interface IBoard {
  value?: null
}
interface IBoardState {
  squares: Array<string|null>,
  crossTurn: boolean,
  winner: string|null
}
class Board extends React.Component<IBoard, IBoardState> {
    constructor(prop: IBoard) {
      super(prop);

      this.state = {
        squares: Array(9).fill(null),
        crossTurn: true,
        winner: null
      }
    }
  
    renderSquare(i: number) {
      return (
        <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
      ); 
    }
  
    handleClick(i: number) {
      const squares = this.state.squares.slice();
      
      if (squares[i] == null) {
        squares[i] = this.state.crossTurn?'X':'O';
        const isCrossTurn = this.state.crossTurn?false:true;
        this.setState({squares: squares, crossTurn: isCrossTurn, winner: null});
      }
      
      this.checkWinner(squares)?this.setState({squares: Array(9).fill(null), crossTurn: true, winner: this.checkWinner(squares)}, () => this.setState({winner: null})):'';
    }

    checkWinner(squares: Array<string|null>) {
      let ret = null;
      const line1 = squares.slice(0,3),
            line2 = squares.slice(3,6),
            line3 = squares.slice(6),
            allLines = [line1, line2, line3];

      // horizontal line win case
      const checkLine = (line: Array<string|null>) => line.every( (square) => line[0] && line[0] === square );
      for(const line of allLines) {
        if(checkLine(line)) {
          return ret = line[0];
        }
      }

      // vertical line win case
      for (const i in line1) {
        if (line1[i] && line1[i] === (line2[i] && line3[i])) {
          return ret = line1[i];
        }
      }

      // diagonal line win case
      const diagonal_extremes = (line1[0] === line3[2])? line1[0] : ( (line1[2] === line3[0])? line1[2]:null );
      if (line2[1] && (line2[1] === (diagonal_extremes))) {
        return ret = line2[1];
      }
      
      return ret;
    }
  
    render() {
      const status = `Next player: ${this.state.crossTurn?'X':'O'}`;
      if (this.state.winner) {
        console.log(`${this.state.winner} Wins!`);
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board">
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        </div>
      );
    }
  }

  export default Board