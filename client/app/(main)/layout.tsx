'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MainNavigation } from '@/components/layout/MainNavigation';
import { TopBar } from '@/components/layout/TopBar';
import { useUserStore } from '@/store/zustandUserStore';
import CustomLoader from '@/components/ui/CustomLoader';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const init = async () => {
      await useUserStore.persist.rehydrate();
      const user = useUserStore.getState().user;

      if (!user) {
        router.replace('/home');
      } else {
        setIsHydrated(true);
      }
    };

    init();
  }, []);

  // Handle responsive sidebar - closed by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isHydrated) {
    return <CustomLoader />;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      {/* TopBar - Full Width at Top */}
      <TopBar onToggleSidebar={toggleSidebar} />

      {/* Main Content Area - Below TopBar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Takes full remaining height */}
        <aside
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed md:relative z-50 h-full
            transition-transform duration-300 ease-in-out
          `}
        >
          <MainNavigation onMobileClose={() => setIsSidebarOpen(false)} />
        </aside>

        {/* Main Content - Takes remaining space */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
