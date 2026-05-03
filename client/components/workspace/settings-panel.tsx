'use client';

import React, { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Sun,
  Moon,
  LogOut,
  Loader2,
  Bell,
  Lock,
  Trash2,
  ChevronRight,
  Shield,
  Palette,
} from 'lucide-react';
import { logoutBUser } from '@/apis/api';
import { toast } from 'sonner';
import styles from './settings-panel.module.css';

function SettingRow({
  icon: Icon,
  label,
  description,
  children,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  children?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className={`${styles.settingRow} ${danger ? styles.settingRowDanger : ''}`}>
      <div className={`${styles.settingIcon} ${danger ? styles.settingIconDanger : ''}`}>
        <Icon size={16} />
      </div>
      <div className={styles.settingContent}>
        <span className={`${styles.settingLabel} ${danger ? styles.settingLabelDanger : ''}`}>
          {label}
        </span>
        {description && <span className={styles.settingDesc}>{description}</span>}
      </div>
      <div className={styles.settingControl}>{children}</div>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <p className={styles.sectionHeader}>{label}</p>;
}

export default function SettingsPanel() {
  const { user, checkAuth } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logoutBUser();
      toast.success('Logged out successfully!');
      await checkAuth();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Logout failed. Please try again.';
      console.error('Logout failed', err);
      toast.error(errorMessage);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.panel}>
      {/* ── Page header */}
      <div className={styles.pageHeader}>
        <p className={styles.kicker}>Workspace</p>
        <h1 className={styles.pageTitle}>Settings</h1>
        <p className={styles.pageDesc}>Tune your preferences, notifications, and account.</p>
      </div>

      <div className={styles.content}>
        {/* ── Appearance ─ */}
        <div className={styles.section}>
          <SectionHeader label="Appearance" />
          <div className={styles.card}>
            <SettingRow
              icon={Palette}
              label="Theme"
              description={`Currently using ${theme === 'dark' ? 'Dark' : 'Light'} mode`}
            >
              <button
                type="button"
                className={`${styles.themeToggle} ${theme === 'dark' ? styles.themeToggleDark : styles.themeToggleLight}`}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                <span className={styles.themeToggleKnob}>
                  {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
                </span>
              </button>
            </SettingRow>
          </div>
        </div>

        {/* ── Notifications ─ */}
        <div className={styles.section}>
          <SectionHeader label="Notifications" />
          <div className={styles.card}>
            <SettingRow
              icon={Bell}
              label="Push Notifications"
              description="Get notified for new messages"
            >
              <button
                type="button"
                className={`${styles.toggle} ${notificationsOn ? styles.toggleOn : styles.toggleOff}`}
                onClick={() => setNotificationsOn((p) => !p)}
                aria-label={`${notificationsOn ? 'Disable' : 'Enable'} notifications`}
              >
                <span className={styles.toggleKnob} />
              </button>
            </SettingRow>
          </div>
        </div>

        {/* ── Privacy & Security ─ */}
        <div className={styles.section}>
          <SectionHeader label="Privacy & Security" />
          <div className={styles.card}>
            <SettingRow
              icon={Lock}
              label="Change Password"
              description="Update your account password"
            >
              <ChevronRight size={16} className={styles.chevron} />
            </SettingRow>
            <SettingRow
              icon={Shield}
              label="End-to-End Encryption"
              description="All messages are fully encrypted"
            >
              <span className={styles.activeBadge}>Active</span>
            </SettingRow>
          </div>
        </div>

        {/* ── Account ─ */}
        <div className={styles.section}>
          <SectionHeader label="Account" />
          <div className={styles.card}>
            <SettingRow
              icon={LogOut}
              label="Sign Out"
              description={`Signed in as @${user?.username}`}
            >
              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 size={15} className={styles.spin} />
                ) : (
                  <LogOut size={15} />
                )}
                <span>{isLoggingOut ? 'Signing out…' : 'Sign Out'}</span>
              </button>
            </SettingRow>
          </div>
        </div>

        {/* ── Danger Zone ─ */}
        <div className={styles.section}>
          <SectionHeader label="Danger Zone" />
          <div className={`${styles.card} ${styles.cardDanger}`}>
            <SettingRow
              icon={Trash2}
              label="Delete Account"
              description="Permanently delete your account and all data"
              danger
            >
              <button type="button" className={styles.dangerButton}>
                <Trash2 size={14} />
                Delete
              </button>
            </SettingRow>
          </div>
        </div>
      </div>
    </div>
  );
}
