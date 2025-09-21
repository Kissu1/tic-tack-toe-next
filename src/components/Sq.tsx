import type { SquareProps } from '../types';

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-52 xl:h-52 text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-bold flex items-center justify-center bg-background text-foreground hover:bg-accent rounded border"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}