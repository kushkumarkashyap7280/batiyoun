import { Metadata } from 'next';
import LoginClientPage from '@/components/login/login.client';

export const metadata: Metadata = {
  title: 'Login | Batiyoun',
  description: 'Log in to your Batiyoun account.',
};

export default function LoginPage() {
  return <LoginClientPage />;
}
