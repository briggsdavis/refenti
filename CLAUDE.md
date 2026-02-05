# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**

- `bun dev` - Start Vite dev server (http://localhost:5173)
- `bun build` - Build production bundle
- `bun preview` - Preview production build locally

## Architecture

**Tech Stack:**

- React 19 + TypeScript + React Router v7
- Vite for build tooling
- Tailwind CSS 4 (via @tailwindcss/vite plugin)
- Supabase for backend (PostgreSQL + Auth + Storage)

**Project Structure:**

- `src/pages/` - Route components (Home, About, Investment, Projects, Contact, EventsNews, Admin\*)
- `src/components/` - Reusable components (Navbar, ProtectedRoute, FadeIn, LazyImage, FileUpload)
- `src/contexts/` - React contexts (AuthContext provides session management)
- `src/lib/` - Core utilities:
  - `supabase.ts` - Supabase client singleton
  - `api.ts` - CRUD operations for projects, events, news, inquiries (uses snake_case for DB, camelCase for app)
  - `storage.ts` - File upload/delete for Supabase Storage
- `src/types.ts` - TypeScript interfaces
- `supabase/migrations/` - Database schema migrations

**Authentication:**

- Admin routes (`/admin/*`) require authentication via ProtectedRoute wrapper
- AuthContext provides `session`, `signIn`, `signOut`
- Auth session managed via Supabase Auth

**Data Flow:**

- All database operations go through `src/lib/api.ts` which returns `DataResult<T>` type
- API functions map between DB snake_case and app camelCase conventions
- Projects, events, news support full CRUD; inquiries support create/read/delete only

**Database Tables:**

- `projects` - Real estate projects (asset_class CHECK constraint, JSONB for features/sections)
- `events` - Company events
- `news` - News articles
- `inquiries` - Contact form submissions
- RLS enabled: public read for content tables, authenticated write; inquiries allow public insert

**Storage:**

- Supabase Storage buckets: `project-images`, `event-images`, `news-images`
- Storage policies in `supabase/migrations/20260131210027_storage_policies.sql`
- Deletion functions in `storage.ts` clean up related images when deleting records

**Styling:**

- Custom Tailwind theme colors: `refenti-gold`, `refenti-charcoal`, `refenti-offwhite`
- Prettier configured with organize-imports and tailwindcss plugins
- No semicolons (prettier config)

**Environment Variables Required:**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Local Supabase Development

Supabase local development runs on:

- API: http://127.0.0.1:54321
- DB: postgresql://postgres:postgres@127.0.0.1:54322/postgres
- Studio: http://127.0.0.1:54323

To create a migration: `supabase migration new <name>`
