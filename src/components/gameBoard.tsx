import Square from './Square';
import type { BoardProps } from '../types';

export default function Board({ squares, onPlay }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onSquareClick={() => onPlay(idx)}
        />
      ))}
    </div>
  );
}
