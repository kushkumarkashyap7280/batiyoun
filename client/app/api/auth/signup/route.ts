import { routeWrapper } from '@/lib/api';
import { hashPassword } from '@/utils/hashPassword';
import prisma from '@/lib/prisma';
import {
  TokenPayload,
  ZustandUserSchema,
  completeSignupUserSchema,
  CompleteSignupUserData,
} from '@/types/types';
import { ApiError } from '@/utils/errors';
import { env } from '@/config/env';
import { cookies } from 'next/headers';

import { generateAccessToken, generateRefreshToken } from '@/utils/tokens';

import { verifyVerifyToken } from '@/utils/tokens';

export const POST = routeWrapper(async (request: Request) => {
  const { username, fullName, bio, password } = completeSignupUserSchema.parse(
    await request.json(),
  ) as CompleteSignupUserData;
  const cookieStore = await cookies();
  const verifytoken = cookieStore.get('verify_token')?.value;

  if (!verifytoken) {
    throw new ApiError('Email verification required. Please verify your email first.', 400);
  }

  let email: string;
  let type: string;

  try {
    const verified = await verifyVerifyToken(verifytoken);
    email = verified.email;
    type = verified.type;
  } catch (error) {
    throw new ApiError('Verification token expired. Please verify your email again.', 401);
  }

  if (type !== 'SIGNUP') {
    throw new ApiError('Invalid verification token. Please start the signup process again.', 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError('This email is already registered. Please login instead.', 409);
  }

  const existingUsername = await prisma.user.findUnique({ where: { username } });
  if (existingUsername) {
    throw new ApiError('This username is already taken. Please choose another one.', 409);
  }

  let hashedPassword: string;
  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    throw new ApiError('Failed to process password. Please try again.', 500);
  }

  let user;
  try {
    user = await prisma.user.create({
      data: {
        email,
        username,
        fullName,
        bio,
        passwordHash: hashedPassword,
      },
    });
  } catch (error) {
    throw new ApiError('Failed to create account. Please try again.', 500);
  }

  if (!user) {
    throw new ApiError('Account creation failed. Please try again.', 500);
  }

  cookieStore.delete('verify_token');

  const tokenPayload: TokenPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  let accessToken: string;
  let refreshToken: string;

  try {
    accessToken = await generateAccessToken(tokenPayload);
    refreshToken = await generateRefreshToken(tokenPayload);
  } catch (error) {
    throw new ApiError('Failed to generate authentication tokens. Please try logging in.', 500);
  }

  // save refresh token in DB
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken },
    });
  } catch (error) {
    throw new ApiError('Failed to save session. Please try logging in.', 500);
  }

  try {
    cookieStore.set({
      name: 'refresh_token',
      value: refreshToken,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    cookieStore.set({
      name: 'access_token',
      value: accessToken,
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });
  } catch (error) {
    throw new ApiError('Failed to set authentication cookies. Please try logging in.', 500);
  }

  return {
    success: true,
    message: 'User created successfully',
    user: ZustandUserSchema.parse({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    }),
  };
});
