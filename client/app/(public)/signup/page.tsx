import { Metadata } from 'next';
import SignupClientPage from '@/components/signup/signup.client';

export const metadata: Metadata = {
  title: 'Sign Up | Batiyoun',
  description: 'Create a new Batiyoun account and start chatting.',
};

export default function SignupPage() {
  return <SignupClientPage />;
}
