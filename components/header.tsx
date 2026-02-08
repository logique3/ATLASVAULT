'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, ShoppingCart, MessageCircle, Home, Moon, Sun, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/user-context';

const categories = [
  { id: 'vault', name: 'The Vault' },
  { id: 'telecom', name: 'Telecom Hub' },
  { id: 'gaming', name: 'Gaming Corner' },
  { id: 'business', name: 'Business Suite' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useUser();

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0066CC] to-[#4A90E2] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                AV
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:inline">
                AtlasVault
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-foreground hover:text-primary font-medium transition-colors">
                Shop
              </Link>
              <div className="group relative">
                <button className="text-foreground hover:text-primary font-medium transition-colors flex items-center gap-2">
                  Categories
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block pt-2">
                  <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-48">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        className="block px-4 py-2 hover:bg-muted text-foreground transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/about" className="text-foreground hover:text-primary font-medium transition-colors">
                About
              </Link>
              <Link href="/admin" className="text-foreground hover:text-primary font-medium transition-colors text-xs bg-primary/10 px-3 py-1 rounded-lg">
                Admin
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - Desktop only */}
              <div className="hidden lg:flex items-center bg-muted rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none ml-2 text-sm text-foreground placeholder-muted-foreground w-48"
                />
              </div>

              {/* Search Icon - Mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Search className="w-5 h-5 text-foreground" />
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 bg-destructive text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  document.documentElement.classList.toggle('dark');
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
              </button>

              {/* WhatsApp Support */}
              <a
                href="https://wa.me/21695555555?text=Hi%20AtlasVault%20support"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block"
                title="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </a>

              {/* User Account Menu */}
              {isAuthenticated && user ? (
                <div className="relative group hidden sm:block">
                  <button
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
                    title={user.name}
                  >
                    <User className="w-5 h-5 text-foreground" />
                  </button>
                  <div className="absolute right-0 top-full hidden group-hover:block pt-2 z-50">
                    <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-48">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {isAdmin && (
                          <p className="text-xs text-primary font-medium mt-1">Admin Account</p>
                        )}
                      </div>
                      <Link
                        href="/account"
                        className="block px-4 py-2 hover:bg-muted text-foreground transition-colors text-sm"
                      >
                        My Account
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 hover:bg-muted text-foreground transition-colors text-sm"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 hover:bg-muted text-foreground transition-colors text-sm flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 hidden sm:flex">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                  >
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="border-t border-border py-3 lg:hidden">
              <div className="flex items-center bg-muted rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none ml-2 text-sm text-foreground placeholder-muted-foreground flex-1"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="py-4 space-y-2">
              <Link
                href="/products"
                className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Shop</span>
              </Link>
              
              <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">Categories</div>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  className="block px-4 py-2 pl-12 hover:bg-muted rounded-lg transition-colors"
                >
                  {cat.name}
                </Link>
              ))}

              <hr className="my-2 border-border" />

              <Link
                href="/about"
                className="block px-4 py-2 hover:bg-muted rounded-lg transition-colors font-medium"
              >
                About Us
              </Link>

              <a
                href="https://wa.me/21695555555?text=Hi%20AtlasVault%20support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors text-[#25D366]"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">WhatsApp Support</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
