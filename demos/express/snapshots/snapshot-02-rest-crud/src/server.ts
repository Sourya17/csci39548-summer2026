import express from "express";

const app = express();
const PORT = 3000;

// express.json() parses incoming JSON bodies and puts the result on req.body.
// Without it, req.body is undefined.
app.use(express.json());

// In-memory store. Restarts wipe it. Snapshots 04+ will swap this out
// for a real DB (Prisma + Postgres in the next demo).
interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
}

let nextId = 4;
let todos: Todo[] = [
  { id: 1, text: "Buy groceries", done: false, minutes: 30 },
  { id: 2, text: "Walk the dog", done: true, minutes: 20 },
  { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// READ — list
app.get("/api/todos", (_req, res) => {
  res.json(todos);
});

// READ — one
app.get("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  res.json(todo);
});

// CREATE
app.post("/api/todos", (req, res) => {
  const { text, minutes } = req.body ?? {};
  if (typeof text !== "string" || typeof minutes !== "number") {
    res
      .status(400)
      .json({ error: "Body must be { text: string, minutes: number }" });
    return;
  }
  const todo: Todo = { id: nextId++, text, done: false, minutes };
  todos.push(todo);
  res.status(201).json(todo);
});

// UPDATE — partial (PATCH)
app.patch("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  const { text, done, minutes } = req.body ?? {};
  if (typeof text === "string") todo.text = text;
  if (typeof done === "boolean") todo.done = done;
  if (typeof minutes === "number") todo.minutes = minutes;
  res.json(todo);
});

// DELETE
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }
  todos.splice(idx, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Express demo listening on http://localhost:${PORT}`);
});
