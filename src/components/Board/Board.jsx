import {useState} from 'react';
import {Square} from '../Square';

import './Board.css';

export function Board(){
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner + "!";
  } else if (isCatsGame(squares)) {
    status = "Cat's Game :("
  }
    else {
    status = "Next player: " + (xIsNext ? "P" : "O");
  }

  const handleClick = (i) => {
    if (squares[i] || winner)  return;
 
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "P"
    } else {
      nextSquares[i] = "O"
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setXIsNext(true);
    const nullSquares = Array(9).fill(null);
    setSquares(nullSquares);
  }

  return (
    <div className="Game">
      <div className="Status">
        {status}
      </div>
      <button 
        className="Reset" 
        onClick={handleReset}
      >
        Reset
      </button>
      <div className="Board">
        {squares.map((value, index) => 
          <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
        )}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isCatsGame(squares){
  for(let square of squares){
    if (!square) {
      return false;
    }
  };
  return true;
};