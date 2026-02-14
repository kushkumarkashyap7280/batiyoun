import UserLoginForm from '@/components/auth-components/UserLoginForm';
import { Suspense } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Reconnect - Batiyoun',
  description: 'Access your end-to-end encrypted messages. Zero-knowledge architecture.',
};

function page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.05] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-linear-to-br from-green-500/10 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <Suspense
          fallback={
            <div className="w-full max-w-md mx-auto px-3 sm:px-4">
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl w-full min-w-0 animate-pulse">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          }
        >
          <UserLoginForm />
        </Suspense>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              Initialize Uplink
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
