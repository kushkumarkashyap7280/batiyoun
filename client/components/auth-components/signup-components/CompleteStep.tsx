'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeSignupUserSchema, type CompleteSignupUserData } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Loader2, User, FileText, Lock, CheckCircle2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/zustandUserStore';
import { useEffect } from 'react';

interface CompleteStepProps {
  username: string;
}

export function CompleteStep({ username }: CompleteStepProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompleteSignupUserData>({
    resolver: zodResolver(completeSignupUserSchema),
    defaultValues: {
      username,
    },
  });

  const bio = watch('bio') || '';
  const password = watch('password');

  const onSubmit = async (data: CompleteSignupUserData) => {
    console.log('[CompleteStep] Form submitted with:', data);
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log('[CompleteStep] API response status:', response.status);
      const result = await response.json();
      console.log('[CompleteStep] API response data:', result);

      if (response.ok && result.success) {
        console.log('[CompleteStep] Signup successful, calling setUser with:', result.user);
        toast.success(result.message || 'Account created successfully!');
        
        // Save user data to zustand store and redirect
        if (result.user) {
          try {
            console.log('[CompleteStep] About to call setUser');
            setUser(result.user);
            console.log('[CompleteStep] setUser called successfully');
            // Redirect to user's profile page
            router.replace('/chat');
          } catch (error) {
            console.error('[CompleteStep] Failed to set user:', error);
            toast.error('Failed to save user session. Please try again.');
          }
        }
      } else {
        console.log('[CompleteStep] Signup failed:', result.message);
        toast.error(result.message || 'Failed to create account');
      }
    } catch (err) {
      console.error('[CompleteStep] Network error:', err);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl">
          Complete Profile
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Just a few more details
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3.5 sm:space-y-4"
      >
        <input type="hidden" {...register('username')} />

        <div>
          <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
              <input
              id="fullName"
              type="text"
              {...register('fullName')}
                className="w-full min-w-0 pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-sm sm:text-base"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400"
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-xs sm:text-sm font-medium mb-1.5">
            Bio <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />
            <textarea
              id="bio"
              {...register('bio')}
              maxLength={160}
              rows={3}
              className="w-full min-w-0 pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none dark:bg-gray-900 dark:border-gray-700 text-sm sm:text-base"
              placeholder="Tell us about yourself..."
              disabled={loading}
            />
          </div>
          <div className="flex justify-between items-center mt-1.5 gap-2">
            <p className="text-[10px] sm:text-xs text-muted-foreground">160 characters max</p>
            <p className="text-[10px] sm:text-xs font-medium text-muted-foreground">{bio.length}/160</p>
          </div>
          {errors.bio && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400"
            >
              {errors.bio.message}
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
          {!errors.password && password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2"
            >
              <div className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-1.5">Password strength:</div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs ${
                  password.length >= 6 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {password.length >= 6 ? <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-current" />}
                  6+ characters
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs ${
                  /[A-Z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[A-Z]/.test(password) ? <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-current" />}
                  Uppercase
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs ${
                  /[a-z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[a-z]/.test(password) ? <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-current" />}
                  Lowercase
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs ${
                  /[0-9]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[0-9]/.test(password) ? <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-current" />}
                  Number
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] sm:text-xs col-span-2 ${
                  /[@$!%*?&]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[@$!%*?&]/.test(password) ? <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-current" />}
                  Special character (@$!%*?&)
                </div>
              </div>
            </motion.div>
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
      </motion.form>
    </div>
  );
}
