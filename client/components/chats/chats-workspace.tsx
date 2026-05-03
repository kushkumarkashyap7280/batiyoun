"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import UserSearch, { UserSearchResultUser } from "@/components/chats/UserSearch";
import {
  Send,
  Loader2,
  Plus,
  ArrowLeft,
  MessageSquare,
  Users,
  Globe,
  Wifi,
  WifiOff,
  Shield,
  Clock,
} from "lucide-react";
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
        content: "Welcome to the Global Room 🚀 This is a live feed where everyone can chat.",
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
        content: "I'll send the final assets after lunch.",
        timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      },
    ],
  },
];

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getAvatarColor(name: string) {
  const colors = [
    "linear-gradient(135deg, #7C3AED, #06B6D4)",
    "linear-gradient(135deg, #06B6D4, #10B981)",
    "linear-gradient(135deg, #F59E0B, #EF4444)",
    "linear-gradient(135deg, #EC4899, #8B5CF6)",
    "linear-gradient(135deg, #10B981, #06B6D4)",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export default function ChatsWorkspace() {
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const { setHideMobileNav } = useWorkspace();
  const [threads, setThreads] = useState<ChatThread[]>(createSeedThreads);
  const [activeThreadId, setActiveThreadId] = useState(globalRoomId);
  const [composerValue, setComposerValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Mobile: "threads" | "chat"
  const [mobileView, setMobileView] = useState<"threads" | "chat">("threads");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLInputElement>(null);

  // Hide floating nav when in chat view on mobile
  useEffect(() => {
    setHideMobileNav(mobileView === "chat");
    return () => setHideMobileNav(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileView]);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) || threads[0],
    [activeThreadId, threads]
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  // Socket receive
  useEffect(() => {
    if (!socket) return;
    const handleReceive = (message: ChatMessage) => {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === globalRoomId ? { ...t, messages: [...t.messages, message] } : t
        )
      );
    };
    socket.on("receiveMessage", handleReceive);
    return () => { socket.off("receiveMessage", handleReceive); };
  }, [socket]);

  const handleStartDirectChat = (selectedUser: UserSearchResultUser) => {
    const threadId = `direct-${selectedUser._id}`;
    setThreads((prev) => {
      const existing = prev.find((t) => t.id === threadId);
      if (existing) {
        return [existing, ...prev.filter((t) => t.id !== threadId)];
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
            id: `${threadId}-start`,
            senderId: selectedUser._id,
            senderName: selectedUser.fullName,
            content: "You started a conversation. Say hello! 👋",
            timestamp: new Date().toISOString(),
          },
        ],
      };
      return [newThread, ...prev];
    });
    setActiveThreadId(threadId);
    setIsSearchOpen(false);
    setMobileView("chat");
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setMobileView("chat");
    setTimeout(() => composerRef.current?.focus(), 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerValue.trim() || !user || !activeThread || isSending) return;

    setIsSending(true);
    try {
      const newMessage: ChatMessage = {
        id: `${Date.now()}-${Math.random()}`,
        senderId: user.id,
        senderName: user.fullName || user.username,
        content: composerValue.trim(),
        timestamp: new Date().toISOString(),
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThread.id
            ? { ...t, messages: [...t.messages, newMessage] }
            : t
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

  const handleBackToThreads = () => {
    setMobileView("threads");
  };

  const lastMessageOf = (thread: ChatThread) => {
    const msgs = thread.messages;
    if (!msgs.length) return null;
    return msgs[msgs.length - 1];
  };

  return (
    <>
      <div className={styles.workspace}>
        {/* ── Thread List ─────────────────────────────── */}
        <aside className={`${styles.threadColumn} ${mobileView === "chat" ? styles.threadColumnHidden : ""}`}>
          {/* Header */}
          <div className={styles.threadHeader}>
            <div className={styles.threadHeaderLeft}>
              <h1 className={styles.threadTitle}>Messages</h1>
              <span className={`${styles.statusBadge} ${isConnected ? styles.statusOnline : styles.statusOffline}`}>
                {isConnected ? <Wifi size={11} /> : <WifiOff size={11} />}
                {isConnected ? "Live" : "Offline"}
              </span>
            </div>
            <button
              type="button"
              className={styles.fabButton}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Start new chat"
              title="Start new chat"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Thread count */}
          <p className={styles.threadCount}>{threads.length} conversations</p>

          {/* Thread list */}
          <div className={styles.threadList}>
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const last = lastMessageOf(thread);
              return (
                <button
                  key={thread.id}
                  type="button"
                  className={`${styles.threadItem} ${isActive ? styles.threadItemActive : ""}`}
                  onClick={() => handleSelectThread(thread.id)}
                >
                  <div
                    className={styles.threadAvatar}
                    style={{ background: getAvatarColor(thread.title) }}
                  >
                    {thread.kind === "room" ? (
                      <Globe size={17} color="white" />
                    ) : (
                      thread.title.charAt(0).toUpperCase()
                    )}
                    {thread.online && <span className={styles.onlineDot} />}
                  </div>
                  <div className={styles.threadMeta}>
                    <span className={styles.threadName}>{thread.title}</span>
                    {last && (
                      <span className={styles.threadPreview}>
                        {last.content.length > 40
                          ? last.content.substring(0, 40) + "…"
                          : last.content}
                      </span>
                    )}
                  </div>
                  <div className={styles.threadTime}>
                    {last && (
                      <span className={styles.threadTimestamp}>{formatTime(last.timestamp)}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </aside>

        {/* ── Conversation Pane ──────────────────────── */}
        <section className={`${styles.chatPane} ${mobileView === "threads" ? styles.chatPaneHidden : ""}`}>
          {/* Chat header */}
          <header className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBackToThreads}
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>
              <div
                className={styles.chatAvatar}
                style={{ background: getAvatarColor(activeThread.title) }}
              >
                {activeThread.kind === "room" ? (
                  <Globe size={16} color="white" />
                ) : (
                  activeThread.title.charAt(0).toUpperCase()
                )}
              </div>
              <div className={styles.chatHeaderInfo}>
                <h2 className={styles.chatName}>{activeThread.title}</h2>
                <span className={styles.chatSubtitle}>
                  {activeThread.online ? (
                    <>
                      <span className={styles.onlineDotSmall} />
                      Online
                    </>
                  ) : (
                    activeThread.subtitle
                  )}
                </span>
              </div>
            </div>
            <div className={styles.chatHeaderRight}>
              <span className={`${styles.connBadge} ${isConnected ? styles.connOnline : styles.connOffline}`}>
                {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
              </span>
            </div>
          </header>

          {/* Messages */}
          <div className={styles.messageList}>
            {activeThread.messages.length === 0 ? (
              <div className={styles.emptyChat}>
                <Users size={36} strokeWidth={1.2} />
                <p>No messages yet. Say hello! 👋</p>
              </div>
            ) : (
              activeThread.messages.map((msg) => {
                const isMine = msg.senderId === user?.id;
                const isSystem = msg.senderId === "system";
                if (isSystem) {
                  return (
                    <div key={msg.id} className={styles.systemMessage}>
                      <MessageSquare size={13} />
                      <span>{msg.content}</span>
                    </div>
                  );
                }
                return (
                  <div
                    key={msg.id}
                    className={`${styles.messageRow} ${isMine ? styles.messageRowMine : ""}`}
                  >
                    {!isMine && (
                      <div
                        className={styles.msgAvatar}
                        style={{ background: getAvatarColor(msg.senderName) }}
                      >
                        {msg.senderName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className={`${styles.bubble} ${isMine ? styles.bubbleMine : styles.bubbleTheirs}`}>
                      {!isMine && (
                        <strong className={styles.bubbleSender}>{msg.senderName}</strong>
                      )}
                      <p className={styles.bubbleText}>{msg.content}</p>
                      <span className={styles.bubbleTime}>
                        <Clock size={10} />
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <form className={styles.composer} onSubmit={handleSendMessage}>
            <div className={styles.composerWrap}>
              <input
                ref={composerRef}
                type="text"
                className={styles.composerInput}
                value={composerValue}
                onChange={(e) => setComposerValue(e.target.value)}
                placeholder={
                  activeThread.kind === "room"
                    ? "Message the global room…"
                    : `Message ${activeThread.title}…`
                }
                disabled={isSending}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!composerValue.trim() || isSending}
              aria-label="Send message"
            >
              {isSending ? (
                <Loader2 size={18} className={styles.spin} />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
        </section>
      </div>

      {/* User Search Modal */}
      <UserSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectUser={handleStartDirectChat}
      />
    </>
  );
}