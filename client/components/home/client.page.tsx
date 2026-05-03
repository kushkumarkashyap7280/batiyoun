'use client';

import React from 'react';
import Link from 'next/link';
import styles from './client.page.module.css';
import Hero from './components/hero/hero';
import Features from './components/features/features';

export default function HomeClientPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/batiyoun-logo-removed-bg.png" alt="Batiyoun Logo" className={styles.logo} />
          <span className={styles.brandName}>Batiyoun</span>
        </div>
        <nav className={styles.nav}>
          <a href="#features" className={styles.navLink}>
            Features
          </a>
          <Link href="/login" className={styles.navLink}>
            Log In
          </Link>
          <Link href="/signup" className={styles.primaryButton} style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Hero />
        <Features />
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Batiyoun Chat. All rights reserved.</p>
      </footer>
    </div>
  );
}
