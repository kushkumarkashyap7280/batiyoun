"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import {
  User,
  Mail,
  AtSign,
  Shield,
  Edit3,
  Check,
  X,
  Camera,
} from "lucide-react";
import styles from "./profile-panel.module.css";

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.infoIcon}>
        <Icon size={16} />
      </div>
      <div className={styles.infoContent}>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value || "—"}</span>
      </div>
    </div>
  );
}

export default function ProfilePanel() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(user?.fullName || "");

  const userInitial = (user?.fullName || user?.username || "U").charAt(0).toUpperCase();

  return (
    <div className={styles.panel}>
      {/* ── Page header */}
      <div className={styles.pageHeader}>
        <p className={styles.kicker}>Account</p>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageDesc}>
          Manage your identity and account details.
        </p>
      </div>

      {/* ── Content */}
      <div className={styles.content}>
        {/* ── Avatar card */}
        <div className={styles.avatarCard}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{userInitial}</div>
            <button className={styles.avatarEdit} aria-label="Change avatar">
              <Camera size={14} />
            </button>
          </div>
          <div className={styles.avatarInfo}>
            <h2 className={styles.displayName}>{user?.fullName || user?.username}</h2>
            <span className={styles.handle}>@{user?.username}</span>
            <div className={styles.verifiedBadge}>
              <Shield size={12} />
              <span>Verified account</span>
            </div>
          </div>
        </div>

        {/* ── Info card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Account Information</h3>
            {!editMode ? (
              <button
                className={styles.editButton}
                onClick={() => setEditMode(true)}
              >
                <Edit3 size={14} />
                <span>Edit</span>
              </button>
            ) : (
              <div className={styles.editActions}>
                <button
                  className={`${styles.editActionBtn} ${styles.editSave}`}
                  onClick={() => setEditMode(false)}
                >
                  <Check size={14} />
                  Save
                </button>
                <button
                  className={`${styles.editActionBtn} ${styles.editCancel}`}
                  onClick={() => {
                    setDisplayName(user?.fullName || "");
                    setEditMode(false);
                  }}
                >
                  <X size={14} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className={styles.infoList}>
            {editMode ? (
              <div className={styles.editField}>
                <label className={styles.editLabel}>Display Name</label>
                <div className={styles.editInputWrap}>
                  <User size={16} className={styles.editIcon} />
                  <input
                    className={styles.editInput}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your full name"
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <InfoRow icon={User} label="Full Name" value={user?.fullName || ""} />
            )}
            <InfoRow icon={AtSign} label="Username" value={`@${user?.username || ""}`} />
            <InfoRow icon={Mail} label="Email" value={user?.email || ""} />
          </div>
        </div>

        {/* ── Security card */}
        <div className={styles.securityCard}>
          <div className={styles.securityIcon}>
            <Shield size={20} />
          </div>
          <div className={styles.securityContent}>
            <h4>End-to-End Encryption</h4>
            <p>All your messages are encrypted and only readable by you and your contacts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
