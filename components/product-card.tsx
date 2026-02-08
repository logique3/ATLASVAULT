'use client';

import React from "react"

import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  gradient: string;
  onAddToCart: (id: string) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  badge?: string;
}

export function ProductCard({
  id,
  slug,
  name,
  description,
  price,
  rating,
  reviewCount,
  gradient,
  onAddToCart,
  isFavorited = false,
  onToggleFavorite,
  badge,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [localFavorited, setLocalFavorited] = useState(isFavorited);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(id);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalFavorited(!localFavorited);
    onToggleFavorite?.(id);
  };

  return (
    <Link href={`/product/${slug}`}>
      <Card className="overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col h-full group cursor-pointer">
        {/* Product Image Area */}
        <div className={`bg-gradient-to-br ${gradient} h-40 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-3 right-3 bg-destructive text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {badge}
            </div>
          )}
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-3 left-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all z-10 shadow-md"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                localFavorited ? 'fill-destructive text-destructive' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors mb-2">
            {name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>

          {/* Price and Button */}
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
            <div>
              <p className="text-2xl font-bold text-primary">{price.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">TND</p>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="bg-primary hover:bg-primary/90 text-white flex-1"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              {isAdding ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
