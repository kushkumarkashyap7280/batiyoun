'use client';

import { motion } from 'framer-motion';
import { Lock, Eye, Wifi, Github, ArrowRight, Shield, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="overflow-hidden bg-ceramic-50 dark:bg-obsidian-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-ceramic-200 dark:border-obsidian-200 bg-ceramic-50/80 dark:bg-obsidian-50/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-heading font-bold text-2xl text-ceramic-700 dark:text-obsidian-800">
            Batiyoun
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-ceramic-700 dark:text-obsidian-800 hover:text-secure-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-secure-600 text-white rounded-lg hover:bg-secure-700 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Zen Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-secure-50/30 to-transparent dark:from-secure-950/10 dark:to-transparent" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center space-y-8"
          >
            {/* Headline */}
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-ceramic-800 dark:text-obsidian-800 leading-tight">
              Privacy is a Human Right.
              <br />
              <span className="text-secure-600">Not a Setting.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-ceramic-600 dark:text-obsidian-600 max-w-3xl mx-auto leading-relaxed">
              Chat freely. Batiyoun encrypts every message on your device, not our servers. Offline-ready, open-source, and yours forever.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secure-600 text-white rounded-lg font-semibold hover:bg-secure-700 transition-all hover:shadow-secure-lg"
              >
                Start Chatting
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://github.com/kushkumarkashyap7280/batiyoun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-secure-600 text-secure-600 dark:text-secure-400 rounded-lg font-semibold hover:bg-secure-50 dark:hover:bg-obsidian-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            </motion.div>
          </motion.div>

          {/* Visual: Split-screen Chat UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Left: Clean Chat UI */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-obsidian-100 rounded-2xl shadow-lg p-6 space-y-4">
                <div className="text-sm font-semibold text-ceramic-700 dark:text-obsidian-800">Chat UI</div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-ceramic-200 dark:bg-obsidian-300 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="text-sm text-ceramic-600 dark:text-obsidian-600">Sarah</div>
                      <div className="bg-secure-600 text-white rounded-lg p-3 text-sm w-fit">
                        Hey! Are you there?
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 flex justify-end">
                      <div className="bg-ceramic-200 dark:bg-obsidian-300 text-ceramic-800 dark:text-obsidian-800 rounded-lg p-3 text-sm">
                        Yes, just saw your message 👋
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: X-Ray View */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-obsidian-100 rounded-2xl shadow-lg p-6 space-y-4">
                <div className="text-sm font-semibold text-ceramic-700 dark:text-obsidian-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-secure-600" />
                  Encryption X-Ray
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-ceramic-600 dark:text-obsidian-600">
                    Message: "Hey! Are you there?"
                  </div>
                  <div className="flex items-center gap-2 text-secure-600">
                    <div className="w-2 h-2 bg-secure-600 rounded-full animate-pulse" />
                    <code>0x3F8a...7c2d</code>
                  </div>
                  <div className="text-ceramic-500 dark:text-obsidian-500 text-xs">
                    ✓ Encrypted on device
                  </div>
                  <div className="text-ceramic-500 dark:text-obsidian-500 text-xs">
                    ✓ Keys never leave your phone
                  </div>
                  <div className="text-ceramic-500 dark:text-obsidian-500 text-xs">
                    ✓ End-to-end only
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Bento Grid Features */}
      <section className="py-24 px-4 bg-white dark:bg-obsidian-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-ceramic-800 dark:text-obsidian-800">
              Why Batiyoun is Different
            </h2>
            <p className="text-ceramic-600 dark:text-obsidian-600 text-lg max-w-2xl mx-auto">
              Built for privacy-conscious people who want simplicity, not compromise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A: Large - The Vault */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
              className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-ceramic-50 to-white dark:from-obsidian-200 dark:to-obsidian-100 rounded-2xl p-8 border border-ceramic-200 dark:border-obsidian-300 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <Shield className="w-12 h-12 text-secure-600" />
                  <h3 className="font-heading font-bold text-2xl text-ceramic-800 dark:text-obsidian-800">
                    The Vault
                  </h3>
                </div>
                <p className="text-ceramic-700 dark:text-obsidian-700 text-lg">
                  Keys never leave your device. Even if the government asks us for your data, we have nothing to give them.
                </p>
              </div>
            </motion.div>

            {/* Card B: Small - Ghost Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-ceramic-50 to-white dark:from-obsidian-200 dark:to-obsidian-100 rounded-2xl p-8 border border-ceramic-200 dark:border-obsidian-300 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <Eye className="w-8 h-8 text-secure-600 line-through" />
                <h3 className="font-heading font-bold text-xl text-ceramic-800 dark:text-obsidian-800">
                  Ghost Mode
                </h3>
                <p className="text-ceramic-700 dark:text-obsidian-700">
                  No trackers. No ads. No metadata mining.
                </p>
              </div>
            </motion.div>

            {/* Card C: Small - Always On */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-gradient-to-br from-ceramic-50 to-white dark:from-obsidian-200 dark:to-obsidian-100 rounded-2xl p-8 border border-ceramic-200 dark:border-obsidian-300 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <Wifi className="w-8 h-8 text-secure-600" />
                <h3 className="font-heading font-bold text-xl text-ceramic-800 dark:text-obsidian-800">
                  Always On
                </h3>
                <p className="text-ceramic-700 dark:text-obsidian-700">
                  Works offline. Syncs when you reconnect.
                </p>
              </div>
            </motion.div>

            {/* Card D: Medium - Open Protocol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
              className="md:col-span-1 bg-gradient-to-br from-ceramic-50 to-white dark:from-obsidian-200 dark:to-obsidian-100 rounded-2xl p-8 border border-ceramic-200 dark:border-obsidian-300 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <MessageSquare className="w-8 h-8 text-secure-600" />
                <h3 className="font-heading font-bold text-xl text-ceramic-800 dark:text-obsidian-800">
                  Open Protocol
                </h3>
                <p className="text-ceramic-700 dark:text-obsidian-700">
                  Powered by kush-e2e. Audit our code on GitHub. No black boxes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="py-24 px-4 bg-ceramic-50 dark:bg-obsidian-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-ceramic-800 dark:text-obsidian-800">
            Ready to Chat Privately?
          </h2>
          <p className="text-ceramic-600 dark:text-obsidian-600 text-lg">
            Join thousands of people who believe privacy shouldn't be a luxury.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secure-600 text-white rounded-lg font-semibold hover:bg-secure-700 transition-all hover:shadow-secure-lg"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ceramic-200 dark:border-obsidian-200 bg-white dark:bg-obsidian-100 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-heading font-bold text-lg text-ceramic-800 dark:text-obsidian-800">
              Batiyoun
            </div>
            <p className="text-ceramic-600 dark:text-obsidian-600 text-sm mt-2">
              Private. Secure. Open.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-ceramic-800 dark:text-obsidian-800 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-ceramic-600 dark:text-obsidian-600">
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ceramic-800 dark:text-obsidian-800 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-ceramic-600 dark:text-obsidian-600">
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ceramic-800 dark:text-obsidian-800 mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-ceramic-600 dark:text-obsidian-600">
              <li><a href="https://github.com/kushkumarkashyap7280/batiyoun" target="_blank" rel="noopener noreferrer" className="hover:text-secure-600 transition-colors">GitHub</a></li>
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-secure-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ceramic-200 dark:border-obsidian-200 mt-8 pt-8 text-center text-sm text-ceramic-600 dark:text-obsidian-600">
          <p>© 2026 Batiyoun. All rights reserved. Made with ❤️ for privacy.</p>
        </div>
      </footer>
    </main>
  );
}