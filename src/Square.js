import React, { Component } from 'react';
import './index.css';

const Square = ({children, onClick, id, error}) => {
    
    const errored = {
       background: 'red',
    };
    
    return (
        <button id={id}
            className="square"
            onClick={
                () => onClick()
            } style={error ? errored : null}
        >
            {children}
        </button>
    );
}

export default Square;