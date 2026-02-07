'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, type VerifyOtpData } from '@batiyoun/common';
import { Button } from '@/components/ui/button';
import { Loader2, Shield, KeyRound, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useRef, KeyboardEvent, ClipboardEvent, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OtpStepProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function OtpStep({ email, onSuccess, onBack }: OtpStepProps) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [nextAttemptTime, setNextAttemptTime] = useState<string | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      type: 'SIGNUP',
    },
  });

  // Timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setValue('otp', newOtp.join(''));

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setValue('otp', newOtp.join(''));

    const nextIndex = Math.min(pastedData.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const onSubmit = async (data: VerifyOtpData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || 'OTP verified successfully!');
        onSuccess();
      } else {
        toast.error(result.message || 'Invalid OTP');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'SIGNUP' }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.message || 'New OTP sent successfully!');
        setResendTimer(300);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        setValue('otp', '');
        setAttemptsLeft(null);
        setNextAttemptTime(null);
        otpRefs.current[0]?.focus();
      } else {
        // Parse attempts from error message
        const message = result.message || 'Failed to resend OTP';
        const attemptsMatch = message.match(/(\d+)\s+attempts?\s+left/);
        const timeMatch = message.match(/Try again in (\d+) minutes?/);
        
        if (attemptsMatch) {
          setAttemptsLeft(parseInt(attemptsMatch[1]));
        }
        if (timeMatch) {
          setNextAttemptTime(timeMatch[1] + ' minutes');
        }
        
        toast.error(message);
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          Verify Email
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-4">
          Enter the 6-digit code sent to <span className="font-semibold text-foreground">{email}</span>
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
        <div className="flex justify-center gap-2 sm:gap-3 px-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { otpRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onPaste={index === 0 ? handleOtpPaste : undefined}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all dark:bg-gray-900 dark:border-gray-700 flex-shrink-0"
              disabled={loading}
            />
          ))}
        </div>
        {errors.otp && (
          <p className="text-sm text-red-600">{errors.otp.message}</p>
        )}

        {/* Timer & Attempts Info */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {resendTimer > 0 ? (
              <span>Code expires in <span className="font-semibold text-green-600 dark:text-green-400">{formatTime(resendTimer)}</span></span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400">Code expired</span>
            )}
          </div>
          {attemptsLeft !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4" />
              {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} left
              {nextAttemptTime && ` • Next: ${nextAttemptTime}`}
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
              Verifying...
            </>
          ) : (
            'Verify Code'
          )}
        </Button>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
            Change email
          </button>
          
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4" />
              Resend Code
            </button>
          ) : (
            <span className="text-sm text-muted-foreground">
              Resend in {formatTime(resendTimer)}
            </span>
          )}
        </div>
      </motion.form>
    </div>
  );
}
