'use client';

import { MessageSquare, Settings, Moon, Sun, LogOut, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';
import { toast } from 'sonner';

interface SidebarDesktopProps {
  onMobileClose: () => void;
}

export function SidebarDesktop({ onMobileClose }: SidebarDesktopProps) {
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
    onMobileClose();
  };

  return (
    <nav className="w-20 md:w-16 bg-surface flex flex-col items-center py-3 md:py-3 gap-2 md:gap-2 border-r border-line h-full overflow-y-auto overflow-x-hidden">
      {/* User Avatar */}
      <button
        onClick={() => handleNavigation('/profile')}
        className="relative group mb-1 md:mb-2 shrink-0"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName || 'User'}
            className="w-12 h-12 md:w-12 md:h-12 rounded-full object-cover hover:rounded-xl transition-all duration-200"
          />
        ) : (
          <div className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-linear-to-br from-green-500 to-emerald-600 hover:rounded-xl transition-all duration-200 flex items-center justify-center">
            <User className="w-6 h-6 md:w-6 md:h-6 text-white" />
          </div>
        )}
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Profile
        </div>
      </button>

      {/* Separator */}
      <div className="w-8 md:w-8 h-0.5 bg-border rounded-full mb-0.5 md:mb-1 shrink-0" />

      {/* Chat Button */}
      <button
        onClick={() => handleNavigation('/chat')}
        className="relative group shrink-0"
      >
        {pathname?.startsWith('/chat') && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 md:h-8 bg-white rounded-r-full -ml-2 md:-ml-3" />
        )}
        <div
          className={`w-12 h-12 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 ${
            pathname?.startsWith('/chat')
              ? 'rounded-xl bg-linear-to-br from-green-500 to-emerald-600'
              : 'rounded-2xl bg-muted/50 hover:rounded-xl hover:bg-linear-to-br hover:from-green-500/80 hover:to-emerald-600/80'
          }`}
        >
          <MessageSquare
            className={`w-6 h-6 md:w-5 md:h-5 ${pathname?.startsWith('/chat') ? 'text-white' : 'text-muted-foreground'}`}
          />
        </div>
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Chat
        </div>
      </button>

      {/* Settings Button */}
      <button
        onClick={() => handleNavigation('/settings')}
        className="relative group shrink-0"
      >
        {pathname?.startsWith('/settings') && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 md:h-8 bg-white rounded-r-full -ml-2 md:-ml-3" />
        )}
        <div
          className={`w-12 h-12 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200 ${
            pathname?.startsWith('/settings')
              ? 'rounded-xl bg-linear-to-br from-green-500 to-emerald-600'
              : 'rounded-2xl bg-muted/50 hover:rounded-xl hover:bg-linear-to-br hover:from-green-500/80 hover:to-emerald-600/80'
          }`}
        >
          <Settings
            className={`w-6 h-6 md:w-5 md:h-5 ${pathname?.startsWith('/settings') ? 'text-white' : 'text-muted-foreground'}`}
          />
        </div>
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Settings
        </div>
      </button>

      {/* Spacer */}
      <div className="h-2 md:flex-1 md:min-h-0" />

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-12 h-12 md:w-12 md:h-12 rounded-2xl bg-muted/50 hover:rounded-xl hover:bg-linear-to-br hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center justify-center group relative shrink-0"
      >
        {isDark ? (
          <Sun className="w-6 h-6 md:w-5 md:h-5 text-muted-foreground" />
        ) : (
          <Moon className="w-6 h-6 md:w-5 md:h-5 text-muted-foreground" />
        )}
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </div>
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-12 h-12 md:w-12 md:h-12 rounded-2xl bg-muted/50 hover:rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center justify-center group relative shrink-0"
      >
        <LogOut className="w-6 h-6 md:w-5 md:h-5 text-muted-foreground group-hover:text-white" />
        <div className="absolute left-full ml-4 px-3 py-2 bg-black text-white text-sm font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          Logout
        </div>
      </button>
    </nav>
  );
}
