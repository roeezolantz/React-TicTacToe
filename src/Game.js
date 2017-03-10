import React from 'react';
import './index.css';
import Board from './Board.js'
import RestartButton from './RestartButton.js'
import ScoreBoard from './ScoreBoard.js'

class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            X: 0,
            O: 0,
            gameIsRunning: true,
            clearTheBoard: false
        };
    }

    updateScore(winner) {
        var objToUpdate = {gameIsRunning : false, clearTheBoard : true};
        switch (winner) {
            case ("X") :
                objToUpdate.X = this.state.X + 1;
                break;
            case ("O") :
                objToUpdate.O = this.state.O + 1;
                break;
            default :
                break;
        }

        this.setState(objToUpdate, () => {console.log(this.state)});
    }

    restartGame = () => {
        this.forceUpdate.bind(this);
    }

    render() {
        return (
            <center>
        <div className="game">
            <div className="game-board">
            <Board rows="3" cols="3" clearTheBoard={this.state.clearTheBoard} onGameOver={this.updateScore.bind(this)}/>
            </div>
            {this.state.gameIsRunning ? null : <ScoreBoard X={this.state.X} O={this.state.O}></ScoreBoard>}
            <RestartButton text="התחל משחק מחדש" onClick={this.restartGame.bind(this)}></RestartButton>
        </div>
        </center>
        );
    }
}

export default Game;