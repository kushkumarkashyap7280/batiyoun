"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome } from "lucide-react";
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth-store';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Handle search params and toast on client side only
  useEffect(() => {
    if (searchParams) {
      const messageParam = searchParams.get('message');
      if (messageParam) {
        setMessage(messageParam);
        toast.success(messageParam);
      }
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle field-specific errors
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field as keyof LoginFormData, {
                type: 'manual',
                message: messages[0],
              });
            }
          });
        } else {
          toast.error(result.message || 'Login failed');
        }
        return;
      }

      // Store user data in auth store
      if (result.data) {
        setAuth(result.data.user, result.data.token);
      }

      toast.success('Welcome back!');
      
      // AuthProvider will handle the redirect automatically
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="text-sm text-gray-500">Enter your frequency.</p>
      </div>

      <Button variant="outline" className="w-full h-12 rounded-2xl border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm" disabled={isLoading}>
        <Chrome className="w-5 h-5 mr-3 text-red-500" />
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#FAFAF9] dark:bg-gray-900 px-2 text-gray-500">
            Or login with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="identifier" className="ml-1 text-gray-600">Email or Username</Label>
          <Input 
            id="identifier" 
            type="text"
            placeholder="Enter your email or username"
            className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]" 
            {...register('identifier')}
            disabled={isLoading}
          />
          {errors.identifier && (
            <p className="text-sm text-red-600 ml-1">{errors.identifier.message}</p>
          )}
        </div>

        <div className="space-y-2">
           <div className="flex justify-between items-center">
             <Label htmlFor="password" className="ml-1 text-gray-600">Password</Label>
             <Link href="/forgot-password" className="text-xs text-[#0F766E] font-medium">Forgot?</Link>
           </div>
          <Input 
            id="password" 
            type="password"
            placeholder="Enter your password"
            className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
            {...register('password')}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-red-600 ml-1">{errors.password.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 rounded-2xl bg-[#0F766E] hover:bg-[#0D6E66] shadow-lg shadow-[#0F766E]/20"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Connect'}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <span className="text-gray-500">New here? </span>
        <Link href="/signup" className="font-semibold text-[#0F766E]">Create Account</Link>
      </div>
    </div>
  );
}