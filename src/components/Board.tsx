import Square from './Sq';
import type { BoardProps } from '../types';
import type { Player } from '../types';

export default function Board({ squares, onPlay, xIsNext, winner }: BoardProps & { winner: Player | null }) {
  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares,i);
  }

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onSquareClick={() => handleClick(idx)}
        />
      ))}
    </div>
  );
}
