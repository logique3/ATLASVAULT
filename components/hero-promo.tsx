'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Zap, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Promo {
  id: string
  title: string
  description: string
  discount: string
  image: string
  category: string
  badge: string
}

const promos: Promo[] = [
  {
    id: '1',
    title: 'Netflix Premium Sale',
    description: 'Get 3 months of unlimited 4K streaming',
    discount: '30% OFF',
    image: '/placeholder.svg?height=400&width=1200',
    category: 'vault',
    badge: 'LIMITED TIME',
  },
  {
    id: '2',
    title: 'Telecom Bundle Deals',
    description: 'Unlimited internet + mobile credit',
    discount: '25% OFF',
    image: '/placeholder.svg?height=400&width=1200',
    category: 'telecom',
    badge: 'EXCLUSIVE',
  },
  {
    id: '3',
    title: 'Gaming Credits Bonus',
    description: 'Extra credits on Free Fire & PUBG',
    discount: '50% BONUS',
    image: '/placeholder.svg?height=400&width=1200',
    category: 'gaming',
    badge: 'HOT DEAL',
  },
]

export function HeroPromo() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length)
    setAutoPlay(false)
  }

  const promo = promos[currentSlide]

  return (
    <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10">
      {/* Carousel */}
      <div className="relative h-full">
        {promos.map((p, idx) => (
          <div
            key={p.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={p.image || "/placeholder.svg"}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
          {/* Left Content */}
          <div className="max-w-md text-white z-10">
            <div className="inline-block bg-destructive text-white px-3 py-1 rounded-full text-xs font-bold mb-4">
              {promo.badge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance">{promo.title}</h1>
            <p className="text-base md:text-lg text-white/90 mb-8">{promo.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold text-white">{promo.discount}</div>
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>

            <Link href={`/products?category=${promo.category}`}>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Shop Now
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 z-10">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {promos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentSlide(idx)
              setAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 w-2 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Featured Offers Grid */}
      <div className="absolute bottom-0 right-0 p-6 hidden lg:block">
        <div className="bg-white/95 backdrop-blur rounded-lg p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm text-foreground">Special Offers</span>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex justify-between">
              <span>Free shipping on orders</span>
              <span className="font-semibold text-primary">&gt; 50 TND</span>
            </li>
            <li className="flex justify-between">
              <span>Loyalty points on each</span>
              <span className="font-semibold text-primary">purchase</span>
            </li>
            <li className="flex justify-between">
              <span>24/7 WhatsApp</span>
              <span className="font-semibold text-primary">support</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
