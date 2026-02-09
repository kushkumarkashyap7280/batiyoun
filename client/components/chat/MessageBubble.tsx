'use client';

interface Message {
  id: string;
  type: 'sent' | 'received' | 'system';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // System messages (centered, gray pill)
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-6">
        <div className="px-4 py-2 bg-(--bg-tertiary) dark:bg-(--bg-tertiary-dark) border border-(--border-color) dark:border-(--border-color-dark) rounded-full">
          <p className="text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark) text-center">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Sent messages (right aligned, green)
  if (message.type === 'sent') {
    return (
      <div className="flex justify-end">
        <div className="flex flex-col items-end max-w-[75%] md:max-w-[60%]">
          <div className="px-4 py-2.5 bg-green-600 text-white rounded-l-2xl rounded-tr-2xl shadow-sm">
            <p className="text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <span className="text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark) mt-1 px-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  // Received messages (left aligned, dark gray)
  return (
    <div className="flex justify-start">
      <div className="flex flex-col items-start max-w-[75%] md:max-w-[60%]">
        <div className="px-4 py-2.5 bg-(--bg-tertiary) dark:bg-(--bg-tertiary-dark) text-(--text-primary) dark:text-(--text-primary-dark) rounded-r-2xl rounded-tl-2xl shadow-sm border border-(--border-color) dark:border-(--border-color-dark)">
          <p className="text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <span className="text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark) mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
