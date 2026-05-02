"use client";

import React, { useEffect, useState, memo } from 'react';
import styles from './pwa.module.css';
import { Download, X } from 'lucide-react';

function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }

    const handler = (e: Event) => {
      e.preventDefault();
      
      // If the user has already interacted with or dismissed the prompt in this session, don't show it again
      const hasDismissed = sessionStorage.getItem('pwaPromptDismissed');
      if (hasDismissed) {
        return;
      }

      setDeferredPrompt(e);
      setIsVisible(true);
      // Mark as shown so it doesn't reappear on route changes if the component remounts
      sessionStorage.setItem('pwaPromptDismissed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    setIsVisible(false);
    sessionStorage.setItem('pwaPromptDismissed', 'true');
    
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwaPromptDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.promptContainer}>
      <div className={styles.promptCard}>
        <div className={styles.promptContent}>
          <div className={styles.iconContainer}>
            <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun App" className={styles.appIcon} />
          </div>
          <div className={styles.textContent}>
            <h4 className={styles.title}>Install Batiyoun</h4>
            <p className={styles.description}>Add to home screen for faster access and offline use.</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button onClick={handleInstallClick} className={styles.installBtn}>
            <Download size={16} />
            Install
          </button>
          <button onClick={handleClose} className={styles.closeBtn} aria-label="Close">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PWAInstallPrompt);
