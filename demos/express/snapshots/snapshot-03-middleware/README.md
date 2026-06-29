# Snapshot 03 — Middleware + structure

## What's new

- **Files split.** Routes, data, middleware, and bootstrap each live in their own file:
  - `src/server.ts` — bootstrap, wires up middleware, mounts router.
  - `src/routes/todos.ts` — all `/api/todos/*` handlers, exported as a `Router`.
  - `src/store.ts` — in-memory `todoStore` object (list/get/create/update/remove).
  - `src/middleware.ts` — `requestLogger`, `notFoundHandler`, `errorHandler`.
  - `src/types.ts` — shared `Todo` type.
- **Three new middleware:**
  - `requestLogger` — logs `[timestamp] METHOD /url` for every request.
  - `notFoundHandler` — catches anything no route handled, returns 404 JSON.
  - `errorHandler` — catches thrown errors anywhere in the pipeline, returns 500 JSON.
- **Demo throw route:** `GET /api/todos/debug/boom` throws on purpose so you can show the error handler in action.

## What to teach

- **Middleware = a function with signature `(req, res, next) => void`.** It can:
  - Inspect/modify `req` and `res`.
  - Call `next()` to continue.
  - Call `res.send(...)` (or similar) to end the chain.
  - Throw → Express routes the error to the error handler.
- **Order matters.** Middleware runs in registration order. Logger first (so every request logs), then body parser (so handlers see `req.body`), then routes, then 404, then error.
- **404 vs 500:**
  - 404 = no route registered for this URL. Handled by middleware mounted *after* all routes.
  - 500 = a route threw an unhandled error. Handled by the 4-arg error handler mounted *last*.
- **The 4-argument error handler is special.** Express checks arity — if your function has 4 params, it's an error handler. Drop one and Express treats it as normal middleware. (You can argue this is bad API design. It's also pragmatic — JS has no overloading.)
- **Routers are a unit of organization.** Big app = many routers (`/api/users`, `/api/products`, `/api/orders`). Each lives in its own file with its own scope. Mount them once in `server.ts`.

## Test the new behavior

```bash
# All previous CRUD still works exactly the same.
curl http://localhost:3000/api/todos

# Watch the server console — every request logs:
#   2026-06-08T22:00:00.000Z  GET  /api/todos

# 404 from the notFoundHandler:
curl http://localhost:3000/api/nope -i

# 500 from the errorHandler:
curl http://localhost:3000/api/todos/debug/boom -i
# server console shows the stack trace; client gets JSON 500
```

## What's NOT here yet

- Validation is still hand-rolled `typeof` checks → snapshot 04 swaps in Zod.
- No CORS → snapshot 05.
- No persistence → Prisma demo (next).
