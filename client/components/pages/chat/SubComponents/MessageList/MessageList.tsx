'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import MessageBubble from '../MessageBubble/MessageBubble';
import styles from './MessageList.module.css';
import { ChatMessage } from '@/providers/SocketProvider';

type Props = {
  messages: ChatMessage[];
  currentUserId: string;
  isLoading: boolean;
  hasMore: boolean;
  isFetchingMore: boolean;
  onLoadMore: () => void;
};

export default function MessageList({
  messages,
  currentUserId,
  isLoading,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection observer for infinite scrolling (load more when scrolling to top)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetchingMore, onLoadMore]);

  // Scroll to bottom on initial load or when new message is sent/received
  // (We only auto-scroll if we're already near the bottom to not annoy the user)
  useEffect(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // If we're within 100px of the bottom, or it's the very first load
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (isNearBottom || messages.length <= 20) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (isLoading && messages.length === 0) {
    return (
      <div className={styles.center}>
        <Loader2 size={24} className={styles.spin} />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.scrollArea}>
        {/* Intersection target for loading more */}
        <div ref={observerTarget} className={styles.observerTarget}>
          {isFetchingMore && <Loader2 size={16} className={styles.spin} />}
        </div>

        {messages.length === 0 && !isLoading && (
          <div className={styles.empty}>
            <p>No messages yet. Say hi!</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isMe = msg.senderId === currentUserId;
          // Simple heuristic for showing timestamp: only if > 5 mins difference from prev msg
          let showTimestamp = false;
          if (idx === 0) {
            showTimestamp = true;
          } else {
            const prevMsg = messages[idx - 1];
            const diffMs =
              new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime();
            if (diffMs > 5 * 60 * 1000) showTimestamp = true;
          }

          return (
            <MessageBubble
              key={msg._id || `temp-${idx}`}
              message={msg}
              isMe={isMe}
              showTimestamp={showTimestamp}
            />
          );
        })}
      </div>
    </div>
  );
}
