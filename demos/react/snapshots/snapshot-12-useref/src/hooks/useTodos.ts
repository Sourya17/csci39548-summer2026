import { useEffect, useState } from "react";
import type { Todo } from "../types";

const STORAGE_KEY = "react-demo.todos";

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Buy groceries", done: false, minutes: 30 },
  { id: 2, text: "Walk the dog", done: true, minutes: 20 },
  { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
  { id: 4, text: "Write report", done: true, minutes: 60 },
];

// A custom hook is just a function whose name starts with "use" and that
// calls other hooks inside. It bundles state + behavior so any component
// can reuse it.
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TODOS;
    try {
      return JSON.parse(raw) as Todo[];
    } catch {
      return DEFAULT_TODOS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string, minutes: number) {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, done: false, minutes },
    ]);
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function resetTodos() {
    setTodos(DEFAULT_TODOS);
  }

  // Return everything the consumer needs.
  return { todos, addTodo, toggleTodo, deleteTodo, resetTodos };
}
