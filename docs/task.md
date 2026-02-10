# ConnectHub - Implementation Tasks (Supabase Hybrid)

> Master checklist for ConnectHub dating app using Supabase + FastAPI + Next.js

---

## Milestone 1: Foundation & Auth

### 1.1 Supabase Project Setup
- [ ] Create Supabase project
- [ ] Enable PostGIS extension
- [ ] Configure Google OAuth provider
- [ ] Configure Apple OAuth provider
- [ ] Set up storage bucket for photos
- [ ] Configure RLS policies

### 1.2 Database Schema
- [ ] Create `profiles` table (extends auth.users)
- [ ] Create `photos` table
- [ ] Create `swipes` table
- [ ] Create `matches` table
- [ ] Create `messages` table
- [ ] Add GIST index for location column
- [ ] Add indexes for swipes/messages

### 1.3 Backend Setup (FastAPI)
- [x] Update `pyproject.toml` with Supabase dependencies
- [x] Create `app/core/config.py` (settings)
- [x] Create `app/core/supabase.py` (client init)
- [x] Create `app/core/dependencies.py` (auth middleware)
- [x] Create `docker-compose.yml` (Redis for ARQ)
- [x] Update `main.py` with FastAPI app

### 1.4 Frontend Supabase Integration
- [x] Install `@supabase/supabase-js` and `@supabase/ssr`
- [x] Create `src/lib/supabase/client.ts`
- [x] Create `src/lib/supabase/server.ts`
- [x] Create `src/middleware.ts` (auth middleware)
- [x] Create `src/hooks/useAuth.ts`
- [x] Add environment variables

### 1.5 Auth Pages (Frontend)
- [x] Create `src/app/(auth)/login/page.tsx` (existing, updated)
- [ ] Create `src/app/(auth)/register/page.tsx`
- [x] Create `src/app/(auth)/callback/route.ts`
- [x] Create `src/components/features/auth/OAuthButtons.tsx` (via SocialButton)
- [ ] Create `src/components/features/auth/LoginForm.tsx`


---

## Milestone 2: Profile & Photo Management

### 2.1 Profile API (FastAPI)
- [ ] Create `app/api/v1/profiles/schemas.py`
- [ ] Create `app/api/v1/profiles/service.py`
- [ ] Create `app/api/v1/profiles/router.py`
- [ ] Implement `GET /api/v1/profiles/me`
- [ ] Implement `PATCH /api/v1/profiles/me`
- [ ] Implement `PUT /api/v1/profiles/me/location`

### 2.2 Photo Management
- [ ] Configure Supabase Storage bucket RLS
- [ ] Create `src/components/features/profile/PhotoUpload.tsx`
- [ ] Create `src/components/features/profile/PhotoGrid.tsx`
- [ ] Implement photo reordering
- [ ] Create media validation worker (TODO: NSFW deferred)

### 2.3 Onboarding Flow (Frontend)
- [ ] Create `src/app/(onboarding)/layout.tsx`
- [ ] Create `src/app/(onboarding)/profile/page.tsx`
- [ ] Create `src/app/(onboarding)/photos/page.tsx`
- [ ] Create `src/app/(onboarding)/prompts/page.tsx`
- [ ] Create `src/app/(onboarding)/preferences/page.tsx`
- [ ] Create `src/components/features/profile/ProfileForm.tsx`
- [ ] Create `src/components/features/profile/PromptEditor.tsx`

### 2.4 Profile Hooks
- [ ] Create `src/hooks/useProfile.ts`
- [ ] Create `src/hooks/usePhotos.ts`
- [ ] Install TanStack Query

---

## Milestone 3: Geospatial Match Engine

### 3.1 Discovery Service (FastAPI)
- [ ] Create `app/api/v1/discovery/schemas.py`
- [ ] Create `app/api/v1/discovery/service.py`
- [ ] Create `app/api/v1/discovery/scoring.py`
- [ ] Create `app/api/v1/discovery/router.py`
- [ ] Implement `GET /api/v1/discovery/profiles`
- [ ] Implement PostGIS ST_DWithin queries
- [ ] Implement preference filtering
- [ ] Implement cursor-based pagination

