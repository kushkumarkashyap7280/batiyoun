'use client';

import Link from 'next/link';
import { useSocket } from '@/providers/SocketProvider';
import styles from './ChatListItem.module.css';

type Participant = {
  _id: string;
  username: string;
  fullName: string;
  avatar: string | null;
  isOnline: boolean;
};

type LastMessage = {
  _id: string;
  content: string;
  senderId: string;
  createdAt: string;
} | null;

type Props = {
  conversation: {
    _id: string;
    participants: Participant[];
    lastMessage: LastMessage;
    updatedAt: string;
  };
  currentUserId: string;
};

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function ChatListItem({ conversation, currentUserId }: Props) {
  const { onlineUsers, offlineUsers } = useSocket();

  const otherUser = conversation.participants.find((p) => p._id !== currentUserId);
  if (!otherUser) return null;

  const isOnline = 
    onlineUsers.has(otherUser._id) || 
    (otherUser.isOnline && !offlineUsers.has(otherUser._id));
    
  const initial = (otherUser.fullName || otherUser.username || 'U').charAt(0).toUpperCase();
  const lastMsg = conversation.lastMessage;
  const isFromMe = lastMsg?.senderId === currentUserId;
  const timeStr = conversation.updatedAt ? formatTime(conversation.updatedAt) : '';

  return (
    <Link
      href={`/chats/${conversation._id}`}
      className={styles.item}
      id={`chat-item-${conversation._id}`}
    >
      {/* Avatar */}
      <div className={styles.avatarWrap}>
        <div className={styles.avatar}>{initial}</div>
        {isOnline && <span className={styles.onlineDot} aria-label="Online" />}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.name}>{otherUser.fullName || otherUser.username}</span>
          {timeStr && <span className={styles.time}>{timeStr}</span>}
        </div>
        <div className={styles.bottomRow}>
          <span className={styles.preview}>
            {lastMsg ? (
              <>
                {isFromMe && <span className={styles.you}>You: </span>}
                {lastMsg.content}
              </>
            ) : (
              <span className={styles.noMsg}>No messages yet</span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
