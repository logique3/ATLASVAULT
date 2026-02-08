// Services Database Schema
export interface Service {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  specifications: Array<{ label: string; value: string }>;
  orderSteps: Array<{ number: number; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedProducts?: Array<{ id: string; name: string; price: number }>;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  productCount: number;
  active: boolean;
}

export interface Promo {
  id: string;
  title: string;
  discount: number;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  applicableTo: 'all' | 'product' | 'category';
  targetId?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  condition: string;
  priority: 'high' | 'medium' | 'low';
  expiresAt: string;
  isLimited: boolean;
  limitedQuantity?: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Services Database
export const SERVICES_DATABASE: Record<string, Service> = {
  'netflix-premium': {
    id: 'netflix-premium',
    slug: 'netflix-premium',
    name: 'Netflix Premium',
    category: 'vault',
    price: 15.99,
    rating: 4.8,
    reviews: 324,
    description: 'Unlimited movies, TV shows, and games on 4 screens simultaneously. Stream in 4K Ultra HD with Dolby Atmos sound.',
    features: [
      'Watch on 4 screens at the same time',
      '4K + HDR available',
      'Dolby Atmos surround sound',
      'Ad-free viewing experience',
      'Download to watch offline',
      'Includes ad-free game streaming'
    ],
    specifications: [
      { label: 'Screens', value: '4 simultaneous' },
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Audio', value: 'Dolby Atmos' },
      { label: 'Offline Download', value: 'Yes' },
      { label: 'Games', value: 'Yes' }
    ],
    orderSteps: [
      { number: 1, title: 'Confirm Order', description: 'Review subscription details' },
      { number: 2, title: 'Payment', description: 'Choose D17, Flouci, or Card' },
      { number: 3, title: 'Account Setup', description: 'Receive credentials in minutes' },
      { number: 4, title: 'Start Streaming', description: 'Enjoy unlimited entertainment' }
    ],
    faqs: [
      { question: 'How long does account activation take?', answer: 'Usually 5-10 minutes after payment confirmation.' },
      { question: 'Can I upgrade my plan?', answer: 'Yes, upgrade or downgrade anytime from settings.' },
      { question: 'Is this shareable?', answer: 'Netflix Premium allows up to 4 simultaneous streams.' }
    ],
    inStock: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'disney-plus': {
    id: 'disney-plus',
    slug: 'disney-plus',
    name: 'Disney+ Subscription',
    category: 'vault',
    price: 10.99,
    rating: 4.7,
    reviews: 256,
    description: 'Access to Disney, Pixar, Marvel, Star Wars, and National Geographic content. Stream on multiple devices.',
    features: [
      'Disney, Pixar, Marvel & Star Wars',
      'National Geographic content',
      'Unlimited streaming',
      '4K quality available',
      'Offline downloads',
      'Parental controls'
    ],
    specifications: [
      { label: 'Screens', value: '4 simultaneous' },
      { label: 'Resolution', value: '4K available' },
      { label: 'Offline', value: 'Yes' },
      { label: 'Devices', value: 'Unlimited' }
    ],
    orderSteps: [
      { number: 1, title: 'Confirm Order', description: 'Review subscription' },
      { number: 2, title: 'Payment', description: 'Secure payment options' },
      { number: 3, title: 'Account', description: 'Get instant access' },
      { number: 4, title: 'Watch', description: 'Start streaming now' }
    ],
    faqs: [
      { question: 'What content is included?', answer: 'Disney, Pixar, Marvel, Star Wars, and National Geographic.' },
      { question: 'Can I download content?', answer: 'Yes, download for offline viewing.' }
    ],
    inStock: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'spotify-premium': {
    id: 'spotify-premium',
    slug: 'spotify-premium',
    name: 'Spotify Premium',
    category: 'vault',
    price: 12.99,
    rating: 4.9,
    reviews: 512,
    description: 'Ad-free music streaming with 100+ million songs. Listen offline and enjoy high audio quality.',
    features: [
      'Ad-free listening',
      '100+ million songs',
      'Download for offline',
      'High audio quality',
      'Skip unlimited songs',
      'Share Spotify codes'
    ],
    specifications: [
      { label: 'Songs', value: '100+ million' },
      { label: 'Audio Quality', value: 'Up to 320kbps' },
      { label: 'Offline', value: 'Yes' },
      { label: 'Ads', value: 'None' }
    ],
    orderSteps: [
      { number: 1, title: 'Confirm', description: 'Review plan' },
      { number: 2, title: 'Pay', description: 'Multiple payment options' },
      { number: 3, title: 'Connect', description: 'Link your account' },
      { number: 4, title: 'Enjoy', description: 'Start playing music' }
    ],
    faqs: [
      { question: 'Can I download songs?', answer: 'Yes, download up to 10,000 songs per device.' },
      { question: 'How many devices?', answer: 'Premium works on any device.' }
    ],
    inStock: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
};

// Mock Categories Database
export const CATEGORIES_DATABASE: Record<string, Category> = {
  vault: {
    id: 'vault',
    name: 'The Vault',
    description: 'Stream your favorite content worldwide',
    icon: '🎬',
    color: 'from-[#0066CC] to-[#4A90E2]',
    productCount: 6,
    active: true,
  },
  telecom: {
    id: 'telecom',
    name: 'Telecom Hub',
    description: 'Stay connected with Tunisian carriers',
    icon: '📱',
    color: 'from-[#2ECC71] to-[#27AE60]',
    productCount: 6,
    active: true,
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming Corner',
    description: 'Power up your gaming experience',
    icon: '🎮',
    color: 'from-[#FF6B35] to-[#FF4500]',
    productCount: 6,
    active: true,
  },
  business: {
    id: 'business',
    name: 'Business Suite',
    description: 'Tools for productivity and growth',
    icon: '💼',
    color: 'from-[#5B4A9F] to-[#0066CC]',
    productCount: 6,
    active: true,
  },
};

// Mock Promos Database
export const PROMOS_DATABASE: Record<string, Promo> = {
  'promo-1': {
    id: 'promo-1',
    title: 'Netflix 50% Off',
    discount: 50,
    type: 'percentage',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    applicableTo: 'product',
    targetId: 'netflix-premium',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'promo-2': {
    id: 'promo-2',
    title: 'Gaming 30% Off',
    discount: 30,
    type: 'percentage',
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    applicableTo: 'category',
    targetId: 'gaming',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Mock Offers Database
export const OFFERS_DATABASE: Record<string, Offer> = {
  'offer-1': {
    id: 'offer-1',
    name: 'Bundle Deal',
    description: 'Buy 2 Get 1 Free',
    condition: 'Minimum 2 products',
    priority: 'high',
    expiresAt: '2024-02-28',
    isLimited: true,
    limitedQuantity: 100,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'offer-2': {
    id: 'offer-2',
    name: 'First Purchase',
    description: '20% off for new users',
    condition: 'New customers only',
    priority: 'medium',
    expiresAt: '2024-03-15',
    isLimited: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

// Helper functions for data management
export function getServiceById(id: string): Service | null {
  return SERVICES_DATABASE[id] || null;
}

export function getServiceBySlug(slug: string): Service | null {
  return Object.values(SERVICES_DATABASE).find(s => s.slug === slug) || null;
}

export function getServicesByCategory(category: string): Service[] {
  return Object.values(SERVICES_DATABASE).filter(s => s.category === category && s.active);
}

export function getAllServices(): Service[] {
  return Object.values(SERVICES_DATABASE).filter(s => s.active);
}

export function getCategoryById(id: string): Category | null {
  return CATEGORIES_DATABASE[id] || null;
}

export function getAllCategories(): Category[] {
  return Object.values(CATEGORIES_DATABASE).filter(c => c.active);
}

export function getPromoById(id: string): Promo | null {
  return PROMOS_DATABASE[id] || null;
}

export function getActivePromos(): Promo[] {
  const now = new Date();
  return Object.values(PROMOS_DATABASE).filter(p => {
    const startDate = new Date(p.startDate);
    const endDate = new Date(p.endDate);
    return p.active && now >= startDate && now <= endDate;
  });
}

export function getOfferById(id: string): Offer | null {
  return OFFERS_DATABASE[id] || null;
}

export function getActiveOffers(): Offer[] {
  const now = new Date();
  return Object.values(OFFERS_DATABASE).filter(o => {
    const expiresAt = new Date(o.expiresAt);
    return o.active && now <= expiresAt;
  });
}
