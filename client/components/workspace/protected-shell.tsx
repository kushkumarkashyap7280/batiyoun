"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { LayoutGrid, MessageSquareText, Settings2, UserCircle2, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { logoutBUser } from "@/apis/api";
import styles from "./protected-shell.module.css";

const navigationItems = [
  { href: "/chats", label: "Chats", icon: MessageSquareText },
  { href: "/settings", label: "Settings", icon: Settings2 },
  { href: "/profile", label: "Profile", icon: UserCircle2 },
];

export default function ProtectedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading, checkAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutBUser();
      await checkAuth();
    } catch (error) {
      console.error("Logout failed", error);
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
          <div>
            <p className={styles.brandKicker}>Workspace</p>
            <h1 className={styles.brandTitle}>Batiyoun</h1>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.profileChip}>
            <div className={styles.avatar}>{(user?.fullName || user?.username || "U").charAt(0).toUpperCase()}</div>
            <div className={styles.profileMeta}>
              <strong>{user?.fullName || user?.username || "Guest"}</strong>
              <span>@{user?.username || "unknown"}</span>
            </div>
          </div>

          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}