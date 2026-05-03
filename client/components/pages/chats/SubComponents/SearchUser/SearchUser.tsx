'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, X, Loader2, MessageSquarePlus, Check, AlertCircle } from 'lucide-react';
import { searchBUser } from '@/apis/api';
import { useSocket } from '@/providers/SocketProvider';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import styles from './SearchUser.module.css';

type SearchedUser = {
  _id: string;
  username: string;
  fullName: string;
  avatar: string | null;
};

type ConvMap = Record<string, string>; // userId → conversationId

type Props = {
  currentUserId: string;
  conversations: any[];
};

type SendState = 'idle' | 'loading' | 'success' | 'error';

export default function SearchUser({ currentUserId, conversations }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [firstMessages, setFirstMessages] = useState<Record<string, string>>({});
  const [sendStates, setSendStates] = useState<Record<string, SendState>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { sendMessage } = useSocket();
  const { user } = useAuth();
  const router = useRouter();

  // Build a map of userId → conversationId from existing conversations
  const convMap: ConvMap = {};
  conversations.forEach((conv) => {
    const other = conv.participants?.find((p: any) => p._id !== currentUserId);
    if (other) convMap[other._id] = conv._id;
  });

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const { data, isLoading } = useQuery({
    queryKey: ['search-users', debouncedQuery],
    queryFn: () => searchBUser(debouncedQuery, 1, 5),
    enabled: debouncedQuery.length >= 1,
  });

  const users: SearchedUser[] = data?.data?.users ?? [];

  const handleSendFirst = async (targetUser: SearchedUser) => {
    const msg = firstMessages[targetUser._id]?.trim();
    if (!msg || !user) return;

    setSendStates((p) => ({ ...p, [targetUser._id]: 'loading' }));
    try {
      // We emit via socket; the server creates the conversation and returns conversationId via message:sent
      // For first message, we need the conversationId from the server response
      // So we use a Promise + one-time socket listener
      const socket = (window as any).__batiyounSocket;
      let resolved = false;

      const cleanup = () => {
        if (socket) socket.off('message:sent', onSent);
        clearTimeout(timeout);
      };

      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          cleanup();
          setSendStates((p) => ({ ...p, [targetUser._id]: 'error' }));
          toast.error('Message timed out. Please try again.');
        }
      }, 8000);

      const onSent = (msg: any) => {
        if (!resolved) {
          resolved = true;
          cleanup();
          setSendStates((p) => ({ ...p, [targetUser._id]: 'success' }));
          setTimeout(() => {
            router.push(`/chats/${msg.conversationId}`);
          }, 500);
        }
      };

      sendMessage({ senderId: user.id, receiverId: targetUser._id, content: msg });

      // Listen for confirmation — SocketProvider will fire message:sent
      // We need access to socket here; workaround: listen via context or use a custom event
      document.addEventListener(
        '__batiyoun:message:sent',
        (e: any) => {
          onSent(e.detail);
        },
        { once: true },
      );
    } catch {
      setSendStates((p) => ({ ...p, [targetUser._id]: 'error' }));
      toast.error('Failed to send message.');
    }
  };

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setIsOpen(false);
  };

  const getInitial = (u: SearchedUser) => (u.fullName || u.username || 'U').charAt(0).toUpperCase();

  return (
    <div className={styles.wrapper}>
      {/* Search Input */}
      <div className={styles.inputWrap}>
        <Search size={16} className={styles.searchIcon} />
        <input
          id="search-user-input"
          className={styles.input}
          placeholder="Search by username…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
        />
        {query && (
          <button className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && debouncedQuery && (
        <div className={styles.dropdown}>
          {isLoading && (
            <div className={styles.loadingRow}>
              <Loader2 size={16} className={styles.spin} />
              <span>Searching…</span>
            </div>
          )}

          {!isLoading && users.length === 0 && (
            <div className={styles.emptyRow}>No users found for &ldquo;{debouncedQuery}&rdquo;</div>
          )}

          {!isLoading &&
            users
              .filter((u) => u._id !== currentUserId)
              .map((u) => {
                const existingConvId = convMap[u._id];
                const sendState = sendStates[u._id] ?? 'idle';

                return (
                  <div key={u._id} className={styles.resultCard}>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>{getInitial(u)}</div>
                      <div className={styles.names}>
                        <span className={styles.fullName}>{u.fullName}</span>
                        <span className={styles.username}>@{u.username}</span>
                      </div>
                    </div>

                    {existingConvId ? (
                      // Already have a conversation → go to it
                      <button
                        className={styles.goBtn}
                        onClick={() => router.push(`/chats/${existingConvId}`)}
                      >
                        Open chat
                      </button>
                    ) : (
                      // First message flow
                      <div className={styles.firstMsgWrap}>
                        <input
                          className={styles.firstMsgInput}
                          placeholder="Say hello…"
                          value={firstMessages[u._id] ?? ''}
                          onChange={(e) =>
                            setFirstMessages((p) => ({ ...p, [u._id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendFirst(u);
                          }}
                          disabled={sendState === 'loading' || sendState === 'success'}
                        />
                        <button
                          id={`send-first-msg-${u._id}`}
                          className={`${styles.sendBtn} ${styles[sendState]}`}
                          onClick={() => handleSendFirst(u)}
                          disabled={
                            !firstMessages[u._id]?.trim() ||
                            sendState === 'loading' ||
                            sendState === 'success'
                          }
                          aria-label="Send first message"
                        >
                          {sendState === 'idle' && <MessageSquarePlus size={15} />}
                          {sendState === 'loading' && <Loader2 size={15} className={styles.spin} />}
                          {sendState === 'success' && <Check size={15} />}
                          {sendState === 'error' && <AlertCircle size={15} />}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
}
