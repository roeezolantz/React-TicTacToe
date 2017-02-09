import React from 'react';
import './index.css';
import Board from './Board.js'

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <button>התחל מחדש</button>
      </div>
    );
  }
}

export default Game;