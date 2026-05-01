"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import UserSearch, { UserSearchResultUser } from "@/components/chat/UserSearch";
import { ArrowUpRight, Bell, MessageSquareText, Send, Sparkles, Users, Loader2 } from "lucide-react";
import styles from "./chats-workspace.module.css";

type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
};

type ChatThread = {
  id: string;
  title: string;
  subtitle: string;
  kind: "room" | "direct";
  online?: boolean;
  user?: UserSearchResultUser;
  messages: ChatMessage[];
};

const globalRoomId = "global-room";

const createSeedThreads = (): ChatThread[] => [
  {
    id: globalRoomId,
    title: "Global Room",
    subtitle: "Everyone in one live feed",
    kind: "room",
    online: true,
    messages: [
      {
        id: "welcome-1",
        senderId: "system",
        senderName: "Batiyoun",
        content: "Welcome to the global room.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: "thread-1",
    title: "Maya Chen",
    subtitle: "@maya",
    kind: "direct",
    online: true,
    user: { _id: "maya", username: "maya", email: "maya@example.com", fullName: "Maya Chen" },
    messages: [
      {
        id: "maya-1",
        senderId: "maya",
        senderName: "Maya Chen",
        content: "Can you review the latest design notes?",
        timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
      },
    ],
  },
  {
    id: "thread-2",
    title: "Alex Morgan",
    subtitle: "@alex",
    kind: "direct",
    online: false,
    user: { _id: "alex", username: "alex", email: "alex@example.com", fullName: "Alex Morgan" },
    messages: [
      {
        id: "alex-1",
        senderId: "alex",
        senderName: "Alex Morgan",
        content: "I’ll send the final assets after lunch.",
        timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      },
    ],
  },
];

export default function ChatsWorkspace() {
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const [threads, setThreads] = useState<ChatThread[]>(createSeedThreads);
  const [activeThreadId, setActiveThreadId] = useState(globalRoomId);
  const [composerValue, setComposerValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || threads[0],
    [activeThreadId, threads]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message: ChatMessage) => {
      setThreads((currentThreads) =>
        currentThreads.map((thread) =>
          thread.id === globalRoomId
            ? { ...thread, messages: [...thread.messages, message] }
            : thread
        )
      );
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]);

  const handleStartDirectChat = (selectedUser: UserSearchResultUser) => {
    const threadId = `direct-${selectedUser._id}`;

    setThreads((currentThreads) => {
      const existingThread = currentThreads.find((thread) => thread.id === threadId);
      if (existingThread) {
        return [existingThread, ...currentThreads.filter((thread) => thread.id !== threadId)];
      }

      const newThread: ChatThread = {
        id: threadId,
        title: selectedUser.fullName,
        subtitle: `@${selectedUser.username}`,
        kind: "direct",
        online: true,
        user: selectedUser,
        messages: [
          {
            id: `${threadId}-welcome`,
            senderId: selectedUser._id,
            senderName: selectedUser.fullName,
            content: "This chat started from search.",
            timestamp: new Date().toISOString(),
          },
        ],
      };

      return [newThread, ...currentThreads];
    });

    setActiveThreadId(threadId);
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
  };

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!composerValue.trim() || !user || !activeThread || isSending) return;

    setIsSending(true);
    try {
      const newMessage: ChatMessage = {
        id: `${Date.now()}`,
        senderId: user.id,
        senderName: user.fullName || user.username,
        content: composerValue.trim(),
        timestamp: new Date().toISOString(),
      };

      setThreads((currentThreads) =>
        currentThreads.map((thread) =>
          thread.id === activeThread.id
            ? { ...thread, messages: [...thread.messages, newMessage] }
            : thread
        )
      );

      if (activeThread.kind === "room" && socket && isConnected) {
        socket.emit("sendMessage", newMessage);
      }

      setComposerValue("");
    } finally {
      setIsSending(false);
    }
  };

  const activeMessages = activeThread?.messages || [];

  return (
    <div className={styles.workspace}>
      <aside className={styles.chatColumn}>
        <div className={styles.chatColumnHeader}>
          <div>
            <p className={styles.kicker}>Messages</p>
            <h2>Chats</h2>
          </div>
          <div className={styles.headerPills}>
            <span>{threads.length} threads</span>
            <span>{isConnected ? "Live" : "Offline"}</span>
          </div>
        </div>

        <UserSearch onSelectUser={handleStartDirectChat} />

        <div className={styles.threadList}>
          {threads.map((thread) => {
            const isActive = thread.id === activeThreadId;

            return (
              <button
                key={thread.id}
                type="button"
                className={`${styles.threadItem} ${isActive ? styles.threadItemActive : ""}`}
                onClick={() => handleSelectThread(thread.id)}
              >
                <div className={styles.threadAvatar}>{thread.kind === "room" ? <MessageSquareText size={18} /> : thread.title.charAt(0)}</div>
                <div className={styles.threadMeta}>
                  <strong>{thread.title}</strong>
                  <span>{thread.subtitle}</span>
                </div>
                <div className={styles.threadAside}>
                  {thread.online ? <span className={styles.onlineDot} /> : null}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section className={styles.conversationPane}>
        <header className={styles.conversationHeader}>
          <div>
            <p className={styles.kicker}>Conversation</p>
            <h1>{activeThread.title}</h1>
            <p className={styles.subtitle}>{activeThread.subtitle}</p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.ghostButton}>
              <Bell size={16} />
              Alerts
            </button>
            <button type="button" className={styles.ghostButton}>
              <Sparkles size={16} />
              Details
            </button>
          </div>
        </header>

        <div className={styles.messageList}>
          {activeMessages.length === 0 ? (
            <div className={styles.emptyConversation}>
              <Users size={32} />
              <p>No messages yet. Start the conversation.</p>
            </div>
          ) : (
            activeMessages.map((message) => {
              const isMine = message.senderId === user?.id;

              return (
                <div key={message.id} className={`${styles.messageRow} ${isMine ? styles.messageRowMine : ""}`}>
                  {!isMine ? <div className={styles.messageAvatar}>{message.senderName.charAt(0).toUpperCase()}</div> : null}
                  <div className={styles.messageBubble}>
                    {!isMine ? <strong>{message.senderName}</strong> : null}
                    <p>{message.content}</p>
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.composer} onSubmit={handleSendMessage}>
          <div className={styles.composerInputWrap}>
            <input
              type="text"
              value={composerValue}
              onChange={(event) => setComposerValue(event.target.value)}
              placeholder={`Message ${activeThread.kind === "room" ? "the room" : activeThread.title}`}
              className={styles.composerInput}
            />
          </div>
          <button type="submit" className={styles.sendButton} disabled={!composerValue.trim() || isSending}>
            {isSending ? (
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Send size={16} />
            )}
            Send
          </button>
        </form>
      </section>
    </div>
  );
}