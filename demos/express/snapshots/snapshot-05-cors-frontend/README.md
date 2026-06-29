# Snapshot 05 — CORS + a real frontend

## What's new

- Added `cors` dependency. `app.use(cors())` allows any origin to call the API.
- `app.use(express.static(...))` serves the new `public/` folder.
- `public/index.html` + `public/app.js` — vanilla HTML + JS frontend that calls the API via `fetch`. No framework, no build step.
- Visit `http://localhost:3000/` — you get the Todo app UI, talking to the API on the same port.

## What to teach

- **`express.static(dir)`** turns a folder into a static file server. Any file in `public/` becomes available at `/<filename>`. Great for a one-binary "Express serves both API and frontend" setup.
- **Same-origin vs cross-origin.** The frontend at `http://localhost:3000/` calling `http://localhost:3000/api/todos` is **same-origin**. No CORS needed. But your real deployment will have:
  - Frontend: `https://app.vercel.app`
  - Backend: `https://api.render.com`
  - These are different origins. The browser will block `fetch` from frontend to backend unless the backend sends the right CORS headers.
- **`cors()` middleware** adds `Access-Control-Allow-Origin: *` (and friends) to every response. The browser checks those headers on each cross-origin request.
- **In production:** never `cors()` open. Pin to your frontend origin: `cors({ origin: "https://app.vercel.app" })`. Otherwise any malicious site can hit your API on behalf of your logged-in users.
- **`fetch` API basics for class:**
  - `fetch(url)` → GET.
  - `fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(obj) })` → POST.
  - `res.ok` → true for 2xx; check it before parsing.
  - `await res.json()` → parses the body.

## Show CORS failing (live demo cue)

1. Start the demo on port 3000.
2. Open a *second* terminal and serve any HTML file from a different port:
   ```bash
   npx serve -l 4000 public
   ```
   (Or use Python: `python3 -m http.server 4000` inside `public/`.)
3. Edit `public/app.js`: change `const API = "/api/todos"` to `const API = "http://localhost:3000/api/todos"` (absolute URL).
4. Visit `http://localhost:4000/`. The page loads, but the fetch fails with a **CORS error** in the browser console — UNLESS `app.use(cors())` is still active.
5. Comment out `app.use(cors())` in `server.ts`. Restart. Refresh `http://localhost:4000/`. Console now shows:
   ```
   Access to fetch at 'http://localhost:3000/api/todos' from origin 'http://localhost:4000' has been blocked by CORS policy
   ```
6. Restore `app.use(cors())`. Refresh. Works again.

## What's NOT here

- Persistence — the in-memory store still resets on every server restart. The **Prisma demo** (next) replaces the store with PostgreSQL.
- React frontend — students wire React + TanStack Query to this API in Assignment 4. The vanilla HTML page is the minimum to test the backend end-to-end.
- Auth — Clerk overview, separate demo (last).
