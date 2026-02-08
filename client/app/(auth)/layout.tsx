'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustandUserStore';
import { Navbar } from '@/components/landing/Navbar';


interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useUserStore();

  useEffect(() => {
    // Set loading to false on mount if it's still true
    if (isLoading) {
      useUserStore.setState({ isLoading: false });
    }
    
    if (!isLoading && isAuthenticated && user?.username) {
      router.replace(`/${user.username}`);
    }
  }, [isAuthenticated, isLoading, user, router]);

  // Show loading state briefly on initial mount
  if (isLoading) {
    return null;
  }

  // If authenticated, don't render (redirecting)
  if (isAuthenticated && user) {
    return null;
  }

  return <>
  <Navbar />
  {children}
 
  </>;
}
