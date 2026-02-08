'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';

interface AuthSessionProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthSession({ children, redirectTo = '/login' }: AuthSessionProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, setUser, logout } = useUserStore();

  useEffect(() => {
    // If user is already authenticated (from login/signup), skip verification
    if (isAuthenticated && user) {
      return;
    }

    // Only verify if user is NOT authenticated
    const verifyUser = async () => {
      try {
        const response = await fetch('/api/auth/verify-me', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success && data.user) {
          // User is verified, update the store with user data
          setUser(data.user);
        } else {
          // User is not authenticated, logout and redirect
          logout();
          router.replace(redirectTo);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        logout();
        router.replace(redirectTo);
      }
    };

    verifyUser();
  }, [isAuthenticated, user]);

  // Don't render anything while checking authentication or redirecting
  if (isLoading || !isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}
