'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-heading font-bold text-lg bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Batiyoun
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              Privacy is the architecture. Not a feature.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Security Report
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://github.com/kushkumarkashyap7280"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:hello@batiyoun.com">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Batiyoun. All rights reserved. Your privacy is our mission.
            </p>
            <p className="text-sm font-semibold flex items-center gap-1">
              <span>Built with ❤️ and 🔐 by</span>
              <Link
                href="https://github.com/kushkumarkashyap7280"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                Kush
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
