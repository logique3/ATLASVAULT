'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface ProductFiltersProps {
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest';
  priceRange: [number, number];
  minRating: number;
  onSortChange: (sort: 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest') => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
  productCount: number;
}

export function ProductFilters({
  sortBy,
  priceRange,
  minRating,
  onSortChange,
  onPriceChange,
  onRatingChange,
  onReset,
  productCount,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isFiltered = sortBy !== 'popular' || priceRange[0] !== 0 || priceRange[1] !== 100 || minRating !== 0;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4 flex gap-2">
        <Button
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="w-4 h-4" />
          Filters {isFiltered && <span className="ml-auto text-xs bg-primary text-white px-2 py-1 rounded">Active</span>}
        </Button>
      </div>

      {/* Desktop Filter Panel */}
      <Card className="p-6 bg-card border border-border rounded-lg hidden md:block">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground">Filters</h3>
              {isFiltered && (
                <button
                  onClick={onReset}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Sort By</label>
            <div className="space-y-2">
              {[
                { value: 'popular' as const, label: 'Most Popular' },
                { value: 'price-low' as const, label: 'Price: Low to High' },
                { value: 'price-high' as const, label: 'Price: High to Low' },
                { value: 'rating' as const, label: 'Highest Rated' },
                { value: 'newest' as const, label: 'Newest' },
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => onSortChange(e.target.value as typeof sortBy)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="ml-2 text-sm text-muted-foreground hover:text-foreground">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-t border-border pt-4">
            <label className="block text-sm font-semibold text-foreground mb-3">Price Range</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                  className="w-1/2 px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
                <input
                  type="number"
                  min={priceRange[0]}
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                  className="w-1/2 px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground text-center">
                {priceRange[0]} TND - {priceRange[1]} TND
              </p>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="border-t border-border pt-4">
            <label className="block text-sm font-semibold text-foreground mb-3">Minimum Rating</label>
            <div className="space-y-2">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <label key={rating} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={minRating === rating}
                    onChange={(e) => onRatingChange(Number(e.target.value))}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating === 0 ? 'All' : `${rating} ⭐ & up`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <Card className="md:hidden p-4 bg-card border border-border rounded-lg mb-4 space-y-4">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => {
                onSortChange(e.target.value as typeof sortBy);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Price Range Mobile */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Max Price: {priceRange[1]} TND</label>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {isFiltered && (
            <Button onClick={onReset} variant="outline" className="w-full bg-transparent">
              Reset Filters
            </Button>
          )}
        </Card>
      )}

      {/* Results Info */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{productCount}</span> products
        </p>
        {isFiltered && (
          <p className="text-xs text-primary flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Filters applied
          </p>
        )}
      </div>
    </>
  );
}
