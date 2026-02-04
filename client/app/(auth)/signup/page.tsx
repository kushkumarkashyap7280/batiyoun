import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account - Batiyoun",
  description: "Join Batiyoun - Create your persona and start communicating privately with end-to-end encryption.",
  keywords: ["signup", "create account", "privacy", "encrypted messaging", "secure chat"],
  robots: {
    index: false, // Don't index auth pages
    follow: false,
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
