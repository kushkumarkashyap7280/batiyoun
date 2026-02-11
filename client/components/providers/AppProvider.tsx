// AppProvider.tsx - Just sync state, let layouts handle routing
'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/zustandUserStore';
import { toast, Toaster } from 'sonner';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    const verify = async () => {
      // Skip verification if offline
      if (!navigator.onLine){

        toast.error("You are offline. Verification skipped.");
        return;
      }

      try {
        const res = await fetch('/api/auth/verify-me', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          // Auth layout will handle redirect to /chat
        } else {
          // Token expired or invalid - clear state
          logout();
        }
      } catch (error) {
        // Network error - don't logout, might be offline
        console.error('Verification failed:', error);
      }
    };

    verify();
  }, [setUser, logout]);

  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}