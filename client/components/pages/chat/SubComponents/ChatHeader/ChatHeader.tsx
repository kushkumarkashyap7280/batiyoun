'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './ChatHeader.module.css';

type User = {
  _id: string;
  username: string;
  fullName: string;
  avatar: string | null;
};

type Props = {
  otherUser: User | undefined;
  isOnline: boolean;
  conversationId: string;
};

export default function ChatHeader({ otherUser, isOnline, conversationId }: Props) {
  const router = useRouter();
  const initial = otherUser
    ? (otherUser.fullName || otherUser.username || 'U').charAt(0).toUpperCase()
    : '?';

  return (
    <header className={styles.header} id={`chat-header-${conversationId}`}>
      <button
        className={styles.backBtn}
        onClick={() => router.push('/chats')}
        aria-label="Back to chats"
      >
        <ArrowLeft size={20} />
      </button>

      <div className={styles.userInfo}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{initial}</div>
          {isOnline && <span className={styles.onlineDot} />}
        </div>
        <div className={styles.names}>
          <span className={styles.name}>{otherUser?.fullName || otherUser?.username || '…'}</span>
          <span className={`${styles.status} ${isOnline ? styles.online : ''}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </header>
  );
}
