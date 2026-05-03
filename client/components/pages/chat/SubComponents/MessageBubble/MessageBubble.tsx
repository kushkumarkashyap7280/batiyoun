'use client';

import { Clock } from 'lucide-react';
import { ChatMessage } from '@/providers/SocketProvider';
import styles from './MessageBubble.module.css';

type Props = {
  message: ChatMessage;
  isMe: boolean;
  showTimestamp: boolean;
};

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ message, isMe, showTimestamp }: Props) {
  return (
    <div className={`${styles.wrapper} ${isMe ? styles.me : styles.them}`}>
      {showTimestamp && (
        <div className={styles.timestampDivider}>
          <span>{formatTime(message.createdAt)}</span>
        </div>
      )}
      <div className={styles.bubble}>
        <span className={styles.content}>{message.content}</span>
        <div className={styles.meta}>
          <span className={styles.time}>{formatTime(message.createdAt)}</span>
          {isMe && message.isPending && (
            <span className={styles.pendingIcon} title="Sending...">
              <Clock size={10} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
