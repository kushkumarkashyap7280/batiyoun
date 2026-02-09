import prisma from '@/lib/prisma';
import { ProfileView } from '@/components/profile/ProfileView';

export default async function ProfilePage() {
  // TODO: Get actual user ID from session/auth
  // For now, fetch the first user as demo
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      fullName: true,
      email: true,
      username: true,
      avatar: true,
      bio: true,
      isVerified: true,
      createdAt: true,
      publicKey: true,
    },
  });

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-(--text-primary) dark:text-(--text-primary-dark)">
            No User Found
          </h1>
          <p className="text-(--text-secondary) dark:text-(--text-secondary-dark)">
            Please sign up or log in first.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileView user={user} />;
}
