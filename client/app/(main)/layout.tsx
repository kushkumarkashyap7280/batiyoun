'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MainNavigation } from '@/components/layout/MainNavigation';
import { FloatingToggle } from '@/components/layout/FloatingToggle';
import { ChatSubSidebar } from '@/components/layout/ChatSubSidebar';
import { SettingsSubSidebar } from '@/components/layout/SettingsSubSidebar';
import { useUserStore } from '@/store/zustandUserStore';
import CustomLoader from '@/components/ui/CustomLoader';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(true);
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
    <div className="flex h-screen w-screen overflow-hidden bg-[#313338]">
      {/* Left Navigation Sidebar */}
      <MainNavigation 
        isOpen={isNavOpen} 
        onToggleSubSidebar={() => setIsSubSidebarOpen(!isSubSidebarOpen)}
      />

      {/* Sub-Sidebars (contextual based on route) */}
      {showChatSubSidebar && <ChatSubSidebar isOpen={isSubSidebarOpen} />}
      {showSettingsSubSidebar && <SettingsSubSidebar isOpen={isSubSidebarOpen} />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>

      {/* Floating Toggle Button */}
      <FloatingToggle onClick={() => setIsNavOpen(!isNavOpen)} isOpen={isNavOpen} />
    </div>
  );
}
