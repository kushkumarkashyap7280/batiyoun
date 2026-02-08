'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Atom, 
  FileCode2, 
  Database, 
  Leaf, 
  Circle, 
  Plug, 
  Box, 
  Palette, 
  Film, 
  Package, 
  Lock, 
  HardDrive, 
  CheckCircle2, 
  Server 
} from 'lucide-react';

const techStack = [
  { name: 'Next.js 16', Icon: Zap },
  { name: 'React 19', Icon: Atom },
  { name: 'TypeScript', Icon: FileCode2 },
  { name: 'Prisma', Icon: Database },
  { name: 'MongoDB', Icon: Leaf },
  { name: 'Redis', Icon: Circle },
  { name: 'Socket.io', Icon: Plug },
  { name: 'PostgreSQL', Icon: Box },
  { name: 'Tailwind v4', Icon: Palette },
  { name: 'Framer Motion', Icon: Film },
  { name: 'Zustand', Icon: Package },
  { name: 'kush-e2e', Icon: Lock },
  { name: 'IndexedDB', Icon: HardDrive },
  { name: 'Zod', Icon: CheckCircle2 },
  { name: 'Express', Icon: Server },
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
            className="flex gap-6 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {duplicatedStack.map((tech, index) => {
              const Icon = tech.Icon;
              return (
                <div
                  key={`${tech.name}-${index}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg hover:border-green-500/50 hover:shadow-md transition-all shrink-0"
                >
                  <Icon className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-sm whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Gradient fade effects */}
          <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-card to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-card to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
