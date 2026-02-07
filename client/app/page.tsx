'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Lock, Zap, MessageSquare, Code2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { TechStackTicker } from '@/components/landing/TechStackTicker';
import { EncryptionPlayground } from '@/components/landing/EncryptionPlayground';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.05]" />
        
        <div className="absolute inset-0 bg-linear-to-br from-green-500/10 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-green-400 text-sm font-medium"
            >
              <Zap className="w-4 h-4" />
              End-to-End Encrypted & Open Source
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeInUp}
              className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight"
            >
              Privacy is not a
              <br />
              <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">feature.</span>
              <br />
              <span className="text-foreground">It's the architecture.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              End-to-end encrypted messaging running entirely in your browser. No trackers. No servers reading your chats. Just you and them.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white">
                <Link href="/signup">
                  Start Chatting
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/kushkumarkashyap7280/batiyoun" target="_blank" rel="noopener noreferrer">
                  <Code2 className="mr-2 w-4 h-4" />
                  View Source Code
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Encryption Playground */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20"
          >
            <EncryptionPlayground />
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackTicker />

      {/* Features Section */}
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
              High encryption. Real-time chatting. One-on-one conversations. As we go further, more features coming.
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
            {/* Feature 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                  <Lock className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">High Encryption</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  End-to-end encrypted with RSA-OAEP and AES-256-GCM. Your messages are locked tight.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              />
              <div className="relative space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">Real-time Chatting</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Instant messaging with WebSocket and Socket.io. Messages arrive in milliseconds.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
              <div className="relative space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">One-on-One Chat</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Direct private conversations. No group leaks. Just you and the person you're talking to.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <div className="relative space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">Offline First</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  IndexedDB storage keeps your chats on your device. Works perfectly even without internet.
                </p>
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              />
              <div className="relative space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                  <Code2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">Open Source</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Every line of code is on GitHub. Audit it yourself. No secrets, no surprises.
                </p>
              </div>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 md:p-8 rounded-2xl border-2 border-border bg-card hover:border-green-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/10 transition-all" />
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <div className="relative space-y-3 md:space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 dark:bg-green-950 flex items-center justify-center ring-4 ring-green-500/10 group-hover:ring-green-500/30 transition-all">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg md:text-xl">As We Go Further</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  File sharing, voice calls, group chats coming soon. We're building this in public.
                </p>
              </div>
            </motion.div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-card border-y border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl">
            Ready to Chat Privately?
          </h2>
          <p className="text-muted-foreground text-lg">
            No signup required to play with the encryption demo above. Just hit that button and see the keys generate in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com/kushkumarkashyap7280/batiyoun" target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 w-4 h-4" />
                Read the Code
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
