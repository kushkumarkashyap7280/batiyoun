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
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
        isSelected
          ? 'bg-(--bg-tertiary) dark:bg-(--bg-tertiary-dark) border-l-4 border-green-600'
          : 'hover:bg-(--hover-bg) dark:hover:bg-(--hover-bg-dark) border-l-4 border-transparent'
      }`}
    >
      {/* Avatar with Status */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-600/20 to-emerald-600/20 border border-green-600/30 flex items-center justify-center text-green-400 dark:text-green-500 font-semibold text-sm">
          {contact.avatar}
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-(--bg-secondary-dark) ${
            contact.isOnline ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      </div>

      {/* Contact Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm text-(--text-primary) dark:text-(--text-primary-dark) truncate">
            {contact.name}
          </h3>
          <span className="text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark) ml-2 shrink-0">
            {contact.timestamp}
          </span>
        </div>
        <p className="text-sm text-(--text-secondary) dark:text-(--text-secondary-dark) truncate">
          {contact.lastMessage}
        </p>
      </div>

      {/* Unread Badge */}
      {contact.unreadCount > 0 && (
        <div className="shrink-0 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{contact.unreadCount}</span>
        </div>
      )}
    </button>
  );
}
