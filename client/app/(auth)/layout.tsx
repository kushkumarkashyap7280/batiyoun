'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/landing/Navbar';
import { useUserStore } from '@/store/zustandUserStore';


interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
     
      router.replace('/chat');
    }
  }, [user]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
