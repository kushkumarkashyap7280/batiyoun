'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingSidebar } from '@/components/layout/FloatingSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { useUserStore } from '@/store/zustandUserStore';
import CustomLoader from '@/components/ui/CustomLoader';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Wait for Zustand to rehydrate
      await useUserStore.persist.rehydrate();
      
      const user = useUserStore.getState().user;

      if (!user) {
        // No user, redirect to home
        router.replace('/home');
      } else {
        // User exists, safe to show protected pages
        setIsHydrated(true);
      }
    };

    init();
  }, [router]);

  if (!isHydrated) {
    return <CustomLoader />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-(--bg-primary) dark:bg-(--bg-primary-dark)">
      <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex h-[calc(100vh-4rem)] w-full">
        <FloatingSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-16' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
