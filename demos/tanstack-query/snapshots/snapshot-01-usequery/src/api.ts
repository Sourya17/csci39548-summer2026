import type { Todo } from "./types";

// Our json-server backend. Start it with `npm run server` (port 3001).
const API_URL = "http://localhost:3001";

// A plain async function that returns the data. No React in here at all —
// that's the point. TanStack Query calls this for us and manages the rest.
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error(`Failed to load todos (HTTP ${res.status})`);
  return res.json();
}
