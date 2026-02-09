'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Lock, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/zustandUserStore';

import { GoogleAuthButton } from './GoogleAuthButton';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginData = z.infer<typeof loginSchema>;

function UserLoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);

  // Check for OAuth error on component mount
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'oauth_failed') {
      toast.error('Google login failed. Please try again or use email login.');
      // Clean up the URL by removing the error parameter
      router.replace('/login');
    }
  }, [searchParams, router]);
 

 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    console.log('[UserLoginForm] Form submitted with:', data);
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log('[UserLoginForm] API response status:', response.status);
      const result = await response.json();
      console.log('[UserLoginForm] API response data:', result);

      if (response.ok && result.success) {
        console.log('[UserLoginForm] Login successful, calling setUser with:', result.user);
        toast.success(result.message || 'Welcome back!');
        
        // Save user data to zustand store and redirect
        if (result.user) {
          try {
            console.log('[UserLoginForm] About to call setUser');
            setUser(result.user);
            console.log('[UserLoginForm] setUser called successfully');
            // Redirect to user's profile page
            router.push(`/${result.user.username}`);
          } catch (error) {
            console.error('[UserLoginForm] Failed to set user:', error);
            toast.error('Failed to save user session. Please try again.');
          }
        }
      } else {
        console.log('[UserLoginForm] Login failed:', result.message);
        toast.error(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('[UserLoginForm] Network error:', err);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full min-w-0"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-4 sm:mb-6">
          <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl">
            Welcome Back
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            Sign in to your account
          </p>
        </div>

        {/* Google OAuth Button */}
        <div className="mb-4 sm:mb-6">
          <GoogleAuthButton 
            text="Continue with Google" 
            disabled={loading}
          />
        </div>

        {/* Divider */}
        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm">
            <span className="px-3 sm:px-4 bg-card text-muted-foreground">or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full min-w-0 pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-sm sm:text-base"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full min-w-0 pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-sm sm:text-base"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg sm:rounded-xl font-medium transition-all hover:shadow-lg touch-manipulation min-h-11"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default UserLoginForm;