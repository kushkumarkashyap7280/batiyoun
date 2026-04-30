"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { verifyMeBUser } from "@/apis/api";

type User = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  checkAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicPaths = ["/", "/home", "/login", "/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const data = await verifyMeBUser();
      // Assume data.user or data exists
      setUser(data.user || data);
      
      // If logged in and on a public page, redirect to chat
      if (isPublicPath) {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Auth failed:", error);
      setUser(null);
      // If not logged in and on a protected page, redirect to home
      if (!isPublicPath) {
        router.push("/home");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, isLoading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
