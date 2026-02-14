'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Zap, MessageSquare, Code2, CheckCircle2 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const features = [
  {
    icon: Lock,
    title: 'High Encryption',
    description:
      'End-to-end encrypted with RSA-OAEP and AES-256-GCM. Your messages are locked tight.',
    delay: 0,
  },
  {
    icon: Zap,
    title: 'Real-time Chatting',
    description: 'Instant messaging with WebSocket and Socket.io. Messages arrive in milliseconds.',
    delay: 0.2,
  },
  {
    icon: MessageSquare,
    title: 'One-on-One Chat',
    description:
      "Direct private conversations. No group leaks. Just you and the person you're talking to.",
    delay: 0.4,
  },
  {
    icon: Shield,
    title: 'Offline First',
    description:
      'IndexedDB storage keeps your chats on your device. Works perfectly even without internet.',
    delay: 0.6,
  },
  {
    icon: Code2,
    title: 'Open Source',
    description: 'Every line of code is on GitHub. Audit it yourself. No secrets, no surprises.',
    delay: 0.8,
  },
  {
    icon: CheckCircle2,
    title: 'As We Go Further',
    description:
      "File sharing, voice calls, group chats coming soon. We're building this in public.",
    delay: 1,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl">
            What Makes Batiyoun Special
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            High encryption. Real-time chatting. One-on-one conversations. As we go further, more
            features coming.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-green-500/30 to-transparent -translate-y-1/2" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: feature.delay }}
                  />
                  <div className="relative space-y-3 md:space-y-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
