'use client';

import { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Loader2, Check, AlertCircle } from 'lucide-react';
import { useSocket } from '@/providers/SocketProvider';
import { toast } from 'sonner';
import styles from './MessageInput.module.css';

type Props = {
  conversationId: string;
  currentUserId: string;
  otherUserId: string;
};

type SendState = 'idle' | 'loading' | 'success' | 'error';

export default function MessageInput({ conversationId, currentUserId, otherUserId }: Props) {
  const [content, setContent] = useState('');
  const [sendState, setSendState] = useState<SendState>('idle');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useSocket();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [content]);

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed || sendState === 'loading' || sendState === 'success') return;

    setSendState('loading');

    try {
      sendMessage({
        senderId: currentUserId,
        receiverId: otherUserId,
        content: trimmed,
        conversationId,
      });

      // Optimistic UX: we wait briefly then assume success to show tick,
      // actual error handling would involve socket acks, but for MVP this is smooth.
      // The socket provider handles updating the UI instantly.
      setContent('');
      setSendState('success');

      setTimeout(() => {
        setSendState('idle');
        textareaRef.current?.focus();
      }, 1000);
    } catch (err) {
      setSendState('error');
      toast.error('Failed to send message');
      setTimeout(() => setSendState('idle'), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrap}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={sendState === 'loading'}
        />

        <button
          className={`${styles.sendBtn} ${styles[sendState]}`}
          onClick={handleSend}
          disabled={!content.trim() || sendState === 'loading' || sendState === 'success'}
          aria-label="Send message"
        >
          {sendState === 'idle' && <SendHorizonal size={18} />}
          {sendState === 'loading' && <Loader2 size={18} className={styles.spin} />}
          {sendState === 'success' && <Check size={18} />}
          {sendState === 'error' && <AlertCircle size={18} />}
        </button>
      </div>
    </div>
  );
}
