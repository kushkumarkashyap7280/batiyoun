'use client';

import { MessageSquare, Settings, Moon, Sun, LogOut, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';
import { toast } from 'sonner';

interface SidebarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarMobile({ isOpen, onClose }: SidebarMobileProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isDark, toggleTheme } = useUserStore();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      logout();
      toast.success('Logged out successfully');
      router.replace('/home');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Full screen drawer on mobile */}
      <aside
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-line rounded-r-3xl
          transition-transform duration-300 ease-in-out
          flex flex-col shadow-2xl
        `}
      >
        {/* User Avatar Section */}
        <div className="p-4 border-b border-line rounded-b-2xl bg-gradient-to-b from-surface via-surface to-transparent">
          <button
            onClick={() => handleNavigation('/profile')}
            className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName || 'User'}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="text-left flex-1 min-w-0">
              <p className="font-semibold text-default text-sm truncate">{user?.fullName || 'User'}</p>
              <p className="text-xs text-muted truncate">@{user?.username}</p>
            </div>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Chat */}
          <button
            onClick={() => handleNavigation('/chat')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              pathname?.startsWith('/chat')
                ? 'bg-linear-to-br from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/20'
                : 'text-muted hover:bg-hover-surface hover:text-default'
            }`}
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span>Chat</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => handleNavigation('/settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              pathname?.startsWith('/settings')
                ? 'bg-linear-to-br from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/20'
                : 'text-muted hover:bg-hover-surface hover:text-default'
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-line p-4 space-y-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-muted hover:bg-hover-surface hover:text-default transition-all duration-200"
          >
            {isDark ? (
              <Sun className="w-5 h-5 shrink-0" />
            ) : (
              <Moon className="w-5 h-5 shrink-0" />
            )}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
