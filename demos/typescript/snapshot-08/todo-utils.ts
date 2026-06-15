// ============================================================
// Snapshot 08 — Modules (file 2 of 3): exporting functions
//
// Two kinds of exports in one file:
//   - NAMED EXPORTS (the standard)
//   - one DEFAULT EXPORT (max one per file)
// ============================================================


// IMPORT brings names from another file into this one.
// Note the `./` — relative path. Note: no `.ts` extension when
// using tsc with default settings.
import { Todo, Priority } from "./todo-types.js";


// ------------------------------------------------------------
// NAMED EXPORTS — the standard pattern.
// Call them by their exact name on the import side.
// ------------------------------------------------------------

export function priorityLabel(p: Priority): string {
  if (p === 1) return "HIGH";
  if (p === 2) return "MED";
  return "LOW";
}

export function formatTodo(t: Todo): string {
  const mark = t.done ? "[done]" : "[    ]";
  return `${mark} ${priorityLabel(t.priority).padEnd(5)} ${t.text}`;
}

// You can also export at the bottom:
//   function foo() {}
//   export { foo };


// ------------------------------------------------------------
// DEFAULT EXPORT — at most one per file.
// The importer chooses the name.
// ------------------------------------------------------------

export default function summarize(todos: Todo[]): string {
  const undone = todos.filter((t) => !t.done).length;
  const mins   = todos.filter((t) => !t.done).reduce((s, t) => s + t.minutes, 0);
  return `${undone} unfinished · ${mins} min remaining`;
}
