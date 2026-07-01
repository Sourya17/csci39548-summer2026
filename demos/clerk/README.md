# Clerk Demo — Auth in 30 Minutes

> **Framing:** this is a **bonus / optional** demo. It is NOT graded, NOT on
> the exit, and NOT required for the final project. The point is to show that
> the "2-week auth build" can be a 30-minute add-on if you accept a managed
> service.

What we add to the existing Prisma + Express + React + TanStack Query stack:

1. **Frontend sign-in / sign-up UI** — drop in Clerk's components.
2. **Backend JWT verification** — middleware reads the token, gives you `userId`.
3. **Per-user data scoping** — every Prisma query is filtered by `userId`.

Two snapshots, ~30 min to walk both.

---

## Layout

```
demos/clerk/
├── src/                          ← frontend (Vite + React + Tailwind + TanStack Query + Clerk)
├── server/                       ← backend (Express + Prisma + Clerk verify)
├── snapshots/
│   ├── snapshot-01-frontend-auth/   ← Clerk UI in React, backend STILL OPEN
│   └── snapshot-02-backend-protect/ ← Backend verifies JWT, todos per-user
├── SLIDES_SOURCE.md
└── TEACHING_NOTES.md
```

The live `src/` and `server/` directories mirror **snapshot-02** (the final
state). Run from there. Snapshots are clone-and-compare references.

---

## Stack additions over the Prisma demo

| Layer | Package | What it does |
|---|---|---|
| Frontend | `@clerk/clerk-react` | `<ClerkProvider>`, `<SignIn>`, `<SignUp>`, `<UserButton>`, `<SignedIn>`/`<SignedOut>`, `useAuth()` |
| Backend | `@clerk/express` | `clerkMiddleware()` parses the JWT and populates `req.auth` |
| DB | none — same Prisma | one new column: `Todo.userId String` |

---

## Setup (you need this to run locally)

### 1. Clerk account & app

1. Sign up at [clerk.com](https://clerk.com) (free dev tier).
2. Create a new app → choose Email + Google.
3. From the **API Keys** page grab:
   - `Publishable key` → goes in **frontend** `.env` as `VITE_CLERK_PUBLISHABLE_KEY`
   - `Secret key` → goes in **backend** `.env` as `CLERK_SECRET_KEY`

### 2. Environment variables

```bash
# frontend (.env)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000

# server/.env
DATABASE_URL=postgresql://...        # any Postgres — Neon, local, whatever
CLERK_SECRET_KEY=sk_test_...
FRONTEND_ORIGIN=http://localhost:5173
PORT=3000
```

### 3. Install + run

```bash
# Backend
cd server
npm install
npx prisma migrate dev          # creates the Todo table with userId
npm run dev                     # http://localhost:3000

# Frontend (new terminal)
cd ..
npm install
npm run dev                     # http://localhost:5173
```

---

## Snapshot 01 — Frontend auth

Three things change in the React app:

1. Wrap root in `<ClerkProvider publishableKey={...}>`
2. Gate the app with `<SignedIn>` / `<SignedOut>` and add `<SignIn />`/`<SignUp />`
3. Drop `<UserButton />` in the nav

**Backend is unchanged.** The point: signing in proves "who you are" to Clerk,
but the API doesn't know or care yet. Anyone can still hit `/api/todos`.

## Snapshot 02 — Backend protect

Four things change:

1. Backend: `clerkMiddleware()` parses incoming JWTs → `req.auth.userId`.
2. Backend: `requireAuth()` on the todos router → 401 if no token.
3. Backend: scope every Prisma query by `userId` (add `where: { userId }`).
4. Frontend: pull token with `useAuth().getToken()` → send as `Authorization: Bearer <token>`.

**Test:** open two browser windows, sign in as two different users, watch each
see only their own todos.

---

## Killer demo moments

| Snapshot | Moment | Why it lands |
|---|---|---|
| 01 | Live sign-up in 30 seconds, email arrives, you're in | Clerk's UX is the sell |
| 01 | Open `/api/todos` in a new tab WHILE signed out — it works | "Auth in the frontend is not real auth" |
| 02 | Same tab after backend protection — 401 | Now it's real |
| 02 | Two browser windows, two users, isolated todo lists | Per-user scoping clicks |

---

## Reset between live runs

```bash
# Reset the DB
cd server && npx prisma migrate reset --force

# Clerk: sign all users out from the Clerk dashboard if needed
```

---

## What we did NOT cover

| Skipped | Why |
|---|---|
| Roles / orgs / permissions | Clerk has it; out of scope tonight |
| Server-side sessions, cookies | Clerk uses JWTs out of the box |
| Email/password validation rules | Clerk handles it |
| Production auth providers (Auth0, Supabase, NextAuth) | Same shape; Clerk picked for tutorial speed |
| Building auth from scratch | The whole point — you don't have to |

> The path is shown. For final-project teams that want auth, this is the
> 30-minute version. For everyone else, it's a tour.
