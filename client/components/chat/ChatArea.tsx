'use client';

import { useState } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Paperclip, Send, Shield } from 'lucide-react';
import { MessageBubble } from './MessageBubble';

interface ChatAreaProps {
  selectedChatId: string | null;
  onBack: () => void;
}

// Mock messages - replace with real data later
const mockMessages = [
  {
    id: '1',
    type: 'system' as const,
    content: 'Security code changed. Messages are end-to-end encrypted.',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    type: 'received' as const,
    content: 'Hey! Have you reviewed the latest security updates?',
    timestamp: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    type: 'sent' as const,
    content: 'Yes, just finished going through them. The new encryption implementation looks solid.',
    timestamp: new Date(Date.now() - 7100000),
  },
  {
    id: '4',
    type: 'received' as const,
    content: 'Great! I was particularly impressed with the key rotation mechanism. Very clean implementation.',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '5',
    type: 'sent' as const,
    content: 'Thanks! Took a lot of testing to get it right. The offline-first approach adds some complexity but it\'s worth it for the user experience.',
    timestamp: new Date(Date.now() - 3500000),
  },
  {
    id: '6',
    type: 'received' as const,
    content: 'Absolutely. Users don\'t realize how much work goes into making things "just work" seamlessly.',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: '7',
    type: 'sent' as const,
    content: 'Exactly. That\'s the goal - invisible security. 🔒',
    timestamp: new Date(Date.now() - 120000),
  },
];

const mockContact = {
  name: 'Alex Chen',
  status: 'online' as const,
  avatar: 'AC',
};

export function ChatArea({ selectedChatId, onBack }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle send message
      console.log('Sending:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedChatId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-linear-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-green-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              Secure Messaging
            </h3>
            <p className="text-sm text-[#b5bac1] max-w-md">
              Select a conversation to start chatting. All messages are end-to-end encrypted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-black/20 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Back button - Mobile only */}
          <button
            onClick={onBack}
            className="md:hidden p-2 -ml-2 hover:bg-[#404249] rounded-lg transition-colors"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="w-5 h-5 text-[#b5bac1]" />
          </button>

          {/* Contact Info */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center font-semibold text-sm text-white">
              {mockContact.avatar}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#313338] rounded-full" />
          </div>
          
          <div className="flex flex-col">
            <h2 className="font-semibold text-white text-sm">
              {mockContact.name}
            </h2>
            <span className="text-xs text-[#b5bac1]">
              {isTyping ? 'typing...' : mockContact.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            className="p-2 hover:bg-[#404249] rounded transition-colors"
            aria-label="Voice call"
          >
            <Phone className="w-5 h-5 text-[#b5bac1]" />
          </button>
          <button
            className="p-2 hover:bg-[#404249] rounded transition-colors"
            aria-label="Video call"
          >
            <Video className="w-5 h-5 text-[#b5bac1]" />
          </button>
          <button
            className="p-2 hover:bg-[#404249] rounded transition-colors"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-[#b5bac1]" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <button
            className="p-2 hover:bg-[#404249] rounded transition-colors shrink-0"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5 text-[#b5bac1]" />
          </button>

          {/* Input Field */}
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message @Alex Chen"
              className="w-full px-4 py-2.5 bg-[#383a40] border-none rounded-lg text-sm text-[#dbdee1] placeholder-[#6d6f78] focus:outline-none"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2.5 bg-green-600 hover:bg-green-700 disabled:bg-[#404249] disabled:cursor-not-allowed rounded transition-colors shrink-0"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Encryption indicator */}
        <div className="flex items-center gap-2 mt-2 text-xs text-(--text-tertiary) dark:text-(--text-tertiary-dark)">
          <Shield className="w-3 h-3" />
          <span>Messages are end-to-end encrypted</span>
        </div>
      </div>
    </div>
  );
}
