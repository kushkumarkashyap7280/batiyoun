'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, Lock, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/zustandUserStore';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginData = z.infer<typeof loginSchema>;

function UserLoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser, isAuthenticated, user } = useUserStore();

  useEffect(() => {
    // Redirect to username page when authenticated
    console.log('[UserLoginForm] useEffect triggered - isAuthenticated:', isAuthenticated, 'user:', user);
    if (isAuthenticated && user?.username) {
      console.log('[UserLoginForm] Redirecting to:', `/${user.username}`);
      router.replace(`/${user.username}`);
    }
  }, [isAuthenticated, user, router]);

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
        
        // Save user data to zustand store with error handling
        if (result.user) {
          try {
            console.log('[UserLoginForm] About to call setUser');
            setUser(result.user);
            console.log('[UserLoginForm] setUser called successfully');
            // isAuthenticated is now true from store, useEffect will trigger redirect
          } catch (error) {
            console.error('[UserLoginForm] Failed to set user:', error);
            toast.error('Failed to save user session. Please try again.');
            setLoading(false);
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
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl w-full min-w-0"
      >
        {/* Header */}
        <div className="text-center space-y-3 mb-6 sm:mb-8 px-2">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl">
            Welcome Back
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base wrap-break-word leading-relaxed">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full min-w-0 pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-base"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.email.message}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full min-w-0 pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-base"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3.5 sm:py-3 text-base sm:text-lg bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl font-medium transition-all hover:shadow-lg touch-manipulation min-h-12"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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