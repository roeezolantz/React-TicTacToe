import React from 'react';
import './index.css';
import Square from './Square.js'
import StatusBar from './StatusBar.js'

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "First player : X",
      squares: Array(9).fill(null),
      xIsPlaying: true
    };
  }

  handleError(location) {
    this.setState({
      error: "Try another spot please.."
    });
  }

  handleWin(location) {
    this.setState({
      status: this.state.xIsPlaying ? 'X' : 'O' + " has won !"
    });
  }

  boardIsFull() {
    var numOfFilled = this.state.squares.filter(function(curr) {
      return curr != null;
    }).length;

    return numOfFilled == this.state.squares.length;
  }

  gameOver() {
    this.setState({
      status:"Game over.."
    })
  }

  handleTurn(location) {
    let squares = this.state.squares;
    squares[location] = this.state.xIsPlaying ? 'X' : 'O';

    this.setState({
      squares: squares,
    });

    const winner = calculateWinner(this.state.squares);

    if (winner != null) 
      this.handleWin(location);
    else if (this.boardIsFull())
      this.gameOver();

    this.setState({
      xIsPlaying: !this.state.xIsPlaying,
      status: !this.state.xIsPlaying ? 'X' : 'O' + 'Is now playing : '
    })
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    
    if(squares[i]) {
      this.handleError(i);
    } else {
      this.setState({
        error: ""
      });
      this.handleTurn(i);
    }


    // if (winner) {
    //   tempStatus = 'Winner: ' + winner;
    // } else if (squares[i]) {
    //   errorMessage = "Try another spot please.."
    //   this.setState({
    //     error: errorMessage
    //   });
    // } else {
    //   tempStatus = 'Now playing : ' + (!this.state.xIsPlaying ? 'X' : 'O');
    //   squares[i] = this.state.xIsPlaying ? 'X' : 'O';
      
    //   this.setState({
    //     squares: squares,
    //     error: "",
    //     xIsPlaying: !this.state.xIsPlaying
    // });
    // }

    // this.setState({
    //   status: tempStatus,
    // });
  }
  
  renderSquare(i) {
    return <Square value={this.state.squares[i]} error={this.state.error} onClick={() => this.handleClick(i)}/>;
  }
  render() {
    return (
      <div>
        <StatusBar status={this.state.status} />
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
        <StatusBar status={this.state.error}/>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;