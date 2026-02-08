export const PRODUCTS_DATABASE: Record<string, any> = {
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
    ]
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
    ]
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
    ]
  },
  'apple-tv': {
    id: 'apple-tv',
    slug: 'apple-tv',
    name: 'Apple TV+',
    category: 'vault',
    price: 9.99,
    rating: 4.6,
    reviews: 189,
    description: 'Original series, films, and documentaries exclusive to Apple. Ad-free, high-quality streaming.',
    features: [
      'Apple Originals content',
      'Ad-free experience',
      '4K HDR quality',
      'Offline downloads',
      'Share with family',
      'Works on all devices'
    ],
    specifications: [
      { label: 'Content Type', value: 'Apple Originals' },
      { label: 'Quality', value: '4K HDR' },
      { label: 'Offline', value: 'Yes' },
      { label: 'Family Sharing', value: 'Up to 6 people' }
    ],
    orderSteps: [
      { number: 1, title: 'Confirm', description: 'Review subscription' },
      { number: 2, title: 'Pay', description: 'Secure payment' },
      { number: 3, title: 'Setup', description: 'Sign in instantly' },
      { number: 4, title: 'Watch', description: 'Enjoy Apple TV+' }
    ],
    faqs: [
      { question: 'What originals are available?', answer: 'See-It-First access to all Apple Original series and films.' }
    ]
  },
  'prime-video': {
    id: 'prime-video',
    slug: 'prime-video',
    name: 'Amazon Prime Video',
    category: 'vault',
    price: 11.99,
    rating: 4.5,
    reviews: 402,
    description: 'Movies, TV shows, and exclusive Prime series. Includes fast shipping on Amazon orders.',
    features: [
      'Movies and TV series',
      'Prime Originals',
      'Fast Prime shipping',
      '4K available',
      'Offline downloads',
      'Watchlist feature'
    ],
    specifications: [
      { label: 'Content', value: 'Movies & Series' },
      { label: 'Resolution', value: '4K available' },
      { label: 'Shipping', value: 'Free Prime shipping' },
      { label: 'Offline', value: 'Yes' }
    ],
    orderSteps: [
      { number: 1, title: 'Confirm', description: 'Review Prime Video' },
      { number: 2, title: 'Pay', description: 'Payment options' },
      { number: 3, title: 'Access', description: 'Instant activation' },
      { number: 4, title: 'Stream', description: 'Start watching' }
    ],
    faqs: [
      { question: 'Is Prime shipping included?', answer: 'Yes, free 2-day shipping on eligible items.' }
    ]
  },
  'max-hbo': {
    id: 'max-hbo',
    slug: 'max-hbo',
    name: 'Max (HBO)',
    category: 'vault',
    price: 13.99,
    rating: 4.7,
    reviews: 278,
    description: 'HBO series, Max originals, Warner Bros films, and DC content. Stream the best entertainment.',
    features: [
      'All HBO series',
      'Max Original shows',
      'Warner Bros films',
      'DC universe content',
      '4K content available',
      'Offline downloads'
    ],
    specifications: [
      { label: 'HBO Shows', value: 'Full access' },
      { label: 'Quality', value: '4K available' },
      { label: 'Offline', value: 'Yes' },
      { label: 'Screens', value: '4 simultaneous' }
    ],
    orderSteps: [
      { number: 1, title: 'Confirm', description: 'Review Max plan' },
      { number: 2, title: 'Pay', description: 'Choose payment' },
      { number: 3, title: 'Setup', description: 'Create account' },
      { number: 4, title: 'Binge', description: 'Enjoy Max content' }
    ],
    faqs: [
      { question: 'What DC content is available?', answer: 'All DC movies, series, and exclusive originals.' }
    ]
  }
}
