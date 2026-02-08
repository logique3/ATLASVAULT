# Deployment and Hydration Fixes

## Issues Fixed

### 1. pnpm Installation Error (ENOTDIR: 236)
**Problem:** 
- `pnpm install` was failing with "ENOTDIR: not a directory, mkdir '/vercel/path0/node_modules'"
- Caused by corrupted or conflicting `pnpm-lock.yaml` file

**Solution Applied:**
- Deleted the corrupted `pnpm-lock.yaml` file
- On next deployment, pnpm will regenerate a fresh lockfile
- This ensures all dependencies are resolved correctly

### 2. Hydration Mismatch (Products Page)
**Problem:**
- Products were rendering in different orders on server vs client
- Example: Server renders "Netflix Premium" but client renders "Apple TV+"
- Caused by unstable sort operations when items had equal sort keys

**Root Cause:**
- `sort()` function was unstable when comparing equal values
- Without tiebreakers, the order of equal items is not guaranteed across server/client

**Solution Applied:**
```typescript
// BEFORE: Unstable sort
return filtered.slice().sort((a, b) => b.price - a.price)

// AFTER: Stable sort with tiebreaker
return filtered.slice().sort((a, b) => {
  b.price - a.price || a.id.localeCompare(b.id)
})
```

Added `a.id.localeCompare(b.id)` as a tiebreaker to ensure consistent ordering when items have the same sort value (e.g., same price, rating, or review count).

## Changes Made

### `/vercel/share/v0-project/app/products/page.tsx`
1. Removed problematic `searchParams` sync in useEffect
2. Updated `filteredAndSortedProducts` useMemo with stable sorting:
   - Price sort: `a.price - b.price || a.id.localeCompare(b.id)`
   - Rating sort: `b.rating - a.rating || a.id.localeCompare(b.id)`
   - Reviews sort: `b.reviews_count - a.reviews_count || a.id.localeCompare(b.id)`
   - Newest sort: Uses index comparison with tiebreaker
   - All sorts use ID as final tiebreaker for consistency

### `/vercel/share/v0-project/pnpm-lock.yaml`
- Deleted corrupted lockfile to force regeneration

## Testing After Deployment

1. **Products Page:** All products should load in consistent order across page reloads
2. **Sorting:** Try each sort option - order should be stable
3. **Category Changes:** Switch between categories smoothly without hydration errors
4. **Build:** Should complete without "ENOTDIR" or dependency errors

## Prevention for Future Deployments

1. **Always use tiebreakers in sort operations:**
   ```typescript
   array.sort((a, b) => {
     const primarySort = b.value - a.value
     return primarySort !== 0 ? primarySort : a.id.localeCompare(b.id)
   })
   ```

2. **Avoid mutations of original arrays:**
   ```typescript
   // Use slice() before sort/reverse
   return array.slice().sort(...)
   ```

3. **Keep pnpm-lock.yaml in version control** but if it becomes corrupted:
   - Delete it locally
   - Run `pnpm install` to regenerate
   - Commit the new lock file

## Vercel Deployment Checklist

- [ ] pnpm-lock.yaml is properly generated
- [ ] Node version matches Vercel environment (check package.json)
- [ ] No circular dependencies in imports
- [ ] Hydration-sensitive components use stable data
- [ ] All async/await properly handled for server components
- [ ] Build completes without warnings about missing exports
