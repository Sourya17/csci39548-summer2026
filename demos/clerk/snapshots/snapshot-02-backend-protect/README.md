# Snapshot 02 — Backend protect (the lock)

**What's new:** the backend now verifies the Clerk JWT, refuses anonymous
requests, and scopes every Prisma query by `userId`.

The frontend changes by ~5 lines: pull a token from Clerk and add it to every
fetch as `Authorization: Bearer <jwt>`.

## Files that changed vs snapshot 01

| File | Change |
|---|---|
| `server/package.json` | + `@clerk/express` |
| `server/.env.example` | + `CLERK_SECRET_KEY` |
| `server/prisma/schema.prisma` | + `userId String` + `@@index([userId])` |
| `server/src/server.ts` | + `app.use(clerkMiddleware())` |
| `server/src/routes/todos.ts` | + `router.use(requireAuth())` and `where: { userId }` on every query |
| `src/lib/api.ts` | becomes a hook `useApi()` that pulls `getToken()` from `useAuth()` and sends `Authorization: Bearer ...` |
| `src/components/TodoList.tsx` | calls `useApi()` instead of importing module-level functions |
| `src/types.ts` | + `userId: string` on `Todo` |

> Roughly 8 file edits, ~40 added lines. That's all auth costs you.

## The 4 conceptual additions

1. **`clerkMiddleware()`** — parses any `Authorization: Bearer <jwt>` header,
   verifies the signature using `CLERK_SECRET_KEY`, and attaches `req.auth`.
   It does NOT block unauthenticated requests on its own — that's `requireAuth()`.

2. **`requireAuth()`** — applied per-router (here: `/api/todos`). 401 if the
   token is missing or invalid.

3. **`userId` scoping** — every `findMany` / `findFirst` / `create` /
   `update` / `delete` adds `where: { userId }` (or, on create, `data.userId`).
   This is the "every user sees only their own todos" guarantee.

4. **`useAuth().getToken()`** — Clerk hands the frontend a fresh JWT. We
   attach it to every request. The token rotates; never cache it.

## Live demo moments

1. **Same-tab continuity from snapshot 01.** Hit `/api/todos` directly in a
   new tab — now **401 Unauthorized**. Same URL, same browser, same user. The
   tab doesn't carry the JWT because it's not coming from React.

2. **Two-user isolation.** Open Chrome and Firefox (or a private window).
   Sign in as two users. Each adds 3 todos. **Each sees only their own.**
   This is the snapshot's payoff.

3. **Token in the Network tab.** Open DevTools → Network → click any
   `/api/todos` request → Headers → look at `Authorization`. Show the JWT.
   Decode it on jwt.io if there's time — `sub` is the Clerk userId.

## Reset between live runs

```bash
cd server && npx prisma migrate reset --force
# Clerk dashboard: optionally delete the test users
```

## What you'd add for production

- `verifyToken` on the backend with `audience` / `issuer` pinning.
- A user table mirrored from Clerk webhooks (so you can join todos.userId → users.*).
- Org / role / permission middleware if multi-tenant.
- Rate-limiting per `req.auth.userId`.
