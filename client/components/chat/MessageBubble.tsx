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
      <div className="flex justify-center my-4">
        <div className="px-3 py-1.5 bg-[#2e3035] border border-[#1e1f22] rounded">
          <p className="text-xs text-[#949ba4] text-center">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Sent messages (Discord style - not bubble, just highlighted on hover)
  if (message.type === 'sent') {
    return (
      <div className="flex gap-3 hover:bg-[#2e3035] -mx-4 px-4 py-1 rounded group">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-semibold">U</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-white text-sm">You</span>
            <span className="text-xs text-[#949ba4]">{formatTime(message.timestamp)}</span>
          </div>
          <p className="text-[#dbdee1] text-sm mt-0.5 wrap-break-word whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Received messages (Discord style)
  return (
    <div className="flex gap-3 hover:bg-[#2e3035] -mx-4 px-4 py-1 rounded group">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shrink-0">
        <span className="text-white text-sm font-semibold">AC</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-white text-sm">Alex Chen</span>
          <span className="text-xs text-[#949ba4]">{formatTime(message.timestamp)}</span>
        </div>
        <p className="text-[#dbdee1] text-sm mt-0.5 wrap-break-word whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
    </div>
  );
}
