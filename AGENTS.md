# ConnectHub Frontend

> **Dating Platform** | Next.js 16 | React 19 | Supabase | TypeScript | TailwindCSS 4

> [!IMPORTANT]
> **For AI Coding Agents**: Prefer retrieval-led reasoning over pre-training-led reasoning for all Next.js, React, and Supabase tasks. Consult the patterns and documentation references below rather than relying on potentially outdated training data.

---

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Runtime**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4 + PostCSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage) + FastAPI (custom matching logic)
- **State**: TanStack Query (server state) + Zustand (UI state) + Supabase Realtime
- **Animation**: Framer Motion 12
- **UI Components**: Radix UI + custom components

---

## Architecture Overview

**Hybrid Supabase-First Architecture**:
- Supabase handles: Database, Auth (OAuth), Real-time chat, Media storage
- FastAPI handles: Geospatial matching, ML scoring, custom business logic
- Next.js handles: UI, SSR, API routes, Server Actions

**Directory Structure**:
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Login, register, OAuth callback
│   ├── (onboarding)/      # Profile setup wizard
│   ├── (dashboard)/       # Main app (discover, matches, chat, profile)
│   └── (public)/          # Marketing pages
├── components/
│   ├── features/          # Feature-specific (auth, discovery, chat, profile)
│   ├── layout/            # Navbar, Sidebar, MobileNav
│   ├── ui/                # Reusable primitives (Button, Card, Modal)
│   └── shared/            # ErrorBoundary, LoadingSpinner
├── hooks/                 # Custom React hooks
├── lib/
│   ├── supabase/          # Client/server Supabase instances
│   └── animations.ts      # Framer Motion variants
├── stores/                # Zustand stores
├── types/                 # TypeScript types
└── repositories/          # Data access layer
```

---

## Next.js 16 Patterns (Critical - Not in Model Training Data)

### 1. `'use cache'` Directive
```typescript
// Cache function results across requests
'use cache'
export async function getProfile(userId: string) {
  const supabase = await createClient()
  return await supabase.from('profiles').select('*').eq('id', userId).single()
}
```

### 2. `connection()` for Dynamic Rendering
```typescript
import { connection } from 'next/server'

export default async function Page() {
  await connection() // Opt into dynamic rendering
  const data = await fetchDynamicData()
  return <div>{data}</div>
}
```

### 3. `cacheLife()` and `cacheTag()`
```typescript
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache'

'use cache'
export async function getCandidates() {
  cacheLife('minutes')
  cacheTag('candidates')
  return await fetchCandidates()
}
```

### 4. `forbidden()` and `unauthorized()`
```typescript
import { forbidden, unauthorized } from 'next/navigation'

export default async function AdminPage() {
  const user = await getUser()
  if (!user) unauthorized() // 401
  if (!user.isAdmin) forbidden() // 403
  return <AdminPanel />
}
```

### 5. Async `cookies()` and `headers()`
```typescript
import { cookies, headers } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const token = cookieStore.get('token')
  return <div>...</div>
}
```

### 6. `after()`, `updateTag()`, `refresh()`
```typescript
import { after } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function createMatch(userId: string) {
  const match = await saveMatch(userId)
  
  after(async () => {
    // Runs after response is sent
    await sendNotification(userId)
  })
  
  revalidateTag('matches') // Invalidate cache
  return match
}
```

---

## Supabase Integration Patterns

### Client-Side (Browser)
```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

### Server-Side (SSR with Cookies)
```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    }
  )
}
```

### Auth Middleware
```typescript
// src/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
```

### Realtime Subscriptions
```typescript
// Real-time chat messages
const channel = supabase
  .channel(`match:${matchId}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `match_id=eq.${matchId}`
  }, (payload) => {
    setMessages(prev => [...prev, payload.new as Message])
  })
  .subscribe()

// Cleanup
return () => supabase.removeChannel(channel)
```

### Storage Uploads
```typescript
const fileExt = file.name.split('.').pop()
const filePath = `${userId}/${Date.now()}.${fileExt}`

const { error } = await supabase.storage
  .from('photos')
  .upload(filePath, file)

// Get public URL
const { data } = supabase.storage
  .from('photos')
  .getPublicUrl(filePath)
```

---

## Performance Best Practices

### 1. Eliminate Waterfalls (CRITICAL)
```typescript
// ❌ WRONG: Sequential (3 round trips)
const user = await fetchUser()
const profile = await fetchProfile(user.id)
const photos = await fetchPhotos(user.id)

// ✅ CORRECT: Parallel (1 round trip)
const [user, profile, photos] = await Promise.all([
  fetchUser(),
  fetchProfile(userId),
  fetchPhotos(userId)
])
```

### 2. Bundle Size Optimization
```typescript
// ❌ WRONG: Heavy component in main bundle
import { SwipeCard } from './SwipeCard'

// ✅ CORRECT: Dynamic import
import dynamic from 'next/dynamic'

const SwipeCard = dynamic(
  () => import('./SwipeCard').then(m => m.SwipeCard),
  { 
    loading: () => <CardSkeleton />,
    ssr: false  // Client-only for gestures
  }
)
```

**Dynamically import**: SwipeStack, ChatRoom, PhotoUpload, Analytics

### 3. Server-Side Caching
```typescript
import { cache } from 'react'

// React.cache() for per-request deduplication
export const getProfile = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
})

