'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MainNavigation } from '@/components/layout/MainNavigation';
import { ChatSubSidebar } from '@/components/layout/ChatSubSidebar';
import { SettingsSubSidebar } from '@/components/layout/SettingsSubSidebar';
import { useUserStore } from '@/store/zustandUserStore';
import CustomLoader from '@/components/ui/CustomLoader';
import { Menu } from 'lucide-react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(true);

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
  }, [router]);

  // Determine which sub-sidebar to show based on current route
  const showChatSubSidebar = pathname?.startsWith('/chat');
  const showSettingsSubSidebar = pathname?.startsWith('/settings');

  if (!isHydrated) {
    return <CustomLoader />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-page">
      {/* Mobile Overlay */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Main Nav - Always visible on desktop, drawer on mobile */}
      <div className={`${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 transition-transform duration-300`}>
        <MainNavigation onMobileClose={() => setIsMobileNavOpen(false)} />
      </div>

      {/* Sub-Sidebars with integrated toggle */}
      {showChatSubSidebar && (
        <ChatSubSidebar 
          isOpen={isSubSidebarOpen} 
          onToggle={() => setIsSubSidebarOpen(!isSubSidebarOpen)}
        />
      )}
      {showSettingsSubSidebar && (
        <SettingsSubSidebar 
          isOpen={isSubSidebarOpen}
          onToggle={() => setIsSubSidebarOpen(!isSubSidebarOpen)}
        />
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="md:hidden h-12 bg-surface border-b border-line flex items-center px-4 shrink-0">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 hover:hover-surface rounded transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5 text-default" />
          </button>
          <h1 className="ml-3 text-default font-semibold">Batiyoun</h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
