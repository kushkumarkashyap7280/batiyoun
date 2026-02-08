'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-card border-y border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center space-y-8"
      >
        <h2 className="font-heading font-bold text-4xl md:text-5xl">
          Ready to Chat Privately?
        </h2>
        <p className="text-muted-foreground text-lg">
          No signup required to play with the encryption demo above. Just hit that button and see the keys generate in real-time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/kushkumarkashyap7280/batiyoun" target="_blank" rel="noopener noreferrer">
              <Code2 className="mr-2 w-4 h-4" />
              Read the Code
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
