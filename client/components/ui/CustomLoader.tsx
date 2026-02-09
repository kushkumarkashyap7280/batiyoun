'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CustomLoaderProps {
  isVisible?: boolean;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    shimmer: {
      x: ['-100%', '100%'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background/95 dark:bg-slate-950/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 dark:supports-backdrop-filter:bg-slate-950/80"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.05] dark:bg-grid-small-white/[0.02]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-green-500/5 via-transparent to-emerald-500/5" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center px-4 py-8 max-w-md w-full">
        
        {/* Brand Logo matching navbar exactly */}
        <motion.div
          variants={logoVariants}
          className="flex items-center gap-2 sm:gap-3 mb-12"
        >
          <div className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Batiyoun
          </div>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded-full animate-pulse" title="System Online" />
        </motion.div>

        {/* Loading Text with Shimmer */}
        <motion.div
          variants={textVariants}
          className="relative overflow-hidden mb-8"
        >
          <div className="text-sm sm:text-base font-medium text-foreground/70 dark:text-white/70 px-6 py-3 rounded-xl bg-green-50/40 dark:bg-green-950/15 border border-green-200/20 dark:border-green-800/20 text-center">
            <span>Establishing secure connection...</span>
            <motion.div
              variants={shimmerVariants}
              animate="shimmer"
              className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-green-400/15 to-transparent"
            />
          </div>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          variants={textVariants}
          className="flex items-center gap-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
              className="w-2.5 h-2.5 bg-green-600 dark:bg-green-400 rounded-full"
            />
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default CustomLoader;