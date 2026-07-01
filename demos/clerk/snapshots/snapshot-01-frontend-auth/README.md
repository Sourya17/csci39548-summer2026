# Snapshot 01 — Frontend auth

**What's new:** Clerk components on the React side. Sign-up / sign-in works.

**What's deliberately NOT new:** the backend. `/api/todos` is wide open.
Anyone with the URL can hit it.

This snapshot makes the point that **frontend auth is UX**, not security.
The lock is in snapshot 02.

## Files that changed vs the Prisma demo

| File | Change |
|---|---|
| `package.json` | + `@clerk/clerk-react` |
| `.env.example` | + `VITE_CLERK_PUBLISHABLE_KEY` |
| `src/main.tsx` | Wrap root in `<ClerkProvider>` |
| `src/App.tsx` | `<SignedIn>` / `<SignedOut>` / `<SignIn>` / `<SignUp>` / `<UserButton>` |
| `src/lib/api.ts` | Plain `fetch` — no token sent |

## Backend

Unchanged from the Prisma demo. Open CRUD. No `userId` column. The Todo
model has no owner.

## Live demo moments

1. Sign up → email arrives → user lands in app — all without writing any auth code.
2. Hit `http://localhost:3000/api/todos` directly in a new tab while signed in. Works.
3. Sign out. Hit it again. **Still works.** (This is the cliffhanger.)
4. Open `<UserButton />`. Show that Clerk's dashboard manages the user.

> Next: snapshot 02 closes the open backend.
