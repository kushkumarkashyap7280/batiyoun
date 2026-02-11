
import prisma from '@/lib/prisma';
import { ProfileView } from '@/components/profile/ProfileView';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function ProfilePage() {

   // get userId from header x-user-id set by middleware
  const headersList = headers();
  
  const userId = (await headersList).get('x-user-id');

  if (!userId) {
    redirect('/home');
  }
 

  // Fetch full user data (except password)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      currentMood: true,
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
