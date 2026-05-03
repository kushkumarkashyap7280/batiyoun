'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCcw, ArrowLeft, Loader2 } from 'lucide-react';
import styles from './error.module.css';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Batiyoun caught an error:', error);
  }, [error]);

  useEffect(() => {
    if (countdown <= 0) {
      router.back();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className={styles.container}>
      <AlertTriangle size={64} className={styles.icon} />
      
      <h2 className={styles.title}>Something went wrong!</h2>
      
      <p className={styles.message}>
        {error.message || 'An unexpected error occurred in the application.'}
      </p>

      <div className={styles.buttonGroup}>
        <button onClick={() => router.back()} className={`${styles.btn} ${styles.primaryBtn}`}>
          <ArrowLeft size={18} />
          Go Back Now
        </button>
        
        <button onClick={() => reset()} className={`${styles.btn} ${styles.secondaryBtn}`}>
          <RefreshCcw size={18} />
          Try Again
        </button>
      </div>

      <p className={styles.redirectMsg}>
        <Loader2 size={14} className={styles.spin} />
        Redirecting to previous page in {countdown}s...
      </p>
    </div>
  );
}
