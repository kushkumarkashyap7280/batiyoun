import { routeWrapper } from '@/lib/api';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export const GET = routeWrapper(async (request: Request) => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (refreshToken) {
    // Clear the refresh token from the database
    await prisma.user.updateMany({
      where: { refreshToken },
      data: { refreshToken: null },
    });

    // Clear the refresh token cookie
    cookieStore.delete('refresh_token');
    cookieStore.delete('access_token');
  }

  return {
    success: true,
    message: 'Logged out successfully',
  };
});
