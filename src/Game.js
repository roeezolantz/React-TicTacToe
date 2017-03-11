import React from 'react';
import ReactDOM from 'react-dom'
import { createStore} from 'redux';
import { connect } from 'react-redux'

import './index.css';
import Board from './Board.js'
import RestartButton from './RestartButton.js'
import ScoreBoard from './ScoreBoard.js'

class Game extends React.Component { 

    // constructor(store) {
    //     super(store);
    //     this.state = {
    //         X: 0,
    //         O: 0,
    //         gameIsRunning: true,
    //         clearTheBoard: false
    //     };
    // }

    updateScore(winner) {
        this.props.dispatch({type: winner})
    }

    // updateScore(winner) {
    //     var objToUpdate = {gameIsRunning : false, clearTheBoard : true};
    //     switch (winner) {
    //         case ("X") :
    //             objToUpdate.X = this.state.X + 1;
    //             break;
    //         case ("O") :
    //             objToUpdate.O = this.state.O + 1;
    //             break;
    //         default :
    //             break;
    //     }

    //     this.setState(objToUpdate, () => {console.log(this.state)});
    // }

    restartGame = () => {
        this.forceUpdate.bind(this);
    }

    render() {
        return (
            <center>
        <div className="game">
            <div className="game-board">
            <Board rows="3" cols="3" clearTheBoard={this.props.score.clearTheBoard} onGameOver={this.updateScore.bind(this)}/>
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