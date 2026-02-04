/**
 * Complete example of OTP-based signup flow using Redis
 * 
 * This file demonstrates the complete signup process with OTP verification:
 * 1. Send OTP to email
 * 2. Verify OTP 
 * 3. Complete signup after OTP verification
 */

// Step 1: Send OTP for email verification
export async function sendSignupOTP(email: string, userName?: string) {
  try {
    const response = await fetch('/api/auth/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        userName,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send OTP');
    }

    return {
      success: true,
      message: 'Verification code sent to your email',
      expiresAt: data.data.expiresAt,
      expiresInMinutes: data.data.expiresInMinutes,
    };
    
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send OTP',
    };
  }
}

// Step 2: Verify OTP
export async function verifySignupOTP(email: string, otp: string) {
  try {
    const response = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to verify OTP');
    }

    return {
      success: true,
      message: 'OTP verified successfully',
      verified: data.data.verified,
    };
    
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify OTP',
    };
  }
}

// Step 3: Complete signup after OTP verification
export async function completeSignup(userData: {
  email: string;
  password: string;
  name: string;
  username: string;
}) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create account');
    }

    return {
      success: true,
      message: 'Account created successfully',
      user: data.data.user,
    };
    
  } catch (error) {
    console.error('Error completing signup:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create account',
    };
  }
}

// Get OTP status (useful for UI state management)
export async function getOTPStatus(email: string) {
  try {
    const response = await fetch(`/api/auth/otp/send?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    
    return {
      success: response.ok,
      data: data.data || null,
    };
    
  } catch (error) {
    console.error('Error getting OTP status:', error);
    return {
      success: false,
      data: null,
    };
  }
}

// Complete signup flow example
export async function handleCompleteSignupFlow(signupData: {
  email: string;
  password: string;
  name: string;
  username: string;
}) {
  try {
    // Step 1: Send OTP
    const otpResult = await sendSignupOTP(signupData.email, signupData.name);
    if (!otpResult.success) {
      return { step: 'otp_send', success: false, message: otpResult.message };
    }

    console.log('✅ OTP sent successfully');
    
    // At this point, the user would enter the OTP in the UI
    // For this example, let's assume they entered it correctly
    
    // Step 2: Verify OTP (this would be called when user submits the OTP form)
    // const verifyResult = await verifySignupOTP(signupData.email, userEnteredOTP);
    // if (!verifyResult.success) {
    //   return { step: 'otp_verify', success: false, message: verifyResult.message };
    // }

    // Step 3: Complete signup (this would be called after OTP verification)
    // const signupResult = await completeSignup(signupData);
    // return { step: 'signup_complete', success: signupResult.success, message: signupResult.message, user: signupResult.user };
    
    return { 
      step: 'otp_sent', 
      success: true, 
      message: 'OTP sent. Please check your email.',
      expiresAt: otpResult.expiresAt 
    };
    
  } catch (error) {
    console.error('Error in signup flow:', error);
    return {
      step: 'error',
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

// Utility function to format remaining time
export function formatRemainingTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${remainingSeconds}s`;
}

// Utility function to check if email is valid
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* 
USAGE EXAMPLE IN REACT COMPONENT:

import { useState } from 'react';
import { 
  sendSignupOTP, 
  verifySignupOTP, 
  completeSignup,
  formatRemainingTime,
  isValidEmail 
} from '@/lib/signup-flow';

export function SignupWithOTP() {
  const [step, setStep] = useState<'email' | 'otp' | 'complete'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSendOTP = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const result = await sendSignupOTP(email);
    
    if (result.success) {
      setStep('otp');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };
  
  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const result = await verifySignupOTP(email, otp);
    
    if (result.success) {
      setStep('complete');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };
  
  // ... rest of component
}
*/