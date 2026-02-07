'use client';

import React, { useState, useEffect } from 'react';
import { Github, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/zustandUserStore';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const isDark = useUserStore((state) => state.isDark);
  const toggleTheme = useUserStore((state) => state.toggleTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="font-heading font-bold text-2xl bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Batiyoun
          </div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" title="System Online" />
        </Link>

        {/* Right: Source Code & Auth */}
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a
              href="https://github.com/kushkumarkashyap7280/batiyoun"
              target="_blank"
              rel="noopener noreferrer"
              title="View source code on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/signup">Initialize Uplink</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
