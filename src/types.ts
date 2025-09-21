export type Player = 'X' | 'O';
export type SquareValue = Player | null;
export type BoardState = SquareValue[];

export interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export interface BoardProps {
  squares: BoardState;
  onPlay: (nextSquares: BoardState, moveIndex: number) => void;
  xIsNext: boolean;
}

export interface WinnerDialogProps {
  isOpen: boolean;
  winner: Player | null;
  onClose: () => void;
  onNewGame: () => void;
}