import React from 'react';
import { motion } from 'framer-motion';

interface BoardProps {
  board: number[][];
  dropPiece: (col: number) => void;
  winningCells: [number, number][];
  currentPlayer: number;
}

export const Board: React.FC<BoardProps> = ({ 
  board, 
  dropPiece, 
  winningCells,
  currentPlayer 
}) => {
  const isWinningCell = (row: number, col: number) => {
    return winningCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="grid grid-cols-7 gap-2 bg-blue-800 p-4 rounded-lg">
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <motion.div
            key={`${rowIndex}-${colIndex}`}
            className="relative w-12 h-12 bg-blue-700 rounded-full cursor-pointer 
              hover:bg-blue-600 transition-colors"
            onClick={() => dropPiece(colIndex)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cell !== 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute inset-1 rounded-full 
                  ${cell === 1 ? 'bg-yellow-400' : 'bg-red-500'}
                  ${isWinningCell(rowIndex, colIndex) ? 'animate-pulse shadow-lg' : ''}
                `}
              />
            )}
            {cell === 0 && (
              <div 
                className={`absolute inset-1 rounded-full transition-opacity duration-200 opacity-0
                  hover:opacity-20 ${currentPlayer === 1 ? 'bg-yellow-400' : 'bg-red-500'}`}
              />
            )}
          </motion.div>
        ))
      ))}
    </div>
  );
}