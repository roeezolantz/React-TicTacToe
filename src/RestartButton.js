import React from 'react';
import './RestartButton.css';

class RestartButton extends React.Component {

  render() {
    return (
        <div>
            <a href="#" className="button" onClick={() => this.props.onClick()}>{this.props.text}</a>
	    </div>
    );
  }
}

export default RestartButton;

