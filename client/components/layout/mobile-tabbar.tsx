'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Settings, User } from 'lucide-react';

export function MobileTabbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-line">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        <Link
          href="/chat"
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
            pathname?.startsWith('/chat')
              ? 'bg-hover-surface text-default'
              : 'text-muted hover:bg-hover-surface hover:text-default'
          }`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs font-medium">Chat</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
            pathname?.startsWith('/profile')
              ? 'bg-hover-surface text-default'
              : 'text-muted hover:bg-hover-surface hover:text-default'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
            pathname?.startsWith('/settings')
              ? 'bg-hover-surface text-default'
              : 'text-muted hover:bg-hover-surface hover:text-default'
          }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs font-medium">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
