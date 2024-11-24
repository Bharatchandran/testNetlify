import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw } from 'lucide-react';

interface WinnerModalProps {
  winner: number;
  onReset: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Trophy className="w-16 h-16 text-yellow-400" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">
          Player {winner} Wins! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Congratulations! Would you like to play again?
        </p>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 
            bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg
            hover:from-indigo-600 hover:to-purple-600 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Play Again
        </button>
      </motion.div>
    </motion.div>
  );
}