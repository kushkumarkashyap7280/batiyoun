import { Redis } from "@upstash/redis";
import {  ApiError } from "@batiyoun/common";
import { env } from "@/config/env";

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

  const attempts = await redis.get<number>(limitKey);

  if (attempts && attempts >= 3) {
    const ttl = await redis.ttl(limitKey); // Seconds remaining
    const minutesLeft = Math.ceil(ttl / 60);
    
    throw new ApiError(
      `Limit exceeded. Please try again in ${minutesLeft} minutes.`, 
      429
    );
  }

  const pipeline = redis.pipeline();

  pipeline.set(otpKey, otp, { ex: 300 });
  pipeline.incr(limitKey);

  const results = await pipeline.exec();
  
  const newCount = results[1] as number;
  if (newCount === 1) {
    await redis.expire(limitKey, 3600);
  }

  return true;
}

export async function verifyOtp(email: string, inputOtp: string) {
  const otpKey = REDIS_KEYS.OTP(email);
  const limitKey = REDIS_KEYS.OTP_LIMIT(email);

  let storedOtp = await redis.get<string>(otpKey);
  // conver to string if not null
  if (storedOtp) {
    storedOtp = storedOtp.toString()
  }

  if (!storedOtp) {
    throw new ApiError("OTP expired. Please request a new one.", 400);
  }
  console.log("Stored OTP:", storedOtp ,"type of ", typeof storedOtp, "Input OTP:", inputOtp, "type of", typeof  inputOtp);
  
  if (storedOtp !== inputOtp) {
    throw new ApiError("Invalid OTP code.", 400);
  }

  await Promise.all([
    redis.del(otpKey),
    redis.del(limitKey)
  ]);

  return true;
}

export default redis;