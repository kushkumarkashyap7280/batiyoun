import { redis } from './redis';

export interface OTPData {
  email: string;
  otp: string;
  attempts: number;
  status: 'otp_sent' | 'otp_verified' | 'blocked';
  createdAt: number;
  expiresAt: number;
}

export interface OTPResult {
  success: boolean;
  message: string;
  data?: any;
  remainingAttempts?: number;
  waitTime?: number;
}

// Constants
const OTP_EXPIRY_MINUTES = 5;
const OTP_EXPIRY_SECONDS = OTP_EXPIRY_MINUTES * 60;
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION_MINUTES = 15;
const BLOCK_DURATION_SECONDS = BLOCK_DURATION_MINUTES * 60;

// Redis keys
const getOTPKey = (email: string) => `otp:${email}`;
const getBlockKey = (email: string) => `block:${email}`;

/**
 * Generate a 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store OTP in Redis with expiration
 */
export async function storeOTP(email: string): Promise<OTPResult> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user is currently blocked
    const isBlocked = await checkIfBlocked(normalizedEmail);
    if (!isBlocked.success) {
      return isBlocked;
    }

    // Generate new OTP
    const otp = generateOTP();
    const now = Date.now();
    
    const otpData: OTPData = {
      email: normalizedEmail,
      otp,
      attempts: 0,
      status: 'otp_sent',
      createdAt: now,
      expiresAt: now + (OTP_EXPIRY_SECONDS * 1000),
    };

    // Store in Redis with expiration
    await redis.setex(getOTPKey(normalizedEmail), OTP_EXPIRY_SECONDS, JSON.stringify(otpData));

    return {
      success: true,
      message: 'OTP generated and stored successfully',
      data: { otp, expiresAt: otpData.expiresAt },
    };
  } catch (error) {
    console.error('Error storing OTP:', error);
    return {
      success: false,
      message: 'Failed to generate OTP',
    };
  }
}

/**
 * Verify OTP
 */
export async function verifyOTP(email: string, inputOTP: string): Promise<OTPResult> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user is currently blocked
    const isBlocked = await checkIfBlocked(normalizedEmail);
    if (!isBlocked.success) {
      return isBlocked;
    }

    // Get OTP data from Redis
    const otpDataStr = await redis.get(getOTPKey(normalizedEmail));
    
    if (!otpDataStr) {
      return {
        success: false,
        message: 'OTP not found or expired. Please request a new one.',
      };
    }

    let otpData: OTPData;
    try {
      // Handle both string and object responses from Redis
      if (typeof otpDataStr === 'string') {
        otpData = JSON.parse(otpDataStr);
      } else if (typeof otpDataStr === 'object' && otpDataStr !== null) {
        otpData = otpDataStr as OTPData;
      } else {
        throw new Error('Invalid OTP data type');
      }
    } catch (parseError) {
      console.error('Error parsing OTP data:', parseError, 'Data:', otpDataStr);
      // Clear corrupted data
      await redis.del(getOTPKey(normalizedEmail));
      return {
        success: false,
        message: 'Invalid OTP data. Please request a new verification code.',
      };
    }

    // Check if OTP is already verified
    if (otpData.status === 'otp_verified') {
      return {
        success: false,
        message: 'OTP already verified. Please complete your registration.',
      };
    }

    // Check if OTP has expired
    if (Date.now() > otpData.expiresAt) {
      await redis.del(getOTPKey(normalizedEmail));
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
      };
    }

    // Increment attempts
    otpData.attempts += 1;

    // Check if OTP is correct
    if (otpData.otp === inputOTP.trim()) {
      // OTP is correct
      otpData.status = 'otp_verified';
      
      // Store updated data with extended expiry for registration completion (30 minutes)
      await redis.setex(getOTPKey(normalizedEmail), 30 * 60, JSON.stringify(otpData));
      
      return {
        success: true,
        message: 'OTP verified successfully',
        data: { status: 'otp_verified' },
      };
    }

    // OTP is incorrect
    if (otpData.attempts >= MAX_ATTEMPTS) {
      // Block user for 15 minutes
      await blockUser(normalizedEmail);
      await redis.del(getOTPKey(normalizedEmail));
      
      return {
        success: false,
        message: `Too many failed attempts. Please try again after ${BLOCK_DURATION_MINUTES} minutes.`,
        waitTime: BLOCK_DURATION_MINUTES,
      };
    }

    // Update attempts count
    await redis.setex(getOTPKey(normalizedEmail), OTP_EXPIRY_SECONDS, JSON.stringify(otpData));
    
    const remainingAttempts = MAX_ATTEMPTS - otpData.attempts;
    return {
      success: false,
      message: `Incorrect OTP. ${remainingAttempts} attempts remaining.`,
      remainingAttempts,
    };

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: 'Failed to verify OTP',
    };
  }
}

