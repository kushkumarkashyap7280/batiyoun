'use client';

import { Search, Settings } from 'lucide-react';
import { ContactListItem } from './ContactListItem';

interface ChatSidebarProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

// Mock data - replace with real data later
const mockContacts = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'AC',
    lastMessage: 'The encryption keys have been updated successfully',
    timestamp: '2m',
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    avatar: 'SM',
    lastMessage: 'Perfect! The security audit looks good',
    timestamp: '15m',
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Dev Team',
    avatar: 'DT',
    lastMessage: 'Deployment completed. All systems operational.',
    timestamp: '1h',
    isOnline: false,
    unreadCount: 5,
  },
  {
    id: '4',
    name: 'Jordan Kim',
    avatar: 'JK',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '3h',
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: '5',
    name: 'Security Ops',
    avatar: 'SO',
    lastMessage: 'New vulnerability patch available',
    timestamp: '5h',
    isOnline: true,
    unreadCount: 1,
  },
];

export function ChatSidebar({ selectedChatId, onSelectChat }: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-black/20 shadow-sm">
        <h2 className="font-semibold text-white text-sm">Messages</h2>
        <button
          className="p-1.5 hover:bg-[#404249] rounded transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4 text-[#b5bac1]" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-2">
        <button className="w-full h-7 px-2 bg-[#1e1f22] hover:bg-[#404249] rounded text-xs text-[#949ba4] flex items-center gap-2 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Find or start a conversation</span>
        </button>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {mockContacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            isSelected={selectedChatId === contact.id}
            onClick={() => onSelectChat(contact.id)}
          />
        ))}
      </div>

      {/* Footer - User Status */}
      <div className="h-14 px-2 bg-[#232428] flex items-center gap-2">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#232428]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">username</div>
          <div className="flex items-center gap-1.5 text-xs text-[#b5bac1]">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Online • Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
