'use client';

import { PanelLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export function FloatingToggle({ onClick, isOpen }: FloatingToggleProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-linear-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <PanelLeft className="w-6 h-6" />
      </motion.div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-green-400/20 to-emerald-500/20 animate-ping opacity-75" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 px-3 py-2 bg-black/90 text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
        {isOpen ? 'Hide' : 'Show'} Navigation
      </div>
    </motion.button>
  );
}
