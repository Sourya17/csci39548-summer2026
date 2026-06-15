// ============================================================
// Snapshot 06 — Unions, literal types, narrowing
//
// Run:  tsc unions.ts && node unions.js
//
// New ideas:
//   1. Union types — `string | number` ("this OR that")
//   2. Narrowing — TS lets you USE a union value once you've
//      proven which side of the union it is
//   3. Narrowing tools — `typeof`, equality checks, the `in` keyword
//   4. Literal types — `"high" | "med" | "low"` (specific values)
//   5. Numeric literal unions — `1 | 2 | 3` (our Priority type)
//   6. `null` and `undefined` in unions — the most common union you'll see
// ============================================================


// ------------------------------------------------------------
// 1. Union types — "this OR that"
//
// Use `|` between types. Read as "or".
// Inside the function, before narrowing, you can only use members
// that exist on BOTH types.
// ------------------------------------------------------------

function formatValue(x: string | number) {
  // x.toUpperCase();   // ❌ not allowed — numbers don't have toUpperCase
  // x.toFixed(2);      // ❌ not allowed — strings don't have toFixed
  return String(x);     // ✓ both string and number have a String() conversion
}

console.log(formatValue("hello"));
console.log(formatValue(42));


// ------------------------------------------------------------
// 2 + 3. NARROWING — proving which side of the union you're on.
//
// Once you check the type at runtime, TS narrows the variable's
// type INSIDE that branch. You can then use side-specific methods.
//
// Narrowing tools:
//   - `typeof x === "string"` (etc.)
//   - direct equality (`x === null`)
//   - `"prop" in obj` (does the object have this property?)
//   - `instanceof SomeClass`
// ------------------------------------------------------------

function describe(x: string | number) {
  if (typeof x === "string") {
    // Here, TS KNOWS x is a string. Hover it in VS Code → `x: string`.
    return `string of length ${x.length}: "${x.toUpperCase()}"`;
  }
  // Else branch: TS knows x must be number.
  return `number with fixed-2: ${x.toFixed(2)}`;
}

console.log(describe("hello"));
console.log(describe(3.14159));


// ------------------------------------------------------------
// 4. LITERAL TYPES — pin a value down to one of N exact strings.
//
// `"high" | "med" | "low"` means "this MUST be exactly one of those
// three strings." Typo prevention + autocomplete.
// ------------------------------------------------------------

type Tier = "high" | "med" | "low";

function badgeColor(tier: Tier): string {
  if (tier === "high") return "red";
  if (tier === "med")  return "orange";
  return "grey";       // tier is "low" here — TS narrowed it
}

console.log("high →", badgeColor("high"));
console.log("low  →", badgeColor("low"));
// badgeColor("urgent");   // ❌ not one of the allowed strings


// ------------------------------------------------------------
// 5. Numeric literal unions — our Priority type.
//
// Same idea as string literals, but with numbers.
// ------------------------------------------------------------

type Priority = 1 | 2 | 3;

function priorityLabel(p: Priority): string {
  if (p === 1) return "HIGH";
  if (p === 2) return "MED";
  return "LOW";
}

console.log("priorityLabel(1):", priorityLabel(1));
console.log("priorityLabel(3):", priorityLabel(3));
// priorityLabel(4);      // ❌ 4 is not in 1 | 2 | 3


// ------------------------------------------------------------
// 6. `null` and `undefined` in unions
//
// The most common union you'll see in real code is something like
// `string | null` or `User | undefined`. The point is to FORCE
// you to handle the missing case before using the value.
// ------------------------------------------------------------

function findUser(id: number): string | null {
  if (id === 1) return "Sourya";
  return null;
}

const user = findUser(2);
// console.log(user.toUpperCase());   // ❌ user might be null

if (user !== null) {
  console.log(user.toUpperCase());    // ✓ inside the if, user is `string`
} else {
  console.log("No user found.");
}


// ------------------------------------------------------------
// 7. The `in` operator — narrowing between OBJECT shapes.
//
// When a union is between two object types, use `"propName" in obj`
// to figure out which one you have.
// ------------------------------------------------------------

interface Cat { meow: () => void; }
interface Dog { bark: () => void; }

function makeNoise(pet: Cat | Dog) {
  if ("meow" in pet) {
    pet.meow();        // pet is narrowed to Cat
  } else {
    pet.bark();        // pet is narrowed to Dog
  }
}

makeNoise({ meow: () => console.log("meow!") });
makeNoise({ bark: () => console.log("woof!") });


// ------------------------------------------------------------
// PUTTING IT TOGETHER — Todo type with a real Priority union
//
// We're upgrading the Todo from snapshot 05. `priority` is no
// longer a free-form number — it's `1 | 2 | 3`. Typos and
// invalid values are now compiler errors.
// ------------------------------------------------------------

interface Todo {
  readonly id: number;
  text: string;
  done: boolean;
  minutes: number;
  priority: Priority;             // was `1 | 2 | 3` inline; now reuses the named type
}

const todos: Todo[] = [
  { id: 1, text: "Submit grading", done: false, minutes: 45, priority: 1 },
  { id: 2, text: "Buy groceries",  done: true,  minutes: 30, priority: 2 },
  { id: 3, text: "Reorganize desk", done: false, minutes: 15, priority: 3 },
  // { id: 4, text: "Bad",            done: false, minutes: 10, priority: 5 },   // ❌ 5 not in 1|2|3
];

for (const t of todos) {
  const mark = t.done ? "[done]" : "[    ]";
  console.log(`${mark} ${priorityLabel(t.priority).padEnd(5)} ${t.text}`);
}


console.log("---");
console.log("End of snapshot 06.");
console.log("Next snapshot: `as` casting + the `!` non-null assertion (React bridge).");

export {};