### 3.2 Swipe & Match Logic
- [ ] Implement `POST /api/v1/discovery/swipe`
- [ ] Implement mutual swipe detection
- [ ] Create Match on mutual swipe
- [ ] Trigger notification on match

### 3.3 Discovery UI (Frontend)
- [ ] Create `src/hooks/useDiscovery.ts`
- [ ] Create `src/components/features/discovery/SwipeCard.tsx`
- [ ] Create `src/components/features/discovery/SwipeStack.tsx`
- [ ] Create `src/components/features/discovery/ActionButtons.tsx`
- [ ] Create `src/components/features/discovery/ProfileDetail.tsx`
- [ ] Create `src/components/features/discovery/MatchModal.tsx`
- [ ] Create `src/app/(dashboard)/discover/page.tsx`

### 3.4 ARQ Workers
- [ ] Create `app/workers/settings.py`
- [ ] Create `app/workers/main.py`
- [ ] Create `app/workers/tasks/matching.py`
- [ ] Create `app/workers/tasks/notifications.py`

---

## Milestone 4: Real-Time Chat

### 4.1 Chat API (FastAPI)
- [ ] Create `app/api/v1/chat/schemas.py`
- [ ] Create `app/api/v1/chat/service.py`
- [ ] Create `app/api/v1/chat/router.py`
- [ ] Implement `GET /api/v1/chat/rooms`
- [ ] Implement `GET /api/v1/chat/rooms/{id}/messages`
- [ ] Implement `POST /api/v1/chat/rooms/{id}/messages`

### 4.2 Real-time Subscriptions (Frontend)
- [ ] Create `src/hooks/useRealtimeMessages.ts`
- [ ] Create `src/hooks/usePresence.ts`
- [ ] Set up Supabase Realtime channels

### 4.3 Chat UI (Frontend)
- [ ] Create `src/components/features/chat/ConversationList.tsx`
- [ ] Create `src/components/features/chat/ConversationItem.tsx`
- [ ] Create `src/components/features/chat/ChatRoom.tsx`
- [ ] Create `src/components/features/chat/MessageBubble.tsx`
- [ ] Create `src/components/features/chat/MessageInput.tsx`
- [ ] Create `src/components/features/chat/TypingIndicator.tsx`
- [ ] Create `src/app/(dashboard)/matches/page.tsx`
- [ ] Create `src/app/(dashboard)/chat/[matchId]/page.tsx`

---

## Milestone 5: Security & Compliance

### 5.1 Row Level Security
- [ ] RLS policy: Users can update own profile
- [ ] RLS policy: Users can view discoverable profiles
- [ ] RLS policy: Users can read own messages
- [ ] RLS policy: Users can access own photos

### 5.2 Audit & Privacy (FastAPI)
- [ ] Create `audit_logs` table
- [ ] Create `app/core/audit.py`
- [ ] Implement audit middleware
- [ ] Implement `GET /api/v1/privacy/export`
- [ ] Implement `DELETE /api/v1/privacy/account`

### 5.3 Settings UI (Frontend)
- [ ] Create `src/components/features/settings/AccountSettings.tsx`
- [ ] Create `src/components/features/settings/PrivacySettings.tsx`
- [ ] Create `src/app/(dashboard)/settings/page.tsx`

---

## Testing & Polish

### Backend Tests
- [ ] Discovery service tests
- [ ] Match detection tests
- [ ] PostGIS query tests

### Frontend Tests
- [ ] Component tests (Vitest)
- [ ] E2E tests (Playwright)

### Performance
- [ ] PostGIS query optimization (EXPLAIN ANALYZE)
- [ ] Image optimization (next/image)
- [ ] Bundle size audit

---

## Future Enhancements
- [ ] Push notifications (FCM/APNs)
- [ ] AI-based NSFW content scanning
- [ ] Premium subscription (Stripe)
- [ ] Report/Block functionality
- [ ] Super Likes
- [ ] Video chat
