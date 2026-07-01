import { useAuth } from "@clerk/clerk-react";
import type { Todo } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// The key idea in snapshot 02: every API call carries the Clerk JWT.
// We build a fetch helper that's a normal hook so we can call useAuth().
//
// `getToken()` is async — Clerk may rotate the JWT in the background.
// Always re-fetch right before the request; never cache it.
export function useApi() {
  const { getToken } = useAuth();

  async function authedFetch(path: string, init: RequestInit = {}) {
    const token = await getToken();
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    const res = await fetch(`${API_URL}${path}`, { ...init, headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  return {
    listTodos: (): Promise<Todo[]> => authedFetch("/api/todos"),

    addTodo: (input: { text: string; minutes: number }): Promise<Todo> =>
      authedFetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(input),
      }),

    toggleTodo: (todo: Todo): Promise<Todo> =>
      authedFetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done: !todo.done }),
      }),

    deleteTodo: (id: number): Promise<void> =>
      authedFetch(`/api/todos/${id}`, { method: "DELETE" }),
  };
}
