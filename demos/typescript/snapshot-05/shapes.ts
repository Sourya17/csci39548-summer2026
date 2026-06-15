// ============================================================
// Snapshot 05 — Arrays, objects, interfaces
//
// Run:  tsc shapes.ts && node shapes.js
//
// New ideas:
//   1. Array types — `string[]` and `Array<string>` (same thing)
//   2. Tuples — fixed-length arrays with typed positions: [number, string]
//   3. Inline object types — `{ name: string; age: number }`
//   4. Optional properties with `?`
//   5. `readonly` properties
//   6. `interface` — a named, reusable object shape
//   7. Extending interfaces (& type aliases briefly)
//   8. `interface` vs `type` — when each one fits best
// ============================================================


// ------------------------------------------------------------
// 1. Array types
//
// Two equivalent syntaxes. `T[]` is more common; `Array<T>` is
// the only option when T itself uses < >.
// ------------------------------------------------------------

const scores: number[] = [80, 95, 72];
const names: Array<string> = ["Alice", "Bob"];

scores.push(100);
// scores.push("oops");   // ❌ string in a number[]

console.log("scores:", scores);
console.log("names: ", names);


// ------------------------------------------------------------
// 2. Tuples — fixed-length, fixed-type-per-position.
//
// Use sparingly. Most data is better as an object with named
// fields than a positional tuple.
// ------------------------------------------------------------

const rgb: [number, number, number] = [255, 100, 50];
const labeled: [string, number] = ["age", 21];

// rgb[3];                       // ❌ no index 3
// rgb[0] = "red";               // ❌ position 0 must be number

console.log("rgb:    ", rgb);
console.log("labeled:", labeled);


// ------------------------------------------------------------
// 3. Inline object types
//
// `{ name: string; age: number }` is a type, just written inline.
// Use semicolons OR commas between members.
// ------------------------------------------------------------

function printUser(user: { name: string; age: number }) {
  console.log(`${user.name}, age ${user.age}`);
}

printUser({ name: "Sourya", age: 21 });
// printUser({ name: "Sourya" });            // ❌ missing `age`
// printUser({ name: "Sourya", age: "21" }); // ❌ age must be number


// ------------------------------------------------------------
// 4. Optional properties with `?`
//
// Add `?` to make a property optional. Its type becomes `T | undefined`.
// ------------------------------------------------------------

function printContact(c: { email: string; phone?: string }) {
  console.log("Email:", c.email);
  if (c.phone !== undefined) {
    console.log("Phone:", c.phone);
  }
}

printContact({ email: "saha.sourya17@gmail.com" });
printContact({ email: "saha.sourya17@gmail.com", phone: "555-0100" });


// ------------------------------------------------------------
// 5. `readonly` — prevent reassignment of a property.
//
// `readonly` applies AFTER the object is built. You can still
// set the value at construction time, just not change it after.
// ------------------------------------------------------------

function describeTodo(t: { readonly id: number; text: string }) {
  // t.id = 99;            // ❌ readonly
  t.text = "edited";       // ✓ text is mutable
  console.log(`#${t.id}: ${t.text}`);
}

describeTodo({ id: 1, text: "Buy milk" });


// ------------------------------------------------------------
// 6. `interface` — a NAMED, reusable object shape.
//
// Once you reuse a shape twice, give it a name. Interfaces also
// give better error messages ("expected Todo, got ...") than
// inline types ("expected { id: number; text: string }").
// ------------------------------------------------------------

interface Todo {
  readonly id: number;
  text: string;
  done: boolean;
  minutes: number;
  priority?: 1 | 2 | 3;   // optional. The `1 | 2 | 3` is a LITERAL UNION (snapshot 06).
}

const t1: Todo = {
  id: 1,
  text: "Submit grading",
  done: false,
  minutes: 45,
  priority: 1,
};

const t2: Todo = {
  id: 2,
  text: "Buy groceries",
  done: true,
  minutes: 30,
  // priority is optional, so we can leave it out
};

console.log(t1);
console.log(t2);

// const bad: Todo = { id: "1", text: "x", done: false, minutes: 10 };
//                          ^^^ ❌ string not assignable to number


// ------------------------------------------------------------
// 7. Extending interfaces
//
// An interface can EXTEND another, inheriting its fields.
// Useful when types share a base shape.
// ------------------------------------------------------------

interface TodoWithDueDate extends Todo {
  dueDate: string;        // ISO date string, e.g. "2026-06-01"
}

const urgent: TodoWithDueDate = {
  id: 3,
  text: "Reply to dean",
  done: false,
  minutes: 10,
  priority: 1,
  dueDate: "2026-05-20",
};

console.log("urgent:", urgent);


// ------------------------------------------------------------
// 8. `type` aliases — the other way to name a shape.
//
// `type Name = { ... }` is functionally equivalent to `interface`
// for most cases. `type` is more flexible — it can also alias
// unions, primitives, function types, etc.
//
// Rule of thumb:
//   - `interface` for object shapes you may extend (especially in libs)
//   - `type` for everything else (unions, function types, simple aliases)
// ------------------------------------------------------------

type UserId = number;                                   // simple alias
type Coordinates = { x: number; y: number };            // object shape
type Handler = (event: string) => void;                 // function type

const myId: UserId = 42;
const point: Coordinates = { x: 3, y: 4 };
const onClick: Handler = (e) => console.log("clicked:", e);

console.log(myId, point);
onClick("button-1");


// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// A typed array of Todos, processed with the array methods from
// the JS demo. Notice we don't have to annotate the callback
// parameter `t` — TS knows it's a Todo from the array's type.
// ------------------------------------------------------------

const todos: Todo[] = [
  { id: 1, text: "Submit grading", done: false, minutes: 45, priority: 1 },
  { id: 2, text: "Buy groceries",  done: true,  minutes: 30, priority: 2 },
  { id: 3, text: "Reorganize desk", done: false, minutes: 15, priority: 3 },
  { id: 4, text: "Reply to dean",   done: false, minutes: 10, priority: 1 },
];

const undoneMinutes = todos
  .filter((t) => !t.done)             // t inferred as Todo
  .reduce((sum, t) => sum + t.minutes, 0);

console.log(`Remaining: ${undoneMinutes} min`);


console.log("---");
console.log("End of snapshot 05.");
console.log("Next snapshot: unions, literal types, and narrowing.");

export {};
