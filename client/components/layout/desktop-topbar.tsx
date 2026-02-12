'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesktopTopbarProps {
  onToggleSidebar: () => void;
}

export function DesktopTopbar({ onToggleSidebar }: DesktopTopbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="max-w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-2">
        {/* Left: Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 sm:h-11 sm:w-11"
          onClick={onToggleSidebar}
          title="Toggle sidebar"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Right: Batiyoun Logo with Pulsing Dot */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-heading font-bold text-lg sm:text-2xl bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Batiyoun
          </span>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" title="System Online" />
        </div>
      </div>
    </header>
  );
}
