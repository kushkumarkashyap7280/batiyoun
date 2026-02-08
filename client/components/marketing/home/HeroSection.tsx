'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EncryptionPlayground } from '@/components/marketing/home/EncryptionPlayground';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.05]" />
      
      <div className="absolute inset-0 bg-linear-to-br from-green-500/10 via-transparent to-transparent" />

      <div className="relative max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-green-400 text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            End-to-End Encrypted & Open Source
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeInUp}
            className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight"
          >
            Privacy is not a
            <br />
            <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">feature.</span>
            <br />
            <span className="text-foreground">It's the architecture.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            End-to-end encrypted messaging running entirely in your browser. No trackers. No servers reading your chats. Just you and them.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
              <Link href="/signup">
                Start Chatting
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/kushkumarkashyap7280/batiyoun" target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 w-4 h-4" />
                View Source Code
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Encryption Playground */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20"
        >
          <EncryptionPlayground />
        </motion.div>
      </div>
    </section>
  );
}