/**
 * Check if user is blocked
 */
export async function checkIfBlocked(email: string): Promise<OTPResult> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const blockData = await redis.get(getBlockKey(normalizedEmail));
    
    if (blockData) {
      const blockInfo = JSON.parse(blockData as string);
      const remainingTime = Math.ceil((blockInfo.expiresAt - Date.now()) / 1000 / 60);
      
      if (remainingTime > 0) {
        return {
          success: false,
          message: `Account temporarily blocked. Please try again after ${remainingTime} minutes.`,
          waitTime: remainingTime,
        };
      } else {
        // Block expired, remove it
        await redis.del(getBlockKey(normalizedEmail));
      }
    }
    
    return { success: true, message: 'Not blocked' };
  } catch (error) {
    console.error('Error checking block status:', error);
    return { success: true, message: 'Block check failed, allowing request' };
  }
}

/**
 * Block user for specified duration
 */
async function blockUser(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  const blockData = {
    email: normalizedEmail,
    blockedAt: Date.now(),
    expiresAt: Date.now() + (BLOCK_DURATION_SECONDS * 1000),
  };
  
  await redis.setex(getBlockKey(normalizedEmail), BLOCK_DURATION_SECONDS, JSON.stringify(blockData));
}

/**
 * Check if OTP is verified for an email
 */
export async function isOTPVerified(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const otpDataStr = await redis.get(getOTPKey(normalizedEmail));
    
    if (!otpDataStr) {
      return false;
    }

    let otpData: OTPData;
    try {
      // Handle both string and object responses from Redis
      if (typeof otpDataStr === 'string') {
        otpData = JSON.parse(otpDataStr);
      } else if (typeof otpDataStr === 'object' && otpDataStr !== null) {
        otpData = otpDataStr as OTPData;
      } else {
        throw new Error('Invalid OTP data type');
      }
    } catch (parseError) {
      console.error('Error parsing OTP verification data:', parseError);
      // Clear corrupted data
      await redis.del(getOTPKey(normalizedEmail));
      return false;
    }

    return otpData.status === 'otp_verified' && Date.now() < otpData.expiresAt;
  } catch (error) {
    console.error('Error checking OTP verification status:', error);
    return false;
  }
}

/**
 * Clear OTP data after successful registration
 */
export async function clearOTPData(email: string): Promise<void> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    await redis.del(getOTPKey(normalizedEmail));
  } catch (error) {
    console.error('Error clearing OTP data:', error);
  }
}

/**
 * Get OTP status and remaining time
 */
export async function getOTPStatus(email: string): Promise<{
  exists: boolean;
  status?: 'otp_sent' | 'otp_verified' | 'blocked';
  remainingTime?: number;
  attempts?: number;
  maxAttempts?: number;
}> {
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const otpDataStr = await redis.get(getOTPKey(normalizedEmail));
    
    if (!otpDataStr) {
      return { exists: false };
    }

    let otpData: OTPData;
    try {
      // Handle both string and object responses from Redis
      if (typeof otpDataStr === 'string') {
        otpData = JSON.parse(otpDataStr);
      } else if (typeof otpDataStr === 'object' && otpDataStr !== null) {
        otpData = otpDataStr as OTPData;
      } else {
        throw new Error('Invalid OTP data type');
      }
    } catch (parseError) {
      console.error('Error parsing OTP status data:', parseError);
      // Clear corrupted data
      await redis.del(getOTPKey(normalizedEmail));
      return { exists: false };
    }

    const remainingTime = Math.max(0, Math.ceil((otpData.expiresAt - Date.now()) / 1000));
    
    if (remainingTime <= 0) {
      await redis.del(getOTPKey(normalizedEmail));
      return { exists: false };
    }

    return {
      exists: true,
      status: otpData.status,
      remainingTime,
      attempts: otpData.attempts,
      maxAttempts: MAX_ATTEMPTS,
    };
  } catch (error) {
    console.error('Error getting OTP status:', error);
    return { exists: false };
  }
}