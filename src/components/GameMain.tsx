'use client';

import { useState, useEffect } from 'react';
import Board from './Board';
import WinnerDialog from './WinnerDialog';
import type { BoardState } from '../types';
import { calculateWinner } from '../utils/calculateWinner';

export default function Game() {
  const [history, setHistory] = useState<BoardState[]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setShowWinnerDialog(false);
  };

  if (typeof window !== 'undefined') {
    (window as any).resetGame = resetGame;
  }

  useEffect(() => {
    if (winner) {
      setShowWinnerDialog(true);
    }
  }, [winner]);

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
      description = 'Game Start';
    } else {
      const prev = history[move - 1];
      const changedIndex = squares.findIndex((sq, i) => sq !== prev[i]);
      const row = Math.floor(changedIndex / 3) + 1;
      const col = (changedIndex % 3) + 1;
      description = `Move ${move}`;
    }

    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className={`text-left w-full px-2 py-1 rounded hover:bg-accent text-foreground ${
            move === currentMove ? 'font-bold underline bg-accent' : ''
          }`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-8">
      <div className="border border-border flex items-center justify-center p-2 sm:p-4 bg-background">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} winner={winner} />
      </div>
      
      <div className="w-full sm:w-60 flex flex-col gap-2 mt-4 sm:mt-0">
        <p className="mb-2 font-semibold text-foreground text-center sm:text-left">
          {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </p>
        <ol className="flex flex-row flex-wrap gap-1 sm:flex-col sm:flex-nowrap max-h-32 sm:max-h-none overflow-y-auto">
          {moves}
        </ol>
      </div>

      <WinnerDialog
        isOpen={showWinnerDialog}
        winner={winner}
        onClose={() => setShowWinnerDialog(false)}
        onNewGame={resetGame}
      />
    </div>
  );
}