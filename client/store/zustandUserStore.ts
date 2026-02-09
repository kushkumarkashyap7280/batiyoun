import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ZustandUser } from '@batiyoun/common';

interface UserState {
  user: ZustandUser | null;
  setUser: (user: ZustandUser) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'batiyoun-user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);