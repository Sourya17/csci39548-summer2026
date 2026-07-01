# Snapshot 01 — Schema, migrate, seed

## What's new

- `prisma/schema.prisma` — declarative schema. One generator (Prisma Client), one datasource (SQLite), one model (`Todo`).
- `prisma/seed.ts` — wipes + inserts 3 default todos. Run via `npx prisma db seed`.
- `src/server.ts` — tiny query script that reads all todos and prints them. Proves the round-trip works before we add Express.
- `.env` — `DATABASE_URL="file:./dev.db"`.

No Express, no HTTP, no routes yet. The focus here is **the data layer alone**.

## What to teach

- **The schema is the source of truth.** Change `schema.prisma`, run `migrate dev`, and Prisma:
  1. Generates a SQL migration file under `prisma/migrations/`.
  2. Applies it to your database.
  3. Regenerates the TypeScript Prisma Client with new types.
- **`@id @default(autoincrement())`** — primary key, auto-incrementing integer.
- **`@default(false)`, `@default(now())`** — database-side defaults. The app doesn't need to send them.
- **`PrismaClient`** — auto-typed. `prisma.todo.findMany()` returns `Todo[]` with full TS types. Rename a field, the type errors point to every callsite.
- **Migrations are SQL files committed to git.** You can read them. They're versioned. Running a migration twice is a no-op.
- **`prisma db seed`** runs a script you write. Useful for dev defaults, fixtures.

## Run

```bash
# 1. Install deps (only first time)
npm install

# 2. Set up .env (only first time)
cp .env.example .env

# 3. Create the database + first migration + apply it
npx prisma migrate dev --name init

# 4. Seed defaults
npx prisma db seed

# 5. Query
npm run dev
```

Step 5 prints a table of 3 todos.

## Open Prisma Studio (GUI for the DB)

```bash
npm run db:studio
```

Opens at `http://localhost:5555` — a tabbed view of every model. Edit rows live, add records, watch the changes round-trip back to `npm run dev`.

## Inspect the migration

```bash
cat prisma/migrations/*/migration.sql
```

You'll see plain `CREATE TABLE Todo (...)` SQL. This is what got executed against SQLite.

## What's NOT here yet

- No HTTP routes → snapshot 02 mounts Express.
- No relations → snapshot 03 adds Category.
- Not pointed at Postgres → snapshot 04 swaps `DATABASE_URL`.
