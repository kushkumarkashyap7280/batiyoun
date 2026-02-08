'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { Router } from 'lucide-react';

// export const metadata = {
//   title: 'User Profile',
//   description: 'View and edit your profile information.',
// }

function page() {
  const Router = useRouter();

  return (
    <div>page
      <Button onClick={()=>{Router.push('/login')}}>go to login page</Button>
    </div>
    
  )
}

export default page