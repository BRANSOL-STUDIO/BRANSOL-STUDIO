# BRANSOL — Strategic Design Studio Platform

Next.js 14 (App Router) + Supabase + Tailwind CSS + Framer Motion.

## Setup

1. **Install dependencies** (use pnpm if you prefer):
   ```bash
   npm install
   # or: pnpm install
   ```

2. **Environment variables**  
   Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only)
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://bransol.co.za`)

3. **Supabase**  
   Run the schema (organisations, profiles, projects, deliverables, invoices, quotes, etc.) in your Supabase SQL editor. Create storage buckets `deliverables` and `client-files` (private, 200MB max). Configure RLS and, if needed, an Edge Function to set `role` in the JWT on signup.

4. **Run**
   ```bash
   npm run dev
   ```

## Structure

- **`app/(site)/`** — Public marketing site: `/`, `/work`, `/expertise`, `/platform`, `/studio`, `/perspectives`, `/begin`
- **`app/(platform)/`** — Client platform (protected): `/dashboard`, `/projects`, `/deliverables`, `/files`, `/invoices`, `/subscription`
- **`app/admin/`** — Admin panel (protected): `/admin/overview`, `/admin/clients`, `/admin/projects`, `/admin/billing`, etc.
- **`app/auth/`** — Login and OAuth callback
- **`app/api/`** — PDF generation: `/api/invoices/[id]/pdf`, `/api/quotes/[id]/pdf`
- **`components/site/`** — Nav, Footer, HeroCanvas, WorkCard, CommissionForm
- **`components/platform/`** — Sidebar, Topbar, ProjectCard, DeliverableCard, BillingDocRow, etc.
- **`lib/`** — Supabase client/server/middleware, types, utils
- **Server Actions** in `app/actions/` — e.g. `submitCommission`, `approveDeliverable`, `requestChangesDeliverable`

## Commission intake

The Begin form writes to `organisations` (name, contact_name, email, status: `pending`). To store commission scope, add an `intake_scope` or `notes` column to `organisations` and update `app/actions/index.ts`.

## PDF design

Invoice and quote PDFs are minimal placeholders. To match `bransol-invoice.html` / `bransol-quotation.html`, replace the layout in `app/api/invoices/[id]/pdf/route.tsx` and `app/api/quotes/[id]/pdf/route.tsx` with your design (e.g. using @react-pdf/renderer components and styles).

## Brand

CSS tokens and keyframes live in `styles/globals.css` (from the BRANSOL brand identity). Use `var(--iris)`, `var(--chrome)`, etc.; avoid Tailwind colour classes.
