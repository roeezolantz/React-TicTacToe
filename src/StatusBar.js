import React from 'react';
import './index.css';

class StatusBar extends React.Component {
  render() {
    return (
        <div className="status">
            <p>{this.props.status}</p>
        </div>
    );
  }
}

export default StatusBar;

