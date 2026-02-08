'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';

interface AuthSessionAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthSessionAuth({ children, redirectTo = '/' }: AuthSessionAuthProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useUserStore();

  useEffect(() => {
    if (isLoading) {
      return; // Still checking authentication status
    }

    if (isAuthenticated && user) {
      // User is already logged in, redirect away from auth pages
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo]);

  // Don't render anything while checking authentication
  if (isLoading) {
    return null;
  }

  // If user is already authenticated, redirect (don't render the auth page)
  if (isAuthenticated && user) {
    return null;
  }

  return <>{children}</>;
}
