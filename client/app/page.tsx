'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomLoader from '@/components/ui/CustomLoader';
import { useUserStore } from '@/store/zustandUserStore';

export default function RootPage() {
  const router = useRouter();
  const isLoading = useUserStore((state) => state.isLoading);

  useEffect(() => {
      
      router.replace('/home');

  }, [router]);

  if (isLoading) {
    return <CustomLoader isVisible={true} />;
  }

  // Fallback content after loader
  return (
    <div className="flex items-center justify-center h-screen bg-background dark:bg-slate-950 text-foreground dark:text-white">
      <div className="text-center space-y-4">
        <div className="font-heading font-bold text-2xl bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Batiyoun Loaded
        </div>
        <p className="text-muted-foreground">CustomLoader demonstration complete!</p>
      </div>
    </div>
  );
}