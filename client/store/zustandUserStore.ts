import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ZustandUser } from '@/types/types';

interface UserState {
  user: ZustandUser | null;
  isDark: boolean;
  setUser: (user: ZustandUser) => void;
  logout: () => void;
  toggleTheme: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isDark: true,

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      
      toggleTheme: () => set((state) => {
        const newMode = !state.isDark;
        // Update DOM immediately on click
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', newMode);
        }
        return { isDark: newMode };
      }),
    }),
    {
      name: 'batiyoun-user-storage',
      storage: createJSONStorage(() => localStorage),

      // 🎯 The Callback: Only for HTML/CSS
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          // Sync the HTML class with the loaded state
          document.documentElement.classList.toggle('dark', state.isDark);
        }
      },
    }
  )
);