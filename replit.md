# StanlleyHub Education Platform

## Overview

A comprehensive education platform for StanlleyHub — a practical software engineering bootcamp based in Kenya. The platform covers public marketing site, student portal, and admin dashboard.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + framer-motion
- **Routing**: wouter
- **State management**: zustand (auth state)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Architecture

### Frontend (`artifacts/stanlleyhub/`)
- **Public pages**: Home (`/`), Courses (`/courses`), Course Detail (`/courses/:id`), Register (`/register`), Login (`/login`)
- **Student portal**: Dashboard, My Courses, Profile, Certificate — all under `/student/*`
- **Admin panel**: Dashboard, Students, Courses, Registrations, Settings — all under `/admin/*`
- Auth stored in `localStorage` keys: `stanlleyhub_token`, `stanlleyhub_role`
- Protected routes: student routes require `role=student`, admin routes require `role=admin`

### Backend (`artifacts/api-server/`)
- Auth routes: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- Student routes: `/api/students`, `/api/students/:id`, `/api/students/me/profile`, `/api/students/me/progress`
- Course routes: `/api/courses`, `/api/courses/:id`
- Registration routes: `/api/registrations`, `/api/registrations/:id`
- Admin routes: `/api/admin/stats`, `/api/admin/recent-activity`, `/api/admin/revenue`
- In-memory token store (ready for Redis/JWT migration)

### Database (`lib/db/`)
- `users` — students and admins
- `courses` — bootcamp courses with tech stack, outcomes
- `course_modules` — individual course modules/weeks
- `registrations` — student course enrollments with payment tracking

## Default Credentials (seed data)

- **Admin**: `stanlleylocke@gmail.com` / `admin123`
- **Student**: `john.kamau@example.com` / `student123`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Migration to Supabase

When ready to migrate from local PostgreSQL to Supabase:
1. Export schema via `drizzle-kit generate` 
2. Update `DATABASE_URL` secret to Supabase connection string
3. Run `pnpm --filter @workspace/db run push` to apply schema
4. Migrate auth from in-memory token store to Supabase Auth or JWT
5. The OpenAPI spec and frontend hooks stay unchanged

## Course Info

- **Flagship**: 3-Month Software Engineering Bootcamp (May-July 2025)
- **Commitment Fee**: 800 Ksh
- **WhatsApp**: https://wa.me/254752032884
- **Email**: stanlleylocke@gmail.com
- **Instructor**: Stanlley Locke
