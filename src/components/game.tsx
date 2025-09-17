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

  function handlePlay(nextSquares: BoardState, moveIndex: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(currentSquares);

  return (
    <div className="flex gap-8">
      <div>
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
      </div>
      <div>
        <p className="mb-2">
          {winner
            ? `Winner: ${winner}`
            : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </p>
        <ol>
          {history.map((squares, move) => {
            let description: string;
            if (move === 0) {
              description = 'Go to game start';
            } else {
              // find the move that changed
              const prev = history[move - 1];
              const changedIndex = squares.findIndex(
                (sq, i) => sq !== prev[i]
              );
              const row = Math.floor(changedIndex / 3) + 1;
              const col = (changedIndex % 3) + 1;
              description = `Go to move #${move} (${col}, ${row})`;
            }

            return (
              <li key={move}>
                <button
                  onClick={() => jumpTo(move)}
                  className={`${
                    move === currentMove ? 'font-bold underline' : ''
                  }`}
                >
                  {description}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
