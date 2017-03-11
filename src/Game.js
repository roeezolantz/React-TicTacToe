import React from 'react';
import ReactDOM from 'react-dom'
import { createStore} from 'redux';
import { connect } from 'react-redux'

import './index.css';
import Board from './Board.js'
import RestartButton from './RestartButton.js'
import ScoreBoard from './ScoreBoard.js'

class Game extends React.Component { 

    updateScore(winner) {
        this.props.dispatch({type: winner})
    }

    restartGame = () => {
        this.forceUpdate.bind(this);
    }

    render() {
        return (
            <center>
        <div className="game">
            <div className="game-board">
                <Board player1="X" player2="Y" starter="X" rows="3" cols="3" clearTheBoard={this.props.score.clearTheBoard} onGameOver={this.updateScore.bind(this)}/>
            </div>
            {this.props.score.gameIsRunning ? null : <ScoreBoard X={this.props.score.X} O={this.props.score.O}></ScoreBoard>}
            <RestartButton text="התחל משחק מחדש" onClick={this.restartGame.bind(this)}></RestartButton>
        </div>
        </center>
        );
    }
}

export default connect((store) => {
    return {
        ...store
        // X: store.score.X,
        // O: store.score.O,
        // gameIsRunning: store.score.gameIsRunning,
        // clearTheBoard: store.score.clearTheBoard
    }
})(Game);