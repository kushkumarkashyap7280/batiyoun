'use client';

import { Bell, Shield, Palette, Globe, Key, Database, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SettingsSubSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const settingsItems = [
  { icon: Bell, label: 'Notifications', href: '/settings/notifications' },
  { icon: Shield, label: 'Privacy & Safety', href: '/settings/privacy' },
  { icon: Palette, label: 'Appearance', href: '/settings/appearance' },
  { icon: Globe, label: 'Language', href: '/settings/language' },
  { icon: Key, label: 'Encryption Keys', href: '/settings/keys' },
  { icon: Database, label: 'Data & Storage', href: '/settings/data' },
];

export function SettingsSubSidebar({ isOpen, onToggle }: SettingsSubSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${isOpen ? 'w-60' : 'w-0'} transition-all duration-300 bg-surface border-r border-line hidden md:flex md:flex-col overflow-hidden transition-theme`}>
      {isOpen && (
        <>
          {/* Header with toggle button */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-line shadow-sm shrink-0">
            <h2 className="font-semibold text-default text-sm">Settings</h2>
            <button 
              onClick={onToggle}
              className="p-1.5 hover:hover-surface rounded transition-colors"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className="w-4 h-4 text-muted" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-semibold text-subtle uppercase tracking-wide mb-2 px-2">
              User Settings
            </h3>
            <nav className="space-y-0.5">
              {settingsItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href === '/settings/notifications' && pathname === '/settings');

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-sm transition-colors ${
                      isActive
                        ? 'bg-hover-surface text-default'
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
  );
}
