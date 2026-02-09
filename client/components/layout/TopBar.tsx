'use client';

import { Menu, Shield } from 'lucide-react';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <header className="h-16 w-full border-b border-(--border-color) dark:border-(--border-color-dark) backdrop-blur-md bg-white/70 dark:bg-(--bg-secondary-dark)/70 sticky top-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Toggle + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-(--hover-bg) dark:hover:bg-(--hover-bg-dark) rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-(--text-primary) dark:text-(--text-primary-dark)" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-(--text-primary) dark:text-(--text-primary-dark) hidden sm:block">
              Batiyoun
            </span>
          </div>
        </div>

        {/* Right: User info placeholder */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-(--text-primary) dark:text-(--text-primary-dark)">
              User Name
            </span>
            <span className="text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark)">
              Online
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
