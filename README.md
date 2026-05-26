# Stacklet Landing

A single-page marketing landing for a fictional SaaS called Stacklet — a no-code internal tools builder.

## What is included

- Sticky nav with anchor links and CTA
- Hero section with primary and secondary actions
- Features grid with 6 product-aligned cards
- Pricing section with 3 tiers and highlighted Growth plan
- FAQ section based on ICP objections
- Waitlist form with email, role, optional company
- Supabase integration ready for insert-only waitlist storage

## Setup

1. Copy `.env.example` to `.env`
2. Add your Supabase project URL and anon key
3. Install dependencies: `npm install`
4. Run dev server: `npm run dev`

## Supabase table

Create a table named `waitlist` with:

- `id uuid primary key default uuid_generate_v4()`
- `email text not null unique`
- `role text not null`
- `company text`
- `created_at timestamptz default now()`

Enable RLS and grant anon user insert-only access.

## Notes

- Email is validated client-side
- Form clears and shows confirmation on success
- Duplicate email returns a friendly message
- Button is disabled for 3 seconds after submit
