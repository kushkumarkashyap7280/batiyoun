import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

// Make this page dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Sign In - Batiyoun",
  description: "Welcome back to Batiyoun - Enter your frequency and connect to your secure digital space.",
  keywords: ["login", "sign in", "secure access", "encrypted messaging", "private chat"],
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
};

function LoginFormWrapper() {
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F766E]"></div>
      </div>
    }>
      <LoginFormWrapper />
    </Suspense>
  );
}
