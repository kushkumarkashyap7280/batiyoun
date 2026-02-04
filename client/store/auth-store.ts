import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  
  // Helpers
  getAuthHeaders: () => { Authorization: string } | {};
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      logout: async () => {
        try {
          // Call logout API to clear server-side cookie
          await fetch('/api/auth/logout', {
            method: 'POST',
          });
        } catch (error) {
          console.error('Logout API call failed:', error);
        } finally {
          // Clear local state regardless of API call result
          get().clearAuth();
        }
      },

      getAuthHeaders: () => {
        const token = get().token;
        return token ? { Authorization: `Bearer ${token}` } : {};
      },

      checkAuthStatus: async () => {
        set({ isLoading: true });
        
        try {
          // Check if we have a stored token
          const currentState = get();
          if (!currentState.token) {
            set({ isLoading: false });
            return;
          }

          // Validate the token by calling the user API
          const response = await fetch('/api/user/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentState.token}`,
            },
          });

          if (!response.ok) {
            // Token is invalid, clear auth
            get().clearAuth();
            return;
          }

          const result = await response.json();
          
          if (result.success && result.data?.user) {
            // Token is valid, update user data
            set({
              user: result.data.user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // Invalid response, clear auth
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
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
