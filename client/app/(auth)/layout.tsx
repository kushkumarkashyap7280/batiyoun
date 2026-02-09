


import { Navbar } from '@/components/landing/Navbar';


interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {

  return <>
  <Navbar />
  {children}
 
  </>;
}
