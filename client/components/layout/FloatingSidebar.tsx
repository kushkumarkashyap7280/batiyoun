'use client';

import { MessageSquare, Settings, User, Lock, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FloatingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: MessageSquare, label: 'Chats', href: '/chat' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: Lock, label: 'Privacy', href: '/privacy' },
];

export function FloatingSidebar({ isOpen, onClose }: FloatingSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative h-full bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md border-r border-(--border-color) dark:border-(--border-color-dark) transition-all duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } w-64 md:w-16`}
      >
        {/* Close button - Mobile only */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-(--hover-bg) dark:hover:bg-(--hover-bg-dark) rounded-lg md:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-(--text-primary) dark:text-(--text-primary-dark)" />
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 p-3 mt-16 md:mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all group relative ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-(--hover-bg) dark:hover:bg-(--hover-bg-dark) text-(--text-secondary) dark:text-(--text-secondary-dark)'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="md:hidden font-medium">{item.label}</span>
                
                {/* Tooltip for desktop */}
                <span className="hidden md:group-hover:block absolute left-full ml-2 px-3 py-2 bg-(--bg-tertiary) dark:bg-(--bg-tertiary-dark) text-(--text-primary) dark:text-(--text-primary-dark) text-sm rounded-lg whitespace-nowrap shadow-lg z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 transition-all group relative mt-auto"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="md:hidden font-medium">Logout</span>
            
            {/* Tooltip for desktop */}
            <span className="hidden md:group-hover:block absolute left-full ml-2 px-3 py-2 bg-(--bg-tertiary) dark:bg-(--bg-tertiary-dark) text-(--text-primary) dark:text-(--text-primary-dark) text-sm rounded-lg whitespace-nowrap shadow-lg z-50">
              Logout
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
}
