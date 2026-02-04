import { User } from '@/store/auth-store';

export async function checkAuthFromCookie(): Promise<{ user: User | null; isAuthenticated: boolean }> {
  try {
    // Call the /api/user/me endpoint which automatically uses the cookie
    const response = await fetch('/api/user/me', {
      method: 'GET',
      credentials: 'include', // Important: Include cookies in request
    });

    if (!response.ok) {
      return { user: null, isAuthenticated: false };
    }

    const result = await response.json();
    
    if (result.success && result.data?.user) {
      return { 
        user: {
          id: result.data.user.id,
          email: result.data.user.email,
          username: result.data.user.username,
          displayName: result.data.user.displayName,
        },
        isAuthenticated: true 
      };
    }
    
    return { user: null, isAuthenticated: false };
  } catch (error) {
    console.error('Auth check failed:', error);
    return { user: null, isAuthenticated: false };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
}