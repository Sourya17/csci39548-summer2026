import type { Todo } from "../types";

// SNAPSHOT 01 — no Authorization header. Plain fetch.
// The backend doesn't ask for one yet, and the frontend wouldn't know how
// to send one anyway. Compare with snapshot 02's useApi() hook.
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function listTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/api/todos`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addTodo(input: {
  text: string;
  minutes: number;
}): Promise<Todo> {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function toggleTodo(todo: Todo): Promise<Todo> {
  const res = await fetch(`${API_URL}/api/todos/${todo.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !todo.done }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
