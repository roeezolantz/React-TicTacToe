import React, { Component } from 'react';
import './index.css';

const Square = ({children, onClick}) => {
    return (
        <button
            className="square"
            onClick={
                () => onClick()
            }
        >
            {children}
        </button>
    );
}

export default Square;