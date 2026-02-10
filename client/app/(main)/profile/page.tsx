import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { ProfileView } from '@/components/profile/ProfileView';
import { env } from '@/config/env';
import { type TokenPayload, tokenPayloadSchema } from '@batiyoun/common';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token');

  if (!access_token) {
    redirect('/home');
  }

  // Verify JWT and get user ID
  let decoded: TokenPayload;
  try {
    const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(access_token.value, secret);
    decoded = tokenPayloadSchema.parse(payload);
  } catch (error) {
    console.error('Invalid token:', error);
    redirect('/home');
  }

  // Fetch full user data (except password)
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      fullName: true,
      email: true,
      username: true,
      avatar: true,
      bio: true,
      createdAt: true,
      publicKey: true,
      isPro: true,
      isAdmin: true,
      googleId: true,
    },
  });

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">
            User Not Found
          </h1>
          <p className="text-[#b5bac1]">
            Your account could not be found. Please try logging in again.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileView user={user} />;
}
