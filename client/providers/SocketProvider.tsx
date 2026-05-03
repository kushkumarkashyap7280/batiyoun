'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthProvider';
import { useQueryClient } from '@tanstack/react-query';

export type ChatMessage = {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isPending?: boolean;
};

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  offlineUsers: Set<string>;
  sendMessage: (params: {
    senderId: string;
    receiverId: string;
    content: string;
    conversationId?: string;
  }) => void;
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  offlineUsers: new Set(),
  sendMessage: () => {},
  joinConversation: () => {},
  leaveConversation: () => {},
});

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [offlineUsers, setOfflineUsers] = useState<Set<string>>(new Set());
  const { user, isLoading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    if (socket) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000', {
      withCredentials: true,
      auth: { token: user.socketToken },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => setIsConnected(true));
    socketInstance.on('disconnect', () => setIsConnected(false));

    // ── Online / offline ─────────────────────────────────────────────────────
    socketInstance.on('user:online', ({ userId }: { userId: string }) => {
      setOnlineUsers((prev) => new Set(prev).add(userId));
      setOfflineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    });

    socketInstance.on('user:offline', ({ userId }: { userId: string }) => {
      setOfflineUsers((prev) => new Set(prev).add(userId));
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    });

    // ── Messages (received by other user) ────────────────────────────────────
    socketInstance.on('message:received', (msg: ChatMessage) => {
      const convId = msg.conversationId.toString();
      queryClient.setQueryData(['messages', convId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: [
            { ...old.pages[0], messages: [...old.pages[0].messages, msg] },
            ...old.pages.slice(1),
          ],
        };
      });
    });

    // ── Messages (sent by current user — server confirmation) ────────────────
    socketInstance.on('message:sent', (msg: ChatMessage) => {
      document.dispatchEvent(new CustomEvent('__batiyoun:message:sent', { detail: msg }));

      const convId = msg.conversationId.toString();
      queryClient.setQueryData(['messages', convId], (old: any) => {
        if (!old || !old.pages) return old;
        
        let replaced = false;
        const newMessages = old.pages[0].messages.map((m: any) => {
          // Replace the oldest temp message from this sender
          if (!replaced && String(m._id).startsWith('temp-') && m.senderId === msg.senderId) {
            replaced = true;
            return msg; 
          }
          return m;
        });

        if (!replaced) {
          newMessages.push(msg); // Fallback: append if no pending match found
        }

        return {
          ...old,
          pages: [
            { ...old.pages[0], messages: newMessages },
            ...old.pages.slice(1),
          ],
        };
      });
    });

    // ── Conversation list update ─────────────────────────────────────────────
    socketInstance.on('conversation:updated', ({ conversationId, lastMessage }: any) => {
      const cid = conversationId.toString();
      queryClient.setQueryData(['conversations'], (old: any) => {
        if (!old) return old;

        let dataArray: any[] = [];
        if (Array.isArray(old)) {
          dataArray = old;
        } else if (old.data && Array.isArray(old.data)) {
          dataArray = old.data;
        } else {
          return old; // Unrecognized format, don't crash
        }

        const updated = dataArray.map((conv: any) =>
          conv._id === cid ? { ...conv, lastMessage, updatedAt: new Date().toISOString() } : conv,
        );
        
        const sorted = updated.sort(
          (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );

        if (Array.isArray(old)) {
          return sorted;
        } else {
          return { ...old, data: sorted };
        }
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoading]);

  const sendMessage = useCallback(
    (params: {
      senderId: string;
      receiverId: string;
      content: string;
      conversationId?: string;
    }) => {
      if (params.conversationId) {
        // Optimistic UI update
        const tempMsg: ChatMessage = {
          _id: `temp-${Date.now()}`,
          conversationId: params.conversationId,
          senderId: params.senderId,
          content: params.content,
          createdAt: new Date().toISOString(),
          isPending: true,
        };

        queryClient.setQueryData(['messages', params.conversationId], (old: any) => {
          if (!old || !old.pages) return old;
          return {
            ...old,
            pages: [
              { ...old.pages[0], messages: [...old.pages[0].messages, tempMsg] },
              ...old.pages.slice(1),
            ],
          };
        });
      }

      socket?.emit('message:send', params);
    },
    [socket, queryClient],
  );

  const joinConversation = useCallback(
    (conversationId: string) => {
      socket?.emit('conversation:join', { conversationId });
    },
    [socket],
  );

  const leaveConversation = useCallback(
    (conversationId: string) => {
      socket?.emit('conversation:leave', { conversationId });
    },
    [socket],
  );

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, onlineUsers, offlineUsers, sendMessage, joinConversation, leaveConversation }}
    >
      {children}
    </SocketContext.Provider>
  );
}
