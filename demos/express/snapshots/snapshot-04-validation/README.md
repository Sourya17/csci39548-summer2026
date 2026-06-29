# Snapshot 04 — Input validation with Zod

## What's new

- Added `zod` dependency.
- New file: `src/schemas/todo.ts` — two schemas:
  - `TodoCreateSchema` — `{ text: string (1–200, trimmed), minutes: integer (1–1440) }`.
  - `TodoPatchSchema` — same fields, all optional, but body must have at least one.
- `routes/todos.ts` replaces hand-rolled `typeof` checks with `Schema.safeParse(req.body)`.
- On validation failure: `400` with `{ error, issues }` — `issues` comes from `.error.flatten()` and breaks down which field failed and why.

## What to teach

- **Why validate?** Trust nothing from the client. A malformed POST shouldn't crash the server, it should return a clear 400.
- **Why a library?** Hand-rolling `typeof` + ranges + trimming gets verbose fast and is easy to forget. Zod gives you constraints, parsing, AND TypeScript types from one declarative object.
- **`.safeParse` vs `.parse`:**
  - `.parse(data)` — returns the parsed value on success, **throws `ZodError`** on failure.
  - `.safeParse(data)` — returns `{ success: true, data }` or `{ success: false, error }`. No throw.
  - We use `.safeParse` here so we can inline the 400 response. `.parse` is nicer when you have a global error handler that catches `ZodError` (good follow-up exercise).
- **`z.infer<typeof Schema>`** gives you the TypeScript type for free. Schema and type stay in sync forever — change one, the other follows.
- **`.refine`** adds custom rules. We use it to reject empty PATCH bodies (`{}`).
- **`error.flatten()`** gives a structured `{ formErrors, fieldErrors }` shape that's easy to consume on the frontend.

## Test the validations

```bash
# Valid create
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"  hello  ","minutes":15}'
# → 201; note "text" returned without leading/trailing spaces (Zod .trim())

# Empty text → 400
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"","minutes":15}' -i

# Missing minutes → 400
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"hi"}' -i

# Non-integer minutes → 400
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"hi","minutes":15.5}' -i

# Out-of-range minutes (> 1440) → 400
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"hi","minutes":99999}' -i

# Empty PATCH body → 400 (the .refine rule)
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{}' -i

# Valid PATCH
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'
```

## What's NOT here yet

- The frontend doesn't exist in this project yet → snapshot 05 adds CORS + a vanilla HTML/JS page.
