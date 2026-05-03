'use client';

import { Loader2, MessageSquare } from 'lucide-react';
import ChatListItem from '../ChatListItem/ChatListItem';
import styles from './ChatList.module.css';

type Props = {
  conversations: any[];
  currentUserId: string;
  isLoading: boolean;
  error: Error | null;
};

export default function ChatList({ conversations, currentUserId, isLoading, error }: Props) {
  if (isLoading) {
    return (
      <div className={styles.center}>
        <Loader2 size={24} className={styles.spin} />
        <span>Loading conversations…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <span className={styles.errorText}>Failed to load conversations.</span>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className={styles.empty}>
        <MessageSquare size={40} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>No conversations yet</p>
        <p className={styles.emptyHint}>Search for a user above to start chatting</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {conversations.map((conv) => (
        <ChatListItem key={conv._id} conversation={conv} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
