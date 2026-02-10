'use client';

import { ChatArea } from '@/components/chat/ChatArea';

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#313338]">
      <ChatArea selectedChatId="1" onBack={() => {}} />
    </div>
  );
}
