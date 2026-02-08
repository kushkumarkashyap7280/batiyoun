'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation';

function page() {
    const Router = useRouter();

  return (
    <div>channel page
        <Button className='bg-red-500' onClick={()=>{Router.push('/login')}}>go to login page</Button>
    </div>

  )
}

export default page