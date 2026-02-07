'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UsernameSchema, type UsernameData } from '@batiyoun/common';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X, AtSign, Sparkles, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UsernameStepProps {
  onSuccess: (username: string) => void;
}

export function UsernameStep({ onSuccess }: UsernameStepProps) {
  const [checking, setChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UsernameData>({
    resolver: zodResolver(UsernameSchema),
  });

  const username = watch('username');

  useEffect(() => {
    if (!username || username.length < 3) {
      setIsAvailable(null);
      setAvailabilityMessage('');
      return;
    }

    const timeoutId = setTimeout(async () => {
      setChecking(true);
      try {
        const response = await fetch('/api/auth/check-username', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setIsAvailable(true);
          setAvailabilityMessage(result.message || 'Username is available!');
        } else {
          setIsAvailable(false);
          setAvailabilityMessage(result.message || 'Username not available');
        }
      } catch (err) {
        setIsAvailable(false);
        setAvailabilityMessage('Error checking username');
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  const onSubmit = async (data: UsernameData) => {
    if (!isAvailable) {
      toast.error('Please choose an available username');
      return;
    }
    onSuccess(data.username);
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
          Choose Username
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-4">
          This will be your unique identifier
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
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="username"
              type="text"
              {...register('username')}
              className="w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 text-base"
              placeholder="username"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {checking && (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              )}
              {!checking && isAvailable === true && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
              {!checking && isAvailable === false && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <X className="w-5 h-5 text-red-500" />
                </motion.div>
              )}
            </div>
          </div>
          {errors.username && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              {errors.username.message}
            </motion.p>
          )}
          {!errors.username && availabilityMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-2 text-sm ${
                isAvailable ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {availabilityMessage}
            </motion.p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-base bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all hover:shadow-lg"
          disabled={!isAvailable}
        >
          Continue
        </Button>
      </motion.form>
    </div>
  );
}
