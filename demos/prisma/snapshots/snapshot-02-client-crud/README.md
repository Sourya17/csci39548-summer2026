# Snapshot 02 — Prisma Client + Express CRUD

## What's new

- Same Express skeleton as the Express demo's snapshot 05 (cors, json parser, logger, 404, error handler), but:
- The in-memory `todoStore` is **gone**. Every route now calls **Prisma Client** directly.
- New file: `src/db.ts` — exports a single `prisma` instance. Imported wherever DB access is needed.
- New file: `src/middleware.ts` — adds an `asyncHandler` wrapper so thrown errors inside async route handlers propagate to the error handler instead of becoming unhandled rejections.

## What to teach

- **Prisma Client mirrors the schema.** `prisma.todo.findMany()` exists because `model Todo` exists. Rename `Todo` → `Task` in the schema and migrate, and `prisma.todo` disappears from the TS types (every usage red-underlines).
- **Routes are async now.** The data layer is over the network (even if SQLite is local, the API is the same). Async makes IO explicit.
- **`asyncHandler` is glue.** Express 4 was designed pre-`async/await`. A rejected promise inside a route doesn't reach the error handler unless you bridge it. Express 5 (Oct 2024) makes this automatic — we stay on 4 for parity with the Express demo and teach the wrapper as a small, named idiom.
- **Pre-checking with `findUnique` before `update`/`delete`.** Without it, Prisma throws `P2025` (record not found) and the 500 handler catches it as a server error. With it, we return a clean 404. Trade-off: one extra query per write. For class clarity, worth it.
- **Type safety end to end.** `result.data` from Zod's `safeParse` matches the shape Prisma's `create` accepts. The TS compiler verifies the connection. Change the schema, both sides update.

## Setup the database (only once after switching to this snapshot)

```bash
# 1. .env from .env.example (only first time across snapshots)
cp .env.example .env

# 2. Apply migrations + generate Client
npx prisma migrate dev --name init

# 3. Seed
npx prisma db seed
```

## Run

```bash
npm run dev
```

## Test (curl)

```bash
curl http://localhost:3000/api/todos
curl http://localhost:3000/api/todos/1

curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"From Prisma demo","minutes":25}'

curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

curl -X DELETE http://localhost:3000/api/todos/2 -i
curl http://localhost:3000/api/todos/999 -i        # 404

# Refresh the page, restart the server — todos persist now.
```

## Open Prisma Studio in parallel

```bash
npm run db:studio
```

Watch rows change in real time as you `curl` the API.

## What's NOT here yet

- No relations → snapshot 03 adds `Category`.
- Still on SQLite → snapshot 04 swaps to Postgres (Neon).
