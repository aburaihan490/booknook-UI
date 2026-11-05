<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## What this repo is

- Single Next.js 16.4.3 App Router app in this directory — not a monorepo. `pnpm-workspace.yaml` exists only for pnpm build approvals (`sharp`, `unrs-resolver` disabled), not for packages.
- The backend is the sibling `../server` (Express, port 5000, `pnpm dev` = nodemon). Almost all book/borrow data flows through it — this app only talks to MongoDB directly for Better Auth (users/sessions).
- Path alias: `@/*` → `./src/*`.

## Commands

- `pnpm dev` (Turbopack), `pnpm build`, `pnpm lint` (ESLint 10 flat config).
- There is **no test or typecheck script**. For types run `npx tsc --noEmit`; there is no test suite to run — don't go looking for one.
- Verify changes with `pnpm lint && npx tsc --noEmit`, then `pnpm build` if it matters.

## Environment

- The app reads `.env` in this directory (gitignored — a fresh clone has none). Required names **as the code uses them**:
  - `MONGODB_URL` (README says `MONGODB_URI` — README is wrong)
  - `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (e.g. `http://localhost:3000`)
  - `NEXT_PUBLIC_BACKEND_BASE_URL` (e.g. `http://localhost:5000`) — missing from the README entirely
- Features fail at runtime, not build time, if these are missing: with `../server` down or the URL unset, book/borrow fetches throw (the `src/query/*` helpers call `notFound()` on non-ok responses, so pages render as 404).

## Architecture quirks

- **`src/proxy.ts` is the request guard** — Next 16 renamed middleware to proxy (`export function proxy()` + `config.matcher`). It protects `/add-book`, `/my-books`, `/my-borrows`, `/profile`. Do not create a `middleware.ts`.
- **Data access lives in `src/query/*.ts`**: each file is `'use server'` and exports server actions that `fetch` from `NEXT_PUBLIC_BACKEND_BASE_URL`. Mutations (add/edit/delete/borrow) are `fetch` calls inside client components (`src/components/*`), not server actions.
- **Auth**: Better Auth + MongoDB adapter configured in `src/lib/auth.ts`, client side in `src/lib/auth-client.ts` (JWT plugin both sides), mounted at `src/app/api/auth/[...all]/route.ts`.
- **Route groups**: `(auth)` = login/register, `(main)` = everything else.
- **Tailwind v4 has no config file** — it's wired as a Turbopack loader rule in `next.config.ts`. UI components are HeroUI v3 (`@heroui/react`), which needs the client provider in `src/app/layout.tsx`.
