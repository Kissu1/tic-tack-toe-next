import type { SquareProps } from '../types';

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 border border-gray-400 text-2xl font-bold flex items-center justify-center"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
