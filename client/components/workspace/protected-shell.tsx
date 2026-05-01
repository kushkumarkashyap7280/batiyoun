"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { LayoutGrid, MessageSquareText, Settings2, UserCircle2, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { logoutBUser } from "@/apis/api";
import styles from "./protected-shell.module.css";

const navigationItems = [
  { href: "/chats", label: "Chats", icon: MessageSquareText },
  { href: "/profile", label: "Profile", icon: UserCircle2 },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export default function ProtectedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading, checkAuth } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutBUser();
      await checkAuth();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingShell}>
        <div className={styles.loadingCard}>
          <LayoutGrid size={32} />
          <p>Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun" className={styles.brandLogo} />
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                title={item.label}
              >
                <Icon size={24} />
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.profileChip} title={user?.fullName || user?.username}>
            <div className={styles.avatar}>{(user?.fullName || user?.username || "U").charAt(0).toUpperCase()}</div>
          </div>

          <button 
            type="button" 
            className={styles.logoutButton} 
            onClick={handleLogout}
            disabled={isLoggingOut}
            title="Sign out"
          >
            {isLoggingOut ? <Loader2 size={24} className={styles.spin} /> : <LogOut size={24} />}
          </button>
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
