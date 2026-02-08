# Products Page - Quick Reference Guide

## File Structure
```
components/
├── product-card.tsx          # Reusable product display card
├── product-filters.tsx       # Advanced filters & sorting
└── header.tsx               # Navigation (existing)

app/
├── products/
│   └── page.tsx            # Main products listing page
└── product/
    └── [slug]/
        └── page.tsx        # Product detail page

lib/
└── products-db.ts          # Centralized product data

Documentation/
├── PRODUCTS_PAGE_IMPLEMENTATION.md  # Detailed technical guide
├── PRODUCTS_PAGE_ENHANCEMENTS.md    # Feature summary
└── PRODUCTS_PAGE_QUICK_REFERENCE.md # This file
```

## Components Overview

### ProductCard
**Purpose**: Display individual product with interaction options
**Usage**: Maps through products array and renders cards

```tsx
<ProductCard
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
```

### ProductFilters
**Purpose**: Filter and sort products
**Usage**: Single instance in products page layout

```tsx
<ProductFilters
  sortBy={sortBy}
  priceRange={priceRange}
  minRating={minRating}
  onSortChange={setSortBy}
  onPriceChange={setPriceRange}
  onRatingChange={setMinRating}
  onReset={() => {/* reset filters */}}
  productCount={filteredAndSortedProducts.length}
/>
```

## Products Page State

```typescript
const [selectedCategory, setSelectedCategory] = useState<string>('vault')
const [services, setServices] = useState<Service[]>([])
const [favorites, setFavorites] = useState<Set<string>>(new Set())
const [cart, setCart] = useState<string[]>([])
const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating' | 'newest'>('popular')
const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
const [minRating, setMinRating] = useState(0)
```

## Data Flow

```
User Select Category
        ↓
Load Products from DB
        ↓
Apply Filters (Price, Rating)
        ↓
Apply Sorting (Popular, Price, Rating, etc)
        ↓
Display in ProductCard Grid
        ↓
User Actions:
  - Add to Cart → Cart page
  - Favorite → Update favorites state
  - Click → Product detail page
```

## Responsive Breakpoints

| Screen | Width | Layout | Columns |
|--------|-------|--------|---------|
| Mobile | < 640px | 1-col + full-width | 1 |
| Tablet | 640-1024px | 2-col + filter toggle | 2 |
| Desktop | > 1024px | 3-col + sidebar | 3 |

## Category Colors

