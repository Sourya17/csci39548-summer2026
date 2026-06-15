// ============================================================
// Snapshot 08 — Modules (file 3 of 3): the entry point
//
// This file IMPORTS everything it needs from the other two files.
// Notice how readable the top of the file is — it tells you
// exactly what depends on what.
//
// Compile: tsc main.ts
//   (tsc finds and compiles the imported files automatically)
// Run:     node main.js
// ============================================================
// 2. Importing NAMED exports — comma-separated, curly braces.
import { priorityLabel, formatTodo } from "./todo-utils.js";
// 3. Importing a DEFAULT export — no curly braces, NAME IS YOUR CHOICE.
//    We named it `summarize` here, but we could've called it anything.
import summarize from "./todo-utils.js";
// 4. You can combine default + named imports from the same file:
//      import summarize, { priorityLabel, formatTodo } from "./todo-utils.js";
// 5. Rename on import if there's a clash:
//      import { Todo as TodoType } from "./todo-types.js";
// ------------------------------------------------------------
// Use the imported pieces — TS knows their types across files.
// ------------------------------------------------------------
const todos = [
    { id: 1, text: "Submit grading", done: false, minutes: 45, priority: 1 },
    { id: 2, text: "Buy groceries", done: true, minutes: 30, priority: 2 },
    { id: 3, text: "Reorganize desk", done: false, minutes: 15, priority: 3 },
    { id: 4, text: "Reply to dean", done: false, minutes: 10, priority: 1 },
];
console.log("priorityLabel(1):", priorityLabel(1));
console.log("");
console.log("Today's todos:");
for (const t of todos) {
    console.log(formatTodo(t));
}
console.log("");
console.log(summarize(todos));
console.log("---");
console.log("End of snapshot 08.");
console.log("Next snapshot: async with types — Promise<T>, typed fetch.");
