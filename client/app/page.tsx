'use client'; 
import CustomLoader from '@/components/ui/CustomLoader';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();


  useEffect(() => {
      
      router.replace('/home');

  }, [router]);

 

  // Fallback content after loader
  return (
   <CustomLoader />
  );
}