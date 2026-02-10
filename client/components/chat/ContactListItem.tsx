'use client';

interface ContactListItemProps {
  contact: {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    isOnline: boolean;
    unreadCount: number;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function ContactListItem({ contact, isSelected, onClick }: ContactListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-2 py-1.5 flex items-center gap-3 rounded hover:bg-[#404249] transition-colors ${
        isSelected ? 'bg-[#404249]' : ''
      }`}
    >
      {/* Avatar with Status */}
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center font-semibold text-sm text-white">
          {contact.avatar}
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2b2d31] ${
            contact.isOnline ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-[#f2f3f5] truncate">
            {contact.name}
          </h3>
          {contact.unreadCount > 0 && (
            <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
              {contact.unreadCount}
            </span>
          )}
        </div>
        <p className="text-xs text-[#949ba4] truncate">
          {contact.lastMessage}
        </p>
      </div>
    </button>
  );
}
