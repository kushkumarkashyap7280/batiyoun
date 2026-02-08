'use client';

import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    // 1. Check if browser supports SW
    if ('serviceWorker' in navigator) {
      // 2. Register it manually
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ SW Registered manually:', registration.scope);
        })
        .catch((error) => {
          console.error('❌ SW Registration failed:', error);
        });
    }
  }, []);

  return null; // It renders nothing visibly
}