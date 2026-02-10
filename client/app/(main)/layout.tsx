'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MainNavigation } from '@/components/layout/MainNavigation';
import { useUserStore } from '@/store/zustandUserStore';
import CustomLoader from '@/components/ui/CustomLoader';

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

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

  if (!isHydrated) {
    return <CustomLoader />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#313338] dark:bg-[#313338]">
      {/* Left Navigation Sidebar - Discord-style */}
      <MainNavigation />

      {/* Main Content Area - Pages render here */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
