import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
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

// Middleware composes from the inside out:
//   create( devtools( persist( storeFn ) ) )
// devtools wraps every set() so the Redux DevTools extension can record it.
// persist syncs the matched slice of state to localStorage on every set,
// and rehydrates from localStorage at startup.
export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todos: DEFAULT_TODOS,

        addTodo: (text, minutes) =>
          set((state) => ({
            todos: [
              ...state.todos,
              { id: Date.now(), text, done: false, minutes },
            ],
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
      }),
      {
        name: "zustand-demo.todos", // localStorage key
        // Only persist the todos array. Actions don't serialize and
        // never need to be saved.
        partialize: (state) => ({ todos: state.todos }),
        version: 1,
      }
    ),
    { name: "TodoStore" } // label shown in Redux DevTools
  )
);
