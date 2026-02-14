import { routeWrapper } from '@/lib/api';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiError } from '@/utils/errors';
import { UsernameData, UsernameSchema } from '@/types/types';

export const POST = routeWrapper(async (request: Request) => {
  const { username } = UsernameSchema.parse(await request.json()) as UsernameData;

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    throw new ApiError('This username is already taken. Please choose another one.', 400);
  }

  return {
    success: true,
    message: 'Username is available',
  };
});
