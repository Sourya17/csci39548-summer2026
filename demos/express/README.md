# Express Demo — CSCI 39548, Summer 2026

Building a REST API backend with Node + Express + TypeScript. Five snapshots: setup, full CRUD, middleware/structure, Zod validation, CORS + vanilla frontend.

This demo spans **Class 9** (Mon Jun 29 — snapshots 01–03) and the first part of **Class 10** (Wed Jul 1 — snapshots 04–05). Prisma + Postgres CRUD is the **next demo** and fills the rest of Class 10.

## Stack

- **Node** + **Express 4** — minimal, ubiquitous, easy to teach.
- **TypeScript** via **tsx** — runs `.ts` files directly, no separate build step.
- **Zod** — runtime schema validation + TS type inference.
- **cors** — CORS middleware.

## Folder layout

```
express/
├── package.json, tsconfig.json
├── src/                          ← LIVE code (mirrors snapshot-05, the final state)
│   ├── server.ts                 ← entry point
│   ├── routes/todos.ts           ← /api/todos/* handlers
│   ├── schemas/todo.ts           ← Zod schemas
│   ├── middleware.ts             ← request logger, 404, error handler
│   ├── store.ts                  ← in-memory data layer
│   └── types.ts                  ← shared Todo type
├── public/                       ← static frontend served by Express
│   ├── index.html
│   └── app.js
├── snapshots/
│   ├── snapshot-01-setup/        ← hello-world Express + one GET
│   ├── snapshot-02-rest-crud/    ← full CRUD, single file
│   ├── snapshot-03-middleware/   ← split into router + middleware + store
│   ├── snapshot-04-validation/   ← Zod schemas + 400 responses
│   └── snapshot-05-cors-frontend/← CORS + vanilla HTML frontend (final)
├── SLIDES_SOURCE.md
├── TEACHING_NOTES.md
└── README.md
```

## Run it

```bash
cd Summer2026/demos/express
npm install
npm run dev
```

- API: `http://localhost:3000/api/todos`
- Health: `http://localhost:3000/api/health`
- Frontend (snapshot-05 only): `http://localhost:3000/`

`tsx watch` restarts the server when you edit any `.ts` file.

## Switch between snapshots

```bash
# from the demo root
rm -rf src public
cp -r snapshots/snapshot-02-rest-crud/src src
# (snapshot-05 also has public/; the others don't)
```

To go back to the live (snapshot-05) version:

```bash
rm -rf src public
cp -r snapshots/snapshot-05-cors-frontend/src src
cp -r snapshots/snapshot-05-cors-frontend/public public
```

## Teaching arc

| Snapshot | Lesson |
|---|---|
| 01 | Express boots. `app.get` registers a handler. `res.json` returns JSON. |
| 02 | REST verbs map to HTTP methods. Status codes (200/201/204/400/404). `req.params`, `req.body`. |
| 03 | Files split. Routers. Middleware basics. `next()`, error handler (4-arg signature). |
| 04 | Zod for validation. `.safeParse` vs `.parse`. `.flatten()` for client-friendly errors. |
| 05 | Static frontend. CORS — when you need it, when you don't, how to lock it down in prod. |

Each snapshot's `README.md` has the full breakdown and copy-pasteable `curl` test commands.

## Testing the API by hand

Every snapshot exposes the same routes (snapshot 01 only has GET). Quick reference:

```bash
curl http://localhost:3000/api/todos                                    # list
curl http://localhost:3000/api/todos/1                                  # one
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" -d '{"text":"hi","minutes":15}'   # create
curl -X PATCH http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" -d '{"done":true}'                # update
curl -X DELETE http://localhost:3000/api/todos/2 -i                     # delete
```

## What's NOT in this demo

- **Persistence.** In-memory only. Prisma + Postgres covers this in the next demo.
- **Auth.** Clerk overview is a separate demo.
- **Production logging / observability.** Mention in slides; out of scope for class.
- **API tests** (Vitest/Supertest). Mention as a homework path.
