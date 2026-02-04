'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

interface AuthProviderProps {
  children: ReactNode;
}

// Public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/'];

export function AuthProvider({ children }: AuthProviderProps) {
  const { isAuthenticated, isLoading, user, checkAuthStatus } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status when app loads
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    // If user is authenticated and on a public route, redirect to profile
    if (isAuthenticated && user && publicRoutes.includes(pathname)) {
      router.push(`/${user.username}`);
      return;
    }

    // If user is not authenticated and on a protected route, redirect to login
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, isLoading, user, pathname, router]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E] mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}