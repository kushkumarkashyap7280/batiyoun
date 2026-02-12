'use client';

import type { ReactNode } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DesktopTopbar } from '@/components/layout/desktop-topbar';
import { SidebarDesktop } from '@/components/layout/sidebar-desktop';
import { SidebarMobile } from '@/components/layout/sidebar-mobile';
import { MobileTabbar } from '@/components/layout/mobile-tabbar';
import { useUserStore } from '@/store/zustandUserStore';
import CustomLoader from '@/components/ui/CustomLoader';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isViewportReady, setIsViewportReady] = useState(false);
  const [pathname, setPathname] = useState('');
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const currentPathname = usePathname();

  useEffect(() => {
    setPathname(currentPathname);
  }, [currentPathname]);

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

  // Handle swipe gesture for mobile sidebar toggle
  useEffect(() => {
    if (!isMobile) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;

      // Only consider horizontal swipe if vertical movement is minimal
      if (Math.abs(diffY) > Math.abs(diffX)) return;

      // Right swipe (left to right) to open sidebar
      if (diffX > 50 && touchStartX.current < 30) {
        e.preventDefault();
        setIsSidebarOpen(true);
      }
      // Left swipe (right to left) to close sidebar
      else if (diffX < -50 && isSidebarOpen) {
        e.preventDefault();
        setIsSidebarOpen(false);
      }
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('touchstart', handleTouchStart, false);
      mainElement.addEventListener('touchend', handleTouchEnd, false);

      return () => {
        mainElement.removeEventListener('touchstart', handleTouchStart);
        mainElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMobile, isSidebarOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
      setIsViewportReady(true);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!isHydrated || !isViewportReady) {
    return <CustomLoader />;
  }

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
        <SidebarMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 overflow-auto pb-20">
          {children}
        </main>

        {pathname?.startsWith('/chat') && <MobileTabbar />}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <DesktopTopbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden relative">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed md:relative z-50 h-full
            transition-transform duration-300 ease-in-out
          `}
        >
          <SidebarDesktop onMobileClose={() => setIsSidebarOpen(false)} />
        </aside>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
