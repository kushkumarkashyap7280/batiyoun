'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema, type EmailData } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Loader2, Shield, Lock, Zap, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleAuthButton } from '../GoogleAuthButton';

interface EmailStepProps {
  onSuccess: (email: string) => void;
}

export function EmailStep({ onSuccess }: EmailStepProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({
    resolver: zodResolver(EmailSchema),
  });

  const onSubmit = async (data: EmailData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, type: 'SIGNUP' }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || 'OTP sent successfully!');
        onSuccess(data.email);
      } else {
        toast.error(result.message || 'Failed to send OTP');
      }
    } catch (err) {
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
        <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl">Create Account</h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Enter your email to get started
        </p>
      </motion.div>

      {/* Google OAuth Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <GoogleAuthButton text="Sign up with Google" disabled={loading} />
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-3 sm:px-4 bg-card text-muted-foreground">or continue with email</span>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
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

        <Button
          type="submit"
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg sm:rounded-xl font-medium transition-all hover:shadow-lg touch-manipulation min-h-11"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </motion.form>
    </div>
  );
}