| Category | Gradient | Color |
|----------|----------|-------|
| The Vault | from-[#0066CC] to-[#4A90E2] | Blue |
| Telecom Hub | from-[#2ECC71] to-[#27AE60] | Green |
| Gaming Corner | from-[#FF6B35] to-[#FF4500] | Orange |
| Business Suite | from-[#5B4A9F] to-[#0066CC] | Purple |

## Filter Options

**Sort By** (5 options):
- Popular (default)
- Price: Low to High
- Price: High to Low
- Highest Rated
- Newest

**Price Range**:
- Min: 0 TND
- Max: 100 TND
- Adjustable via slider or input

**Rating Filter**:
- No filter (0)
- 3+ stars
- 3.5+ stars
- 4+ stars
- 4.5+ stars

## Key Functions

```typescript
// Add product to cart
const addToCart = (serviceId: string) => {
  setCart((prev) => [...prev, serviceId])
  toast.success('Added to cart')
}

// Toggle favorite status
const toggleFavorite = (serviceId: string) => {
  setFavorites((prev) => {
    const newFavorites = new Set(prev)
    newFavorites.has(serviceId) 
      ? newFavorites.delete(serviceId) 
      : newFavorites.add(serviceId)
    return newFavorites
  })
}

// Filter and sort (memoized)
const filteredAndSortedProducts = useMemo(() => {
  // Apply filters first
  // Then apply sorting
}, [services, sortBy, priceRange, minRating])
```

## Product Database Structure

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'vault' | 'telecom' | 'gaming' | 'business';
  price: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: Array<{label: string; value: string}>;
  orderSteps: Array<{number: number; title: string; description: string}>;
  faqs: Array<{question: string; answer: string}>;
}
```

## Adding New Products

1. Open `/lib/products-db.ts`
2. Add new product to `PRODUCTS_DATABASE`:

```typescript
'new-product-slug': {
  id: 'new-product-slug',
  slug: 'new-product-slug',
  name: 'New Product Name',
  category: 'vault',
  price: 9.99,
  rating: 4.5,
  reviews: 100,
  description: 'Description here',
  features: ['Feature 1', 'Feature 2'],
  specifications: [{label: 'Spec', value: 'Value'}],
  orderSteps: [{number: 1, title: 'Step', description: 'Desc'}],
  faqs: [{question: 'Q', answer: 'A'}]
}
```

3. Product automatically appears in products page

## Common Tasks

### Change Default Sort
```typescript
// In products page state
const [sortBy, setSortBy] = useState<...>('price-low') // Changed from 'popular'
```

### Adjust Price Range
```typescript
// In products page state
const [priceRange, setPriceRange] = useState<[number, number]>([5, 50]) // Changed range
```

### Modify Category Colors
```typescript
// In category data
vault: {
  // ...
  gradient: 'from-[#FF0000] to-[#00FF00]' // Changed gradient
}
```

### Add New Sort Option
```typescript
// In ProductFilters component
{ value: 'newest-custom' as const, label: 'Very New' }

// In products page sorting logic
case 'newest-custom':
  filtered = filtered.reverse().slice(0, 5) // Custom sorting
```

## Styling Tips

### Product Card Hover
```tsx
className="hover:shadow-lg hover:border-primary/50 transition-all duration-300"
```

### Responsive Text
```tsx
className="text-sm md:text-base lg:text-lg"
```

### Color Consistency
```tsx
text-primary      // Main brand color
bg-muted          // Background for sections
border-border     // Borders
text-foreground   // Main text
text-muted-foreground // Secondary text
```

## Performance Optimization

### Memoization
```typescript
const filteredAndSortedProducts = useMemo(() => {
  // Expensive filtering/sorting logic
}, [services, sortBy, priceRange, minRating])
```

### Event Handlers
```typescript
onClick={() => addToCart(product.id)} // Inline or extract to memoized callback
```

### Lazy Loading (Future)
```typescript
const ProductCard = lazy(() => import('@/components/product-card'))
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Products not showing | Check category in URL, verify data in products-db.ts |
| Filters not working | Check memoization dependencies, verify state updates |
| Styling issues | Inspect Tailwind classes, check for conflicting CSS |
| Slow performance | Profile with React DevTools, check rendering count |
| Mobile layout broken | Verify responsive breakpoints, check grid classes |

## Browser DevTools Tips

### Check Product Loading
```javascript
// In console on products page
console.log('Filtered products:', filteredAndSortedProducts.length)
```

### Verify Filters Applied
```javascript
// Check state changes
console.log('Current sort:', sortBy)
console.log('Price range:', priceRange)
console.log('Min rating:', minRating)
```

### Performance Profiling
```javascript
// React DevTools → Profiler tab
// Record interactions and analyze re-renders
```

## Accessibility Checklist

- [ ] All images have alt text
- [ ] Color not sole method of identification
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Touch targets > 44px
- [ ] Contrast ratios ≥ 4.5:1
- [ ] Focus indicators visible
- [ ] No autoplaying media

## Testing Scenarios

1. **Sort by Price Low to High**
   - Should show cheapest first
   - Order updates immediately

2. **Filter by Rating 4+**
   - Only shows 4+ star products
   - Count updates

3. **Mobile View**
   - Filters collapse
   - 1 column grid
   - Readable text

4. **Add to Favorites**
   - Heart fills with color
   - Toast appears
   - State persists in session

5. **Add to Cart**
   - Button shows loading state
   - Cart counter increments
   - Toast confirmation appears

## Useful Links

- Tailwind CSS Docs: https://tailwindcss.com/docs
- shadcn/ui Components: https://ui.shadcn.com/
- Lucide Icons: https://lucide.dev/
- React Docs: https://react.dev/
- Next.js Docs: https://nextjs.org/docs

## Version History

- v1.0 (Current): Initial release with filtering, sorting, favorites
- Future: Real database integration, recommendations, advanced search
