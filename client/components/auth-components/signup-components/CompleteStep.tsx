'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeSignupUserSchema, type CompleteSignupUserData } from '@batiyoun/common';
import { Button } from '@/components/ui/button';
import { Loader2, User, FileText, Lock, CheckCircle2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface CompleteStepProps {
  username: string;
}

export function CompleteStep({ username }: CompleteStepProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || 'Account created successfully!');
        router.push(`/${username}`);
      } else {
        toast.error(result.message || 'Failed to create account');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2 sm:space-y-3"
      >
        <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl">
          Complete Profile
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-4">
          Just a few more details
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input type="hidden" {...register('username')} />

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-base"
              placeholder="John Doe"
              disabled={loading}
            />
          </div>
          {errors.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.fullName.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
            <textarea
              id="bio"
              {...register('bio')}
              maxLength={160}
              rows={3}
              className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all resize-none dark:bg-gray-900 dark:border-gray-700 text-base"
              placeholder="Tell us about yourself..."
              disabled={loading}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">160 characters max</p>
            <p className="text-xs font-medium text-muted-foreground">{bio.length}/160</p>
          </div>
          {errors.bio && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.bio.message}
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
              className="w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-base"
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
          {!errors.password && password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 space-y-2"
            >
              <div className="text-xs font-medium text-muted-foreground mb-2">Password strength:</div>
              <div className="grid grid-cols-2 gap-2">
                <div className={`flex items-center gap-2 text-xs ${
                  password.length >= 6 ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {password.length >= 6 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  6+ characters
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  /[A-Z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[A-Z]/.test(password) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  Uppercase
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  /[a-z]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[a-z]/.test(password) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  Lowercase
                </div>
                <div className={`flex items-center gap-2 text-xs ${
                  /[0-9]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[0-9]/.test(password) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  Number
                </div>
                <div className={`flex items-center gap-2 text-xs col-span-2 ${
                  /[@$!%*?&]/.test(password) ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {/[@$!%*?&]/.test(password) ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />}
                  Special character (@$!%*?&)
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-base bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all hover:shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
