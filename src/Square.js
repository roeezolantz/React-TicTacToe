import React, { Component } from 'react';
import './index.css';

const Square = ({children, onClick, id, error}) => {
    return (
        <button id= {id}
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