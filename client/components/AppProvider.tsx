'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';

interface AppContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const initApp = async () => {
      // 1. Theme Initialization (Default: Dark)
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light') {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      } else {
        setIsDark(true);
        document.documentElement.classList.add('dark');
        if (!storedTheme) localStorage.setItem('theme', 'dark');
      }

      // 2. Auth Check
      await useUserStore.persist.rehydrate();
      const cachedUser = useUserStore.getState().user;

      const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
      const isPublicPage = pathname === '/' || pathname === '/about' || pathname === '/home';
      
      if (cachedUser) {
        if (isAuthPage) {
          router.replace('/chat');
        }
      } else {
        if (!isAuthPage && !isPublicPage) {
          router.replace('/login');
          if (!navigator.onLine) return;
        }
      }

      if (!navigator.onLine) return;

      try {
        const res = await fetch('/api/auth/verify-me', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          if (isAuthPage) router.replace('/chat');
        } else if (res.status === 401) {
          logout();
          if (!isAuthPage && !isPublicPage) router.replace('/login');
        }
      } catch (error) {
        console.error(error);
      }
    };

    initApp();
  }, [setUser, logout, router, pathname]);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <AppContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}