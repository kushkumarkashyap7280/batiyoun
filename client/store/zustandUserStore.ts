import { create } from 'zustand';
import { ZustandUserSchema, ZustandUser } from '@batiyoun/common';

interface UserState {
  user: ZustandUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDark: boolean;
  
  setUser: (user: ZustandUser) => void;
  logout: () => void;
  toggleTheme: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isDark: false, 

  setUser: (user) => set({ 
    user: ZustandUserSchema.parse(user),
    isAuthenticated: true, 
    isLoading: false 
  }),

  logout: () => set({ 
    user: null, 
    isAuthenticated: false, 
    isLoading: false 
  }),

  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDark;
    const root = document.documentElement;
    
    // Update DOM & Storage immediately
    if (newIsDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    return { isDark: newIsDark };
  }),
}));