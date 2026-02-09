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
  const { user } = useUserStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const init = async () => {
      // 2. WAIT: The blocking call. Nothing moves past this line.
      await useUserStore.persist.rehydrate();
      
      // 3. CHECK: Now we have the data.
      const user = useUserStore.getState().user;

      if (!user) {
        // 4. DECIDE: Redirect strictly BEFORE opening the curtain
        router.replace('/home');
      } else {
        // 5. OPEN: Only lift the curtain if we are staying here
        setIsHydrated(true);
      }
    };

    init();
  }, [router]);

  return (
    <>
      {!isHydrated ? (
        <CustomLoader />
      ) : (
        <div className="h-screen w-screen overflow-hidden bg-(--bg-primary) dark:bg-(--bg-primary-dark)">
          {/* Top Bar - Always visible */}
          <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-4rem)] w-full">
        {/* Floating Sidebar - 2% on desktop, full on mobile when open */}
        <FloatingSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Page Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-16' : ''}`}>
          {children}
        </main>
      </div>
    </div>
      )}
    </>
  );
}
