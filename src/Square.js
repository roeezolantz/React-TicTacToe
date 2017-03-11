import React, { Component } from 'react';
import './index.css';

const Square = ({children, onClick, id, error, highlight}) => {
    
    const errored = {
       background: 'red',
    };
    const highlighted = {
        background: 'limegreen',
        color: 'white'
    };
    
    return (
        <button id={id}
            className="square"
            onClick={ () => onClick()} 
            style={error ? errored : (highlight ? highlighted : null)}

        >
            {children}
        </button>
    );
}

export default Square;