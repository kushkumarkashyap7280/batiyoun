"use client";

import React, { useState } from "react";
import styles from "./signup.module.css";
import { UserPlus, Mail, Lock, User, AlertCircle } from "lucide-react";
import { createBUser } from "@/apis/api";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function SignupClientPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create user
      await createBUser({ fullName, username, email, password });
      toast.success("Account created successfully!");
      // On success, we need to log them in or just check auth if the creation also logs them in
      await checkAuth();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to create account. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupCard}>
        <div style={{ marginBottom: "1.5rem" }}>
          <Link href="/" className={styles.link} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <div className={styles.header}>
          <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun Logo" className={styles.logo} />
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join Batiyoun and start chatting globally</p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={20} className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                id="fullName"
                type="text"
                className={styles.input}
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="johndoe123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                id="email"
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
            {!loading && <UserPlus size={20} />}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Already have an account? <Link href="/login" className={styles.link}>Log in</Link></p>
        </div>
      </div>
    </div>
  );
}
