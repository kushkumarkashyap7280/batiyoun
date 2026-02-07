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
              Why Batiyoun is Different
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for transparency. No compromises. No marketing BS.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Feature 1 */}
            <motion.div
              variants={fadeInUp}
              className="group relative p-8 rounded-lg border border-border bg-card hover:border-green-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">Zero Knowledge</h3>
                <p className="text-muted-foreground">
                  We literally cannot read your messages. If a government asked for your data, we would hand them a blank hard drive.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={fadeInUp}
              className="group relative p-8 rounded-lg border border-border bg-card hover:border-green-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">Offline First</h3>
                <p className="text-muted-foreground">
                  The network is optional. Your data lives on your device. Works perfectly on a plane, in a subway, or anywhere.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={fadeInUp}
              className="group relative p-8 rounded-lg border border-border bg-card hover:border-green-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">Open Protocol</h3>
                <p className="text-muted-foreground">
                  Powered by kush-e2e. Audit our code on GitHub. No black boxes or closed algorithms.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={fadeInUp}
              className="group relative p-8 rounded-lg border border-border bg-card hover:border-green-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">No Ads</h3>
                <p className="text-muted-foreground">
                  Just a clean interface. No tracking pixels. No ad networks. Just the app you paid for.
                </p>
              </div>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              variants={fadeInUp}
              className="group relative p-8 rounded-lg border border-border bg-card hover:border-green-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">Tested & Verified</h3>
                <p className="text-muted-foreground">
                  Security audits from independent researchers. Our code is battle-tested and production-ready.
                </p>
              </div>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              variants={fadeInUp}
              className="group relative p-8 rounded-lg border border-border bg-card hover:border-green-500/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-green-500/0 via-transparent to-transparent group-hover:from-green-500/5 transition-all" />
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-xl">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Optimized for speed. Send and receive messages instantly with zero latency overhead.
                </p>
              </div>
            </motion.div>
          </motion.div>
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
