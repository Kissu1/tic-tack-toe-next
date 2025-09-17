'use client';

import { useState } from 'react';
import Board from './gameBoard';
import type { BoardState } from '../types';
import { calculateWinner } from '../utils/calculateWinner';

export default function Game() {
  const [history, setHistory] = useState<BoardState[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  function handlePlay(nextSquares: BoardState) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description: string;
    if (move === 0) {
      description = 'Go to game start';
    } else {
      const prev = history[move - 1];
      const changedIndex = squares.findIndex((sq, i) => sq !== prev[i]);
      const row = Math.floor(changedIndex / 3) + 1;
      const col = (changedIndex % 3) + 1;
      description = `Go to move #${move} (${col}, ${row})`;
    }

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={`text-left w-full px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
            move === currentMove ? 'font-bold underline bg-gray-100 dark:bg-gray-800' : ''
          }`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col sm:flex-row gap-8 p-4 sm:p-8">
      <div className="w-72 h-72 border border-gray-300 border-solid flex items-center justify-center">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
      </div>
      <div className="w-60 max-h-72 overflow-y-auto flex flex-col gap-2">
        <p className="mb-2 font-semibold">
          {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </p>
        <ol className="flex flex-col gap-1">{moves}</ol>
      </div>
    </div>
  );
}
