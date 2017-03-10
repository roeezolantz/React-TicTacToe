import React from 'react';
import './index.css';
import Board from './Board.js'
import RestartButton from './RestartButton.js'

class Game extends React.Component {
  render() {
    return (
        <center>
      <div className="game">
        <div className="game-board">
          <Board rows="3" cols="3"/>
        </div>
        <RestartButton text="התחל משחק מחדש"></RestartButton>
      </div>
      </center>
    );
  }
}

export default Game;