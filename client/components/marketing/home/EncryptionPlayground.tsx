'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Copy,
  Github,
  KeyRound,
  Package,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EncryptionPlayground() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npm install kush-e2e');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-lg min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-950">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl">kush-e2e</h3>
            <p className="text-sm text-muted-foreground">
              End-to-end encryption toolkit for modern apps
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground wrap-break-word">
          Use kush-e2e to generate identities, derive shared session keys, and encrypt messages
          directly in the browser.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <TerminalSquare className="h-4 w-4 text-green-600" />
              Install
            </div>
            <div className="rounded-md bg-muted px-3 py-2 text-xs font-mono text-muted-foreground wrap-break-word whitespace-pre-wrap">
              npm install kush-e2e
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Copied' : 'Copy command'}
            </Button>
          </div>
          <div className="space-y-3 min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <KeyRound className="h-4 w-4 text-green-600" />
              Quick usage
            </div>
            <div className="rounded-md bg-muted px-3 py-2 text-xs font-mono text-muted-foreground wrap-break-word whitespace-pre-wrap leading-relaxed">
              const identity = await KushE2E.createIdentity();
              {'\n'}const sessionKey = await KushE2E.deriveSessionKey(identity.privateKey,
              peerPublicKey);
              {'\n'}const encrypted = await KushE2E.encrypt('Hello', sessionKey);
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="rounded-lg border border-border bg-background p-4 min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Step-by-step flow
            </div>
            <ol className="mt-2 space-y-2 text-xs text-muted-foreground list-decimal list-inside wrap-break-word">
              <li>User A and User B each generate a public and private key.</li>
              <li>They share public keys and run a handshake.</li>
              <li>Each user mixes their private key with the other’s public key.</li>
              <li>That creates the same session key on both devices.</li>
              <li>Private keys never leave the browser. No server involved.</li>
              <li>
                Messages are encrypted with the session key, and only the intended user can read
                them.
              </li>
              <li>Network observers can see who is sending data, but not the content.</li>
            </ol>
          </div>

          <div className="flex items-center justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
          </div>

          <div className="rounded-lg border border-border bg-background p-4 min-w-0 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Identity generation
            </div>
            <p className="text-xs text-muted-foreground mt-2 wrap-break-word">
              Create secure public/private key pairs on-device.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
          </div>

          <div className="rounded-lg border border-border bg-background p-4 min-w-0 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Session key derivation
            </div>
            <p className="text-xs text-muted-foreground mt-2 wrap-break-word">
              Perform authenticated key exchange between peers.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground lg:hidden" />
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden lg:block" />
          </div>

          <div className="rounded-lg border border-border bg-background p-4 min-w-0 w-full lg:w-auto">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Message encryption
            </div>
            <p className="text-xs text-muted-foreground mt-2 wrap-break-word">
              Encrypt and decrypt payloads with the shared session key.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <a
              href="https://www.npmjs.com/package/kush-e2e"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Package className="mr-2 h-4 w-4" />
              npm package
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/kushkumarkashyap7280/kush-e2e"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub repo
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
