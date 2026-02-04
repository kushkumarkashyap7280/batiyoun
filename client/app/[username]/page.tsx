'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Mail, User, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface UserDetails {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  isVerified: boolean;
  isPublic: boolean;
  accountType: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  
  // Unwrap the Promise-based params using React.use()
  const resolvedParams = use(params);

  useEffect(() => {
    // Check if user is authenticated and matches the username
    if (!isAuthenticated || user?.username !== resolvedParams.username) {
      router.push('/login');
      return;
    }

    fetchUserDetails();
  }, [isAuthenticated, user, resolvedParams.username, router]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include', // Use cookies instead of Authorization header
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Session expired. Please login again.');
          await logout();
          router.push('/login');
          return;
        }
        throw new Error(result.message);
      }

      setUserDetails(result.data.user);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      toast.error('Failed to load user details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Failed to load user details</p>
            <Button onClick={() => router.push('/login')} className="w-full mt-4">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="text-green-800 font-medium">✅ Login Successful!</p>
            </div>
            <p className="text-green-700 text-sm mt-1">
              You are successfully authenticated and viewing your profile.
            </p>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-[#0F766E] text-white">
                  {userDetails.displayName?.charAt(0) || userDetails.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{userDetails.displayName || userDetails.username}</CardTitle>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <span className="text-gray-600">@{userDetails.username}</span>
              {userDetails.isVerified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  ✓ Verified
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {userDetails.bio && (
              <div className="text-center">
                <p className="text-gray-600">{userDetails.bio}</p>
              </div>
            )}

            <div className="grid gap-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">{userDetails.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Account Type</p>
                  <p className="text-sm text-gray-600 capitalize">{userDetails.accountType.toLowerCase()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CalendarDays className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-gray-600">
                    {new Date(userDetails.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-2">
              <Button 
                className="w-full bg-[#0F766E] hover:bg-[#0D6E66]"
                onClick={() => router.push('/chats')}
              >
                Go to Chats
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push('/profile/settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Debug Info (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle className="text-sm">Debug Info</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs overflow-auto">
                {JSON.stringify({ userDetails, user }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}