'use client';

import { Bell, Shield, Palette, Globe, Key, Database } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SettingsSubSidebarProps {
  isOpen: boolean;
}

const settingsItems = [
  { icon: Bell, label: 'Notifications', href: '/settings/notifications' },
  { icon: Shield, label: 'Privacy & Safety', href: '/settings/privacy' },
  { icon: Palette, label: 'Appearance', href: '/settings/appearance' },
  { icon: Globe, label: 'Language', href: '/settings/language' },
  { icon: Key, label: 'Encryption Keys', href: '/settings/keys' },
  { icon: Database, label: 'Data & Storage', href: '/settings/data' },
];

export function SettingsSubSidebar({ isOpen }: SettingsSubSidebarProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <aside className="w-60 bg-[#2b2d31] border-r border-black/20 p-4">
      <h2 className="text-xs font-semibold text-[#949ba4] uppercase tracking-wide mb-2 px-2">
        User Settings
      </h2>
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
                  ? 'bg-[#404249] text-white'
                  : 'text-[#b5bac1] hover:bg-[#404249] hover:text-[#dbdee1]'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
