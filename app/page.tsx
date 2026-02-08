'use client';

import Link from 'next/link';
import { Smartphone, Gamepad2, Film, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroPromo } from '@/components/hero-promo';

const categories = [
  {
    id: 'vault',
    name: 'The Vault',
    description: 'Stream your favorite content worldwide',
    longDescription: 'International streaming subscriptions at the best prices',
    items: ['Netflix', 'Disney+', 'Spotify', 'Apple TV+'],
    icon: Film,
    gradient: 'bg-gradient-to-br from-[#0066CC] to-[#4A90E2]',
  },
  {
    id: 'telecom',
    name: 'Telecom Hub',
    description: 'Stay connected with Tunisian carriers',
    longDescription: 'Internet bundles and mobile top-ups for all carriers',
    items: ['Ooredoo', 'Orange', 'TT', 'Internet Plans'],
    icon: Smartphone,
    gradient: 'bg-gradient-to-br from-[#2ECC71] to-[#27AE60]',
  },
  {
    id: 'gaming',
    name: 'Gaming Corner',
    description: 'Power up your gaming experience',
    longDescription: 'Gaming credits and subscriptions for all platforms',
    items: ['Free Fire', 'PUBG', 'Steam', 'PlayStation'],
    icon: Gamepad2,
    gradient: 'bg-gradient-to-br from-[#FF6B35] to-[#FF4500]',
  },
  {
    id: 'business',
    name: 'Business Suite',
    description: 'Tools for productivity and growth',
    longDescription: 'Professional tools and services for your business',
    items: ['Canva Pro', 'ChatGPT Plus', 'Hosting', 'Domains'],
    icon: Briefcase,
    gradient: 'bg-gradient-to-br from-[#5B4A9F] to-[#0066CC]',
  },
];

export default function HomePage() {
  return (
    <div className="w-full bg-background">
      {/* Promotional Hero Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroPromo />
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
            Your All-in-One Digital Services Marketplace
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Access streaming subscriptions, telecom services, gaming credits, and business tools—all in one place. 
            Secure payments with multiple trusted options.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Browse Categories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore our curated collection of digital services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={`/products?category=${category.id}`}>
                  <div className="group h-full bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300 cursor-pointer flex flex-col">
                    <div className={`${category.gradient} h-40 flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                      <Icon className="w-20 h-20 text-white relative z-10" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span
                            key={item}
                            className="inline-block bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Active Users</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm sm:text-base text-muted-foreground">Orders Completed</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm sm:text-base text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose AtlasVault?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience seamless digital services shopping
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Secure Payments',
                description: 'Multiple payment methods including D17, Flouci, and card payments with industry-standard encryption',
              },
              {
                title: 'Instant Delivery',
                description: 'Get your subscriptions and credits instantly after purchase, no delays or waiting',
              },
              {
                title: 'Best Prices',
                description: 'Competitive rates on all digital services with regular promotions and discounts',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-8 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of satisfied customers. Start shopping today.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Browse Services Now
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
