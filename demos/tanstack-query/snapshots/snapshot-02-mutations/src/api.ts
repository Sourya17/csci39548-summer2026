import type { Todo } from "./types";

// Our json-server backend. Start it with `npm run server` (port 3001).
const API_URL = "http://localhost:3001";

// --- Reads ---

// A plain async function that returns the data. No React in here at all —
// that's the point. TanStack Query calls this for us and manages the rest.
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error(`Failed to load todos (HTTP ${res.status})`);
  return res.json();
}

// --- Writes (mutations) ---
// Same idea: plain async functions. useMutation will call these.

export async function addTodo(input: {
  text: string;
  minutes: number;
}): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, done: false, assigneeId: 1 }),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

export async function toggleTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !todo.done }),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
}
