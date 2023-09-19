import {useState} from 'react';

import './Square.css';

export function Square({value, onSquareClick}) {
  return (
    <button 
      className="Square" 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}