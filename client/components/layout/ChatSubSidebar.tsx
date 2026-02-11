'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, MessageSquare, Users, Hash } from 'lucide-react';

interface ChatSubSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const chatItems = [
  { href: '/chat', label: 'Direct Messages', icon: MessageSquare },
  { href: '/chat/groups', label: 'Groups', icon: Users },
  { href: '/chat/channels', label: 'Channels', icon: Hash },
];

export function ChatSubSidebar({ isOpen, onToggle }: ChatSubSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop View - Between main nav and content */}
      <aside className={`${isOpen ? 'w-60' : 'w-0'} transition-all duration-300 bg-surface border-r border-line hidden md:flex md:flex-col overflow-hidden h-full`}>
        {isOpen && (
          <>
            {/* Header with toggle button */}
            <div className="h-12 px-4 flex items-center justify-between border-b border-line shadow-sm shrink-0">
              <h2 className="font-semibold text-default text-sm">Chats</h2>
              <button 
                onClick={onToggle}
                className="p-1.5 hover:bg-hover-surface rounded transition-colors"
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className="w-4 h-4 text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wide mb-2 px-2">
                Messages
              </h3>
              <nav className="space-y-0.5">
                {chatItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (pathname === '/chat' && item.href === '/chat');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-sm transition-colors ${
                        isActive
                          ? 'bg-hover-surface text-default font-medium'
                          : 'text-muted hover:bg-hover-surface hover:text-default'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}
      </aside>

      {/* Mobile View - Floating drawer that covers entire screen */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-60"
            onClick={onToggle}
          />
          
          {/* Drawer */}
          <div className="md:hidden fixed inset-y-0 left-0 right-0 sm:right-auto sm:w-72 bg-surface z-70 flex flex-col shadow-xl">
            {/* Header with toggle button */}
            <div className="h-12 px-4 flex items-center justify-between border-b border-line shadow-sm shrink-0">
              <h2 className="font-semibold text-default text-sm">Chats</h2>
              <button 
                onClick={onToggle}
                className="p-1.5 hover:bg-hover-surface rounded transition-colors"
                aria-label="Close sidebar"
              >
                <ChevronLeft className="w-4 h-4 text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-subtle uppercase tracking-wide mb-2 px-2">
                Messages
              </h3>
              <nav className="space-y-0.5">
                {chatItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (pathname === '/chat' && item.href === '/chat');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onToggle}
                      className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-sm transition-colors ${
                        isActive
                          ? 'bg-hover-surface text-default font-medium'
                          : 'text-muted hover:bg-hover-surface hover:text-default'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}

