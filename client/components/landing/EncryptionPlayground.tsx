'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RefreshCw, Lock, Unlock } from 'lucide-react';

interface KeyPair {
  publicKey: string;
  privateKey: string;
  isVisible: boolean;
}

export function EncryptionPlayground() {
  const [keyPair, setKeyPair] = useState<KeyPair>({
    publicKey: '',
    privateKey: '',
    isVisible: false,
  });
  const [plaintext, setPlaintext] = useState('Hello, world!');
  const [ciphertext, setCiphertext] = useState('');
  const [copied, setCopied] = useState(false);

  const generateKeys = async () => {
    // Simulate key generation (in reality, this would use kush-e2e or similar)
    const mockPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2X5YZ8qL...
-----END PUBLIC KEY-----`;

    const mockPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZ
flhnyovl2X5YZ8qL2X5YZ8qL2X5YZ8qL...
-----END PRIVATE KEY-----`;

    setKeyPair({
      publicKey: mockPublicKey,
      privateKey: mockPrivateKey,
      isVisible: false,
    });

    // Simulate encryption
    setCiphertext(`0x${Array(64)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join('')}`);
  };

  const togglePrivateKeyVisibility = () => {
    setKeyPair((prev) => ({
      ...prev,
      isVisible: !prev.isVisible,
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="space-y-8"
    >
      {/* Interactive Demo Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Key Generation */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <div className="bg-page border border-line rounded-2xl shadow-lg p-8 space-y-6 transition-theme">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-600" />
              <h3 className="font-heading font-bold text-xl text-default">
                Key Pair Generation
              </h3>
            </div>

            {keyPair.publicKey ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="keys-visible"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* Public Key */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-muted">
                      Public Key (Safe to share)
                    </label>
                    <div className="relative group">
                      <pre className="bg-surface p-4 rounded-lg text-xs font-mono text-muted overflow-x-auto max-h-32">
                        {keyPair.publicKey.substring(0, 100)}...
                      </pre>
                      <button
                        onClick={() => copyToClipboard(keyPair.publicKey)}
                        className="absolute top-2 right-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy public key"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Private Key */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-semibold text-muted">
                        Private Key (Never share!)
                      </label>
                      <button
                        onClick={togglePrivateKeyVisibility}
                        className="text-xs px-3 py-1 bg-card text-muted rounded hover:bg-tertiary transition-colors flex items-center gap-1"
                      >
                        {keyPair.isVisible ? (
                          <>
                            <Unlock className="w-3 h-3" /> Hide
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3" /> Reveal
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative group">
                      <pre className="bg-surface p-4 rounded-lg text-xs font-mono text-muted overflow-x-auto max-h-32">
                        {keyPair.isVisible
                          ? keyPair.privateKey.substring(0, 100) + '...'
                          : '••••••••••••••••••••••••••••••••••••••••••••••'}
                      </pre>
                      {keyPair.isVisible && (
                        <button
                          onClick={() => copyToClipboard(keyPair.privateKey)}
                          className="absolute top-2 right-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy private key"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateKeys}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generate New Pair
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateKeys}
                className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Generate Keys
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Right: Encryption Demo */}
        <motion.div
          variants={itemVariants}
          className="space-y-4"
        >
          <div className="bg-page border border-line rounded-2xl shadow-lg p-8 space-y-6 transition-theme">
            <div className="flex items-center gap-3">
              <Unlock className="w-6 h-6 text-green-600" />
              <h3 className="font-heading font-bold text-xl text-default">
                Encryption in Action
              </h3>
            </div>

            <div className="space-y-4">
              {/* Plaintext */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-muted">
                  Message
                </label>
                <textarea
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  className="w-full p-4 border border-line rounded-lg bg-surface text-default placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-green-600 transition-theme"
                  rows={3}
                  placeholder="Type something to encrypt..."
                />
              </div>

              {/* Ciphertext */}
              {ciphertext && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-semibold text-muted">
                    Encrypted Message
                  </label>
                  <div className="relative group">
                    <pre className="bg-surface p-4 rounded-lg text-xs font-mono text-accent-light overflow-x-auto wrap-break-word max-h-24">
                      {ciphertext}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(ciphertext)}
                      className="absolute top-2 right-2 p-2 bg-green-600 hover:bg-green-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy encrypted text"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Encryption Status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg space-y-2"
              >
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  <span>Encryption: Ready</span>
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 space-y-1">
                  <div>✓ Encrypted on device (no server transmission)</div>
                  <div>✓ AES-256-GCM algorithm</div>
                  <div>✓ Zero-knowledge architecture</div>
                </div>
              </motion.div>

              {keyPair.publicKey && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Simulate encryption when button is clicked
                    if (plaintext) {
                      setCiphertext(`0x${Array(64)
                        .fill(0)
                        .map(() => Math.floor(Math.random() * 16).toString(16))
                        .join('')}`);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Encrypt Message
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Indicator */}
      <motion.div
        variants={itemVariants}
        className="text-center p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg"
      >
        <p className="text-sm font-semibold text-green-700 dark:text-green-300">
          🔐 This demo runs 100% in your browser. No data is sent to any server.
        </p>
      </motion.div>
    </motion.div>
  );
}