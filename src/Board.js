import React from 'react';
import './index.css';
import Square from './Square.js'
import StatusBar from './StatusBar.js'

var Child = React.createClass({
  render: function() {
    return (<div className="board wrap overlay">I'm the child</div>);
  }
});

class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: "First player : X",
      gameIsRunning: true,
      squares: Array(9).fill(null),
      xIsPlaying: true,
      clearTheBoard: this.props.clearTheBoard
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleError(location) {
    this.setState({
      error: "Try another spot please.."
    });
  }

  boardIsFull() {
    var numOfFilled = this.state.squares.filter(function(curr) {
      return curr != null;
    }).length;

    return numOfFilled == this.state.squares.length;
  }

  handleTurn(location) {
    let squares = this.state.squares.slice();
    squares[location] = (this.state.xIsPlaying ? 'X' : 'O');

    const winner = calculateWinner(squares);

    if (winner != null) { 
      this.setState({
        gameIsRunning: false,
        squares: squares,
        status: (this.state.xIsPlaying ? 'X' : 'O') + " has won !",
        error: "Game Over.."
      });
      this.props.onGameOver(this.state.xIsPlaying ? 'X' : 'O');
    } else if (this.boardIsFull()) {
      this.setState({
        status:"Game over..",
        error : "",
        gameIsRunning: false,
      });
      this.props.onGameOver("tie");
    } else {
      this.setState({
        squares: squares,
        xIsPlaying: !this.state.xIsPlaying,
        error: "",
        status: "Now playing : \'" + (!this.state.xIsPlaying ? 'X' : 'O') + "\'"
      })
    }
  }

  handleClick(i) {
    if (!this.state.gameIsRunning) {
      return;
    }
    
    if(this.state.squares[i]) {
      this.handleError(i);
    } else {
      this.handleTurn(i);
    }
  }

  render() {
    let currState = this.state;
    var rows = Array(parseInt(this.props.rows)).fill(0).map((item, row) => {
      var cols = Array(parseInt(this.props.cols)).fill(0).map((curr, col) => {
        const squareID = ( col + 1 ) + (row * parseInt(this.props.rows));
        return (
          <Square key={squareID}
            onClick={this.handleClick.bind(0,squareID)}
            error={currState.error}
          >
               { currState.squares[squareID] } 
          </Square>
        )
      });
      return (<div key={row} className="board-row"> {cols} </div>);
    });
  
    return (
      <div>
        <StatusBar status={this.state.status} />
        <div className="board">
          {rows}
        </div>
        <StatusBar status={this.state.error}/>
      </div>
    );
  }
}

// {
//           !this.state.gameIsRunning
//             ? <Child />
//             : null
//         }

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

Board.PropTypes = {
  xName: React.PropTypes.string,
  oName: React.PropTypes.string,
  onGameOver: React.PropTypes.func.isRequired
};

export default Board;