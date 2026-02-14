import UserSignupForm from '@/components/auth-components/UserSignupForm';
import Link from 'next/link';

export const metadata = {
  title: 'Initialize Uplink - Batiyoun',
  description: 'Create your end-to-end encrypted messaging account. Privacy is the architecture.',
};

function page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.05] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-linear-to-br from-green-500/10 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <UserSignupForm />

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
