import React, { useState, useEffect } from 'react';
import { Disc, RotateCcw, Trophy } from 'lucide-react';
import { Board } from './components/Board';
import { WinnerModal } from './components/WinnerModal';
import { dropSound, winSound } from './utils/sounds';

function App() {
  const [board, setBoard] = useState<number[][]>(Array(6).fill(null).map(() => Array(7).fill(0)));
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<number | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [isDraw, setIsDraw] = useState(false);

  const checkWinner = (boardState: number[][], row: number, col: number, player: number) => {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal right
      [1, -1],  // diagonal left
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      const winning: [number, number][] = [[row, col]];

      // Check forward
      for (let i = 1; i < 4; i++) {
        const newRow = row + (dx * i);
        const newCol = col + (dy * i);
        if (
          newRow >= 0 && newRow < 6 && 
          newCol >= 0 && newCol < 7 && 
          boardState[newRow][newCol] === player
        ) {
          count++;
          winning.push([newRow, newCol]);
        } else break;
      }

      // Check backward
      for (let i = 1; i < 4; i++) {
        const newRow = row - (dx * i);
        const newCol = col - (dy * i);
        if (
          newRow >= 0 && newRow < 6 && 
          newCol >= 0 && newCol < 7 && 
          boardState[newRow][newCol] === player
        ) {
          count++;
          winning.push([newRow, newCol]);
        } else break;
      }

      if (count >= 4) {
        setWinningCells(winning);
        return true;
      }
    }
    return false;
  };

  const dropPiece = (col: number) => {
    if (winner || isDraw) return;

    const newBoard = [...board];
    // Find the lowest empty row in the selected column
    for (let row = 5; row >= 0; row--) {
      if (newBoard[row][col] === 0) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        dropSound.play();

        if (checkWinner(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
          winSound.play();
          return;
        }

        // Check for draw
        if (newBoard.every(row => row.every(cell => cell !== 0))) {
          setIsDraw(true);
          return;
        }

        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(0)));
    setCurrentPlayer(1);
    setWinner(null);
    setWinningCells([]);
    setIsDraw(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Disc 
              className={`w-8 h-8 ${currentPlayer === 1 ? 'text-yellow-400' : 'text-red-500'} 
                ${!winner && !isDraw ? 'animate-bounce' : ''}`}
            />
            <h1 className="text-2xl font-bold text-white">
              {winner 
                ? `Player ${winner} Wins!` 
                : isDraw 
                ? "It's a Draw!" 
                : `Player ${currentPlayer}'s Turn`}
            </h1>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 
              rounded-lg text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <Board 
          board={board} 
          dropPiece={dropPiece} 
          winningCells={winningCells}
          currentPlayer={currentPlayer}
        />
      </div>

      {winner && (
        <WinnerModal 
          winner={winner} 
          onReset={resetGame}
        />
      )}
    </div>
  );
}

export default App;