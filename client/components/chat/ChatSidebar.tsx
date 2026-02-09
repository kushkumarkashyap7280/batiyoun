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
    <div className="flex flex-col h-full bg-white/80 dark:bg-(--bg-secondary-dark)/80 backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-(--border-color) dark:border-(--border-color-dark)">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
              ME
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-(--bg-secondary-dark) rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-(--text-primary) dark:text-(--text-primary-dark)">
              My Workspace
            </span>
            <span className="text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark)">Online</span>
          </div>
        </div>
        <button
          className="p-2 rounded-lg hover:bg-(--hover-bg) dark:hover:bg-(--hover-bg-dark) transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-(--text-secondary) dark:text-(--text-secondary-dark)" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-tertiary) dark:text-(--text-tertiary-dark)" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-(--bg-secondary) dark:bg-(--bg-primary-dark) border border-(--border-color) dark:border-(--border-color-dark) rounded-lg text-sm text-(--text-primary) dark:text-(--text-primary-dark) placeholder:text-(--text-tertiary) dark:placeholder:text-(--text-tertiary-dark) focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="space-y-1">
          {mockContacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              isSelected={selectedChatId === contact.id}
              onClick={() => onSelectChat(contact.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer - Optional status */}
      <div className="p-3 border-t border-(--border-color) dark:border-(--border-color-dark)">
        <div className="flex items-center gap-2 text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark)">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
}
