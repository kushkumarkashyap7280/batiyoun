'use client';

import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  'RSA-OAEP',
  'AES-256-GCM',
  'IndexedDB',
  'WebSocket',
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind CSS v4',
  'kush-e2e',
  'End-to-End Encrypted',
];

export function TechStackTicker() {
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section className="py-16 px-4 overflow-hidden bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest">
            ✓ Built with auditable, open-source technology
          </p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {duplicatedStack.map((tech, index) => (
              <div
                key={`${tech}-${index}`}
                className="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-full hover:border-green-500/50 hover:shadow-md transition-all shrink-0"
              >
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="font-semibold text-sm whitespace-nowrap">
                  {tech}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Gradient fade effects */}
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-card to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-card to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
