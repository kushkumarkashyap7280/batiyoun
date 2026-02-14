'use client';

import type { ReactNode } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DesktopTopbar } from '@/components/layout/desktop-topbar';
import { SidebarDesktop } from '@/components/layout/sidebar-desktop';
import { SidebarMobile } from '@/components/layout/sidebar-mobile';
import { useUserStore } from '@/store/zustandUserStore';
import { SocketProvider } from '@/components/providers/SocketProvider'; // 👈 Import 1
import CustomLoader from '@/components/ui/CustomLoader';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  // 👇 CHANGE 1: Use the hook so this component re-renders if user becomes null
  const user = useUserStore((state) => state.user);

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

  // 1. HYDRATION CHECK (Run once)
  useEffect(() => {
    const init = async () => {
      await useUserStore.persist.rehydrate();
      setIsHydrated(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace('/home');
    }
  }, [isHydrated, user, router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isMobile) return;
    let isSwiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX.current) return;
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = touchCurrentX - touchStartX.current;
      const diffY = touchCurrentY - touchStartY.current;

      if (Math.abs(diffX) > Math.abs(diffY) && touchStartX.current < 30 && diffX > 10) {
        isSwiping = true;
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX.current;
      const diffY = touchEndY - touchStartY.current;

      if (Math.abs(diffY) > Math.abs(diffX)) {
        isSwiping = false;
        return;
      }
      if (diffX > 50 && touchStartX.current < 30) {
        e.preventDefault();
        setIsSidebarOpen(true);
      } else if (diffX < -50 && isSidebarOpen) {
        e.preventDefault();
        setIsSidebarOpen(false);
      }
      isSwiping = false;
    };

    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      mainElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      mainElement.addEventListener('touchend', handleTouchEnd, { passive: false });
      return () => {
        mainElement.removeEventListener('touchstart', handleTouchStart);
        mainElement.removeEventListener('touchmove', handleTouchMove);
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

  if (!isHydrated || !isViewportReady || !user) {
    return <CustomLoader />;
  }

  if (isMobile) {
    return (
      <SocketProvider>
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-background overscroll-none">
          <DesktopTopbar onToggleSidebar={toggleSidebar} />

          <SidebarMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          <main
            className="flex-1 overflow-auto overscroll-none touch-pan-y"
            style={{ overscrollBehaviorX: 'none' }}
          >
            {children}
          </main>
        </div>
      </SocketProvider>
    );
  }

  return (
    <SocketProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
        <DesktopTopbar onToggleSidebar={toggleSidebar} />

        <div className="flex flex-1 overflow-hidden relative w-full">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              fixed md:absolute top-0 left-0 z-50 h-full
              transition-transform duration-300 ease-in-out
            `}
          >
            <SidebarDesktop onMobileClose={() => setIsSidebarOpen(false)} />
          </aside>

          <main className="flex-1 overflow-auto w-full">{children}</main>
        </div>
      </div>
    </SocketProvider>
  );
}
