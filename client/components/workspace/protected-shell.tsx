"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  MessageSquare,
  UserCircle,
  Settings,
  LogOut,
  Loader2,
  Shield,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { logoutBUser } from "@/apis/api";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import styles from "./protected-shell.module.css";

const navigationItems = [
  { href: "/chats", label: "Chats", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: UserCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function ProtectedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading, checkAuth } = useAuth();
  const { hideMobileNav } = useWorkspace();
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
      <div className={styles.loadingScreen}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingLogo}>
            <Image
              src="/batiyoun-logo-removed-bg.png"
              alt="Batiyoun"
              width={48}
              height={48}
              priority
            />
          </div>
          <div className={styles.loadingSpinner}>
            <Loader2 size={20} className={styles.spin} />
            <span>Loading workspace…</span>
          </div>
        </div>
      </div>
    );
  }

  const userInitial = (user?.fullName || user?.username || "U").charAt(0).toUpperCase();

  return (
    <div className={styles.shell}>
      {/* ── Sidebar (desktop) ─────────────────────────── */}
      <aside className={styles.sidebar}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogoWrap}>
            <Image
              src="/batiyoun-logo-removed-bg.png"
              alt="Batiyoun"
              width={36}
              height={36}
              priority
            />
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navigationItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                title={item.label}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userChip} title={user?.fullName || user?.username}>
            <div className={styles.userAvatar}>{userInitial}</div>
          </div>
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
            disabled={isLoggingOut}
            title="Sign out"
            aria-label="Sign out"
          >
            {isLoggingOut ? (
              <Loader2 size={20} className={styles.spin} />
            ) : (
              <LogOut size={20} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────── */}
      <main className={`${styles.content} ${hideMobileNav ? styles.contentNoPadding : ""}`}>{children}</main>

      {/* ── Bottom Tab Bar (mobile) ───────────────────── */}
      <nav
        className={`${styles.bottomNav} ${hideMobileNav ? styles.bottomNavHidden : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={hideMobileNav}
      >
        {navigationItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.bottomNavItem} ${isActive ? styles.bottomNavItemActive : ""}`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
