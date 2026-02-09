'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserStore } from '@/store/zustandUserStore';

// Theme Interface
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
  // 1. Theme State
  const [isDark, setIsDark] = useState(false);
  
  // 2. Zustand Actions and State
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  // 3. THE MASTER LOGIC (Your Plan) 🧠
  useEffect(() => {
    const checkAuth = async () => {
      // 1. 🛑 WAIT: Force Zustand to finish reading LocalStorage first
      // This ensures we know who the "Cached User" is before we ask the server
      await useUserStore.persist.rehydrate(); 

      // A. Check Network Status
      if (!navigator.onLine) {
        return; // EXIT: Let Zustand handle the cached user
      }

      try {
        // B. Online: Verify with Server
        // Now we verify the user we JUST loaded
        const res = await fetch('/api/auth/verify-me', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          // C. Success: Update Zustand (Fixes Google Login & Refreshes Data)
          setUser(data.user); 
        } else if (res.status === 401) {
          // D. Failed: Server says "Who are you?" -> Clear Zustand
          // This is now safe because hydration is already done
          logout();
        }
      } catch (error) {
        // Network Error (server down?) -> Treat as Offline -> Do nothing
      }
    };

    checkAuth();
    
    // Initialize Theme
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, [setUser, logout]);

  // Theme Toggle
  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}