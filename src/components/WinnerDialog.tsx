'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import type { WinnerDialogProps } from "../types"

export default function WinnerDialog({ isOpen, winner, onClose, onNewGame }: WinnerDialogProps) {
  const handleNewGame = () => {
    onNewGame();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl text-foreground">
            {winner ? `${winner} Wins!` : "It's a Draw!"}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {winner 
              ? `Congratulations! ${winner} has won the game!` 
              : "No one won this time. Great game!"
            }
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex gap-2 justify-center bg-background">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleNewGame} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
