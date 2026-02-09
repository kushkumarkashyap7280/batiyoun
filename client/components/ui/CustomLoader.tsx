'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CustomLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/95 dark:bg-slate-950/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 dark:supports-backdrop-filter:bg-slate-950/80">
      <div className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.02]" />
      <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-emerald-500/5" />

      <div className="relative flex flex-col items-center justify-center px-4 py-8 max-w-md w-full">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-2 sm:gap-3 mb-8"
        >
          <div className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Batiyoun
          </div>
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full"
            title="System Online"
          />
        </motion.div>

        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: index * 0.25,
                ease: 'easeInOut'
              }}
              className="w-2.5 h-2.5 bg-green-600 dark:bg-green-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;