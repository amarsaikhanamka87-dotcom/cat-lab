# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

"Cat lab": a small Next.js 16 (App Router, Turbopack, React 19, Tailwind v4) teaching app for training a cat / not-cat image classifier. Users go through a step flow: **Upload → Label → Train → Test**. Photos are stored in Supabase Storage, and their metadata lives in Supabase Postgres via Prisma 7.

Next.js 16 differs from older versions. Check `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md).

## Commands

```bash
npm run dev            # runs `prisma generate` first (predev), then next dev on :3000
npm run build          # runs `prisma generate` first (prebuild)
npm run lint           # eslint (next core-web-vitals + typescript)
npx tsc --noEmit       # type-check
npm run prisma:generate
npx prisma migrate dev --config prisma7.config.ts     # new migration
npx prisma migrate deploy --config prisma7.config.ts  # apply migrations
```

There is no test suite. Every Prisma CLI call needs `--config prisma7.config.ts`, because the config file isn't at the default name.

## Environment (`.env`, gitignored)

- `DATABASE_URL`: pooled Postgres URL, used at runtime by `PrismaPg` in `app/_lib/prisma.ts`.
- `DIRECT_URL`: direct Postgres URL, used by the Prisma CLI / migrations (`prisma7.config.ts`).
- `NEXT_PUBLIC_SUPABASE_URL`: `https://<ref>.supabase.co`.
- `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`: server-only key used for Storage. Falls back to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `SUPABASE_BUCKET`: storage bucket, default `photos`.

## Architecture

- **Pages**: `app/(components)/{upload,label,train,test}/page.tsx` are client components. They are served at `/upload`, `/label`, etc., because the route group adds nothing to the URL. `app/page.tsx` renders the Upload page directly. Every step page wraps itself in `StepShell` (`app/_components/step-shell.tsx`), which provides the shared card, header, 4-step progress bar, and the `primaryBtn`/`secondaryBtn` class strings.
- **Styling**: the color tokens are CSS variables in `app/globals.css` (`--primary`, `--surface-*`, `--text`, `--muted`, `--info-bg`), with dark-mode overrides via `prefers-color-scheme`. Use `bg-[var(--token)]` instead of hardcoded colors so dark mode keeps working.
- **API**: `app/api/photos/route.ts` is the only real endpoint. `app/api/training/route.ts` is a stub.
  - `GET`: lists photos (newest first).
  - `POST`: takes `multipart/form-data` with a `file` field. It uploads the file to Supabase Storage at `uploads/<ts>-<uuid>-<name>` and saves the **public URL** in `Photo.storagePath`. If the DB insert fails, it deletes the uploaded file.
  - `PATCH`: takes `{ id, label: "CAT" | "NOT_CAT" | null }` and sets the label.
  - All three responses add an `imageUrl` field: a 1-hour **signed URL** made by `withImageUrls()` in `app/_lib/supabase.ts`. The bucket is private, so the UI must render `imageUrl`, not `storagePath`. `objectPathFromUrl()` turns the stored public URL back into an object path.
- **Data**: `prisma/schema.prisma` has one `Photo` model (`storagePath` unique, optional `label` enum `CAT|NOT_CAT`, `ground` enum `training|testing`; note the timestamp column is spelled `creativeAt`). The Prisma client is generated into `app/generated/prisma` (gitignored) and imported from `app/generated/prisma/client`. Use the singleton `prisma` from `app/_lib/prisma.ts`.
- The Supabase admin client (`getSupabaseAdmin`) and `ensureBucket` are server-only. Never import them into client components.
