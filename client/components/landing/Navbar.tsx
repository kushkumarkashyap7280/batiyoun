'use client';

import React, { useState, useEffect } from 'react';
import { Github, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/store/zustandUserStore';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { isDark, toggleTheme } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity shrink-0">
          <div className="font-heading font-bold text-lg sm:text-2xl bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Batiyoun
          </div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" title="System Online" />
        </Link>

        {/* Right: Source Code & Auth */}
        <div className="flex gap-1.5 sm:gap-3 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10"
            asChild
          >
            <a
              href="https://github.com/kushkumarkashyap7280/batiyoun"
              target="_blank"
              rel="noopener noreferrer"
              title="View source code on GitHub"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-10 sm:w-10"
            onClick={toggleTheme}
            title="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>

          <Button variant="ghost" size="sm" className="text-xs sm:text-sm hidden xs:inline-flex" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-2.5 sm:px-4" asChild>
            <Link href="/signup" className="whitespace-nowrap">
              <span className="hidden sm:inline">Initialize Uplink</span>
              <span className="sm:hidden">Sign Up</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
