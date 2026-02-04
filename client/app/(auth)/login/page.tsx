import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In - Batiyoun",
  description: "Welcome back to Batiyoun - Enter your frequency and connect to your secure digital space.",
  keywords: ["login", "sign in", "secure access", "encrypted messaging", "private chat"],
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
