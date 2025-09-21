import type { SquareProps } from '../types';

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-52 h-52 text-9xl font-bold flex items-center justify-center bg-background text-foreground hover:bg-accent rounded border"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
