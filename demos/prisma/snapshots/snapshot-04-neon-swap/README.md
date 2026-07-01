# Snapshot 04 — Swap SQLite to Neon Postgres

## What's new

**Only one line of source changed** vs snapshot 03:

```diff
 datasource db {
-  provider = "sqlite"
+  provider = "postgresql"
   url      = env("DATABASE_URL")
 }
```

All routes, all middleware, the seed script — identical. That's the headline.

## What to teach

- **The Prisma Client API is database-agnostic.** Same `prisma.todo.findMany()` whether the underlying engine is SQLite, Postgres, MySQL, or SQL Server. Switching engines is a config change, not a code change.
- **What does change:** the migration SQL Prisma generates. Postgres supports things SQLite doesn't (jsonb, arrays, partial indexes, advisory locks). When you migrate against Postgres, Prisma uses Postgres-flavored SQL.
- **Why deploy to Postgres?** Production needs:
  - Multiple processes connecting at once (SQLite is one-writer-at-a-time).
  - Network access (SQLite is a file on disk).
  - Connection pooling, replication, backups — handled by the host.
- **Neon = serverless Postgres.** Free tier is generous for class-scale projects. Branches like git (one DB per PR). HTTP-based driver works inside Vercel functions.

## Set up Neon (one-time)

1. Sign up at https://neon.tech (GitHub or email).
2. Create a project. Name it `csci39548-demo` or similar. Region: pick the closest US one.
3. From the project dashboard, copy the **Connection string** (looks like `postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require`).
4. In this demo's `.env`, replace the SQLite line:
   ```
   DATABASE_URL="postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require"
   ```

## Migrate against Neon

```bash
# 1. Reset local Prisma client + migrations against the new DB.
#    (Use a fresh prisma/migrations folder — SQLite migrations may not
#    apply cleanly to Postgres.)
rm -rf prisma/migrations
npx prisma migrate dev --name init

# 2. Seed
npx prisma db seed

# 3. Verify
npx prisma studio        # opens locally, talks to Neon
```

## Run + test

Same `npm run dev`, same `curl` commands from snapshot 03. **Same code, real Postgres backing it.**

## Deploy notes (overview — full deploy demo coming)

- **Frontend** → Vercel.
- **Backend (this Express app)** → Render web service. Set `DATABASE_URL` in Render env vars to the Neon string. `npm install && npx prisma migrate deploy && npm start` as the build/start commands.
- **`prisma migrate deploy`** (not `migrate dev`) is the production migration command. It only applies pending migrations — never prompts, never resets.
- **`@prisma/client` must be regenerated** on Render's build. Add `prisma generate` to the build step (or use `postinstall`).

## What's NOT here

- The Vercel + Render walkthrough. Separate "deploy" demo. This snapshot is just the DB swap.
- Connection pooling for serverless (Neon's HTTP driver, Prisma Accelerate). Mention in slides; cover in deploy demo.
- Branched databases per PR. Cool, but out of class scope.
