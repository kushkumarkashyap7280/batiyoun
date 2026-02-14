import { Redis } from '@upstash/redis';
import { ApiError } from '@/utils/errors';
import { env } from '@/config/env';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const REDIS_KEYS = {
  OTP: (email: string) => `otp:${email}`,

  OTP_LIMIT: (email: string) => `otp_limit:${email}`,
};

export async function setOtpWithRateLimit(email: string, otp: string) {
  const limitKey = REDIS_KEYS.OTP_LIMIT(email);
  const otpKey = REDIS_KEYS.OTP(email);

  try {
    const attempts = await redis.get<number>(limitKey);

    if (attempts && attempts >= 3) {
      const ttl = await redis.ttl(limitKey);
      const minutesLeft = Math.ceil(ttl / 60);
      const attemptsUsed = attempts;

      throw new ApiError(
        `Maximum OTP requests (${attemptsUsed}/3) reached. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`,
        429,
      );
    }

    const pipeline = redis.pipeline();
    pipeline.set(otpKey, otp, { ex: 300 }); // OTP expires in 5 minutes
    pipeline.incr(limitKey);

    const results = await pipeline.exec();

    const newCount = results[1] as number;
    if (newCount === 1) {
      await redis.expire(limitKey, 3600); // Rate limit resets after 1 hour
    }

    return true;
  } catch (error) {
    // Re-throw ApiError (rate limit)
    if (error instanceof ApiError) {
      throw error;
    }
    // Redis connection error
    throw new ApiError('Failed to process OTP. Please try again.', 500);
  }
}

export async function verifyOtp(email: string, inputOtp: string) {
  const otpKey = REDIS_KEYS.OTP(email);
  const limitKey = REDIS_KEYS.OTP_LIMIT(email);

  try {
    const storedOtp = await redis.get<string>(otpKey);

    if (!storedOtp) {
      throw new ApiError('OTP has expired or not found. Please request a new one.', 400);
    }

    // Convert both to strings and trim any whitespace
    const storedOtpStr = String(storedOtp).trim();
    const inputOtpStr = String(inputOtp).trim();

    if (storedOtpStr !== inputOtpStr) {
      throw new ApiError('Invalid OTP code. Please check and try again.', 400);
    }

    await Promise.all([redis.del(otpKey), redis.del(limitKey)]);

    return true;
  } catch (error) {
    // Re-throw ApiError (OTP validation errors)
    if (error instanceof ApiError) {
      throw error;
    }
    // Redis connection error
    throw new ApiError('Failed to verify OTP. Please try again.', 500);
  }
}

export default redis;
