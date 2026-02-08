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

  setUser: (user) => {
    console.log('[Store] setUser called with:', user);
    try {
      const parsedUser = ZustandUserSchema.parse(user);
      console.log('[Store] User parsed successfully:', parsedUser);
      
      set({ 
        user: parsedUser,
        isAuthenticated: true, 
        isLoading: false 
      });
      
      console.log('[Store] State updated:', {
        user: parsedUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('[Store] Error parsing user:', error);
      throw error;
    }
  },

  logout: () => {
    console.log('[Store] logout called');
    set({ 
      user: null, 
      isAuthenticated: false, 
      isLoading: false 
    });
    console.log('[Store] State after logout:', {
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  },

  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDark;
    console.log('[Store] toggleTheme called, newIsDark:', newIsDark);
    const root = document.documentElement;
    
    // Update DOM & Storage immediately
    if (newIsDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log('[Store] Theme set to dark');
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log('[Store] Theme set to light');
    }
    
    return { isDark: newIsDark };
  }),
}));