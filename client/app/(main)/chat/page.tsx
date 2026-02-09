'use client';

import { useState } from 'react';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatArea } from '@/components/chat/ChatArea';

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setIsMobileChatOpen(true);
  };

  const handleBackToList = () => {
    setIsMobileChatOpen(false);
    setSelectedChatId(null);
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Chat List Sidebar - 28% on desktop, full screen on mobile */}
      <div
        className={`${
          isMobileChatOpen ? 'hidden' : 'flex'
        } md:flex flex-col w-full md:w-[28%] md:min-w-70 md:max-w-95 border-r border-(--border-color) dark:border-(--border-color-dark)`}
      >
        <ChatSidebar
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Chat Area - Takes remaining space */}
      <div
        className={`${
          isMobileChatOpen ? 'flex' : 'hidden'
        } md:flex flex-col flex-1 min-w-0`}
      >
        <ChatArea
          selectedChatId={selectedChatId}
          onBack={handleBackToList}
        />
      </div>
    </div>
  );
}
