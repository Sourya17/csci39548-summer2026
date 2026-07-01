# Snapshot 03 — Relations (one-to-many)

## What's new

- **Schema:** added `Category` model + `category` / `categoryId` fields on `Todo`. Optional FK.
- **`onDelete: SetNull`** — deleting a Category nulls its todos' `categoryId` rather than cascading the delete.
- New routes: `/api/categories` (GET list / GET one / POST / DELETE).
- Todo routes now support `?include=category` on list, and always include category on GET one. POST/PATCH accept `categoryId`.
- New Zod schemas for category. Todo schemas grew a `categoryId` field; PATCH allows `null` to clear.
- New seed: 3 categories (Errands, Reading, Pets), 4 todos (3 categorized, 1 uncategorized).
- **Prisma error code handling:**
  - `P2002` (unique constraint) → 409 Conflict on duplicate category name.
  - `P2003` (FK constraint) → 400 Bad Request on nonexistent `categoryId`.

## What to teach

- **One-to-many in Prisma = a relation field on each side.**
  ```
  model Category {
    todos Todo[]                                       // back-relation, no FK column
  }
  model Todo {
    category   Category? @relation(fields: [categoryId], references: [id])
    categoryId Int?                                    // the actual FK column
  }
  ```
  The `@relation` annotation lives on the "many" side (the side that holds the FK).
- **`include` hydrates relations.** `prisma.todo.findUnique({ where, include: { category: true } })` returns the todo with its `category` object nested. Without `include`, only the scalar fields come back.
- **Optional vs required FK:**
  - `category Category?` (with `?`) → todo can have no category.
  - `category Category` (no `?`) → todo MUST belong to a category. Creating one without `categoryId` fails at the DB level.
- **`onDelete` options:**
  - `Cascade` — delete the children too.
  - `SetNull` — null the FK (we use this).
  - `Restrict` (default) — block the parent delete if children exist.
- **Prisma error codes** are how the client signals known failure modes:
  - `P2002` — unique constraint violation (catch and return 409).
  - `P2003` — FK constraint violation (catch and return 400).
  - `P2025` — record not found on update/delete.
  - Documented at https://www.prisma.io/docs/orm/reference/error-reference

## Migrate (you'll re-migrate when switching to this snapshot)

```bash
npx prisma migrate dev --name add_category
npx prisma db seed
```

The migration file Prisma generates will:
1. CREATE TABLE Category.
2. ALTER TABLE Todo add categoryId column + FK constraint.

## Test (curl)

```bash
# Categories
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/categories/1            # includes its todos
curl http://localhost:3000/api/categories?include=todos

# Create category — 201
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Work"}'

# Duplicate name — 409
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Errands"}' -i

# Todos with categories joined in
curl "http://localhost:3000/api/todos?include=category"

# Create a todo with a category
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Submit timesheet","minutes":10,"categoryId":1}'

# Move a todo to a different category
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"categoryId":2}'

# Clear a todo's category (note: null, not omit)
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"categoryId":null}'

# Bad FK — 400 (categoryId 999 doesn't exist)
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"x","minutes":5,"categoryId":999}' -i

# Delete a category — its todos survive with categoryId = null
curl -X DELETE http://localhost:3000/api/categories/1 -i
curl http://localhost:3000/api/todos?include=category
```

## What's NOT here yet

- Still SQLite → snapshot 04 swaps to Neon Postgres (docs only).
- No frontend — wire up in Assignment 4 / final project.
