import type { Todo, User } from "./types";

// Our json-server backend. Start it with `npm run server` (port 3001).
const API_URL = "http://localhost:3001";

// --- Reads ---

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error(`Failed to load todos (HTTP ${res.status})`);
  return res.json();
}

// The SECOND query's fetcher. It needs an id — which we only have once a todo
// is selected. That's what makes the query "dependent".
export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error(`Failed to load user (HTTP ${res.status})`);
  return res.json();
}

// --- Writes (mutations) ---

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
