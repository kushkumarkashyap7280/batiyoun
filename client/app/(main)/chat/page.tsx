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
      {/* Conversations List - Discord middle column */}
      <div
        className={`${
          isMobileChatOpen ? 'hidden' : 'flex'
        } md:flex flex-col w-full md:w-60 lg:w-72 bg-[#2b2d31] border-r border-black/20`}
      >
        <ChatSidebar
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Chat Area - Main content */}
      <div
        className={`${
          isMobileChatOpen ? 'flex' : 'hidden'
        } md:flex flex-col flex-1 min-w-0 bg-[#313338]`}
      >
        <ChatArea
          selectedChatId={selectedChatId}
          onBack={handleBackToList}
        />
      </div>
    </div>
  );
}
