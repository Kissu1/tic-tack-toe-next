import Square from './Square';
import type { BoardProps } from '../types';
import { calculateWinner } from '../utils/calculateWinner';

export default function Board({ squares, xIsNext, onPlay }: BoardProps) {
  const winner = calculateWinner(squares);

  function handleClick(i: number) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((value, idx) => (
          <Square
            key={idx}
            value={value}
            onSquareClick={() => handleClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
