import Square from './Square';
import type { BoardProps, BoardState } from '../types';

export default function Board({ squares, xIsNext, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i]) return;

    const nextSquares: BoardState = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="font-semibold">Next player: {xIsNext ? 'X' : 'O'}</div>
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
