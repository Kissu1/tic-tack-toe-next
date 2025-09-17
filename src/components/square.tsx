import type { SquareProps } from '../types';

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-full h-full text-3xl font-bold flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
