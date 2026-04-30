"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { Send, Menu, Settings, Users, LogOut, Search, PlusCircle, User, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useSocket } from "@/providers/SocketProvider";
import { logoutBUser } from "@/apis/api";

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
};

export default function ChatClientPage() {
  const { user, checkAuth } = useAuth();
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !socket || !user) return;

    const newMessage = {
      content: inputValue,
      senderId: user.id,
      senderName: user.fullName || user.username,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", newMessage);
    
    // Optimistic update
    setMessages((prev) => [
      ...prev,
      { ...newMessage, id: Date.now().toString() }
    ]);
    
    setInputValue("");
  };

  const handleLogout = async () => {
    try {
      await logoutBUser();
      await checkAuth(); // Will redirect to home/login
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} size={48} />
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/batiyoun-logo-removed-bg.png" alt="Logo" className={styles.logo} />
          <h2>Batiyoun</h2>
        </div>

        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search chats..." className={styles.searchInput} />
        </div>

        <div className={styles.chatList}>
          <div className={`${styles.chatItem} ${styles.chatItemActive}`}>
            <div className={styles.avatar}>
              <Users size={20} />
            </div>
            <div className={styles.chatInfo}>
              <span className={styles.chatName}>Global Room</span>
              <span className={styles.chatPreview}>Welcome to Batiyoun!</span>
            </div>
          </div>
          {/* Add more mock or real rooms here */}
        </div>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <User size={20} />
            </div>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{user.fullName || user.username}</span>
              <span className={styles.userStatus}>
                <span className={styles.statusDot}></span> Online
              </span>
            </div>
          </div>
          <button className={styles.iconButton} onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={styles.main}>
        <header className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <h2>Global Room</h2>
            <span className={styles.connectionStatus}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconButton}><Search size={20} /></button>
            <button className={styles.iconButton}><Settings size={20} /></button>
          </div>
        </header>

        <div className={styles.messagesContainer}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <img src="/batiyoun-logo-removed-bg.png" alt="Empty" className={styles.emptyLogo} />
              <p>No messages here yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === user.id;
              return (
                <div key={msg.id} className={`${styles.messageWrapper} ${isMine ? styles.myMessage : ""}`}>
                  {!isMine && (
                    <div className={styles.messageAvatar}>
                      {msg.senderName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    {!isMine && <span className={styles.messageSender}>{msg.senderName}</span>}
                    <div className={styles.messageBubble}>
                      {msg.content}
                    </div>
                    <span className={styles.messageTime}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputArea} onSubmit={handleSendMessage}>
          <button type="button" className={styles.attachButton}>
            <PlusCircle size={24} />
          </button>
          <input
            type="text"
            className={styles.messageInput}
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit" 
            className={styles.sendButton} 
            disabled={!inputValue.trim() || !isConnected}
          >
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
}
