import type { Todo } from "./types";

// Module-scoped state. Imported by routes, mutated through these helpers.
// Snapshot 05 of the Prisma demo replaces this with real DB calls.
let nextId = 4;
const todos: Todo[] = [
  { id: 1, text: "Buy groceries", done: false, minutes: 30 },
  { id: 2, text: "Walk the dog", done: true, minutes: 20 },
  { id: 3, text: "Read 20 pages", done: false, minutes: 40 },
];

export const todoStore = {
  list: () => todos,

  get: (id: number) => todos.find((t) => t.id === id),

  create: (text: string, minutes: number): Todo => {
    const todo: Todo = { id: nextId++, text, done: false, minutes };
    todos.push(todo);
    return todo;
  },

  update: (id: number, patch: Partial<Omit<Todo, "id">>): Todo | undefined => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return undefined;
    if (patch.text !== undefined) todo.text = patch.text;
    if (patch.done !== undefined) todo.done = patch.done;
    if (patch.minutes !== undefined) todo.minutes = patch.minutes;
    return todo;
  },

  remove: (id: number): boolean => {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    todos.splice(idx, 1);
    return true;
  },
};
