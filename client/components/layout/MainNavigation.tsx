'use client';

import { MessageSquare, Settings, User, Lock, Moon, Sun, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';

const navItems = [
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: Lock, label: 'Privacy', href: '/privacy' },
];

interface MainNavigationProps {
  isOpen: boolean;
  onToggleSubSidebar: () => void;
}

export function MainNavigation({ isOpen, onToggleSubSidebar }: MainNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isDark, toggleTheme } = useUserStore();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout();
      router.replace('/home');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <nav className="w-18 bg-[#1e1f22] flex flex-col items-center py-3 gap-2 border-r border-black/20 transition-all duration-300">
      {/* Home/Logo Button */}
      <Link
        href="/chat"
        className="w-12 h-12 rounded-2xl bg-linear-to-br from-green-500 to-emerald-600 hover:rounded-xl transition-all duration-200 flex items-center justify-center mb-2 group relative"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Home
        </div>
      </Link>

      {/* Separator */}
      <div className="w-8 h-0.5 bg-[#3f4147] rounded-full mb-1" />

      {/* Navigation Items */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);

        return (
          <button
            key={item.href}
            onClick={() => {
              router.push(item.href);
              onToggleSubSidebar();
            }}
            className="relative group"
          >
            {/* Active indicator */}
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full -ml-3" />
            )}

            <div
              className={`w-12 h-12 flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'rounded-xl bg-linear-to-br from-green-500 to-emerald-600'
                  : 'rounded-2xl bg-[#313338] hover:rounded-xl hover:bg-linear-to-br hover:from-green-500/80 hover:to-emerald-600/80'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#b5bac1]'}`} />
            </div>

            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {item.label}
            </div>
          </button>
        );
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-12 h-12 rounded-2xl bg-[#313338] hover:rounded-xl hover:bg-linear-to-br hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center justify-center group relative"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-[#b5bac1]" />
        ) : (
          <Moon className="w-5 h-5 text-[#b5bac1]" />
        )}
        
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </div>
      </button>

      {/* User Avatar */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center group relative">
        {user?.avatar ? (
          <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white font-semibold text-sm">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </span>
        )}

        {/* User Tooltip/Menu */}
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {user?.username || 'User'}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-12 h-12 rounded-2xl bg-[#313338] hover:rounded-xl hover:bg-linear-to-br hover:from-gray-600 hover:to-gray-800 transition-all duration-200 flex items-center justify-center group relative"
      >
        <LogOut className="w-5 h-5 text-[#b5bac1]" />
        
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Logout
        </div>
      </button>
    </nav>
  );
}