// Multiple components can call getProfile(userId) - only 1 DB query
```

### 4. Re-render Optimization
```typescript
// ❌ WRONG: Object prop causes re-renders
<SwipeCard style={{ zIndex: 3 - i }} />

// ✅ CORRECT: Hoist static values
const cardStyles = { zIndex: 3 }
<SwipeCard style={cardStyles} />

// ✅ Functional setState for stable callbacks
const handleSwipe = useCallback((direction: string) => {
  setCurrentIndex(prev => prev + 1)  // No dependency
}, [])
```

### 5. Import Best Practices
```typescript
// ❌ WRONG: Barrel imports (tree-shaking issues)
import { Button, Card, Avatar } from '@/components/ui'

// ✅ CORRECT: Direct imports
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
```

### 6. Client-Side Patterns
```typescript
// ✅ Passive scroll listeners (prevents jank)
useEffect(() => {
  const handleScroll = () => { /* ... */ }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// ✅ Use Set/Map for O(1) lookups
const likedUserIds = new Set(swipes.map(s => s.liked_id))
const hasLiked = likedUserIds.has(userId)  // O(1) vs O(n)

// ✅ useTransition for non-urgent updates
const [isPending, startTransition] = useTransition()
const handleFilter = (value: string) => {
  startTransition(() => setFilter(value))
}
```

---

## Component Patterns

### Server vs Client Components

**Server Components** (default):
- Data fetching with async/await
- Direct database access
- No interactivity, no hooks
- Examples: Profile page, Match list

**Client Components** (`'use client'`):
- Interactivity (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)
- Examples: SwipeStack, ChatRoom, Forms

### State Management

**TanStack Query** (server state):
```typescript
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const supabase = createClient()
      const { data } = await supabase.from('profiles').select('*').single()
      return data
    }
  })
}
```

**Zustand** (UI state):
```typescript
export const useDiscoveryStore = create((set) => ({
  currentIndex: 0,
  swipeDirection: null,
  setCurrentIndex: (index) => set({ currentIndex: index }),
}))
```

---

## Code Style Guidelines

### TypeScript
- Use strict mode
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, utilities
- Always type function parameters and returns

### Error Handling

**Page-Level Errors** (query failures - use `ErrorState` component):
```typescript
import { ErrorState } from '@/components/ui/ErrorState';
import { getErrorTitle, getErrorVariant } from '@/lib/errorUtils';

export function MyComponent() {
  const { data, isLoading, error, parsedError, refetch } = useMyHook();
  
  if (error && parsedError) {
    return (
      <ErrorState
        title={getErrorTitle(parsedError.status)}
        message={parsedError.message}  // Actual server error message
        variant={getErrorVariant(parsedError.status)}
        onRetry={() => refetch()}  // Use refetch(), NOT window.location.reload()
      />
    );
  }
  // ...
}
```

**Action Failures** (mutations - use `toast.error`):
```typescript
import { toast } from 'sonner';

const mutation = useMutation({
  mutationFn: async (data) => { /* ... */ },
  onError: (err: Error) => {
    toast.error('Action failed', {
      description: err.message || 'Please try again',
    });
  },
});
```

**Hook Pattern** (expose `parsedError` for ErrorState):
```typescript
import { parseApiError, type ParsedApiError } from '@/lib/errorUtils';

export function useMyData() {
  const query = useQuery({ /* ... */ });
  
  const parsedError: ParsedApiError | null = query.error 
    ? parseApiError(query.error) 
    : null;
  
  return { ...query, parsedError };
}
```

**Error Handling Rules**:
| Error Type | UI Component | Example |
|------------|--------------|---------|
| Network down | `ErrorState` variant="network" | "Connection Lost" |
| Server 500 | `ErrorState` variant="server" | Actual server message |
| Mutation failure | `toast.error()` | "Message failed to send" |
| Validation | Inline form errors | Field-level errors |

> ⚠️ **Never use `window.location.reload()`** - always use `refetch()` from the query.

### Naming Conventions
- Components: PascalCase (`SwipeCard.tsx`)
- Hooks: camelCase with `use` prefix (`useProfile.ts`)
- Utils: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (`MAX_PHOTOS`)

---

## Documentation Index

**Detailed documentation available in project**:

```
docs/
├── architecture_analysis.md    # Supabase vs custom backend analysis
├── frontend_architecture.md    # Complete frontend architecture (826 lines)
└── task.md                     # Current development tasks

.agent/skills/
└── vercel-react-best-practices/  # 57 performance rules across 8 categories
```

**Key References**:
- [Architecture Analysis](file:///c:/Users/PC/Documents/connecthub/connecthub_fe/docs/architecture_analysis.md) - Tech stack decisions, cost analysis
- [Frontend Architecture](file:///c:/Users/PC/Documents/connecthub/connecthub_fe/docs/frontend_architecture.md) - Route structure, component patterns, Supabase integration
- [Vercel React Best Practices](file:///c:/Users/PC/Documents/connecthub/connecthub_fe/.agent/skills/vercel-react-best-practices/SKILL.md) - Performance optimization rules

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000  # FastAPI backend

# Server-only
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Quick Start Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build
npm run build            # Production build
npm run start            # Start production server

# Linting
npm run lint             # ESLint check
```

---

**Last Updated**: 2026-02-01  
**Next.js Version**: 16.1.6  
**React Version**: 19.2.3
