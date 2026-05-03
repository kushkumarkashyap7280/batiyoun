import React, { useEffect, useState } from 'react';
import { ShieldCheck, Smartphone, Zap, Loader2, Lock } from 'lucide-react';
import styles from './LoadingAuth.module.css';

const LoadingAuth = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.overlay}>
      {/* Background decorations */}
      <div className={`${styles.decoration} ${styles.decoration1}`}></div>
      <div className={`${styles.decoration} ${styles.decoration2}`}></div>

      <div className={styles.contentWrapper}>
        {/* Logo and Loader */}
        <div className={styles.logoSection}>
          <div className={styles.logoGlow}></div>

          <div className={styles.logoRings}>
            {/* Outer spinning ring */}
            <svg className={`${styles.ringSvg} ${styles.ringOuter}`} viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(59, 130, 246, 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(59, 130, 246, 0.8)"
                strokeWidth="2"
                strokeDasharray="60 200"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner pulsing ring */}
            <svg className={`${styles.ringSvg} ${styles.ringInner}`} viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(168, 85, 247, 0.8)"
                strokeWidth="2"
                strokeDasharray="40 200"
                strokeLinecap="round"
              />
            </svg>

            {/* Logo Image */}
            <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun Logo" className={styles.logo} />
          </div>
        </div>

        {/* Status Text */}
        <div className={styles.statusSection}>
          <h2 className={styles.statusTitle}>Connecting Workspace</h2>
          <div className={styles.statusBadge}>
            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
            <p className="text-sm tracking-wide">
              Connecting your workspace to Batiyoun server<span>{dots}</span>
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className={styles.featuresContainer}>
          {/* Feature 1: E2E */}
          <div className={styles.featureItem}>
            <div className={`${styles.featureIconWrapper} ${styles.iconSecure}`}>
              <Lock className="w-6 h-6" />
            </div>
            <div className={styles.featureContent}>
              <h3>
                End-to-End Secure Chat{' '}
                <ShieldCheck className="inline w-4 h-4 text-green-400 ml-1" />
              </h3>
              <p>
                Your messages are fully encrypted. Complete privacy and security guaranteed with
                your partner in chat.
              </p>
            </div>
          </div>

          {/* Feature 2: PWA */}
          <div className={styles.featureItem} style={{ animationDelay: '0.1s' }}>
            <div className={`${styles.featureIconWrapper} ${styles.iconPwa}`}>
              <Smartphone className="w-6 h-6" />
            </div>
            <div className={styles.featureContent}>
              <h3>Install as Native App</h3>
              <p>
                Batiyoun is a PWA! You can download it as an app and work seamlessly across all your
                devices.
              </p>
            </div>
          </div>

          {/* Feature 3: Server Wakeup */}
          <div className={styles.featureItem} style={{ animationDelay: '0.2s' }}>
            <div className={`${styles.featureIconWrapper} ${styles.iconServer}`}>
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div className={styles.featureContent}>
              <h3>Waking Up Server</h3>
              <p>
                Free tier servers may take a moment to wake up if inactive. Thank you for your
                patience!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAuth;
