// ============================================================
// Snapshot 09 — async with types
//
// Run:  tsc async.ts && node async.js
//
// The JS demo already covered async/await + fetch + try/catch.
// This snapshot just shows what the TYPES look like.
//
// New ideas:
//   1. `Promise<T>` — a promise that will resolve to a value of type T
//   2. `async function` return types — always `Promise<T>`
//   3. Typing the response from `fetch()` + `.json()`
//   4. `catch (err: unknown)` — modern, safer error handling
// ============================================================


// ------------------------------------------------------------
// 1. Promise<T> — the type of a value that will arrive later.
//
// A function that returns a Promise is async. The T inside the
// angle brackets is what the promise will eventually resolve TO.
// ------------------------------------------------------------

function later(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`waited ${ms}ms`), ms);
  });
}

// We use `await` inside an `async` function to unwrap the promise.
async function demoLater() {
  const result: string = await later(50);   // type is string, not Promise<string>
  console.log(result);
}

// Top-level await works in modules. We just call the function:
demoLater();


// ------------------------------------------------------------
// 2. Async function return types
//
// Whatever you `return` inside an `async function`, the function
// AS A WHOLE returns `Promise<thatType>`. TS computes this for you.
// ------------------------------------------------------------

// Return type inferred as Promise<number>
async function doubleSlowly(n: number) {
  await later(10);
  return n * 2;
}

// You can also annotate explicitly:
async function tripleSlowly(n: number): Promise<number> {
  await later(10);
  return n * 3;
}

(async () => {
  console.log("doubleSlowly(5):", await doubleSlowly(5));
  console.log("tripleSlowly(5):", await tripleSlowly(5));
})();


// ------------------------------------------------------------
// 3. Typing fetch responses
//
// `fetch()` returns `Promise<Response>`.
// `response.json()` returns `Promise<any>` — TS has no idea what
// the JSON shape is. It's YOUR job to tell it.
//
// Pattern: cast the result with `as Type` (or define your own
// "narrowing" function for stricter checking).
// ------------------------------------------------------------

// The shape we EXPECT from JSONPlaceholder's /todos endpoint.
interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodos(): Promise<ApiTodo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  // `.json()` is Promise<any>. We cast to our expected shape.
  const data = (await response.json()) as ApiTodo[];
  return data;
}


// ------------------------------------------------------------
// 4. `catch (err: unknown)` — the modern, safer pattern.
//
// Pre-2021 TS made `err` an `any`. Modern TS defaults to `unknown`,
// which forces you to NARROW before using it. Safer.
//
// Most common narrowing: `if (err instanceof Error)`.
// ------------------------------------------------------------

async function safelyFetchTodos() {
  try {
    const todos = await fetchTodos();
    console.log("Fetched todos:");
    for (const t of todos) {
      console.log(`  #${t.id} ${t.completed ? "[done]" : "[    ]"} ${t.title}`);
    }
  } catch (err: unknown) {
    // err is `unknown` until we prove what it is.
    if (err instanceof Error) {
      console.error("Fetch failed:", err.message);
    } else {
      console.error("Fetch failed with non-Error:", err);
    }
  }
}

safelyFetchTodos();


// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// The async snapshot from the JS demo, but now every signature
// is typed. Read it top-to-bottom — the types ARE the docs.
// ============================================================


console.log("---");
console.log("Snapshot 09 launched. Async results print as they arrive.");
console.log("(End-of-snapshot marker not at the bottom — async, remember.)");

export {};
