import React, { Component } from 'react';
import './index.css';

class Square extends Component {
  render() {
    return (
      <div className="Square">
        <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
        </button>
      </div>
    );
  }
}

export default Square;