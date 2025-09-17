'use client';

import { useState } from 'react';
import Board from './gameBoard';
import type { BoardState } from '../types';

export default function Game() {
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));

  function handlePlay(i: number) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X'; // placeholder, always X for now
    setSquares(nextSquares);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Tic Tac Toe (UI Only)</h1>
      <Board squares={squares} onPlay={handlePlay} />
    </div>
  );
}
