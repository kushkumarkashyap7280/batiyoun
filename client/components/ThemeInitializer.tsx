'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/zustandUserStore';

export function ThemeInitializer() {
  useEffect(() => {
    // 1. Read LocalStorage
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 2. Decide if we need Dark Mode
    // (If stored is 'dark', OR if no storage but system is dark)
    const shouldBeDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);

    // 3. Update DOM & Store if needed
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      // We manually update the store state to match
      useUserStore.setState({ isDark: true });
    } else {
      document.documentElement.classList.remove('dark');
      if (!storedTheme) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  return null; // This component renders nothing
}
