import React, { useState } from 'react';
import './App.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handleClick(i) {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    const nextSquares = currentSquares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={currentSquares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={currentSquares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={currentSquares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={currentSquares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={currentSquares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={currentSquares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={currentSquares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <ol>{moves}</ol>
    </>
  );
}

function App() {
  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

export default App;