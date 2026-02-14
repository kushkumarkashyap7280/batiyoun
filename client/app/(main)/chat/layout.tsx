'use client';

import { useEffect, useState } from 'react';
import { MobileTabbar } from '@/components/layout/mobile-tabbar';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
      setIsReady(true);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!isReady) return children;

  return (
    <div className="flex flex-col h-full relative w-full overflow-hidden">
      <div className="flex-1 overflow-auto w-full">{children}</div>
      {isMobile && <MobileTabbar />}
    </div>
  );
}
