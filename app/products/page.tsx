'use client'

import { useEffect } from "react"

import { useState, useMemo, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/product-filters'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

interface Service {
  id: string
  name: string
  description: string
  price: number
  category: string
  slug: string
  rating: number
  reviews_count: number
}

const categoryData = {
  vault: {
    name: 'The Vault',
    description: 'International streaming subscriptions',
    gradient: 'from-[#0066CC] to-[#4A90E2]',
    items: [
      { id: 'netflix', slug: 'netflix-premium', name: 'Netflix Premium', price: 15.99, description: '4K Ultra HD streaming' },
      { id: 'disney', slug: 'disney-plus', name: 'Disney+ Subscription', price: 10.99, description: 'Disney, Pixar, Marvel & Star Wars' },
      { id: 'spotify', slug: 'spotify-premium', name: 'Spotify Premium', price: 12.99, description: 'Ad-free music streaming' },
      { id: 'appletv', slug: 'apple-tv', name: 'Apple TV+', price: 9.99, description: 'Original series and films' },
      { id: 'prime', slug: 'prime-video', name: 'Amazon Prime Video', price: 11.99, description: 'Movies, shows & Prime shipping' },
      { id: 'hbo', slug: 'max-hbo', name: 'Max (HBO)', price: 13.99, description: 'HBO, DC, and Max Originals' },
    ]
  },
  telecom: {
    name: 'Telecom Hub',
    description: 'Internet bundles and mobile top-ups',
    gradient: 'from-[#2ECC71] to-[#27AE60]',
    items: [
      { id: 'ooredoo-internet', slug: 'ooredoo-10gb', name: 'Ooredoo 10GB', price: 19.99, description: '10GB internet + calls' },
      { id: 'orange-internet', slug: 'orange-10gb', name: 'Orange 10GB', price: 19.99, description: '10GB internet + unlimited SMS' },
      { id: 'tt-internet', slug: 'tt-10gb', name: 'TT 10GB', price: 17.99, description: '10GB + free hotspot' },
      { id: 'ooredoo-topup', slug: 'ooredoo-topup', name: 'Ooredoo 20 TND', price: 20, description: 'Mobile credit top-up' },
      { id: 'orange-topup', slug: 'orange-topup', name: 'Orange 20 TND', price: 20, description: 'Mobile credit top-up' },
      { id: 'tt-topup', slug: 'tt-topup', name: 'TT 20 TND', price: 20, description: 'Mobile credit top-up' },
    ]
  },
  gaming: {
    name: 'Gaming Corner',
    description: 'Gaming credits and subscriptions',
    gradient: 'from-[#FF6B35] to-[#FF4500]',
    items: [
      { id: 'freefire-diamonds', slug: 'free-fire-diamonds', name: 'Free Fire 520 Diamonds', price: 9.99, description: 'In-game currency' },
      { id: 'pubg-uc', slug: 'pubg-uc', name: 'PUBG 1200 UC', price: 29.99, description: 'PlayerUnknown Battlegrounds currency' },
      { id: 'steam-50', slug: 'steam-50', name: 'Steam Gift Card 50€', price: 55, description: 'Steam store credit' },
      { id: 'playstation-20', slug: 'playstation-20', name: 'PlayStation 20€', price: 22, description: 'PSN store credit' },
      { id: 'xbox-20', slug: 'xbox-20', name: 'Xbox 20€', price: 22, description: 'Xbox store credit' },
      { id: 'gamepass', slug: 'xbox-gamepass', name: 'Xbox Game Pass', price: 16.99, description: '1 month unlimited games' },
    ]
  },
  business: {
    name: 'Business Suite',
    description: 'Professional tools and services',
    gradient: 'from-[#5B4A9F] to-[#0066CC]',
    items: [
      { id: 'canva-pro', slug: 'canva-pro', name: 'Canva Pro', price: 14.99, description: 'Design tool subscription' },
      { id: 'chatgpt-plus', slug: 'chatgpt-plus', name: 'ChatGPT Plus', price: 19.99, description: 'AI assistant premium' },
      { id: 'hostinger-monthly', slug: 'hostinger', name: 'Hostinger Hosting', price: 3.99, description: 'Web hosting plan' },
      { id: 'domain-annual', slug: 'domain', name: 'Domain Registration', price: 9.99, description: '1 year domain' },
      { id: 'adobe-creative', slug: 'adobe-cloud', name: 'Adobe Creative Cloud', price: 59.99, description: 'All Adobe apps' },
      { id: 'notion-plus', slug: 'notion-plus', name: 'Notion Plus', price: 11.99, description: 'Workspace management' },
    ]
  }
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Initialize with vault to avoid hydration mismatch
  const [selectedCategory, setSelectedCategory] = useState('vault')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Only sync with URL after mount to prevent hydration mismatch
    setIsMounted(true)
    const categoryFromUrl = searchParams?.get('category')
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [])
  
  // Initialize state with proper defaults
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating' | 'newest'>('popular')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Generate products once per category with consistent ratings based on ID hash
  const categoryServices = useMemo(() => {
    const categoryItems = categoryData[selectedCategory as keyof typeof categoryData]?.items || []
    return categoryItems.map((item: any) => {
      // Use a deterministic hash based on item id to generate consistent ratings
      const hash = item.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)
      const rating = (hash % 20) / 10 + 3.5 // Range 3.5-5.5
      const reviews = (hash % 500) + 50 // Range 50-550

      return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        description: item.description,
        price: item.price,
        category: selectedCategory,
        rating: Math.round(rating * 10) / 10,
        reviews_count: reviews,
      }
    })
  }, [selectedCategory])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = categoryServices.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1] && product.rating >= minRating
    )

    switch (sortBy) {
      case 'price-low':
        return filtered.slice().sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.slice().sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.slice().sort((a, b) => b.rating - a.rating)
      case 'newest':
        return filtered.slice().reverse()
      case 'popular':
      default:
        return filtered.slice().sort((a, b) => b.reviews_count - a.reviews_count)
    }
  }, [categoryServices, sortBy, priceRange, minRating])

  const addToCart = (serviceId: string) => {
    toast.success('Added to cart')
  }

  const toggleFavorite = (serviceId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(serviceId)) {
        newFavorites.delete(serviceId)
        toast.success('Removed from favorites')
      } else {
        newFavorites.add(serviceId)
        toast.success('Added to favorites')
      }
      return newFavorites
    })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    router.push(`/products?category=${category}`)
  }

  const currentCategory = categoryData[selectedCategory as keyof typeof categoryData]

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border sticky top-16 z-30 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 py-4">
          {Object.entries(categoryData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === key ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentCategory && (
          <>
            {/* Category Header */}
            <div className={`bg-gradient-to-r ${currentCategory.gradient} rounded-xl p-8 sm:p-12 text-white mb-12`}>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{currentCategory.name}</h1>
              <p className="text-base sm:text-lg opacity-90">{currentCategory.description}</p>
            </div>

            {/* Filters and Products Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="md:col-span-1">
                <ProductFilters
                  sortBy={sortBy}
                  priceRange={priceRange}
                  minRating={minRating}
                  onSortChange={setSortBy}
                  onPriceChange={setPriceRange}
                  onRatingChange={setMinRating}
                  onReset={() => {
                    setSortBy('popular')
                    setPriceRange([0, 100])
                    setMinRating(0)
                  }}
                  productCount={filteredAndSortedProducts.length}
                />
              </div>

              {/* Products Grid */}
              <div className="md:col-span-3">
                {filteredAndSortedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-lg text-muted-foreground mb-4">No products found matching your filters</p>
                    <button
                      onClick={() => {
                        setSortBy('popular')
                        setPriceRange([0, 100])
                        setMinRating(0)
                      }}
                      className="text-primary hover:underline text-sm"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAndSortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        slug={product.slug}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        reviewCount={product.reviews_count}
                        gradient={currentCategory.gradient}
                        onAddToCart={addToCart}
                        isFavorited={favorites.has(product.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsContent />
    </Suspense>
  )
}
