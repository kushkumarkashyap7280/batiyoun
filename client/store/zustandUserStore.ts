import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ZustandUser } from '@/types/types';
import { toast } from 'sonner';

interface UserState {
  user: ZustandUser | null;
  isDark: boolean;

  // Actions
  setUser: (user: ZustandUser | null) => void;
  logout: () => void;
  toggleTheme: () => void;
  refreshAccessToken: () => Promise<boolean>; // Returns true if session is alive
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isDark: true,

      setUser: (user) => set({ user }),

      // Just clear data. Let the UI reactively redirect.
      logout: () => set({ user: null }),

      toggleTheme: () =>
        set((state) => {
          const newMode = !state.isDark;
          if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', newMode);
          }
          return { isDark: newMode };
        }),

      // ⚡ The "One Function to Rule Them All"
      refreshAccessToken: async () => {
        if (!navigator.onLine) {
          toast.error('You are offline');
          return false;
        }

        try {
          // We call verify-me. It handles the cookies automatically.
          const res = await fetch('/api/auth/verify-me');

          if (res.ok) {
            const data = await res.json();

            // 1. Update User
            set({ user: data.user });

            // 2. IMPORTANT: If you want Socket to work with cookies,
            // you might need to broadcast that "Cookies are fresh"
            // even if you don't return the token string.
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('session-refreshed'));
            }

            return true;
          } else if (res.status === 401) {
            // 3. Session died? Nullify user.
            // The (main) layout will see this and kick them out.
            set({ user: null });
            toast.error('Session expired');
            return false;
          }

          return false;
        } catch (error) {
          console.error('Refresh failed:', error);
          return false;
        }
      },
    }),
    {
      name: 'batiyoun-user-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', state.isDark);
        }
      },
    },
  ),
);
