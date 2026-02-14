'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chats tab by default
    router.replace('/chat/chats');
  }, [router]);

  return null;
}
