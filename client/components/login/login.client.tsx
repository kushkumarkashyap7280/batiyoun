"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { loginBUser } from "@/apis/api";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function LoginClientPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginBUser({ email, password });
      toast.success("Logged in successfully!");
      await checkAuth(); // This will fetch user info and redirect to /chat
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to log in. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div style={{ marginBottom: "1.5rem" }}>
          <Link href="/" className={styles.link} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <div className={styles.header}>
          <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun Logo" className={styles.logo} />
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Log in to continue to Batiyoun</p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={20} className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={handleLogin}>
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
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
            {!loading && <LogIn size={20} />}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Don't have an account? <Link href="/signup" className={styles.link}>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
