import React from 'react';
import styles from './hero.module.css';
import { MessageCircle, Zap, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <Zap size={16} className={styles.badgeIcon} />
          <span>Next-Generation Chat</span>
        </div>
        <h1 className={styles.title}>
          Connect Beyond <br/>
          <span className={styles.highlight}>Boundaries</span>
        </h1>
        <p className={styles.description}>
          Batiyoun delivers lightning-fast, secure, and beautiful messaging for teams and communities. Experience real-time communication reimagined.
        </p>
        <div className={styles.ctaGroup}>
          <button className={styles.primaryBtn}>
            <MessageCircle size={20} />
            Start Chatting Free
          </button>
          <button className={styles.secondaryBtn}>
            <Shield size={20} />
            Learn More
          </button>
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.glowBlob}></div>
        <div className={styles.glassCard}>
          <div className={styles.chatHeader}>
            <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun" className={styles.avatar} />
            <div>
              <div className={styles.chatName}>Batiyoun Team</div>
              <div className={styles.onlineStatus}>Online</div>
            </div>
          </div>
          <div className={styles.chatBody}>
            <div className={`${styles.message} ${styles.messageReceived}`}>
              Welcome to the future of chat! 🚀
            </div>
            <div className={`${styles.message} ${styles.messageSent}`}>
              The design looks amazing. Love the colors!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
