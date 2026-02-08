'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0066CC] to-[#4A90E2] rounded-lg flex items-center justify-center text-white font-bold">
                AV
              </div>
              <span className="text-lg font-bold text-foreground">AtlasVault</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your all-in-one digital services marketplace for streaming, telecom, gaming, and business solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/21695555555"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:opacity-80 transition-opacity"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="tel:+21695555555" className="text-primary hover:opacity-80 transition-opacity" title="Call us">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:support@atlasvault.tn" className="text-primary hover:opacity-80 transition-opacity" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products?category=vault" className="hover:text-primary transition-colors">
                  The Vault
                </Link>
              </li>
              <li>
                <Link href="/products?category=telecom" className="hover:text-primary transition-colors">
                  Telecom Hub
                </Link>
              </li>
              <li>
                <Link href="/products?category=gaming" className="hover:text-primary transition-colors">
                  Gaming Corner
                </Link>
              </li>
              <li>
                <Link href="/products?category=business" className="hover:text-primary transition-colors">
                  Business Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 AtlasVault. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
