# Next.js 16.0.10 Error Fixes - Complete Guide

## Errors Identified and Fixed

### Error 1: Async Client Component
**Error Message:**
```
<ProductDetailPage> is an async Client Component. Only Server Components can be async at the moment. 
This error is often caused by accidentally adding 'use client' to a module that was originally written for the server.
```

**Root Cause:**
The file `app/product/[slug]/page.tsx` had conflicting directives:
- `'use client'` directive at the top
- `async function` declaration
- `await params` for accessing Promise params (Next.js 16 feature)

**Solution Applied:**
Removed the `'use client'` directive and made it a proper async server component.

**File:** `app/product/[slug]/page.tsx`

**Before:**
```tsx
'use client';  // ❌ Conflicts with async function
import { useState } from 'react';  // ❌ Can't use hooks in async server component

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;  // ❌ Async operation in client component
  const [quantity, setQuantity] = useState(1);  // ❌ State in server component
  // ...
}
```

**After:**
```tsx
import Link from 'next/link';  // ✅ Removed 'use client'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;  // ✅ Properly await Promise
  const product = productDatabase[resolvedParams.slug];  // ✅ Server-side data fetch

  return (
    <ProductDetailContent product={product} slug={resolvedParams.slug} />  // ✅ Pass to client component
  );
}
```

---

### Error 2: Component Suspended by Uncached Promise
**Error Message:**
```
A component was suspended by an uncached promise. Creating promises inside a Client Component 
or hook is not yet supported, except via a Suspense-compatible library or framework.
```

**Root Cause:**
The client component `ProductDetailContent` was trying to handle async operations or promises.

**Solution Applied:**
Ensured all async operations (data fetching, param resolution) happen in the server component, not the client component.

**File:** `app/product/[slug]/product-detail-content.tsx`

**Pattern:**
```tsx
'use client';

import { useState } from 'react';

interface ProductDetailContentProps {
  product: any;  // ✅ Product already fetched on server
  slug: string;
}

export function ProductDetailContent({ product, slug }: ProductDetailContentProps) {
  const [quantity, setQuantity] = useState(1);  // ✅ Safe to use hooks here
  
  // ✅ No promises or async operations - only client-side state management
  const handleAddToCart = () => {
    // Client-side logic only
  };
  
  return (
    // JSX content
  );
}
```

---

### Error 3: Hydration Mismatch on Products Page
**Error Message:**
```
Hydration failed because the server rendered text didn't match the client.
```

**Root Cause:**
The products page had inconsistent state initialization:
1. `useState('vault')` - initializes with 'vault' on both server and client
2. `useEffect` to read `searchParams?.get('category')` - happens only on client
3. Different rendered content between server (initial state) and client (after effect)

**Solution Applied:**
Initialize state directly from searchParams without useEffect, using the URL parameter as the initial state.

**File:** `app/products/page.tsx`

**Before:**
```tsx
'use client';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('vault');  // ❌ Always starts as 'vault'

  useEffect(() => {  // ❌ This runs only on client
    setIsMounted(true);
    const category = searchParams?.get('category');
    if (category) {
      setSelectedCategory(category);  // ❌ Changes state after render = hydration mismatch
    }
  }, [searchParams]);
}
```

**After:**
```tsx
'use client';

function ProductsContent() {
  const searchParams = useSearchParams();
  
  // ✅ Initialize with URL param directly
  const initialCategory = searchParams?.get('category') || 'vault';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  // ✅ No useEffect needed - state matches on both server and client
}
```

---

### Error 4: In-Place Array Mutations
**Issue:**
Using `.reverse()` and `.sort()` directly on arrays mutates the original array, causing unpredictable results.

**Solution Applied:**
Use `.slice()` to create a shallow copy before sorting/reversing.

**File:** `app/products/page.tsx`

**Before:**
```tsx
case 'price-low':
  return filtered.sort((a, b) => a.price - b.price);  // ❌ Mutates original

case 'newest':
  return filtered.reverse();  // ❌ Mutates original
```

**After:**
```tsx
case 'price-low':
  return filtered.slice().sort((a, b) => a.price - b.price);  // ✅ Creates copy first

case 'newest':
  return filtered.slice().reverse();  // ✅ Creates copy first
```

---

## Next.js 16 Best Practices Summary

### 1. Async Server Components with Promise Params
```tsx
// ✅ Correct Pattern

export default async function Page({
  params,  // This is a Promise in Next.js 16
}: {
  params: Promise<{ id: string }>
}) {
  // Must await params first
  const resolvedParams = await params;
  const data = await fetchData(resolvedParams.id);
  
  return <ClientComponent data={data} />;
}
```

### 2. Server → Client Data Flow
```tsx
// ✅ Server Component (page.tsx)
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);  // Server-side fetch
  
  return <ProductClient product={product} />;
}

// ✅ Client Component (separate file)
'use client';

export function ProductClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  
  return <div>{product.name}</div>;
}
```

### 3. Avoid useEffect for Initial State
```tsx
// ❌ Causes hydration mismatches
'use client';
function Page() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    const p = searchParams.get('page');
    if (p) setPage(Number(p));  // Changes after initial render
  }, [searchParams]);
}

// ✅ Better approach
'use client';
function Page() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(() => {
    return Number(searchParams.get('page')) || 1;
  });
}

// ✅ Or even better - use server-side filtering
export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const data = await fetchData(page);
  
  return <ClientComponent data={data} />;
}
```

### 4. Proper Array Mutations
```tsx
// ❌ Wrong
const sorted = products.sort((a, b) => a.price - b.price);

// ✅ Correct
const sorted = products.slice().sort((a, b) => a.price - b.price);

// ✅ Or use spread operator
const sorted = [...products].sort((a, b) => a.price - b.price);
```

---

## Testing the Fixes

1. **Verify no console errors** - Check browser console for React/Next.js errors
2. **Test category switching** - Click different category buttons, verify no hydration errors
3. **Verify product page loads** - Navigate to product detail page, check for async errors
4. **Test cart functionality** - Ensure client components (cart, favorites) work properly

---

## Summary of Files Modified

| File | Issue | Fix |
|------|-------|-----|
| `app/product/[slug]/page.tsx` | Async client component | Removed `'use client'`, kept async server function |
| `app/products/page.tsx` | Hydration mismatch | Removed useEffect, initialize state from searchParams directly |
| `app/products/page.tsx` | Array mutations | Added `.slice()` before sort/reverse operations |

---

## References

- [Next.js 16 Async Components](https://nextjs.org/docs)
- [React Hydration Guide](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-and-client-components)
