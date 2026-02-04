"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Chrome, ArrowLeft, Check, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type SignupStage = "choice" | "email" | "otp" | "profile";

interface FormData {
  username: string;
  password: string;
  displayName: string;
  bio: string;
  phoneNumber: string;
}

interface OTPStatus {
  remainingTime: number;
  attempts: number;
  maxAttempts: number;
}

export function SignupForm() {
  const router = useRouter();
  const [stage, setStage] = useState<SignupStage>("choice");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpStatus, setOtpStatus] = useState<OTPStatus | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    displayName: "",
    bio: "",
    phoneNumber: "",
  });

  // Countdown timer for OTP expiry
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage === "otp") {
      setCanResend(true);
    }
  }, [countdown, stage]);

  // Format countdown timer
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Send OTP to email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          userName: formData.displayName || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStage("otp");
        setCountdown(5 * 60); // 5 minutes
        setCanResend(false);
        toast.success("Verification code sent to your email");
      } else {
        setError(data.message);
        if (data.waitTime) {
          toast.error(`Account temporarily blocked. Try again after ${data.waitTime} minutes.`);
        }
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError("Failed to send verification code. Please try again.");
      toast.error("Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth signup
  const handleGoogleSignup = () => {
    if (loading) return;
    window.location.href = '/api/auth/google';
  };

  // Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStage("profile");
        toast.success("Email verified successfully!");
      } else {
        setError(data.message);
        if (data.remainingAttempts !== undefined) {
          toast.error(`Incorrect code. ${data.remainingAttempts} attempts remaining.`);
        } else if (data.waitTime) {
          toast.error(`Too many failed attempts. Try again after ${data.waitTime} minutes.`);
          setStage("email"); // Go back to email stage
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError("Failed to verify code. Please try again.");
      toast.error("Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  // Complete signup
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password: formData.password,
          name: formData.displayName || formData.username,
          username: formData.username,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Account created successfully! Welcome to Batiyoun!");
        router.push('/login?message=Account created successfully');
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setError("Failed to create account. Please try again.");
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResend || loading) return;
    
    setLoading(true);
    setError("");
    setOtp("");
    
    try {
      const response = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          userName: formData.displayName || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCountdown(5 * 60); // 5 minutes
        setCanResend(false);
        toast.success("New verification code sent!");
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError("Failed to resend code");
      toast.error("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  if (stage === "choice") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Persona</h2>
          <p className="text-sm text-gray-500">Join the open space.</p>
        </div>

        <Button 
          onClick={handleGoogleSignup}
          variant="outline" 
          className="w-full h-12 rounded-2xl border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm"
          disabled={loading}
        >
          <Chrome className="w-5 h-5 mr-3 text-red-500" />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#FAFAF9] dark:bg-gray-900 px-2 text-gray-500">
              Or sign up with email
            </span>
          </div>
        </div>

        <Button 
          onClick={() => setStage("email")}
          className="w-full h-12 rounded-2xl bg-[#0F766E] hover:bg-[#0D6E66] shadow-lg shadow-[#0F766E]/20"
        >
          Continue with Email
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <Link href="/login" className="font-semibold text-[#0F766E]">Sign In</Link>
        </div>
      </div>
    );
  }

  if (stage === "email") {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon-sm"
            onClick={() => setStage("choice")}
            className="text-gray-500"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Email</h2>
            <p className="text-sm text-gray-500">We'll send a verification code</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="ml-1 text-gray-600">Email Address</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error when user types
              }}
              placeholder="you@example.com"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
              disabled={loading}
              required
            />
          </div>
          
          <Button 
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full h-12 rounded-2xl bg-[#0F766E] hover:bg-[#0D6E66] shadow-lg shadow-[#0F766E]/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending Code...
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </form>
      </div>
    );
  }

  if (stage === "otp") {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon-sm"
            onClick={() => setStage("email")}
            className="text-gray-500"
            disabled={loading}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Code</h2>
            <p className="text-sm text-gray-500">
              Sent to <span className="font-medium">{email}</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {countdown > 0 && (
          <div className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="text-sm text-blue-600">
              Code expires in <span className="font-mono font-medium">{formatTime(countdown)}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp" className="ml-1 text-gray-600">6-digit verification code</Label>
            <Input 
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
                setError(""); // Clear error when user types
              }}
              placeholder="123456"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E] text-center text-xl tracking-widest font-mono"
              maxLength={6}
              disabled={loading}
              required
              autoComplete="one-time-code"
            />
            <div className="text-xs text-gray-400 ml-1">
              Enter the 6-digit code sent to your email
            </div>
          </div>
          
          <Button 
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full h-12 rounded-2xl bg-[#0F766E] hover:bg-[#0D6E66] shadow-lg shadow-[#0F766E]/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">Didn't receive the code?</p>
          <button 
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend || loading}
            className="text-sm text-[#0F766E] font-medium hover:text-[#0D6E66] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            <span>{canResend ? "Resend Code" : `Resend in ${formatTime(countdown)}`}</span>
          </button>
        </div>
      </div>
    );
  }

  if (stage === "profile") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Almost There</h2>
          <p className="text-sm text-gray-500">Complete your Batiyoun profile</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="ml-1 text-gray-600">Username *</Label>
            <Input 
              id="username"
              value={formData.username}
              onChange={(e) => {
                const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                setFormData(prev => ({...prev, username: value}));
                setError(""); // Clear error when user types
              }}
              placeholder="your_username"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
              disabled={loading}
              required
              maxLength={20}
            />
            <div className="text-xs text-gray-400 ml-1">
              Only letters, numbers, and underscores. 3-20 characters.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="ml-1 text-gray-600">Password *</Label>
            <Input 
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData(prev => ({...prev, password: e.target.value}));
                setError(""); // Clear error when user types
              }}
              placeholder="Create a secure password"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
              disabled={loading}
              required
              minLength={8}
            />
            <div className="text-xs text-gray-400 ml-1">
              At least 8 characters long
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName" className="ml-1 text-gray-600">Display Name</Label>
            <Input 
              id="displayName"
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({...prev, displayName: e.target.value}))}
              placeholder="How others see you"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
              disabled={loading}
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="ml-1 text-gray-600">Bio</Label>
            <Input 
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
              placeholder="Tell us about yourself"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
              disabled={loading}
              maxLength={150}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="ml-1 text-gray-600">Phone Number</Label>
            <Input 
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({...prev, phoneNumber: e.target.value}))}
              placeholder="+1 (555) 123-4567"
              className="h-12 rounded-2xl bg-white/50 border-gray-200 focus:ring-[#0F766E]"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit"
            disabled={loading || !formData.username || !formData.password || formData.password.length < 8}
            className="w-full h-12 rounded-2xl bg-[#0F766E] hover:bg-[#0D6E66] shadow-lg shadow-[#0F766E]/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Batiyoun Account"
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-[#0F766E] hover:underline">
            Terms of Service
          </Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-[#0F766E] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    );
  }

  return null;
}