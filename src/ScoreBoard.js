import React from 'react';
import './index.css';


class ScoreBoard extends React.Component {

    render() {
        return (
            <center>
            <div className="ScoreBoard">
                X : {this.props.X}
                <br/>
                O : {this.props.O}
            </div>
            </center>
        );
    }
}

export default ScoreBoard;