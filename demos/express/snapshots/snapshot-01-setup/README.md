# Snapshot 01 — Express setup

## What's new

- `package.json` declares `express`, `tsx` (for running TypeScript directly with no build step), and types.
- `src/server.ts` boots an Express app, registers two GET routes, and listens on port 3000.
  - `GET /api/health` → `{ "status": "ok" }`
  - `GET /api/todos` → hardcoded array of 3 todos.
- That's the whole backend so far. No DB, no POST, no middleware.

## What to teach

- **Express is a thin function-routing layer on top of Node's `http` module.** `app.get(path, handler)` says "when a GET request comes to this path, call this function."
- The handler signature is `(req, res, next?) => void`. `res.json(obj)` sets the `Content-Type: application/json` header and serializes the object.
- **`tsx watch`** runs TypeScript directly and restarts on file changes. No compile step, no `dist/`. (For production you'd typically build first; for class we stay simple.)
- Why port 3000? Convention. React's Vite dev server defaults to 5173, so they don't collide.

## Run

```bash
npm install
npm run dev
```

You should see `Express demo listening on http://localhost:3000`.

## Test

```bash
curl http://localhost:3000/api/health
# → {"status":"ok"}

curl http://localhost:3000/api/todos
# → [{"id":1,...}, {"id":2,...}, {"id":3,...}]
```

Or just open `http://localhost:3000/api/todos` in a browser — JSON renders directly.

## What's NOT here yet

- POST/PATCH/DELETE — snapshot 02.
- Body parsing — snapshot 02.
- Middleware (logging, errors) — snapshot 03.
- Input validation — snapshot 04.
- CORS — snapshot 05.
