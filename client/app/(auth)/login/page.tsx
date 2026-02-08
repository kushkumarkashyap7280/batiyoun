import UserLoginForm from '@/components/auth-components/UserLoginForm';

import Link from "next/link";

export const metadata = {
  title: "Reconnect - Batiyoun",
  description: "Access your end-to-end encrypted messages. Zero-knowledge architecture.",
};

function page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
 
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.05] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-linear-to-br from-green-500/10 via-transparent to-transparent pointer-events-none -z-10" />
      
      {/* Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <UserLoginForm />
        
        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{" "}
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