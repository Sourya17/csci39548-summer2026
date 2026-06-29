# Snapshot 02 — Full REST CRUD

## What's new

- `app.use(express.json())` — parses incoming JSON bodies. Now `req.body` is populated for POST/PATCH.
- `Todo` type + in-memory `todos` array + `nextId` counter.
- Five route handlers:
  - `GET /api/todos` — list all
  - `GET /api/todos/:id` — get one (404 if missing)
  - `POST /api/todos` — create (201 on success, 400 if body shape is wrong)
  - `PATCH /api/todos/:id` — partial update (404 if missing)
  - `DELETE /api/todos/:id` — delete (204 on success, 404 if missing)
- Inline `typeof` checks for body shape. Snapshot 04 replaces these with proper Zod validation.

## What to teach

- **REST = nouns are URLs, verbs are HTTP methods.** `/api/todos` is the collection; `/api/todos/:id` is one item. GET reads, POST creates, PATCH updates, DELETE deletes.
- **HTTP status code conventions:**
  - `200 OK` — generic success.
  - `201 Created` — POST that created a resource. Include the resource in the body.
  - `204 No Content` — DELETE that succeeded. No body.
  - `400 Bad Request` — client sent malformed data.
  - `404 Not Found` — resource doesn't exist.
  - `500 Internal Server Error` — your code threw. (Demoed in snapshot 03.)
- **`req.params` vs `req.query` vs `req.body`:**
  - `req.params.id` — from the URL path (`:id`).
  - `req.query.filter` — from the query string (`?filter=done`).
  - `req.body` — from the request body (only populated if `express.json()` ran first).
- **`res.json()` returns nothing useful** — you don't `return res.json(...)`. Use `return;` after sending to exit the handler.
- **Why in-memory and not a DB?** Keeps the demo focused on Express. State resets on restart — that's a feature in class. The Prisma demo (next) adds persistence.

## Test with curl

```bash
# list
curl http://localhost:3000/api/todos

# get one
curl http://localhost:3000/api/todos/1

# create
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test from curl","minutes":15}'

# partial update — toggle done
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'

# delete
curl -X DELETE http://localhost:3000/api/todos/2 -i
# -i shows headers — verify "204 No Content"

# 404
curl http://localhost:3000/api/todos/999 -i

# 400
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"missing minutes"}' -i
```

## What's NOT here yet

- All routes are in one file → snapshot 03 extracts a router.
- No request logging, no global error handler → snapshot 03.
- Body validation is hand-rolled and weak (no min/max, no trim) → snapshot 04 (Zod).
- No CORS, no frontend → snapshot 05.
