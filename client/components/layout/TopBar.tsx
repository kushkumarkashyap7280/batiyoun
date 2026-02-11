'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-2">
        {/* Left: Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-10 sm:w-10"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        {/* Right: Batiyoun Logo with Pulsing Dot */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-heading font-bold text-lg sm:text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Batiyoun
          </span>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" title="System Online" />
        </div>
      </div>
    </header>
  );
}
