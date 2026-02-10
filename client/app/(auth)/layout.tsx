'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/landing/Navbar';
import { useUserStore } from '@/store/zustandUserStore';


interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user); // Subscribe to user changes
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Wait for Zustand to rehydrate
      await useUserStore.persist.rehydrate();
      setIsHydrated(true);
    };

    init();
  }, []);

  // Redirect when user becomes available (from rehydration OR AppProvider verification)
  useEffect(() => {
    if (isHydrated && user) {
      router.replace('/chat');
    }
  }, [isHydrated, user, router]);

  // Don't flash auth pages while checking/hydrating
  if (!isHydrated) {
    return null; // or a loader
  }

  // If user exists, show nothing while redirecting
  if (user) {
    return null;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
