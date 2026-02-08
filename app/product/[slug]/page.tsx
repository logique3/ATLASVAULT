'use client';

import { Button } from "@/components/ui/button"

import { useState } from "react"

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { PRODUCTS_DATABASE } from '@/lib/products-db';
import { ProductDetailContent } from './product-detail-content';

// Mock product data - replace with actual database queries
const productDatabase: Record<string, any> = {
  ...PRODUCTS_DATABASE,
  'netflix-premium': {
    ...PRODUCTS_DATABASE['netflix-premium'],
    features: [
      'Watch on 4 screens at the same time',
      '4K + HDR available',
      'Dolby Atmos available',
      'Ad-free viewing experience',
      'Download to watch offline',
      'Ad-free game streaming'
    ],
    specifications: [
      { label: 'Screens', value: '4 simultaneous' },
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Audio', value: 'Dolby Atmos' },
      { label: 'Offline Download', value: 'Yes' },
      { label: 'Games Included', value: 'Yes' }
    ],
    orderSteps: [
      {
        number: 1,
        title: 'Review & Confirm',
        description: 'Review your subscription details and confirm your order'
      },
      {
        number: 2,
        title: 'Payment',
        description: 'Choose your preferred payment method (D17, Flouci, or Card)'
      },
      {
        number: 3,
        title: 'Account Setup',
        description: 'Receive account credentials via email within minutes'
      },
      {
        number: 4,
        title: 'Start Streaming',
        description: 'Log in and start enjoying unlimited entertainment'
      }
    ],
    faqs: [
      {
        question: 'How long does account activation take?',
        answer: 'Usually within 5-10 minutes after payment confirmation. You\'ll receive login credentials via email.'
      },
      {
        question: 'Can I change my subscription plan later?',
        answer: 'Yes, you can upgrade or downgrade your plan anytime from your account settings.'
      },
      {
        question: 'Is this account shareable?',
        answer: 'Netflix Premium allows up to 4 simultaneous streams. Please review Netflix\'s terms for sharing policies.'
      },
      {
        question: 'What if I have technical issues?',
        answer: 'Our WhatsApp support is available 24/7 to help you troubleshoot any issues.'
      }
    ],
    inStock: true,
    relatedProducts: [
      { id: 'disney-plus', name: 'Disney+ Subscription', price: 10.99 },
      { id: 'spotify-premium', name: 'Spotify Premium', price: 12.99 },
      { id: 'appletv-plus', name: 'Apple TV+', price: 9.99 }
    ]
  }
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const product = productDatabase[resolvedParams.slug];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProductDetailContent 
      product={product} 
      slug={resolvedParams.slug}
    />
  );
}
