'use client';

import { useEffect } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getConversationMessages, getConversationById } from '@/apis/api';
import { useAuth } from '@/providers/AuthProvider';
import { useSocket } from '@/providers/SocketProvider';
import { useWorkspace } from '@/providers/WorkspaceProvider';
import ChatHeader from './SubComponents/ChatHeader/ChatHeader';
import MessageList from './SubComponents/MessageList/MessageList';
import MessageInput from './SubComponents/MessageInput/MessageInput';
import styles from './ChatClient.module.css';

type Props = { conversationId: string };

export default function ChatClient({ conversationId }: Props) {
  const { user } = useAuth();
  const { joinConversation, leaveConversation, onlineUsers, offlineUsers } = useSocket();
  const { setHideMobileNav } = useWorkspace();

  // Hide mobile bottom nav when inside a conversation
  useEffect(() => {
    setHideMobileNav(true);
    return () => setHideMobileNav(false);
  }, [setHideMobileNav]);

  // Join socket room for this conversation
  useEffect(() => {
    joinConversation(conversationId);
    return () => leaveConversation(conversationId);
  }, [conversationId, joinConversation, leaveConversation]);

  // Fetch conversation metadata (participants, etc.)
  const { data: convData } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversationById(conversationId),
    enabled: !!conversationId,
  });

  const conversation = convData?.data;
  const otherUser = conversation?.participants?.find((p: any) => p._id !== user?.id);
  
  const isOtherOnline = !!otherUser && (
    onlineUsers.has(otherUser._id) || 
    (otherUser.isOnline && !offlineUsers.has(otherUser._id))
  );

  // Fetch messages with infinite scroll (page 1 = newest 20)
  const {
    data: messagesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: messagesLoading,
  } = useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: ({ pageParam = 1 }) =>
      getConversationMessages(conversationId, pageParam, 20).then((r) => r.data),
    getNextPageParam: (lastPage: any) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!conversationId,
  });

  // Flatten all pages — pages are already in chronological order per page,
  // newer pages (higher page number) contain OLDER messages, so reverse page order
  const allMessages = messagesData
    ? [...messagesData.pages].reverse().flatMap((page: any) => page.messages)
    : [];

  return (
    <div className={styles.container}>
      <ChatHeader otherUser={otherUser} isOnline={isOtherOnline} conversationId={conversationId} />

      <MessageList
        messages={allMessages}
        currentUserId={user?.id ?? ''}
        isLoading={messagesLoading}
        hasMore={!!hasNextPage}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />

      <MessageInput
        conversationId={conversationId}
        currentUserId={user?.id ?? ''}
        otherUserId={otherUser?._id ?? ''}
      />
    </div>
  );
}
