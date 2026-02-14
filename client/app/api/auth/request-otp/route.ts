import { routeWrapper } from '@/lib/api';
import { setOtpWithRateLimit } from '@/lib/redis';
import { generateOtp } from '@/utils/otp';
import { SendOtpData, sendOtpSchema } from '@/types/types';
import { ApiError } from '@/utils/errors';
import { sendOtpEmail } from '@/lib/resend';
import prisma from '@/lib/prisma';

export const POST = routeWrapper(async (request: Request) => {
  const { email, type } = sendOtpSchema.parse(await request.json()) as SendOtpData;

  // 1. Check if user exists based on type
  if (type === 'SIGNUP') {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ApiError('This email is already registered. Please login instead.', 400);
    }
  } else if (type === 'RESET_PASSWORD' || type === 'FORGOT_PASSWORD') {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      throw new ApiError('No account found with this email address. Please sign up first.', 404);
    }
  }

  const otp = generateOtp();

  try {
    await setOtpWithRateLimit(email, otp);
  } catch (error) {
    // Re-throw if it's already an ApiError (rate limit)
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to generate OTP. Please try again.', 500);
  }

  try {
    await sendOtpEmail(otp, email, type);
  } catch (error) {
    throw new ApiError(
      'Failed to send OTP email. Please check your email address and try again.',
      500,
    );
  }

  return {
    success: true,
    message: 'OTP sent successfully to your email',
  };
});
