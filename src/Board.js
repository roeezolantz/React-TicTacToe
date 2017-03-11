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
      player1: this.props.player1,
      player2: this.props.player2,
      status: "First player : " + this.props.starter,
      gameIsRunning: true,
      squares: Array(parseInt(this.props.rows) * parseInt(this.props.cols)).fill(null),
      firstIsPlaying: this.props.starter == this.props.player1,
      currPlayer: this.props.starter,
      clearTheBoard: this.props.clearTheBoard,
      error: null,
      boxesToHighlight: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleError(location) {
    this.setState({
      errorPlace : location,
      errorMessage : "Try another spot please.."
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
    squares[location] = (this.state.currPlayer);

    const result = calculateWinner(squares);

    if (result != null) { 
      this.setState({
        gameIsRunning: false,
        squares: squares,
        status: (this.state.currPlayer) + " has won !",
        errorPlace : null,
        boxesToHighlight: result.seq,
        errorMessage : "Game Over..",
      }, this.props.onGameOver(this.state.currPlayer));
    } else if (this.boardIsFull()) {
      this.setState({
        status:"Game over..",
        errorPlace : null,
        errorMessage : "",
        gameIsRunning: false,
      }, this.props.onGameOver("tie"));
    } else {
      this.setState({
        squares: squares,
        currPlayer: this.state.firstIsPlaying ? this.state.player2 : this.state.player1,
        firstIsPlaying: !this.state.firstIsPlaying,
        errorPlace: null, 
        errorMessage:"",
        status: "Now playing : " + (this.state.firstIsPlaying ? this.state.player2 : this.state.player1)
      }, () => null)
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
    console.log(currState.error);
    var rows = Array(parseInt(this.props.rows)).fill(0).map((item, row) => {
      var cols = Array(parseInt(this.props.cols)).fill(0).map((curr, col) => {
        const squareID = ( col ) + (row * parseInt(this.props.rows));
        return (
          <Square id={squareID} key={squareID}
            onClick={this.handleClick.bind(0,squareID)}
            error={currState.errorPlace == squareID}
            highlight={currState.boxesToHighlight != null && currState.boxesToHighlight.indexOf(squareID) != -1}
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
        <StatusBar status={this.state.errorMessage}/>
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
      return {winner:squares[a], seq:lines[i]};
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