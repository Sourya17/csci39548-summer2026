import express from "express";

// An Express "app" is a function that knows how to handle HTTP requests.
// You register handlers on it, then ask it to listen on a port.
const app = express();
const PORT = 3000;

// Health check — handy for "is the server up?" before adding any real logic.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Snapshot 01 has ONE data endpoint with hardcoded results.
// We'll wire up real CRUD in snapshot 02.
app.get("/api/todos", (_req, res) => {
  res.json([
    { id: 1, text: "Buy groceries", done: false, minutes: 30 },
    { id: 2, text: "Walk the dog", done: true, minutes: 20 },
    { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Express demo listening on http://localhost:${PORT}`);
});
