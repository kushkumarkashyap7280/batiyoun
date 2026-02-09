'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FloatingSidebar } from '@/components/layout/FloatingSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { useUserStore } from '@/store/zustandUserStore';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
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
  );
}
