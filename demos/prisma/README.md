# Prisma Demo — CSCI 39548, Summer 2026

Replacing the in-memory `todoStore` from the Express demo with a real database, using **Prisma ORM**. Four snapshots: schema + migrate, Prisma Client CRUD, relations, Neon swap.

This demo fills the **second half of Class 10** (Wed Jul 1).

## Stack

- **Prisma 5** — schema-first ORM with first-class TypeScript.
- **SQLite** for class demos (zero infra). **PostgreSQL (Neon)** for the production swap shown in snapshot 04.
- **Express 4 + Zod + cors** carry over from the Express demo.

## Folder layout

```
prisma/
├── package.json, tsconfig.json, .env.example
├── prisma/
│   ├── schema.prisma             ← LIVE schema (snapshot 03 — categories + todos)
│   ├── seed.ts
│   └── migrations/               ← created by `prisma migrate dev`
├── src/                          ← LIVE app code (mirrors snapshot 03)
│   ├── server.ts
│   ├── db.ts                     ← PrismaClient singleton
│   ├── routes/                   ← /api/todos, /api/categories
│   ├── schemas/                  ← Zod request schemas
│   └── middleware.ts             ← logger, 404, error handler, asyncHandler
├── snapshots/
│   ├── snapshot-01-schema-migrate/   ← schema + migrate + seed, tiny query CLI
│   ├── snapshot-02-client-crud/      ← Express + Prisma replacing in-memory store
│   ├── snapshot-03-relations/        ← Category model, one-to-many, FK errors
│   └── snapshot-04-neon-swap/        ← schema.prisma swapped to Postgres
├── SLIDES_SOURCE.md
├── TEACHING_NOTES.md
└── README.md
```

## First-time setup (per snapshot or once for the live src/)

```bash
cd Summer2026/demos/prisma
npm install
cp .env.example .env
npx prisma migrate dev --name init
npx prisma db seed
```

## Run

```bash
npm run dev                  # tsx watch — restarts on file save
```

API at `http://localhost:3000`. Same routes as the Express demo plus `/api/categories`.

## Inspect the database

```bash
npm run db:studio            # http://localhost:5555 — GUI table view
```

## Switch between snapshots

```bash
# from the demo root
rm -rf src prisma
cp -r snapshots/snapshot-02-client-crud/src src
cp -r snapshots/snapshot-02-client-crud/prisma prisma
# then re-migrate against the snapshot's schema
rm -rf prisma/migrations dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

The `rm -rf prisma/migrations dev.db` reset is important when the schema changes between snapshots — otherwise Prisma sees a drift and complains.

## Teaching arc

| Snapshot | Lesson |
|---|---|
| 01 | Schema = source of truth. `prisma migrate dev` writes SQL + regenerates types. Studio. |
| 02 | `PrismaClient` replaces in-memory store. `findMany`, `findUnique`, `create`, `update`, `delete`. Async routes + `asyncHandler` glue. Pre-check for 404. |
| 03 | One-to-many relation. `include` to hydrate. FK constraints (`P2003`), unique constraints (`P2002`). `onDelete: SetNull`. |
| 04 | Swap `provider = "postgresql"`. Same code, Neon-hosted. Deploy notes. |

Each snapshot's `README.md` covers what changed and what to teach with copy-pasteable test commands.

## What's NOT in this demo

- **Auth.** Clerk is a separate demo.
- **The actual deploy** (Vercel + Render). Separate deploy demo / overview.
- **Connection pooling for serverless.** Mention in slides; deep dive in deploy demo.
- **Migrations rollback / squash.** Mention briefly; full topic in advanced electives.
