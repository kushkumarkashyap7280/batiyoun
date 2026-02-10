'use client';

import { Search, UserPlus, Users } from 'lucide-react';
import { ContactListItem } from '@/components/chat/ContactListItem';

interface ChatSubSidebarProps {
  isOpen: boolean;
}

// Mock data - will be replaced with real data
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
];

export function ChatSubSidebar({ isOpen }: ChatSubSidebarProps) {
  if (!isOpen) return null;

  return (
    <aside className="w-60 bg-[#2b2d31] border-r border-black/20 flex flex-col">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-black/20 shadow-sm">
        <h2 className="font-semibold text-white text-sm">Messages</h2>
        <button className="p-1.5 hover:bg-[#404249] rounded transition-colors">
          <UserPlus className="w-4 h-4 text-[#b5bac1]" />
        </button>
      </div>

      {/* Search */}
      <div className="p-2">
        <button className="w-full h-7 px-2 bg-[#1e1f22] hover:bg-[#404249] rounded text-xs text-[#949ba4] flex items-center gap-2 transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Find conversation</span>
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
        {/* Friends */}
        <button className="w-full h-11 px-2 flex items-center gap-3 rounded hover:bg-[#404249] transition-colors">
          <Users className="w-5 h-5 text-[#b5bac1]" />
          <span className="text-sm font-medium text-[#f2f3f5]">Friends</span>
        </button>

        {/* Direct Messages Header */}
        <div className="py-2">
          <div className="flex items-center px-2 mb-1">
            <span className="text-xs font-semibold text-[#949ba4] uppercase tracking-wide">
              Direct Messages
            </span>
          </div>
        </div>

        {/* Conversations List */}
        {mockContacts.map((contact) => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            isSelected={false}
            onClick={() => console.log('Select chat:', contact.id)}
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
    </aside>
  );
}
