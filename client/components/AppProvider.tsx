'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const verify = async () => {
      if (!navigator.onLine) return;

      try {
        const res = await fetch('/api/auth/verify-me', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          router.replace('/chat');
        } else {
          router.replace('/home');
        }
      } catch {
        router.replace('/home');
      }
    };

    verify();
  }, [setUser, router]);

  return <>{children}</>;
}