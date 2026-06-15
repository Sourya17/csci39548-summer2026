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
const scores = [80, 95, 72];
const names = ["Alice", "Bob"];
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
const rgb = [255, 100, 50];
const labeled = ["age", 21];
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
function printUser(user) {
    console.log(`${user.name}, age ${user.age}`);
}
printUser({ name: "Sourya", age: 21 });
printUser({ name: "Sourya" }); // ❌ missing `age`
// printUser({ name: "Sourya", age: "21" }); // ❌ age must be number
// ------------------------------------------------------------
// 4. Optional properties with `?`
//
// Add `?` to make a property optional. Its type becomes `T | undefined`.
// ------------------------------------------------------------
function printContact(c) {
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
function describeTodo(t) {
    // t.id = 99;            // ❌ readonly
    t.text = "edited"; // ✓ text is mutable
    console.log(`#${t.id}: ${t.text}`);
}
describeTodo({ id: 1, text: "Buy milk" });
const t1 = {
    id: 1,
    text: "Submit grading",
    done: false,
    minutes: 45,
    priority: 1,
};
const t2 = {
    id: 2,
    text: "Buy groceries",
    done: true,
    minutes: 30,
    // priority is optional, so we can leave it out
};
console.log(t1);
console.log(t2);
const urgent = {
    id: 3,
    text: "Reply to dean",
    done: false,
    minutes: 10,
    priority: 1,
    dueDate: "2026-05-20",
};
console.log("urgent:", urgent);
const myId = 42;
const point = { x: 3, y: 4 };
const onClick = (e) => console.log("clicked:", e);
console.log(myId, point);
onClick("button-1");
// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// A typed array of Todos, processed with the array methods from
// the JS demo. Notice we don't have to annotate the callback
// parameter `t` — TS knows it's a Todo from the array's type.
// ------------------------------------------------------------
const todos = [
    { id: 1, text: "Submit grading", done: false, minutes: 45, priority: 1 },
    { id: 2, text: "Buy groceries", done: true, minutes: 30, priority: 2 },
    { id: 3, text: "Reorganize desk", done: false, minutes: 15, priority: 3 },
    { id: 4, text: "Reply to dean", done: false, minutes: 10, priority: 1 },
];
const undoneMinutes = todos
    .filter((t) => !t.done) // t inferred as Todo
    .reduce((sum, t) => sum + t.minutes, 0);
console.log(`Remaining: ${undoneMinutes} min`);
console.log("---");
console.log("End of snapshot 05.");
console.log("Next snapshot: unions, literal types, and narrowing.");
export {};
