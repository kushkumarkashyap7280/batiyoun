import AuthSession from '@/components/AuthSession';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <AuthSession redirectTo="/login">
      {children}
    </AuthSession>
  );
}
