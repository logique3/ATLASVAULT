# Next.js 16 Best Practices & Patterns

## Route Parameters (params) Handling

### Pattern 1: Dynamic Routes with Params (Server Component)

**Use Case:** Fetching data based on route parameters

```typescript
// app/product/[id]/page.tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Step 1: Await params to access properties
  const { id } = await params;
  
  // Step 2: Fetch data server-side
  const product = await db.product.findById(id);
  
  // Step 3: Render or pass to client component
  if (!product) notFound();
  
  return <ProductClient product={product} />;
}
```

### Pattern 2: Client Component with Route Params

**Use Case:** When you need client-side interactivity with route params

```typescript
// app/dashboard/[id]/page.tsx (Server Component - Data Fetching)
export default async function DashboardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const dashboard = await fetchDashboard(id);
  
  return <DashboardContent dashboard={dashboard} />;
}

// app/dashboard/[id]/dashboard-content.tsx (Client Component)
'use client';

import { useParams } from 'next/navigation';

export function DashboardContent({ dashboard }) {
  const params = useParams();
  const [filter, setFilter] = useState('');
  
  return (
    <div>
      <input onChange={(e) => setFilter(e.target.value)} />
      {/* Interactive content */}
    </div>
  );
}
```

### Pattern 3: Search Parameters (searchParams)

**Use Case:** Handling query strings like `/products?category=electronics`

```typescript
// app/products/page.tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const { category = 'all', sort = 'name' } = await searchParams;
  
  const products = await db.product.findMany({
    where: { category },
    orderBy: sort,
  });
  
  return <ProductsList products={products} />;
}
```

### Pattern 4: Optional Catch-all Routes

**Use Case:** Nested routes like `/docs/[...slug]`

```typescript
// app/docs/[...slug]/page.tsx
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params;
  const path = slug?.join('/') || 'index';
  
  const doc = await fetchDoc(path);
  
  return <DocContent doc={doc} />;
}
```

## Common Errors & Fixes

### Error 1: Accessing Promise Directly

```typescript
// ❌ WRONG
export default async function Page({ params }) {
  const id = params.id; // Error: accessing Promise property
}

// ✅ CORRECT
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
}
```

### Error 2: Mixing 'use client' with async

```typescript
// ❌ WRONG
'use client';
export default async function Page({ params }) {
  // Can't mix!
}

// ✅ CORRECT - Server Component (no 'use client')
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  // Server logic here
  return <ClientComponent />;
}

// ✅ CORRECT - Client Component (with 'use client')
'use client';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  // Client logic here
}
```

### Error 3: Using hooks in Server Components

```typescript
// ❌ WRONG
export default async function Page({ params }) {
  const [state, setState] = useState(); // Error in server component
}

// ✅ CORRECT
export default async function Page({ params }) {
  // Server logic only
  return <ClientComponent />;
}

'use client';
export function ClientComponent() {
  const [state, setState] = useState(); // OK in client component
}
```

## Decision Tree

```
Do I need to fetch data from params?
├─ YES
│  ├─ Do I need client-side interactivity?
│  │  ├─ YES → Server Component (fetch data) + Client Component (UI)
│  │  └─ NO → Pure Server Component
│  └─ NO → Skip to next question
└─ NO
   ├─ Do I need client-side hooks/state?
   │  ├─ YES → 'use client' Component
   │  └─ NO → Regular component (can be either)
   └─ Done!
```

## File Structure for Complex Routes

```
app/
├── product/
│   └── [slug]/
│       ├── page.tsx              (Server Component - async)
│       ├── product-detail.tsx    (Client Component)
│       └── layout.tsx            (Server Component)
├── dashboard/
│   └── [id]/
│       ├── page.tsx              (Server Component)
│       ├── dashboard-content.tsx (Client Component)
│       └── sidebar.tsx           (Client Component)
└── api/
    └── products/
        └── [id]/
            └── route.ts          (API Handler)
```

## API Routes Handling

### GET with Dynamic Params

```typescript
// app/api/products/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const product = await db.product.findById(id);
    return Response.json(product);
  } catch (error) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
}
```

### POST with Search Params

```typescript
// app/api/search/route.ts
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  const results = await db.search(query);
  return Response.json(results);
}
```

## Streaming Data (Advanced)

```typescript
// app/products/page.tsx
import { Suspense } from 'react';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams;
  
  return (
    <div>
      <h1>Products in {category}</h1>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList category={category} />
      </Suspense>
    </div>
  );
}

async function ProductsList({ category }: { category?: string }) {
  const products = await db.product.findMany({
    where: { category },
  });
  
  return (
    // Rendered after data is available
  );
}
```

## Type Safety

### Strict Typing for Params

```typescript
// types/params.ts
export interface ProductParams {
  slug: string;
}

export interface DashboardParams {
  id: string;
}

// app/product/[slug]/page.tsx
import { ProductParams } from '@/types/params';

export default async function ProductPage({
  params,
}: {
  params: Promise<ProductParams>
}) {
  const { slug } = await params;
  // TypeScript knows slug is string
}
```

## Performance Tips

1. **Await params early** to avoid waterfall rendering
2. **Use Suspense** for expensive operations
3. **Cache data** where possible
4. **Preload data** for better UX
5. **Split components** - server for data, client for UI

## Debugging

### Check Console for Errors
- Promise-related errors in browser console
- Hydration mismatch errors
- Type errors in TypeScript

### Debug Params
```typescript
export default async function Page({ params }: { params: Promise<any> }) {
  const resolved = await params;
  console.log('Resolved params:', resolved); // Server-side log
  
  return <Component params={resolved} />;
}
```

### Use React DevTools
- Check component tree
- Verify client/server boundaries
- Debug state changes
