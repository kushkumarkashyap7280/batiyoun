'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/zustandUserStore';

export function AuthVerifier() {
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('/api/auth/verify-me', {
          method: 'GET',
          credentials: 'include', // This ensures cookies are sent with the request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // User is verified, update the store with user data
          useUserStore.setState({
            user: data.user,
            isAuthenticated: true,
          });
        } else {
          // User is not authenticated
          useUserStore.setState({
            user: null,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        useUserStore.setState({
          user: null,
          isAuthenticated: false,
        });
      }
    };

    verifyUser();
  }, []);

  return null; // This component renders nothing
}
