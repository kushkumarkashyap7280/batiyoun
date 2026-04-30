import React from 'react';
import styles from './features.module.css';
import { Globe, Lock, Smartphone, Zap } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: <Globe className={styles.icon} size={24} />,
      title: "Global Reach",
      description: "Connect with anyone, anywhere in the world instantly with our low-latency infrastructure."
    },
    {
      icon: <Lock className={styles.icon} size={24} />,
      title: "End-to-End Security",
      description: "Your conversations are protected with industry-leading encryption. Privacy is our priority."
    },
    {
      icon: <Zap className={styles.icon} size={24} />,
      title: "Lightning Fast",
      description: "Powered by Socket.io, Batiyoun delivers messages in milliseconds without refreshing."
    },
    {
      icon: <Smartphone className={styles.icon} size={24} />,
      title: "Cross-Platform",
      description: "A seamless experience across all your devices, from desktop to mobile."
    }
  ];

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Why Choose Batiyoun?</h2>
        <p className={styles.subtitle}>
          Everything you need for seamless communication in one beautiful package.
        </p>
      </div>

      <div className={styles.grid}>
        {featureList.map((feature, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
