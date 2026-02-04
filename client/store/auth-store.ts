import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkAuthFromCookie, logout as clientLogout } from '@/lib/client-auth';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  typeof window !== 'undefined' 
    ? persist(
        (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      logout: async () => {
        try {
          await clientLogout();
          get().clearAuth();
        } catch (error) {
          console.error('Logout failed:', error);
          get().clearAuth();
        }
      },

      checkAuthStatus: async () => {
        set({ isLoading: true });
        
        try {
          const { user, isAuthenticated } = await checkAuthFromCookie();
          
          if (isAuthenticated && user) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            get().clearAuth();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          get().clearAuth();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
  : // Server-side fallback without persistence
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      logout: async () => {
        get().clearAuth();
      },

      checkAuthStatus: async () => {
        set({ isLoading: false });
      },
    })
);