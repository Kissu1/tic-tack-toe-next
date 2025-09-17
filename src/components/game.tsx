'use client';

import { useState } from 'react';
import Board from './GameBoard';
import type { BoardState } from '../types';

export default function Game() {
  const [history, setHistory] = useState<BoardState[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: BoardState) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <Board
        squares={currentSquares}
        xIsNext={xIsNext}
        onPlay={handlePlay}
      />
    </div>
  );
}
