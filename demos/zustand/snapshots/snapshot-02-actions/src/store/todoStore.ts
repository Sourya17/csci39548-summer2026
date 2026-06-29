import { create } from "zustand";
import type { Todo } from "../types";

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Buy groceries", done: false, minutes: 30 },
  { id: 2, text: "Walk the dog", done: true, minutes: 20 },
  { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
  { id: 4, text: "Write report", done: true, minutes: 60 },
];

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, minutes: number) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  resetTodos: () => void;
}

// create() returns a hook. State and behavior live in one place,
// outside the React tree. Any component can read or write without
// being passed props.
export const useTodoStore = create<TodoStore>((set) => ({
  todos: DEFAULT_TODOS,

  addTodo: (text, minutes) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false, minutes }],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  resetTodos: () => set({ todos: DEFAULT_TODOS }),
}));
