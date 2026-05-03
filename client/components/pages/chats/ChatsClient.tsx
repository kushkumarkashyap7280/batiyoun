'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyConversations } from '@/apis/api';
import { useAuth } from '@/providers/AuthProvider';
import SearchUser from './SubComponents/SearchUser/SearchUser';
import ChatList from './SubComponents/ChatList/ChatList';
import styles from './ChatsClient.module.css';

export default function ChatsClient() {
  const { user } = useAuth();

  const {
    data: conversationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: getMyConversations,
    enabled: !!user,
  });

  const conversations = conversationsData?.data ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Messages</h1>
      </div>

      <div className={styles.searchSection}>
        <SearchUser currentUserId={user?.id ?? ''} conversations={conversations} />
      </div>

      <div className={styles.listSection}>
        <ChatList
          conversations={conversations}
          currentUserId={user?.id ?? ''}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
