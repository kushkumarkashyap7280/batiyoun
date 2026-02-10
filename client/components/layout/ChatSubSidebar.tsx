'use client';

import { Search, UserPlus, Users, ChevronLeft } from 'lucide-react';
import { ContactListItem } from '@/components/chat/ContactListItem';

interface ChatSubSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
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

export function ChatSubSidebar({ isOpen, onToggle }: ChatSubSidebarProps) {
  return (
    <aside className={`${isOpen ? 'w-60' : 'w-0'} transition-all duration-300 bg-surface border-r border-line hidden md:flex md:flex-col overflow-hidden transition-theme`}>
      {isOpen && (
        <>
          {/* Header with toggle button */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-line shadow-sm shrink-0">
            <h2 className="font-semibold text-default text-sm">Messages</h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:hover-surface rounded transition-colors">
                <UserPlus className="w-4 h-4 text-muted" />
              </button>
              <button 
                onClick={onToggle}
                className="p-1.5 hover:hover-surface rounded transition-colors"
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className="w-4 h-4 text-muted" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-2">
            <button className="w-full h-7 px-2 bg-tertiary hover:hover-surface rounded text-xs text-subtle flex items-center gap-2 transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span>Find conversation</span>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            {/* Friends */}
            <button className="w-full h-11 px-2 flex items-center gap-3 rounded hover:hover-surface transition-colors">
              <Users className="w-5 h-5 text-muted" />
              <span className="text-sm font-medium text-default">Friends</span>
            </button>

            {/* Direct Messages Header */}
            <div className="py-2">
              <div className="flex items-center px-2 mb-1">
                <span className="text-xs font-semibold text-subtle uppercase tracking-wide">
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
          <div className="h-14 px-2 bg-tertiary flex items-center gap-2 shrink-0">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-tertiary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-default truncate">username</div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Online • Encrypted</span>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
